---
titulo: Postulado de simetrización
numero: 3
cohen: Cohen §C · pp. 1434–1443
resumen: El postulado nuevo de la mecánica cuántica para partículas idénticas. Sólo los kets totalmente simétricos (bosones) o totalmente antisimétricos (fermiones) describen estados físicos. Con eso desaparece la degeneración de intercambio, aparecen el determinante de Slater y el principio de Pauli, y el resto de los postulados sigue funcionando sin contradicciones.
---

:::idea-central
Cuando un sistema contiene partículas idénticas, **no todo ket del producto tensorial es un estado físico**: sólo lo son los totalmente simétricos, si las partículas son **bosones**, o los totalmente antisimétricos, si son **fermiones**. Esta restricción escoge, dentro de cada familia de kets degenerados por intercambio, uno solo (salvo un factor): el ket físico $S\ket u$ o $A\ket u$. Para fermiones, ese ket es un **determinante de Slater**, que se anula cuando dos partículas ocupan el mismo estado: es el **principio de exclusión de Pauli**.
:::

:::nota
Esta sección junta las dos anteriores. De la sección 1 trae el problema, la **degeneración de intercambio**; de la sección 2, las herramientas: las permutaciones $P_\alpha$, su paridad $\varepsilon_\alpha$ y los proyectores $S$ y $A$. Desde aquí las partículas **sí** son idénticas: los números (1), (2), … ya no identifican a ninguna partícula concreta, son sólo etiquetas para escribir los kets.
:::

## C-1 · El postulado {#c-1}

:::resultado
**Postulado de simetrización.** Si un sistema contiene varias partículas idénticas, sus estados físicos se describen sólo con kets que son, según la naturaleza de las partículas, **totalmente simétricos** o **totalmente antisimétricos** frente a cualquier permutación de ellas.
- Las partículas cuyos kets físicos son simétricos se llaman **bosones**.
- Las partículas cuyos kets físicos son antisimétricos se llaman **fermiones**.
:::

Este postulado no se deduce de los anteriores: es un postulado **nuevo**, que se agrega a los del capítulo III del Cohen. Lo que cambia es el **espacio de estados**. Con partículas de distinta naturaleza era el producto tensorial $\mathscr E=\mathscr E(1)\otimes\mathscr E(2)\otimes\cdots\otimes\mathscr E(N)$; con partículas idénticas es sólo uno de sus subespacios:

$$\mathscr E_{\text{físico}}=\begin{cases}\mathscr E_S & \text{bosones}\\ \mathscr E_A & \text{fermiones}\end{cases}$$

**¿Quién es bosón y quién fermión?** El postulado no lo dice; lo dice la experiencia. Todas las partículas conocidas cumplen una regla empírica, la **conexión espín-estadística**:

- espín **semientero** ($\tfrac12,\tfrac32,\dots$) ⇒ **fermión**: electrones, positrones, protones, neutrones, muones…
- espín **entero** ($0,1,2,\dots$) ⇒ **bosón**: fotones, mesones…

En teoría cuántica de campos esta regla se demuestra a partir de hipótesis muy generales (el *teorema de espín-estadística*). El Cohen advierte, sin embargo, que esas hipótesis podrían no cumplirse todas, de modo que no es imposible, en principio, encontrar una excepción o kets con simetrías más complicadas.

:::pasos Partículas compuestas: ¿bosón o fermión?
+++ Permutar dos compuestas es permutar todos sus constituyentes
Si dos partículas compuestas idénticas intercambian sus papeles, cada constituyente de la primera se intercambia con el constituyente correspondiente (idéntico a él) de la segunda.
> Una sola permutación «grande» equivale a varias transposiciones de partículas elementales hechas a la vez.
+++ Contar los cambios de signo
Cada transposición de dos fermiones elementales le cambia el signo al ket; la de dos bosones no lo cambia. Si cada compuesta tiene $n_F$ fermiones, el ket total se multiplica por $(-1)^{n_F}$.
> Los bosones constituyentes no aportan signo.
+++ Clasificar
- $n_F$ **par** ⇒ el ket no cambia de signo ⇒ la compuesta es un **bosón**.
- $n_F$ **impar** ⇒ el ket cambia de signo ⇒ la compuesta es un **fermión**.

> Y concuerda con la regla de espín: sumar un número par de espines semienteros da un espín entero, y sumar uno impar, un espín semientero (cap. X del Cohen).
+++ Núcleos atómicos
Protones y neutrones son fermiones de espín ½. Un núcleo con número másico $A$ par es un bosón; con $A$ impar, un fermión. El núcleo de $^3$He (3 nucleones) es fermión y el de $^4$He (4 nucleones), bosón.
> Para el átomo neutro hay que sumar los electrones: el $^4$He tiene $2+2+2=6$ fermiones (bosón) y el $^3$He tiene 5 (fermión). Por eso sus líquidos se comportan de forma tan distinta a bajas temperaturas.
:::

## C-2 · Se acaba la degeneración de intercambio {#c-2}

Resumamos el problema de la sección 1. Sea $\ket u$ un ket que describe un estado físico bien definido de $N$ partículas idénticas. Como las etiquetas no significan nada, **cualquier** $P_\alpha\ket u$ describe el mismo estado, y también cualquier combinación lineal de ellos. Todos esos kets forman el subespacio

$$\mathscr E_u=\operatorname{span}\big\{P_\alpha\ket u\big\},\qquad 1\le\dim\mathscr E_u\le N!$$

Si $\dim\mathscr E_u>1$ hay **degeneración de intercambio**: varios kets matemáticos, con predicciones distintas, para un solo estado físico. El postulado sólo admite kets de $\mathscr E_S$ (bosones) o de $\mathscr E_A$ (fermiones). El problema queda resuelto si $\mathscr E_u$ contiene **un único** ket de $\mathscr E_S$, o un único ket de $\mathscr E_A$, salvo un factor.

