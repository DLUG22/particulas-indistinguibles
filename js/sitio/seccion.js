/* =============================================================================
   seccion.js — Arma una página de sección a partir de contenido/<id>.md
   -----------------------------------------------------------------------------
   seccion.html?s=01-problema  →  lee contenido/indice.json y contenido/01-problema.md
   seccion.html?s=E1-tres-niveles → si la entrada del índice trae «carpeta»
   (p. ej. "ejercicios"), lee contenido/ejercicios/E1-tres-niveles.md

   Formato del Markdown (además del Markdown normal y de $…$ / $$…$$ con KaTeX):
     ---                          Cabecera: titulo, numero, cohen, resumen
     ## Título {#ancla}           Ancla explícita para el índice lateral
     :::idea-central … :::        Recuadros: idea-central, idea-fisica, comentario,
     :::resultado … :::           nota, resultado, error-comun <título>
     :::pregunta ¿…? … :::        Pregunta con la respuesta oculta
     :::pasos Título              Paso a paso: cada paso empieza con «+++ Título»;
     +++ Primer paso              un «> …» dentro del paso es su comentario
     :::
     :::esqueleto … :::           Lista «tapar y recordar»
     :::figura Pie … :::          Figura (admite SVG en línea)
     ```sim                       Simulación: id (js/sims/<id>.js) y pie
     id: paquetes-colision
     pie: Texto bajo la simulación
     ```
   Requiere (cargados antes): markdown-it, markdown-it-texmath, KaTeX, js/nucleo/*.
   ============================================================================= */
