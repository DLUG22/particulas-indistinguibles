/* =============================================================================
   ej7-densidades.js — Ejercicio 7 del complemento D_XIV (pp. 1499–1500)
   -----------------------------------------------------------------------------
   Versión en una dimensión. Dos partículas en los orbitales φ y χ (reales):
     · «oscilador»: φ = φ₀, χ = φ₁ del oscilador armónico (ortogonales, ħ = m = ω = 1)
     · «gaussianas»: φ, χ = π^{-1/4} e^{−(x ± d/2)²/2}, con S = ⟨φ|χ⟩ = e^{−d²/4}
   Densidades (ρ_I integra a N = 2; ρ_II a N(N−1) = 2):
     a) fermiones |φ,+⟩, |χ,−⟩ (y bosones con espines ortogonales, y distinguibles
        con aparato ciego):  ρ_II = φ²(x)χ²(x′) + φ²(x′)χ²(x),  ρ_I = φ² + χ²
     b) fermiones |φ,+⟩, |χ,+⟩:  ρ_II = [φ(x)χ(x′) − φ(x′)χ(x)]² / (1 − S²)
                                 ρ_I  = [φ² + χ² − 2Sφχ] / (1 − S²)
     c) bosones en el mismo estado de espín: signo + y 1 + S².
   Las pruebas vienen de Python armando ψ(x₁,m₁;x₂,m₂) y normalizándola en una malla.
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var C4 = Math.pow(Math.PI, -0.25);
  function coma(c) { return function (v) { return isFinite(v) ? Num.formatoNum(v, c).replace('.', ',') : '—'; }; }

  function orbitales(p) {
    if (p.orbitales === 'oscilador') {
      return { phi: function (x) { return C4 * Math.exp(-x * x / 2); },
        chi: function (x) { return C4 * Math.SQRT2 * x * Math.exp(-x * x / 2); }, S: 0 };
    }
    var d = +p.d;
    return { phi: function (x) { return C4 * Math.exp(-(x + d / 2) * (x + d / 2) / 2); },
      chi: function (x) { return C4 * Math.exp(-(x - d / 2) * (x - d / 2) / 2); }, S: Math.exp(-d * d / 4) };
  }

  // Signo del término de intercambio y si los espines son iguales
  function tipoCaso(caso) {
    if (caso === 'b') return { signo: -1, mismoEspin: true };
    if (caso === 'c') return { signo: 1, mismoEspin: true };
    return { signo: 0, mismoEspin: false };                     // a, bosones con espines ortogonales, distinguibles
  }

  function densidades(o, caso) {
    var t = tipoCaso(caso), S = o.S, phi = o.phi, chi = o.chi;
    var norma = t.mismoEspin ? 1 + t.signo * S * S : 1;
    return {
      existe: !(t.mismoEspin && norma < 1e-10),
      rII: function (x, y) {
        if (!t.mismoEspin) return phi(x) * phi(x) * chi(y) * chi(y) + phi(y) * phi(y) * chi(x) * chi(x);
        var a = phi(x) * chi(y) + t.signo * phi(y) * chi(x);
        return a * a / norma;
      },
      rI: function (x) {
        var base = phi(x) * phi(x) + chi(x) * chi(x);
        if (!t.mismoEspin) return base;
        return (base + 2 * t.signo * S * phi(x) * chi(x)) / norma;
      }
    };
  }

  function calcular(p) {
    var o = orbitales(p), D = densidades(o, p.caso), r = {};
    r.S = o.S;
    r.existe = D.existe;
    if (!D.existe) {
      r.aviso = 'Con d = 0 los dos orbitales son el mismo: dos fermiones del mismo espín no caben (Pauli).';
      r.rI_0 = r.rI_1 = r.rII_00 = r.rII_01 = r.rII_m11 = r.int_I = r.int_II = NaN;
      r.x = []; r.rIcurva = []; r.ingenua = []; r.mapa = [[0]];
      return r;
    }
    r.aviso = '';
    r.rI_0 = D.rI(0); r.rI_1 = D.rI(1);
    r.rII_00 = D.rII(0, 0); r.rII_01 = D.rII(0, 1); r.rII_m11 = D.rII(-1, 1);
    // Integrales por Simpson en [−L, L]
    var L = 8, n = 160, h = 2 * L / n, i, j, sI = 0, sII = 0, w = [];
    for (i = 0; i <= n; i++) w.push(i === 0 || i === n ? 1 : (i % 2 ? 4 : 2));
    for (i = 0; i <= n; i++) {
      var xi = -L + i * h;
      sI += w[i] * D.rI(xi);
      for (j = 0; j <= n; j++) sII += w[i] * w[j] * D.rII(xi, -L + j * h);
    }
    r.int_I = sI * h / 3;
    r.int_II = sII * h * h / 9;
    // Curvas y mapa en [−4, 4]
    r.x = Num.linspace(-4, 4, 161);
    r.rIcurva = r.x.map(D.rI);
    r.ingenua = r.x.map(function (x) { return o.phi(x) * o.phi(x) + o.chi(x) * o.chi(x); });
    var NM = 71, Z = [];
    for (i = 0; i < NM; i++) {
      var y = -4 + 8 * i / (NM - 1), fila = [];
      for (j = 0; j < NM; j++) fila.push(D.rII(-4 + 8 * j / (NM - 1), y));
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
  function colorCaso(caso, col) { return caso === 'b' || caso === 'a' ? col.fer : (caso === 'c' || caso === 'c-ort' ? col.bos : 'clasico'); }

  function dibujarMapa(res, p, g) {
    g.configurar({
      xlim: [-4, 4], ylim: [-4, 4], igual: true, xetiqueta: 'x', yetiqueta: 'x′', leyenda: false, margen: { der: 70 },
      descripcion: 'Densidad de dos partículas rho dos de x y x prima; la diagonal punteada es x igual a x prima.'
    });
    g.dibujar(function (g) {
      if (!res.existe) { g.texto(0, 0, 'el estado no existe (Pauli)', { align: 'center', color: 'tenue' }); return; }
      g.mapaCalor(res.mapa, { x0: -4, x1: 4, y0: -4, y1: 4, origenArriba: false, paleta: 'secuencial', barra: true, vmin: 0 });
      g.linea(-4, -4, 4, 4, { color: 'texto', estilo: 'punteado', ancho: 1 });
    });
  }

  function dibujarRhoI(res, p, g) {
    var ymax = res.existe ? Math.max.apply(null, res.rIcurva.concat(res.ingenua)) * 1.38 : 1;
    g.configurar({
      xlim: [-4, 4], ylim: [0, ymax], xetiqueta: 'x', yetiqueta: 'ρ_I(x)', leyenda: 'ne',
      descripcion: 'Densidad de una partícula rho uno de x, comparada con la suma de las densidades de los dos orbitales.'
    });
    g.dibujar(function (g) {
      if (!res.existe) return;
      var col = coloresFisicos(), c = colorCaso(p.caso, col);
      g.curva(res.x, res.ingenua, { color: 'clasico', estilo: 'discontinuo', ancho: 1.6, etiqueta: '|φ|² + |χ|²' });
      g.relleno(res.x, res.rIcurva, { color: c, alfa: 0.15 });
      g.curva(res.x, res.rIcurva, { color: c, ancho: 2.4, etiqueta: 'ρ_I(x)' });
    });
  }

  var SIM = registrarSim({
    id: 'ej7-densidades',
    unidad: 9,
    tema: '9.7',
    prioridad: 'A',
    titulo: 'Densidades de una y dos partículas',
    tipo: 'grafica',

    controles: [
      { id: 'caso', nombre: 'Sistema', defecto: 'b',
        opciones: [{ valor: 'a', nombre: 'a) fermiones |φ,+⟩ y |χ,−⟩' }, { valor: 'b', nombre: 'b) fermiones |φ,+⟩ y |χ,+⟩' },
          { valor: 'c', nombre: 'c) bosones, mismo espín' }, { valor: 'c-ort', nombre: 'c) bosones, espines ortogonales' },
          { valor: 'dist', nombre: 'distinguibles, aparato que no las distingue' }] },
      { id: 'orbitales', nombre: 'Orbitales φ y χ', defecto: 'oscilador',
        opciones: [{ valor: 'oscilador', nombre: 'oscilador: n = 0 y n = 1 (ortogonales)' }, { valor: 'gaussianas', nombre: 'gaussianas separadas d (no ortogonales)' }] },
      { id: 'd', nombre: 'Separación d de las gaussianas', min: 0, max: 5, paso: 0.05, defecto: 1, animable: true, duracion: 10,
        visible: function (e) { return e.orbitales === 'gaussianas'; } }
    ],

    lecturas: [
      { id: 'S', nombre: 'Solapamiento ⟨φ|χ⟩', formato: coma(4) },
      { id: 'int_I', nombre: '∫ ρ_I dx', formato: coma(4) },
      { id: 'int_II', nombre: '∫∫ ρ_II dx dx′', formato: coma(4) },
      { id: 'rII_00', nombre: 'ρ_II(0, 0) (diagonal)', formato: coma(4) },
      { id: 'rI_0', nombre: 'ρ_I(0)', formato: coma(4) }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Ej. 7a, oscilador n = 0, 1 (Python, ψ normalizada en malla)', entrada: { caso: 'a', orbitales: 'oscilador' },
        salida: { rI_0: 0.5641895835, rI_1: 0.6226612461, rII_m11: 0.1723142344, int_I: 2, int_II: 2 }, tol_abs: 1e-8 },
      { fuente: 'Ej. 7b, oscilador: el intercambio duplica ρ_II(−1, 1) (Python)', entrada: { caso: 'b', orbitales: 'oscilador' },
        salida: { rI_0: 0.5641895835, rII_m11: 0.3446284688, rII_00: 0, int_II: 2 }, tol_abs: 1e-8 },
      { fuente: 'Ej. 7b, gaussianas d = 1 no ortogonales (Python)', entrada: { caso: 'b', orbitales: 'gaussianas', d: 1 },
        salida: { S: 0.7788007831, rI_0: 0.4940309153, rI_1: 0.6279549244, rII_00: 0, rII_01: 0.1960612738, rII_m11: 0.3668491055, int_I: 2, int_II: 2 }, tol_abs: 1e-8 },
      { fuente: 'Ej. 7c, bosones mismo espín, gaussianas d = 1 (Python)', entrada: { caso: 'c', orbitales: 'gaussianas', d: 1 },
        salida: { rI_0: 0.9730154418, rII_00: 0.4806997093, int_I: 2 }, tol_abs: 1e-8 },
      { fuente: 'Ej. 7a = distinguibles con aparato ciego, gaussianas d = 1 (Python)', entrada: { caso: 'dist', orbitales: 'gaussianas', d: 1 },
        salida: { rI_0: 0.8787825789, rI_1: 0.4988564341, rII_00: 0.3861294105, rII_01: 0.2191931718 }, tol_abs: 1e-8 },
      { fuente: 'Ej. 7b, gaussianas d = 2 (Python)', entrada: { caso: 'b', orbitales: 'gaussianas', d: 2 },
        salida: { rI_0: 0.303467897, rII_m11: 0.3547693845 }, tol_abs: 1e-8 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'mapa', altura: 290 },
          { id: 'rhoI', altura: 290 }
        ],
        dibujar: function (res, p, paneles) {
          dibujarMapa(res, p, paneles.mapa);
          dibujarRhoI(res, p, paneles.rhoI);
        }
      });
    }
  });
})();