:::pasos Todos los kets de $\mathscr E_u$ dan el mismo ket físico
+++ La herramienta: $S$ y $A$ «absorben» las permutaciones
En la sección 2 vimos (B-53) que $SP_\alpha=S$ y $AP_\alpha=\varepsilon_\alpha A$ para toda permutación.
> Simetrizar un ket permutado es lo mismo que simetrizar el original.
+++ Aplicarlo a los generadores de $\mathscr E_u$
$$S\ket u=S\,P_\alpha\ket u\tag{C-1a}$$
$$A\ket u=\varepsilon_\alpha\,A\,P_\alpha\ket u\tag{C-1b}$$
> Leídas al revés: la proyección de $P_\alpha\ket u$ sobre $\mathscr E_S$ es $S\ket u$, y sobre $\mathscr E_A$ es $\pm A\ket u$.
+++ Extender a todo $\mathscr E_u$
Un ket cualquiera de $\mathscr E_u$ es $\sum_\alpha c_\alpha P_\alpha\ket u$. Por linealidad, su proyección es
$$\begin{aligned}S\sum_\alpha c_\alpha P_\alpha\ket u&=\Big(\sum_\alpha c_\alpha\Big)S\ket u\\A\sum_\alpha c_\alpha P_\alpha\ket u&=\Big(\sum_\alpha c_\alpha\varepsilon_\alpha\Big)A\ket u\end{aligned}$$
> Todas las proyecciones son **colineales**: múltiplos de un mismo vector.
+++ Conclusión
Dentro de $\mathscr E_u$ hay a lo sumo una dirección física: la de $S\ket u$ para bosones y la de $A\ket u$ para fermiones. Ese es el **ket físico** del estado.
> El postulado no elige «al azar» un ket de la familia: la propia simetría lo fija.
:::

:::comentario
Puede pasar que **todos** los kets de $\mathscr E_u$ tengan proyección nula sobre $\mathscr E_A$ (o sobre $\mathscr E_S$). Entonces el postulado **prohíbe** ese estado físico. Con fermiones ocurre siempre que dos de ellos estén en el mismo estado individual (C-3-b y C-3-c).
:::

### El ejemplo de los dos espines ½, resuelto {#c-2-espines}

En la sección 1 vimos que el estado «una partícula con $S_z=+\hbar/2$ y la otra con $-\hbar/2$» admitía toda la familia $\ket\psi=\alpha\ket{+,-}+\beta\ket{-,+}$ (A-6), y que la probabilidad de medir $S_x=+\hbar/2$ en las dos, $|\alpha+\beta|^2/4$ (A-9), dependía del ket escogido. Veamos qué dice el postulado.

:::pasos De una familia infinita a un solo ket
+++ El subespacio degenerado
Aquí $\ket u=\ket{+,-}$ y $P_{21}\ket u=\ket{-,+}$, así que
$$\mathscr E_u=\operatorname{span}\big\{\ket{+,-},\,\ket{-,+}\big\}$$
y $\dim\mathscr E_u=2$.
> Es justo la familia (A-6).
+++ Proyectar un ket cualquiera de la familia
Con $S=\tfrac12(\uno+P_{21})$ y $A=\tfrac12(\uno-P_{21})$:
$$\begin{aligned}S\ket\psi&=\tfrac{\alpha+\beta}{2}\big(\ket{+,-}+\ket{-,+}\big)\\A\ket\psi&=\tfrac{\alpha-\beta}{2}\big(\ket{+,-}-\ket{-,+}\big)\end{aligned}$$
> Cambian $\alpha$ y $\beta$, pero la dirección no: sólo cambia el factor delante. Es (C-1) en acción.
+++ Los electrones son fermiones
Espín ½ ⇒ fermiones ⇒ hay que antisimetrizar. Normalizando:
$$\ket{\psi_{\text{físico}}}=\tfrac{1}{\sqrt2}\big(\ket{+,-}-\ket{-,+}\big)$$
> Mirando sólo el espín, éste es el único ket admitido. Equivale a $\alpha=-\beta=1/\sqrt2$.
+++ La predicción ya no es ambigua
En (A-9): $\mathcal P=|\alpha+\beta|^2/4=0$.
> Si las partículas fueran bosones (y sólo contara este grado de libertad), el ket sería el simétrico y daría $\mathcal P=\tfrac12$. La teoría ya hace **una** predicción para cada tipo de partícula.
:::

:::comentario
Si además de espín hay grados de libertad orbitales, lo que debe ser antisimétrico es el ket **total**, no cada parte por separado. Dos electrones pueden tener un espín simétrico (triplete) siempre que su parte orbital sea antisimétrica, y al revés. Esta combinación es la base del átomo de helio (sección 7).
:::

## C-3 · Cómo se construyen los kets físicos {#c-3}

### C-3-a · La regla {#c-3-a}

De C-2 sale una receta para obtener **el** ket físico de un estado de $N$ partículas idénticas:

1. **Numerar** las partículas como se quiera y escribir el ket $\ket u$ que corresponde al estado físico con esa numeración.
2. **Aplicar** $S$ si son bosones, o $A$ si son fermiones.
3. **Normalizar** el resultado.

La numeración del paso 1 es arbitraria, pero no importa: por (C-1), otra numeración da el mismo ket físico, salvo quizá el signo.

### C-3-b · Dos partículas idénticas {#c-3-b}

Una partícula está en el estado individual normalizado $\ket\varphi$ y la otra en $\ket\chi$. Supongamos primero que $\ket\varphi\neq\ket\chi$.

