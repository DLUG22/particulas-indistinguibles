---
titulo: Operadores de permutación
numero: 2
cohen: Cohen §B · pp. 1425–1434
resumen: Antes de enunciar el postulado nuevo hace falta una herramienta: los operadores que intercambian partículas. Con dos partículas sólo hay uno, P₂₁, y sus kets propios son simétricos o antisimétricos. Con tres o más aparecen un grupo que no conmuta, la paridad y los proyectores S y A.
---

:::idea-central
Un operador de permutación cambia los papeles de las partículas dentro de un ket. Con dos partículas, $P_{21}$ es a la vez hermítico y unitario, y su cuadrado es la identidad; por eso sus únicos valores propios son $\pm1$ y todo ket se parte en una parte **simétrica** y otra **antisimétrica**. Con $N$ partículas hay $N!$ permutaciones que forman un grupo no conmutativo, pero siguen existiendo kets **totalmente simétricos** y **totalmente antisimétricos**, y dos proyectores, $S$ y $A$, que los fabrican.
:::

:::nota
En toda esta sección las partículas **no** son idénticas todavía: basta con que tengan el mismo espín, para que sus espacios de estados sean isomorfos. Así los números (1), (2), (3) sí indican de qué partícula se trata, por ejemplo (1) = protón y (2) = electrón, y no hay ambigüedad. El postulado que se aplica a las idénticas llega en la sección 3.
:::

## B-1 · Dos partículas {#b-1}

### B-1-a · Definición de $P_{21}$ {#b-1-a}

Tomemos una base $\{\ket{u_i}\}$ del espacio $\mathscr E(1)$ de la partícula (1). Como las dos tienen el mismo espín, $\mathscr E(2)$ es isomorfo a $\mathscr E(1)$ y puede usar la misma base. El producto tensorial da una base del sistema:

$$\Big\{\ket{1\!:\!u_i;\,2\!:\!u_j}\Big\}\tag{B-1}$$

El orden en que se escriben los factores de un producto tensorial no importa, pero **sí importa qué partícula está en qué estado**:

$$\ket{2\!:\!u_j;\,1\!:\!u_i}\equiv\ket{1\!:\!u_i;\,2\!:\!u_j}\tag{B-2}$$

$$\ket{1\!:\!u_j;\,2\!:\!u_i}\neq\ket{1\!:\!u_i;\,2\!:\!u_j}\quad\text{si } i\neq j\tag{B-3}$$

El **operador de permutación** $P_{21}$ es el operador lineal que, sobre la base, intercambia los estados de las dos partículas:

$$P_{21}\ket{1\!:\!u_i;\,2\!:\!u_j}=\ket{2\!:\!u_i;\,1\!:\!u_j}=\ket{1\!:\!u_j;\,2\!:\!u_i}\tag{B-4}$$

Sobre un ket cualquiera actúa por linealidad, desarrollándolo en la base (B-1). El resultado no depende de la base elegida.

