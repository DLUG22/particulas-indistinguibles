/* =============================================================================
   pruebas.js — Ejecutor de las pruebas de las simulaciones (window.Pruebas)
   Portado de MC I (Parcial 1). Cambio: el total esperado ya no es fijo (85);
   por defecto es el número de casos registrados.
   -----------------------------------------------------------------------------
   Pruebas.ejecutarTodas(opts) es PURA (sin DOM): recorre SIMS[*].pruebas, aplica
   adaptarPrueba si existe, rellena las entradas que faltan con el `defecto` de
   cada control, llama a calcular() y compara con tol_rel / tol_abs / igualdad
   entera. Sirve tanto en el navegador como en jsc (herramientas/ejecutar_pruebas_jsc.js).
   Pruebas.renderPanel(contenedor) pinta el panel (usa DOM; sólo navegador).

   Una "prueba" (caso) es UN elemento del arreglo `pruebas` de una simulación; pasa
   si TODAS sus claves de `salida` están dentro de tolerancia.
   ============================================================================= */
(function () {
  'use strict';

  var Pruebas = {};

  /** Total de casos esperado. null = los que estén registrados (no hay una lista fija). */
  Pruebas.TOTAL_ESPERADO = null;

  /** Claves de salida que se comparan por igualdad exacta (enteros). */
  Pruebas.ENTEROS = ['numero_de_estados_ligados', 'nodos', 'tasa_electrones'];

  function copiar(o) {
    var r = {};
    for (var k in o) r[k] = Array.isArray(o[k]) ? o[k].slice() : o[k];
    return r;
  }

  function comparar(clave, calc, esp, caso) {
    var r = { clave: clave, calculado: calc, esperado: esp, error: NaN, errorRel: NaN, tolerancia: '', ok: false };
    var exactos = Pruebas.ENTEROS.concat(caso.exactos || []);
    if (typeof esp !== 'number') {                     // cadenas, booleanos
      r.ok = (calc === esp);
      r.tolerancia = 'igualdad';
      return r;
    }
    if (typeof calc !== 'number' || !isFinite(calc)) {
      r.tolerancia = 'valor no numérico';
      return r;
    }
    r.error = Math.abs(calc - esp);
    r.errorRel = esp !== 0 ? r.error / Math.abs(esp) : NaN;
    if (exactos.indexOf(clave) >= 0) {
      r.ok = (calc === esp);
      r.tolerancia = 'entero exacto';
      return r;
    }
    var okRel = null, okAbs = null;
    if (caso.tol_rel !== undefined) {
      okRel = (esp === 0) ? (Math.abs(calc) <= caso.tol_rel) : (r.error <= caso.tol_rel * Math.abs(esp));
    }
    if (caso.tol_abs !== undefined) okAbs = (r.error <= caso.tol_abs);
    if (okRel === null && okAbs === null) { r.ok = (calc === esp); r.tolerancia = 'igualdad'; }
    else {
      r.ok = !!(okRel || okAbs);
      var t = [];
      if (caso.tol_rel !== undefined) t.push('tol_rel ' + caso.tol_rel);
      if (caso.tol_abs !== undefined) t.push('tol_abs ' + caso.tol_abs);
      r.tolerancia = t.join(' | ');
    }
    return r;
  }

  /** Ejecuta un caso de una simulación. */
  function ejecutarCaso(sim, caso, indice) {
    var reg = { sim: sim.id, indice: indice, fuente: caso.fuente || '', entrada: caso.entrada || {}, claves: [], ok: false, excepcion: null };
    try {
      var defectos = registrarSim.defectos(sim);
      var entrada = copiar(caso.entrada || {});
      var res;
      var adaptada = sim.adaptarPrueba ? sim.adaptarPrueba(entrada, defectos) : entrada;
      if (adaptada === undefined || adaptada === null) adaptada = entrada;
      if (adaptada._resultado) {
        res = adaptada._resultado;                       // la simulación resolvió la prueba por su cuenta
      } else {
        var p = copiar(defectos), k;
        for (k in adaptada) p[k] = adaptada[k];
        res = sim.calcular(p);
      }
      var salida = caso.salida || {}, todo = true;
      for (var clave in salida) {
        var c = comparar(clave, res ? res[clave] : undefined, salida[clave], caso);
        if (res === undefined || res === null || res[clave] === undefined) { c.ok = false; c.tolerancia = 'falta la clave en calcular()'; }
        reg.claves.push(c);
        if (!c.ok) todo = false;
      }
      if (reg.claves.length === 0) { todo = false; reg.excepcion = 'la prueba no tiene salida'; }
      reg.ok = todo;
    } catch (e) {
      reg.ok = false;
      reg.excepcion = (e && e.message) ? e.message : String(e);
    }
    return reg;
  }

  /**
   * Ejecuta las pruebas de UNA simulación. Devuelve {id, superadas, total, detalle[]}.
   */
  Pruebas.ejecutarSim = function (id) {
    var sim = SIMS[id], detalle = [], sup = 0;
    if (!sim) return { id: id, superadas: 0, total: 0, detalle: [], error: 'simulación no registrada' };
    (sim.pruebas || []).forEach(function (caso, i) {
      var r = ejecutarCaso(sim, caso, i);
      if (r.ok) sup++;
      detalle.push(r);
    });
    return { id: id, superadas: sup, total: detalle.length, detalle: detalle };
  };

  /**
   * Ejecuta todas las pruebas registradas. opts.filtro = id o arreglo de ids para
   * restringir. Devuelve {superadas, total (registradas), esperado, faltan,
   * detalle[] (un registro por caso), porSim {id: {superadas, total}}, sinFuente[]}.
   */
  Pruebas.ejecutarTodas = function (opts) {
    opts = opts || {};
    var filtro = opts.filtro ? [].concat(opts.filtro) : null;
    var lista = registrarSim.listar(), detalle = [], porSim = {}, sup = 0, sinFuente = [];
    lista.forEach(function (sim) {
      if (filtro && filtro.indexOf(sim.id) < 0) return;
      var r = Pruebas.ejecutarSim(sim.id);
      porSim[sim.id] = { superadas: r.superadas, total: r.total };
      r.detalle.forEach(function (d) {
        detalle.push(d);
        if (d.ok) sup++;
        if (!d.fuente) sinFuente.push(sim.id + '#' + d.indice);
      });
    });
    return {
      superadas: sup, total: detalle.length, esperado: (Pruebas.TOTAL_ESPERADO == null ? detalle.length : Pruebas.TOTAL_ESPERADO),
      faltan: (Pruebas.TOTAL_ESPERADO == null ? 0 : Math.max(0, Pruebas.TOTAL_ESPERADO - detalle.length)),
      detalle: detalle, porSim: porSim, sinFuente: sinFuente, filtrado: !!filtro
    };
  };

  function fmt(v) {
    if (typeof v === 'number') {
      if (v === 0) return '0';
      var a = Math.abs(v);
      return (a >= 1e-3 && a < 1e6) ? String(Number(v.toPrecision(7))) : v.toExponential(5);
    }
    return String(v);
  }
  function fmtEntrada(e) {
    var s = [];
    for (var k in e) s.push(k + '=' + (typeof e[k] === 'number' ? fmt(e[k]) : String(e[k])));
    return s.join(', ');
  }
  Pruebas.formatoValor = fmt;
  Pruebas.formatoEntrada = fmtEntrada;

  /**
   * Informe de texto (arreglo de líneas) para consola/jsc. opts.soloFallos = true
   * omite las claves que pasan.
   */
  Pruebas.informeTexto = function (res, opts) {
    opts = opts || {};
    var out = [], actual = null;
    res.detalle.forEach(function (d) {
      if (d.sim !== actual) {
        actual = d.sim;
        var ps = res.porSim[d.sim];
        out.push('');
        out.push('== ' + d.sim + ' : ' + ps.superadas + '/' + ps.total);
      }
      out.push('  [' + (d.ok ? ' OK ' : 'FALLA') + '] #' + d.indice + ' ' + (d.fuente || '(sin fuente)') + '  {' + fmtEntrada(d.entrada) + '}');
      if (d.excepcion) out.push('         EXCEPCIÓN: ' + d.excepcion);
      d.claves.forEach(function (c) {
        if (opts.soloFallos && c.ok) return;
        out.push('         ' + (c.ok ? '✓' : '✗') + ' ' + c.clave + ': calculado ' + fmt(c.calculado) + ' · esperado ' + fmt(c.esperado) +
          ' · error abs ' + fmt(c.error) + (isNaN(c.errorRel) ? '' : ' · rel ' + c.errorRel.toExponential(2)) + ' · ' + c.tolerancia);
      });
    });
    return out;
  };

  /* ------------------------------------------------------------- panel (DOM) */

  function el(tag, clase, texto) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }

  /** Insignia "✓ k/k pruebas" para la tarjeta de una simulación (elemento <span>). */
  Pruebas.insignia = function (id) {
    var r = Pruebas.ejecutarSim(id), s;
    if (r.total === 0) { s = el('span', 'insignia insignia-pruebas insignia-vacia', 'sin pruebas'); return s; }
    var ok = (r.superadas === r.total);
    s = el('span', 'insignia insignia-pruebas ' + (ok ? 'insignia-ok' : 'insignia-mal'), (ok ? '✓ ' : '✗ ') + r.superadas + '/' + r.total + ' pruebas');
    s.title = ok ? 'Todas las pruebas numéricas de esta simulación pasan' : 'Hay pruebas que fallan: ver la sección Pruebas';
    return s;
  };

  /**
   * Pinta el panel de pruebas en `contenedor`: total "N/M", aviso si faltan
   * pruebas por registrar, y una tabla por simulación (✓/✗, calculado, esperado, error).
   */
  Pruebas.renderPanel = function (contenedor) {
    contenedor.textContent = '';
    var raiz = el('div', 'panel-pruebas');
    contenedor.appendChild(raiz);

    function pintar() {
      raiz.textContent = '';
      var res = Pruebas.ejecutarTodas();
      var cab = el('div', 'pruebas-resumen');
      var grande = el('p', 'pruebas-total ' + (res.superadas === res.esperado ? 'ok' : (res.superadas === res.total && res.total > 0 ? 'parcial' : 'mal')),
        res.superadas + '/' + res.esperado);
      var txt = el('p', 'pruebas-texto', 'casos superados. Registrados: ' + res.total + ' de ' + res.esperado + ' esperados.');
      cab.appendChild(grande); cab.appendChild(txt);
      var btn = el('button', 'boton boton-sec', 'Volver a ejecutar');
      btn.type = 'button';
      btn.addEventListener('click', pintar);
      cab.appendChild(btn);
      raiz.appendChild(cab);
      if (res.faltan > 0) {
        raiz.appendChild(el('p', 'aviso aviso-aviso', 'Faltan ' + res.faltan + ' pruebas por registrar (las simulaciones en construcción aún no las incluyen).'));
      }
      if (res.total > res.esperado) {
        raiz.appendChild(el('p', 'aviso aviso-error', 'Hay ' + (res.total - res.esperado) + ' pruebas de más: revisar duplicados.'));
      }
      var fallos = res.detalle.filter(function (d) { return !d.ok; }).length;
      if (fallos) raiz.appendChild(el('p', 'aviso aviso-error', fallos + ' caso(s) fallan (marcados en rojo).'));

      registrarSim.listar().forEach(function (sim) {
        var ps = res.porSim[sim.id] || { superadas: 0, total: 0 };
        var det = el('details', 'pruebas-sim');
        if (ps.total > 0 && ps.superadas < ps.total) det.open = true;
        var sm = el('summary');
        var estado = ps.total === 0 ? 'insignia-vacia' : (ps.superadas === ps.total ? 'insignia-ok' : 'insignia-mal');
        sm.appendChild(el('span', 'insignia ' + estado, ps.total === 0 ? '—' : (ps.superadas === ps.total ? '✓' : '✗') + ' ' + ps.superadas + '/' + ps.total));
        sm.appendChild(document.createTextNode(' ' + sim.id + ' · '));
        sm.appendChild(el('span', 'pruebas-titulo', sim.titulo));
        det.appendChild(sm);
        var casos = res.detalle.filter(function (d) { return d.sim === sim.id; });
        if (!casos.length) {
          det.appendChild(el('p', 'pruebas-vacio', 'Sin pruebas registradas todavía.'));
        } else {
          var tabla = el('table', 'tabla-pruebas');
          var th = el('thead'), trh = el('tr');
          ['', 'Fuente', 'Entrada', 'Clave', 'Calculado', 'Esperado', 'Error', 'Tolerancia'].forEach(function (h) { trh.appendChild(el('th', '', h)); });
          th.appendChild(trh); tabla.appendChild(th);
          var tb = el('tbody');
          casos.forEach(function (d) {
            var filas = d.claves.length ? d.claves : [null];
            filas.forEach(function (c, i) {
              var tr = el('tr', d.ok ? '' : 'fila-mal');
              tr.appendChild(el('td', 'marca ' + (c ? (c.ok ? 'ok' : 'mal') : 'mal'), c ? (c.ok ? '✓' : '✗') : '✗'));
              tr.appendChild(el('td', '', i === 0 ? d.fuente : ''));
              tr.appendChild(el('td', 'celda-entrada', i === 0 ? fmtEntrada(d.entrada) : ''));
              if (c) {
                tr.appendChild(el('td', '', c.clave));
                tr.appendChild(el('td', 'num', fmt(c.calculado)));
                tr.appendChild(el('td', 'num', fmt(c.esperado)));
                tr.appendChild(el('td', 'num', isNaN(c.error) ? '—' : c.error.toExponential(2)));
                tr.appendChild(el('td', '', c.tolerancia));
              } else {
                var td = el('td', '', d.excepcion || 'sin salida'); td.colSpan = 5; tr.appendChild(td);
              }
              tb.appendChild(tr);
              if (i === 0 && d.excepcion && c) {
                var tr2 = el('tr', 'fila-mal'); var td2 = el('td', '', 'EXCEPCIÓN: ' + d.excepcion); td2.colSpan = 8; tr2.appendChild(td2); tb.appendChild(tr2);
              }
            });
          });
          tabla.appendChild(tb);
          var envoltura = el('div', 'tabla-scroll');
          envoltura.appendChild(tabla);
          det.appendChild(envoltura);
        }
        raiz.appendChild(det);
      });
    }
    pintar();
    return { actualizar: pintar };
  };

  window.Pruebas = Pruebas;
})();