:::pasos Construir el ket físico de dos partículas
+++ Numerar
Llamamos 1 a la que está en $\ket\varphi$ y 2 a la que está en $\ket\chi$:
$$\ket u=\ket{1\!:\!\varphi;\,2\!:\!\chi}\tag{C-2}$$
> También podríamos haberlas numerado al revés; el resultado final sería el mismo.
+++ Simetrizar (bosones)
$$S\ket u=\tfrac12\Big[\ket{1\!:\!\varphi;\,2\!:\!\chi}+\ket{1\!:\!\chi;\,2\!:\!\varphi}\Big]\tag{C-3a}$$
> $S=\tfrac12(\uno+P_{21})$ suma el ket y su permutado.
+++ Antisimetrizar (fermiones)
$$A\ket u=\tfrac12\Big[\ket{1\!:\!\varphi;\,2\!:\!\chi}-\ket{1\!:\!\chi;\,2\!:\!\varphi}\Big]\tag{C-3b}$$
> $A=\tfrac12(\uno-P_{21})$ los resta.
+++ Normalizar (si $\varphi\perp\chi$)
Los dos kets de la derecha son ortonormales, así que $\|S\ket u\|^2=\|A\ket u\|^2=2\cdot\tfrac14=\tfrac12$. Basta cambiar $\tfrac12$ por $\tfrac1{\sqrt2}$:
$$\begin{aligned}\ket{\varphi;\chi}=\tfrac{1}{\sqrt2}\Big[&\ket{1\!:\!\varphi;\,2\!:\!\chi}\\+\,\varepsilon&\ket{1\!:\!\chi;\,2\!:\!\varphi}\Big]\end{aligned}\tag{C-4}$$
con $\varepsilon=+1$ para bosones y $\varepsilon=-1$ para fermiones.
> En $\ket{\varphi;\chi}$ ya no hay números de partícula: sólo dice qué estados están ocupados.
:::

Ahora el caso en que **los dos estados coinciden**:

$$\ket\varphi=\ket\chi\tag{C-5}$$

$$\ket u=\ket{1\!:\!\varphi;\,2\!:\!\varphi}\tag{C-6}$$

Este ket ya es simétrico ($P_{21}\ket u=\ket u$). Para **bosones**, (C-6) es directamente el ket físico: dos bosones pueden estar en el mismo estado individual. Para **fermiones**, en cambio,

$$A\ket u=\tfrac12\Big[\ket{1\!:\!\varphi;\,2\!:\!\varphi}-\ket{1\!:\!\varphi;\,2\!:\!\varphi}\Big]=0\tag{C-7}$$

No existe ningún ket de $\mathscr E_A$ que describa dos fermiones en el mismo estado: el postulado lo prohíbe. Es el **principio de exclusión de Pauli**: *dos fermiones idénticos no pueden ocupar el mismo estado individual*. Sus consecuencias (la tabla periódica, la estabilidad de la materia, los sólidos) son el tema de las secciones 4 a 8.

### C-3-c · $N$ partículas: el determinante de Slater {#c-3-c}

Empecemos con $N=3$. El estado físico queda definido por tres estados individuales normalizados, $\ket\varphi$, $\ket\chi$ y $\ket\omega$, y numeramos:

$$\ket u=\ket{1\!:\!\varphi;\,2\!:\!\chi;\,3\!:\!\omega}\tag{C-8}$$

**Bosones.** El simetrizador suma las $3!=6$ permutaciones con el mismo signo:

$$\begin{aligned}&S\ket u=\tfrac16\Big[\ket{1\!:\!\varphi;2\!:\!\chi;3\!:\!\omega}\\&\;+\ket{1\!:\!\omega;2\!:\!\varphi;3\!:\!\chi}+\ket{1\!:\!\chi;2\!:\!\omega;3\!:\!\varphi}\\&\;+\ket{1\!:\!\varphi;2\!:\!\omega;3\!:\!\chi}+\ket{1\!:\!\chi;2\!:\!\varphi;3\!:\!\omega}\\&\;+\ket{1\!:\!\omega;2\!:\!\chi;3\!:\!\varphi}\Big]\end{aligned}\tag{C-9}$$

Si los tres estados son ortogonales, los seis kets lo son, $\|S\ket u\|^2=6\cdot\tfrac1{36}=\tfrac16$, y para normalizar basta cambiar $\tfrac16$ por $\tfrac1{\sqrt6}$.

:::pasos Dos bosones en el mismo estado: $\varphi=\chi\perp\omega$
+++ Sólo quedan tres kets distintos
Con $\chi=\varphi$, los seis términos de (C-9) se juntan de dos en dos: $\ket{1\!:\!\varphi;2\!:\!\varphi;3\!:\!\omega}$, $\ket{1\!:\!\varphi;2\!:\!\omega;3\!:\!\varphi}$ y $\ket{1\!:\!\omega;2\!:\!\varphi;3\!:\!\varphi}$, cada uno dos veces.
> Intercambiar las dos partículas que están en $\varphi$ no produce un ket nuevo.
+++ Coeficientes y norma
Cada uno queda con coeficiente $\tfrac26=\tfrac13$, así que $\|S\ket u\|^2=3\cdot\tfrac19=\tfrac13$.
> No es $\tfrac16$: al repetir un estado, la norma crece.
+++ Ket normalizado
$$\begin{aligned}\ket{\varphi;\varphi;\omega}=\tfrac1{\sqrt3}\Big[&\ket{1\!:\!\varphi;2\!:\!\varphi;3\!:\!\omega}\\+&\ket{1\!:\!\varphi;2\!:\!\omega;3\!:\!\varphi}\\+&\ket{1\!:\!\omega;2\!:\!\varphi;3\!:\!\varphi}\Big]\end{aligned}\tag{C-10}$$
> El factor es $1/\sqrt3$, **no** $1/\sqrt6$.
+++ Los tres en el mismo estado
Si $\varphi=\chi=\omega$, el ket
$$\ket u=\ket{1\!:\!\varphi;\,2\!:\!\varphi;\,3\!:\!\varphi}\tag{C-11}$$
ya es simétrico y está normalizado.
> Para bosones no hay restricción: cualquier elección de estados individuales da un ket físico.
:::

