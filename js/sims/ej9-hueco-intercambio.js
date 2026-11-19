/* =============================================================================
   ej9-hueco-intercambio.js — Ejercicio 9 del complemento D_XIV (pp. 1502–1504)
   -----------------------------------------------------------------------------
   Gas de electrones libres a T = 0 en una caja de arista L con condiciones
   periódicas (Compl. C_XIV, (26)): k = 2π n / L, n ∈ ℤ³, |k| < k_F.
   Con N_σ electrones por orientación de espín, (4π/3) k_F³ = N_σ (2π/L)³.
     ρ_I^± = Σ_k |φ_k|² = k_F³/6π² = N/2L³
     ρ_II^{+−}(r₀, r₀′) = (k_F³/6π²)²                       (sin correlación)
     ρ_II^{++}(r₀, r₀′) = (k_F³/6π²)² [1 − F²(k_F r)],  r = |r₀ − r₀′|
     F(x) = 3 (sen x − x cos x)/x³   (suma sobre k → integral)
   Versión discreta (caja finita), sin pasar a la integral:
     F_N(r) = (1/N_σ) Σ_{|k|<k_F} e^{i k·r}   ⇒   ρ_II^{++}/ρ_I² = 1 − F_N²
   «Carga» del hueco: ρ_I ∫ F²(k_F r) d³r = 1 (falta exactamente un electrón del mismo espín).
   Las pruebas comparan con Python (mpmath y la suma discreta escrita aparte).
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  function F(x) {
    if (Math.abs(x) < 1e-3) return 1 - x * x / 10;                // serie: evita la cancelación
    return 3 * (Math.sin(x) - x * Math.cos(x)) / (x * x * x);
  }

  // Vectores n de la esfera |n| < R (en unidades de 2π/L)
  var CACHE = {};
  function esfera(R) {
    if (CACHE[R]) return CACHE[R];
    var lista = [], m = Math.ceil(R), a, b, c;
    for (a = -m; a <= m; a++) for (b = -m; b <= m; b++) for (c = -m; c <= m; c++) {
      if (a * a + b * b + c * c < R * R) lista.push([a, b, c]);
    }
    CACHE[R] = lista;
    return lista;
  }

  // F_N en r = u L ê (ê = eje x o diagonal (1,1,1)/√3)
  function FN(lista, u, diagonal) {
    var s = 0, f = 2 * Math.PI * u, i, n;
    for (i = 0; i < lista.length; i++) {
      n = lista[i];
      s += Math.cos(f * (diagonal ? (n[0] + n[1] + n[2]) / Math.sqrt(3) : n[0]));
    }
    return s / lista.length;
  }

  function calcular(p) {
    var R = +p.R, diag = p.direccion === 'diagonal', lista = esfera(R), r = {};
    r.N = lista.length;                                            // electrones por espín
    r.kFL = 2 * Math.PI * Math.pow(3 * r.N / (4 * Math.PI), 1 / 3);
    r.F_05 = F(0.5); r.F_2 = F(2); r.F_3 = F(3);
    r.g_2 = 1 - F(2) * F(2);
    r.gprom_2 = 1 - F(2) * F(2) / 2;
    // Discreta en dos puntos de prueba
    r.FN_01 = FN(lista, 0.1, diag);
    r.FN_02 = FN(lista, 0.2, diag);
    // Primer cero de F (tan x = x) y radio donde g = 1/2
    r.ceroF = Num.biseccion(function (x) { return Math.sin(x) - x * Math.cos(x); }, 4, 4.7, 1e-14);
    r.mitad = Num.biseccion(function (x) { return 1 - F(x) * F(x) - 0.5; }, 1, 2.5, 1e-14);
    r.mitadLambda = r.mitad / (2 * Math.PI);
    // Carga del hueco: (1/6π²)·4π ∫₀^X F² x² dx + cola analítica 4,5/X (promedio de 9 cos²x/x²)
    var X = 400, n = 40000, h = X / n, s = 0, k, x;
    for (k = 0; k <= n; k++) { x = k * h; s += ((k === 0 || k === n) ? 1 : (k % 2 ? 4 : 2)) * F(x) * F(x) * x * x; }
    r.hueco = (4 * Math.PI / (6 * Math.PI * Math.PI)) * (s * h / 3 + 4.5 / X);
    // Curvas en x = k_F r ∈ [0, 12]
    r.x = Num.linspace(0, 12, 301);
    r.g = r.x.map(function (v) { return 1 - F(v) * F(v); });
    r.gprom = r.x.map(function (v) { return 1 - F(v) * F(v) / 2; });
    r.xd = []; r.gd = [];
    var M = 70;
    for (k = 0; k <= M; k++) {
      var xx = 12 * k / M, u = xx / r.kFL;
      if (u > 0.5) break;                                          // más allá de L/2 manda la periodicidad
      var fn = FN(lista, u, diag);
      r.xd.push(xx); r.gd.push(1 - fn * fn);
    }
    // Corte n_z = 0 de la esfera de Fermi (para el panel del espacio k)
    r.kx = []; r.ky = [];
    lista.forEach(function (v) { if (v[2] === 0) { r.kx.push(v[0]); r.ky.push(v[1]); } });
    r.R = R;
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coma(v, c) { return isFinite(v) ? Num.formatoNum(v, c).replace('.', ',').replace('-', '−') : '—'; }
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }

  function dibujarG(res, g) {
    g.configurar({
      xlim: [0, 12], ylim: [0, 1.25], xetiqueta: 'k_F r', yetiqueta: 'ρ_II / (ρ_I)²', leyenda: 'se', margen: { der: 26 },
      descripcion: 'Densidad de dos partículas normalizada en función de la distancia: espines opuestos, mismo espín y promedio sin polarizar.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.curva([0, 12], [1, 1], { color: 'clasico', estilo: 'discontinuo', ancho: 1.6, etiqueta: 'espines opuestos (+−)' });
      g.curva(res.x, res.gprom, { color: 'texto', estilo: 'punteado', ancho: 1.6, etiqueta: 'promedio de espines' });
      g.relleno(res.x, res.g, { color: col.fer, alfa: 0.12 });
      g.curva(res.x, res.g, { color: col.fer, ancho: 2.4, etiqueta: 'mismo espín: 1 − F²' });
      g.puntos(res.xd, res.gd, { radio: 2.6, color: col.fer });
      g.marcadorV(res.mitad, '', { color: 'tenue' });
      g.texto(res.mitad, 0.5, '½', { dx: 5, tam: 11, color: 'tenue' });
    });
  }

  function dibujarEsfera(res, g) {
    var m = Math.ceil(res.R) + 0.6;
    g.configurar({
      xlim: [-m, m], ylim: [-m, m], igual: true, xetiqueta: 'k_x (2π/L)', yetiqueta: 'k_y (2π/L)', leyenda: false,
      descripcion: 'Corte k z igual a cero de la esfera de Fermi: los vectores de onda ocupados.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.circulo(0, 0, res.R, { borde: col.fer, ancho: 1.5, estilo: 'discontinuo' });
      g.puntos(res.kx, res.ky, { radio: 3, color: col.fer });
    });
  }

  var SIM = registrarSim({
    id: 'ej9-hueco-intercambio',
    unidad: 9,
    tema: '9.9',
    prioridad: 'A',
    titulo: 'El hueco de intercambio en un gas de electrones',
    tipo: 'grafica',

    controles: [
      { id: 'R', nombre: 'Radio de Fermi en la caja (unidades de 2π/L)', min: 1.5, max: 8, paso: 0.25, defecto: 4, animable: true, duracion: 10 },
      { id: 'direccion', nombre: 'Dirección de r₀ − r₀′', defecto: 'eje',
        opciones: [{ valor: 'eje', nombre: 'a lo largo de Ox' }, { valor: 'diagonal', nombre: 'diagonal (1, 1, 1)' }] }
    ],

    lecturas: [
      { id: 'N', nombre: 'Electrones por espín en la caja', formato: 'texto', valor: function (res) { return String(res.N); } },
      { id: 'mitad', nombre: 'Radio donde ρ_II⁺⁺ = ½ ρ_I²', formato: 'texto',
        valor: function (res) { return 'k_F r = ' + coma(res.mitad, 4) + ' ≈ ' + coma(res.mitadLambda, 3) + ' λ_F'; } },
      { id: 'ceroF', nombre: 'Primer cero de F (tan x = x)', formato: 'texto', valor: function (res) { return coma(res.ceroF, 5); } },
      { id: 'hueco', nombre: 'Electrones que faltan en el hueco', formato: 'texto', valor: function (res) { return coma(res.hueco, 4); } }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Ej. 9 III-c: F(x) = 3(sen x − x cos x)/x³ (mpmath)', entrada: {},
        salida: { F_05: 0.975222183816399, F_2: 0.653096662469987, F_3: 0.345677499762356 }, tol_rel: 1e-12 },
      { fuente: 'Ej. 9: ρ_II⁺⁺/ρ_I² = 1 − F² y promedio 1 − F²/2 en k_F r = 2 (mpmath)', entrada: {},
        salida: { g_2: 0.573464749470563, gprom_2: 0.786732374735282 }, tol_rel: 1e-12 },
      { fuente: 'Primer cero de F y radio de media altura del hueco (mpmath, findroot)', entrada: {},
        salida: { ceroF: 4.49340945790906, mitad: 1.81482297700123 }, tol_rel: 1e-10 },
      { fuente: 'Regla de suma: el hueco contiene exactamente un electrón (cálculo analítico)', entrada: {},
        salida: { hueco: 1 }, tol_abs: 1e-4 },
      { fuente: 'Suma discreta en la caja, R = 5 (485 estados), eje x (Python)', entrada: { R: 5, direccion: 'eje' },
        salida: { N: 485, kFL: 30.624164206866272, FN_01: 0.31964187883503764, FN_02: -0.11826944283504784 }, tol_rel: 1e-9 },
      { fuente: 'Suma discreta en la caja, R = 3 (93 estados), diagonal (Python)', entrada: { R: 3, direccion: 'diagonal' },
        salida: { N: 93, FN_02: 0.21714104841077708 }, tol_rel: 1e-9 },
      { fuente: 'Suma discreta en la caja, R = 8 (2103 estados), eje x (Python)', entrada: { R: 8, direccion: 'eje' },
        salida: { N: 2103, FN_01: -0.06571880700070909 }, tol_rel: 1e-9 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'g', altura: 290 },
          { id: 'esfera', altura: 290 }
        ],
        dibujar: function (res, p, paneles) {
          dibujarG(res, paneles.g);
          dibujarEsfera(res, paneles.esfera);
        }
      });
    }
  });
})();