:::comentario
En la representación de posición y espín, $P_{21}$ intercambia los argumentos de la función de onda. Si $\psi_{\varepsilon,\varepsilon'}(\mathbf r,\mathbf r')=\braket{1\!:\!\mathbf r,\varepsilon;\,2\!:\!\mathbf r',\varepsilon'}{\psi}$ representa $\ket\psi$, entonces $\ket{\psi'}=P_{21}\ket\psi$ se representa por
$$\psi'_{\varepsilon,\varepsilon'}(\mathbf r,\mathbf r')=\psi_{\varepsilon',\varepsilon}(\mathbf r',\mathbf r)\tag{B-12}$$
Basta con renombrar las variables mudas de integración en el desarrollo de $\ket\psi$, ecs. (B-5) a (B-11).
:::

### B-1-b · Propiedades de $P_{21}$ {#b-1-b}

:::pasos $P_{21}$ es su propio inverso, hermítico y unitario
+++ Su cuadrado es la identidad
Aplicando (B-4) dos veces a un ket de la base se vuelve al ket inicial, así que
$$(P_{21})^2=\uno\tag{B-13}$$
> Intercambiar dos veces es no hacer nada: $P_{21}$ es su propio inverso.
+++ Elementos de matriz de $P_{21}$
En la base (B-1),
$$\bra{1\!:\!u_{i'};\,2\!:\!u_{j'}}P_{21}\ket{1\!:\!u_i;\,2\!:\!u_j}=\delta_{i'j}\,\delta_{j'i}\tag{B-15}$$
> Sólo es distinto de cero cuando el ket de la izquierda es el de la derecha con los estados intercambiados.
+++ Elementos de matriz del adjunto
Por definición del adjunto,
$$\bra{1\!:\!u_{i'};\,2\!:\!u_{j'}}P_{21}^\dagger\ket{1\!:\!u_i;\,2\!:\!u_j}=\Big(\bra{1\!:\!u_i;\,2\!:\!u_j}P_{21}\ket{1\!:\!u_{i'};\,2\!:\!u_{j'}}\Big)^{*}=\delta_{ij'}\,\delta_{ji'}\tag{B-16}$$
> Los deltas son reales, así que el complejo conjugado no cambia nada.
+++ Hermítico
Los elementos de (B-15) y (B-16) coinciden uno a uno, por tanto
$$P_{21}^\dagger=P_{21}\tag{B-14}$$
+++ Unitario
Juntando (B-13) y (B-14):
$$P_{21}^\dagger P_{21}=P_{21}P_{21}^\dagger=\uno\tag{B-17}$$
> Ser hermítico y unitario a la vez sólo es posible si los valores propios son reales y de módulo 1.
:::

### B-1-c · Kets simétricos y antisimétricos; simetrizador y antisimetrizador {#b-1-c}

Por (B-14) los valores propios de $P_{21}$ son reales, y por (B-13) su cuadrado vale 1: sólo pueden ser $+1$ y $-1$. Los kets propios con $+1$ se llaman **simétricos** y los de $-1$, **antisimétricos**:

$$P_{21}\ket{\psi_S}=\ket{\psi_S},\qquad P_{21}\ket{\psi_A}=-\ket{\psi_A}\tag{B-18}$$

Con $P_{21}$ se construyen dos operadores:

$$S=\tfrac12\big(\uno+P_{21}\big)\tag{B-19a}$$

$$A=\tfrac12\big(\uno-P_{21}\big)\tag{B-19b}$$

:::pasos $S$ y $A$ son proyectores ortogonales y complementarios
+++ Son idempotentes
Con $(P_{21})^2=\uno$:
$$S^2=\tfrac14\big(\uno+2P_{21}+P_{21}^2\big)=\tfrac12\big(\uno+P_{21}\big)=S,\qquad A^2=A\tag{B-20}$$
> Un proyector aplicado dos veces da lo mismo que aplicado una vez.
+++ Son hermíticos
Como $P_{21}^\dagger=P_{21}$, también $S^\dagger=S$ y $A^\dagger=A$ (B-21).
> Idempotente y hermítico: es un proyector **ortogonal**.
+++ Proyectan sobre subespacios ortogonales
$$SA=AS=\tfrac14\big(\uno-P_{21}^2\big)=0\tag{B-22}$$
+++ Los subespacios son suplementarios
$$S+A=\uno\tag{B-23}$$
> Todo ket se escribe, de manera única, como $\ket\psi=S\ket\psi+A\ket\psi$: parte simétrica más parte antisimétrica.
+++ Qué fabrican
Para cualquier $\ket\psi$,
$$P_{21}\,S\ket\psi=S\ket\psi,\qquad P_{21}\,A\ket\psi=-A\ket\psi\tag{B-24}$$
> Por eso $S$ se llama **simetrizador** y $A$, **antisimetrizador**.
:::

:::comentario
Da lo mismo simetrizar $\ket\psi$ que simetrizar $P_{21}\ket\psi$: $S P_{21}\ket\psi=S\ket\psi$ (B-25). Al antisimetrizar sólo cambia el signo: $A P_{21}\ket\psi=-A\ket\psi$ (B-26).
:::

### B-1-d · Cómo se transforman los observables {#b-1-d}

Sea $B(1)$ un observable de la partícula (1), extendido al sistema, y tomemos la base (B-1) formada por sus vectores propios: $B(1)\ket{1\!:\!u_i;\,2\!:\!u_j}=b_i\ket{1\!:\!u_i;\,2\!:\!u_j}$.

:::pasos Conjugar $B(1)$ con $P_{21}$
+++ Primera permutación
$$P_{21}B(1)P_{21}^\dagger\ket{1\!:\!u_i;\,2\!:\!u_j}=P_{21}B(1)\ket{1\!:\!u_j;\,2\!:\!u_i}$$
> Usamos $P_{21}^\dagger=P_{21}$ y (B-4).
+++ Actúa el observable
$$=P_{21}\,b_j\ket{1\!:\!u_j;\,2\!:\!u_i}$$
> Ahora la partícula (1) está en $u_j$, así que el valor propio es $b_j$.
+++ Segunda permutación
$$=b_j\ket{1\!:\!u_i;\,2\!:\!u_j}\tag{B-27}$$
> Es exactamente lo que daría $B(2)$, que mide el estado de la partícula (2), es decir, $u_j$.
+++ Conclusión
$$P_{21}B(1)P_{21}^\dagger=B(2),\qquad P_{21}B(2)P_{21}^\dagger=B(1)\tag{B-28, B-29}$$
:::

Lo mismo vale para observables que mezclan las dos partículas, como $B(1)+C(2)$ o $B(1)\,C(2)$, intercalando $P_{21}^\dagger P_{21}=\uno$ (B-30, B-31). En general:

$$P_{21}\,\mathscr O(1,2)\,P_{21}^\dagger=\mathscr O(2,1)\tag{B-32}$$

donde $\mathscr O(2,1)$ es el observable con los índices 1 y 2 intercambiados en todas partes. Un observable es **simétrico** si $\mathscr O(2,1)=\mathscr O(1,2)$ (B-33), y entonces

$$\big[\mathscr O(1,2),\,P_{21}\big]=0\tag{B-35}$$

**Los observables simétricos conmutan con el operador de permutación.** Por ejemplo, el hamiltoniano de dos partículas idénticas, $H=\frac{\mathbf P_1^2}{2m}+\frac{\mathbf P_2^2}{2m}+V(|\mathbf R_1-\mathbf R_2|)$, es simétrico.

## B-2 · Sistemas de $N$ partículas {#b-2}

Con $N$ partículas del mismo espín hay $N!$ operadores de permutación, uno de ellos la identidad. Para $N>2$ sus propiedades son más ricas que las de $P_{21}$; el Cohen las muestra con $N=3$.

### B-2-a · Definición {#b-2-a}

La base del sistema es $\{\ket{1\!:\!u_i;\,2\!:\!u_j;\,3\!:\!u_k}\}$ (B-36) y hay seis operadores:

$$P_{123},\ P_{312},\ P_{231},\ P_{132},\ P_{213},\ P_{321}\tag{B-37}$$

$P_{npq}$, con $n,p,q$ una permutación de 1, 2, 3, se define por

$$P_{npq}\ket{1\!:\!u_i;\,2\!:\!u_j;\,3\!:\!u_k}=\ket{n\!:\!u_i;\,p\!:\!u_j;\,q\!:\!u_k}\tag{B-38}$$

Es decir, **la partícula $n$ queda en el estado que tenía la 1, la $p$ en el de la 2 y la $q$ en el de la 3**. Por ejemplo:

$$\begin{aligned}P_{231}\ket{1\!:\!u_i;\,2\!:\!u_j;\,3\!:\!u_k}&=\ket{2\!:\!u_i;\,3\!:\!u_j;\,1\!:\!u_k}\\&=\ket{1\!:\!u_k;\,2\!:\!u_i;\,3\!:\!u_j}\end{aligned}\tag{B-39}$$

$P_{123}$ es la identidad.

### B-2-b · Propiedades {#b-2-b}

**Forman un grupo.** $P_{123}$ es la identidad; el producto de dos permutaciones es otra permutación, y cada una tiene inversa, que también es una permutación.

:::pasos Comprobar que $P_{312}P_{132}=P_{321}$
+++ Aplicar primero $P_{132}$
$$P_{132}\ket{1\!:\!u_i;\,2\!:\!u_j;\,3\!:\!u_k}=\ket{1\!:\!u_i;\,3\!:\!u_j;\,2\!:\!u_k}=\ket{1\!:\!u_i;\,2\!:\!u_k;\,3\!:\!u_j}$$
> En un producto de operadores, el de la derecha actúa primero.
+++ Aplicar después $P_{312}$
$$P_{312}\ket{1\!:\!u_i;\,2\!:\!u_k;\,3\!:\!u_j}=\ket{3\!:\!u_i;\,1\!:\!u_k;\,2\!:\!u_j}=\ket{1\!:\!u_k;\,2\!:\!u_j;\,3\!:\!u_i}\tag{B-41}$$
> Reordenamos los factores para leer el estado de las partículas 1, 2 y 3 en orden.
+++ Compararlo con $P_{321}$
$$P_{321}\ket{1\!:\!u_i;\,2\!:\!u_j;\,3\!:\!u_k}=\ket{3\!:\!u_i;\,2\!:\!u_j;\,1\!:\!u_k}=\ket{1\!:\!u_k;\,2\!:\!u_j;\,3\!:\!u_i}\tag{B-42}$$
> Mismo resultado sobre cualquier ket de la base ⇒ $P_{312}P_{132}=P_{321}$ (B-40).
:::

Los inversos son

$$\begin{aligned}&P_{123}^{-1}=P_{123},\quad P_{312}^{-1}=P_{231},\quad P_{231}^{-1}=P_{312},\\&P_{132}^{-1}=P_{132},\quad P_{213}^{-1}=P_{213},\quad P_{321}^{-1}=P_{321}\end{aligned}\tag{B-43}$$

y, a diferencia de lo que pasa con dos partículas, **las permutaciones no conmutan entre sí**:

$$P_{132}P_{312}=P_{213}\neq P_{312}P_{132}=P_{321}\tag{B-44}$$

**Transposiciones y paridad.** Una *transposición* intercambia sólo dos partículas y deja quietas las demás: $P_{132}$, $P_{213}$ y $P_{321}$. Cada una es hermítica, su propia inversa y unitaria, con la misma demostración que para $P_{21}$. Toda permutación se descompone en un producto de transposiciones, aunque no de una sola manera:

$$P_{312}=P_{132}P_{213}=P_{321}P_{132}=P_{213}P_{321}=P_{132}P_{213}(P_{132})^2=\cdots\tag{B-45}$$

Lo que sí es único es la **paridad** del número de transposiciones: es la *paridad de la permutación*. $P_{123}$, $P_{312}$ y $P_{231}$ son pares; $P_{132}$, $P_{213}$ y $P_{321}$ son impares. Para todo $N$ hay tantas permutaciones pares como impares.

**Son unitarias, pero no necesariamente hermíticas.** Son productos de transposiciones unitarias, así que son unitarias; pero como las transposiciones no conmutan, el producto no tiene por qué ser hermítico (por ejemplo, $P_{312}^\dagger=P_{312}^{-1}=P_{231}\neq P_{312}$). El adjunto de una permutación tiene su misma paridad: es el producto de las mismas transposiciones en orden inverso.

```sim
id: permutaciones-s3
pie: Elige A y B y mira cómo cambian los estados de las tres partículas. En la tabla, la casilla con borde sólido es A·B y la de borde discontinuo, B·A; si no coinciden, no conmutan (prueba P₃₁₂ y P₁₃₂, ecs. B-40 y B-44). El color de cada casilla indica la paridad (verde par, rojo impar). Abajo, con tres estados distintos, ‖Sψ‖² + ‖Aψ‖² vale sólo 1/3: S y A no bastan para reconstruir el ket (B-64). Repite un estado y verás que Aψ = 0.
```

### B-2-c · Kets totalmente simétricos y antisimétricos; $S$ y $A$ {#b-2-c}

Como las permutaciones no conmutan para $N>2$, no existe una base de vectores propios comunes a todas. Aun así, **hay kets que son propios de todas a la vez**. Llamemos $P_\alpha$ a una permutación cualquiera de las $N$ partículas. Un ket es **totalmente simétrico** si

$$P_\alpha\ket{\psi_S}=\ket{\psi_S}\quad\text{para toda }P_\alpha\tag{B-46}$$

y **totalmente antisimétrico** si

$$P_\alpha\ket{\psi_A}=\varepsilon_\alpha\ket{\psi_A},\qquad \varepsilon_\alpha=\begin{cases}+1 & P_\alpha\text{ par}\\-1 & P_\alpha\text{ impar}\end{cases}\tag{B-47, B-48}$$

Basta con exigirlo a las transposiciones: cada una deja invariante un ket totalmente simétrico y le cambia el signo a uno totalmente antisimétrico. Esos kets forman dos subespacios, $\mathscr E_S$ y $\mathscr E_A$. Los proyectores sobre ellos son

$$S=\frac{1}{N!}\sum_\alpha P_\alpha\tag{B-49}$$

$$A=\frac{1}{N!}\sum_\alpha \varepsilon_\alpha P_\alpha\tag{B-50}$$

:::pasos Por qué $S$ y $A$ son proyectores sobre $\mathscr E_S$ y $\mathscr E_A$
+++ Son hermíticos
El adjunto de $P_\alpha$ es otra permutación, $P_\alpha^{-1}$, con la misma paridad. Tomar el adjunto de (B-49) o (B-50) sólo reordena los términos de la suma: $S^\dagger=S$, $A^\dagger=A$ (B-51, B-52).
+++ Una permutación fija no cambia la suma
Para una permutación fija $P_{\alpha_0}$, el producto $P_\beta=P_{\alpha_0}P_\alpha$ recorre **todo** el grupo, una sola vez, cuando $\alpha$ lo recorre (B-54, B-55). Además $\varepsilon_\beta=\varepsilon_{\alpha_0}\varepsilon_\alpha$. Por eso
$$P_{\alpha_0}S=SP_{\alpha_0}=S,\qquad P_{\alpha_0}A=AP_{\alpha_0}=\varepsilon_{\alpha_0}A\tag{B-53}$$
> Es el truco del «reordenamiento» de la teoría de grupos.
+++ Idempotentes
Usando (B-53) dentro de la suma:
$$S^2=\frac{1}{N!}\sum_\alpha P_\alpha S=\frac{1}{N!}\sum_\alpha S=S,\qquad A^2=\frac{1}{N!}\sum_\alpha\varepsilon_\alpha P_\alpha A=\frac{1}{N!}\sum_\alpha\varepsilon_\alpha^2A=A\tag{B-57, B-59}$$
> Cada suma tiene $N!$ términos iguales.
+++ Ortogonales entre sí
$$AS=\frac{1}{N!}\sum_\alpha\varepsilon_\alpha P_\alpha S=\Big(\frac{1}{N!}\sum_\alpha\varepsilon_\alpha\Big)S=0\tag{B-58, B-60}$$
> La mitad de los $\varepsilon_\alpha$ vale $+1$ y la otra mitad $-1$.
+++ Fabrican kets totalmente (anti)simétricos
Por (B-53), para cualquier $\ket\psi$:
$$P_{\alpha_0}S\ket\psi=S\ket\psi,\qquad P_{\alpha_0}A\ket\psi=\varepsilon_{\alpha_0}A\ket\psi\tag{B-61}$$
:::

:::comentario
**(i)** Simetrizar $P_\alpha\ket\psi$ da lo mismo que simetrizar $\ket\psi$: $SP_\alpha\ket\psi=S\ket\psi$ (B-62). Al antisimetrizar, a lo sumo cambia el signo: $AP_\alpha\ket\psi=\varepsilon_\alpha A\ket\psi$ (B-63).

**(ii)** Para $N>2$, $S$ y $A$ **no** son proyectores sobre subespacios suplementarios. Con $N=3$, usando que las tres primeras permutaciones de (B-37) son pares y las otras tres impares:
$$S+A=\tfrac13\big(P_{123}+P_{231}+P_{312}\big)\neq\uno\tag{B-64}$$
El espacio de estados **no** es la suma directa de $\mathscr E_S$ y $\mathscr E_A$: hay kets que no son ni simétricos ni antisimétricos, ni suma de uno y otro. La simulación lo muestra con números: para tres estados distintos, $\|S\psi\|^2+\|A\psi\|^2=\tfrac16+\tfrac16=\tfrac13$.
:::

### B-2-d · Observables y permutaciones {#b-2-d}

Como toda permutación es un producto de transposiciones, lo visto en B-1-d se generaliza. En particular, un observable $\mathscr O(1,2,\dots,N)$ **totalmente simétrico** frente al intercambio de índices conmuta con todas las transposiciones y, por tanto, con todas las permutaciones:

$$\big[\mathscr O(1,2,\dots,N),\,P_\alpha\big]=0\tag{B-65}$$

:::resultado
- $P_{21}$ intercambia los estados de las dos partículas. Cumple $P_{21}^2=\uno$, $P_{21}^\dagger=P_{21}$ y es unitario; sus valores propios son $\pm1$.
- $S=\tfrac12(\uno+P_{21})$ y $A=\tfrac12(\uno-P_{21})$ son proyectores ortogonales con $S+A=\uno$: con dos partículas, todo ket es simétrico más antisimétrico.
- $P_{21}\,\mathscr O(1,2)\,P_{21}^\dagger=\mathscr O(2,1)$; los observables simétricos conmutan con $P_{21}$.
- Con $N$ partículas hay $N!$ permutaciones: forman un grupo **no conmutativo**, son unitarias pero no siempre hermíticas, y cada una tiene una paridad bien definida.
- $S=\frac1{N!}\sum_\alpha P_\alpha$ y $A=\frac1{N!}\sum_\alpha\varepsilon_\alpha P_\alpha$ proyectan sobre los kets totalmente simétricos y totalmente antisimétricos; para $N>2$, $S+A\neq\uno$.
- Los observables totalmente simétricos conmutan con todas las permutaciones.
:::

:::idea-fisica
Si las partículas son idénticas, ningún observable físico puede distinguir la 1 de la 2: **todo observable físico es simétrico** y, por (B-65), conmuta con todas las permutaciones. Eso tiene una consecuencia fuerte: si el estado inicial es totalmente simétrico o totalmente antisimétrico, la evolución (generada por un hamiltoniano simétrico) lo mantiene así. Los subespacios $\mathscr E_S$ y $\mathscr E_A$ son «estables», y por eso es coherente postular que la naturaleza sólo usa uno de ellos. Ese es el postulado de simetrización de la sección 3.
:::

## Esqueleto {#esqueleto}

:::esqueleto
1. **Definición:** $P_{21}\ket{1\!:\!u_i;2\!:\!u_j}=\ket{1\!:\!u_j;2\!:\!u_i}$; en la función de onda intercambia $(\mathbf r,\varepsilon)\leftrightarrow(\mathbf r',\varepsilon')$.
2. **Propiedades:** $P_{21}^2=\uno$, $P_{21}^\dagger=P_{21}$, unitario ⇒ valores propios $\pm1$.
3. **Proyectores:** $S=\tfrac12(\uno+P_{21})$, $A=\tfrac12(\uno-P_{21})$; $S^2=S$, $A^2=A$, $SA=0$, $S+A=\uno$.
4. **Observables:** $P_{21}\mathscr O(1,2)P_{21}^\dagger=\mathscr O(2,1)$; simétrico ⇔ conmuta con $P_{21}$.
5. **$N$ partículas:** $N!$ permutaciones; $P_{npq}$ pone a la partícula $n$ en el estado de la 1, etc.
6. **Grupo:** cerrado, con identidad e inversos, **no conmutativo** ($P_{312}P_{132}=P_{321}$, $P_{132}P_{312}=P_{213}$).
7. **Paridad:** número de transposiciones par o impar; mitad y mitad; permutaciones unitarias, no siempre hermíticas.
8. **$S$ y $A$ generales:** $\frac1{N!}\sum P_\alpha$ y $\frac1{N!}\sum\varepsilon_\alpha P_\alpha$; $P_{\alpha_0}S=S$, $P_{\alpha_0}A=\varepsilon_{\alpha_0}A$; para $N>2$, $S+A\neq\uno$.
:::

## Preguntas {#preguntas}

:::pregunta ¿Por qué en esta sección se supone que las partículas no son idénticas?
Para que los números (1), (2), (3) tengan significado físico y los operadores estén bien definidos sin ambigüedad. Sólo hace falta que tengan el mismo espín, para poder usar la misma base en todos los espacios individuales. El postulado para partículas idénticas viene después.
:::

:::pregunta Si $\psi(\mathbf r,\mathbf r')=\varphi_a(\mathbf r)\varphi_b(\mathbf r')$ (sin espín), ¿qué funciones representan $S\ket\psi$ y $A\ket\psi$?
Por (B-12), $P_{21}$ intercambia los argumentos. Entonces $S\psi=\tfrac12\big[\varphi_a(\mathbf r)\varphi_b(\mathbf r')+\varphi_b(\mathbf r)\varphi_a(\mathbf r')\big]$ y $A\psi=\tfrac12\big[\varphi_a(\mathbf r)\varphi_b(\mathbf r')-\varphi_b(\mathbf r)\varphi_a(\mathbf r')\big]$. Si $a=b$, $A\psi=0$.
:::

:::pregunta ¿Es $P_{312}$ hermítico?
No. $P_{312}^\dagger=P_{312}^{-1}=P_{231}$ por (B-43), que es distinto de $P_{312}$. Es unitario, como todas las permutaciones, pero no hermítico. Las transposiciones, en cambio, sí lo son.
:::

:::pregunta ¿Cuántas permutaciones pares tiene un sistema de 4 partículas?
$4!/2=12$: siempre hay tantas pares como impares.
:::

:::pregunta Con tres partículas en tres estados distintos, ¿cuánto vale $\|S\psi\|^2$? ¿Y si dos estados coinciden?
Con estados distintos, $S\ket\psi$ es la suma de 6 kets ortonormales con coeficiente $1/6$: $\|S\psi\|^2=6/36=1/6$. Con $|u_a,u_a,u_b\rangle$ sólo hay 3 kets distintos, cada uno con coeficiente $2/6$: $\|S\psi\|^2=3\cdot(1/3)^2=1/3$, y $A\ket\psi=0$.
:::

## Errores comunes {#errores-comunes}

:::error-comun Leer $P_{npq}$ al revés
$P_{npq}$ **no** dice «la partícula 1 pasa al estado $n$». Dice que la partícula $n$ ocupa el estado que tenía la 1, la $p$ el de la 2 y la $q$ el de la 3. Con la lectura equivocada salen productos e inversos cambiados (por ejemplo, $P_{312}^{-1}$ daría $P_{312}$ en vez de $P_{231}$).
:::

:::error-comun Multiplicar en el orden equivocado
En $P_{312}P_{132}$ actúa primero $P_{132}$ (el de la derecha). Como las permutaciones no conmutan, invertir el orden da otro resultado: $P_{213}$ en vez de $P_{321}$.
:::

:::error-comun Creer que con tres o más partículas todo ket es simétrico más antisimétrico
Eso sólo vale para $N=2$. Para $N>2$, $S+A\neq\uno$ (B-64): hay estados de simetría «mixta».
:::

:::error-comun Pensar que toda permutación es hermítica
Sólo las transposiciones lo son. Una permutación cíclica como $P_{312}$ es unitaria pero no hermítica.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Cap. XIV, §B, pp. 1425–1434: ecuaciones (B-1) a (B-65).
- Lectura complementaria: J. J. Sakurai y J. Napolitano, *Modern Quantum Mechanics*, 3.ª ed., Cambridge University Press, 2020, §7.1 (permutation symmetry).