**Fermiones.** El antisimetrizador pone a cada permutación el signo de su paridad:

$$A\ket u=\frac{1}{3!}\sum_\alpha\varepsilon_\alpha\,P_\alpha\ket{1\!:\!\varphi;\,2\!:\!\chi;\,3\!:\!\omega}\tag{C-12}$$

:::pasos De la suma con signos al determinante de Slater
+++ Recordar cómo se desarrolla un determinante
Para una matriz $3\times3$ con elementos $M_{ij}$,
$$\det M=\sum_\sigma \varepsilon_\sigma\,M_{1\sigma(1)}M_{2\sigma(2)}M_{3\sigma(3)}$$
> Es la fórmula de Leibniz: una suma sobre las $3!$ permutaciones, cada término con el signo de la paridad.
+++ Elegir los elementos
Tomamos $M_{ij}=\ket{i\!:\!\phi_j}$, con $(\phi_1,\phi_2,\phi_3)=(\varphi,\chi,\omega)$: la **fila** es la partícula y la **columna** es el estado. El «producto» de una fila por otra se entiende como producto tensorial.
> Cada término $\ket{1\!:\!\phi_{\sigma(1)}}\ket{2\!:\!\phi_{\sigma(2)}}\ket{3\!:\!\phi_{\sigma(3)}}$ es uno de los kets permutados de (C-12), con su signo.
+++ El determinante de Slater
$$A\ket u=\frac1{3!}\begin{vmatrix}\ket{1\!:\!\varphi}&\ket{1\!:\!\chi}&\ket{1\!:\!\omega}\\\ket{2\!:\!\varphi}&\ket{2\!:\!\chi}&\ket{2\!:\!\omega}\\\ket{3\!:\!\varphi}&\ket{3\!:\!\chi}&\ket{3\!:\!\omega}\end{vmatrix}\tag{C-13}$$
> Es sólo una manera compacta de escribir (C-12); los signos salen solos.
+++ Pauli, otra vez
Si dos de los estados coinciden, el determinante tiene **dos columnas iguales** y vale cero: $A\ket u=0$.
> Ningún ket físico describe dos fermiones idénticos en el mismo estado individual.
+++ Normalizar
Si $\varphi$, $\chi$ y $\omega$ son ortogonales, los seis kets de (C-12) también lo son y $\|A\ket u\|^2=6\cdot\tfrac1{36}=\tfrac16$. Basta cambiar $\tfrac1{3!}$ por $\tfrac1{\sqrt{3!}}$.
> Intercambiar dos columnas sólo cambia el signo global, que no tiene significado físico.
:::

**Con $N$ partículas** todo sigue igual. Para bosones siempre se puede construir $S\ket u$, sean cuales sean los estados individuales. Para fermiones el ket físico es un determinante de Slater $N\times N$: con estados ortonormales $\phi_1,\dots,\phi_N$, el ket normalizado es $\ket{\phi_1;\dots;\phi_N}=\frac{1}{\sqrt{N!}}\,D$, con

$$D=\begin{vmatrix}\ket{1\!:\!\phi_1}&\cdots&\ket{1\!:\!\phi_N}\\\vdots&\ddots&\vdots\\\ket{N\!:\!\phi_1}&\cdots&\ket{N\!:\!\phi_N}\end{vmatrix}$$

y se anula en cuanto se repite un estado. Esta diferencia entre bosones y fermiones es la que la sección 4 convierte en física: estados fundamentales, estadísticas y tabla periódica.

```sim
id: slater
pie: Elige N y el orbital de cada partícula. Arriba, el diagrama de niveles con las partículas numeradas (paso 1 de la regla). En el centro, el determinante de Slater (C-13), con fila = partícula y columna = orbital. Abajo, los coeficientes del ket físico normalizado de bosones y de fermiones en cada ket de la base; los dígitos bajo cada barra dicen qué orbital tiene cada partícula. Repite un orbital y verás que dos columnas se vuelven iguales y $A\ket u=0$, mientras que $S\ket u$ sigue existiendo con menos kets y coeficientes mayores, como en (C-10). Si desordenas los orbitales, el ket de fermiones sólo cambia de signo.
```

### C-3-d · Una base del espacio físico: números de ocupación {#c-3-d}

Sea $\{\ket{u_i}\}$ una base ortonormal del espacio de **una** partícula. Los kets $\ket{1\!:\!u_i;\,2\!:\!u_j;\,\dots;\,N\!:\!u_p}$ forman una base de $\mathscr E$, pero el espacio físico es sólo $\mathscr E_S$ o $\mathscr E_A$. ¿Cómo se consigue una base de él?

