/* =============================================================================
   colision-identicas.js — Sección 5 · Cohen §D-2-a-β, §D-2-b-β (pp. 1450–1455)
                           y ejercicios 4 y 5 del complemento D_XIV
   -----------------------------------------------------------------------------
   Choque elástico de dos partículas idénticas en el sistema del centro de masa.
   Amplitud de difusión f(θ) en la dirección n; el término de intercambio es
   f(π − θ) (la otra partícula sale en n), (D-32).
   Modelo (propio, no del Cohen): aproximación de Born para un potencial gaussiano
   de alcance a, con amplitud normalizada f(0) = 1:
       f(θ) = exp[−(ka)² sen²(θ/2)]          (real)
   Probabilidades por ángulo sólido (en unidades de |f(0)|²):
     · distinguibles, aparato que no las distingue: |f(θ)|² + |f(π−θ)|²
     · idénticas con el mismo estado de espín:     |f(θ) + ε f(π−θ)|²
     · idénticas no polarizadas de espín s (ej. 5):
           |f(θ)|² + |f(π−θ)|² + [2ε/(2s+1)] Re[f(θ) f*(π−θ)]
   Todas son invariantes ante θ → π − θ (cambiar n por −n multiplica la amplitud por ε).
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var GRAD = Math.PI / 180;
  function amp(theta, ka) { var s = Math.sin(theta / 2); return Math.exp(-ka * ka * s * s); }

  function seccion(theta, ka, eps, s, polarizadas) {
    var a = amp(theta, ka), b = amp(Math.PI - theta, ka);
    if (eps === 0) return a * a + b * b;                                  // distinguibles
    if (polarizadas) return (a + eps * b) * (a + eps * b);
    return a * a + b * b + 2 * eps / (2 * s + 1) * a * b;
  }

  function calcular(p) {
    var ka = +p.ka, th = +p.theta * GRAD;
    var eps = p.estadistica === 'fermiones' ? -1 : 1, s = +p.espin, pol = p.polarizacion === 'igual';
    var r = {};
    r.f = amp(th, ka);
    r.f_intercambio = amp(Math.PI - th, ka);
    r.sigma = seccion(th, ka, eps, s, pol);
    r.sigma_dist = seccion(th, ka, 0);
    r.sigma_igual = seccion(th, ka, eps, s, true);
    r.cociente = r.sigma / r.sigma_dist;
    r.sigma90 = seccion(Math.PI / 2, ka, eps, s, pol);
    r.sigma90_dist = seccion(Math.PI / 2, ka, 0);
    r.curvaT = Num.linspace(0, 180, 181);
    r.curva = r.curvaT.map(function (t) { return seccion(t * GRAD, ka, eps, s, pol); });
    r.curvaDist = r.curvaT.map(function (t) { return seccion(t * GRAD, ka, 0); });
    r.curvaIgual = r.curvaT.map(function (t) { return seccion(t * GRAD, ka, eps, s, true); });
    r.curvaF = r.curvaT.map(function (t) { return amp(t * GRAD, ka) * amp(t * GRAD, ka); });
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coma(c) { return function (v) { return Num.formatoNum(v, c).replace('.', ','); }; }
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }
  var ESPINES = [{ valor: 0, nombre: '0' }, { valor: 0.5, nombre: '½' }, { valor: 1, nombre: '1' }, { valor: 1.5, nombre: '3/2' }, { valor: 2, nombre: '2' }];
  function nombreEspin(s) { for (var i = 0; i < ESPINES.length; i++) if (ESPINES[i].valor === s) return ESPINES[i].nombre; return String(s); }

  function dibujarSeccion(res, p, g) {
    var fer = p.estadistica === 'fermiones', pol = p.polarizacion === 'igual';
    var ymax = Math.max.apply(null, res.curva.concat(res.curvaDist, res.curvaIgual)) * 1.12;
    g.configurar({
      xlim: [0, 180], ylim: [0, ymax], xetiqueta: 'ángulo de difusión θ (°)', yetiqueta: 'probabilidad por ángulo sólido', leyenda: 'ne',
      descripcion: 'Probabilidad de detectar una partícula en la dirección theta para partículas idénticas y distinguibles.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), c = fer ? col.fer : col.bos;
      g.regionV(85, 95, {});
      g.curva(res.curvaT, res.curvaF, { color: 'tenue', ancho: 1.2, estilo: 'punteado', etiqueta: '|f(θ)|² (sólo directo)' });
      g.curva(res.curvaT, res.curvaDist, { color: 'clasico', estilo: 'discontinuo', ancho: 2, etiqueta: 'distinguibles' });
      if (!pol && +p.espin > 0) g.curva(res.curvaT, res.curvaIgual, { color: c, ancho: 1.2, estilo: 'punteado', etiqueta: 'mismo espín' });
      g.curva(res.curvaT, res.curva, { color: c, ancho: 2.4,
        etiqueta: (fer ? 'fermiones' : 'bosones') + ' s = ' + nombreEspin(+p.espin) + (pol || +p.espin === 0 ? '' : ', no polarizados') });
      g.marcadorV(+p.theta, '', { color: 'tenue' });
      g.punto(+p.theta, res.sigma, { color: c });
      g.punto(+p.theta, res.sigma_dist, { color: 'clasico' });
    });
  }

  // Esquema de los dos procesos (Fig. 7 del Cohen): directo y de intercambio
  function dibujarEsquema(res, p, g) {
    g.configurar({
      xlim: [-2.3, 2.3], ylim: [-1.25, 1.25], ejes: false, igual: true, leyenda: false,
      margen: { izq: 4, der: 4, arr: 4, aba: 4 },
      descripcion: 'Proceso directo: la partícula que venía por la izquierda sale en la dirección n. Proceso de intercambio: sale en la dirección opuesta.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), th = +p.theta * GRAD;
      [[-1.15, 'directo · f(θ)', 1], [1.15, 'intercambio · f(π−θ)', -1]].forEach(function (q) {
        var cx = q[0], sg = q[2], R = 0.85;
        g.linea(cx - 1.05, 0, cx + 1.05, 0, { color: 'grid', ancho: 1 });
        g.flecha(cx - R, 0, cx - 0.12, 0, { color: col.bos, ancho: 2, cabeza: 7 });
        g.flecha(cx + R, 0, cx + 0.12, 0, { color: col.fer, ancho: 2, cabeza: 7 });
        var dx = R * Math.cos(th), dy = R * Math.sin(th);
        g.flecha(cx, 0, cx + sg * dx, sg * dy, { color: col.bos, ancho: 2, cabeza: 7 });
        g.flecha(cx, 0, cx - sg * dx, -sg * dy, { color: col.fer, ancho: 2, cabeza: 7 });
        g.linea(cx - dx * 1.2, -dy * 1.2, cx + dx * 1.2, dy * 1.2, { color: 'tenue', estilo: 'punteado', ancho: 1 });
        g.texto(cx + dx * 1.15, dy * 1.15 + 0.08, 'n', { align: 'center', base: 'middle', tam: 11, color: 'tenue' });
        g.texto(cx, -1.1, q[1], { align: 'center', base: 'middle', tam: 11, negrita: true, color: 'texto' });
      });
      g.texto(0, 1.12, p.estadistica === 'fermiones' ? 'amplitud = f(θ) − f(π−θ)' : 'amplitud = f(θ) + f(π−θ)', { align: 'center', base: 'middle', tam: 11, color: p.estadistica === 'fermiones' ? col.fer : col.bos });
    });
  }

  var SIM = registrarSim({
    id: 'colision-identicas',
    unidad: 5,
    tema: '5.2',
    prioridad: 'A',
    titulo: 'Colisión de dos partículas idénticas',
    tipo: 'grafica',

    controles: [
      { id: 'estadistica', nombre: 'Partículas', defecto: 'fermiones',
        opciones: [{ valor: 'bosones', nombre: 'bosones (ε = +1)' }, { valor: 'fermiones', nombre: 'fermiones (ε = −1)' }] },
      { id: 'espin', nombre: 'Espín s', defecto: 0.5, opciones: ESPINES,
        opcionesDeshabilitadas: function (e) { return e.estadistica === 'fermiones' ? [0, 1, 2] : [0.5, 1.5]; } },
      { id: 'polarizacion', nombre: 'Estados de espín iniciales', defecto: 'igual',
        opciones: [{ valor: 'igual', nombre: 'el mismo para las dos' }, { valor: 'no', nombre: 'no polarizados (ejercicio 5)' }],
        visible: function (e) { return +e.espin > 0; } },
      { id: 'ka', nombre: 'Energía ka (alcance × número de onda)', min: 0.1, max: 3, paso: 0.05, defecto: 1.2 },
      { id: 'theta', nombre: 'Dirección de detección θ', unidad: '°', min: 0, max: 180, paso: 1, defecto: 60, animable: true, duracion: 10 }
    ],

    lecturas: [
      { id: 'f', nombre: 'f(θ) (directo)', formato: coma(4) },
      { id: 'f_intercambio', nombre: 'f(π−θ) (intercambio)', formato: coma(4) },
      { id: 'sigma', nombre: 'Idénticas: probabilidad en θ', formato: coma(4) },
      { id: 'sigma_dist', nombre: 'Distinguibles: |f(θ)|² + |f(π−θ)|²', formato: coma(4) },
      { id: 'cociente', nombre: 'Cociente idénticas / distinguibles', formato: coma(3) },
      { id: 'sigma90', nombre: 'Idénticas a θ = 90°', formato: coma(4) }
    ],

    restriccion: function (e) {
      if (e.estadistica === 'fermiones' && [0, 1, 2].indexOf(+e.espin) >= 0) e.espin = 0.5;
      if (e.estadistica === 'bosones' && [0.5, 1.5].indexOf(+e.espin) >= 0) e.espin = 0;
    },

    calcular: calcular,

    pruebas: [
      { fuente: 'Cohen (D-32) y (D-23): bosones de espín 0, θ = 90° (Python)', entrada: { estadistica: 'bosones', espin: 0, ka: 1, theta: 90 },
        salida: { f: 0.606530659713, sigma: 1.47151776469, sigma_dist: 0.735758882343, cociente: 2 }, tol_abs: 1e-10 },
      { fuente: 'Fermiones con el mismo espín: cero a 90° (Python)', entrada: { estadistica: 'fermiones', espin: 0.5, polarizacion: 'igual', ka: 1, theta: 90 },
        salida: { sigma: 0, sigma_dist: 0.735758882343 }, tol_abs: 1e-12 },
      { fuente: 'Fermiones con el mismo espín, θ = 60° (Python)', entrada: { estadistica: 'fermiones', espin: 0.5, polarizacion: 'igual', ka: 1, theta: 60 },
        salida: { f: 0.778800783071, f_intercambio: 0.472366552741, sigma: 0.0939019375182, sigma_dist: 0.829660819861 }, tol_abs: 1e-10 },
      { fuente: 'Ejercicio 5, electrones no polarizados (promedio de espín en Python)', entrada: { estadistica: 'fermiones', espin: 0.5, polarizacion: 'no', ka: 1, theta: 60 },
        salida: { sigma: 0.46178137869, sigma90: 0.367879441171 }, tol_abs: 1e-10 },
      { fuente: 'Ejercicio 5, bosones de espín 1 no polarizados (Python)', entrada: { estadistica: 'bosones', espin: 1, polarizacion: 'no', ka: 1, theta: 60 },
        salida: { sigma: 1.07491378064 }, tol_abs: 1e-10 },
      { fuente: 'Ejercicio 5, fermiones de espín 3/2 no polarizados (Python)', entrada: { estadistica: 'fermiones', espin: 1.5, polarizacion: 'no', ka: 1, theta: 60 },
        salida: { sigma: 0.645721099275 }, tol_abs: 1e-10 },
      { fuente: 'ka = 2, θ = 30° (Python)', entrada: { estadistica: 'bosones', espin: 0, ka: 2, theta: 30 },
        salida: { sigma: 0.622347947659, f_intercambio: 0.0239436815676 }, tol_abs: 1e-10 },
      { fuente: 'Simetría θ → π − θ (D-32): ka = 2, θ = 150° (Python)', entrada: { estadistica: 'fermiones', espin: 0.5, polarizacion: 'igual', ka: 2, theta: 150 },
        salida: { sigma: 0.549085392105, sigma_dist: 0.585716669882 }, tol_abs: 1e-10 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        restriccion: SIM.restriccion,
        paneles: [
          { id: 'esquema', altura: 190, cols: 'todo' },
          { id: 'seccion', altura: 280, cols: 'todo' }
        ],
        dibujar: function (res, p, paneles) {
          dibujarEsquema(res, p, paneles.esquema);
          dibujarSeccion(res, p, paneles.seccion);
        }
      });
    }
  });
})();
