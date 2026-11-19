/* =============================================================================
   ej3-orbitales.js — Ejercicio 3 del complemento D_XIV (p. 1496)
   -----------------------------------------------------------------------------
   Orbitales p_x ∝ sen θ cos φ f(r), p_y ∝ sen θ sen φ f(r); p_α = cos α p_x + sen α p_y.
   Dos electrones con espín + (parte de espín simétrica) ⇒ parte orbital antisimétrica.
   c) |1:p_α;2:p_β⟩ − |1:p_β;2:p_α⟩ = sen(β − α) [|1:p_x;2:p_y⟩ − |1:p_y;2:p_x⟩]
      ⇒ normalizado, es el mismo estado de b) salvo un signo (nulo si β ≡ α mod π).
   d) Integrando r, θ (y r′, θ′), cada partícula aporta la amplitud azimutal
      normalizada u_x(φ) = cos φ/√π, u_y(φ) = sen φ/√π. Densidad de φ₀ = φ₁ − φ₂
      (partículas etiquetadas, |ψ|² simétrica):
        antisimétrico: sen²φ₀ / π       simétrico: 1/(2π)
        sin simetrizar (1 en p_x, 2 en p_y): (2 − cos 2φ₀)/(4π)
   calcular() integra numéricamente en φ (la fórmula cerrada sólo está en las pruebas).
   ============================================================================= */
