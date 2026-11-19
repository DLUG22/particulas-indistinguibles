/* =============================================================================
   permutaciones-s3.js — Sección 2 · Cohen §B-2 (pp. 1430–1434)
   -----------------------------------------------------------------------------
   Los 6 operadores de permutación de tres partículas, con la convención (B-38):
       P_npq |1:u_i; 2:u_j; 3:u_k⟩ = |n:u_i; p:u_j; q:u_k⟩
   es decir, la partícula n queda en el estado que tenía la 1, la p en el de la 2
   y la q en el de la 3.
   · Producto A·B (primero B, luego A): (B-40) P312·P132 = P321; (B-44) P132·P312 = P213.
   · Inversos (B-43), paridad (pares: P123, P312, P231; impares: P132, P213, P321).
   · Simetrizador S = (1/3!) Σ P_α y antisimetrizador A = (1/3!) Σ ε_α P_α (B-49, B-50)
     aplicados a |1:u_i; 2:u_j; 3:u_k⟩: normas ‖S ψ‖², ‖A ψ‖² y su suma (B-64: S + A ≠ 1).
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var NOMBRES = ['P123', 'P312', 'P231', 'P132', 'P213', 'P321'];   // orden de (B-37)
  function digitos(n) { return [+n.charAt(1), +n.charAt(2), +n.charAt(3)]; }

  // Acción sobre un ket producto descrito por los estados de las partículas 1, 2 y 3.
  function aplicar(nombre, est) {
    var d = digitos(nombre), r = [null, null, null];
    r[d[0] - 1] = est[0]; r[d[1] - 1] = est[1]; r[d[2] - 1] = est[2];
    return r;
  }

  function paridad(nombre) {          // +1 par, −1 impar (número de inversiones)
    var d = digitos(nombre), inv = 0;
    for (var i = 0; i < 3; i++) for (var j = i + 1; j < 3; j++) if (d[i] > d[j]) inv++;
    return inv % 2 === 0 ? 1 : -1;
  }

  // Producto A·B: se identifica aplicándolo a un ket con tres estados distintos.
  function producto(a, b) {
    var res = aplicar(a, aplicar(b, ['x', 'y', 'z'])).join('');
    for (var k = 0; k < NOMBRES.length; k++) if (aplicar(NOMBRES[k], ['x', 'y', 'z']).join('') === res) return NOMBRES[k];
    return '?';
  }

  function inverso(a) {
    for (var k = 0; k < NOMBRES.length; k++) if (producto(a, NOMBRES[k]) === 'P123') return NOMBRES[k];
    return '?';
  }

  // (1/3!) Σ c_α P_α |ψ⟩ como diccionario ket → coeficiente; devuelve la norma al cuadrado.
  function proyectar(est, conSigno) {
    var ket = {}, k, clave, n2 = 0;
    for (k = 0; k < NOMBRES.length; k++) {
      clave = aplicar(NOMBRES[k], est).join('');
      ket[clave] = (ket[clave] || 0) + (conSigno ? paridad(NOMBRES[k]) : 1) / 6;
    }
    for (clave in ket) n2 += ket[clave] * ket[clave];
    return { ket: ket, norma2: n2 };
  }

  function calcular(p) {
    var est = [p.u1, p.u2, p.u3];
    var r = {};
    r.estados = est;
    r.tras_B = aplicar(p.opB, est);
    r.tras_AB = aplicar(p.opA, r.tras_B);
    r.producto = producto(p.opA, p.opB);
    r.producto_inverso = producto(p.opB, p.opA);
    r.conmutan = r.producto === r.producto_inverso ? 'sí' : 'no';
    r.paridad_A = paridad(p.opA);
    r.paridad_B = paridad(p.opB);
    r.paridad_producto = paridad(r.producto);
    r.inverso_A = inverso(p.opA);
    var S = proyectar(est, false), A = proyectar(est, true);
    r.norma_S = S.norma2;
    r.norma_A = A.norma2;
    r.suma_normas = S.norma2 + A.norma2;
    r.ket_S = S.ket;
    r.ket_A = A.ket;
    // Tabla de multiplicación completa (fila = A, columna = B)
    r.tabla = NOMBRES.map(function (fa) { return NOMBRES.map(function (fb) { return producto(fa, fb); }); });
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  var COLOR_ESTADO = { a: 's3', b: 's4', c: 's5' };
  function sub(n) { return n.charAt(0) + Num.subindice(n.slice(1)); }
  function etiquetaPar(e) { return e > 0 ? 'par' : 'impar'; }

  function dibujarAccion(res, p, g) {
    g.configurar({
      xlim: [0, 10], ylim: [0, 6], ejes: false, leyenda: false,
      margen: { izq: 8, der: 8, arr: 8, aba: 8 },
      descripcion: 'Estado de cada partícula antes y después de aplicar B y luego A.'
    });
    g.dibujar(function (g) {
      var filas = [
        { y: 5, est: res.estados, etq: 'ket inicial' },
        { y: 3, est: res.tras_B, etq: 'después de ' + sub(p.opB) },
        { y: 1, est: res.tras_AB, etq: 'después de ' + sub(p.opA) + sub(p.opB) + ' = ' + sub(res.producto) }
      ];
      filas.forEach(function (f, fi) {
        g.texto(0.2, f.y, f.etq, { base: 'middle', tam: 12, color: 'tenue', negrita: fi === 2 });
        for (var i = 0; i < 3; i++) {
          var x = 5.6 + i * 1.5;
          g.rectangulo(x - 0.6, f.y - 0.55, x + 0.6, f.y + 0.55, { relleno: COLOR_ESTADO[f.est[i]], alfa: 0.22, borde: COLOR_ESTADO[f.est[i]] });
          g.texto(x, f.y + 0.05, 'u' + Num.subindice(f.est[i] === 'a' ? 1 : f.est[i] === 'b' ? 2 : 3), { align: 'center', base: 'middle', tam: 14, negrita: true, color: COLOR_ESTADO[f.est[i]] });
          if (fi === 0) g.texto(x, f.y + 0.85, 'partícula ' + (i + 1), { align: 'center', base: 'middle', tam: 10, color: 'tenue' });
        }
        if (fi < 2) g.flecha(7.1, f.y - 0.7, 7.1, filas[fi + 1].y + 0.7, { color: 'tenue', ancho: 1.4, cabeza: 7 });
      });
    });
  }

  function dibujarTabla(res, p, g) {
    g.configurar({
      xlim: [0, 7], ylim: [0, 7], ejes: false, leyenda: false,
      margen: { izq: 8, der: 8, arr: 8, aba: 8 },
      descripcion: 'Tabla de multiplicación del grupo de permutaciones de tres partículas. Fila: A; columna: B; casilla: A·B.'
    });
    g.dibujar(function (g) {
      var ia = NOMBRES.indexOf(p.opA), ib = NOMBRES.indexOf(p.opB);
      g.texto(0.5, 6.5, 'A·B', { align: 'center', base: 'middle', tam: 11, negrita: true, color: 'tenue' });
      for (var k = 0; k < 6; k++) {
        g.texto(k + 1.5, 6.5, sub(NOMBRES[k]), { align: 'center', base: 'middle', tam: 11, negrita: k === ib, color: k === ib ? 'acento' : 'tenue' });
        g.texto(0.5, 5.5 - k, sub(NOMBRES[k]), { align: 'center', base: 'middle', tam: 11, negrita: k === ia, color: k === ia ? 'acento' : 'tenue' });
      }
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
          var v = res.tabla[i][j], par = paridad(v) > 0;
          var x0 = j + 1, y0 = 5 - i;
          g.rectangulo(x0 + 0.04, y0 + 0.04, x0 + 0.96, y0 + 0.96, { relleno: par ? 'positivo' : 'negativo', alfa: 0.13, borde: 'grid' });
          g.texto(x0 + 0.5, y0 + 0.5, sub(v), { align: 'center', base: 'middle', tam: 11, color: 'texto' });
        }
      }
      // A·B (sólido) y B·A (discontinuo)
      g.rectangulo(ib + 1.02, 5 - ia + 0.02, ib + 1.98, 5 - ia + 0.98, { borde: 'acento', ancho: 2.4 });
      g.rectangulo(ia + 1.02, 5 - ib + 0.02, ia + 1.98, 5 - ib + 0.98, { borde: 'aprox', ancho: 2, estilo: 'discontinuo' });
    });
  }

  function dibujarNormas(res, p, g) {
    g.configurar({
      xlim: [-0.6, 2.6], ylim: [0, 1.12], ejes: false, leyenda: false,
      margen: { izq: 40, der: 10, arr: 14, aba: 40 },
      descripcion: 'Normas al cuadrado de S aplicado al ket, de A aplicado al ket y de su suma.'
    });
    g.dibujar(function (g) {
      var i, y, v = [res.norma_S, res.norma_A, res.suma_normas];
      var etq = ['‖S ψ‖²', '‖A ψ‖²', '‖S ψ‖² + ‖A ψ‖²'];
      for (i = 0; i <= 4; i++) {
        y = i * 0.25;
        g.linea(-0.6, y, 2.6, y, { color: i === 0 ? 'eje' : 'grid', ancho: 1 });
        g.textoPx(g.rect.x - 8, g.py(y), Num.formatoNum(y, 2).replace('.', ','), { align: 'right', base: 'middle', tam: 11, color: 'tenue', dentro: false });
      }
      var cs = getComputedStyle(document.documentElement);
      var cBos = cs.getPropertyValue('--boson').trim(), cFer = cs.getPropertyValue('--fermion').trim();
      g.barras([0, 1, 2], v, { ancho: 0.55, colores: function (k) { return k === 0 ? cBos : (k === 1 ? cFer : 'clasico'); }, alfa: 0.85 });
      for (i = 0; i < 3; i++) {
        g.textoPx(g.px(i), g.py(v[i]) - 8, Num.formatoNum(v[i], 3).replace('.', ','), { align: 'center', tam: 12, negrita: true, color: 'texto' });
        g.textoPx(g.px(i), g.rect.y + g.rect.h + 16, etq[i], { align: 'center', tam: 11, color: 'tenue', dentro: false });
      }
      g.linea(-0.6, 1, 2.6, 1, { color: 'aprox', estilo: 'punteado', ancho: 1.2 });
      g.textoPx(g.rect.x + g.rect.w, g.py(1) - 8, '‖ψ‖² = 1', { align: 'right', tam: 11, color: 'aprox' });
    });
  }

  var OPS = NOMBRES.map(function (n) { return { valor: n, nombre: n.charAt(0) + Num.subindice(n.slice(1)) + ' (' + (paridad(n) > 0 ? 'par' : 'impar') + ')' }; });
  var ESTADOS = [{ valor: 'a', nombre: 'u₁' }, { valor: 'b', nombre: 'u₂' }, { valor: 'c', nombre: 'u₃' }];
  function coma(c) { return function (v) { return Num.formatoNum(v, c).replace('.', ','); }; }

  var SIM = registrarSim({
    id: 'permutaciones-s3',
    unidad: 2,
    tema: '2.2',
    prioridad: 'A',
    titulo: 'Las seis permutaciones de tres partículas',
    tipo: 'grafica',

    controles: [
      { id: 'opA', nombre: 'Operador A (se aplica segundo)', opciones: OPS, defecto: 'P312' },
      { id: 'opB', nombre: 'Operador B (se aplica primero)', opciones: OPS, defecto: 'P132' },
      { id: 'u1', nombre: 'Estado de la partícula 1', opciones: ESTADOS, defecto: 'a' },
      { id: 'u2', nombre: 'Estado de la partícula 2', opciones: ESTADOS, defecto: 'b' },
      { id: 'u3', nombre: 'Estado de la partícula 3', opciones: ESTADOS, defecto: 'c' }
    ],

    lecturas: [
      { id: 'producto', nombre: 'A·B', formato: function (v) { return sub(v); } },
      { id: 'producto_inverso', nombre: 'B·A', formato: function (v) { return sub(v); } },
      { id: 'conmutan', nombre: '¿Conmutan A y B?', formato: 'texto' },
      { id: 'inverso_A', nombre: 'A⁻¹', formato: function (v) { return sub(v); } },
      { id: 'paridad_producto', nombre: 'Paridad de A·B', formato: etiquetaPar },
      { id: 'norma_S', nombre: '‖S ψ‖²', formato: coma(4) },
      { id: 'norma_A', nombre: '‖A ψ‖²', formato: coma(4) },
      { id: 'suma_normas', nombre: '‖S ψ‖² + ‖A ψ‖²', formato: coma(4) }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Cohen (B-40)', entrada: { opA: 'P312', opB: 'P132' }, salida: { producto: 'P321', conmutan: 'no' } },
      { fuente: 'Cohen (B-44)', entrada: { opA: 'P132', opB: 'P312' }, salida: { producto: 'P213' } },
      { fuente: 'Cohen (B-43)', entrada: { opA: 'P312' }, salida: { inverso_A: 'P231' } },
      { fuente: 'Cohen (B-43)', entrada: { opA: 'P231' }, salida: { inverso_A: 'P312' } },
      { fuente: 'Cohen (B-45): P312 = P132·P213', entrada: { opA: 'P132', opB: 'P213' }, salida: { producto: 'P312', paridad_producto: 1 }, exactos: ['paridad_producto'] },
      { fuente: 'Cohen (B-45): P312 = P321·P132', entrada: { opA: 'P321', opB: 'P132' }, salida: { producto: 'P312' } },
      { fuente: 'Paridad (§B-2-b-β)', entrada: { opA: 'P213', opB: 'P123' }, salida: { paridad_A: -1, paridad_B: 1 }, exactos: ['paridad_A', 'paridad_B'] },
      { fuente: 'Cohen (B-64), tres estados distintos', entrada: { u1: 'a', u2: 'b', u3: 'c' }, salida: { norma_S: 1 / 6, norma_A: 1 / 6, suma_normas: 1 / 3 }, tol_abs: 1e-12 },
      { fuente: 'Dos estados iguales: A ψ = 0', entrada: { u1: 'a', u2: 'a', u3: 'b' }, salida: { norma_S: 1 / 3, norma_A: 0 }, tol_abs: 1e-12 },
      { fuente: 'Tres estados iguales', entrada: { u1: 'c', u2: 'c', u3: 'c' }, salida: { norma_S: 1, norma_A: 0 }, tol_abs: 1e-12 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'accion', altura: 230, cols: 'todo' },
          { id: 'tabla', altura: 330, cols: 'todo' },
          { id: 'normas', altura: 220, cols: 'todo' }
        ],
        dibujar: function (res, p, paneles) {
          dibujarAccion(res, p, paneles.accion);
          dibujarTabla(res, p, paneles.tabla);
          dibujarNormas(res, p, paneles.normas);
        }
      });
    }
  });
})();