:::pasos Los kets simetrizados generan $\mathscr E_S$, pero sobran
+++ Desarrollar un ket físico
Un ket $\ket\varphi\in\mathscr E_S$ también está en $\mathscr E$, así que
$$\begin{aligned}\ket\varphi=\sum_{i,j,\dots,p}&a_{ij\dots p}\\\times&\ket{1\!:\!u_i;\,2\!:\!u_j;\,\dots;\,N\!:\!u_p}\end{aligned}\tag{C-14}$$
+++ Aplicar $S$ a los dos lados
Como $\ket\varphi\in\mathscr E_S$, $S\ket\varphi=\ket\varphi$:
$$\begin{aligned}\ket\varphi=\sum_{i,j,\dots,p}&a_{ij\dots p}\,S\\\times&\ket{1\!:\!u_i;\,2\!:\!u_j;\,\dots;\,N\!:\!u_p}\end{aligned}$$
> Los kets $S\ket{1\!:\!u_i;\dots}$ **generan** $\mathscr E_S$. Con $A$ se razona igual para $\mathscr E_A$.
+++ Pero no son independientes
Dos kets de la base que difieren sólo en el orden de los estados se obtienen uno del otro con una permutación. Por (B-62) y (B-63), al simetrizarlos dan el mismo ket (al antisimetrizarlos, el mismo salvo el signo).
> Lo único que sobrevive a la simetrización es **cuántas** partículas hay en cada estado, no **cuáles**.
:::

Eso lleva al **número de ocupación**: en el ket $\ket{1\!:\!u_i;\,2\!:\!u_j;\,\dots;\,N\!:\!u_p}$, $n_k$ es el número de veces que aparece $\ket{u_k}$ en la lista $u_i,u_j,\dots,u_p$, es decir, cuántas partículas están en ese estado; obviamente $\sum_k n_k=N$. Todos los kets con los mismos números de ocupación dan el mismo ket físico, que se denota con los $n_k$:

$$\begin{aligned}&\ket{n_1,n_2,\dots}=c\,S\,\big|\\&\quad\underbrace{1\!:\!u_1;\,\dots;\,n_1\!:\!u_1}_{n_1\text{ en }u_1};\\&\quad\underbrace{n_1{+}1\!:\!u_2;\,\dots;\,n_1{+}n_2\!:\!u_2}_{n_2\text{ en }u_2};\,\dots\big\rangle\end{aligned}\tag{C-15}$$

Para fermiones se cambia $S$ por $A$. La constante $c$ normaliza el ket.

:::pasos Cuánto vale $c$
+++ Bosones: contar kets repetidos
$S$ produce $N!$ términos, cada uno con coeficiente $\tfrac1{N!}$. Las permutaciones que sólo mezclan partículas dentro de un mismo estado no cambian el ket: hay $n_1!\,n_2!\cdots$ de ellas. Quedan $\dfrac{N!}{n_1!\,n_2!\cdots}$ kets distintos, ortonormales, cada uno con coeficiente $\dfrac{n_1!\,n_2!\cdots}{N!}$.
> Por ejemplo, en (C-10): $3!/2!=3$ kets con coeficiente $2/6$.
+++ Bosones: la norma
$$\begin{aligned}\big\|S\ket u\big\|^2&=\frac{N!}{n_1!\,n_2!\cdots}\Big(\frac{n_1!\,n_2!\cdots}{N!}\Big)^2\\&=\frac{n_1!\,n_2!\cdots}{N!}\end{aligned}$$
$$\Rightarrow\quad c=\sqrt{\frac{N!}{n_1!\,n_2!\cdots}}$$
+++ Fermiones
Si algún $n_k>1$, $A\ket u=0$. Si todos valen 0 o 1, los $N!$ kets son distintos y $\|A\ket u\|^2=N!\cdot\big(\tfrac1{N!}\big)^2=\tfrac1{N!}$, así que $c=\sqrt{N!}$.
> La simulación muestra estas normas y el valor de $c$ para cualquier elección de orbitales.
:::

Los kets $\ket{n_1,n_2,\dots}$ cumplen tres propiedades:

1. **Ortogonalidad.** El producto escalar de $\ket{n_1,n_2,\dots}$ y $\ket{n_1',n_2',\dots}$ es cero salvo que $n_k=n_k'$ para todo $k$. Si los números de ocupación difieren, los dos kets se desarrollan sobre kets de la base de $\mathscr E$ completamente distintos.
2. **Bosones.** Los $\ket{n_1,n_2,\dots}$ con $n_k$ **cualesquiera** (y $\sum n_k=N$) forman una **base ortonormal** de $\mathscr E_S$. Nunca son nulos, porque $S$ los desarrolla con coeficientes todos positivos sobre kets ortogonales; además generan $\mathscr E_S$ y son ortogonales entre sí.
3. **Fermiones.** Una base de $\mathscr E_A$ la forman los $\ket{n_1,n_2,\dots}$ con todos los $n_k$ iguales a **0 o 1**. Si algún $n_k>1$ el ket es nulo (Pauli); si no, los $N!$ kets permutados son distintos y ortogonales, y el ket no puede anularse.

:::comentario
De (2) y (3) se cuentan las dimensiones. Con $M$ estados individuales, $\dim\mathscr E_S$ es el número de maneras de repartir $N$ partículas en $M$ estados sin límite, y $\dim\mathscr E_A$, el de escoger $N$ estados distintos:
$$\begin{gathered}\dim\mathscr E_S=\binom{M+N-1}{N}\\\dim\mathscr E_A=\binom{M}{N}\end{gathered}$$
Para $N=2$ suman $\tfrac{M(M+1)}2+\tfrac{M(M-1)}2=M^2=\dim\mathscr E$. Para $N=3$ y $M=2$ dan $4+0<8$: faltan los kets de simetría mixta, que es lo mismo que $S+A\neq\uno$ (B-64) en la sección 2.
:::

## C-4 · Los demás postulados siguen funcionando {#c-4}

Falta comprobar que el postulado nuevo no choca con los del capítulo III: que la **medida** se puede describir sólo con kets de $\mathscr E_S$ (o $\mathscr E_A$) y que la **evolución** no saca al sistema de ese subespacio. Si es así, todo el formalismo se puede usar dentro del subespacio físico.

