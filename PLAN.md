# Plan del proyecto — Partículas indistinguibles

**Física Atómica y Nuclear · Universidad del Tolima · 2026-2**
Página web para desarrollar el parcial de *partículas indistinguibles*: teoría completa, simulaciones, paso a paso de cada ejercicio, entendimiento físico, referencias y versión imprimible.

> Documento vivo. Si cambia una decisión, se cambia aquí primero (y en `CLAUDE.md` si afecta cómo trabaja Claude).

---

## 1. Lo que pide el profesor → cómo lo cubrimos

| Requisito | Cómo lo resolvemos |
|---|---|
| Explicación del tema a cabalidad | Una página por sección, con la derivación completa en bloques plegables: *Contexto · Desarrollo · Resultado · Interpretación física*. |
| Simulaciones de los ejercicios | Cada ejercicio trae su simulación con los datos del enunciado ya cargados, más simulaciones conceptuales por sección. Usamos el motor de MC I. |
| Paso a paso de cada ejercicio | Componente *paso a paso*: cada paso se destapa con un clic y trae su comentario. También hay un botón «ver todo». |
| Entendimiento físico | Recuadros *Idea física* y *Errores comunes*, preguntas con la respuesta oculta y sección *¿Qué pasa si…?* |
| Referencias | Página de referencias más una cita al pie de cada sección. |
| Que se vea bien y sea intuitiva | Sistema de diseño propio (§4), índice lateral que marca dónde vas y que nunca tapa el texto. |
| Que se pueda **imprimir** | `imprimir.html`: todo el contenido en orden, con los pasos y las respuestas abiertos. Cada simulación sale como figura con un código QR a la versión interactiva (§6). **Es viable** y va en la fase 4. |

## 2. Lo que aprendimos de las dos páginas anteriores

**Estado Sólido** (estadosolido.tymom.org)
- ✅ Lo que se queda: la identidad UT (rojo institucional), el encabezado «Parte N» en cada página, el glosario con términos resaltados y ventana emergente, el botón para descargar el notebook, el video de introducción y los créditos.
- ❌ Lo que mejoramos:
  - El índice flotante tapa el texto en pantallas medianas.
  - Las simulaciones son iframes de notebooks exportados: pesados, con scroll horizontal y con un estilo distinto al de la página.
  - No hay paso a paso ni autoevaluación.
  - No hay modo oscuro ni versión imprimible.
  - MathJax se carga sin versión fija (`mathjax@3`).

**Mecánica Cuántica I** (la nuestra)
- ✅ Lo que se queda, que es la base técnica:
  - El motor propio `Graf` / `UI` / `Num`: Canvas, rápido y con los colores tomados del CSS.
  - Una simulación por archivo, con contrato de interfaz y pruebas numéricas (`jsc`).
  - Teoría en Markdown con KaTeX.
  - Esqueleto «tapar y recordar», preguntas con la respuesta oculta, semáforo de autoevaluación y modo claro/oscuro.
- ❌ Lo que mejoramos:
  - La estética: más editorial, con movimiento.
  - El archivo madre único de 220 KB se parte en **un archivo por sección**, para que dos personas trabajen sin pisarse.

## 3. Arquitectura

