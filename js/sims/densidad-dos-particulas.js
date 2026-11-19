/* =============================================================================
   densidad-dos-particulas.js — Sección 5 · Cohen §D-2-a-α y §D-2-b-α (pp. 1447–1454)
   -----------------------------------------------------------------------------
   Dos partículas idénticas sin espín en 1D, una en φ y otra en χ (paquetes
   gaussianos reales de anchura σ = 1 centrados en −d/2 y +d/2):
       φ(x) = (2π)^(−1/4) exp[−(x + d/2)²/4],  χ(x) = (2π)^(−1/4) exp[−(x − d/2)²/4]
   Solapamiento S = ⟨φ|χ⟩ = exp(−d²/8).
   Medida de las dos posiciones (B = X en D-12…D-18): densidad de dos partículas
       idénticas:     ρ(x₁,x₂) = |φ(x₁)χ(x₂) + ε φ(x₂)χ(x₁)|² / [2(1 + εS²)]
       distinguibles con un aparato que no las distingue (D-20):
                      ρ(x₁,x₂) = [φ(x₁)²χ(x₂)² + φ(x₂)²χ(x₁)²] / 2
   (Si S ≠ 0 los estados no son ortogonales y la normalización es 2(1 + εS²) en vez
   de 2 de (D-10); con d grande S → 0 y se recupera (D-10).)
   Probabilidad de hallar las dos en la misma mitad (x < 0 o x > 0), con a = Φ(d/2):
       P = [2a(1−a) + εS²/2] / (1 + εS²)   (idénticas),   P = 2a(1−a)   (distinguibles)
   Si d → ∞, S → 0 y el término de intercambio desaparece (D-33…D-35).
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var C0 = Math.pow(2 * Math.PI, -0.25);
  function paquete(x, x0) { return C0 * Math.exp(-(x - x0) * (x - x0) / 4); }
  function Phi(z) { return Num.normalCDF(z); }
  var EPS = { bosones: 1, fermiones: -1 };

  function solapamiento(d) { return Math.exp(-d * d / 8); }

  // Densidad de dos partículas; tipo = 'bosones' | 'fermiones' | 'distinguibles'
  function densidad(tipo, d, x1, x2) {
    var a = paquete(x1, -d / 2) * paquete(x2, d / 2), b = paquete(x2, -d / 2) * paquete(x1, d / 2);
    if (tipo === 'distinguibles') return (a * a + b * b) / 2;
    var e = EPS[tipo], S = solapamiento(d), n = 2 * (1 + e * S * S);
    if (n < 1e-12) return NaN;                                // fermiones con d = 0: estado prohibido
    return (a + e * b) * (a + e * b) / n;
  }

  function mismaMitad(tipo, d) {
    var a = Phi(d / 2), base = 2 * a * (1 - a), S2 = solapamiento(d) * solapamiento(d);
    if (tipo === 'distinguibles') return base;
    var e = EPS[tipo];
    if (1 + e * S2 < 1e-9) return NaN;
    return (base + e * S2 / 2) / (1 + e * S2);
  }

  function calcular(p) {
    var d = +p.d, r = {};
    r.S = solapamiento(d);
    r.S2 = r.S * r.S;
    r.P_misma_B = mismaMitad('bosones', d);
    r.P_misma_F = mismaMitad('fermiones', d);
    r.P_misma_D = mismaMitad('distinguibles', d);
    r.fermiones_permitido = isFinite(r.P_misma_F) ? 'sí' : 'no: φ = χ (Pauli)';
    // Valores puntuales (para las pruebas)
    r.rho_B_ref = densidad('bosones', d, 0.5, -0.5);
    r.rho_F_ref = densidad('fermiones', d, 0.5, -0.5);
    r.rho_D_ref = densidad('distinguibles', d, 0.5, -0.5);
    r.rhoDiag_B = densidad('bosones', d, 0.3, 0.3);
    r.rhoDiag_F = densidad('fermiones', d, 0.3, 0.3);
    r.rhoDiag_D = densidad('distinguibles', d, 0.3, 0.3);
    // Mapa del tipo elegido y escala común
    var L = d / 2 + 4, n = 71, xs = Num.linspace(-L, L, n), Z = [], vmax = 0;
    ['bosones', 'fermiones', 'distinguibles'].forEach(function (t) {
      for (var i = 0; i < n; i += 5) for (var j = 0; j < n; j += 5) {
        var v = densidad(t, d, xs[j], xs[i]); if (isFinite(v) && v > vmax) vmax = v;
      }
    });
    for (var i = 0; i < n; i++) {
      var fila = [];
      for (var j = 0; j < n; j++) { var v = densidad(p.tipo, d, xs[j], xs[i]); fila.push(isFinite(v) ? v : 0); if (isFinite(v) && v > vmax) vmax = v; }
      Z.push(fila);
    }
    r.mapa = Z; r.L = L; r.vmax = vmax;
    // Curvas P(misma mitad) en función de d
    r.curvaD = Num.linspace(0, 8, 161);
    r.curvaB = r.curvaD.map(function (x) { return mismaMitad('bosones', x); });
    r.curvaF = r.curvaD.map(function (x) { return mismaMitad('fermiones', x); });
    r.curvaDist = r.curvaD.map(function (x) { return mismaMitad('distinguibles', x); });
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coma(c) { return function (v) { return isFinite(v) ? Num.formatoNum(v, c).replace('.', ',') : '— (prohibido)'; }; }
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }
  var NOMBRE = { bosones: 'bosones', fermiones: 'fermiones', distinguibles: 'distinguibles (D-20)' };

  function dibujarMapa(res, p, g) {
    var L = res.L;
    g.configurar({
      xlim: [-L, L], ylim: [-L, L], igual: true, xetiqueta: 'x₁ (σ)', yetiqueta: 'x₂ (σ)',
      titulo: 'ρ(x₁, x₂) · ' + NOMBRE[p.tipo], leyenda: false, margen: { der: 64 },
      descripcion: 'Densidad de probabilidad de hallar una partícula en x1 y la otra en x2.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      if (p.tipo === 'fermiones' && !isFinite(res.P_misma_F)) {
        g.texto(0, L * 0.45, 'd = 0: φ = χ\nel estado de dos fermiones\nno existe (Pauli)', { align: 'center', base: 'middle', tam: 12, negrita: true, color: col.fer });
        return;
      }
      g.mapaCalor(res.mapa, { x0: -L, x1: L, y0: -L, y1: L, vmin: 0, vmax: res.vmax, paleta: 'secuencial', origenArriba: false, barra: true });
      g.linea(-L, -L, L, L, { color: 'tenue', estilo: 'punteado', ancho: 1 });
      g.marcadorV(0, '', { color: 'tenue' });
      g.marcadorH(0, '', { color: 'tenue' });
      g.texto(-L + 0.4, L - 0.6, 'x₁ = x₂', { tam: 10, color: 'tenue' });
    });
  }

  function dibujarCurva(res, p, g) {
    g.configurar({
      xlim: [0, 8], ylim: [0, 0.55], xetiqueta: 'separación d (σ)', yetiqueta: 'P(misma mitad)', leyenda: 'ne',
      descripcion: 'Probabilidad de hallar las dos partículas del mismo lado del origen, en función de la separación de los paquetes.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.curva(res.curvaD, res.curvaDist, { color: 'clasico', estilo: 'discontinuo', ancho: 2, etiqueta: 'distinguibles' });
      g.curva(res.curvaD, res.curvaB, { color: col.bos, ancho: 2.2, etiqueta: 'bosones' });
      g.curva(res.curvaD, res.curvaF, { color: col.fer, ancho: 2.2, etiqueta: 'fermiones' });
      g.marcadorV(+p.d, '', { color: 'tenue' });
      g.punto(+p.d, res.P_misma_B, { color: col.bos });
      if (isFinite(res.P_misma_F)) g.punto(+p.d, res.P_misma_F, { color: col.fer });
      g.punto(+p.d, res.P_misma_D, { color: 'clasico' });
    });
  }

  var SIM = registrarSim({
    id: 'densidad-dos-particulas',
    unidad: 5,
    tema: '5.1',
    prioridad: 'A',
    titulo: 'Densidad de dos partículas: término directo e intercambio',
    tipo: 'grafica',

    controles: [
      { id: 'd', nombre: 'Separación de los paquetes d', unidad: 'σ', min: 0, max: 8, paso: 0.1, defecto: 2, animable: true, duracion: 10 },
      { id: 'tipo', nombre: 'Mapa de', defecto: 'fermiones',
        opciones: [{ valor: 'bosones', nombre: 'bosones' }, { valor: 'fermiones', nombre: 'fermiones' }, { valor: 'distinguibles', nombre: 'distinguibles' }] }
    ],

    lecturas: [
      { id: 'S', nombre: 'Solapamiento ⟨φ|χ⟩ = e^(−d²/8)', formato: coma(4) },
      { id: 'P_misma_B', nombre: 'P(misma mitad) · bosones', formato: coma(4) },
      { id: 'P_misma_F', nombre: 'P(misma mitad) · fermiones', formato: coma(4) },
      { id: 'P_misma_D', nombre: 'P(misma mitad) · distinguibles', formato: coma(4) }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Fórmula cerrada, verificada con malla 2D en Python (d = 2)', entrada: { d: 2 },
        salida: { S: 0.606530659713, P_misma_B: 0.32963961273, P_misma_F: 0.1313480584, P_misma_D: 0.266967528663 }, tol_abs: 1e-9 },
      { fuente: 'Cohen (D-33…D-35): paquetes separados, d = 5 (Python)', entrada: { d: 5 },
        salida: { S: 0.0439369336234, P_misma_B: 0.013281797931, P_misma_F: 0.0113989889218, P_misma_D: 0.0123422107646 }, tol_abs: 1e-9 },
      { fuente: 'Paquetes casi superpuestos, d = 0,5 (Python)', entrada: { d: 0.5 },
        salida: { P_misma_B: 0.489952693506, P_misma_F: 0.178381539577, P_misma_D: 0.48051412254 }, tol_abs: 1e-9 },
      { fuente: 'Densidad puntual ρ(0,5; −0,5), d = 2 (Python)', entrada: { d: 2 },
        salida: { rho_B_ref: 0.0847743244747, rho_F_ref: 0.0391756698349, rho_D_ref: 0.0703624009484 }, tol_abs: 1e-11 },
      { fuente: 'Diagonal x₁ = x₂: fermiones 0 (Pauli), d = 2 (Python)', entrada: { d: 2 },
        salida: { rhoDiag_B: 0.0782386448862, rhoDiag_F: 0, rhoDiag_D: 0.0535105169225 }, tol_abs: 1e-11 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'mapa', altura: 340, cols: 'todo' },
          { id: 'curva', altura: 240, cols: 'todo' }
        ],
        dibujar: function (res, p, paneles) {
          dibujarMapa(res, p, paneles.mapa);
          dibujarCurva(res, p, paneles.curva);
        }
      });
    }
  });
})();
