/* =============================================================================
   ui.js — Controles, lecturas, bucle de animación y montaje estándar (window.UI)
   -----------------------------------------------------------------------------
   - UI.crearControles(cont, controles, estado, opts): construye los controles desde
     el arreglo `controles` de la simulación (deslizador lineal/log + campo numérico
     editable, selector, casilla, botón, multiselección). Cada control con <label>,
     operable con teclado. Soporta `restriccion`, min/max dinámicos y "calcular al soltar".
   - UI.crearLecturas(cont, specs): panel de lecturas formateadas.
   - UI.crearBucle(cont, opts): ▶/⏸ y ↺ con rAF, pausado fuera de vista (IntersectionObserver).
   - UI.programador(fn): coalesce llamadas a fn en un solo cuadro (rAF).
   - UI.montarEstandar(cont, sim, cfg): arma controles + paneles de Graf + lecturas
     + animación y devuelve {actualizar, destruir, ...}. Es lo que usa planck.js.
   Documentación completa: CONTRATO.md. SÓLO se carga en el navegador (usa DOM).
   ============================================================================= */
(function () {
  'use strict';

  var UI = {};
  var contador = 0;

  /* --------------------------------------------------------------- utilidades */

  /**
   * Crea un elemento: UI.el('div', {clase: 'x', texto: '...', id: 'a', 'aria-label': '..',
   * onclick: fn}, [hijos]). Hijos: nodos o cadenas. `html` asigna innerHTML (¡sólo texto propio!).
   */
  UI.el = function (tag, attrs, hijos) {
    var e = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        var v = attrs[k];
        if (v === undefined || v === null || v === false) continue;
        if (k === 'clase') e.className = v;
        else if (k === 'texto') e.textContent = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? '' : v);
      }
    }
    if (hijos) {
      if (!Array.isArray(hijos)) hijos = [hijos];
      hijos.forEach(function (h) {
        if (h === null || h === undefined) return;
        e.appendChild(typeof h === 'string' ? document.createTextNode(h) : h);
      });
    }
    return e;
  };

  var raf = function (f) {
    return window.requestAnimationFrame ? window.requestAnimationFrame(f) : setTimeout(function () { f(Date.now()); }, 16);
  };
  var cancelRaf = function (id) {
    if (window.cancelAnimationFrame) window.cancelAnimationFrame(id); else clearTimeout(id);
  };

  /**
   * Programador: devuelve solicitar() tal que, por muy seguido que se llame, fn se
   * ejecuta como máximo UNA vez por cuadro (requestAnimationFrame).
   */
  UI.programador = function (fn) {
    var pendiente = false, id = null;
    function solicitar() {
      if (pendiente) return;
      pendiente = true;
      id = raf(function () { pendiente = false; id = null; fn(); });
    }
    solicitar.cancelar = function () { if (id !== null) cancelRaf(id); pendiente = false; id = null; };
    solicitar.pendiente = function () { return pendiente; };
    return solicitar;
  };

  function valorDe(x, estado) { return (typeof x === 'function') ? x(estado) : x; }

  /** Interpreta un número escrito por el usuario ("1e-3", "1,5", "4.9×10⁻⁷", "−3"). NaN si no es válido. */
  UI.parseNum = function (s) {
    if (typeof s === 'number') return s;
    s = String(s).trim().replace(/−/g, '-').replace(',', '.');
    var m = /^([+-]?[\d.]+)\s*[×x*]\s*10\s*([⁻⁰¹²³⁴⁵⁶⁷⁸⁹-]+)$/.exec(s);
    if (m) {
      var map = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
      var ex = m[2].replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]/g, function (ch) { return map[ch]; });
      return Number(m[1] + 'e' + ex);
    }
    if (s === '') return NaN;
    return Number(s);
  };

  function decimalesDe(paso) {
    if (!paso || paso >= 1) return 0;
    return Math.min(10, Math.max(0, Math.ceil(-Math.log(paso) / Math.LN10 - 1e-9)));
  }

  function normOpciones(c) {
    return (c.opciones || []).map(function (o) {
      if (o && typeof o === 'object') return { valor: o.valor, nombre: o.nombre !== undefined ? o.nombre : String(o.valor) };
      var nombre = (c.etiquetas && c.etiquetas[o] !== undefined) ? c.etiquetas[o] : String(o).replace(/_/g, ' ');
      return { valor: o, nombre: nombre };
    });
  }

  function tipoDe(c) {
    if (c.tipo === 'boton') return 'boton';
    if (c.tipo === 'casilla' || c.tipo === 'booleano' || typeof c.defecto === 'boolean') return 'casilla';
    if (c.opciones && (c.tipo === 'multi' || Array.isArray(c.defecto))) return 'multi';
    if (c.opciones) return 'selector';
    return 'deslizador';
  }

  /* ----------------------------------------------------------------- controles */

  /**
   * Construye los controles. Parámetros:
   *   cont      : elemento contenedor
   *   controles : arreglo de especificaciones ({id, nombre, unidad, min, max, paso, defecto,
   *               escala:'log', opciones, tipo:'boton'|'casilla'|'multi', animable, alSoltar,
   *               ayuda, nota, decimales, cifras, formato(v), min/max/visible/habilitado como
   *               función(estado), opcionesDeshabilitadas(estado) → [valores], accion(estado, api)})
   *   estado    : objeto {id: valor} que se LEE y se ESCRIBE (se completa con los defectos)
   *   opts      : {onCambio(id, valor, estado), onVistaPrevia(id, valor, estado) (mientras se
   *               arrastra un control `alSoltar`), restriccion(estado, idCambiado), alSoltar (global)}
   * Devuelve {estado, fijar(id, v, silencioso), refrescar(), restablecer(), destruir(), filas}.
   */
  UI.crearControles = function (cont, controles, estado, opts) {
    opts = opts || {};
    var idBase = 'ctl' + (++contador);
    var widgets = [], porId = {}, animaciones = [];
    var api = { estado: estado, filas: {} };

    controles.forEach(function (c) {
      if (c.tipo !== 'boton' && estado[c.id] === undefined) {
        var d = window.registrarSim ? registrarSim.defectoDeControl(c) : c.defecto;
        estado[c.id] = Array.isArray(d) ? d.slice() : d;
      }
    });

    function aplicar(id, valor, final) {
      estado[id] = valor;
      var enArrastre = !final;
      if (enArrastre) {
        if (opts.onVistaPrevia) opts.onVistaPrevia(id, valor, estado);
        porId[id].sync(true);
        return;
      }
      if (opts.restriccion) opts.restriccion(estado, id);
      api.refrescar();
      if (opts.onCambio) opts.onCambio(id, estado[id], estado);
    }

    function nuevaFila(c, clases) {
      var fila = UI.el('div', { clase: 'control ' + (clases || '') });
      api.filas[c.id] = fila;
      if (c.nota) fila.title = c.nota;
      return fila;
    }

    function ayuda(c, fila, idEl) {
      if (c.ayuda) fila.appendChild(UI.el('small', { clase: 'control-ayuda', id: idEl + '-ay', texto: c.ayuda }));
    }

    /* ---- deslizador ---- */
    function deslizador(c) {
      var id = idBase + '-' + c.id, fila = nuevaFila(c, 'control-desl');
      var esLog = (c.escala === 'log');
      var rango = UI.el('input', { type: 'range', id: id, clase: 'control-rango' });
      var num = UI.el('input', { type: 'text', id: id + '-n', clase: 'control-num', inputmode: 'decimal', autocomplete: 'off', spellcheck: 'false', 'aria-label': (c.nombre || c.id) + ': valor numérico' });
      var etq = UI.el('label', { 'for': id, clase: 'control-etq', texto: c.nombre || c.id });
      var uni = c.unidad ? UI.el('span', { clase: 'control-unidad', texto: c.unidad }) : null;
      fila.appendChild(etq);
      var linea = UI.el('div', { clase: 'control-linea' }, [rango, num, uni]);
      fila.appendChild(linea);
      ayuda(c, fila, id);
      if (c.ayuda) rango.setAttribute('aria-describedby', id + '-ay');
      var N = 1000, mn = 0, mx = 1;
      var alSoltar = (c.alSoltar !== undefined) ? c.alSoltar : (c.caro || opts.alSoltar);

      function limites() {
        mn = valorDe(c.min, estado); mx = valorDe(c.max, estado);
        if (typeof mn !== 'number' || !isFinite(mn)) mn = 0;
        if (typeof mx !== 'number' || !isFinite(mx)) mx = mn + 1;
        if (mx < mn) { var t = mn; mn = mx; mx = t; }
        if (esLog && mn <= 0) mn = 1e-12;
        if (esLog) N = 1000;
        else if (c.paso) N = Math.max(1, Math.min(100000, Math.round((mx - mn) / c.paso)));
        else N = 1000;
      }
      function aPos(v) {
        if (mx === mn) return 0;
        var f = esLog ? Math.log(v / mn) / Math.log(mx / mn) : (v - mn) / (mx - mn);
        return Math.max(0, Math.min(N, Math.round(f * N)));
      }
      function deRango(pos) {
        var v;
        if (esLog) v = mn * Math.pow(mx / mn, pos / N);
        else if (c.paso) v = mn + pos * c.paso;
        else v = mn + (mx - mn) * pos / N;
        if (esLog || !c.paso) v = Number(v.toPrecision(Math.max(3, c.cifras || 4)));
        else v = Number(v.toFixed(decimalesDe(c.paso) + 2));
        return Math.max(mn, Math.min(mx, v));
      }
      function texto(v) {                                   // coma decimal; UI.parseNum acepta coma
        if (c.formato) return String(c.formato(v));
        if (c.decimales !== undefined) return v.toFixed(c.decimales).replace('.', ',');
        if (!esLog && c.paso) return v.toFixed(decimalesDe(c.paso)).replace('.', ',');
        return String(Number(v.toPrecision(c.cifras || 4))).replace('.', ',');
      }
      function sync(soloValor) {
        if (!soloValor) {
          limites();
          if (estado[c.id] < mn) estado[c.id] = mn;
          if (estado[c.id] > mx) estado[c.id] = mx;
          rango.min = 0; rango.max = N; rango.step = 1;
        }
        rango.value = aPos(estado[c.id]);
        num.value = texto(estado[c.id]);
        rango.setAttribute('aria-valuetext', num.value + (c.unidad ? ' ' + c.unidad : ''));
      }
      rango.addEventListener('input', function () {
        aplicar(c.id, deRango(parseInt(rango.value, 10)), !alSoltar);
      });
      rango.addEventListener('change', function () {
        if (alSoltar) aplicar(c.id, deRango(parseInt(rango.value, 10)), true);
      });
      num.addEventListener('change', function () {
        var v = UI.parseNum(num.value);
        if (!isFinite(v)) { sync(true); return; }
        limites();
        v = Math.max(mn, Math.min(mx, v));
        aplicar(c.id, v, true);
      });
      num.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter') { num.blur(); }
      });
      var ctl = {
        c: c, fila: fila, sync: sync,
        habilitar: function (b) { rango.disabled = !b; num.disabled = !b; },
        enfocar: function () { rango.focus(); }
      };
      // animable: botón ▶ que recorre el rango
      if (c.animable) {
        var btn = UI.el('button', { type: 'button', clase: 'boton-icono control-anim', 'aria-label': 'Animar ' + (c.nombre || c.id), 'aria-pressed': 'false', texto: '▶' });
        linea.appendChild(btn);
        var anim = crearAnimacionControl(btn, c, function () { limites(); return [mn, mx]; }, function (v) { aplicar(c.id, v, true); }, function () { return estado[c.id]; }, fila);
        animaciones.push(anim);
        ctl.animacion = anim;
      }
      return ctl;
    }

    /* ---- selector ---- */
    function selector(c) {
      var id = idBase + '-' + c.id, fila = nuevaFila(c, 'control-sel');
      var ops = normOpciones(c);
      var sel = UI.el('select', { id: id, clase: 'control-select' });
      ops.forEach(function (o, i) { sel.appendChild(UI.el('option', { value: String(i), texto: o.nombre })); });
      fila.appendChild(UI.el('label', { 'for': id, clase: 'control-etq', texto: c.nombre || c.id }));
      fila.appendChild(sel);
      ayuda(c, fila, id);
      sel.addEventListener('change', function () { aplicar(c.id, ops[parseInt(sel.value, 10)].valor, true); });
      return {
        c: c, fila: fila,
        sync: function () {
          var idx = -1, i;
          for (i = 0; i < ops.length; i++) if (ops[i].valor === estado[c.id]) { idx = i; break; }
          var dis = c.opcionesDeshabilitadas ? c.opcionesDeshabilitadas(estado) || [] : [];
          for (i = 0; i < ops.length; i++) sel.options[i].disabled = dis.indexOf(ops[i].valor) >= 0;
          if (idx < 0 || sel.options[idx].disabled) {
            for (i = 0; i < ops.length; i++) if (!sel.options[i].disabled) { idx = i; break; }
            if (idx >= 0) estado[c.id] = ops[idx].valor;
          }
          if (idx >= 0) sel.value = String(idx);
        },
        habilitar: function (b) { sel.disabled = !b; },
        enfocar: function () { sel.focus(); }
      };
    }

    /* ---- casilla ---- */
    function casilla(c) {
      var id = idBase + '-' + c.id, fila = nuevaFila(c, 'control-cas');
      var chk = UI.el('input', { type: 'checkbox', id: id });
      fila.appendChild(UI.el('label', { 'for': id, clase: 'control-cas-etq' }, [chk, ' ' + (c.nombre || c.id)]));
      ayuda(c, fila, id);
      chk.addEventListener('change', function () { aplicar(c.id, chk.checked, true); });
      return {
        c: c, fila: fila,
        sync: function () { chk.checked = !!estado[c.id]; },
        habilitar: function (b) { chk.disabled = !b; },
        enfocar: function () { chk.focus(); }
      };
    }

    /* ---- multiselección ---- */
    function multi(c) {
      var id = idBase + '-' + c.id, ops = normOpciones(c);
      var fila = UI.el('fieldset', { clase: 'control control-multi' });
      api.filas[c.id] = fila;
      fila.appendChild(UI.el('legend', { clase: 'control-etq', texto: c.nombre || c.id }));
      var chks = ops.map(function (o, i) {
        var chk = UI.el('input', { type: 'checkbox', id: id + '-' + i });
        fila.appendChild(UI.el('label', { 'for': id + '-' + i, clase: 'control-cas-etq' }, [chk, ' ' + o.nombre]));
        chk.addEventListener('change', function () {
          var sel = [];
          ops.forEach(function (oo, j) { if (chks[j].checked) sel.push(oo.valor); });
          aplicar(c.id, sel, true);
        });
        return chk;
      });
      ayuda(c, fila, id);
      return {
        c: c, fila: fila,
        sync: function () { ops.forEach(function (o, i) { chks[i].checked = (estado[c.id] || []).indexOf(o.valor) >= 0; }); },
        habilitar: function (b) { chks.forEach(function (k) { k.disabled = !b; }); },
        enfocar: function () { if (chks[0]) chks[0].focus(); }
      };
    }

    /* ---- botón ---- */
    function boton(c) {
      var fila = nuevaFila(c, 'control-btn');
      var b = UI.el('button', { type: 'button', clase: 'boton', texto: c.nombre || c.id });
      fila.appendChild(b);
      ayuda(c, fila, idBase + '-' + c.id);
      b.addEventListener('click', function () {
        if (c.accion) c.accion(estado, api);
        api.refrescar();
        if (opts.onCambio) opts.onCambio(c.id, true, estado);
      });
      return { c: c, fila: fila, sync: function () {}, habilitar: function (b2) { b.disabled = !b2; }, enfocar: function () { b.focus(); } };
    }

    controles.forEach(function (c) {
      var t = tipoDe(c), w;
      if (t === 'boton') w = boton(c);
      else if (t === 'casilla') w = casilla(c);
      else if (t === 'multi') w = multi(c);
      else if (t === 'selector') w = selector(c);
      else w = deslizador(c);
      widgets.push(w);
      porId[c.id] = w;
      cont.appendChild(w.fila);
    });

    /** Vuelve a leer `estado` y dibuja todos los controles (límites dinámicos, visibilidad, habilitación). */
    api.refrescar = function () {
      widgets.forEach(function (w) {
        w.sync();
        var vis = w.c.visible ? !!w.c.visible(estado) : true;
        w.fila.hidden = !vis;
        w.habilitar(w.c.habilitado ? !!w.c.habilitado(estado) : true);
      });
    };

    /** Fija un valor por programa. silencioso=true no llama a onCambio. */
    api.fijar = function (id, valor, silencioso) {
      estado[id] = valor;
      if (opts.restriccion) opts.restriccion(estado, id);
      api.refrescar();
      if (!silencioso && opts.onCambio) opts.onCambio(id, estado[id], estado);
    };

    api.leer = function (id) { return estado[id]; };

    /** Devuelve todos los controles a sus valores por defecto. */
    api.restablecer = function (extra) {
      controles.forEach(function (c) {
        if (c.tipo === 'boton') return;
        var d = window.registrarSim ? registrarSim.defectoDeControl(c) : c.defecto;
        estado[c.id] = Array.isArray(d) ? d.slice() : d;
      });
      if (extra) for (var k in extra) estado[k] = extra[k];
      if (opts.restriccion) opts.restriccion(estado, null);
      api.refrescar();
      if (opts.onCambio) opts.onCambio(null, null, estado);
    };

    api.pararAnimaciones = function () { animaciones.forEach(function (a) { a.parar(); }); };
    api.destruir = function () {
      animaciones.forEach(function (a) { a.destruir(); });
      widgets.forEach(function (w) { if (w.fila.parentNode) w.fila.parentNode.removeChild(w.fila); });
    };

    api.refrescar();
    return api;
  };

  /* Animación de un deslizador (botón ▶ junto al control): recorre [min, max] en c.duracion s (def. 10) y repite. */
  function crearAnimacionControl(btn, c, rangoFn, fijarFn, leerFn, observado) {
    var corre = false, id = null, ultimo = null, visible = true, io = null;
    var dur = c.duracion || 10;
    function efectivo() { return corre && visible && !document.hidden; }
    function tick(ts) {
      id = null;
      if (!efectivo()) { ultimo = null; return; }
      if (ultimo === null) ultimo = ts;
      var dt = Math.min(0.1, (ts - ultimo) / 1000); ultimo = ts;
      var r = rangoFn(), v = leerFn() + dt * (r[1] - r[0]) / dur;
      if (v >= r[1]) v = r[0] + (v - r[1]);
      fijarFn(Math.max(r[0], Math.min(r[1], v)));
      id = raf(tick);
    }
    function arrancar() { if (efectivo() && id === null) { ultimo = null; id = raf(tick); } }
    function poner(b) {
      corre = b;
      btn.textContent = b ? '⏸' : '▶';
      btn.setAttribute('aria-pressed', b ? 'true' : 'false');
      arrancar();
    }
    btn.addEventListener('click', function () { poner(!corre); });
    var onVis = function () { arrancar(); };
    document.addEventListener('visibilitychange', onVis);
    if (typeof IntersectionObserver !== 'undefined' && observado) {
      io = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; arrancar(); });
      io.observe(observado);
    }
    return {
      parar: function () { poner(false); },
      destruir: function () { corre = false; if (id !== null) cancelRaf(id); document.removeEventListener('visibilitychange', onVis); if (io) io.disconnect(); }
    };
  }

  /* ------------------------------------------------------------------ lecturas */

  /** Formatea un valor según el spec {formato: 'SI'|'num'|'texto'|fn, unidad, cifras}. */
  UI.formatoValor = function (spec, valor) {
    if (typeof spec.formato === 'function') return String(spec.formato(valor));
    if (typeof valor === 'string') return valor + (spec.unidad ? ' ' + spec.unidad : '');
    if (spec.formato === 'texto') return String(valor);
    var cif = spec.cifras || 4;
    if (spec.formato === 'num') return Num.formatoNum(valor, cif).replace('.', ',') + (spec.unidad ? ' ' + spec.unidad : '');
    return Num.formatoSI(valor, spec.unidad || '', cif).replace('.', ',');   // 'SI' (por defecto); coma decimal
  };

  /**
   * Panel de lecturas. specs: [{id, nombre, unidad, formato:'SI'|'num'|'texto'|fn, cifras,
   * de: 'clave' en el resultado de calcular (por defecto = id), valor(res, estado) opcional,
   * visible(res, estado) opcional}].
   * Devuelve {actualizar(res, estado), fijar(id, texto), elemento}.
   */
  UI.crearLecturas = function (cont, specs) {
    var dl = UI.el('dl', { clase: 'lecturas', 'aria-label': 'Lecturas' });
    var items = {};
    specs.forEach(function (s) {
      var dd = UI.el('dd', { clase: 'lectura-valor', texto: '—' });
      var fila = UI.el('div', { clase: 'lectura' }, [UI.el('dt', { clase: 'lectura-nombre', texto: s.nombre || s.id }), dd]);
      dl.appendChild(fila);
      items[s.id] = { spec: s, dd: dd, fila: fila, ultimo: '' };
    });
    cont.appendChild(dl);
    function poner(it, txt) { if (it.ultimo !== txt) { it.dd.textContent = txt; it.ultimo = txt; } }
    return {
      elemento: dl,
      actualizar: function (res, estado) {
        specs.forEach(function (s) {
          var it = items[s.id], v;
          if (s.visible) it.fila.hidden = !s.visible(res, estado);
          if (typeof s.valor === 'function') v = s.valor(res, estado);
          else v = res ? res[s.de || s.id] : undefined;
          poner(it, UI.formatoValor(s, v));
        });
      },
      fijar: function (id, txt) { if (items[id]) poner(items[id], txt); },
      destruir: function () { if (dl.parentNode) dl.parentNode.removeChild(dl); }
    };
  };

  /** Aviso/mensaje (aria-live): {mostrar(texto, tipo:'info'|'aviso'|'error'), ocultar(), elemento}. */
  UI.crearAviso = function (cont) {
    var e = UI.el('p', { clase: 'aviso', role: 'status', 'aria-live': 'polite' });
    e.hidden = true;
    cont.appendChild(e);
    return {
      elemento: e,
      mostrar: function (txt, tipo) { e.hidden = !txt; e.textContent = txt || ''; e.className = 'aviso aviso-' + (tipo || 'info'); },
      ocultar: function () { e.hidden = true; }
    };
  };

  /* ------------------------------------------------------------------- bucle */

  /**
   * Bucle de animación con ▶/⏸, ↺ (reiniciar) y selector de velocidad.
   *   opts: {paso(dt, t) (dt en s ya multiplicado por la velocidad, t acumulado),
   *          reiniciar() (se llama al pulsar ↺ y se pone t = 0), autoInicio (true),
   *          velocidades: [0.25, 0.5, 1, 2, 4] | false, observar: elemento a vigilar (def. cont)}
   * Se PAUSA solo cuando el elemento sale de la vista o la pestaña se oculta.
   * Devuelve {iniciar, pausar, alternar, reiniciar, activo(), t(), fijarT(t), destruir}.
   */
  UI.crearBucle = function (cont, opts) {
    var corre = false, visible = true, id = null, ultimo = null, t = 0, vel = 1, destruido = false, io = null;
    var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var barra = UI.el('div', { clase: 'anim-barra', role: 'group', 'aria-label': 'Controles de la animación' });
    var bPlay = UI.el('button', { type: 'button', clase: 'boton boton-play', 'aria-label': 'Reproducir', 'aria-pressed': 'false', texto: '▶' });
    var bReset = UI.el('button', { type: 'button', clase: 'boton boton-reset', 'aria-label': 'Reiniciar la animación', texto: '↺' });
    barra.appendChild(bPlay); barra.appendChild(bReset);
    var selV = null;
    if (opts.velocidades !== false) {
      var vs = opts.velocidades || [0.25, 0.5, 1, 2, 4];
      selV = UI.el('select', { clase: 'control-select anim-vel', 'aria-label': 'Velocidad de la animación' });
      vs.forEach(function (v) { selV.appendChild(UI.el('option', { value: String(v), texto: v + '×' })); });
      selV.value = '1';
      selV.addEventListener('change', function () { vel = parseFloat(selV.value) || 1; });
      barra.appendChild(selV);
    }
    cont.appendChild(barra);

    function efectivo() { return corre && visible && !document.hidden && !destruido; }
    function tick(ts) {
      id = null;
      if (!efectivo()) { ultimo = null; return; }
      if (ultimo === null) ultimo = ts;
      var dt = Math.min(0.1, (ts - ultimo) / 1000) * vel;
      ultimo = ts;
      t += dt;
      opts.paso(dt, t);
      if (efectivo()) id = raf(tick);
    }
    function arrancar() { if (efectivo() && id === null) { ultimo = null; id = raf(tick); } }
    function poner(b) {
      corre = b;
      bPlay.textContent = b ? '⏸' : '▶';
      bPlay.setAttribute('aria-label', b ? 'Pausar' : 'Reproducir');
      bPlay.setAttribute('aria-pressed', b ? 'true' : 'false');
      arrancar();
    }
    bPlay.addEventListener('click', function () { poner(!corre); });
    bReset.addEventListener('click', function () { api.reiniciar(); });
    function onVis() { arrancar(); }
    document.addEventListener('visibilitychange', onVis);
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(function (es) { visible = es[es.length - 1].isIntersecting; arrancar(); });
      io.observe(opts.observar || cont);
    }
    var api = {
      elemento: barra,
      iniciar: function () { poner(true); },
      pausar: function () { poner(false); },
      alternar: function () { poner(!corre); },
      reiniciar: function () { t = 0; ultimo = null; if (opts.reiniciar) opts.reiniciar(); },
      activo: function () { return corre; },
      t: function () { return t; },
      fijarT: function (v) { t = v; },
      destruir: function () {
        destruido = true; corre = false;
        if (id !== null) cancelRaf(id);
        document.removeEventListener('visibilitychange', onVis);
        if (io) io.disconnect();
        if (barra.parentNode) barra.parentNode.removeChild(barra);
      }
    };
    if (opts.autoInicio !== false && !reducir) poner(true); else poner(false);
    return api;
  };

  /* ------------------------------------------------------------ montaje estándar */

  /**
   * Monta una simulación completa con la estructura estándar y devuelve la API.
   *   contenedor : elemento donde montar (se vacía)
   *   sim        : el objeto de simulación (usa sim.controles, sim.calcular, sim.lecturas)
   *   cfg        : {
   *     estadoInicial     : {id: valor} que pisa a los defectos
   *     paneles           : [{id, altura, cols:'todo'|1, ...opciones de Graf.crear}]  (opcional)
   *     panelesOpts       : {minimo: px} ancho mínimo de cada columna de gráficas
   *     dibujar(res, estado, paneles, api) : pinta (llamado tras cada calcular y tras cada paso de animación)
   *     lecturas          : specs de lecturas (por defecto sim.lecturas)
   *     controles         : sustituye a sim.controles
   *     restriccion       : función(estado, idCambiado) (por defecto sim.restriccion)
   *     alSoltar          : true → todos los deslizadores calculan sólo al soltar
   *     animar            : {paso(dt, t, api) → 'calcular' | true | falsy, reiniciar(api), autoInicio, velocidades}
   *     alCambiar(id, valor, estado, api) : gancho tras cada cambio de control, antes de recalcular
   *     antes(api)        : gancho tras construir la estructura (DOM extra en api.zonaVisual / api.zonaControles)
   *     sinRestablecer    : true → sin botón "Restablecer"
   *   }
   * api: {estado, res, paneles, lecturas, controles, bucle, zonaControles, zonaVisual,
   *       actualizar(parcial?) (programado, máx. 1 por cuadro), actualizarYa(), redibujar(), avisar(txt, tipo), destruir()}
   * Un error en calcular/dibujar se muestra en la tarjeta y en consola, sin romper la página.
   */
  UI.montarEstandar = function (contenedor, sim, cfg) {
    cfg = cfg || {};
    contenedor.textContent = '';
    var estado = {}, d = registrarSim.defectos(sim), k;
    for (k in d) estado[k] = d[k];
    if (cfg.estadoInicial) for (k in cfg.estadoInicial) estado[k] = cfg.estadoInicial[k];

    var cuerpo = UI.el('div', { clase: 'sim-cuerpo' });
    var zonaControles = UI.el('div', { clase: 'sim-controles' });
    var zonaVisual = UI.el('div', { clase: 'sim-visual' });
    var zonaError = UI.el('p', { clase: 'aviso aviso-error', role: 'alert' });
    zonaError.hidden = true;
    cuerpo.appendChild(zonaControles); cuerpo.appendChild(zonaVisual);
    contenedor.appendChild(cuerpo);

    var api = {
      estado: estado, res: null, paneles: null, lecturas: null, controles: null, bucle: null,
      zonaControles: zonaControles, zonaVisual: zonaVisual, sim: sim
    };
    var destruido = false;

    var barraAnim = UI.el('div', { clase: 'sim-barra' });
    if (cfg.animar) zonaVisual.appendChild(barraAnim);
    var zonaPaneles = UI.el('div', { clase: 'sim-paneles' });
    zonaVisual.appendChild(zonaPaneles);
    if (cfg.paneles && cfg.paneles.length) api.paneles = Graf.paneles(zonaPaneles, cfg.paneles, cfg.panelesOpts);
    else api.paneles = {};
    var specsLect = cfg.lecturas || sim.lecturas || [];
    if (specsLect.length) api.lecturas = UI.crearLecturas(zonaVisual, specsLect);
    var aviso = UI.crearAviso(zonaVisual);
    zonaVisual.appendChild(zonaError);

    function mostrarError(e) {
      if (window.console) console.error('[' + sim.id + ']', e);
      zonaError.hidden = false;
      zonaError.textContent = 'Error en la simulación: ' + (e && e.message ? e.message : e);
    }
    function pintar() {
      try {
        if (cfg.dibujar) cfg.dibujar(api.res, estado, api.paneles, api);
        if (api.lecturas) api.lecturas.actualizar(api.res, estado);
        zonaError.hidden = true;
      } catch (e) { mostrarError(e); }
    }
    function calcularYPintar() {
      if (destruido) return;
      try { api.res = sim.calcular(estado); } catch (e) { mostrarError(e); return; }
      pintar();
    }
    var solicitar = UI.programador(calcularYPintar);

    api.actualizar = function (parcial) {
      if (parcial) { for (var kk in parcial) estado[kk] = parcial[kk]; if (api.controles) api.controles.refrescar(); }
      solicitar();
    };
    api.actualizarYa = function () { solicitar.cancelar(); calcularYPintar(); };
    api.redibujar = function () { pintar(); };
    api.avisar = function (txt, tipo) { aviso.mostrar(txt, tipo); };

    var restriccion = cfg.restriccion || sim.restriccion;
    var ctlOpts = {
      alSoltar: cfg.alSoltar,
      restriccion: restriccion ? function (e, id) { restriccion(e, id); } : null,
      onCambio: function (id, valor, e) {
        if (cfg.alCambiar) cfg.alCambiar(id, valor, e, api);
        solicitar();
      },
      onVistaPrevia: cfg.alArrastrar ? function (id, valor, e) { cfg.alArrastrar(id, valor, e, api); } : null
    };
    var listaCtl = cfg.controles || sim.controles || [];
    if (restriccion) restriccion(estado, null);
    api.controles = UI.crearControles(zonaControles, listaCtl, estado, ctlOpts);

    if (!cfg.sinRestablecer && listaCtl.length) {
      zonaControles.appendChild(UI.el('button', {
        type: 'button', clase: 'boton boton-sec', texto: 'Restablecer', onclick: function () {
          api.controles.restablecer(cfg.estadoInicial);
          if (cfg.animar && api.bucle) api.bucle.reiniciar();
        }
      }));
    }

    if (cfg.animar) {
      api.bucle = UI.crearBucle(barraAnim, {
        observar: cuerpo,
        autoInicio: cfg.animar.autoInicio,
        velocidades: cfg.animar.velocidades,
        paso: function (dt, t) {
          if (destruido) return;
          var r;
          try { r = cfg.animar.paso(dt, t, api); } catch (e) { mostrarError(e); return; }
          if (r === 'calcular') calcularYPintar(); else if (r) pintar();
        },
        reiniciar: function () {
          try { if (cfg.animar.reiniciar) cfg.animar.reiniciar(api); } catch (e) { mostrarError(e); }
          calcularYPintar();
        }
      });
    }

    if (cfg.antes) cfg.antes(api);
    calcularYPintar();

    api.destruir = function () {
      destruido = true;
      solicitar.cancelar();
      if (api.bucle) api.bucle.destruir();
      if (api.controles) { api.controles.pararAnimaciones(); api.controles.destruir(); }
      if (api.paneles && api.paneles.destruir) api.paneles.destruir();
      contenedor.textContent = '';
    };
    return api;
  };

  /** Atajo para las simulaciones aún no escritas (stubs): muestra "En construcción". */
  UI.enConstruccion = function (contenedor, sim) {
    contenedor.textContent = '';
    contenedor.appendChild(UI.el('p', { clase: 'en-construccion', texto: 'En construcción: ' + sim.titulo }));
    return { actualizar: function () {}, destruir: function () { contenedor.textContent = ''; } };
  };

  window.UI = UI;
})();
