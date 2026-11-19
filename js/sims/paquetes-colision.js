/* =============================================================================
   paquetes-colision.js — Sección 1 · Cohen §A-2 y §A-3-a (pp. 1420–1423, Figs. 1–3)
   -----------------------------------------------------------------------------
   Choque de dos partículas idénticas en el sistema del centro de masa.
   · Modo clásico: dos trayectorias; cada partícula conserva su número (Fig. 1).
   · Modo cuántico (ESQUEMA, como la Fig. 2 del Cohen): dos paquetes gaussianos
     que se acercan, se solapan y, tras el choque, una capa esférica que se expande.
     Al detectar una partícula en D hay dos «caminos» posibles (Fig. 3a y 3b).

   Unidades: v = 1 (velocidad de cada paquete) y ħ/m = κ = 0,15.
   Antes del choque (t ≤ 0) los centros están en z = ±t, separados d = 2|t|, y el
   ancho crece como el de un paquete libre:
       σ(t) = σ₀ √(1 + (t/τ)²),   τ = 2σ₀²/κ
   Solapamiento de los módulos (|φ|² gaussiana 2D normalizada de ancho σ):
       S = ∫ |φ₁||φ₂| d²r = exp(−d² / 8σ²)        (comprobado con integración numérica)
   S ≈ 0 → se puede etiquetar cada paquete; S → 1 → la etiqueta pierde sentido.
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var KAPPA = 0.15;          // ħ/m en estas unidades
  var GRAD = Math.PI / 180;
  var RD = 2.0;              // distancia del detector al origen (cabe en la escena)

  function anchoEn(t, s0) {
    var tau = 2 * s0 * s0 / KAPPA;
    return s0 * Math.sqrt(1 + (t / tau) * (t / tau));
  }

  function calcular(p) {
    var t = p.t, s0 = p.sigma0;
    var r = {};
    r.sigma = anchoEn(t, s0);
    r.tau = 2 * s0 * s0 / KAPPA;
    if (t <= 0) {
      var d = 2 * Math.abs(t);
      r.d = d;
      r.d_sobre_sigma = d / r.sigma;
      r.S = Math.exp(-d * d / (8 * r.sigma * r.sigma));
      r.radio = 0;
    } else {
      r.d = null;
      r.d_sobre_sigma = null;
      r.S = null;
      r.radio = t;           // radio de la capa (v = 1)
    }
    if (p.modo === 'clasica') r.etiqueta = 'Sí: cada una sigue su trayectoria';
    else if (t > 0) r.etiqueta = 'No: dos caminos dan el mismo resultado';
    else if (r.S < 0.01) r.etiqueta = 'Sí: los paquetes están separados';
    else r.etiqueta = 'Cada vez menos: los paquetes se solapan';

    // Curva S(t) para t ∈ [−3, 0] con el σ₀ actual
    var N = 240, ts = [], ss = [];
    for (var i = 0; i < N; i++) {
      var ti = -3 + 3 * i / (N - 1), si = anchoEn(ti, s0), di = 2 * Math.abs(ti);
      ts.push(ti); ss.push(Math.exp(-di * di / (8 * si * si)));
    }
    r.curva = { t: ts, S: ss };
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function aRGB(txt) {
    txt = String(txt || '').trim();
    var m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(txt);
    if (m) {
      var h = m[1].length === 3 ? m[1].replace(/./g, '$&$&') : m[1], n = parseInt(h, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    m = /rgba?\(([^)]+)\)/i.exec(txt);
    if (m) { var q = m[1].split(','); return [+q[0], +q[1], +q[2]]; }
    return [128, 128, 128];
  }
  function mezclar(a, b, f) { return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]; }

  var lienzoFuera = null;

  function pintarDensidad(g, res, p) {
    var R = g.rect, NX = 168, NY = Math.max(40, Math.round(NX * R.h / R.w));
    if (typeof document === 'undefined') return;
    if (!lienzoFuera) lienzoFuera = document.createElement('canvas');
    if (lienzoFuera.width !== NX || lienzoFuera.height !== NY) { lienzoFuera.width = NX; lienzoFuera.height = NY; }
    var cx = lienzoFuera.getContext('2d'), img = cx.createImageData(NX, NY), px = img.data;
    var c1 = aRGB(g.color('s3')), c2 = aRGB(g.color('s4')), cn = aRGB(g.color('tenue'));
    // Brillo relativo al pico de cada instante: el ensanchamiento se ve en el tamaño.
    var t = p.t, sig = res.sigma, s0 = p.sigma0, ref = 1 / (2 * Math.PI * sig * sig);
    var i, j, k;
    for (j = 0; j < NY; j++) {
      var x = g.iy(R.y + (j + 0.5) * R.h / NY);
      for (i = 0; i < NX; i++) {
        var z = g.ix(R.x + (i + 0.5) * R.w / NX), col, a;
        if (t <= 0) {
          var r1 = (z - t) * (z - t) + x * x, r2 = (z + t) * (z + t) + x * x;
          var n = 1 / (2 * Math.PI * sig * sig);
          var p1 = n * Math.exp(-r1 / (2 * sig * sig)), p2 = n * Math.exp(-r2 / (2 * sig * sig));
          var tot = p1 + p2;
          col = mezclar(mezclar(c2, c1, tot > 0 ? p1 / tot : 0.5), cn, res.S);
          a = Math.pow(Math.min(1, tot / ref), 0.75);
        } else {
          var rr = Math.sqrt(z * z + x * x) - res.radio;
          var amp = 1 / Math.sqrt(1 + 0.5 * res.radio / s0);
          col = cn;
          a = Math.pow(Math.min(1, amp * Math.exp(-rr * rr / (2 * sig * sig))), 0.75);
        }
        k = (j * NX + i) * 4;
        px[k] = col[0]; px[k + 1] = col[1]; px[k + 2] = col[2]; px[k + 3] = Math.round(255 * a * 0.92);
      }
    }
    cx.putImageData(img, 0, 0);
    g.ctx.save();
    g.ctx.imageSmoothingEnabled = true;
    g.ctx.drawImage(lienzoFuera, R.x, R.y, R.w, R.h);
    g.ctx.restore();
  }

  function dibujarDetector(g, th) {
    var zD = RD * Math.cos(th), xD = RD * Math.sin(th);
    g.punto(zD, xD, { radio: 9, color: 'acento', relleno: false });
    g.texto(zD, xD, 'D', { align: 'center', base: 'middle', tam: 11, negrita: true, color: 'acento' });
    g.punto(-zD, -xD, { radio: 9, color: 'tenue', relleno: false });
    g.texto(-zD, -xD + (xD > 0 ? -0.42 : 0.42), 'la otra', { align: 'center', base: 'middle', tam: 11, color: 'tenue' });
    return { z: zD, x: xD };
  }

  function dibujarEscena(res, p, g) {
    var th = p.theta * GRAD, t = p.t;
    g.configurar({
      xlim: [-3.4, 3.4], ylim: [-2.3, 2.3], igual: true, ejes: false, leyenda: false,
      margen: { izq: 6, der: 6, arr: 6, aba: 6 },
      descripcion: p.modo === 'clasica'
        ? 'Choque clásico de dos partículas idénticas: cada una sigue su trayectoria y conserva su número.'
        : 'Esquema cuántico del choque: dos paquetes de onda que se solapan y luego una capa esférica. Al detectar una partícula en D no se sabe si es la 1 o la 2.'
    });
    g.dibujar(function (g) {
      var R = g.rect;
      g.ctx.save();
      g.ctx.fillStyle = g.color('fondo');
      g.ctx.fillRect(R.x, R.y, R.w, R.h);
      g.ctx.restore();
      g.linea(-3.4, 0, 3.4, 0, { color: 'grid', ancho: 1 });
      var D = dibujarDetector(g, th);

      if (p.modo === 'clasica') {
        // Trayectorias: la (1) viene de la izquierda y sale hacia D; la (2) sale en sentido opuesto.
        var z1, x1, z2, x2;
        if (t <= 0) { z1 = t; x1 = 0; z2 = -t; x2 = 0; }
        else { var rc = Math.min(t, RD); z1 = rc * Math.cos(th); x1 = rc * Math.sin(th); z2 = -z1; x2 = -x1; }   // se detiene en el detector
        g.linea(-3, 0, Math.min(t, 0), 0, { color: 's3', ancho: 2.4 });
        g.linea(3, 0, Math.max(-t, 0), 0, { color: 's4', ancho: 2.4 });
        if (t > 0) {
          g.linea(0, 0, z1, x1, { color: 's3', ancho: 2.4 });
          g.linea(0, 0, z2, x2, { color: 's4', ancho: 2.4 });
        }
        g.punto(z1, x1, { radio: 7, color: 's3' });
        g.punto(z2, x2, { radio: 7, color: 's4' });
        g.texto(z1 + 0.3, x1, '1', { align: 'center', base: 'middle', tam: 13, negrita: true, color: 's3' });
        g.texto(z2 - 0.3, x2, '2', { align: 'center', base: 'middle', tam: 13, negrita: true, color: 's4' });
        if (t >= RD) g.texto(D.z * 0.6, D.x * 0.6 + (D.x >= 0 ? -0.35 : 0.35), 'llega la 1', { align: 'center', base: 'middle', tam: 11, color: 's3', fondo: true });
      } else {
        pintarDensidad(g, res, p);
        if (t <= 0) {
          var visible = Math.max(0, 1 - 4 * res.S);
          if (visible > 0.02) {
            g.ctx.save(); g.ctx.globalAlpha = visible;
            g.texto(t, 0.95 * res.sigma + 0.35, '(1)', { align: 'center', tam: 13, negrita: true, color: 's3' });
            g.texto(-t, 0.95 * res.sigma + 0.35, '(2)', { align: 'center', tam: 13, negrita: true, color: 's4' });
            g.ctx.restore();
          }
        } else {
          // Los dos caminos de la Fig. 3 del Cohen
          var op = Math.min(1, t / 0.8);
          g.ctx.save(); g.ctx.globalAlpha = 0.75 * op;
          g.linea(-3, 0, 0, 0, { color: 's3', estilo: 'discontinuo', ancho: 1.6 });
          g.linea(0, 0, D.z, D.x, { color: 's3', estilo: 'discontinuo', ancho: 1.6 });
          g.linea(3, 0, 0, 0, { color: 's4', estilo: 'discontinuo', ancho: 1.6 });
          g.linea(0, 0, D.z * 0.97, D.x * 0.97, { color: 's4', estilo: 'punteado', ancho: 2 });
          g.ctx.restore();
          if (t > 0.6) g.texto(D.z * 0.6, D.x * 0.6 + (D.x >= 0 ? -0.35 : 0.35), '¿(1) o (2)?', { align: 'center', base: 'middle', tam: 12, negrita: true, color: 'texto', fondo: true });
        }
      }
      g.textoPx(R.x + 10, R.y + R.h - 10, 't = ' + Num.formatoNum(t, 2).replace('.', ','), { tam: 12, color: 'tenue' });
      g.textoPx(R.x + R.w - 10, R.y + R.h - 10, p.modo === 'clasica' ? 'clásica' : 'cuántica · esquema', { tam: 12, color: 'tenue', align: 'right' });
    });
  }

  function dibujarSolapamiento(res, p, g) {
    g.configurar({
      xlim: [-3, 3], ylim: [0, 1.05],
      xetiqueta: 'tiempo t (v = 1)', yetiqueta: 'solapamiento S',
      leyenda: false,
      descripcion: 'Solapamiento de los dos paquetes en función del tiempo antes del choque. Después del choque la etiqueta ya no se puede recuperar.'
    });
    g.dibujar(function (g) {
      g.regionV(0, 3, { texto: 'después del choque: sin etiquetas' });
      g.linea(-3, 0.01, 0, 0.01, { color: 'aprox', estilo: 'punteado', ancho: 1.2 });
      g.curva(res.curva.t, res.curva.S, { estilo: 'solido', color: 'acento' });
      if (p.t <= 0) g.punto(p.t, res.S, { radio: 5, color: 'acento' });
      else g.marcadorV(p.t, '', { estilo: 'discontinuo', color: 'tenue' });
    });
  }

  var SIM = registrarSim({
    id: 'paquetes-colision',
    unidad: 1,
    tema: '1.3',
    prioridad: 'A',
    titulo: 'Choque de dos partículas idénticas: trayectorias contra paquetes de onda',
    tipo: 'animacion',

    controles: [
      { id: 't', nombre: 'Tiempo t', min: -3, max: 3, paso: 0.01, defecto: -2.6, animable: true, duracion: 9,
        ayuda: 'El choque ocurre en t = 0. Pulsa ▶ para animarlo.' },
      { id: 'modo', nombre: 'Descripción', opciones: [
        { valor: 'cuantica', nombre: 'Cuántica: paquetes de onda' },
        { valor: 'clasica', nombre: 'Clásica: trayectorias' }
      ], defecto: 'cuantica' },
      { id: 'theta', nombre: 'Dirección del detector θ', unidad: '°', min: 0, max: 180, paso: 1, defecto: 55 },
      { id: 'sigma0', nombre: 'Ancho inicial σ₀', min: 0.2, max: 0.8, paso: 0.01, defecto: 0.35,
        ayuda: 'Más angosto ⇒ se ensancha más rápido (τ = 2σ₀²m/ħ).' }
    ],

    lecturas: [
      { id: 'd_sobre_sigma', nombre: 'Separación d/σ', formato: function (v) { return v == null ? '— (ya chocaron)' : Num.formatoNum(v, 3).replace('.', ','); } },
      { id: 'S', nombre: 'Solapamiento S = ∫|φ₁||φ₂|', formato: function (v) { return v == null ? '—' : Num.formatoNum(v, 3).replace('.', ','); } },
      { id: 'etiqueta', nombre: '¿Se sabe cuál es cuál?', formato: 'texto' }
    ],

    calcular: calcular,

    // Valores de referencia calculados aparte en Python (S verificado con integración numérica 2D).
    pruebas: [
      { fuente: 'S(t = 0) = 1', entrada: { t: 0, sigma0: 0.35 }, salida: { S: 1, sigma: 0.35, d_sobre_sigma: 0 }, tol_abs: 1e-12 },
      { fuente: 'Python', entrada: { t: -1, sigma0: 0.35 }, salida: { sigma: 0.4103880692, d_sobre_sigma: 4.873436023, S: 0.05136504819 }, tol_rel: 1e-8 },
      { fuente: 'Python', entrada: { t: -0.5, sigma0: 0.35 }, salida: { S: 0.3933805114 }, tol_rel: 1e-8 },
      { fuente: 'Python', entrada: { t: -3, sigma0: 0.35 }, salida: { S: 0.0002250472729 }, tol_rel: 1e-8 },
      { fuente: 'Python', entrada: { t: -1, sigma0: 0.6 }, salida: { S: 0.264182584 }, tol_rel: 1e-8 },
      { fuente: 'Python', entrada: { t: -2, sigma0: 0.2 }, salida: { sigma: 0.7762087348, S: 0.03617083765 }, tol_rel: 1e-8 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'escena', altura: 330, cols: 'todo' },
          { id: 'solapamiento', altura: 200, cols: 'todo' }
        ],
        dibujar: function (res, p, paneles) {
          dibujarEscena(res, p, paneles.escena);
          dibujarSolapamiento(res, p, paneles.solapamiento);
        }
      });
    }
  });
})();
