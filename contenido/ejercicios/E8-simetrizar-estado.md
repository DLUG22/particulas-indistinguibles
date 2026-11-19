---
titulo: Basta con simetrizar el vector de estado
numero: 8
cohen: Cohen, complemento D del cap. XIV · pp. 1500–1502
resumen: Una demostración. Si el estado de N partículas idénticas ya está simetrizado (o antisimetrizado), las probabilidades de cualquier medida se pueden calcular como si las partículas fueran distinguibles y el aparato no las distinguiera, sin simetrizar los kets de la medida. Lo comprobamos numéricamente con tres partículas.
---

## Enunciado {#enunciado}

Queremos demostrar que, una vez que el vector de estado de $N$ bosones (o fermiones) idénticos está en $\mathscr E_S$ (o $\mathscr E_A$), **no hace falta** simetrizar los kets asociados a la medida para calcular probabilidades: basta tratar las partículas como distinguibles, estudiadas con aparatos que no saben distinguirlas. Sea $\ket\psi$ el estado de $N$ bosones (todo vale igual para fermiones):

$$S\ket\psi=\ket\psi$$

**I.**
- **a)** Sea $\ket\chi$ el ket físico normalizado asociado a una medida que encuentra los $N$ bosones en los estados individuales **distintos y ortonormales** $\ket{u_\alpha},\ket{u_\beta},\dots,\ket{u_\nu}$. Mostrar que $\ket\chi=\sqrt{N!}\,S\ket{1\!:\!u_\alpha;2\!:\!u_\beta;\dots;N\!:\!u_\nu}$.
- **b)** Mostrar que, por la simetría de $\ket\psi$, $|\braket{1\!:\!u_\alpha;2\!:\!u_\beta;\dots;N\!:\!u_\nu}{\psi}|^2=|\braket{i\!:\!u_\alpha;j\!:\!u_\beta;\dots;l\!:\!u_\nu}{\psi}|^2$ para cualquier permutación $i,j,\dots,l$ de $1,\dots,N$.
- **c)** Mostrar que
$$\begin{aligned}|\braket\chi\psi|^2&=N!\,|\braket{1\!:\!u_\alpha;\dots;N\!:\!u_\nu}{\psi}|^2\\&=\sum_{i,j,\dots,l}\\&\quad\big|\braket{i\!:\!u_\alpha;j\!:\!u_\beta;\dots;l\!:\!u_\nu}{\psi}\big|^2\end{aligned}$$
con la suma sobre todas las permutaciones.
- **d)** Si las partículas fueran distinguibles y estuvieran en $\ket\psi$, ¿cuál sería la probabilidad de hallar una en $\ket{u_\alpha}$, otra en $\ket{u_\beta}$, …, y la última en $\ket{u_\nu}$? Concluir.
- **e)** ¿Qué cambia si algunos de los estados individuales de $\ket\chi$ son iguales? (Basta $N=3$.)

**II.** *(más difícil)* Caso general: una medida que puede ser **incompleta**. Según los postulados del capítulo: (1) se tratan las partículas como distinguibles y se llama $\mathscr E_m$ al subespacio de $\mathscr E$ asociado al resultado, medido con aparatos que no distinguen las partículas; (2) con $\ket{\psi_m}\in\mathscr E_m$ arbitrario se forma el conjunto de los $S\ket{\psi_m}$, que es un espacio $\mathscr E_m^S$ (la proyección de $\mathscr E_m$ sobre $\mathscr E_S$); (3) la probabilidad es el cuadrado de la norma de la proyección de $\ket\psi$ sobre $\mathscr E_m^S$.
- **a)** Mostrar que $P_\alpha\ket{\psi_m}\in\mathscr E_m$ para toda permutación, que $\mathscr E_m$ es globalmente invariante ante $S$ y que $\mathscr E_m^S=\mathscr E_S\cap\mathscr E_m$.
- **b)** Se toma una base ortonormal $\{\ket{\varphi_m^1},\dots,\ket{\varphi_m^k},\ket{\varphi_m^{k+1}},\dots,\ket{\varphi_m^p}\}$ de $\mathscr E_m$ cuyos $k$ primeros vectores son una base de $\mathscr E_m^S$. Mostrar que los $S\ket{\varphi_m^n}$ con $n\geq k+1$ son combinaciones de los $k$ primeros y, usando los bras $\bra{\varphi_m^1},\dots,\bra{\varphi_m^k}$, que son nulos.
- **c)** Deducir que $\sum_{n=1}^p|\braket{\varphi_m^n}{\psi}|^2=\sum_{n=1}^k|\braket{\varphi_m^n}{\psi}|^2$, es decir, $\bra\psi P_m^S\ket\psi=\bra\psi P_m\ket\psi$, con $P_m^S$ y $P_m$ los proyectores sobre $\mathscr E_m^S$ y $\mathscr E_m$.

