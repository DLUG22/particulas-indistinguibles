/* =============================================================================
   helio-intercambio.js — Sección 7 · Complemento B_XIV (pp. 1467–1480)
   -----------------------------------------------------------------------------
   Configuración 1s, nl de un átomo de dos electrones (He y sus isoelectrónicos).
   Notación del Cohen (¡al revés que en otros textos!):
     K = ⟨1:1s; 2:nl| W |1:1s; 2:nl⟩            integral DIRECTA       (30)
     J = ⟨1:nl; 2:1s| W |1:1s; 2:nl⟩            integral de INTERCAMBIO (31), (35)
     δ(³L) = K − J ,  δ(¹L) = K + J                                    (29)
   Modelo de los números (no es el cálculo del Cohen, que no evalúa J):
     V_c = −Ze²/r (sin apantallar) ⇒ W = e²/|R₁ − R₂| y orbitales hidrogenoides
     de carga Z. Desarrollo multipolar: sólo sobrevive k = 0 en K y k = l en J:
       K = ∫∫ R₁ₛ²(r₁) R_nl²(r₂) (1/r_>) r₁² r₂² dr₁ dr₂
       J = 1/(2l+1) ∫∫ R₁ₛR_nl(r₁) R₁ₛR_nl(r₂) r_<^l / r_>^{l+1} r₁² r₂² dr₁ dr₂
     Energía de la configuración: E_c = −Z²/2 (1 + 1/n²) en hartree.
   Configuración 1s²: sólo ¹S (el ³S lo prohíbe Pauli), corrimiento K = 5Z/8.
   Las pruebas comparan con los valores exactos de sympy (Python): para Z = 2,
   1s2s: K = 17Z/81, J = 16Z/729; 1s2p: K = 59Z/243, J = 112Z/6561.
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var HA = 27.211386245988;               // e²/a₀ en eV
  var LETRA = 'SPD', letra = 'spd';
  var CONFIGS = { '1s2': [1, 0], '1s2s': [2, 0], '1s2p': [2, 1], '1s3s': [3, 0], '1s3p': [3, 1], '1s3d': [3, 2] };
  var IONES = { 2: 'He', 3: 'Li⁺', 4: 'Be²⁺', 5: 'B³⁺' };
  // Separaciones singlete-triplete medidas que cita el Cohen (pp. 1474 y 1477), en eV
  var COHEN = { '1s2s': 0.8, '1s2p': 0.25 };

  // Funciones radiales hidrogenoides normalizadas: ∫ R² r² dr = 1 (r en a₀)
  function radial(n, l, Z) {
    var a = Math.pow(Z, 1.5);
    if (n === 1) return function (r) { return 2 * a * Math.exp(-Z * r); };
    if (n === 2 && l === 0) return function (r) { return a / Math.SQRT2 * (1 - Z * r / 2) * Math.exp(-Z * r / 2); };
    if (n === 2) return function (r) { return a / (2 * Math.sqrt(6)) * Z * r * Math.exp(-Z * r / 2); };
    var c = a / Math.pow(3, 1.5), x;
    if (l === 0) return function (r) { x = Z * r; return 2 * c * (1 - 2 * x / 3 + 2 * x * x / 27) * Math.exp(-x / 3); };
    if (l === 1) return function (r) { x = Z * r; return 4 * Math.SQRT2 / 9 * c * x * (1 - x / 6) * Math.exp(-x / 3); };
    return function (r) { x = Z * r; return 2 * Math.SQRT2 / (27 * Math.sqrt(5)) * c * x * x * Math.exp(-x / 3); };
  }

  // ∫∫ f(r₁) g(r₂) r_<^k / r_>^{k+1} r₁² r₂² dr₁ dr₂ en una malla uniforme (trapecios acumulados)
  function doble(f, g, k, rmax, N) {
    var h = rmax / N, i, r, A = new Float64Array(N + 1), B = new Float64Array(N + 1);
    var fa = new Float64Array(N + 1), fb = new Float64Array(N + 1);
    for (i = 0; i <= N; i++) {
      r = i * h;
      fa[i] = f(r) * Math.pow(r, k + 2);                       // integrando de r₁ < r₂
      fb[i] = i === 0 ? 0 : f(r) * Math.pow(r, 1 - k);         // integrando de r₁ > r₂
    }
    for (i = 1; i <= N; i++) A[i] = A[i - 1] + h * (fa[i] + fa[i - 1]) / 2;
    for (i = N - 1; i >= 0; i--) B[i] = B[i + 1] + h * (fb[i] + fb[i + 1]) / 2;
    var s = 0;
    for (i = 1; i <= N; i++) {
      r = i * h;
      var ext = A[i] / Math.pow(r, k + 1) + Math.pow(r, k) * B[i];
      s += (i === N ? 0.5 : 1) * g(r) * r * r * ext;
    }
    return s * h;
  }

  function terminos(n, l) {
    if (n === 1) return [{ S: 0, L: 0 }];                      // 1s²: L + S par ⇒ sólo ¹S
    return [{ S: 1, L: l }, { S: 0, L: l }];
  }
  function nombreTermino(t) { return (2 * t.S + 1) + LETRA[t.L]; }
  function superTermino(t) { return (t.S ? '³' : '¹') + LETRA[t.L]; }

  function calcular(p) {
    var Z = Math.round(p.Z), cfg = CONFIGS[p.config] || CONFIGS['1s2s'], n = cfg[0], l = cfg[1], r = {};
    var a = radial(1, 0, Z), b = radial(n, l, Z), rmax = 70 / Z, N = 14000;
    var aa = function (x) { return a(x) * a(x); }, bb = function (x) { return b(x) * b(x); }, ab = function (x) { return a(x) * b(x); };
    r.K_ha = doble(aa, bb, 0, rmax, N);
    r.J_ha = n === 1 ? r.K_ha : doble(ab, ab, l, rmax, N) / (2 * l + 1);
    r.K = r.K_ha * HA;
    r.J = r.J_ha * HA;
    r.Ec = -Z * Z / 2 * (1 + 1 / (n * n)) * HA;
    r.n = n; r.l = l; r.Z = Z;
    r.ion = IONES[Z];
    r.config = n === 1 ? '1s²' : '1s ' + n + letra[l];
    r.terminos = terminos(n, l);
    if (n === 1) {
      r.E_triplete = NaN;
      r.E_singlete = r.Ec + r.K;
      r.separacion = NaN;
    } else {
      r.E_triplete = r.Ec + r.K - r.J;
      r.E_singlete = r.Ec + r.K + r.J;
      r.separacion = 2 * r.J;
    }
    r.cohen = COHEN[p.config] !== undefined && Z === 2 ? COHEN[p.config] : NaN;
    r.listaTerminos = r.terminos.map(function (t) {
      return superTermino(t) + ' (' + (2 * t.L + 1) * (2 * t.S + 1) + ')';
    }).join(' · ');
    r.degConfig = n === 1 ? 1 : 4 * (2 * l + 1);               // (6) y (7) del complemento
    // Densidad radial de pares con los dos electrones sobre una misma semirrecta:
    // P(r₁, r₂) = r₁² r₂² |R₁ₛ(r₁)R_nl(r₂) ± R_nl(r₁)R₁ₛ(r₂)|² / 2   (+ singlete, − triplete)
    var signo = p.espin === 'triplete' && n > 1 ? -1 : 1;
    var norma = n === 1 ? 1 : 0.5;
    function P(x, y) {
      var v = n === 1 ? a(x) * a(y) : a(x) * b(y) + signo * b(x) * a(y);
      return norma * x * x * y * y * v * v;
    }
    r.P_a = P(0.3, 0.3); r.P_b = P(1.5, 0.5); r.P_c = P(0.5, 2);
    var rm = (n === 1 ? 2.5 : (n === 2 ? 6 : 12)) * 2 / Z, NM = 71, Zm = [], i, j, mx = 0;
    for (i = 0; i < NM; i++) {
      var fila = [], y = rm * i / (NM - 1);
      for (j = 0; j < NM; j++) { var v = P(rm * j / (NM - 1), y); fila.push(v); if (v > mx) mx = v; }
      Zm.push(fila);
    }
    r.mapa = Zm; r.rmMapa = rm; r.maxMapa = mx;
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coma(v, c) { return isFinite(v) ? Num.formatoNum(v, c).replace('.', ',').replace('-', '−') : '—'; }
  function eV(clave, c) { return function (res) { return isFinite(res[clave]) ? coma(res[clave], c || 4) + ' eV' : '—'; }; }
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }

  // Diagrama de niveles como la fig. 2 del Cohen: configuración → K → ±J
  function dibujarNiveles(res, p, g) {
    var dos = res.n > 1, J = res.J, K = res.K;
    var y0 = 0, yK = K, y3 = K - J, y1 = K + J;
    var arriba = (dos ? y1 : yK), escala = Math.max(arriba, 1);
    g.configurar({
      xlim: [0, 10], ylim: [-0.3 * escala, 1.22 * escala], ejes: false, leyenda: false,
      margen: { izq: 8, der: 30, arr: 8, aba: 8 },
      descripcion: 'Niveles de energía de la configuración: corrimiento K de la integral directa y separación 2J de la integral de intercambio entre triplete y singlete.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.linea(0.3, y0, 2.6, y0, { color: 'texto', ancho: 2.2 });
      g.texto(1.45, y0, res.config + ' (sin W)', { align: 'center', dy: 14, tam: 11, color: 'texto' });
      g.texto(1.45, y0, 'E_c = ' + coma(res.Ec, 4) + ' eV', { align: 'center', dy: 29, tam: 10, color: 'tenue' });
      g.linea(2.6, y0, 4.2, yK, { color: 'tenue', estilo: 'punteado', ancho: 1 });
      g.linea(4.2, yK, 5.6, yK, { color: 'tenue', estilo: 'discontinuo', ancho: 1.4 });
      g.flecha(4.9, y0, 4.9, yK, { color: 'tenue', ancho: 1.2 });
      g.texto(4.9, yK / 2, 'K = ' + coma(K, 3) + ' eV', { align: 'right', dx: -6, tam: 10.5, color: 'texto' });
      if (!dos) {
        g.linea(5.6, yK, 8.6, yK, { color: col.bos, ancho: 2.6 });
        g.texto(7.1, yK, '¹S (1 estado)', { align: 'center', dy: -9, tam: 11.5, negrita: true, color: col.bos });
        g.texto(7.1, yK, '³S prohibido por Pauli', { align: 'center', dy: 15, tam: 10, color: 'tenue' });
        return;
      }
      var t3 = res.terminos[0], t1 = res.terminos[1];
      var d3 = p.distinguibles ? 4 * (2 * res.l + 1) : 3 * (2 * res.l + 1), d1 = p.distinguibles ? 4 * (2 * res.l + 1) : 2 * res.l + 1;
      var e3 = p.distinguibles ? 'antisimétrico' : superTermino(t3) + ' · S = 1';
      var e1 = p.distinguibles ? 'simétrico' : superTermino(t1) + ' · S = 0';
      g.linea(5.6, yK, 6.5, y3, { color: 'tenue', estilo: 'punteado', ancho: 1 });
      g.linea(5.6, yK, 6.5, y1, { color: 'tenue', estilo: 'punteado', ancho: 1 });
      g.linea(6.5, y3, 9.6, y3, { color: p.distinguibles ? 'texto' : col.fer, ancho: 2.6 });
      g.linea(6.5, y1, 9.6, y1, { color: p.distinguibles ? 'texto' : col.bos, ancho: 2.6 });
      g.texto(8.05, y1, e1 + ' (' + d1 + ')', { align: 'center', dy: -9, tam: 11, negrita: true, color: p.distinguibles ? 'texto' : col.bos });
      g.texto(8.05, y3, e3 + ' (' + d3 + ')', { align: 'center', dy: 15, tam: 11, negrita: true, color: p.distinguibles ? 'texto' : col.fer });
      g.flecha(9.85, y3, 9.85, y1, { color: 'tenue', ancho: 1.2, doble: true });
      g.texto(9.85, yK, '2J = ' + coma(2 * J, 3) + ' eV', { align: 'right', dx: -5, tam: 10.5, color: 'texto' });
    });
  }

  function dibujarMapa(res, p, g) {
    var rm = res.rmMapa;
    g.configurar({
      xlim: [0, rm], ylim: [0, rm], igual: true, xetiqueta: 'r₁ (a₀)', yetiqueta: 'r₂ (a₀)', leyenda: false, margen: { der: 70 },
      descripcion: 'Densidad de los dos electrones situados sobre una misma semirrecta desde el núcleo, en función de sus distancias r uno y r dos; la diagonal es r uno igual a r dos.'
    });
    g.dibujar(function (g) {
      g.mapaCalor(res.mapa, { x0: 0, x1: rm, y0: 0, y1: rm, origenArriba: false, paleta: 'secuencial', barra: true, vmin: 0 });
      g.linea(0, 0, rm, rm, { color: 'texto', estilo: 'punteado', ancho: 1 });
    });
  }

  var SIM = registrarSim({
    id: 'helio-intercambio',
    unidad: 7,
    tema: '7.2',
    prioridad: 'A',
    titulo: 'Helio: integral directa K, integral de intercambio J, singlete y triplete',
    tipo: 'grafica',

    controles: [
      { id: 'config', nombre: 'Configuración', defecto: '1s2s',
        opciones: [{ valor: '1s2', nombre: '1s² (fundamental)' }, { valor: '1s2s', nombre: '1s 2s' }, { valor: '1s2p', nombre: '1s 2p' },
          { valor: '1s3s', nombre: '1s 3s' }, { valor: '1s3p', nombre: '1s 3p' }, { valor: '1s3d', nombre: '1s 3d' }] },
      { id: 'Z', nombre: 'Carga del núcleo Z (2 = He, 3 = Li⁺, …)', min: 2, max: 5, paso: 1, defecto: 2 },
      { id: 'espin', nombre: 'Densidad de pares del', defecto: 'triplete',
        opciones: [{ valor: 'triplete', nombre: 'triplete (orto, parte orbital antisimétrica)' }, { valor: 'singlete', nombre: 'singlete (para, parte orbital simétrica)' }],
        visible: function (e) { return e.config !== '1s2'; } },
      { id: 'distinguibles', nombre: 'Partículas ficticias distinguibles (§2-c-γ)', tipo: 'casilla', defecto: false,
        visible: function (e) { return e.config !== '1s2'; } }
    ],

    lecturas: [
      { id: 'K', nombre: 'K, integral directa (30)', formato: 'texto', valor: eV('K') },
      { id: 'J', nombre: 'J, integral de intercambio (35)', formato: 'texto', valor: eV('J'), visible: function (res) { return res.n > 1; } },
      { id: 'separacion', nombre: 'E(¹L) − E(³L) = 2J', formato: 'texto',
        valor: function (res) { return coma(res.separacion, 4) + ' eV' + (isFinite(res.cohen) ? ' (medida: ≈ ' + coma(res.cohen, 2) + ' eV)' : ''); },
        visible: function (res) { return res.n > 1; } },
      { id: 'E_triplete', nombre: 'Triplete (ortohelio) E_c + K − J', formato: 'texto', valor: eV('E_triplete'), visible: function (res) { return res.n > 1; } },
      { id: 'E_singlete', nombre: 'Singlete (parahelio) E_c + K + J', formato: 'texto', valor: eV('E_singlete') },
      { id: 'listaTerminos', nombre: 'Términos (degeneración)', formato: 'texto',
        valor: function (res) { return res.listaTerminos + ' · total ' + res.degConfig; } }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'He 1s 2s: K = 17Z/81, J = 16Z/729 hartree (sympy, Python)', entrada: { config: '1s2s', Z: 2 },
        salida: { K_ha: 34 / 81, J_ha: 32 / 729, separacion: 2.38892828497014 }, tol_rel: 2e-5 },
      { fuente: 'He 1s 2p: K = 59Z/243, J = 112Z/6561 hartree (sympy, Python)', entrada: { config: '1s2p', Z: 2 },
        salida: { K_ha: 118 / 243, J_ha: 224 / 6561 }, tol_rel: 2e-5 },
      { fuente: 'He 1s²: ⟨e²/r₁₂⟩ = 5Z/8 hartree; E = −74,83 eV (sympy, Python)', entrada: { config: '1s2', Z: 2 },
        salida: { K_ha: 1.25, E_singlete: -74.831312176467 }, tol_rel: 2e-5 },
      { fuente: 'He 1s 3s, 3p, 3d: J = 189Z/32768, 297Z/65536, 81Z/327680 (sympy, Python)', entrada: { config: '1s3d', Z: 2 },
        salida: { K_ha: 1819 / 8192, J_ha: 162 / 327680, E_triplete: -54.441023401397985 }, tol_rel: 2e-5 },
      { fuente: 'He 1s 3s (sympy, Python)', entrada: { config: '1s3s', Z: 2 },
        salida: { K_ha: 1630 / 8192, J_ha: 378 / 32768, E_singlete: -54.74147138552269 }, tol_rel: 2e-5 },
      { fuente: 'Li⁺ 1s 3p: K, J ∝ Z (sympy, Python)', entrada: { config: '1s3p', Z: 3 },
        salida: { K_ha: 3 * 1783 / 16384, J_ha: 3 * 297 / 65536 }, tol_rel: 2e-5 },
      { fuente: 'Densidad de pares 1s 2s, Z = 2: la del triplete se anula en r₁ = r₂ (Python)', entrada: { config: '1s2s', Z: 2, espin: 'triplete' },
        salida: { P_a: 0, P_b: 0.11346599986175433, P_c: 0.19601209586149526 }, tol_rel: 1e-9, tol_abs: 1e-14 },
      { fuente: 'Densidad de pares 1s 2s, singlete, Z = 2 (Python)', entrada: { config: '1s2s', Z: 2, espin: 'singlete' },
        salida: { P_a: 0.16795424956197813, P_b: 0.02423092150176539, P_c: 0.12521729648257246 }, tol_rel: 1e-9 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'niveles', altura: 300 },
          { id: 'mapa', altura: 300 }
        ],
        dibujar: function (res, p, paneles) {
          dibujarNiveles(res, p, paneles.niveles);
          dibujarMapa(res, p, paneles.mapa);
        }
      });
    }
  });
})();
