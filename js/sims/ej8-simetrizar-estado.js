/* =============================================================================
   ej8-simetrizar-estado.js — Ejercicio 8 del complemento D_XIV (pp. 1500–1502)
   -----------------------------------------------------------------------------
   Comprobación numérica de que basta con simetrizar (antisimetrizar) el estado.
   N = 3 partículas, M estados individuales u₀ … u_{M−1}. |ψ⟩ ∈ 𝓔_S (o 𝓔_A):
     · «ejemplo»: c(i,j,k) = 1 + i + 2j + 3k + 0,5ijk + 0,7jk² + 0,4i²k, luego S (o A)
       y normalización (el mismo estado que en el script de Python de las pruebas);
     · «aleatorio»: coeficientes gaussianos con Num.prng(semilla), luego S (o A).
   Para cada resultado de la medida se calcula la probabilidad de dos maneras:
     P_sim  = ⟨ψ|P_m^S|ψ⟩: proyección sobre 𝓔_m^S = S 𝓔_m (kets de la medida
              simetrizados; base ortonormal por Gram-Schmidt)
     P_dist = ⟨ψ|P_m|ψ⟩: partículas distinguibles con un aparato que no las
              distingue (suma sobre los kets producto de 𝓔_m)
   Medidas: completa (estados individuales de las tres), número de partículas en u₀
   (incompleta) y energía total con e_k = k (incompleta). El ejercicio demuestra
   P_sim = P_dist en todos los casos.
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var PERM = [[0, 1, 2], [1, 2, 0], [2, 0, 1], [1, 0, 2], [0, 2, 1], [2, 1, 0]];
  var SIGNO = [1, 1, 1, -1, -1, -1];
  function coma(c) { return function (v) { return Num.formatoNum(v, c).replace('.', ','); }; }

  function indice(t, M) { return (t[0] * M + t[1]) * M + t[2]; }
  function tupla(q, M) { return [Math.floor(q / (M * M)), Math.floor(q / M) % M, q % M]; }

  // (S o A) aplicado a un vector: (Pψ)(t) = ψ(t permutada)
  function simetrizar(v, M, eps) {
    var n = M * M * M, w = new Float64Array(n);
    for (var q = 0; q < n; q++) {
      var t = tupla(q, M), s = 0;
      for (var a = 0; a < 6; a++) {
        var pa = PERM[a];
        s += (eps < 0 ? SIGNO[a] : 1) * v[indice([t[pa[0]], t[pa[1]], t[pa[2]]], M)];
      }
      w[q] = s / 6;
    }
    return w;
  }
  function producto(a, b) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i] * b[i]; return s; }
  function normalizar(v) { var n = Math.sqrt(producto(v, v)); if (n < 1e-12) return null; for (var i = 0; i < v.length; i++) v[i] /= n; return v; }

  function estado(p, M, eps) {
    var n = M * M * M, c = new Float64Array(n), q;
    if (p.estado === 'aleatorio') {
      var rng = Num.prng(Math.round(+p.semilla));
      for (q = 0; q < n; q++) c[q] = Num.gauss(rng);
    } else {
      for (q = 0; q < n; q++) {
        var t = tupla(q, M), i = t[0], j = t[1], k = t[2];
        c[q] = 1 + i + 2 * j + 3 * k + 0.5 * i * j * k + 0.7 * j * k * k + 0.4 * i * i * k;
      }
    }
    return normalizar(simetrizar(c, M, eps));
  }

  // Lista de resultados posibles: {etiqueta, clave, kets: [índices de kets producto de 𝓔_m]}
  function resultados(medida, M) {
    var n = M * M * M, lista = [], mapa = {}, q;
    for (q = 0; q < n; q++) {
      var t = tupla(q, M), clave, etq;
      if (medida === 'completa') {
        var o = t.slice().sort(function (a, b) { return a - b; });
        clave = o.join(''); etq = 'u' + o.join(',u');
      } else if (medida === 'ocupacion') {
        var c0 = t.filter(function (x) { return x === 0; }).length;
        clave = 'n' + c0; etq = 'n₀ = ' + c0;
      } else {
        var E = t[0] + t[1] + t[2];
        clave = 'E' + E; etq = 'E = ' + E;
      }
      if (!mapa[clave]) { mapa[clave] = { clave: clave, etiqueta: etq, kets: [] }; lista.push(mapa[clave]); }
      mapa[clave].kets.push(q);
    }
    lista.sort(function (a, b) { return a.clave < b.clave ? -1 : (a.clave > b.clave ? 1 : 0); });
    if (medida !== 'completa') lista.sort(function (a, b) { return +a.clave.slice(1) - +b.clave.slice(1); });
    return lista;
  }

  // ⟨ψ|P_m^S|ψ⟩: Gram-Schmidt sobre {S|t⟩ : t ∈ 𝓔_m}
  function probSimetrizada(psi, kets, M, eps) {
    var n = M * M * M, base = [], total = 0;
    kets.forEach(function (q) {
      var e = new Float64Array(n); e[q] = 1;
      var w = simetrizar(e, M, eps);
      base.forEach(function (b) { var a = producto(b, w); for (var i = 0; i < n; i++) w[i] -= a * b[i]; });
      var nn = Math.sqrt(producto(w, w));
      if (nn > 1e-10) { for (var i = 0; i < n; i++) w[i] /= nn; base.push(w); }
    });
    base.forEach(function (b) { var a = producto(b, psi); total += a * a; });
    return { P: total, dimS: base.length };
  }

  function calcular(p) {
    var M = Math.round(+p.M), eps = p.estadistica === 'fermiones' ? -1 : 1, r = {};
    var psi = estado(p, M, eps);
    r.norma = psi ? 1 : 0;
    r.lista = [];
    r.dif_max = 0; r.suma_sim = 0; r.suma_dist = 0;
    if (!psi) return r;
    resultados(p.medida, M).forEach(function (res) {
      var Pd = 0;
      res.kets.forEach(function (q) { Pd += psi[q] * psi[q]; });
      var s = probSimetrizada(psi, res.kets, M, eps);
      r['Psim_' + res.clave] = s.P;
      r['Pdist_' + res.clave] = Pd;
      r.lista.push({ etiqueta: res.etiqueta, Psim: s.P, Pdist: Pd, dim: res.kets.length, dimS: s.dimS });
      r.dif_max = Math.max(r.dif_max, Math.abs(s.P - Pd));
      r.suma_sim += s.P; r.suma_dist += Pd;
    });
    r.n_resultados = r.lista.length;
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }

  function dibujar(res, p, g) {
    var n = res.lista.length || 1, ymax = 0;
    res.lista.forEach(function (x) { ymax = Math.max(ymax, x.Psim, x.Pdist); });
    ymax = ymax > 0 ? ymax * 1.5 : 1;
    var giro = n > 8;
    g.configurar({
      xlim: [-0.8, n - 0.2], ylim: [-ymax * (giro ? 0.3 : 0.14), ymax], ejes: false, leyenda: 'ne',
      margen: { izq: 44, der: 8, arr: 10, aba: 8 },
      descripcion: 'Probabilidad de cada resultado de la medida calculada con el ket de la medida simetrizado y como partículas distinguibles; las dos barras coinciden.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), c = p.estadistica === 'fermiones' ? col.fer : col.bos;
      // rejilla y eje y propios
      var marcas = Graf.ticks ? Graf.ticks(0, ymax, 4) : [0, ymax / 2, ymax];
      (marcas.valores || marcas).forEach(function (v) {
        if (v < 0 || v > ymax) return;
        g.linea(-0.8, v, n - 0.2, v, { color: 'grid', ancho: 1 });
        g.texto(-0.8, v, Num.formatoNum(v, 2).replace('.', ','), { align: 'right', base: 'middle', dx: -4, tam: 10, color: 'tenue', dentro: false });
      });
      g.linea(-0.8, 0, n - 0.2, 0, { color: 'eje', ancho: 1 });
      var xs1 = [], xs2 = [], y1 = [], y2 = [];
      res.lista.forEach(function (x, i) { xs1.push(i - 0.19); xs2.push(i + 0.19); y1.push(x.Psim); y2.push(x.Pdist); });
      g.barras(xs1, y1, { ancho: 0.36, color: c, alfa: 0.85, etiqueta: 'P_m^S: kets simetrizados' });
      g.barras(xs2, y2, { ancho: 0.36, color: 'clasico', alfa: 0.55, etiqueta: 'P_m: distinguibles, aparato ciego' });
      res.lista.forEach(function (x, i) {
        if (giro) g.texto(i, -ymax * 0.03, x.etiqueta, { tam: 9, color: 'texto', angulo: -Math.PI / 2, align: 'right', base: 'middle' });
        else g.texto(i, -ymax * 0.07, x.etiqueta, { tam: 10, color: 'texto', align: 'center', base: 'middle' });
      });
    });
  }

  var SIM = registrarSim({
    id: 'ej8-simetrizar-estado',
    unidad: 9,
    tema: '9.8',
    prioridad: 'A',
    titulo: 'Basta con simetrizar el estado: comprobación con 3 partículas',
    tipo: 'grafica',

    controles: [
      { id: 'estadistica', nombre: 'Partículas', defecto: 'bosones',
        opciones: [{ valor: 'bosones', nombre: 'bosones: |ψ⟩ ∈ 𝓔_S' }, { valor: 'fermiones', nombre: 'fermiones: |ψ⟩ ∈ 𝓔_A' }] },
      { id: 'medida', nombre: 'Medida', defecto: 'completa',
        opciones: [{ valor: 'completa', nombre: 'completa: estado individual de cada una (I)' }, { valor: 'ocupacion', nombre: 'incompleta: cuántas en u₀ (II)' }, { valor: 'energia', nombre: 'incompleta: energía total, e_k = k (II)' }] },
      { id: 'M', nombre: 'Estados individuales M', min: 3, max: 4, paso: 1, defecto: 3 },
      { id: 'estado', nombre: 'Estado |ψ⟩', defecto: 'ejemplo',
        opciones: [{ valor: 'ejemplo', nombre: 'el del texto (fórmula fija)' }, { valor: 'aleatorio', nombre: 'aleatorio' }] },
      { id: 'semilla', nombre: 'Semilla', min: 1, max: 99, paso: 1, defecto: 7, visible: function (e) { return e.estado === 'aleatorio'; } }
    ],

    lecturas: [
      { id: 'dif_max', nombre: 'Máx. |P_sim − P_dist|', formato: function (v) { return v < 1e-13 ? '< 10⁻¹³' : Num.formatoNum(v, 2).replace('.', ','); } },
      { id: 'suma_sim', nombre: 'Suma de las probabilidades', formato: coma(6) },
      { id: 'n_resultados', nombre: 'Resultados posibles', formato: function (v) { return String(Math.round(v)); } }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Ej. 8-I, bosones M = 3, medida completa (Python, estado fijo)', entrada: { estadistica: 'bosones', medida: 'completa', M: 3, estado: 'ejemplo' },
        salida: { Psim_012: 0.12263194839610059, Pdist_012: 0.12263194839610064, Psim_001: 0.008410970397537767, Psim_111: 0.023039828540810853, Psim_022: 0.1330843963000037, suma_sim: 1, dif_max: 0 }, tol_abs: 1e-12 },
      { fuente: 'Ej. 8-II, bosones M = 3, nº de partículas en u₀ (Python, Gram-Schmidt)', entrada: { estadistica: 'bosones', medida: 'ocupacion', M: 3, estado: 'ejemplo' },
        salida: { Psim_n0: 0.6852812171608718, Psim_n1: 0.2826324883596323, Pdist_n1: 0.2826324883596323, Psim_n3: 0.00031151742213102835, dif_max: 0 }, tol_abs: 1e-12 },
      { fuente: 'Ej. 8-II, bosones M = 3, energía total (Python)', entrada: { estadistica: 'bosones', medida: 'energia', M: 3, estado: 'ejemplo' },
        salida: { Psim_E3: 0.1456717769369115, Psim_E4: 0.2806699286002068, Pdist_E6: 0.20735845686729776, suma_dist: 1 }, tol_abs: 1e-12 },
      { fuente: 'Ej. 8, fermiones M = 4, energía total (Python)', entrada: { estadistica: 'fermiones', medida: 'energia', M: 4, estado: 'ejemplo' },
        salida: { Psim_E3: 0.05, Psim_E4: 0.45, Pdist_E4: 0.45, Psim_E2: 0, dif_max: 0 }, tol_abs: 1e-12 },
      { fuente: 'Ej. 8-I, bosones M = 4: resultados u₁,u₂,u₃ y u₀,u₀,u₁ (Python)', entrada: { estadistica: 'bosones', medida: 'completa', M: 4, estado: 'ejemplo' },
        salida: { Psim_123: 0.1252749759650638, Pdist_123: 0.1252749759650638, Psim_001: 0.0009165865502126478 }, tol_abs: 1e-12 },
      { fuente: 'Estado aleatorio: la igualdad vale para cualquier |ψ⟩ simétrico (demostración del ej. 8)', entrada: { estadistica: 'fermiones', medida: 'ocupacion', M: 4, estado: 'aleatorio', semilla: 11 },
        salida: { dif_max: 0, suma_sim: 1 }, tol_abs: 1e-12 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [{ id: 'barras', altura: 300, cols: 'todo' }],
        dibujar: function (res, p, paneles) { dibujar(res, p, paneles.barras); }
      });
    }
  });
})();