(function () {
  'use strict';

  var articulo = document.getElementById('articulo');
  if (!articulo) return;

  var cada = function (sel, fn, base) { Array.prototype.forEach.call((base || document).querySelectorAll(sel), fn); };
  var ID_VALIDO = /^[A-Za-z0-9][A-Za-z0-9-]{0,60}$/;
  var CARPETA_VALIDA = /^[a-z]{1,30}$/;

  var MACROS = {
    '\\ket': '\\left|#1\\right\\rangle',
    '\\bra': '\\left\\langle #1\\right|',
    '\\braket': '\\left\\langle #1\\middle|#2\\right\\rangle',
    '\\uno': '\\mathbb{1}'
  };

  var CLASES = { 'idea-central': 'nota-central', 'idea-fisica': 'nota-fisica' };

  var ETIQUETAS = {
    'idea-central': 'Idea central',
    'idea-fisica': 'Idea física',
    'comentario': 'Comentario',
    'nota': 'Nota',
    'resultado': 'Resultado',
    'error-comun': 'Error común'
  };

  /* ------------------------------------------------------------ utilidades */
  function escapar(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function traer(url) {
    return fetch(url, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' al pedir ' + url);
      return r;
    });
  }

  function cargarScript(src) {
    return new Promise(function (ok, mal) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { ok(); };
      s.onerror = function () { mal(new Error('No se pudo cargar ' + src)); };
      document.body.appendChild(s);
    });
  }

  function textoPlano(el) {
    var copia = el.cloneNode(true);
    cada('.katex-mathml, .solo-lector', function (n) { n.remove(); }, copia);
    return copia.textContent.replace(/\s+/g, ' ').trim();
  }

  function slug(t) {
    return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'apartado';
  }

  /* ---------------------------------------------------------- Markdown */
  function separarCabecera(texto) {
    texto = texto.replace(/\r\n?/g, '\n');
    var m = /^---\s*\n([\s\S]*?)\n---\s*\n/.exec(texto);
    var datos = {};
    if (!m) return { datos: datos, cuerpo: texto };
    m[1].split('\n').forEach(function (l) {
      var k = l.indexOf(':');
      if (k > 0) datos[l.slice(0, k).trim()] = l.slice(k + 1).trim();
    });
    return { datos: datos, cuerpo: texto.slice(m[0].length) };
  }

  function crearMd() {
    var md = window.markdownit({ html: true, linkify: false, typographer: false });
    if (typeof window.texmath === 'function' && window.katex) {
      md.use(window.texmath, {
        engine: window.katex,
        delimiters: 'dollars',
        katexOptions: { macros: MACROS, throwOnError: false, strict: false }
      });
    }
    var fenceOriginal = md.renderer.rules.fence;
    md.renderer.rules.fence = function (tokens, idx, opts, env, slf) {
      var tk = tokens[idx];
      if (tk.info.trim() === 'sim') return tarjetaSim(md, tk.content);
      return fenceOriginal(tokens, idx, opts, env, slf);
    };
    return md;
  }

  function tarjetaSim(md, contenido) {
    var datos = {};
    contenido.split('\n').forEach(function (l) {
      var k = l.indexOf(':');
      if (k > 0) datos[l.slice(0, k).trim()] = l.slice(k + 1).trim();
    });
    var id = datos.id || '';
    if (!ID_VALIDO.test(id)) return '<p class="aviso aviso-error">Simulación con id no válido.</p>';
    return '<figure class="sim-tarjeta" id="sim-' + id + '">' +
      '<header class="sim-cab"><span class="sim-etiqueta">Simulación</span>' +
      '<h3 class="sim-titulo">' + escapar(datos.titulo || id) + '</h3>' +
      '<span class="insignia" data-insignia>pruebas…</span></header>' +
      '<div class="sim-montaje" data-sim="' + id + '"><p class="sim-cargando">Cargando la simulación…</p></div>' +
      (datos.pie ? '<figcaption class="sim-pie">' + md.renderInline(datos.pie) + '</figcaption>' : '') +
      '</figure>';
  }

  function pasosHTML(md, titulo, cuerpo) {
    var pasos = [], actual = null;
    cuerpo.split('\n').forEach(function (l) {
      var m = /^\+\+\+\s*(.*)$/.exec(l);
      if (m) { actual = { titulo: m[1], lineas: [] }; pasos.push(actual); }
      else if (actual) actual.lineas.push(l);
    });
    var h = '<div class="pasos" data-pasos><div class="pasos-cab"><h4>' +
      (titulo ? md.renderInline(titulo) : 'Paso a paso') +
      '</h4><button class="boton-texto" type="button" data-destapar-todo>Destapar todo</button></div><ol>';
    pasos.forEach(function (p, i) {
      h += '<li class="paso"><button class="paso-boton" type="button" aria-expanded="false">' +
        '<span class="paso-num">' + (i + 1) + '</span>' +
        '<span class="paso-titulo">' + md.renderInline(p.titulo) + '</span>' +
        '<span class="paso-pista">Clic para destapar</span></button>' +
        '<div class="paso-cuerpo"><div>' + md.render(p.lineas.join('\n')) + '</div></div></li>';
    });
    return h + '</ol></div>';
  }

  function contenedor(md, tipo, arg, cuerpo) {
    switch (tipo) {
      case 'pregunta':
        return '<details class="pregunta"><summary><span class="pregunta-texto">' + md.renderInline(arg) + '</span></summary>' +
          '<div class="pregunta-cuerpo">' + md.render(cuerpo) + '</div></details>';
      case 'pasos':
        return pasosHTML(md, arg, cuerpo);
      case 'esqueleto':
        return '<div class="esqueleto" data-esqueleto><div class="esqueleto-cab"><h4>Esqueleto · tapar y recordar</h4>' +
          '<button class="boton-texto" type="button" data-destapar-todo>Destapar todo</button></div>' +
          '<p class="esqueleto-ayuda">Intenta recordar cada punto antes de destaparlo.</p>' + md.render(cuerpo) + '</div>';
      case 'figura':
        return '<figure class="figura-prosa">' + md.render(cuerpo) +
          (arg ? '<figcaption>' + md.renderInline(arg) + '</figcaption>' : '') + '</figure>';
      default:
        var etq = ETIQUETAS[tipo] || tipo;
        return '<aside class="nota ' + (CLASES[tipo] || 'nota-' + slug(tipo)) + '"><strong>' + escapar(etq) + '</strong>' +
          (arg ? '<p class="nota-titulo">' + md.renderInline(arg) + '</p>' : '') + md.render(cuerpo) + '</aside>';
    }
  }

  function renderizar(md, fuente) {
    // Anclas explícitas: «## Título {#ancla}»
    fuente = fuente.replace(/^(#{2,4})\s+(.*?)\s*\{#([a-z0-9-]+)\}\s*$/gm, '$1 <span data-ancla="$3"></span>$2');
    var lineas = fuente.split('\n'), salida = [], buf = [], i = 0;
    function vaciar() { if (buf.length) { salida.push(md.render(buf.join('\n'))); buf = []; } }
    while (i < lineas.length) {
      var m = /^:::\s*([a-z-]+)\s*(.*)$/.exec(lineas[i]);
      if (m) {
        var j = i + 1, dentro = [];
        while (j < lineas.length && !/^:::\s*$/.test(lineas[j])) { dentro.push(lineas[j]); j++; }
        vaciar();
        salida.push(contenedor(md, m[1], m[2].trim(), dentro.join('\n')));
        i = j + 1;
        continue;
      }
      buf.push(lineas[i]);
      i++;
    }
    vaciar();
    return salida.join('\n');
  }

  /* -------------------------------------------------- estructura de página */
  function ponerAnclas() {
    var usados = {};
    cada(':scope > h2, :scope > h3, :scope > h4', function (h) {
      var a = h.querySelector('[data-ancla]');
      var id = a ? a.getAttribute('data-ancla') : slug(textoPlano(h));
      if (a) a.remove();
      while (usados[id]) id += '-2';
      usados[id] = true;
      h.id = id;
    }, articulo);
  }

  function construirIndiceLocal() {
    var lista = document.getElementById('toc');
    if (!lista) return [];
    lista.textContent = '';
    var titulos = [];
    cada(':scope > h2, :scope > h3', function (h) {
      var li = document.createElement('li');
      if (h.tagName === 'H3') li.className = 'toc-sub';
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = textoPlano(h);
      li.appendChild(a);
      lista.appendChild(li);
      titulos.push({ h: h, a: a });
    }, articulo);
    return titulos;
  }

  function seguirLectura(titulos) {
    if (!titulos.length) return;
    var pendiente = false;
    function actualizar() {
      pendiente = false;
      var activo = titulos[0];
      for (var i = 0; i < titulos.length; i++) {
        if (titulos[i].h.getBoundingClientRect().top < 150) activo = titulos[i];
        else break;
      }
      titulos.forEach(function (t) {
        var si = t === activo;
        t.a.classList.toggle('activo', si);
        if (si) t.a.setAttribute('aria-current', 'location'); else t.a.removeAttribute('aria-current');
      });
    }
    window.addEventListener('scroll', function () {
      if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
    }, { passive: true });
    actualizar();
  }

  function construirListaSecciones(indice, actual) {
    var lista = document.getElementById('lista-secciones');
    if (!lista) return;
    lista.textContent = '';
    var grupoPuesto = false;
    indice.forEach(function (s) {
      if (s.tipo === 'ejercicio' && !grupoPuesto) {
        grupoPuesto = true;
        var g = document.createElement('li');
        g.className = 'lista-grupo';
        g.innerHTML = 'Ejercicios · complemento D<sub>XIV</sub>';
        lista.appendChild(g);
      }
      var li = document.createElement('li');
      var num = '<span class="lista-num">' + escapar(s.numero) + '</span>';
      if (s.listo) {
        var a = document.createElement('a');
        a.href = 'seccion.html?s=' + encodeURIComponent(s.id);
        a.innerHTML = num + '<span>' + escapar(s.titulo) + '</span>';
        if (s.id === actual) a.setAttribute('aria-current', 'page');
        li.appendChild(a);
      } else {
        var sp = document.createElement('span');
        sp.className = 'pronto';
        sp.innerHTML = num + '<span>' + escapar(s.titulo) + '</span><small>pronto</small>';
        li.appendChild(sp);
      }
      lista.appendChild(li);
    });
  }

  function construirPie(indice, pos) {
    var pie = document.getElementById('seccion-pie');
    if (!pie) return;
    pie.textContent = '';
    function tarjeta(s, rotulo, clase) {
      var el;
      if (s && s.listo) {
        el = document.createElement('a');
        el.href = 'seccion.html?s=' + encodeURIComponent(s.id);
      } else {
        el = document.createElement('div');
        el.setAttribute('aria-disabled', 'true');
      }
      el.className = 'pie-nav ' + clase + (s && s.listo ? '' : ' pie-nav-inactivo');
      el.innerHTML = '<small>' + rotulo + '</small><strong>' +
        (s ? escapar(s.numero + ' · ' + s.titulo) : 'Portada') + '</strong>' +
        (s && !s.listo ? '<em>pronto</em>' : '');
      return el;
    }
    // Vecino listo más cercano (se saltan las entradas «pronto»); si no hay, el inmediato.
    function vecino(paso) {
      for (var k = pos + paso; k >= 0 && k < indice.length; k += paso) if (indice[k].listo) return indice[k];
      var j = pos + paso;
      return j >= 0 && j < indice.length ? indice[j] : null;
    }
    var ant = vecino(-1);
    var sig = vecino(1);
    if (ant) pie.appendChild(tarjeta(ant, '← Anterior', 'pie-ant'));
    else {
      var inicio = document.createElement('a');
      inicio.href = 'index.html#mapa';
      inicio.className = 'pie-nav pie-ant';
      inicio.innerHTML = '<small>← Volver</small><strong>Mapa del módulo</strong>';
      pie.appendChild(inicio);
    }
    if (sig) pie.appendChild(tarjeta(sig, 'Siguiente →', 'pie-sig'));
  }

  function rellenarCabecera(datos, s, nSims) {
    var ceja = document.getElementById('seccion-ceja');
    var titulo = document.getElementById('seccion-titulo');
    var resumen = document.getElementById('seccion-resumen');
    var meta = document.getElementById('seccion-meta');
    var t = datos.titulo || s.titulo;
    document.title = t + ' · Partículas indistinguibles';
    var rotulo = s.tipo === 'ejercicio' ? 'Ejercicio ' : 'Sección ';
    if (ceja) ceja.textContent = rotulo + (datos.numero || s.numero) + ' · ' + (datos.cohen || s.cohen || '');
    if (titulo) { titulo.textContent = t; titulo.setAttribute('data-split', ''); }
    if (resumen) resumen.textContent = datos.resumen || '';
    if (meta) {
      var palabras = textoPlano(articulo).split(' ').length;
      var min = Math.max(1, Math.round(palabras / 180));
      meta.innerHTML = '<span class="chip">≈ ' + min + ' min de lectura</span>' +
        (nSims ? '<span class="chip" style="--c: var(--oro)">' + nSims + ' simulaci' + (nSims === 1 ? 'ón' : 'ones') + '</span>' : '');
    }
  }

  /* ------------------------------------------------------- simulaciones */
  function montarSims() {
    var ranuras = Array.prototype.slice.call(articulo.querySelectorAll('[data-sim]'));
    var ids = [];
    ranuras.forEach(function (r) { var id = r.getAttribute('data-sim'); if (ids.indexOf(id) < 0) ids.push(id); });
    var cargas = ids.map(function (id) {
      if (window.SIMS && window.SIMS[id]) return Promise.resolve();
      return cargarScript('js/sims/' + id + '.js').catch(function (e) { console.error(e); });
    });
    return Promise.all(cargas).then(function () {
      var observador = 'IntersectionObserver' in window ? new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) { montar(e.target); observador.unobserve(e.target); }
        });
      }, { rootMargin: '500px 0px' }) : null;

      ranuras.forEach(function (r) {
        var id = r.getAttribute('data-sim'), sim = window.SIMS && window.SIMS[id];
        var fig = r.closest('.sim-tarjeta');
        if (fig && sim) fig.querySelector('.sim-titulo').textContent = sim.titulo;
        var ins = fig && fig.querySelector('[data-insignia]');
        if (ins) {
          var res = null;
          try { if (sim && window.Pruebas) res = window.Pruebas.ejecutarSim(id); } catch (e) { console.error(e); }
          if (res && res.total) {
            var ok = res.superadas === res.total;
            ins.textContent = (ok ? '✓ ' : '✗ ') + res.superadas + '/' + res.total + ' pruebas';
            ins.className = 'insignia ' + (ok ? 'insignia-ok' : 'insignia-mal');
            ins.title = ok ? 'Todas las pruebas numéricas de esta simulación pasan' : 'Hay pruebas numéricas que fallan';
          } else {
            ins.textContent = 'sin pruebas';
          }
        }
        if (observador) observador.observe(r); else montar(r);
      });
    });
  }

  function montar(ranura) {
    if (ranura._montada) return;
    ranura._montada = true;
    var id = ranura.getAttribute('data-sim'), sim = window.SIMS && window.SIMS[id];
    if (!sim || typeof sim.montar !== 'function') {
      ranura.innerHTML = '<p class="aviso aviso-error">No se encontró la simulación «' + escapar(id) + '».</p>';
      return;
    }
    try { sim.montar(ranura); }
    catch (e) {
      console.error(e);
      ranura.innerHTML = '<p class="aviso aviso-error">Error al montar la simulación: ' + escapar(e.message || e) + '</p>';
    }
  }

  /* ------------------------------------------------- cajón en el celular */
  function prepararCajon() {
    var boton = document.getElementById('btn-lateral');
    var velo = document.getElementById('velo-lateral');
    var lateral = document.getElementById('lateral');
    if (!boton || !lateral) return;
    function fijar(abierto) {
      document.body.classList.toggle('lateral-abierto', abierto);
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    }
    boton.addEventListener('click', function () { fijar(!document.body.classList.contains('lateral-abierto')); });
    if (velo) velo.addEventListener('click', function () { fijar(false); });
    lateral.addEventListener('click', function (ev) { if (ev.target.closest('a')) fijar(false); });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') fijar(false); });
  }

  /* ------------------------------------------------------------ errores */
  function mostrarError(e) {
    console.error(e);
    var local = location.protocol === 'file:';
    articulo.innerHTML = '<div class="aviso aviso-error"><p><strong>No se pudo cargar la sección.</strong></p>' +
      (local
        ? '<p>Abriste el archivo directamente. Las secciones necesitan un servidor: en la carpeta del proyecto corre <code>python3 -m http.server 8800</code> y abre <code>http://localhost:8800/</code>.</p>'
        : '<p>' + escapar(e && e.message ? e.message : e) + '</p>') + '</div>';
  }

  /* ---------------------------------------------------------- principal */
  function iniciar() {
    prepararCajon();
    if (typeof window.markdownit !== 'function') {
      mostrarError(new Error('No cargó markdown-it (¿sin conexión a internet?).'));
      return;
    }
    traer('contenido/indice.json').then(function (r) { return r.json(); }).then(function (indice) {
      var pedido = new URLSearchParams(location.search).get('s');
      var listos = indice.filter(function (s) { return s.listo; });
      var s = indice.filter(function (x) { return x.id === pedido && x.listo; })[0] || listos[0];
      if (!s || !ID_VALIDO.test(s.id)) throw new Error('No hay secciones disponibles.');
      construirListaSecciones(indice, s.id);
      construirPie(indice, indice.indexOf(s));
      if (s.carpeta && !CARPETA_VALIDA.test(s.carpeta)) throw new Error('Carpeta no válida en el índice.');
      return traer('contenido/' + (s.carpeta ? s.carpeta + '/' : '') + s.id + '.md').then(function (r) { return r.text(); }).then(function (texto) {
        var partes = separarCabecera(texto);
        var md = crearMd();
        articulo.innerHTML = renderizar(md, partes.cuerpo);
        articulo.removeAttribute('aria-busy');
        ponerAnclas();
        cada(':scope > h2, .nota, .pasos, .sim-tarjeta, .esqueleto, .figura-prosa, :scope > table', function (el) {
          el.setAttribute('data-reveal', '');
        }, articulo);
        rellenarCabecera(partes.datos, s, articulo.querySelectorAll('[data-sim]').length);
        var titulos = construirIndiceLocal();
        if (window.Componentes) window.Componentes.activar(articulo);
        if (window.Movimiento) window.Movimiento.preparar(document);
        seguirLectura(titulos);
        if (location.hash) {
          var destino = document.getElementById(decodeURIComponent(location.hash.slice(1)));
          if (destino) setTimeout(function () { destino.scrollIntoView(); }, 60);
        }
        return montarSims();
      });
    }).catch(mostrarError);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
