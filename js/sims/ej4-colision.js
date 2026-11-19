/* =============================================================================
   ej4-colision.js — Ejercicio 4 del complemento D_XIV (p. 1497)
   -----------------------------------------------------------------------------
   Colisión en el centro de masa; F(n) ∝ amplitud de difusión f(θ) en la dirección n
   (no depende de φ: simetría de rotación alrededor de Oz). F(−n) = f(π − θ).
     a) distinguibles sin espín, «una con pn y otra con −pn»:  |f(θ)|² + |f(π−θ)|²
     b) idénticas, m_s ≠ m_s′ (interacción sin espín):
          (pn, m_s; −pn, m_s′) → |f(θ)|²   (pn, m_s′; −pn, m_s) → |f(π−θ)|²
          sin medir el espín → |f(θ)|² + |f(π−θ)|²
     c) idénticas, m_s = m_s′: |f(θ) + ε f(π−θ)|²
   Modelo de f (propio, no del Cohen): esfera dura de radio a,
       tan δ_l = j_l(ka) / y_l(ka),   f(θ) = (1/k) Σ (2l+1) e^{iδ_l} sen δ_l P_l(cos θ)
   en unidades de a (|f|² en a²). j_l por recurrencia descendente (Miller), y_l
   ascendente. Las pruebas vienen de Python con j_l por serie de potencias.
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var GRAD = Math.PI / 180;
  function coma(c) { return function (v) { return Num.formatoNum(v, c).replace('.', ','); }; }

  /* ---------------------------------------------- esfera dura: desfases y f(θ) */
  function besselEsfericas(L, x) {
    var y = [-Math.cos(x) / x, -Math.cos(x) / (x * x) - Math.sin(x) / x], l;
    for (l = 1; l < L; l++) y.push((2 * l + 1) / x * y[l] - y[l - 1]);
    var arr = Math.max(L, Math.ceil(x)) + 30, j = new Array(arr + 2), i;
    j[arr + 1] = 0; j[arr] = 1e-30;
    for (i = arr; i >= 1; i--) j[i - 1] = (2 * i + 1) / x * j[i] - j[i + 1];
    var j0 = Math.sin(x) / x, j1 = Math.sin(x) / (x * x) - Math.cos(x) / x;
    var esc = Math.abs(j0) > Math.abs(j1) ? j0 / j[0] : j1 / j[1];
    var jl = [];
    for (l = 0; l <= L; l++) jl.push(j[l] * esc);
    return { j: jl, y: y.slice(0, L + 1) };
  }
  function desfases(ka) {
    var L = Math.ceil(ka) + 12, b = besselEsfericas(L, ka), d = [];
    for (var l = 0; l <= L; l++) d.push(Math.atan(b.j[l] / b.y[l]));
    return d;
  }
  function amplitud(theta, ka, d) {
    var c = Math.cos(theta), p0 = 1, p1 = c, re = 0, im = 0;
    for (var l = 0; l < d.length; l++) {
      var P = l === 0 ? 1 : (l === 1 ? c : 0);
      if (l >= 2) { var p2 = ((2 * l - 1) * c * p1 - (l - 1) * p0) / l; p0 = p1; p1 = p2; P = p2; }
      var s = Math.sin(d[l]);
      re += (2 * l + 1) * Math.cos(d[l]) * s * P;
      im += (2 * l + 1) * s * s * P;
    }
    return { re: re / ka, im: im / ka };
  }

  function probabilidad(caso, eps, F, G) {
    var F2 = F.re * F.re + F.im * F.im, G2 = G.re * G.re + G.im * G.im;
    if (caso === 'c') { var re = F.re + eps * G.re, im = F.im + eps * G.im; return re * re + im * im; }
    return F2 + G2;                                            // a) y b) sin medir el espín
  }

  function calcular(p) {
    var ka = +p.ka, th = +p.theta * GRAD, eps = p.estadistica === 'fermiones' ? -1 : 1, caso = p.caso;
    var d = desfases(ka), F = amplitud(th, ka, d), G = amplitud(Math.PI - th, ka, d), r = {};
    r.F_re = F.re; r.F_im = F.im;
    r.F2 = F.re * F.re + F.im * F.im;
    r.Fm2 = G.re * G.re + G.im * G.im;
    r.P = probabilidad(caso, eps, F, G);
    r.P_dist = r.F2 + r.Fm2;
    r.P_suplementario = probabilidad(caso, eps, G, F);          // θ → π − θ
    var F90 = amplitud(Math.PI / 2, ka, d);
    r.P90 = probabilidad(caso, eps, F90, F90);
    r.delta0 = d[0];
    r.curvaT = Num.linspace(0, 180, 181);
    var Fs = r.curvaT.map(function (t) { return amplitud(t * GRAD, ka, d); });
    r.curvaF2 = Fs.map(function (z) { return z.re * z.re + z.im * z.im; });
    r.curvaFm2 = r.curvaF2.slice().reverse();
    r.curvaDist = r.curvaF2.map(function (v, i) { return v + r.curvaFm2[i]; });
    r.curvaP = Fs.map(function (z, i) { return probabilidad(caso, eps, z, Fs[180 - i]); });
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }

  function dibujar(res, p, g) {
    var col = coloresFisicos(), caso = p.caso, c = p.estadistica === 'fermiones' ? col.fer : col.bos;
    var ymax = Math.max.apply(null, res.curvaP.concat(res.curvaDist)) * 1.12;
    g.configurar({
      xlim: [0, 180], ylim: [0, ymax], xetiqueta: 'ángulo θ de la dirección n (°)', yetiqueta: 'probabilidad / a²', leyenda: 'ne',
      descripcion: 'Probabilidad de detección en función del ángulo para el caso elegido del ejercicio 4.'
    });
    g.dibujar(function (g) {
      g.regionV(88, 92, {});
      if (caso === 'b') {
        g.curva(res.curvaT, res.curvaF2, { color: c, ancho: 1.6, estilo: 'punteado', etiqueta: 'm_s en n: |F(n)|²' });
        g.curva(res.curvaT, res.curvaFm2, { color: c, ancho: 1.6, estilo: 'discontinuo', etiqueta: 'm_s′ en n: |F(−n)|²' });
        g.curva(res.curvaT, res.curvaP, { color: c, ancho: 2.4, etiqueta: 'sin medir el espín' });
      } else if (caso === 'c') {
        g.curva(res.curvaT, res.curvaDist, { color: 'clasico', estilo: 'discontinuo', ancho: 1.8, etiqueta: 'distinguibles' });
        g.curva(res.curvaT, res.curvaP, { color: c, ancho: 2.4, etiqueta: (p.estadistica === 'fermiones' ? 'fermiones' : 'bosones') + ', m_s = m_s′' });
      } else {
        g.curva(res.curvaT, res.curvaF2, { color: 'tenue', ancho: 1.2, estilo: 'punteado', etiqueta: '|F(n)|²' });
        g.curva(res.curvaT, res.curvaP, { color: 'clasico', estilo: 'discontinuo', ancho: 2.4, etiqueta: '|F(n)|² + |F(−n)|²' });
      }
      g.marcadorV(+p.theta, '', { color: 'tenue' });
      g.marcadorV(180 - +p.theta, '', { color: 'tenue' });
      g.punto(+p.theta, res.P, { color: caso === 'a' ? 'clasico' : c });
      g.punto(180 - +p.theta, res.P_suplementario, { color: caso === 'a' ? 'clasico' : c });
    });
  }

  var SIM = registrarSim({
    id: 'ej4-colision',
    unidad: 9,
    tema: '9.4',
    prioridad: 'A',
    titulo: 'Colisión de dos partículas: los tres casos del ejercicio 4',
    tipo: 'grafica',

    controles: [
      { id: 'caso', nombre: 'Caso', defecto: 'c',
        opciones: [{ valor: 'a', nombre: 'a) distinguibles sin espín' }, { valor: 'b', nombre: 'b) idénticas, m_s ≠ m_s′' }, { valor: 'c', nombre: 'c) idénticas, m_s = m_s′' }] },
      { id: 'estadistica', nombre: 'Partículas', defecto: 'fermiones',
        opciones: [{ valor: 'bosones', nombre: 'bosones (ε = +1)' }, { valor: 'fermiones', nombre: 'fermiones (ε = −1)' }],
        visible: function (e) { return e.caso !== 'a'; } },
      { id: 'ka', nombre: 'Energía ka (número de onda × radio)', min: 0.2, max: 4, paso: 0.05, defecto: 1 },
      { id: 'theta', nombre: 'Dirección θ de n', unidad: '°', min: 0, max: 180, paso: 1, defecto: 60, animable: true, duracion: 10 }
    ],

    lecturas: [
      { id: 'F2', nombre: '|F(n)|² / a²', formato: coma(4) },
      { id: 'Fm2', nombre: '|F(−n)|² = |F(π−θ)|² / a²', formato: coma(4) },
      { id: 'P', nombre: 'Probabilidad en θ / a²', formato: coma(4) },
      { id: 'P_suplementario', nombre: 'Probabilidad en π − θ / a²', formato: coma(4) },
      { id: 'P90', nombre: 'Probabilidad en θ = 90° / a²', formato: coma(4) }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Ej. 4a, esfera dura ka = 1, θ = 60° (Python, j_l por serie)', entrada: { caso: 'a', ka: 1, theta: 60 },
        salida: { F_re: -0.754326556399, F_im: 0.775914434388, F2: 1.171051763181, Fm2: 0.42722492829, P: 1.598276691471, P_suplementario: 1.598276691471 }, tol_abs: 1e-9 },
      { fuente: 'Ej. 4c, bosones ka = 1: θ = 60° y 90° (Python)', entrada: { caso: 'c', estadistica: 'bosones', ka: 1, theta: 60 },
        salida: { P: 2.792519111179, P_suplementario: 2.792519111179, P90: 2.679176340968 }, tol_abs: 1e-9 },
      { fuente: 'Ej. 4c, fermiones ka = 1: cero a 90° (Python)', entrada: { caso: 'c', estadistica: 'fermiones', ka: 1, theta: 60 },
        salida: { P: 0.404034271763, P90: 0 }, tol_abs: 1e-9 },
      { fuente: 'Ej. 4b, m_s ≠ m_s′ sin medir el espín = caso a (Python)', entrada: { caso: 'b', estadistica: 'fermiones', ka: 2, theta: 30 },
        salida: { F2: 2.499845740913, Fm2: 0.299548202604, P: 2.799393943517 }, tol_abs: 1e-9 },
      { fuente: 'Ej. 4c, fermiones ka = 2, θ = 30° y 150° (Python)', entrada: { caso: 'c', estadistica: 'fermiones', ka: 2, theta: 150 },
        salida: { P: 4.350053070669, P_suplementario: 4.350053070669 }, tol_abs: 1e-9 },
      { fuente: 'Onda s a baja energía: δ₀ = −ka (fórmula cerrada)', entrada: { ka: 1 },
        salida: { delta0: -1 }, tol_abs: 1e-12 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [{ id: 'angular', altura: 300, cols: 'todo' }],
        dibujar: function (res, p, paneles) { dibujar(res, p, paneles.angular); }
      });
    }
  });
})();
