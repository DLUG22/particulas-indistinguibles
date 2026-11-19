/* =============================================================================
   portada.js — Densidad conjunta viva de dos partículas en un pozo infinito.

   Pozo de ancho L = 1, φ_n(x) = √2 sin(nπx), E_n = n² E₁.
   Estado: superposición equiprobable de los niveles (1,2) y (2,3):
       Ψ(t) = [ψ₁₂ e^{-iE₁₂t/ħ} + ψ₂₃ e^{-iE₂₃t/ħ}] / √2,   E₁₂ = 5E₁,  E₂₃ = 13E₁
   con ψ_ab = φ_a(x₁)φ_b(x₂)                                  (distinguibles)
        ψ_ab = [φ_a(x₁)φ_b(x₂) ± φ_b(x₁)φ_a(x₂)] / √2          (bosones +, fermiones −)
   ⇒ |Ψ|² = ½(ψ₁₂² + ψ₂₃²) + ψ₁₂ψ₂₃ cos(8E₁t/ħ).   (Norma 1 en todo t.)
   La lectura es P(|x₁ − x₂| < L/10). Valores de referencia (comprobados aparte en
   Python, media temporal): bosones ≈ 0,37 · distinguibles ≈ 0,20 · fermiones ≈ 0,03.
   ============================================================================= */
