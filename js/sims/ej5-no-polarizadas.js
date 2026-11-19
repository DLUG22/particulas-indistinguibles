/* =============================================================================
   ej5-no-polarizadas.js — Ejercicio 5 del complemento D_XIV (p. 1497)
   -----------------------------------------------------------------------------
   Dos partículas idénticas de espín s, no polarizadas: cada par ordenado de
   estados de espín (m, m′) tiene probabilidad 1/(2s+1)². Por el ejercicio 4:
       m ≠ m′:  |F(n)|² + |F(−n)|²          m = m′:  |F(n) + ε F(−n)|²
   El promedio da (Cohen):
       P(n) = |F(n)|² + |F(−n)|² + [ε/(2s+1)] [F*(n) F(−n) + c.c.]
   Aquí se hace el promedio por ENUMERACIÓN de los (2s+1)² pares y se compara con
   la fórmula cerrada. A θ = 90°: P/P_dist = 1 + ε/(2s+1) → 1 si s → ∞.
   Modelo de F (propio, no del Cohen): esfera dura de radio a, como ej4-colision.
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var GRAD = Math.PI / 180;
  function coma(c) { return function (v) { return Num.formatoNum(v, c).replace('.', ','); }; }
  var ESPINES = [{ valor: 0, nombre: '0' }, { valor: 0.5, nombre: '½' }, { valor: 1, nombre: '1' }, { valor: 1.5, nombre: '3/2' },
    { valor: 2, nombre: '2' }, { valor: 2.5, nombre: '5/2' }, { valor: 3, nombre: '3' }];
  function nombreEspin(s) { for (var i = 0; i < ESPINES.length; i++) if (ESPINES[i].valor === s) return ESPINES[i].nombre; return String(s); }

  /* ---------------------------------------------- esfera dura (igual que ej4) */
  function besselEsfericas(L, x) {
    var y = [-Math.cos(x) / x, -Math.cos(x) / (x * x) - Math.sin(x) / x], l;
    for (l = 1; l < L; l++) y.push((2 * l + 1) / x * y[l] - y[l - 1]);
    var arr = Math.max(L, Math.ceil(x)) + 30, j = new Array(arr + 2), i;
    j[arr + 1] = 0; j[arr] = 1e-30;
    for (i = arr; i >= 1; i--) j[i - 1] = (2 * i + 1) / x * j[i] - j[i + 1];
    var j0 = Math.sin(x) / x, j1 = Math.sin(x) / (x * x) - Math.cos(x) / x;
    var esc = Math.abs(j0) > Math.abs(j1) ? j0 / j[0] : j1 / j[1], jl = [];
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

  // Promedio explícito sobre los pares de espín (m, m′)
  function promedioEspin(F, G, s, eps) {
    var g = Math.round(2 * s + 1), F2 = F.re * F.re + F.im * F.im, G2 = G.re * G.re + G.im * G.im;
    var re = F.re + eps * G.re, im = F.im + eps * G.im, igual = re * re + im * im, total = 0;
    for (var m = 0; m < g; m++) for (var mp = 0; mp < g; mp++) total += (m === mp) ? igual : F2 + G2;
    return total / (g * g);
  }
  function formula(F, G, s, eps) {
    var F2 = F.re * F.re + F.im * F.im, G2 = G.re * G.re + G.im * G.im;
    return F2 + G2 + eps / (2 * s + 1) * 2 * (F.re * G.re + F.im * G.im);   // F*G + c.c. = 2 Re(F* G)
  }

  function calcular(p) {
    var ka = +p.ka, th = +p.theta * GRAD, s = +p.espin, eps = p.estadistica === 'fermiones' ? -1 : 1;
    var d = desfases(ka), F = amplitud(th, ka, d), G = amplitud(Math.PI - th, ka, d), r = {};
    r.P = promedioEspin(F, G, s, eps);
    r.P_formula = formula(F, G, s, eps);
    r.diferencia = Math.abs(r.P - r.P_formula);
    r.P_dist = F.re * F.re + F.im * F.im + G.re * G.re + G.im * G.im;
    var re = F.re + eps * G.re, im = F.im + eps * G.im;
    r.P_igual = re * re + im * im;
    r.peso = 1 / (2 * s + 1);                                  // fracción de pares con m = m′
    var F90 = amplitud(Math.PI / 2, ka, d);
    r.cociente90 = promedioEspin(F90, F90, s, eps) / (2 * (F90.re * F90.re + F90.im * F90.im));
    r.curvaT = Num.linspace(0, 180, 181);
    var Fs = r.curvaT.map(function (t) { return amplitud(t * GRAD, ka, d); });
    r.curvaP = Fs.map(function (z, i) { return promedioEspin(z, Fs[180 - i], s, eps); });
    r.curvaDist = Fs.map(function (z, i) { var w = Fs[180 - i]; return z.re * z.re + z.im * z.im + w.re * w.re + w.im * w.im; });
    r.curvaIgual = Fs.map(function (z, i) { var w = Fs[180 - i], a = z.re + eps * w.re, b = z.im + eps * w.im; return a * a + b * b; });
    // Cociente a 90° frente a s (bosones en s entero, fermiones en s semientero)
    r.sBos = [0, 1, 2, 3, 4, 5]; r.sFer = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5];
    r.cocBos = r.sBos.map(function (x) { return 1 + 1 / (2 * x + 1); });
    r.cocFer = r.sFer.map(function (x) { return 1 - 1 / (2 * x + 1); });
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }

  function dibujarAngular(res, p, g) {
    var col = coloresFisicos(), fer = p.estadistica === 'fermiones', c = fer ? col.fer : col.bos;
    var ymax = Math.max.apply(null, res.curvaP.concat(res.curvaDist, res.curvaIgual)) * 1.12;
    g.configurar({
      xlim: [0, 180], ylim: [0, ymax], xetiqueta: 'ángulo θ (°)', yetiqueta: 'probabilidad / a²', leyenda: 'ne',
      descripcion: 'Probabilidad de difusión de dos partículas idénticas no polarizadas en función del ángulo.'
    });
    g.dibujar(function (g) {
      g.regionV(88, 92, {});
      g.curva(res.curvaT, res.curvaDist, { color: 'clasico', estilo: 'discontinuo', ancho: 1.8, etiqueta: 'distinguibles' });
      if (+p.espin > 0) g.curva(res.curvaT, res.curvaIgual, { color: c, estilo: 'punteado', ancho: 1.3, etiqueta: 'mismo espín' });
      g.curva(res.curvaT, res.curvaP, { color: c, ancho: 2.4, etiqueta: (fer ? 'fermiones' : 'bosones') + ' s = ' + nombreEspin(+p.espin) + ', no polarizados' });
      g.marcadorV(+p.theta, '', { color: 'tenue' });
      g.punto(+p.theta, res.P, { color: c });
    });
  }

  function dibujarCociente(res, p, g) {
    var col = coloresFisicos();
    g.configurar({
      xlim: [-0.3, 5.8], ylim: [0, 2.15], xetiqueta: 'espín s', yetiqueta: 'P(90°) / P_dist(90°)', leyenda: 'ne',
      descripcion: 'Cociente entre la probabilidad a 90 grados de partículas idénticas no polarizadas y la de distinguibles, en función del espín.'
    });
    g.dibujar(function (g) {
      g.curva([-0.3, 5.8], [1, 1], { color: 'clasico', estilo: 'discontinuo', ancho: 1.6, etiqueta: 'distinguibles' });
      g.curvaF(function (x) { return 1 + 1 / (2 * x + 1); }, 0, 5.8, 120, { color: col.bos, ancho: 1, estilo: 'punteado' });
      g.curvaF(function (x) { return 1 - 1 / (2 * x + 1); }, 0, 5.8, 120, { color: col.fer, ancho: 1, estilo: 'punteado' });
      g.puntos(res.sBos, res.cocBos, { color: col.bos, radio: 4, etiqueta: 'bosones: 1 + 1/(2s+1)' });
      g.puntos(res.sFer, res.cocFer, { color: col.fer, radio: 4, etiqueta: 'fermiones: 1 − 1/(2s+1)' });
      var s = +p.espin;
      g.circulo(s, res.cociente90, 0.12, { color: 'texto', ancho: 1.5 });
    });
  }

  var SIM = registrarSim({
    id: 'ej5-no-polarizadas',
    unidad: 9,
    tema: '9.5',
    prioridad: 'A',
    titulo: 'Colisión de partículas idénticas no polarizadas',
    tipo: 'grafica',

    controles: [
      { id: 'estadistica', nombre: 'Partículas', defecto: 'fermiones',
        opciones: [{ valor: 'bosones', nombre: 'bosones (ε = +1)' }, { valor: 'fermiones', nombre: 'fermiones (ε = −1)' }] },
      { id: 'espin', nombre: 'Espín s', defecto: 0.5, opciones: ESPINES,
        opcionesDeshabilitadas: function (e) { return e.estadistica === 'fermiones' ? [0, 1, 2, 3] : [0.5, 1.5, 2.5]; } },
      { id: 'ka', nombre: 'Energía ka (número de onda × radio)', min: 0.2, max: 4, paso: 0.05, defecto: 1 },
      { id: 'theta', nombre: 'Dirección θ', unidad: '°', min: 0, max: 180, paso: 1, defecto: 60, animable: true, duracion: 10 }
    ],

    lecturas: [
      { id: 'P', nombre: 'Promedio sobre los pares (m, m′) / a²', formato: coma(5) },
      { id: 'P_formula', nombre: 'Fórmula del Cohen / a²', formato: coma(5) },
      { id: 'P_dist', nombre: 'Distinguibles / a²', formato: coma(5) },
      { id: 'peso', nombre: 'Fracción de pares con m = m′: 1/(2s+1)', formato: coma(4) },
      { id: 'cociente90', nombre: 'Cociente con distinguibles a 90°', formato: coma(4) }
    ],

    restriccion: function (e) {
      if (e.estadistica === 'fermiones' && [0, 1, 2, 3].indexOf(+e.espin) >= 0) e.espin = 0.5;
      if (e.estadistica === 'bosones' && [0.5, 1.5, 2.5].indexOf(+e.espin) >= 0) e.espin = 0;
    },

    calcular: calcular,

    pruebas: [
      { fuente: 'Ej. 5, electrones (s = ½), ka = 1, θ = 60°: promedio de los 4 pares en Python', entrada: { estadistica: 'fermiones', espin: 0.5, ka: 1, theta: 60 },
        salida: { P: 1.0011554816171557, P_formula: 1.0011554816171557, cociente90: 0.5 }, tol_abs: 1e-9 },
      { fuente: 'Ej. 5, bosones de espín 1, ka = 1, θ = 60° (Python)', entrada: { estadistica: 'bosones', espin: 1, ka: 1, theta: 60 },
        salida: { P: 1.9963574980404875, cociente90: 1.333333333333 }, tol_abs: 1e-9 },
      { fuente: 'Ej. 5, fermiones de espín 3/2 (Python)', entrada: { estadistica: 'fermiones', espin: 1.5, ka: 1, theta: 60 },
        salida: { P: 1.2997160865441553, cociente90: 0.75 }, tol_abs: 1e-9 },
      { fuente: 'Bosones de espín 0: se recupera el ej. 4c (Python)', entrada: { estadistica: 'bosones', espin: 0, ka: 1, theta: 60 },
        salida: { P: 2.7925191111791534, cociente90: 2 }, tol_abs: 1e-9 },
      { fuente: 'Bosones de espín 2 (Python)', entrada: { estadistica: 'bosones', espin: 2, ka: 1, theta: 60 },
        salida: { P: 1.837125175412755, cociente90: 1.2 }, tol_abs: 1e-9 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        restriccion: SIM.restriccion,
        paneles: [
          { id: 'angular', altura: 280, cols: 'todo' },
          { id: 'cociente', altura: 240, cols: 'todo' }
        ],
        dibujar: function (res, p, paneles) {
          dibujarAngular(res, p, paneles.angular);
          dibujarCociente(res, p, paneles.cociente);
        }
      });
    }
  });
})();