### C-4-a · Postulados de la medida {#c-4-a}

**Probabilidad de encontrar un estado físico.** Antes de la medida, el sistema está en $\ket{\psi(t)}$, que por el postulado pertenece a $\mathscr E_S$ o a $\mathscr E_A$. El estado físico después de la medida se describe con un ket $\ket u$ construido con la regla de C-3-a, que también está en el subespacio físico. La amplitud es $\braket{u}{\psi(t)}$: un producto escalar entre dos vectores del mismo subespacio. La sección 5 hace varios de estos cálculos.

- Si la medida es **completa** (por ejemplo, las posiciones y las $S_z$ de todas las partículas), el ket físico $\ket u$ es único, salvo un factor.
- Si es **incompleta** (sólo los espines, o una propiedad de una sola partícula), corresponden varios kets físicos ortogonales y hay que **sumar** sus probabilidades.

**Observables físicos.** A veces la medida se expresa con un observable escrito en función de $\mathbf R_1,\mathbf P_1,\mathbf S_1,\mathbf R_2,\dots$ Para tres partículas idénticas, por ejemplo:

$$\mathbf R_G=\tfrac13\big(\mathbf R_1+\mathbf R_2+\mathbf R_3\big)\tag{C-16}$$

$$\mathbf P=\mathbf P_1+\mathbf P_2+\mathbf P_3\tag{C-17}$$

$$\mathbf L=\mathbf L_1+\mathbf L_2+\mathbf L_3\tag{C-18}$$

$$\begin{aligned}W=\frac{q^2}{4\pi\varepsilon_0}\bigg(&\frac1{|\mathbf R_1-\mathbf R_2|}+\frac1{|\mathbf R_2-\mathbf R_3|}\\&+\frac1{|\mathbf R_3-\mathbf R_1|}\bigg)\end{aligned}\tag{C-19}$$

$$\mathbf S=\mathbf S_1+\mathbf S_2+\mathbf S_3\tag{C-20}$$

Todos tratan a las partículas **por igual**, y no por casualidad: en (C-16) las tres posiciones pesan lo mismo porque las masas son iguales, y (C-19) es simétrico porque las cargas lo son. Como permutar partículas idénticas no cambia ninguna propiedad física, todo observable que se pueda medir de verdad debe ser invariante bajo permutaciones. Lo llamaremos **observable físico** $G$, y cumple (sección 2, B-65)

$$\big[G,\,P_\alpha\big]=0\quad\text{para toda }P_\alpha\tag{C-21}$$

Esto vale igual para bosones y para fermiones. Un contraejemplo: con dos partículas idénticas, $\mathbf R_1-\mathbf R_2$ **no** es un observable físico, porque $P_{21}$ le cambia el signo; medirlo exigiría saber cuál es la partícula 1. La distancia $\sqrt{(\mathbf R_1-\mathbf R_2)^2}$, en cambio, es simétrica y sí se puede medir.

:::pasos Un observable físico no saca al ket de $\mathscr E_A$
+++ Lo que significa estar en $\mathscr E_A$
$$P_\alpha\ket\psi=\varepsilon_\alpha\ket\psi\quad\text{para toda }P_\alpha\tag{C-22}$$
+++ Aplicar $P_\alpha$ a $G\ket\psi$
Usando primero (C-21) y luego (C-22):
$$P_\alpha G\ket\psi=G\,P_\alpha\ket\psi=\varepsilon_\alpha\,G\ket\psi\tag{C-23}$$
> $G$ y $P_\alpha$ conmutan, así que $P_\alpha$ «atraviesa» a $G$.
+++ Conclusión
Como $P_\alpha$ es cualquiera, $G\ket\psi$ es totalmente antisimétrico: $G\ket\psi\in\mathscr E_A$. La misma demostración, con $\varepsilon_\alpha=1$, vale para $\mathscr E_S$.
> $\mathscr E_S$ y $\mathscr E_A$ son **invariantes** bajo todo observable físico.
+++ Consecuencia práctica
Todo lo que se hace con un observable (buscar sus valores y vectores propios) se puede hacer **dentro** de $\mathscr E_S$ o $\mathscr E_A$. Sólo se conservan los vectores propios que están en el subespacio físico, con sus valores propios.
:::

:::comentario
**(i)** Restringirse a $\mathscr E_S$ o $\mathscr E_A$ puede **eliminar** valores propios de $G$, pero nunca agrega uno nuevo: un vector propio de $G$ dentro del subespacio también lo es en $\mathscr E$, con el mismo valor propio. Es lo que pasa, por ejemplo, con las configuraciones prohibidas por Pauli.

**(ii)** Escribir con $\mathbf R_i$, $\mathbf P_i$… el observable de una medida concreta no siempre es fácil. Para «medir las posiciones de tres partículas idénticas» no sirven $X_1$, $X_2$ y $X_3$ por separado, que no son físicos. Sí sirven las combinaciones simétricas
$$\begin{gathered}X_1+X_2+X_3\\X_1X_2+X_2X_3+X_3X_1\\X_1X_2X_3\end{gathered}$$
(y lo mismo con $Y$ y $Z$): son los coeficientes de un polinomio cuyas raíces son las tres posiciones, que así quedan determinadas sin decir cuál es de quién. En la práctica es más cómodo trabajar con los kets propios físicos de la medida, como en el apartado anterior.
:::

### C-4-b · Postulado de la evolución {#c-4-b}

El hamiltoniano de un sistema de partículas idénticas también es un observable físico. Por ejemplo, el de los dos electrones del helio con el núcleo fijo (con $e^2=q^2/4\pi\varepsilon_0$):