(function () {
  'use strict';

  var lienzo = document.getElementById('lienzo-portada');
  if (!lienzo || !lienzo.getContext) return;

  var ctx = lienzo.getContext('2d');
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var N = 120;                     // malla N × N (se suaviza al escalar)
  var PERIODO = 6.5;               // segundos de pantalla por ciclo de batido
  var dx = 1 / N;

  /* ------------------------------------------------------------ Física */
  var x = new Float64Array(N);
  for (var i = 0; i < N; i++) x[i] = (i + 0.5) / N;

  function phi(n) {
    var a = new Float64Array(N);
    for (var i = 0; i < N; i++) a[i] = Math.SQRT2 * Math.sin(n * Math.PI * x[i]);
    return a;
  }
  var F = { 1: phi(1), 2: phi(2), 3: phi(3) };

  // ψ_ab en la malla; índice k = i2 * N + i1 (fila = x₂, columna = x₁)
  function dosParticulas(a, b, signo) {
    var fa = F[a], fb = F[b], out = new Float64Array(N * N);
    var k = signo === 0 ? 1 : Math.SQRT1_2;
    for (var i2 = 0; i2 < N; i2++) {
      for (var i1 = 0; i1 < N; i1++) {
        var v = fa[i1] * fb[i2];
        if (signo !== 0) v += signo * fb[i1] * fa[i2];
        out[i2 * N + i1] = k * v;
      }
    }
    return out;
  }

  function prepararModo(signo) {
    var A = dosParticulas(1, 2, signo), B = dosParticulas(2, 3, signo);
    var P = new Float64Array(N * N), Q = new Float64Array(N * N);
    var maximo = 0, mediaCerca = 0;
    for (var k = 0; k < N * N; k++) {
      P[k] = 0.5 * (A[k] * A[k] + B[k] * B[k]);
      Q[k] = A[k] * B[k];
      var tope = P[k] + Math.abs(Q[k]);
      if (tope > maximo) maximo = tope;
      var i1 = k % N, i2 = (k - i1) / N;
      if (Math.abs(x[i1] - x[i2]) < 0.1) mediaCerca += P[k] * dx * dx;
    }
    return { P: P, Q: Q, maximo: maximo, mediaCerca: mediaCerca };
  }

  var MODOS = {
    distinguibles: { datos: prepararModo(0), color: '--distinguible', k: 0,
      descripcion: 'dos partículas distinguibles: la densidad no es simétrica respecto a la diagonal.' },
    bosones: { datos: prepararModo(1), color: '--boson', k: 1,
      descripcion: 'dos bosones: la densidad se concentra cerca de la diagonal x1 igual a x2 (agrupamiento).' },
    fermiones: { datos: prepararModo(-1), color: '--fermion', k: 2,
      descripcion: 'dos fermiones: la diagonal x1 igual a x2 queda vacía (principio de Pauli).' }
  };

  var cerca = new Uint8Array(N * N);
  for (var k0 = 0; k0 < N * N; k0++) {
    var c1 = k0 % N, c2 = (k0 - c1) / N;
    cerca[k0] = Math.abs(x[c1] - x[c2]) < 0.1 ? 1 : 0;
  }

  /* ----------------------------------------------------------- Colores */
  var colores = {};
  function aRGB(txt) {
    txt = (txt || '').trim();
    var m = /^#([0-9a-f]{6})$/i.exec(txt);
    if (m) { var n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
    m = /rgba?\(([^)]+)\)/i.exec(txt);
    if (m) { var p = m[1].split(','); return [+p[0], +p[1], +p[2]]; }
    return [120, 120, 130];
  }
  function leerColores() {
    var cs = getComputedStyle(document.documentElement);
    Object.keys(MODOS).forEach(function (nombre) {
      colores[nombre] = aRGB(cs.getPropertyValue(MODOS[nombre].color));
    });
    colores.tinta = cs.getPropertyValue('--tinta').trim() || '#16171b';
    colores.tenue = cs.getPropertyValue('--tenue').trim() || '#5c5f6a';
    colores.borde = cs.getPropertyValue('--borde-fuerte').trim() || 'rgba(0,0,0,.18)';
    colores.fondo = cs.getPropertyValue('--papel-2').trim() || '#efebe3';
  }
  leerColores();

  /* ----------------------------------------------------------- Estado */
  var modo = 'fermiones', modoAnterior = 'fermiones';
  var mezcla = 1;                  // 0 → modoAnterior, 1 → modo (transición)
  var inicioMezcla = 0, DUR_MEZCLA = 700;
  var t0 = performance.now();
  var visible = true, corriendo = false;

  var fuera = document.createElement('canvas');
  fuera.width = N; fuera.height = N;
  var ctxFuera = fuera.getContext('2d');
  var imagen = ctxFuera.createImageData(N, N);

  var lecturaCerca = document.getElementById('lectura-cerca');
  var lecturaMedia = document.getElementById('lectura-media');
  var medidor = document.getElementById('medidor-cerca');
  var figura = lienzo.closest('figure');

  function coma(v, d) { return v.toFixed(d).replace('.', ','); }

  /* ----------------------------------------------------------- Dibujo */
  var anchoCss = 0, dpr = 1;
  function ajustarTamano() {
    var r = lienzo.getBoundingClientRect();
    anchoCss = r.width;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    lienzo.width = Math.round(r.width * dpr);
    lienzo.height = Math.round(r.height * dpr);
  }

  function dibujar(ahora) {
    var fase = reducir ? 0 : 2 * Math.PI * ((ahora - t0) / 1000) / PERIODO;
    var c = Math.cos(fase);

    if (mezcla < 1) {
      mezcla = Math.min(1, (ahora - inicioMezcla) / DUR_MEZCLA);
      if (reducir) mezcla = 1;
    }
    var s = mezcla * mezcla * (3 - 2 * mezcla); // suavizado
    var dA = MODOS[modoAnterior].datos, dN = MODOS[modo].datos;
    var colA = colores[modoAnterior], colN = colores[modo];
    var col = [0, 1, 2].map(function (j) { return colA[j] + (colN[j] - colA[j]) * s; });

    var px = imagen.data, probCerca = 0;
    var destinoPico = window.Tema && window.Tema.actual() === 'dark' ? 255 : 0;
    for (var i2 = 0; i2 < N; i2++) {
      var fila = (N - 1 - i2) * N;     // x₂ crece hacia arriba
      for (var i1 = 0; i1 < N; i1++) {
        var k = i2 * N + i1;
        var rN = dN.P[k] + dN.Q[k] * c;
        var rho = rN;
        var norma = dN.maximo;
        if (s < 1) {
          var rA = dA.P[k] + dA.Q[k] * c;
          rho = rA / dA.maximo * (1 - s) + rN / dN.maximo * s;
          norma = 1;
        }
        if (cerca[k]) probCerca += rN;
        // Mapa de color en dos tramos: transparente → color del modo → color profundo.
        var tt = Math.min(1, Math.max(0, rho / norma));
        var a = Math.min(1, Math.pow(tt, 0.85) * 1.25);
        // Picos: hacia negro en modo claro, hacia blanco en modo oscuro.
        var hondo = tt > 0.55 ? (tt - 0.55) / 0.45 * 0.38 : 0;
        var p = (fila + i1) * 4;
        px[p] = col[0] + (destinoPico - col[0]) * hondo;
        px[p + 1] = col[1] + (destinoPico - col[1]) * hondo;
        px[p + 2] = col[2] + (destinoPico - col[2]) * hondo;
        px[p + 3] = Math.round(255 * a);
      }
    }
    ctxFuera.putImageData(imagen, 0, 0);
    probCerca *= dx * dx;

    // Lienzo visible
    var W = lienzo.width, H = lienzo.height;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var w = anchoCss, mIzq = 26, mAba = 24, mSup = 6, mDer = 6;
    var lado = Math.min(w - mIzq - mDer, w - mSup - mAba);
    var ox = mIzq, oy = mSup;

    ctx.fillStyle = colores.fondo;
    redondeado(ox, oy, lado, lado, 10); ctx.fill();
    ctx.save();
    redondeado(ox, oy, lado, lado, 10); ctx.clip();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(fuera, ox, oy, lado, lado);

    // Diagonal x₁ = x₂
    ctx.setLineDash([5, 6]);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = colores.tenue;
    ctx.globalAlpha = 0.75;
    ctx.beginPath(); ctx.moveTo(ox, oy + lado); ctx.lineTo(ox + lado, oy); ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    ctx.restore();

    ctx.strokeStyle = colores.borde;
    ctx.lineWidth = 1;
    redondeado(ox + 0.5, oy + 0.5, lado - 1, lado - 1, 10); ctx.stroke();

    // Rótulos
    ctx.fillStyle = colores.tenue;
    ctx.font = '500 12px Inter, system-ui, sans-serif';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';  ctx.fillText('0', ox, oy + lado + 6);
    ctx.textAlign = 'right'; ctx.fillText('L', ox + lado, oy + lado + 6);
    ctx.textAlign = 'center';
    ctx.fillStyle = colores.tinta;
    ctx.font = 'italic 500 13px Fraunces, Georgia, serif';
    ctx.fillText('x₁', ox + lado / 2, oy + lado + 5);
    ctx.save();
    ctx.translate(ox - 16, oy + lado / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textBaseline = 'middle';
    ctx.fillText('x₂', 0, 0);
    ctx.restore();
    ctx.fillStyle = colores.tenue;
    ctx.font = '500 11px Inter, system-ui, sans-serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText('L', ox - 6, oy + 8);

    ctx.save();
    ctx.translate(ox + lado * 0.80, oy + lado * 0.20);
    ctx.rotate(-Math.PI / 4);
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.font = 'italic 500 12px Fraunces, Georgia, serif';
    ctx.fillStyle = colores.tenue;
    ctx.fillText('x₁ = x₂', 0, -4);
    ctx.restore();

    // Lecturas
    if (lecturaCerca) lecturaCerca.textContent = coma(probCerca, 3);
    if (medidor) medidor.style.width = Math.min(100, probCerca / 0.6 * 100).toFixed(1) + '%';
  }

  function redondeado(x0, y0, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x0 + r, y0);
    ctx.arcTo(x0 + w, y0, x0 + w, y0 + h, r);
    ctx.arcTo(x0 + w, y0 + h, x0, y0 + h, r);
    ctx.arcTo(x0, y0 + h, x0, y0, r);
    ctx.arcTo(x0, y0, x0 + w, y0, r);
    ctx.closePath();
  }

  /* ------------------------------------------------------------ Bucle */
  function cuadro(ahora) {
    if (!visible || document.hidden) { corriendo = false; return; }
    dibujar(ahora);
    if (reducir && mezcla >= 1) { corriendo = false; return; }
    requestAnimationFrame(cuadro);
  }
  function arrancar() {
    if (corriendo) return;
    corriendo = true;
    requestAnimationFrame(cuadro);
  }

  /* ----------------------------------------------------------- Selector */
  var selector = figura ? figura.querySelector('.selector') : null;
  var botones = selector ? selector.querySelectorAll('button[data-modo]') : [];

  function elegir(nuevo, conFoco) {
    if (!MODOS[nuevo] || nuevo === modo) return;
    modoAnterior = modo;
    modo = nuevo;
    mezcla = 0;
    inicioMezcla = performance.now();
    Array.prototype.forEach.call(botones, function (b) {
      var si = b.getAttribute('data-modo') === nuevo;
      b.setAttribute('aria-checked', si ? 'true' : 'false');
      b.tabIndex = si ? 0 : -1;
      if (si && conFoco) b.focus();
    });
    if (selector) selector.style.setProperty('--k', MODOS[nuevo].k);
    actualizarTextos();
    arrancar();
  }

  function actualizarTextos() {
    if (lecturaMedia) lecturaMedia.textContent = coma(MODOS[modo].datos.mediaCerca, 3);
    if (figura) figura.style.setProperty('--color-modo', 'var(' + MODOS[modo].color + ')');
    lienzo.setAttribute('aria-label', 'Densidad de probabilidad conjunta de ' + MODOS[modo].descripcion);
  }

  Array.prototype.forEach.call(botones, function (b, idx) {
    b.tabIndex = b.getAttribute('aria-checked') === 'true' ? 0 : -1;
    b.addEventListener('click', function () { elegir(b.getAttribute('data-modo')); });
    b.addEventListener('keydown', function (ev) {
      var paso = ev.key === 'ArrowRight' || ev.key === 'ArrowDown' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowUp' ? -1 : 0;
      if (!paso) return;
      ev.preventDefault();
      var sig = botones[(idx + paso + botones.length) % botones.length];
      elegir(sig.getAttribute('data-modo'), true);
    });
  });

  /* ----------------------------------------------------------- Eventos */
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () { ajustarTamano(); dibujar(performance.now()); }).observe(lienzo);
  } else {
    window.addEventListener('resize', function () { ajustarTamano(); dibujar(performance.now()); });
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
      if (visible) arrancar();
    }).observe(lienzo);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) arrancar(); });
  document.addEventListener('cambio-tema', function () {
    // Las variables cambian en el mismo cuadro; se leen en el siguiente.
    requestAnimationFrame(function () { leerColores(); dibujar(performance.now()); });
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { dibujar(performance.now()); });

  ajustarTamano();
  actualizarTextos();
  arrancar();
})();
