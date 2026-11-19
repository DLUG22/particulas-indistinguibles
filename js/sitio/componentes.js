/* =============================================================================
   componentes.js — Fórmulas (KaTeX auto-render), paso a paso, esqueleto
   «tapar y recordar» y preparación para imprimir.
   Componentes.activar(raiz) se llama al cargar y cada vez que llega contenido nuevo.
   ============================================================================= */
(function () {
  'use strict';

  var cada = function (sel, fn, base) { Array.prototype.forEach.call((base || document).querySelectorAll(sel), fn); };

  /* ---------------------------------------------------------- Fórmulas */
  // Sólo para páginas con $…$ escritos en el HTML (la portada). Las secciones
  // llegan ya renderizadas por markdown-it-texmath.
  function renderizarFormulas(raiz) {
    if (typeof window.renderMathInElement !== 'function') return false;
    window.renderMathInElement(raiz || document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false,
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'canvas']
    });
    return true;
  }

  /* ------------------------------------------------------- Paso a paso */
  function alternarPaso(paso, abrir) {
    var boton = paso.querySelector('.paso-boton');
    var abierto = typeof abrir === 'boolean' ? abrir : !paso.classList.contains('abierto');
    paso.classList.toggle('abierto', abierto);
    if (boton) boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  }

  function textoBotonTodo(bloque, selector, claseAbierto) {
    var botonTodo = bloque.querySelector('[data-destapar-todo]');
    if (!botonTodo) return;
    var items = bloque.querySelectorAll(selector);
    var todos = Array.prototype.every.call(items, function (p) { return p.classList.contains(claseAbierto); });
    botonTodo.textContent = todos ? 'Tapar todo' : 'Destapar todo';
  }

  function activarPasos(bloque) {
    if (bloque.hasAttribute('data-activo')) return;
    bloque.setAttribute('data-activo', '');
    cada('.paso', function (paso) {
      var boton = paso.querySelector('.paso-boton');
      if (!boton) return;
      boton.addEventListener('click', function () {
        alternarPaso(paso);
        textoBotonTodo(bloque, '.paso', 'abierto');
      });
    }, bloque);
    var botonTodo = bloque.querySelector('[data-destapar-todo]');
    if (botonTodo) {
      botonTodo.addEventListener('click', function () {
        var abrir = botonTodo.textContent.indexOf('Destapar') === 0;
        cada('.paso', function (p) { alternarPaso(p, abrir); }, bloque);
        textoBotonTodo(bloque, '.paso', 'abierto');
      });
    }
  }

  /* ------------------------------------- Esqueleto «tapar y recordar» */
  // Cada punto de la lista empieza tapado; un clic (o Enter/Espacio) lo destapa.
  function activarEsqueleto(bloque) {
    if (bloque.hasAttribute('data-activo')) return;
    bloque.setAttribute('data-activo', '');
    cada('li', function (li) {
      li.classList.add('tapado');
      li.setAttribute('tabindex', '0');
      li.setAttribute('role', 'button');
      li.setAttribute('aria-pressed', 'false');
      var alternar = function () {
        var destapado = li.classList.toggle('destapado');
        li.setAttribute('aria-pressed', destapado ? 'true' : 'false');
        textoBotonTodo(bloque, 'li', 'destapado');
      };
      li.addEventListener('click', alternar);
      li.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); alternar(); }
      });
    }, bloque);
    var botonTodo = bloque.querySelector('[data-destapar-todo]');
    if (botonTodo) {
      botonTodo.addEventListener('click', function () {
        var abrir = botonTodo.textContent.indexOf('Destapar') === 0;
        cada('li', function (li) {
          li.classList.toggle('destapado', abrir);
          li.setAttribute('aria-pressed', abrir ? 'true' : 'false');
        }, bloque);
        textoBotonTodo(bloque, 'li', 'destapado');
      });
    }
  }

  function activar(raiz) {
    raiz = raiz || document;
    cada('[data-pasos]', activarPasos, raiz);
    cada('[data-esqueleto]', activarEsqueleto, raiz);
  }

  renderizarFormulas();
  activar(document);

  /* ------------------------------------------------------ Para imprimir */
  // Al imprimir se abre todo; al terminar se devuelve cada cosa a como estaba.
  var cerradosAntes = [];
  window.addEventListener('beforeprint', function () {
    cerradosAntes = [];
    cada('details:not([open])', function (d) { cerradosAntes.push(d); d.setAttribute('open', ''); });
  });
  window.addEventListener('afterprint', function () {
    cerradosAntes.forEach(function (d) { d.removeAttribute('open'); });
    cerradosAntes = [];
  });

  window.Componentes = { renderizarFormulas: renderizarFormulas, alternarPaso: alternarPaso, activar: activar };
})();