$$\begin{aligned}H(1,2)=\;&\frac{\mathbf P_1^2}{2m_e}+\frac{\mathbf P_2^2}{2m_e}-\frac{2e^2}{R_1}-\frac{2e^2}{R_2}\\&+\frac{e^2}{|\mathbf R_1-\mathbf R_2|}\end{aligned}\tag{C-24}$$

Las energías cinéticas son simétricas porque las masas son iguales; la atracción del núcleo (carga $2q$) afecta por igual a los dos electrones, y la repulsión mutua no privilegia a ninguno. El argumento vale para cualquier sistema de partículas idénticas, así que

$$\big[H,\,P_\alpha\big]=0\tag{C-25}$$

:::pasos La ecuación de Schrödinger conserva la simetría
+++ Un paso de tiempo
Por la ecuación de Schrödinger, en un intervalo $\mathrm dt$:
$$\ket{\psi(t+\mathrm dt)}=\Big(\uno+\frac{\mathrm dt}{i\hbar}H\Big)\ket{\psi(t)}\tag{C-26}$$
> Es $i\hbar\,\mathrm d\ket\psi/\mathrm dt=H\ket\psi$ escrita a primer orden.
+++ Aplicar $P_\alpha$
Como $P_\alpha$ conmuta con $H$ (C-25), conmuta con todo el paréntesis:
$$\begin{aligned}&P_\alpha\ket{\psi(t+\mathrm dt)}\\&\quad=\Big(\uno+\frac{\mathrm dt}{i\hbar}H\Big)P_\alpha\ket{\psi(t)}\end{aligned}\tag{C-27}$$
+++ Si $\ket{\psi(t)}$ es propio de $P_\alpha$, sigue siéndolo
Si $P_\alpha\ket{\psi(t)}=\lambda\ket{\psi(t)}$, (C-27) da $P_\alpha\ket{\psi(t+\mathrm dt)}=\lambda\ket{\psi(t+\mathrm dt)}$, con el **mismo** $\lambda$.
> Un ket totalmente simétrico ($\lambda=1$) o antisimétrico ($\lambda=\varepsilon_\alpha$) lo sigue siendo un instante después.
+++ Para todo tiempo
Encadenando pasos desde $t_0$: si $\ket{\psi(t_0)}$ es físico, $\ket{\psi(t)}$ también lo es para todo $t$.
> La ecuación de Schrödinger nunca saca al ket de $\mathscr E_S$ o de $\mathscr E_A$. No hay contradicción con el postulado: un bosón no puede «convertirse» en fermión.
:::

:::resultado
- **Postulado:** con partículas idénticas, los kets físicos son totalmente simétricos (**bosones**, $\mathscr E_S$) o totalmente antisimétricos (**fermiones**, $\mathscr E_A$). Regla empírica: espín entero ⇒ bosón; semientero ⇒ fermión. Una compuesta con un número impar de fermiones es fermión.
- **Fin de la degeneración:** $S\ket u=SP_\alpha\ket u$ y $A\ket u=\varepsilon_\alpha AP_\alpha\ket u$; cada estado físico tiene un único ket físico, $S\ket u$ o $A\ket u$ (o ninguno, si se anula).
- **Regla:** numerar, aplicar $S$ o $A$, normalizar. Dos partículas en estados ortogonales: $\tfrac1{\sqrt2}\big[\ket{1\!:\!\varphi;2\!:\!\chi}+\varepsilon\ket{1\!:\!\chi;2\!:\!\varphi}\big]$.
- **Fermiones:** el ket físico es un determinante de Slater, que se anula si dos estados coinciden (**Pauli**).
- **Base física:** kets de números de ocupación $\ket{n_1,n_2,\dots}$; $n_k$ cualquiera para bosones, $n_k\in\{0,1\}$ para fermiones; $c=\sqrt{N!/\prod n_k!}$ o $\sqrt{N!}$.
- **Medida y evolución:** los observables físicos y el hamiltoniano conmutan con todas las $P_\alpha$, dejan invariantes $\mathscr E_S$ y $\mathscr E_A$, y la simetría se conserva en el tiempo.
:::

:::idea-fisica
El postulado no es un detalle de notación: **cambia el número de estados** del sistema. Dos fermiones no caben en el mismo estado, y dos bosones «cuentan» una sola vez cuando están en el mismo estado, en lugar de dos veces como dos partículas distinguibles. Ese conteo distinto es lo que separa las estadísticas de Fermi-Dirac, Bose-Einstein y Maxwell-Boltzmann, y lo que llena las capas de los átomos, sostiene a las estrellas enanas blancas y hace superfluido al $^4$He. Además, como el hamiltoniano es simétrico, la naturaleza bosónica o fermiónica de un sistema no cambia nunca: es una propiedad de las partículas, no del estado en que estén.
:::

## Esqueleto {#esqueleto}

