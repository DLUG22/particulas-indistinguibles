# CONTRATO de las simulaciones

Motor portado **sin cambios de interfaz** desde la página de Mecánica Cuántica I (Parcial 1). Este archivo manda sobre cómo se escribe una simulación.

## Reglas
- **Un archivo por simulación**: `js/sims/<id>.js`, una IIFE con script clásico. El id del archivo es el mismo de `registrarSim` y del bloque ```` ```sim ```` del Markdown. Además, agrégala a `js/sims/lista.js`.
- **No modifiques** `js/nucleo/*` (constantes, numerico, graficos, ui, registro, pruebas). Si falta algo, impleméntalo en tu archivo.
- **Nada de DOM al cargar** (las pruebas corren en Node, sin navegador): sólo dentro de `montar`. `calcular(p)` es **pura**.
- Todo el texto visible en español. Los números visibles con coma decimal (`Num.formatoNum(v, 3).replace('.', ',')`).
- **Colores por nombre o token**, nunca sueltos. Convención física: bosones/simétrico → `var(--boson)`; fermiones/antisimétrico → `var(--fermion)`; distinguibles/clásico → `'clasico'` (gris, `estilo: 'discontinuo'`). En Graf: `'acento'` (rojo UT), `'clasico'`, `'aprox'`, `'tenue'`, `'texto'`, `'s1'…'s6'`.
- **Pruebas obligatorias**: al menos 3 casos con valores esperados calculados **aparte** (Python o fórmula cerrada), con `fuente` que diga de dónde salen (ecuación del Cohen o «Python»). Si una prueba falla se arregla el cálculo, **nunca** el valor esperado ni la tolerancia.
- Referencia: copia la estructura de `js/sims/degeneracion-intercambio.js` (gráfica) o `js/sims/paquetes-colision.js` (animación con dibujo libre).

## Cómo correr las pruebas
```bash
node herramientas/ejecutar_pruebas.js                      # todas (RESULTADO: N/N)
node herramientas/ejecutar_pruebas.js degeneracion-intercambio
node herramientas/ejecutar_pruebas.js --solo-fallos
```
En el navegador, cada tarjeta muestra la insignia «✓ k/k pruebas».

## Objeto de simulación
`registrarSim({id, unidad (nº de sección), tema ('1.3'), prioridad ('A'|'B'|'C'), titulo, tipo, controles, lecturas, calcular(p), adaptarPrueba?, pruebas, montar(cont, estadoInicial)})`. `calcular(p)` recibe TODOS los controles (los que falten, con su `defecto`) y devuelve, con los nombres exactos de las pruebas, todo lo de lecturas y pruebas, más lo que dibuje `montar`.
`pruebas`: `{fuente, entrada:{...}, salida:{clave: esperado}, tol_rel | tol_abs, exactos?:[claves]}`. Un caso pasa si pasan todas sus claves.
`montar` debe devolver la api de `UI.montarEstandar` (`{actualizar, destruir}`).

## `C` (constantes, congeladas)
`PI h hbar c kB e eV me mp mn eps0 NA R e02 a0 Rinf lambdaC bWien sigmaSB inv_expm1(x) x_over_expm1(x) M_alpha hc_eVnm`.

## `Num` (sin DOM)
- Utilidades: `linspace(a,b,n)`, `logspace(a,b,n)`, `limitar`, `signo`, `mapear(xs,f)`, `interp(xs,ys,x)`, `derivada(f,x,h)`, `promedioMovil(y,w)`.
- Integrar: `simpson(f,a,b,n)` (n→par), `simpsonMalla(y,h)` (malla dada, acepta nº impar de subintervalos), `trapz(xs,ys)`, `acumulada(y,h)`.
- Raíces: `biseccion(g,a,b,tol)`→x|NaN, `biseccionInfo`→{x,ok,iter,ancho}, `buscarRaices(g,a,b,nPasos=400,tol=1e-10)`, `maximo(f,a,b)`→{x,fx}, `raizNewton(g,dg|null,x0)`.
- Numerov: `mallaAlineada(xmin,xmax,dxMax,unidadBase,origen)` (nodos exactos en `origen ± j·unidadBase`), `potencialEnMalla(x,fV,saltos[])` (promedio de V en cada salto), `numerov(x,V|fn,E,psi0,psi1,{fac=2,soloFinal})`→{psi,psiFinal,nodos,reescalados} (reescala si |ψ|>1e100; ħ=m=1: ψ''=2(V−E)ψ).
- `rk4Paso(f,t,y,h)`, `rk4Sistema(f,y0,t0,tf,h,{cada,soloFinal})`→{t[],y[][]} con t_k=t0+k·h exacto; `f(t,y,tCentro)` recibe también el centro del paso (para V constante por paso).
- Complejos `Num.Cx` (objetos `{re,im}`; aceptan números reales): `nuevo add sub mul div neg conj escalar(k,z) inv abs abs2 arg exp expI(θ) dePolar(r,θ) log sqrt` (rama principal) `pow suma(zs) aTexto I UNO CERO`.
- Azar: `prng(semilla)`→()=>U[0,1) (mulberry32), `SEMILLA` (para pruebas), `gauss(rng)`, `muestreadorCDF(f,a,b,n≥4000)`→{inversa(u),muestra(rng),cdf(x),area,x,F}, `muestreadorDesdeMalla(x,pdf)`. El CDF usa punto medio: con divergencias en los extremos (1/√) usa la inversa analítica. `histograma(datos,a,b,nBins)` y `acumuladorHistograma(a,b,nBins)`→{agregar,reiniciar,resultado()}; resultado={a,dx,cuentas,centros,densidad,total,dentro}.
- Especiales: `fresnelC(z)`, `fresnelS(z)` (Simpson, paso ≤2e-4; C(1)=0.779893), `erf`, `erfc`, `normalCDF`, `gamma`, `lnGamma`.
- Formato: `formatoSI(v,'m',cifras)` (prefijos f…G; sólo en unidades simples; compuestas como `J/m³`, `rad/s`, `Å` sin prefijo; fuera de rango → `3.410×10¹⁴ Hz`), `formatoNum(v,cifras)`, `superindice(n)`, `subindice(n)`, `colorLongitudOnda(nm)` (gris fuera de 380–750), `colorLongitudOndaRGB`, `esVisible`.

## `Graf` (Canvas 2D, sólo navegador; modo inmediato)
`g = Graf.crear(cont,{altura|aspecto, xlim,ylim, xescala:'lin'|'log', yescala, xetiqueta,yetiqueta,titulo, igual:true (escala 1:1), ejes:false (dibujo libre), margen:{izq,der,arr,aba}, leyenda:'ne'|'nw'|'se'|'sw'|false, xmultiplicador/ymultiplicador:'auto'|false|n, descripcion (aria)})`.
`Graf.paneles(cont,[{id,cols:'todo',...opciones}],{minimo:px})`→`{id:g,...}` (+`.lista`, `.destruir()`).
Ciclo: `g.configurar({xlim,ylim,...})`; `g.dibujar(function(g){...})` (guarda la función y se repinta solo al redimensionar o cambiar de tema); `g.redibujar()`, `g.destruir()`. Dentro: recorte al área; `g.despues(fn)` dibuja fuera del recorte; la leyenda sale sola de `etiqueta`.
Primitivas (datos): `curva(x,y,{estilo,color,ancho,etiqueta,saturar,dash})`, `curvaF(f,a,b,n,o)`, `curvaPolar(θ,r,o)`, `relleno(x,y,{base,color,alfa})`, `rellenoEntre(x,y1,y2,{donde(i)})`, `regionV(x0,x1,{texto})`, `regionH`, `marcadorV(x,etq,o)`, `marcadorH(y,etq,{alinear})`, `punto(x,y,{etiqueta})`, `puntos(x,y,{radio})`, `linea`, `flecha(x0,y0,x1,y1,{etiqueta})`, `rectangulo`, `poligono(xs,ys)`, `circulo(cx,cy,r)`, `arco(cx,cy,r,a0,a1)`, `rejillaPolar(rmax)`, `barras(x,y,{ancho,colores(i)})`, `histograma(h,{que:'densidad'|'cuentas',escala})`, `mapaCalor(Z,{paleta:'divergente'|'secuencial'|'gris',valores,dec,resaltar:[[i,j]],barra,origenArriba})`, `texto(x,y,txt,{align,fondo,tam,color,dx,dy})`, `textoPx`.
Acceso libre: `g.ctx`, `g.rect` (px del área), `g.px(x) g.py(y) g.ix(px) g.iy(py)`, `g.alPuntero(fn(tipo,x,y,ev))`. Colores por nombre (`'acento' 'clasico' 'aprox' 'texto' 'tenue' 'negativo' 'positivo' 's1'…'s6'`) o CSS. `NaN`/`±Infinity` cortan el trazo (con `saturar:true` ±Infinity se recorta al borde). `Graf.rango([arr..],{cero,margen,log})`, `Graf.ticks`.

## `UI` (sólo navegador)
- `UI.montarEstandar(cont, SIM, cfg)` (lo normal): `cfg={estadoInicial, paneles:[...Graf], dibujar(res,estado,paneles,api), lecturas, restriccion(estado,idCambiado|null), alSoltar, animar:{paso(dt,t,api)→'calcular'|true|falsy, reiniciar(api), autoInicio}, alCambiar, antes(api)}`. Devuelve `api={estado,res,paneles,lecturas,controles,bucle,zonaControles,zonaVisual,actualizar(parcial?),actualizarYa(),redibujar(),avisar(txt,tipo),destruir()}`; **`montar` debe devolver esa api** (`{actualizar,destruir}`).
- Controles (`sim.controles`): `{id,nombre,unidad,min,max,paso,defecto,escala:'log',opciones:[str|{valor,nombre}],tipo:'boton'|'casilla'|'multi',animable,duracion,alSoltar|caro,ayuda,cifras,decimales,formato(v),visible(e),habilitado(e),opcionesDeshabilitadas(e),accion(e,api)}`; `min`/`max` pueden ser `function(estado)`. Multi: `defecto` es array. La `restriccion` muta `estado` (p. ej. `if(e.n_inf>=e.n_sup){...}`) y debe aceptar `idCambiado===null`. Un botón llama a `accion` y luego a `calcular` (tipo 'boton' no entra en `estado`).
- Lecturas (`sim.lecturas`): `{id,nombre,unidad,formato:'SI'|'num'|'texto'|fn,cifras,de:'clave de calcular'|valor(res,estado),visible(res,estado)}`.
- Sueltos: `UI.el`, `UI.crearControles`, `UI.crearLecturas`, `UI.crearAviso`, `UI.crearBucle(cont,{paso(dt,t),reiniciar,autoInicio,velocidades,observar})` (▶/⏸/↺, pausa fuera de vista y con la pestaña oculta), `UI.programador(fn)` (máx. 1 por cuadro), `UI.parseNum`, `UI.formatoValor`, `UI.enConstruccion`.
- Animaciones: usar `animar` de `montarEstandar`; el estado de la animación (partículas, N, t) vive en variables de la clausura; `reiniciar` lo pone a cero; recalcular tablas caras (CDF, etc.) sólo cuando cambien sus parámetros (`alCambiar`). Un control `animable:true` ya trae su ▶.

## Trampas conocidas
- `Graf` no tiene marcas de eje personalizadas: para ejes categóricos usa `ejes:false` y dibuja tu rejilla (ver `degeneracion-intercambio.js`).
- El texto se encoge/desplaza para no salirse del área; fuera del área usa `dentro:false` o `g.despues`.
- `formatoSI` no pone prefijo a unidades compuestas.
- Desde el 2026-11-18 el motor muestra con **coma decimal** las marcas de los ejes, la barra de color, los valores de `mapaCalor`, la casilla numérica de los deslizadores y las lecturas `'num'`/`'SI'` (sólo formato; la interfaz no cambió). `Num.formatoNum` sigue devolviendo punto: en el texto propio de cada simulación hay que seguir usando `.replace('.', ',')`.
- El `<input type="range">` de un deslizador guarda el **índice del paso** (0 … (max−min)/paso), no el valor: el valor real está en la casilla numérica y en `estado`.
