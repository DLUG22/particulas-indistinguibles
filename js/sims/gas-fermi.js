/* =============================================================================
   gas-fermi.js — Sección 8 · Complemento C_XIV (pp. 1481–1495)
   -----------------------------------------------------------------------------
   Gas de electrones libres en una caja de volumen L³ (sin interacciones):
     N(E) = L³/(3π²) (2mE/ħ²)^{3/2}                                        (5)
     E_F = ħ²/2m (3π² N/L³)^{2/3}                                           (7)
     ρ(E) = dN/dE = L³/(2π²) (2m/ħ²)^{3/2} √E = (3N/2) √E / E_F^{3/2}       (8), (9)
   Ocupación de Fermi-Dirac:  f(E, T) = 1 / (e^{(E−μ)/kT} + 1)               (15)
   con μ(T) fijado por ∫ ρ(E) f(E, T) dE = N                                (16)
   Órdenes de magnitud del §1-b:  ΔN/N ≈ (3/2) kT/E_F  (11),  c_V/c_V,cl ≈ kT/E_F (13)/(10)
   Susceptibilidad de Pauli (en SI, con μ₀):  χ = μ₀ (3/2)(N/L³) μ_B²/E_F   (23)
   Caja pequeña: niveles ε = n₁² + n₂² + n₃² (n_i ≥ 1) en unidades de π²ħ²/2mL²,
   dos estados por nivel (espín); (7) en esas unidades da (3N/π)^{2/3}.
   Las pruebas comparan con Python (mpmath: cuadratura y raíz de (16)).
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var MU0 = 1 / (C.eps0 * C.c * C.c);
  var MUB = C.e * C.hbar / (2 * C.me);

  // Niveles de la caja cúbica (positivos, ε ≤ EPSMAX) con su número de estados (×2 por el espín)
  var EPSMAX = 140, NIVELES = null;
  function nivelesCaja() {
    if (NIVELES) return NIVELES;
    var cuenta = {}, a, b, c, s;
    for (a = 1; a * a < EPSMAX; a++) for (b = 1; a * a + b * b < EPSMAX; b++) for (c = 1; (s = a * a + b * b + c * c) <= EPSMAX; c++) {
      cuenta[s] = (cuenta[s] || 0) + 2;
    }
    NIVELES = Object.keys(cuenta).map(Number).sort(function (x, y) { return x - y; }).map(function (k) { return [k, cuenta[k]]; });
    return NIVELES;
  }

  // ∫₀^∞ √x f dx con x = u² (sin singularidad), en unidades reducidas x = E/E_F, t = kT/E_F
  function integralFD(m, t) {
    var umax = Math.sqrt(Math.max(m, 0) + 45 * t), n = 1200, h = umax / n, s = 0;
    for (var i = 0; i <= n; i++) {
      var u = i * h, x = u * u, w = (i === 0 || i === n) ? 1 : (i % 2 ? 4 : 2);
      var z = (x - m) / t, fd = z > 700 ? 0 : 1 / (Math.exp(z) + 1);
      s += w * 2 * u * u * fd;
    }
    return s * h / 3;
  }

  // μ/E_F a la temperatura reducida t: (3/2) ∫ √x f dx = 1   (16)
  function muReducido(t) {
    if (t <= 0) return 1;
    var g = function (m) { return 1.5 * integralFD(m, t) - 1; };
    var a = -40 * t - 1, b = 1.5;
    return Num.biseccion(g, a, b, 1e-13);
  }

  function calcular(p) {
    var r = {}, n = p.n * 1e28, T = +p.T;
    var EF = C.hbar * C.hbar / (2 * C.me) * Math.pow(3 * Math.PI * Math.PI * n, 2 / 3);
    r.EF_eV = EF / C.eV;
    r.kF = Math.pow(3 * Math.PI * Math.PI * n, 1 / 3) * 1e-10;      // Å⁻¹
    r.TF = EF / C.kB;
    r.t = C.kB * T / EF;
    r.mu_red = muReducido(r.t);
    r.mu_eV = r.mu_red * r.EF_eV;
    r.dN = 1.5 * r.t;                                              // (11)
    r.cociente_cv = r.t;                                           // (13)/(10)
    r.chi = MU0 * 1.5 * n * MUB * MUB / EF;                        // (23) en SI
    // Curvas en eV: ρ(E)/V en estados/(eV·nm³) y ν(E) = ρ f
    var Emax = Math.max(1.7 * r.EF_eV, r.mu_eV + 8 * r.t * r.EF_eV);
    var pref = Math.pow(2 * C.me / (C.hbar * C.hbar), 1.5) / (2 * Math.PI * Math.PI) * Math.pow(C.eV, 1.5) * 1e-27;
    r.E = Num.linspace(0, Emax, 401);
    r.rho = r.E.map(function (E) { return pref * Math.sqrt(E); });
    r.f = r.E.map(function (E) {
      if (r.t === 0) return E < r.EF_eV ? 1 : (E === r.EF_eV ? 0.5 : 0);
      var z = (E - r.mu_eV) / (r.t * r.EF_eV); return z > 700 ? 0 : 1 / (Math.exp(z) + 1);
    });
    r.nu = r.rho.map(function (v, i) { return v * r.f[i]; });
    r.Emax = Emax;
    // Comprobación de (16) en unidades físicas: ∫ ν(E) dE (eV, con E = u²) debe dar N/L³ en nm⁻³
    var umax = Math.sqrt(Math.max(r.EF_eV, r.mu_eV) * 1.2 + 45 * r.t * r.EF_eV), nu = 4000, hu = umax / nu, sn = 0;
    for (var k = 0; k <= nu; k++) {
      var Eu = (k * hu) * (k * hu), fu = r.t === 0 ? (Eu < r.EF_eV ? 1 : 0) : 1 / (Math.exp(Math.min(700, (Eu - r.mu_eV) / (r.t * r.EF_eV))) + 1);
      sn += ((k === 0 || k === nu) ? 1 : (k % 2 ? 4 : 2)) * pref * (k * hu) * fu * 2 * (k * hu);
    }
    r.n_integrado = sn * hu / 3;
    r.n_nm3 = n * 1e-27;
    // Caja pequeña con N electrones
    var Nc = Math.round(p.Ncaja), niv = nivelesCaja(), resto = Nc, epsF = NaN, acum = 0;
    r.escX = []; r.escY = [];
    for (var i = 0; i < niv.length; i++) {
      var eps = niv[i][0];
      r.escX.push(eps, eps); r.escY.push(acum, acum + niv[i][1]);
      acum += niv[i][1];
      if (resto > 0) { resto -= niv[i][1]; if (resto <= 0) epsF = eps; }
    }
    r.epsF_caja = epsF;
    r.epsF_formula = Math.pow(3 * Nc / Math.PI, 2 / 3);
    r.Ncaja = Nc;
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coma(v, c) { return isFinite(v) ? Num.formatoNum(v, c).replace('.', ',').replace('-', '−') : '—'; }
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { fer: cs.getPropertyValue('--fermion').trim() };
  }

  function dibujarNu(res, g) {
    var ymax = Math.max.apply(null, res.rho) * 1.1;
    g.configurar({
      xlim: [0, res.Emax], ylim: [0, ymax], xetiqueta: 'E (eV)', yetiqueta: 'estados / (eV·nm³)', leyenda: 'nw',
      descripcion: 'Densidad de estados por unidad de volumen y número de electrones por intervalo de energía, como en la figura 2 del Cohen.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.curva(res.E, res.rho, { color: 'clasico', estilo: 'discontinuo', ancho: 1.6, etiqueta: 'ρ(E)/L³ ∝ √E' });
      g.relleno(res.E, res.nu, { color: col.fer, alfa: 0.18 });
      g.curva(res.E, res.nu, { color: col.fer, ancho: 2.4, etiqueta: 'ν(E) = ρ(E) f(E, T)' });
      g.marcadorV(res.EF_eV, '', { color: 'texto' });
      g.texto(res.EF_eV, ymax * 0.04, 'E_F', { dx: 4, tam: 11, color: 'texto' });
      if (res.t > 0) {
        var kT = res.t * res.EF_eV;
        g.regionV(res.mu_eV - kT, res.mu_eV + kT, { color: col.fer, alfa: 0.08 });
      }
    });
  }

  function dibujarF(res, g) {
    g.configurar({
      xlim: [0, res.Emax], ylim: [0, 1.12], xetiqueta: 'E (eV)', yetiqueta: 'f(E, T)', leyenda: 'ne',
      descripcion: 'Distribución de Fermi-Dirac a la temperatura elegida y en el cero absoluto.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.curva([0, res.EF_eV, res.EF_eV, res.Emax], [1, 1, 0, 0], { color: 'clasico', estilo: 'discontinuo', ancho: 1.5, etiqueta: 'T = 0' });
      g.curva(res.E, res.f, { color: col.fer, ancho: 2.4, etiqueta: 'T elegida' });
      g.marcadorH(0.5, '½', { color: 'tenue' });
      if (res.t > 0) g.marcadorV(res.mu_eV, 'μ', { color: col.fer });
    });
  }

  function dibujarCaja(res, g) {
    var xmax = Math.max(res.epsF_caja * 1.35, 20), ymax = Math.max(res.Ncaja * 1.6, 12);
    var xs = Num.linspace(0, xmax, 200), ys = xs.map(function (x) { return Math.PI / 3 * Math.pow(x, 1.5); });
    g.configurar({
      xlim: [0, xmax], ylim: [0, ymax], xetiqueta: 'E / (π²ħ²/2mL²)', yetiqueta: 'N(E)', leyenda: 'nw',
      descripcion: 'Número de estados con energía menor que E en una caja cúbica pequeña: escalera exacta frente a la fórmula continua.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.curva(xs, ys, { color: 'clasico', estilo: 'discontinuo', ancho: 1.6, etiqueta: 'fórmula (5)' });
      g.curva(res.escX, res.escY, { color: col.fer, ancho: 2, etiqueta: 'conteo exacto' });
      g.marcadorH(res.Ncaja, 'N = ' + res.Ncaja, { color: 'texto' });
      g.marcadorV(res.epsF_caja, 'último nivel', { color: col.fer });
      g.marcadorV(res.epsF_formula, '', { color: 'clasico' });
      g.texto(res.epsF_formula, ymax * 0.04, '(7)', { align: 'right', dx: -4, tam: 10.5, color: 'tenue' });
    });
  }

  var SIM = registrarSim({
    id: 'gas-fermi',
    unidad: 8,
    tema: '8.1',
    prioridad: 'A',
    titulo: 'Gas de Fermi: energía de Fermi, densidad de estados y ocupación',
    tipo: 'grafica',

    controles: [
      { id: 'n', nombre: 'Densidad electrónica N/L³', unidad: '×10²⁸ m⁻³', min: 0.5, max: 20, paso: 0.05, defecto: 2.65,
        ayuda: 'Na 2,65 · K 1,40 · Ag 5,86 · Cu 8,47 · Al 18,1 (valores típicos de metales)' },
      { id: 'T', nombre: 'Temperatura T', unidad: 'K', min: 0, max: 50000, paso: 100, defecto: 5000, animable: true, duracion: 12 },
      { id: 'Ncaja', nombre: 'Electrones en una caja pequeña', min: 2, max: 300, paso: 1, defecto: 20 }
    ],

    lecturas: [
      { id: 'EF_eV', nombre: 'Energía de Fermi E_F (7)', formato: 'texto', valor: function (res) { return coma(res.EF_eV, 4) + ' eV'; } },
      { id: 'TF', nombre: 'Temperatura de Fermi E_F/k', formato: 'texto', valor: function (res) { return coma(res.TF, 4) + ' K'; } },
      { id: 'mu_eV', nombre: 'Nivel de Fermi μ(T) (16)', formato: 'texto', valor: function (res) { return coma(res.mu_eV, 4) + ' eV'; } },
      { id: 'dN', nombre: 'Fracción que «se calienta» ≈ (3/2) kT/E_F (11)', formato: 'texto', valor: function (res) { return coma(res.dN, 3); } },
      { id: 'chi', nombre: 'Susceptibilidad de Pauli χ (23)', formato: 'texto', valor: function (res) { return coma(res.chi * 1e6, 3) + ' × 10⁻⁶'; } },
      { id: 'epsF_caja', nombre: 'Caja pequeña: último nivel / fórmula (7)', formato: 'texto',
        valor: function (res) { return res.epsF_caja + ' / ' + coma(res.epsF_formula, 3) + ' (unidades π²ħ²/2mL²)'; } }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Cohen (7); sodio, n = 2,65×10²⁸ m⁻³ (Python)', entrada: { n: 2.65, T: 0 },
        salida: { EF_eV: 3.24116285160881, kF: 0.922335570906541, TF: 37612.1330463894, mu_eV: 3.24116285160881 }, tol_rel: 1e-6 },
      { fuente: 'Cohen (23) con μ₀; cobre, n = 8,47×10²⁸ m⁻³ (Python)', entrada: { n: 8.47, T: 0 },
        salida: { EF_eV: 7.03276129476282, chi: 1.21866233742764e-5 }, tol_rel: 1e-6 },
      { fuente: 'Cohen (16): μ(T) de la raíz de ∫ρf = N; Na a 10 000 K (mpmath)', entrada: { n: 2.65, T: 10000 },
        salida: { mu_eV: 3.02847842826561, dN: 0.398807480062339, cociente_cv: 0.265871653374893 }, tol_rel: 1e-6 },
      { fuente: 'Cohen (16): Na a 30 000 K, μ muy por debajo de E_F (mpmath)', entrada: { n: 2.65, T: 30000 },
        salida: { mu_eV: 1.09230158060624 }, tol_rel: 1e-6 },
      { fuente: 'Cohen (16): Cu a 5000 K, μ ≈ E_F (mpmath)', entrada: { n: 8.47, T: 5000 },
        salida: { mu_eV: 7.01092596452667 }, tol_rel: 1e-6 },
      { fuente: 'Conservación del número: ∫ ν(E) dE = N/L³ (Cohen 16)', entrada: { n: 2.65, T: 20000 },
        salida: { n_integrado: 26.5 }, tol_rel: 1e-6 },
      { fuente: 'Caja pequeña: llenado exacto de n₁² + n₂² + n₃² (Python)', entrada: { Ncaja: 8 },
        salida: { epsF_caja: 6, epsF_formula: 3.87889103217589 }, tol_rel: 1e-9 },
      { fuente: 'Caja pequeña, N = 300: la fórmula continua se acerca (Python)', entrada: { Ncaja: 300 },
        salida: { epsF_caja: 54, epsF_formula: 43.4572017074277 }, tol_rel: 1e-9 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'nu', altura: 270 },
          { id: 'f', altura: 220 },
          { id: 'caja', altura: 250 }
        ],
        dibujar: function (res, p, paneles) {
          dibujarNu(res, paneles.nu);
          dibujarF(res, paneles.f);
          dibujarCaja(res, paneles.caja);
        }
      });
    }
  });
})();