:::esqueleto
1. **Postulado:** kets físicos totalmente simétricos (bosones) o antisimétricos (fermiones); el espacio de estados es $\mathscr E_S$ o $\mathscr E_A$, no $\mathscr E$.
2. **Espín-estadística:** espín entero ⇒ bosón, semientero ⇒ fermión; compuestas: número de fermiones constituyentes par ⇒ bosón, impar ⇒ fermión ($^3$He fermión, $^4$He bosón).
3. **Degeneración resuelta:** $S\ket u=SP_\alpha\ket u$, $A\ket u=\varepsilon_\alpha AP_\alpha\ket u$ (C-1) ⇒ proyecciones colineales ⇒ un solo ket físico. Dos espines ½: $\tfrac1{\sqrt2}(\ket{+,-}-\ket{-,+})$, $\mathcal P=0$.
4. **Regla:** numerar → $S$ o $A$ → normalizar.
5. **Dos partículas:** $\tfrac1{\sqrt2}\big[\ket{1\!:\!\varphi;2\!:\!\chi}+\varepsilon\ket{1\!:\!\chi;2\!:\!\varphi}\big]$ (C-4); $\varphi=\chi$ ⇒ $A\ket u=0$ (Pauli, C-7).
6. **$N$ partículas:** bosones con estados repetidos cambian la normalización ($1/\sqrt3$ en C-10); fermiones = determinante de Slater (C-13), cero con dos columnas iguales.
7. **Números de ocupación:** $\ket{n_1,n_2,\dots}=c\,S\ket{\dots}$; $c=\sqrt{N!/\prod n_k!}$ (bosones) o $\sqrt{N!}$ (fermiones); bases: $n_k$ libres o $n_k\in\{0,1\}$.
8. **Otros postulados:** $[G,P_\alpha]=0$ ⇒ $\mathscr E_S$, $\mathscr E_A$ invariantes (C-21 a C-23); $[H,P_\alpha]=0$ ⇒ la simetría se conserva (C-25 a C-27).
:::

## Preguntas {#preguntas}

:::pregunta El deuterón está formado por un protón y un neutrón. ¿Es un bosón o un fermión?
Tiene dos fermiones (espín ½ cada uno), un número par: es un **bosón**. Concuerda con su espín, que es entero (vale 1). Un gas de deuterones obedece la estadística de Bose-Einstein, aunque cada uno esté hecho de fermiones.
:::

:::pregunta Dos fermiones están en estados normalizados $\varphi$ y $\chi$ que **no** son ortogonales. ¿Cuánto vale $\|A\ket u\|^2$?
Con (C-3b), $\|A\ket u\|^2=\tfrac14\big(1+1-2\,\mathrm{Re}\braket{1\!:\!\varphi;2\!:\!\chi}{1\!:\!\chi;2\!:\!\varphi}\big)=\tfrac12\big(1-|\braket{\varphi}{\chi}|^2\big)$. Se anula cuando $\chi$ coincide con $\varphi$ (salvo una fase), que es el caso de Pauli. Para bosones da $\tfrac12\big(1+|\braket\varphi\chi|^2\big)$, que vale 1 cuando coinciden, como en (C-6).
:::

:::pregunta Tres bosones: dos en $u_1$ y uno en $u_2$. ¿Cuántos kets de la base aparecen en el ket físico y con qué coeficiente? ¿Y si fueran fermiones?
Aparecen $3!/(2!\,1!)=3$ kets, cada uno con coeficiente $1/\sqrt3$, como en (C-10). Si fueran fermiones, el determinante de Slater tendría dos columnas iguales y el estado no existiría. Compruébalo en la simulación con $N=3$ y orbitales $u_1,u_1,u_2$.
:::

:::pregunta ¿Por qué $\mathbf R_1-\mathbf R_2$ no es un observable físico para dos partículas idénticas, pero $|\mathbf R_1-\mathbf R_2|$ sí?
Porque $P_{21}(\mathbf R_1-\mathbf R_2)P_{21}^\dagger=\mathbf R_2-\mathbf R_1$: cambia de signo y no conmuta con $P_{21}$. Medirlo exigiría saber cuál de las dos es la partícula 1, cosa imposible. La distancia $\sqrt{(\mathbf R_1-\mathbf R_2)^2}$ es invariante y cumple (C-21).
:::

:::pregunta Dos fermiones idénticos evolucionan con un hamiltoniano que incluye su interacción mutua. ¿Puede el ket volverse simétrico con el tiempo?
No. Toda interacción entre partículas idénticas es simétrica, así que $[H,P_\alpha]=0$ (C-25), y por (C-27) el valor propio de cada $P_\alpha$ se conserva paso a paso. Un ket antisimétrico sigue antisimétrico para todo $t$.
:::

## Errores comunes {#errores-comunes}

:::error-comun Creer que $S\ket u$ o $A\ket u$ ya están normalizados
$S$ y $A$ son proyectores: acortan el vector. Con dos estados ortogonales, $\|S\ket u\|^2=\|A\ket u\|^2=\tfrac12$; por eso en (C-4) aparece $1/\sqrt2$ y no $1/2$. Siempre falta el paso 3 de la regla.
:::

:::error-comun Normalizar con $1/\sqrt{N!}$ cuando hay bosones repetidos
El factor $1/\sqrt{N!}$ sólo vale si todos los estados son distintos. Con dos bosones en $\varphi$ y uno en $\omega$ el factor es $1/\sqrt3$ (C-10), no $1/\sqrt6$. En general es $\sqrt{\prod n_k!/N!}$.
:::

:::error-comun Exigir que el espín y la parte orbital sean antisimétricos por separado
El postulado se aplica al ket **total**. Dos electrones pueden tener la parte orbital simétrica si la de espín es antisimétrica (singlete), o al revés (triplete). Sólo el producto debe ser antisimétrico.
:::

:::error-comun Pensar que el orden de las columnas del determinante cambia el estado
Intercambiar dos columnas (o renumerar las partículas) sólo cambia el signo global del determinante (B-63). Una fase global no tiene significado físico: es el mismo estado.
:::

:::error-comun Leer el determinante de Slater como un número
Sus elementos son kets de una partícula y los «productos» son productos tensoriales. Es una abreviatura de la suma (C-12) con sus signos, no un número que se pueda calcular aparte.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Cap. XIV, §C, pp. 1434–1443: ecuaciones (C-1) a (C-27) y notas 5 a 8.
- Lectura complementaria: J. J. Sakurai y J. Napolitano, *Modern Quantum Mechanics*, 3.ª ed., Cambridge University Press, 2020, §7.2 (symmetrization postulate).