## Qué piden y estrategia {#estrategia}

Es una demostración en dos niveles:

- **Parte I** (medida completa, resultados distintos): todo sale de dos hechos de la sección 2, que $S$ es un proyector hermítico y que $P_\alpha S=S$ (B-53). Calculamos $|\braket\chi\psi|^2$ directamente y lo comparamos con la suma de probabilidades de las $N!$ asignaciones de las partículas distinguibles.
- **Parte II** (medida cualquiera): el ingrediente nuevo es que $\mathscr E_m$ es **invariante ante permutaciones**, porque la medida no distingue las partículas. Entonces la parte de $\mathscr E_m$ que no está en $\mathscr E_S$ es ortogonal a todo $\ket\psi$ simétrico, y proyectar sobre $\mathscr E_m$ o sobre $\mathscr E_m^S$ da lo mismo.

Al final lo comprobamos con números: tres partículas, varias medidas, dos maneras de calcular.

## Solución paso a paso {#solucion}

### Parte I: medida completa {#parte-i}

:::pasos El ket de la medida (I-a)
+++ Aplicar la regla de §C-3
$$\begin{aligned}&S\ket{1\!:\!u_\alpha;\dots;N\!:\!u_\nu}\\&=\frac1{N!}\sum_{\alpha'}P_{\alpha'}\ket{1\!:\!u_\alpha;\dots;N\!:\!u_\nu}\end{aligned}$$
Hay $N!$ sumandos, uno por permutación.
+++ Los sumandos son ortonormales
Como los $u$ son **distintos** y ortonormales, dos permutaciones distintas asignan los estados de manera distinta: los $N!$ kets $P_{\alpha'}\ket{\dots}$ son ortonormales entre sí.
+++ La norma
$$\begin{aligned}\big\|S\ket{1\!:\!u_\alpha;\dots}\big\|^2&=N!\cdot\Big(\frac1{N!}\Big)^2\\&=\frac1{N!}\end{aligned}$$
y por tanto
$$\ket\chi=\sqrt{N!}\,S\ket{1\!:\!u_\alpha;2\!:\!u_\beta;\dots;N\!:\!u_\nu}$$
> Es la generalización de (C-4) y del $1/\sqrt{3!}$ de (C-9).
:::

:::pasos Todas las asignaciones pesan lo mismo (I-b)
+++ Escribir la asignación permutada con un operador
Existe una permutación $P_{\alpha'}$ tal que
$$\begin{aligned}&\ket{i\!:\!u_\alpha;j\!:\!u_\beta;\dots;l\!:\!u_\nu}\\&=P_{\alpha'}\ket{1\!:\!u_\alpha;\dots;N\!:\!u_\nu}\end{aligned}$$
+++ Pasarla al ket
$$\begin{aligned}&\braket{i\!:\!u_\alpha;\dots;l\!:\!u_\nu}{\psi}\\&=\bra{1\!:\!u_\alpha;\dots}P_{\alpha'}^\dagger\ket\psi\\&=\bra{1\!:\!u_\alpha;\dots}P_{\alpha'}^{-1}\ket\psi\end{aligned}$$
($P_{\alpha'}$ es unitario).
+++ Usar la simetría de $\ket\psi$
Por (B-53), $P_{\beta}S=S$ para toda permutación, así que $P_\beta\ket\psi=P_\beta S\ket\psi=S\ket\psi=\ket\psi$. Con $\beta=\alpha'^{-1}$:
$$\begin{aligned}&\braket{i\!:\!u_\alpha;\dots;l\!:\!u_\nu}{\psi}\\&=\braket{1\!:\!u_\alpha;\dots;N\!:\!u_\nu}{\psi}\end{aligned}$$
> Para fermiones aparece el signo $\varepsilon_{\alpha'}$, que desaparece al tomar el módulo al cuadrado.
:::

:::pasos La probabilidad (I-c)
+++ El producto escalar
$$\begin{aligned}\braket\chi\psi&=\sqrt{N!}\,\bra{1\!:\!u_\alpha;\dots}S^\dagger\ket\psi\\&=\sqrt{N!}\,\bra{1\!:\!u_\alpha;\dots}S\ket\psi\\&=\sqrt{N!}\,\braket{1\!:\!u_\alpha;\dots;N\!:\!u_\nu}{\psi}\end{aligned}$$
> $S$ es hermítico (B-20) y $S\ket\psi=\ket\psi$: el simetrizador del ket de la medida «se lo come» el estado.
+++ Al cuadrado
$$\begin{aligned}&|\braket\chi\psi|^2\\&=N!\,|\braket{1\!:\!u_\alpha;\dots;N\!:\!u_\nu}{\psi}|^2\end{aligned}$$
+++ Repartir el $N!$
Por b), los $N!$ términos $|\braket{i\!:\!u_\alpha;\dots}{\psi}|^2$ son iguales, así que
$$\begin{aligned}&|\braket\chi\psi|^2=\sum_{i,j,\dots,l}\\&\big|\braket{i\!:\!u_\alpha;j\!:\!u_\beta;\dots;l\!:\!u_\nu}{\psi}\big|^2\end{aligned}$$
:::

:::pasos Comparar con partículas distinguibles (I-d)
+++ Los resultados de la medida
Con partículas distinguibles en $\ket\psi$, «una en $u_\alpha$, otra en $u_\beta$, …» se realiza con **cualquier** asignación de partículas a estados: hay $N!$ estados finales $\ket{i\!:\!u_\alpha;j\!:\!u_\beta;\dots;l\!:\!u_\nu}$, ortogonales entre sí.
+++ Sumar probabilidades
El aparato no distingue las partículas, así que la probabilidad es la suma:
$$\mathcal P_{\text{dist}}=\sum_{i,j,\dots,l}|\braket{i\!:\!u_\alpha;\dots;l\!:\!u_\nu}{\psi}|^2$$
+++ Conclusión
Es exactamente (3). Para partículas idénticas basta con que $\ket\psi$ esté en $\mathscr E_S$; los kets de la medida se pueden dejar **sin simetrizar**, como si fueran distinguibles y el aparato no supiera cuál es cuál.
> El postulado de simetrización es una restricción sobre **estados**; una vez cumplida, el cálculo de probabilidades es el de siempre.
:::

:::pasos Estados repetidos, N = 3 (I-e)
+++ Dos estados iguales
Si el resultado es «dos en $u_\alpha$ y una en $u_\beta$»:
$$\begin{aligned}&S\ket{1\!:\!u_\alpha;2\!:\!u_\alpha;3\!:\!u_\beta}\\&=\tfrac13\big[\ket{\alpha\alpha\beta}+\ket{\alpha\beta\alpha}+\ket{\beta\alpha\alpha}\big]\end{aligned}$$
(cada uno de los tres kets distintos aparece 2 veces entre las 6 permutaciones). Norma al cuadrado $3\cdot\tfrac19=\tfrac13$, así que
$$\ket\chi=\sqrt3\,S\ket{1\!:\!u_\alpha;2\!:\!u_\alpha;3\!:\!u_\beta}$$
> En general, $\sqrt{N!/\prod_kn_k!}$ (nota 6 del Cohen, sección 3).
+++ La probabilidad
Como en c),
$$\begin{aligned}|\braket\chi\psi|^2&=3\,|\braket{\alpha\alpha\beta}{\psi}|^2\\&=|\braket{\alpha\alpha\beta}\psi|^2\\&\;+|\braket{\alpha\beta\alpha}\psi|^2\\&\;+|\braket{\beta\alpha\alpha}\psi|^2\end{aligned}$$
la suma sobre los **3 kets distintos**, no sobre las 6 permutaciones.
+++ Distinguibles
Para partículas distinguibles también hay sólo 3 estados finales distintos (las permutaciones que cambian entre sí las dos partículas en $u_\alpha$ dan el mismo ket). Coinciden otra vez.
> Si los tres estados son iguales: $\ket\chi=\ket{1\!:\!u_\alpha;2\!:\!u_\alpha;3\!:\!u_\alpha}$ y un solo término. Para fermiones con estados repetidos, $\ket\chi=0$ y también $\braket{\alpha\alpha\beta}\psi=0$ (porque $P_{21}\ket\psi=-\ket\psi$): la probabilidad es cero por los dos caminos.
:::

### Parte II: medida cualquiera {#parte-ii}

:::pasos El subespacio de la medida (II-a)
+++ $\mathscr E_m$ es invariante ante permutaciones
El aparato no distingue las partículas: si $\ket{\psi_m}$ da el resultado $m$, el ket con las partículas permutadas también lo da. Dicho con operadores, el observable medido es simétrico, conmuta con todas las $P_\alpha$ (C-21) y sus subespacios propios son invariantes (C-23):
$$P_\alpha\ket{\psi_m}\in\mathscr E_m\quad\forall\alpha$$
+++ Invariante ante $S$
$S=\frac1{N!}\sum_\alpha P_\alpha$ es una suma de operadores que dejan $\mathscr E_m$ invariante:
$$S\ket{\psi_m}\in\mathscr E_m\quad\Longrightarrow\quad S\,\mathscr E_m\subset\mathscr E_m$$
+++ $\mathscr E_m^S=\mathscr E_S\cap\mathscr E_m$
- $\mathscr E_m^S=S\,\mathscr E_m$ está en $\mathscr E_S$ (todo $S\ket{\cdot}$ es simétrico) y en $\mathscr E_m$ (paso anterior): $\mathscr E_m^S\subset\mathscr E_S\cap\mathscr E_m$.
- Si $\ket u\in\mathscr E_S\cap\mathscr E_m$, entonces $\ket u=S\ket u\in S\,\mathscr E_m$.

Las dos inclusiones dan la igualdad.
:::

:::pasos Lo que sobra de 𝓔_m se anula (II-b)
+++ La base adaptada
$\{\ket{\varphi_m^1},\dots,\ket{\varphi_m^k}\}$ es base de $\mathscr E_m^S$ y se completa con $\ket{\varphi_m^{k+1}},\dots,\ket{\varphi_m^p}$ hasta una base ortonormal de $\mathscr E_m$.
+++ $S\ket{\varphi_m^n}$ está en $\mathscr E_m^S$
Para $n\geq k+1$, $S\ket{\varphi_m^n}\in S\,\mathscr E_m=\mathscr E_m^S$, así que
$$\begin{aligned}S\ket{\varphi_m^n}&=\sum_{j=1}^k c_j\ket{\varphi_m^j}\\c_j&=\bra{\varphi_m^j}S\ket{\varphi_m^n}\end{aligned}$$
+++ Los coeficientes son cero
$S$ es hermítico y $S\ket{\varphi_m^j}=\ket{\varphi_m^j}$ (está en $\mathscr E_S$):
$$\begin{aligned}c_j&=\big(S\ket{\varphi_m^j}\big)^\dagger\ket{\varphi_m^n}\\&=\braket{\varphi_m^j}{\varphi_m^n}=0\end{aligned}$$
porque $j\leq k<n$. Por tanto
$$S\ket{\varphi_m^n}=0\qquad(n\geq k+1)$$
> La parte de $\mathscr E_m$ ortogonal a $\mathscr E_m^S$ está entera en el núcleo de $S$: no tiene componente simétrica.
:::

:::pasos La igualdad de probabilidades (II-c)
+++ Las componentes «sobrantes» de $\ket\psi$
Para $n\geq k+1$:
$$\begin{aligned}\braket{\varphi_m^n}{\psi}&=\bra{\varphi_m^n}S\ket\psi\\&=\big(S\ket{\varphi_m^n}\big)^\dagger\ket\psi=0\end{aligned}$$
+++ Sumar
$$\sum_{n=1}^p|\braket{\varphi_m^n}{\psi}|^2=\sum_{n=1}^k|\braket{\varphi_m^n}{\psi}|^2$$
El lado izquierdo es $\bra\psi P_m\ket\psi$ y el derecho, $\bra\psi P_m^S\ket\psi$:
$$\bra\psi P_m^S\ket\psi=\bra\psi P_m\ket\psi$$
> **Conclusión del Cohen:** las probabilidades se pueden calcular proyectando $\ket\psi$ (que está en $\mathscr E_S$) sobre un subespacio $\mathscr E_m$ cuyos kets no son todos simétricos, siempre que en él todas las partículas tengan papeles equivalentes.
:::

## Resultado {#resultado}

:::resultado
Si $S\ket\psi=\ket\psi$ (o $A\ket\psi=\ket\psi$) y la medida no distingue las partículas,
$$\bra\psi P_m^S\ket\psi=\bra\psi P_m\ket\psi$$
- Medida completa con estados distintos: $|\braket\chi\psi|^2=N!\,|\braket{1\!:\!u_\alpha;\dots}{\psi}|^2=\sum_{\text{perm.}}|\braket{i\!:\!u_\alpha;\dots}{\psi}|^2$.
- Con estados repetidos: $\ket\chi=\sqrt{N!/\prod n_k!}\,S\ket{\dots}$ y la suma va sobre los $N!/\prod n_k!$ kets **distintos**.

Basta simetrizar el estado; los kets de la medida pueden quedarse como los de partículas distinguibles.
:::

## Verificación {#verificacion}

- **Otra demostración, en una línea.** Si $\mathscr E_m$ es invariante ante permutaciones, $[P_m,P_\alpha]=0$ para toda $\alpha$, así que $[P_m,S]=0$. Dos proyectores que conmutan tienen como producto el proyector sobre la intersección: $P_m^S=P_mS$. Entonces $\bra\psi P_m^S\ket\psi=\bra\psi P_mS\ket\psi=\bra\psi P_m\ket\psi$.
- **Caso límite.** Si $\mathscr E_m^S=\{0\}$ ($k=0$; por ejemplo, tres fermiones en el mismo estado), la conclusión dice que $\bra\psi P_m\ket\psi=0$: un estado antisimétrico no tiene componente sobre kets con dos fermiones en el mismo estado. Correcto.
- **Contraejemplo útil.** Si $\ket\psi$ **no** fuera simétrico, la igualdad falla: con $\ket\psi=\ket{1\!:\!u_0;2\!:\!u_1;3\!:\!u_2}$, el cálculo de distinguibles da 1 para el resultado $\{u_0,u_1,u_2\}$, pero $\ket\chi=\tfrac1{\sqrt6}\sum_\alpha P_\alpha\ket{1\!:\!u_0;2\!:\!u_1;3\!:\!u_2}$ da $|\braket\chi\psi|^2=\big|\tfrac1{\sqrt6}\big|^2=\tfrac16$. La hipótesis $S\ket\psi=\ket\psi$ es esencial.
- **Simulación con los datos del enunciado.** Tres partículas y $M=3$ o $4$ estados individuales; $\ket\psi$ es un estado simétrico (o antisimétrico) fijado por una fórmula (o aleatorio). Para cada resultado se calcula la probabilidad de las dos maneras: proyectando sobre $\mathscr E_m^S$ (base construida con Gram-Schmidt sobre los $S\ket t$) y sumando sobre los kets producto de $\mathscr E_m$. Con la medida completa es la parte I; con «cuántas en $u_0$» o «energía total» la medida es incompleta (parte II). La lectura de la diferencia máxima queda en el error de redondeo, y las pruebas reproducen los valores calculados aparte en Python.

```sim
id: ej8-simetrizar-estado
pie: Para cada resultado posible de la medida, la barra de color es la probabilidad calculada con los kets de la medida simetrizados (proyector sobre 𝓔_m^S) y la gris, la calculada como si las partículas fueran distinguibles y el aparato no las distinguiera (proyector sobre 𝓔_m). Son iguales en todos los casos: es el contenido del ejercicio. Cambia a «aleatorio» y prueba varias semillas: la igualdad no depende del estado, sólo de que sea simétrico (o antisimétrico).
```

## Entendimiento físico {#entendimiento}

:::idea-fisica
El postulado de simetrización actúa en un solo lugar: restringe los **estados**. Los observables de partículas idénticas ya son simétricos (no pueden distinguir las partículas), así que sus proyectores conmutan con las permutaciones y no sacan a un estado de $\mathscr E_S$. Por eso, en la práctica, uno simetriza una vez el estado inicial y después calcula con kets producto ordinarios, sumando sobre todas las asignaciones de partículas. Es lo que hicimos sin decirlo en los ejercicios 3 y 7 al escribir $\rho_{II}=2\sum|\psi|^2$: sumar sobre las asignaciones es tratar las partículas como distinguibles con un aparato ciego.
:::

:::error-comun Simetrizar dos veces y contar de más
Si se usa el ket de la medida simetrizado **y** además se suma sobre las permutaciones, se cuenta $N!$ veces (o $N!/\prod n_k!$) la misma probabilidad. O se usa $|\braket\chi\psi|^2$ con $\ket\chi$ normalizado, o la suma sobre asignaciones con kets producto; no las dos.
:::

:::error-comun Sumar sobre las $N!$ permutaciones cuando hay estados repetidos
Con dos partículas en el mismo estado, varias permutaciones dan el **mismo** ket; la suma va sobre los kets distintos (I-e).
:::

## ¿Qué pasa si…? {#que-pasa-si}

:::pregunta ¿Y si el aparato pudiera distinguir las partículas (por ejemplo, «la partícula 1 está en $u_0$»)?
Entonces $\mathscr E_m$ no sería invariante ante permutaciones y el argumento de II-a falla. Pero esa medida **no existe** para partículas idénticas: «la partícula 1» no es un observable físico (C-21). Las únicas medidas posibles son las que tratan a todas las partículas por igual, y para ellas el resultado vale.
:::

:::pregunta ¿Y con fermiones?
Todo se repite con $A$ en lugar de $S$; sólo aparecen signos $\varepsilon_\alpha$ que se van al tomar módulos al cuadrado. En la simulación, con fermiones y $M=4$, las probabilidades de la energía total son $0{,}05$, $0{,}45$, $0{,}45$ y $0{,}05$ por los dos caminos, y cero para las energías que exigirían repetir un estado.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento D_XIV, ejercicio 8, pp. 1500–1502. Usa §B (B-20, B-46 a B-53), §C-3 (construcción de kets físicos, nota 6) y §C-4 (postulados de medida, C-21 a C-23).
- Secciones 2 y 3 de esta página.
