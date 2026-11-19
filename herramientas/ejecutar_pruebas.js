#!/usr/bin/env node
/* =============================================================================
   ejecutar_pruebas.js — Pruebas numéricas de las simulaciones, SIN navegador.
   -----------------------------------------------------------------------------
   Funciona con Node en cualquier sistema (no necesita npm ni paquetes):

     node herramientas/ejecutar_pruebas.js                    # todas las de js/sims/lista.js
     node herramientas/ejecutar_pruebas.js paquetes-colision  # sólo esas
     node herramientas/ejecutar_pruebas.js --solo-fallos      # oculta lo que pasa

   Carga, en un contexto aislado (vm): js/nucleo/{constantes, numerico, registro},
   js/sims/lista.js, cada js/sims/<id>.js y js/nucleo/pruebas.js. Los archivos de
   simulaciones no pueden tocar el DOM al cargarse (aquí no existe).
   Sale con código 3 si alguna prueba falla o algún archivo no carga.
   ============================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RAIZ = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const soloFallos = args.includes('--solo-fallos');
const filtro = args.filter((a) => !a.startsWith('-'));

const contexto = { console, Math, JSON, Date, Number, String, Array, Object, isFinite, isNaN, parseFloat, parseInt };
contexto.window = contexto;
vm.createContext(contexto);

const erroresCarga = [];
function cargar(rel) {
  const ruta = path.join(RAIZ, rel);
  try {
    vm.runInContext(fs.readFileSync(ruta, 'utf8'), contexto, { filename: rel });
    return true;
  } catch (e) {
    console.log(`ERROR al cargar ${rel}: ${e && e.message ? e.message : e}`);
    erroresCarga.push(rel);
    return false;
  }
}

['js/nucleo/constantes.js', 'js/nucleo/numerico.js', 'js/nucleo/registro.js', 'js/sims/lista.js'].forEach(cargar);
const lista = contexto.LISTA_SIMS || [];
const desconocidos = filtro.filter((f) => !lista.includes(f));
if (desconocidos.length) {
  console.log(`Id(s) desconocido(s): ${desconocidos.join(', ')}\nIds en js/sims/lista.js: ${lista.join(' ')}`);
  process.exit(2);
}
lista.forEach((id) => { if (!filtro.length || filtro.includes(id)) cargar(`js/sims/${id}.js`); });
cargar('js/nucleo/pruebas.js');

const { Pruebas, SIMS } = contexto;
if (!Pruebas || !SIMS) { console.log('No se pudo cargar el núcleo.'); process.exit(3); }

const res = Pruebas.ejecutarTodas({ filtro: filtro.length ? filtro : null });
Pruebas.informeTexto(res, { soloFallos }).forEach((l) => console.log(l));
console.log('');
const faltan = lista.filter((id) => (!filtro.length || filtro.includes(id)) && !SIMS[id]);
faltan.forEach((id) => console.log(`FALTA registrar: ${id} (¿el id del archivo coincide con registrarSim?)`));
const fallos = res.detalle.filter((d) => !d.ok);
if (fallos.length) {
  console.log(`FALLAN ${fallos.length} prueba(s):`);
  fallos.forEach((d) => {
    const malas = d.claves.filter((c) => !c.ok).map((c) => c.clave);
    console.log(`  - ${d.sim} #${d.indice} (${d.fuente || 'sin fuente'})${malas.length ? ': ' + malas.join(', ') : ''}${d.excepcion ? ' EXCEPCIÓN: ' + d.excepcion : ''}`);
  });
}
console.log(`RESULTADO: ${res.superadas}/${res.total}`);
if (fallos.length || erroresCarga.length || faltan.length) process.exit(3);