- **Sitio estático, sin compilación**: HTML, CSS y JS clásico (sin módulos ES). GitHub Pages lo publica tal cual y gratis. No hay que instalar nada para trabajar en ella.
- **El contenido se escribe en Markdown**: `contenido/NN-*.md`, un archivo por sección y otro por ejercicio. Cada simulación se declara dentro del `.md` con un bloque ` ```sim ` en YAML (id, controles, pruebas), igual que en MC I.
- **Motor de simulaciones**: se porta de MC I a `js/nucleo/` sin cambiar su interfaz, y se documenta en `CONTRATO.md`.
- **Bibliotecas por CDN con versión fija**: KaTeX 0.16.25, markdown-it 14.1.0, markdown-it-texmath 1.0.0 y Lenis 1.1.13 (scroll suave, opcional). Si falta una, la página sigue funcionando.

```
/                        ← raíz del repo = raíz de GitHub Pages
├── index.html           portada (ya existe el prototipo)
├── seccion.html         plantilla de lectura (fase 2)
├── imprimir.html        versión imprimible (fase 4)
├── contenido/           ★ teoría y ejercicios en Markdown (fuente única)
├── css/                 tokens · sitio · movimiento · impresion
├── js/sitio/            tema, movimiento, portada, navegación, cargador de contenido
├── js/nucleo/           motor portado de MC I (constantes, numerico, graficos, ui, registro, pruebas)
├── js/sims/             una simulación por archivo: <id>.js
├── assets/img/          logo UT, figuras
├── herramientas/        extraer_cohen.py (prepara material/), pruebas sin navegador, empaquetado
├── material/            ⚠ NO se publica (.gitignore): PDFs, enunciados, notas
└── docs/prompts/        plantillas de prompts compartidas
```

## 4. Diseño y experiencia

**Principio:** formal (Universidad del Tolima), de este tiempo y cómodo para leer un buen rato.

- **Tipografía**: *Fraunces* en los títulos (serif editorial, se ve académica sin ser vieja), *Inter* en el texto (con números tabulares en las lecturas) y KaTeX en las fórmulas.
- **Color**: el rojo UT es el acento, no el fondo. Papel cálido y tinta casi negra.
- **Convención física fija**, la misma en texto, gráficas y simulaciones:
  - **bosones = azul**
  - **fermiones = rojo UT**
  - distinguibles / clásico = gris (discontinuo en las gráficas)
- **Movimiento** (lo «chévere»):
  - Al hacer scroll, cada bloque entra de desenfocado a nítido con una subida suave.
  - Los títulos entran palabra por palabra.
  - Arriba hay una barra con el progreso de la lectura.
  - La barra superior se vuelve vidrio esmerilado al bajar.
  - La portada muestra viva la densidad |Ψ(x₁,x₂,t)|² de dos partículas, con un selector distinguibles/bosones/fermiones. El hueco de Pauli en la diagonal se ve desde el primer segundo.
  - La línea del mapa del módulo se dibuja con el scroll.
  - En las tarjetas, una luz sigue al cursor.
  - El scroll es suave (Lenis), pero no en pantallas táctiles.
- **Comodidad**:
  - Ancho de lectura de 68 caracteres como máximo, con interlineado de 1,7.
  - Contraste AA.
  - **Las cosas sólo se animan al entrar; nada se mueve mientras lees.**
  - Si el sistema tiene activado «reducir movimiento», se apaga todo.
  - En el celular, el índice lateral pasa a ser un cajón.

## 5. Contenido

**Fuente única:** Cohen-Tannoudji, Diu y Laloë, *Quantum Mechanics*, vol. II, 2.ª ed. (Wiley-VCH, 2020), **cap. XIV «Systems of Identical Particles», pp. 1419–1504**. El microcurrículo pone el tema en la semana 11.

**Pregunta guía (del microcurrículo):** *¿Por qué las partículas idénticas obedecen principios estadísticos diferentes y cómo estos determinan la estructura electrónica y nuclear de la materia?*

El material ya está preparado en `material/` con `herramientas/extraer_cohen.py`: el capítulo en PDF, el texto plano y el mapa de secciones con sus páginas (`material/notas/cohen-XIV-mapa.md`).

| # | Sección de la página | Cohen | Págs. | Simulación propuesta (`id`) |
|---|---|---|---|---|
| 0 | Inicio | — | — | `portada-densidad` ✅ |
| 1 | El problema de las partículas idénticas: clásica contra cuántica, degeneración de intercambio | §A | 1420–1425 | `trayectorias-vs-paquetes`: dos paquetes que se solapan, y ya no se puede saber cuál es cuál |
| 2 | Operadores de permutación: P₂₁, N partículas, S y A, cómo se transforman los observables | §B | 1425–1434 | `permutaciones-s3`: las 6 permutaciones de 3 partículas y su paridad |
| 3 | Postulado de simetrización: kets físicos, determinante de Slater, medida y evolución | §C | 1434–1443 | `slater`: eliges los orbitales y el determinante se anula si repites uno |
| 4 | Bosones, fermiones y Pauli: estado fundamental, estadísticas cuánticas | §D-1 | 1444–1446 | `llenado-niveles` · `conteo-microestados` (MB, BE y FD contando microestados, como en el Cohen) |
| 5 | Interferencia entre el proceso directo y el de intercambio; cuándo se puede ignorar la simetrización | §D-2 | 1446–1455 | `densidad-dos-particulas` · `colision-identicas` |
| 6 ⏸ | Átomos de muchos electrones: campo central y configuraciones | Compl. A_XIV | 1459–1466 | `configuraciones`: la tabla periódica que se va llenando |
| 7 ⏸ | Átomo de helio: energía de intercambio, términos espectrales y multipletes | Compl. B_XIV | 1467–1480 | `helio-intercambio`: integrales J y K, singlete y triplete |
| 8 ⏸ | Gas de electrones: energía de Fermi y electrones en sólidos | Compl. C_XIV | 1481–1495 | `gas-fermi` |
| E | **Ejercicios** (una página cada uno) | Compl. D_XIV | 1496–1504 | uno por ejercicio (tabla de abajo) |
| — | Glosario · Referencias · Créditos · Imprimir | — | — | — |

> ⏸ **Complementos A, B y C en pausa** (decisión del 2026-11-18) hasta que el profesor confirme si entran en el parcial. No se escriben sus secciones mientras tanto.

**Orden de prioridad** (acordado el 2026-11-18):
1. **Imprescindible:** el cuerpo del capítulo, §A–§D (pp. 1419–1455) → secciones 1 a 5.
2. **Imprescindible:** los ejercicios del D_XIV (pp. 1496–1504).
3. **Según los ejercicios que entren:** del Complemento B, el §2-b (términos espectrales), que usa el ejercicio 2; del Complemento C, el §1 (gas de electrones en una caja), que usa el ejercicio 9. Sólo esas partes, no el complemento completo.
4. **Opcional:** el Complemento A (cualitativo; responde a la pregunta guía sobre la estructura electrónica) y el resto de B y C.

El rango de trabajo sigue siendo pp. 1419–1504: cortar en la p. 1450 dejaría a medias el §D-2-a (pp. 1446–1452), que usan los ejercicios 4, 5 y 7, y fuera el §D-2-b. Leer más páginas no sube el costo, porque de cada sección se lee sólo lo necesario con el mapa.

**Ejercicios del D_XIV.** *Supuesto: son los ejercicios del parcial, porque el único material es el Cohen.*

| Ej. | Tema | Simulación propuesta |
|---|---|---|
| 1 | Partículas en tres niveles equidistantes (0, ħω₀, 2ħω₀): niveles del sistema y sus degeneraciones según el tipo de partícula y el espín | `ej1-tres-niveles` |
| 2 | Términos espectrales de dos bosones de espín 1 en las configuraciones 1s², 1s2s y 2p² | `ej2-terminos` |
| 3 | Dos electrones con espín + en orbitales p orientados: estado antisimétrico y densidad angular | `ej3-orbitales` |
| 4 | Colisión entre dos partículas idénticas | `ej4-colision` |
| 5 | Colisión de partículas idénticas no polarizadas de espín s | `ej5-no-polarizadas` |
| 6 | Valores posibles del momento angular relativo de dos partículas idénticas | `ej6-momento-relativo` |
| 7 | Densidades de probabilidad de posición de dos partículas idénticas | `ej7-densidades` |
| 8 | Basta con simetrizar el vector de estado: no hace falta simetrizar los kets de la medida | demostración con verificación numérica |
| 9 | Funciones de densidad de una y dos partículas en un gas de electrones a T = 0 (el hueco de intercambio) | `ej9-hueco-intercambio` |

*Extra opcional* (no está en el Cohen, pero sí en el microcurrículo): un recuadro «Conexión nuclear» sobre los nucleones como fermiones y el principio de Pauli en el modelo de capas nuclear.

**Anatomía de una sección:** idea central (2–3 líneas) → teoría (*Contexto · Desarrollo · Resultado · Interpretación física*) → simulación → esqueleto «tapar y recordar» → preguntas → errores comunes → referencias.

**Anatomía de un ejercicio:** enunciado → qué piden y con qué estrategia → **paso a paso** (cada paso con su comentario) → resultado enmarcado → verificación (dimensiones, casos límite, simulación con los datos del enunciado) → entendimiento físico → ¿qué pasa si…?

## 6. Versión imprimible

`imprimir.html` reúne todo en orden: portada UT, índice, secciones, ejercicios, glosario y referencias. Al imprimir:
- los pasos y las respuestas salen abiertos;
- cada simulación se vuelve figura (una captura del lienzo en su estado por defecto), con su pie y un QR a la versión interactiva;
- la página es A4 o Carta, con márgenes y números de página, y sin cortes dentro de ecuaciones ni figuras;
- se imprime en blanco y negro legible, para ahorrar tóner.

Sale con Cmd/Ctrl+P o con «Guardar como PDF». El prototipo ya trae una hoja de estilos de impresión básica.

## 7. Forma de trabajo (David + Claude)

> Decisión del 2026-11-18: **la página la hacen David y Claude**; la compañera ya no participa.

- Las reglas comunes están en `CLAUDE.md`, que Claude lee al abrir la carpeta. Así cualquier sesión nueva arranca con el mismo contexto.
- En `docs/prompts/` hay plantillas de prompts para pedir cada tipo de tarea de la misma forma.
- **Costos:**
  - El material se procesa **una sola vez**: se pasa de PDF a notas Markdown en `material/notas/`, y desde ahí Claude lee texto.
  - El diseño y la arquitectura se hacen una vez, con el modelo más capaz. La redacción y las simulaciones rutinarias pueden ir con uno más económico.
  - Una sesión corta por tarea (una sección o una simulación).
  - Las bibliotecas pesadas (KaTeX, markdown-it, Lenis) se cargan por CDN con versión exacta y huella **SRI**: el navegador las rechaza si alguien las altera.

## 8. Fases

| Fase | Qué | Quién |
|---|---|---|
| **F0 Arranque** | Repo, esqueleto, sistema de diseño, portada prototipo, `CLAUDE.md`, plantillas | ✅ hecho |
| **F1 Material** | ✅ Cohen ubicado y extraído (`material/`), mapa de secciones, ejercicios identificados (D_XIV, 9). Falta: notas en Markdown con ecuaciones, sección por sección (se hacen justo antes de escribir cada sección) | David + Claude |
| **F2 Motor** | ✅ Núcleo de MC I portado, `CONTRATO.md`, cargador md → página (`js/sitio/seccion.js`), `seccion.html`, índice con scroll-spy y cajón en el celular, paso a paso, esqueleto, preguntas, pruebas con Node, servidor sin caché, SRI. Falta: glosario emergente | David + Claude |
| **F3 Contenido** | Secciones, ejercicios y simulaciones, con pruebas numéricas. ✅ Sección 1 (§A, 2 simulaciones) · ✅ Sección 2 (§B, 1 simulación) · ✅ Sección 3 (§C, simulación `slater`) · ✅ Sección 4 (§D-1, 2 simulaciones) · ✅ Sección 5 (§D-2, 2 simulaciones): **cuerpo del capítulo completo** · 57/57 pruebas | David + Claude |
| **F4 Pulido** | `imprimir.html`, accesibilidad, móvil, rendimiento, revisión final de la física, video de introducción (opcional) | David + Claude |
| **F5 Entrega** | Lista de verificación (§9), ensayo de impresión, enlace final | David + Claude |

## 9. Lista de verificación antes de entregar

- [ ] Cada ejercicio del parcial tiene enunciado, paso a paso, simulación y entendimiento físico.
- [ ] Todas las pruebas numéricas pasan (`RESULTADO: N/N`).
- [ ] 0 errores de KaTeX y 0 errores en la consola.
- [ ] Se ve bien a 375 px, 768 px y 1440 px, en claro y en oscuro.
- [ ] Con «reducir movimiento» no hay animaciones y todo se lee.
- [ ] La impresión sale completa, sin cortes feos y con los QR.
- [ ] Referencias completas y créditos con los nombres.
- [ ] Lighthouse ≥ 90 en rendimiento y accesibilidad.

## 10. Pendiente de ustedes

- [x] **Material**: sólo el Cohen II, cap. XIV (pp. 1419–1504).
- [ ] **Preguntar al profesor** si entran los complementos A, B y C del XIV o sólo el capítulo y los ejercicios (en particular los ejercicios 2 y 9, que dependen de B §2-b y C §1). Mientras tanto, los complementos están en pausa (§5).
- [ ] Fecha de entrega.
- [ ] Usuario de GitHub y nombre del repositorio.
- [ ] Logo oficial UT en SVG o PNG (David lo envía; va en `assets/img/`).
- [ ] Nombres para los créditos.
