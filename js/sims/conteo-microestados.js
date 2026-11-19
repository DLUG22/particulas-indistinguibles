/* =============================================================================
   conteo-microestados.js — Sección 4 · Cohen §D-1-b (p. 1446) y §C-3-d
   -----------------------------------------------------------------------------
   N partículas repartidas en M estados individuales. Microestados distintos:
     · Maxwell-Boltzmann (partículas tratadas como distinguibles): W_MB = M^N
     · Bose-Einstein (sólo cuentan los números de ocupación):   W_BE = C(M+N−1, N)
     · Fermi-Dirac (ocupaciones 0 o 1, Pauli):                   W_FD = C(M, N)
   Cada configuración de ocupaciones {n_k} es 1 microestado BE, es 1 microestado FD
   si todos los n_k ≤ 1, y equivale a N!/Πn_k! microestados MB.
   Probabilidad (microestados equiprobables) de que al menos dos partículas
   compartan estado: P_MB = 1 − M!/((M−N)! M^N), P_BE = 1 − W_FD/W_BE, P_FD = 0.
   Límite clásico: W_BE/(M^N/N!) = Π_k (1 + k/M) y W_FD/(M^N/N!) = Π_k (1 − k/M),
   k = 0 … N−1; ambos → 1 cuando M ≫ N.
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var MAX_CASILLAS = 30;
  function factorial(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return f; }
  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    var r = 1;
    for (var i = 1; i <= k; i++) r = r * (n - k + i) / i;
    return Math.round(r);
  }
  function razones(N, M) {
    var be = 1, fd = 1;
    for (var k = 0; k < N; k++) { be *= (M + k) / M; fd *= (M - k) / M; }
    return { be: be, fd: Math.max(fd, 0) };
  }

  // Todas las ocupaciones (n_1 … n_M) con Σ n_k = N, en orden lexicográfico decreciente.
  function ocupaciones(N, M) {
    var res = [];
    (function rec(pref, resto, quedan) {
      if (quedan === 1) { res.push(pref.concat([resto])); return; }
      for (var k = resto; k >= 0; k--) rec(pref.concat([k]), resto - k, quedan - 1);
    })([], N, M);
    return res;
  }

  function calcular(p) {
    var N = Math.round(p.N), M = Math.round(p.M);
    var r = {};
    r.W_MB = Math.pow(M, N);
    r.W_BE = binom(M + N - 1, N);
    r.W_FD = binom(M, N);
    r.W_clasico = r.W_MB / factorial(N);
    var perm = 1; for (var k = 0; k < N; k++) perm *= (M - k);        // M!/(M−N)!
    r.P_igual_MB = 1 - Math.max(perm, 0) / r.W_MB;
    r.P_igual_BE = 1 - r.W_FD / r.W_BE;
    r.P_igual_FD = r.W_FD > 0 ? 0 : NaN;
    var rz = razones(N, M);
    r.razon_BE = rz.be;
    r.razon_FD = rz.fd;
    // Configuraciones para dibujar (sólo si son pocas)
    r.configuraciones = null;
    if (r.W_BE <= MAX_CASILLAS) {
      r.configuraciones = ocupaciones(N, M).map(function (n) {
        var prod = 1, fd = true;
        n.forEach(function (x) { prod *= factorial(x); if (x > 1) fd = false; });
        return { n: n, mb: factorial(N) / prod, fd: fd };
      });
    }
    // Curvas del límite clásico: M desde N hasta 1000 (escala log)
    r.curvaM = []; r.curvaBE = []; r.curvaFD = [];
    var m0 = Math.max(N, 1);
    for (var i = 0; i <= 160; i++) {
      var m = Math.round(m0 * Math.pow(1000 / m0, i / 160));
      if (r.curvaM.length && m === r.curvaM[r.curvaM.length - 1]) continue;
      var z = razones(N, m);
      r.curvaM.push(m); r.curvaBE.push(z.be); r.curvaFD.push(z.fd);
    }
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coma(v, c) { return Num.formatoNum(v, c === undefined ? 4 : c).replace('.', ','); }
  function entero(v) { return String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }

  function dibujarConfiguraciones(res, p, g) {
    var N = Math.round(p.N), M = Math.round(p.M);
    var W = g.W || 340, anchoC = 62, cols = Math.max(1, Math.floor((W - 12) / anchoC));
    var conf = res.configuraciones, K = conf ? conf.length : 0;
    var altoC = M * 9 + 34, filas = conf ? Math.ceil(K / cols) : 1;
    var altura = conf ? 44 + filas * altoC : 120;
    g.configurar({
      altura: altura, xlim: [0, 1], ylim: [0, 1], ejes: false, leyenda: false,
      margen: { izq: 0, der: 0, arr: 0, aba: 0 },
      descripcion: 'Cada casilla es una configuración de números de ocupación: un microestado de bosones; las de borde rojo también valen para fermiones; el número indica cuántos microestados clásicos agrupa.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      if (!conf) {
        g.textoPx(W / 2, 50, 'Hay ' + entero(res.W_BE) + ' configuraciones: demasiadas para dibujarlas.', { align: 'center', tam: 12, color: 'texto' });
        g.textoPx(W / 2, 72, 'Baja N o M para verlas una por una.', { align: 'center', tam: 11, color: 'tenue' });
        return;
      }
      g.textoPx(8, 16, 'Casilla = configuración {nₖ} = 1 microestado de bosones', { tam: 11, color: col.bos, negrita: true });
      g.textoPx(8, 32, 'Borde rojo: también vale para fermiones · ×k: microestados clásicos', { tam: 10, color: 'tenue' });
      var x0 = (W - cols * anchoC) / 2;
      conf.forEach(function (c, i) {
        var cx = x0 + (i % cols) * anchoC, cy = 44 + Math.floor(i / cols) * altoC;
        var ctx = g.ctx;
        ctx.save();
        ctx.globalAlpha = 0.07; ctx.fillStyle = col.bos; ctx.fillRect(cx + 3, cy + 2, anchoC - 6, altoC - 6);
        ctx.globalAlpha = 1; ctx.lineWidth = c.fd ? 2 : 1; ctx.strokeStyle = c.fd ? col.fer : g.color('grid');
        ctx.strokeRect(cx + 3, cy + 2, anchoC - 6, altoC - 6);
        ctx.restore();
        for (var k = 0; k < M; k++) {
          var y = cy + altoC - 26 - k * 9;                       // estado 1 abajo
          g.ctx.save(); g.ctx.strokeStyle = g.color('eje'); g.ctx.globalAlpha = 0.5; g.ctx.lineWidth = 1;
          g.ctx.beginPath(); g.ctx.moveTo(cx + 9, y); g.ctx.lineTo(cx + anchoC - 9, y); g.ctx.stroke(); g.ctx.restore();
          for (var j = 0; j < c.n[k]; j++) g.circuloPx(cx + 13 + j * 7, y - 3, 2.6, { relleno: col.bos, alfa: 0.95, borde: false });
        }
        g.textoPx(cx + anchoC / 2, cy + altoC - 9, '×' + c.mb, { align: 'center', tam: 10, color: 'tenue', dentro: false });
      });
    });
  }

  function dibujarLimite(res, p, g) {
    var N = Math.round(p.N), M = Math.round(p.M);
    var yl = Graf.rango([res.curvaBE, res.curvaFD.filter(function (v) { return v > 0; })], { log: true, margen: 0.08 });
    if (yl[0] > 0.5) yl[0] = 0.5;
    if (yl[1] < 2) yl[1] = 2;
    g.configurar({
      xlim: [Math.max(N, 1), 1000], ylim: yl, xescala: 'log', yescala: 'log',
      xetiqueta: 'número de estados M', yetiqueta: 'W / (Mᴺ/N!)', leyenda: 'ne',
      descripcion: 'Cociente entre el número de microestados de bosones o fermiones y el conteo clásico corregido M a la N sobre N factorial, en función de M.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.curva([Math.max(N, 1), 1000], [1, 1], { color: 'clasico', estilo: 'discontinuo', etiqueta: 'clásico Mᴺ/N!' });
      g.curva(res.curvaM, res.curvaBE, { color: col.bos, ancho: 2.2, etiqueta: 'bosones' });
      g.curva(res.curvaM, res.curvaFD.map(function (v) { return v > 0 ? v : NaN; }), { color: col.fer, ancho: 2.2, etiqueta: 'fermiones' });
      if (M >= Math.max(N, 1)) {
        g.marcadorV(M, 'M = ' + M, { color: 'tenue' });
        g.punto(M, res.razon_BE, { color: col.bos });
        if (res.razon_FD > 0) g.punto(M, res.razon_FD, { color: col.fer });
      }
    });
  }

  var SIM = registrarSim({
    id: 'conteo-microestados',
    unidad: 4,
    tema: '4.2',
    prioridad: 'A',
    titulo: 'Contar microestados: Maxwell-Boltzmann, Bose-Einstein y Fermi-Dirac',
    tipo: 'grafica',

    controles: [
      { id: 'N', nombre: 'Número de partículas N', min: 1, max: 6, paso: 1, defecto: 2 },
      { id: 'M', nombre: 'Número de estados individuales M', min: 1, max: 20, paso: 1, defecto: 3 }
    ],

    lecturas: [
      { id: 'W_MB', nombre: 'Maxwell-Boltzmann  W = Mᴺ', formato: entero },
      { id: 'W_BE', nombre: 'Bose-Einstein  W = C(M+N−1, N)', formato: entero },
      { id: 'W_FD', nombre: 'Fermi-Dirac  W = C(M, N)', formato: entero },
      { id: 'W_clasico', nombre: 'Clásico corregido  Mᴺ/N!', formato: function (v) { return coma(v, 4); } },
      { id: 'P_igual_MB', nombre: 'P(dos en el mismo estado) · MB', formato: function (v) { return coma(v, 4); } },
      { id: 'P_igual_BE', nombre: 'P(dos en el mismo estado) · BE', formato: function (v) { return coma(v, 4); } },
      { id: 'P_igual_FD', nombre: 'P(dos en el mismo estado) · FD', formato: function (v) { return isFinite(v) ? coma(v, 4) : '— (no caben: N > M)'; } }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Enumeración en Python: N = 2, M = 3', entrada: { N: 2, M: 3 },
        salida: { W_MB: 9, W_BE: 6, W_FD: 3, P_igual_MB: 1 / 3, P_igual_BE: 0.5, P_igual_FD: 0 }, tol_abs: 1e-12, exactos: ['W_MB', 'W_BE', 'W_FD'] },
      { fuente: 'Enumeración en Python: N = 3, M = 4', entrada: { N: 3, M: 4 },
        salida: { W_MB: 64, W_BE: 20, W_FD: 4, P_igual_MB: 0.625, P_igual_BE: 0.8 }, tol_abs: 1e-12, exactos: ['W_MB', 'W_BE', 'W_FD'] },
      { fuente: 'Pauli: N > M ⇒ W_FD = 0 (Python)', entrada: { N: 4, M: 2 },
        salida: { W_MB: 16, W_BE: 5, W_FD: 0, P_igual_MB: 1, P_igual_BE: 1 }, tol_abs: 1e-12, exactos: ['W_MB', 'W_BE', 'W_FD'] },
      { fuente: 'Enumeración en Python: N = 6, M = 8', entrada: { N: 6, M: 8 },
        salida: { W_MB: 262144, W_BE: 1716, W_FD: 28, P_igual_MB: 0.923095703125, P_igual_BE: 0.983682983683 }, tol_abs: 1e-11, exactos: ['W_MB', 'W_BE', 'W_FD'] },
      { fuente: 'Cocientes con Mᴺ/N!, N = M = 3 (Python)', entrada: { N: 3, M: 3 },
        salida: { W_FD: 1, razon_BE: 2.22222222222, razon_FD: 0.222222222222 }, tol_abs: 1e-10, exactos: ['W_FD'] },
      { fuente: 'Límite clásico M ≫ N: N = 2, M = 20 (Python)', entrada: { N: 2, M: 20 },
        salida: { W_BE: 210, W_FD: 190, razon_BE: 1.05, razon_FD: 0.95 }, tol_abs: 1e-12, exactos: ['W_BE', 'W_FD'] },
      { fuente: 'N = 6, M = 20 (Python)', entrada: { N: 6, M: 20 },
        salida: { W_MB: 64000000, W_BE: 177100, W_FD: 38760, razon_BE: 1.992375, razon_FD: 0.43605 }, tol_abs: 1e-9, exactos: ['W_MB', 'W_BE', 'W_FD'] }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'configuraciones', altura: 200, cols: 'todo' },
          { id: 'limite', altura: 260, cols: 'todo' }
        ],
        dibujar: function (res, p, paneles) {
          dibujarConfiguraciones(res, p, paneles.configuraciones);
          dibujarLimite(res, p, paneles.limite);
        }
      });
    }
  });
})();
