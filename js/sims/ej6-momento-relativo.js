/* =============================================================================
   ej6-momento-relativo.js — Ejercicio 6 del complemento D_XIV (pp. 1497–1499)
   -----------------------------------------------------------------------------
   P₂₁|r_G, r⟩ = |r_G, −r⟩ ⇒ P₂₁ actúa sobre R_{n,l}(r) Y_l^m como (−1)^l.
   Con espín ½: P₂₁ = (−1)^{S+1} (−1)^l. Postulado:
     · bosones de espín 0:        (−1)^l = +1          → l par
     · fermiones de espín ½, S = 0 (singlete):  l par;   S = 1 (triplete): l impar
   Secciones eficaces totales (cap. VIII, C-58 y ejercicio 6c), en unidades de πa²:
     · distinguibles:             σ = (4/k²) Σ (2l+1) sen²δ_l
     · aparato sensible a las dos (distinguibles): el doble
     · bosones de espín 0:        σ = (16/k²) Σ_{l par} (2l+1) sen²δ_l
     · fermiones ½ no polarizados: σ = (4/k²)[Σ_par + 3 Σ_impar] (2l+1) sen²δ_l
     · singlete: (16/k²) Σ_par ;  triplete: (16/k²) Σ_impar
   Modelo de desfases (propio, no del Cohen): esfera dura de radio a, tan δ_l = j_l/y_l.
   Además se integra |f(θ) ± f(π−θ)|² en el ángulo sólido para comprobar las fórmulas.
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  function coma(c) { return function (v) { return Num.formatoNum(v, c).replace('.', ','); }; }

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
  function amplitud(c, ka, d) {
    var p0 = 1, p1 = c, re = 0, im = 0;
    for (var l = 0; l < d.length; l++) {
      var P = l === 0 ? 1 : (l === 1 ? c : 0);
      if (l >= 2) { var p2 = ((2 * l - 1) * c * p1 - (l - 1) * p0) / l; p0 = p1; p1 = p2; P = p2; }
      var s = Math.sin(d[l]);
      re += (2 * l + 1) * Math.cos(d[l]) * s * P;
      im += (2 * l + 1) * s * s * P;
    }
    return { re: re / ka, im: im / ka };
  }

  // Peso de cada onda parcial en σ (en unidades de 4/k²) y si l está permitido
  var CASOS = {
    distinguibles: { nombre: 'distinguibles', par: 1, impar: 1 },
    bosones: { nombre: 'bosones de espín 0', par: 4, impar: 0 },
    singlete: { nombre: 'fermiones ½, singlete S = 0', par: 4, impar: 0 },
    triplete: { nombre: 'fermiones ½, triplete S = 1', par: 0, impar: 4 },
    nopol: { nombre: 'fermiones ½ no polarizados', par: 1, impar: 3 }
  };

  function sigmaCaso(contrib, ka, caso) {
    var w = CASOS[caso], s = 0;
    for (var l = 0; l < contrib.length; l++) s += (l % 2 === 0 ? w.par : w.impar) * contrib[l];
    return 4 * s / (ka * ka);
  }

  // σ integrando la sección eficaz diferencial (en πa²: ∫ dΩ |amplitud|² / π)
  function sigmaIntegrada(ka, d, caso) {
    var n = 400, h = 2 / n, s = 0;                             // variable u = cos θ ∈ [−1, 1]
    for (var i = 0; i <= n; i++) {
      var u = -1 + i * h, F = amplitud(u, ka, d), G = amplitud(-u, ka, d), v;
      var Fp = { re: F.re + G.re, im: F.im + G.im }, Fm = { re: F.re - G.re, im: F.im - G.im };
      var a2 = Fp.re * Fp.re + Fp.im * Fp.im, b2 = Fm.re * Fm.re + Fm.im * Fm.im, f2 = F.re * F.re + F.im * F.im;
      if (caso === 'distinguibles') v = f2;
      else if (caso === 'bosones' || caso === 'singlete') v = a2;
      else if (caso === 'triplete') v = b2;
      else v = 0.25 * a2 + 0.75 * b2;
      s += (i === 0 || i === n ? 1 : (i % 2 ? 4 : 2)) * v;
    }
    return s * h / 3 * 2 * Math.PI / Math.PI;
  }

  function permitidos(caso) {
    if (caso === 'distinguibles' || caso === 'nopol') return '0, 1, 2, 3, …';
    return CASOS[caso].par ? '0, 2, 4, …' : '1, 3, 5, …';
  }

  function calcular(p) {
    var ka = +p.ka, caso = p.caso, d = desfases(ka), r = {};
    var contrib = d.map(function (x, l) { return (2 * l + 1) * Math.sin(x) * Math.sin(x); });
    r.delta0 = d[0];
    r.sigma = sigmaCaso(contrib, ka, caso);
    r.sigma_dist = sigmaCaso(contrib, ka, 'distinguibles');
    r.sigma_dist_doble = 2 * r.sigma_dist;
    r.sigma_bos = sigmaCaso(contrib, ka, 'bosones');
    r.sigma_nopol = sigmaCaso(contrib, ka, 'nopol');
    r.sigma_integrada = sigmaIntegrada(ka, d, caso);
    var F0 = amplitud(1, ka, d);
    r.sigma_optico = 4 * F0.im / ka;                            // teorema óptico (distinguibles)
    r.l_permitidos = permitidos(caso);
    // Barras: contribución de cada l al σ del caso elegido (en πa²)
    var w = CASOS[caso];
    r.lBarras = []; r.barras = []; r.barrasPermitidas = [];
    for (var l = 0; l < Math.min(d.length, Math.ceil(ka) + 5); l++) {
      r.lBarras.push(l);
      var peso = l % 2 === 0 ? w.par : w.impar;
      r.barras.push(4 * Math.max(peso, 1) * contrib[l] / (ka * ka));
      r.barrasPermitidas.push(peso > 0);
    }
    // Curvas σ(ka)
    r.curvaKa = Num.linspace(0.1, 5, 99);
    var tablas = r.curvaKa.map(function (x) {
      var dd = desfases(x), cc = dd.map(function (y, l) { return (2 * l + 1) * Math.sin(y) * Math.sin(y); });
      return { dist: sigmaCaso(cc, x, 'distinguibles'), bos: sigmaCaso(cc, x, 'bosones'), nopol: sigmaCaso(cc, x, 'nopol'), sel: sigmaCaso(cc, x, caso) };
    });
    r.curvaDist = tablas.map(function (t) { return t.dist; });
    r.curvaDist2 = r.curvaDist.map(function (v) { return 2 * v; });
    r.curvaBos = tablas.map(function (t) { return t.bos; });
    r.curvaNopol = tablas.map(function (t) { return t.nopol; });
    r.curvaSel = tablas.map(function (t) { return t.sel; });
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }
  function colorCaso(caso, col) { return caso === 'distinguibles' ? 'clasico' : (caso === 'bosones' ? col.bos : col.fer); }

  function dibujarBarras(res, p, g) {
    var nL = res.lBarras.length, ymax = Math.max.apply(null, res.barras) * 1.25 || 1;
    g.configurar({
      xlim: [-0.7, nL - 0.3], ylim: [0, ymax], xetiqueta: 'momento angular relativo l', yetiqueta: 'aporte a σ / πa²', leyenda: false,
      descripcion: 'Aporte de cada onda parcial l a la sección eficaz; con una equis y en gris claro, las ondas que el postulado de simetrización prohíbe.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), c = colorCaso(p.caso, col);
      g.barras(res.lBarras, res.barras, { ancho: 0.6, colores: function (i) { return res.barrasPermitidas[i] ? c : 'grid'; }, alfa: 0.85 });
      res.lBarras.forEach(function (l, i) {
        g.texto(l, res.barras[i], res.barrasPermitidas[i] ? '✓' : '✕',
          { align: 'center', dy: -5, tam: 11, negrita: true, color: res.barrasPermitidas[i] ? 'texto' : 'tenue' });
      });
    });
  }

  function dibujarSigma(res, p, g) {
    var ymax = Math.max.apply(null, res.curvaBos.concat(res.curvaNopol, res.curvaSel)) * 1.08;
    g.configurar({
      xlim: [0, 5], ylim: [0, ymax], xetiqueta: 'ka', yetiqueta: 'σ / πa²', leyenda: 'ne',
      descripcion: 'Sección eficaz total de una esfera dura en función de ka para partículas distinguibles, bosones de espín cero y fermiones no polarizados.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.curva(res.curvaKa, res.curvaDist, { color: 'clasico', estilo: 'discontinuo', ancho: 2, etiqueta: 'distinguibles' });
      g.curva(res.curvaKa, res.curvaDist2, { color: 'clasico', estilo: 'punteado', ancho: 1.4, etiqueta: '2 × distinguibles' });
      g.curva(res.curvaKa, res.curvaBos, { color: col.bos, ancho: 2.2, etiqueta: 'bosones s = 0' });
      g.curva(res.curvaKa, res.curvaNopol, { color: col.fer, ancho: 2.2, etiqueta: 'fermiones ½ no pol.' });
      if (p.caso === 'singlete' || p.caso === 'triplete') g.curva(res.curvaKa, res.curvaSel, { color: col.fer, ancho: 1.4, estilo: 'punteado', etiqueta: p.caso });
      g.marcadorV(+p.ka, '', { color: 'tenue' });
      g.punto(+p.ka, res.sigma, { color: colorCaso(p.caso, col) });
    });
  }

  var SIM = registrarSim({
    id: 'ej6-momento-relativo',
    unidad: 9,
    tema: '9.6',
    prioridad: 'A',
    titulo: 'Ondas parciales permitidas y sección eficaz',
    tipo: 'grafica',

    controles: [
      { id: 'caso', nombre: 'Sistema', defecto: 'bosones',
        opciones: [{ valor: 'bosones', nombre: 'a) bosones de espín 0' }, { valor: 'singlete', nombre: 'b) fermiones ½, singlete (S = 0)' },
          { valor: 'triplete', nombre: 'b) fermiones ½, triplete (S = 1)' }, { valor: 'nopol', nombre: 'c-γ) fermiones ½ no polarizados' },
          { valor: 'distinguibles', nombre: 'distinguibles' }] },
      { id: 'ka', nombre: 'Energía ka (número de onda × radio)', min: 0.1, max: 5, paso: 0.05, defecto: 1, animable: true, duracion: 12 }
    ],

    lecturas: [
      { id: 'l_permitidos', nombre: 'Valores de l permitidos', formato: 'texto' },
      { id: 'sigma', nombre: 'σ del sistema / πa²', formato: coma(4) },
      { id: 'sigma_integrada', nombre: 'σ integrando dσ/dΩ / πa²', formato: coma(4) },
      { id: 'sigma_dist', nombre: 'σ distinguibles (C-58) / πa²', formato: coma(4) },
      { id: 'sigma_dist_doble', nombre: 'Distinguibles, aparato que ve las dos / πa²', formato: coma(4) }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Ej. 6c-β, bosones de espín 0, esfera dura ka = 1 (Python, j_l por serie)', entrada: { caso: 'bosones', ka: 1 },
        salida: { sigma: 11.352856843482332, sigma_dist: 3.382437849621187, sigma_optico: 3.382437849621187, l_permitidos: '0, 2, 4, …' }, tol_abs: 1e-8 },
      { fuente: 'Ej. 6c-γ, fermiones ½ no polarizados, ka = 1 y 2 (Python)', entrada: { caso: 'nopol', ka: 2 },
        salida: { sigma: 6.662244454567608, sigma_bos: 4.670035876735216, sigma_dist: 2.9990874643117387 }, tol_abs: 1e-8 },
      { fuente: 'Fórmula = integral de |f ± f(π−θ)|² en 4π (Python, Simpson)', entrada: { caso: 'nopol', ka: 1 },
        salida: { sigma: 4.470885127122395, sigma_integrada: 4.4708851271238235 }, tol_abs: 1e-7 },
      { fuente: 'Hacia el límite ka → 0 (4πa², 16πa², 4πa²): ka = 0,1 (Python)', entrada: { caso: 'bosones', ka: 0.1 },
        salida: { sigma_dist: 3.9868161812510814, sigma_bos: 15.94673772739987, sigma_nopol: 3.9870796800533093, sigma_dist_doble: 7.973632362502163 }, tol_abs: 1e-8 },
      { fuente: 'Ej. 6b-γ: singlete ⇒ l par, triplete ⇒ l impar; P₂₁ = (−1)^{S+1}(−1)^l', entrada: { caso: 'triplete', ka: 1 },
        salida: { l_permitidos: '1, 3, 5, …' } },
      { fuente: 'Ej. 6b-γ, singlete ⇒ l par (misma σ que bosones de espín 0); ka = 0,5 (Python)', entrada: { caso: 'singlete', ka: 0.5 },
        salida: { l_permitidos: '0, 2, 4, …', sigma: 14.710462779420538 }, tol_abs: 1e-8 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'barras', altura: 230, cols: 'todo' },
          { id: 'sigma', altura: 260, cols: 'todo' }
        ],
        dibujar: function (res, p, paneles) {
          dibujarBarras(res, p, paneles.barras);
          dibujarSigma(res, p, paneles.sigma);
        }
      });
    }
  });
})();