(function () {
  'use strict';

  var GRAD = Math.PI / 180, RAIZ_PI = Math.sqrt(Math.PI);
  function coma(c) { return function (v) { return Num.formatoNum(v, c).replace('.', ','); }; }

  // Densidad azimutal |ψ(φ₁, φ₂)|² con ψ armada a partir de u_x, u_y
  function densidad(tipo, f1, f2) {
    var a = Math.cos(f1) * Math.sin(f2) / Math.PI, b = Math.sin(f1) * Math.cos(f2) / Math.PI;
    if (tipo === 'antisimetrico') return (a - b) * (a - b) / 2;
    if (tipo === 'simetrico') return (a + b) * (a + b) / 2;
    return a * a;                                             // sin simetrizar
  }

  // p(φ₀) = ∫₀^{2π} |ψ(φ, φ − φ₀)|² dφ   (regla del trapecio: exacta para trigonométricos)
  function densidadRelativa(tipo, f0) {
    var n = 256, h = 2 * Math.PI / n, s = 0;
    for (var i = 0; i < n; i++) s += densidad(tipo, i * h, i * h - f0);
    return s * h;
  }

  function calcular(p) {
    var al = +p.alfa * GRAD, be = +p.beta * GRAD, f0 = +p.phi0 * GRAD, tipo = p.tipo;
    var r = {};
    // Coeficientes de |1:p_α;2:p_β⟩ − |1:p_β;2:p_α⟩ en la base {p_x, p_y} ⊗ {p_x, p_y}
    var a = [Math.cos(al), Math.sin(al)], b = [Math.cos(be), Math.sin(be)], C = [[0, 0], [0, 0]], n2 = 0, i, j;
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) { C[i][j] = a[i] * b[j] - b[i] * a[j]; n2 += C[i][j] * C[i][j]; }
    r.coeficiente = C[0][1];                                  // = sen(β − α)
    r.norma = Math.sqrt(n2);
    if (r.norma < 1e-9) {
      r.solapamiento = 0;
      r.estado_c = 'nulo: p_α y p_β son el mismo orbital (Pauli)';
    } else {
      // ⟨ψ_b|ψ_c⟩ con ψ_b = (|p_x p_y⟩ − |p_y p_x⟩)/√2
      r.solapamiento = Math.abs((C[0][1] - C[1][0]) / Math.SQRT2 / r.norma);
      r.estado_c = (C[0][1] > 0 ? '+' : '−') + '|ψ_b⟩ (el mismo estado físico)';
    }
    r.p_A = densidadRelativa('antisimetrico', f0);
    r.p_S = densidadRelativa('simetrico', f0);
    r.p_D = densidadRelativa('sin', f0);
    r.p_sel = densidadRelativa(tipo, f0);
    // Normalización de p(φ₀) en [0, 2π)
    var m = 120, hh = 2 * Math.PI / m, s = 0;
    for (i = 0; i < m; i++) s += densidadRelativa(tipo, i * hh);
    r.norma_p = s * hh;
    // Curvas para el diagrama polar
    r.curvaPhi = Num.linspace(0, 360, 181);
    r.curvaA = r.curvaPhi.map(function (x) { return densidadRelativa('antisimetrico', x * GRAD); });
    r.curvaS = r.curvaPhi.map(function (x) { return densidadRelativa('simetrico', x * GRAD); });
    r.curvaD = r.curvaPhi.map(function (x) { return densidadRelativa('sin', x * GRAD); });
    // Mapa |ψ(φ₁, φ₂)|² en el plano xOy (θ = θ′ = 90°)
    var NM = 61, Z = [];
    for (i = 0; i < NM; i++) {
      var fila = [], f2 = 360 * i / (NM - 1) * GRAD;
      for (j = 0; j < NM; j++) fila.push(densidad(tipo, 360 * j / (NM - 1) * GRAD, f2));
      Z.push(fila);
    }
    r.mapa = Z;
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }

  function dibujarMapa(res, p, g) {
    g.configurar({
      xlim: [0, 360], ylim: [0, 360], igual: true, xetiqueta: 'φ₁ (°)', yetiqueta: 'φ₂ (°)', leyenda: false,
      margen: { der: 70 },
      descripcion: 'Densidad de probabilidad de los ángulos azimutales de los dos electrones en el plano xOy; para el estado antisimétrico se anula en la diagonal.'
    });
    g.dibujar(function (g) {
      g.mapaCalor(res.mapa, { x0: 0, x1: 360, y0: 0, y1: 360, origenArriba: false, paleta: 'secuencial', barra: true, vmin: 0 });
      g.linea(0, 0, 360, 360, { color: 'texto', estilo: 'punteado', ancho: 1 });
      g.linea(0, 360 - +p.phi0, +p.phi0, 360, { color: 'acento', estilo: 'discontinuo', ancho: 1.2 });
      g.linea(+p.phi0, 0, 360, 360 - +p.phi0, { color: 'acento', estilo: 'discontinuo', ancho: 1.2 });
    });
  }

  function dibujarPolar(res, p, g) {
    var rmax = 0.36;
    g.configurar({
      xlim: [-rmax * 1.25, rmax * 1.25], ylim: [-rmax * 1.85, rmax * 1.12], igual: true, ejes: false, leyenda: 'sw',
      descripcion: 'Diagrama polar de la densidad del ángulo relativo phi0 entre los dos electrones.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), t = res.curvaPhi;
      g.rejillaPolar(0.3, { radios: [0.1, 0.2, 0.3], angulosCada: 45, etiquetas: false });
      g.curvaPolar(t, res.curvaD, { grados: true, color: 'clasico', estilo: 'discontinuo', ancho: 1.6, etiqueta: 'sin simetrizar' });
      g.curvaPolar(t, res.curvaS, { grados: true, color: col.bos, ancho: p.tipo === 'simetrico' ? 2.6 : 1.4, etiqueta: 'simétrico' });
      g.curvaPolar(t, res.curvaA, { grados: true, color: col.fer, ancho: p.tipo === 'antisimetrico' ? 2.6 : 1.4, etiqueta: 'antisimétrico (ej. 3)' });
      var f0 = +p.phi0 * GRAD;
      g.linea(0, 0, 0.34 * Math.cos(f0), 0.34 * Math.sin(f0), { color: 'tenue', estilo: 'punteado', ancho: 1 });
      g.punto(res.p_sel * Math.cos(f0), res.p_sel * Math.sin(f0), { color: p.tipo === 'antisimetrico' ? col.fer : (p.tipo === 'simetrico' ? col.bos : 'clasico') });
      g.texto(0.33, 0.012, 'φ₀ = 0°', { tam: 10, color: 'tenue', align: 'right' });
      g.texto(0.012, 0.335, '90°', { tam: 10, color: 'tenue' });
    });
  }

  var SIM = registrarSim({
    id: 'ej3-orbitales',
    unidad: 9,
    tema: '9.3',
    prioridad: 'A',
    titulo: 'Dos electrones de espín + en orbitales p',
    tipo: 'grafica',

    controles: [
      { id: 'tipo', nombre: 'Parte orbital del estado', defecto: 'antisimetrico',
        opciones: [{ valor: 'antisimetrico', nombre: 'antisimétrica (espines +, ej. 3)' }, { valor: 'simetrico', nombre: 'simétrica (para comparar)' }, { valor: 'sin', nombre: 'sin simetrizar: 1 en p_x, 2 en p_y' }] },
      { id: 'phi0', nombre: 'Ángulo relativo φ₀ = φ₁ − φ₂', unidad: '°', min: 0, max: 360, paso: 1, defecto: 90, animable: true, duracion: 12 },
      { id: 'alfa', nombre: 'Orbital p_α del electrón 1: α', unidad: '°', min: 0, max: 180, paso: 1, defecto: 30 },
      { id: 'beta', nombre: 'Orbital p_β del electrón 2: β', unidad: '°', min: 0, max: 180, paso: 1, defecto: 75 }
    ],

    lecturas: [
      { id: 'p_sel', nombre: 'Densidad de φ₀ (por radián)', formato: coma(4) },
      { id: 'p_A', nombre: 'Antisimétrica: sen²φ₀ / π', formato: coma(4) },
      { id: 'coeficiente', nombre: 'Coeficiente sen(β − α)', formato: coma(4) },
      { id: 'estado_c', nombre: 'Estado de c) normalizado', formato: 'texto' },
      { id: 'solapamiento', nombre: '|⟨ψ_b | ψ_c⟩|', formato: coma(4) }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Ej. 3d: sen²φ₀/π en φ₀ = 90° y 30° (Python)', entrada: { tipo: 'antisimetrico', phi0: 90 },
        salida: { p_A: 0.318309886184, p_sel: 0.318309886184, norma_p: 1 }, tol_abs: 1e-9 },
      { fuente: 'Ej. 3d: φ₀ = 0, los dos electrones nunca tienen el mismo azimut (Python)', entrada: { tipo: 'antisimetrico', phi0: 0 },
        salida: { p_A: 0, p_S: 0.159154943092 }, tol_abs: 1e-12 },
      { fuente: 'Comparación: φ₀ = 30° y 60° (Python, integración en φ)', entrada: { tipo: 'sin', phi0: 60 },
        salida: { p_D: 0.198943678865, p_S: 0.159154943092, p_A: 0.238732414638, norma_p: 1 }, tol_abs: 1e-9 },
      { fuente: 'Ej. 3c: α = 30°, β = 75° ⇒ sen(β − α) = √2/2 y mismo estado (Python)', entrada: { alfa: 30, beta: 75 },
        salida: { coeficiente: 0.707106781187, solapamiento: 1 }, tol_abs: 1e-9 },
      { fuente: 'Ej. 3b: α = 0°, β = 90° es el estado de b) (fórmula cerrada)', entrada: { alfa: 0, beta: 90 },
        salida: { coeficiente: 1, solapamiento: 1, estado_c: '+|ψ_b⟩ (el mismo estado físico)' }, tol_abs: 1e-12 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'polar', altura: 320 },
          { id: 'mapa', altura: 280 }
        ],
        dibujar: function (res, p, paneles) {
          dibujarPolar(res, p, paneles.polar);
          dibujarMapa(res, p, paneles.mapa);
        }
      });
    }
  });
})();
