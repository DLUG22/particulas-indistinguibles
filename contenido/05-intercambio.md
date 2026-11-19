---
titulo: Interferencia de intercambio
numero: 5
cohen: Cohen §D-2 · pp. 1446–1455
resumen: Con partículas idénticas, cada resultado de una medida se puede alcanzar por dos «caminos», el directo y el de intercambio, y sus amplitudes interfieren con signo + para bosones y − para fermiones. Así se resuelve el choque de la sección 1. Y cuando el término de intercambio se anula (partículas lejanas o con espines distintos), se puede ignorar la simetrización.
---

:::idea-central
En mecánica cuántica las predicciones salen de **amplitudes**, así que simetrizar o antisimetrizar los kets produce **interferencias**. Si una partícula está en $\varphi$ y la otra en $\chi$, el resultado «una en $u_n$ y otra en $u_{n'}$» se alcanza por dos caminos: $\varphi\to u_n,\ \chi\to u_{n'}$ (término **directo**) y $\varphi\to u_{n'},\ \chi\to u_n$ (término de **intercambio**). Sus amplitudes se **suman** para bosones y se **restan** para fermiones. Cuando el término de intercambio es nulo, las partículas idénticas se comportan como distinguibles y el postulado se puede ignorar.
:::

:::nota
En la sección 1 quedó abierta una pregunta: en el choque de dos partículas idénticas, ¿cuál es la probabilidad de detectar una en la dirección $\mathbf n$? Aquí está la respuesta (D-32). Como en el Cohen, nos limitamos a **dos** partículas.
:::

## D-2-a · Interferencia entre el proceso directo y el de intercambio {#d-2-a}

### α · Una medida sobre dos partículas idénticas {#d-2-a-alfa}

Una partícula está en el estado individual $\ket\varphi$ y la otra en $\ket\chi$, ortogonales. Por (C-4), el ket físico normalizado es

$$\ket{\varphi;\chi}=\tfrac1{\sqrt2}\big(\uno+\varepsilon P_{21}\big)\ket{1\!:\!\varphi;\,2\!:\!\chi}\tag{D-10}$$

$$\varepsilon=\begin{cases}+1&\text{bosones}\\-1&\text{fermiones}\end{cases}\tag{D-11}$$

Medimos en **las dos** partículas la misma magnitud $B$, con espectro discreto y no degenerado,

$$B\ket{u_i}=b_i\ket{u_i}\tag{D-12}$$

¿Cuál es la probabilidad de obtener $b_n$ en una y $b_{n'}$ en la otra, con $n\neq n'$? Al resultado le corresponde el ket físico

$$\ket{u_n;u_{n'}}=\tfrac1{\sqrt2}\big(\uno+\varepsilon P_{21}\big)\ket{1\!:\!u_n;\,2\!:\!u_{n'}}\tag{D-13}$$

:::pasos La amplitud: directo más (o menos) intercambio
+++ Escribir el producto escalar
$$\begin{aligned}&\braket{u_n;u_{n'}}{\varphi;\chi}\\&\;=\tfrac12\bra{1\!:\!u_n;2\!:\!u_{n'}}\big(\uno+\varepsilon P_{21}^\dagger\big)\\&\;\times\big(\uno+\varepsilon P_{21}\big)\ket{1\!:\!\varphi;2\!:\!\chi}\end{aligned}\tag{D-14}$$
> El bra de (D-13) trae $(\uno+\varepsilon P_{21})^\dagger$.
+++ Simplificar el producto de operadores
Con $P_{21}^\dagger=P_{21}$, $P_{21}^2=\uno$ y $\varepsilon^2=1$:
$$\begin{aligned}&\tfrac12\big(\uno+\varepsilon P_{21}^\dagger\big)\big(\uno+\varepsilon P_{21}\big)\\&\;=\tfrac12\big(2\cdot\uno+2\varepsilon P_{21}\big)=\uno+\varepsilon P_{21}\end{aligned}\tag{D-15}$$
> Es (B-13) y (B-14) de la sección 2: $\tfrac12(\uno+\varepsilon P_{21})$ es el proyector $S$ o $A$, y aplicarlo dos veces es aplicarlo una.
+++ La amplitud queda
$$\begin{aligned}&\braket{u_n;u_{n'}}{\varphi;\chi}\\&\;=\bra{1\!:\!u_n;2\!:\!u_{n'}}\big(\uno+\varepsilon P_{21}\big)\\&\;\phantom{=}\;\ket{1\!:\!\varphi;2\!:\!\chi}\end{aligned}\tag{D-16}$$
+++ Hacer actuar $\uno+\varepsilon P_{21}$ hacia la izquierda
$P_{21}$ intercambia los estados del bra; cada término se factoriza en productos escalares de una partícula:
$$\begin{aligned}\braket{u_n;u_{n'}}{\varphi;\chi}&=\braket{u_n}{\varphi}\braket{u_{n'}}{\chi}\\&+\varepsilon\braket{u_{n'}}{\varphi}\braket{u_n}{\chi}\end{aligned}\tag{D-17}$$
> **La numeración desapareció**: la amplitud sólo tiene productos escalares entre estados individuales, como debe ser si las etiquetas no significan nada.
+++ La probabilidad
$$\begin{aligned}\mathcal P(b_n;b_{n'})=\Big|&\braket{u_n}{\varphi}\braket{u_{n'}}{\chi}\\+\,\varepsilon&\braket{u_{n'}}{\varphi}\braket{u_n}{\chi}\Big|^2\end{aligned}\tag{D-18}$$
> Primer término: **directo** ($\varphi\to u_n$, $\chi\to u_{n'}$). Segundo: **intercambio** ($\varphi\to u_{n'}$, $\chi\to u_n$). Interfieren con $+$ para bosones y $-$ para fermiones.
:::

Ésta es la respuesta a la pregunta de la sección 1: no se suman probabilidades de los dos caminos, se suman (o restan) **amplitudes**.

:::comentario
**¿Y si las partículas fueran distintas?** Por ejemplo, un muón $\mu^-$ y un electrón $e^-$, con un aparato que sólo es sensible a la carga y no distingue cuál es cuál. El estado inicial es

$$\ket\psi=\ket{1\!:\!\varphi;\,2\!:\!\chi}\tag{D-19}$$

y el resultado «$b_n$ y $b_{n'}$» corresponde a **dos** estados finales físicamente distintos y ortogonales, $\ket{1\!:\!u_n;2\!:\!u_{n'}}$ y $\ket{1\!:\!u_{n'};2\!:\!u_n}$. Hay que sumar **probabilidades**:

$$\begin{aligned}\mathcal P'(b_n;b_{n'})&=\big|\braket{u_n}{\varphi}\big|^2\big|\braket{u_{n'}}{\chi}\big|^2\\&+\big|\braket{u_{n'}}{\varphi}\big|^2\big|\braket{u_n}{\chi}\big|^2\end{aligned}\tag{D-20}$$

Desarrollando (D-18) se obtiene (D-20) **más** un término cruzado, $2\varepsilon\,\mathrm{Re}\big[\braket{u_n}{\varphi}\braket{u_{n'}}{\chi}\braket{u_{n'}}{\varphi}^*\braket{u_n}{\chi}^*\big]$. Ese término de interferencia es toda la diferencia entre idénticas y distintas.
:::

**El mismo resultado para las dos ($n=n'$).** Para fermiones, Pauli excluye el estado final: $\mathcal P(b_n;b_n)=0$. Para bosones:

:::pasos Dos bosones con el mismo resultado
+++ El ket final ya es simétrico
$$\ket{u_n;u_n}=\ket{1\!:\!u_n;\,2\!:\!u_n}\tag{D-21}$$
> Está normalizado sin factor $1/\sqrt2$ (C-6).
+++ La amplitud
$$\begin{aligned}&\braket{u_n;u_n}{\varphi;\chi}\\&\;=\tfrac1{\sqrt2}\bra{1\!:\!u_n;2\!:\!u_n}\big(\uno+P_{21}\big)\\&\;\phantom{=}\;\ket{1\!:\!\varphi;2\!:\!\chi}\\&\;=\sqrt2\,\braket{u_n}{\varphi}\braket{u_n}{\chi}\end{aligned}\tag{D-22}$$
> Los dos términos (directo e intercambio) son iguales y se suman: $\tfrac{2}{\sqrt2}=\sqrt2$.
+++ La probabilidad
$$\mathcal P(b_n;b_n)=2\,\big|\braket{u_n}{\varphi}\braket{u_n}{\chi}\big|^2\tag{D-23}$$
+++ Comparar con partículas distintas
Para distintas, $\ket{\varphi;\chi}\to\ket{1\!:\!\varphi;2\!:\!\chi}$ y $\ket{u_n;u_n}\to\ket{1\!:\!u_n;2\!:\!u_n}$: hay un solo camino, con amplitud
$$\braket{u_n}{\varphi}\braket{u_n}{\chi}\tag{D-24}$$
$$\mathcal P'(b_n;b_n)=\big|\braket{u_n}{\varphi}\braket{u_n}{\chi}\big|^2\tag{D-25}$$
> Dos bosones idénticos caen en el mismo estado con **el doble** de probabilidad que dos partículas distintas; dos fermiones, nunca. Es la versión cuántica de lo que la sección 4 encontró contando microestados.
:::

:::comentario
Con $N$ partículas idénticas hay en general $N!$ caminos, uno por permutación, que se suman o restan en la amplitud. Con tres partículas en $\varphi$, $\chi$, $\omega$ y resultados $b_n$, $b_{n'}$, $b_{n''}$ distintos hay seis: los tres que corresponden a permutaciones pares entran siempre con $+$, y los tres de transposiciones, con $\varepsilon$ (fig. 5 del Cohen).
:::

Si $B$ es la **posición** (en una dimensión, para simplificar), (D-18) da la densidad de probabilidad de hallar una partícula en $x_1$ y la otra en $x_2$: $\big|\varphi(x_1)\chi(x_2)+\varepsilon\,\varphi(x_2)\chi(x_1)\big|^2$, salvo la normalización. En la diagonal $x_1=x_2$ los dos términos son iguales: para fermiones se cancelan y para bosones se duplican.

```sim
id: densidad-dos-particulas
pie: Dos paquetes gaussianos de anchura σ, uno en −d/2 (φ) y otro en +d/2 (χ). Arriba, la densidad ρ(x₁, x₂) del tipo elegido; la diagonal punteada es x₁ = x₂, donde la de fermiones vale cero. Abajo, la probabilidad de hallar las dos en la misma mitad (x < 0 o x > 0). Con d pequeño, los bosones se agrupan más que las distinguibles y los fermiones se evitan; al separar los paquetes (▶ recorre d), el solapamiento cae como e^(−d²/8) y las tres curvas se juntan: es el §D-2-b-α. Como φ y χ no son ortogonales si d es pequeño, la normalización es 2(1 + εS²) en vez de 2; con d = 0 el estado de fermiones no existe.
```

### β · Ejemplo: choque elástico de dos partículas idénticas {#d-2-a-beta}

Volvamos al choque de la sección 1, en el sistema del centro de masa y sin espín (o con interacción que no depende del espín y espines iniciales iguales, nota 10 del Cohen). Ahora hay que tener en cuenta la **evolución** entre el estado inicial y la medida, pero el término de intercambio aparece igual.

Al principio las partículas vienen una hacia la otra a lo largo de $Oz$, con momentos $p\,\mathbf e_z$ y $-p\,\mathbf e_z$:

$$\ket{\psi_i}=\tfrac1{\sqrt2}\big(\uno+\varepsilon P_{21}\big)\ket{1\!:\!p\mathbf e_z;\,2\!:\!-p\mathbf e_z}\tag{D-26}$$

La ecuación de Schrödinger es lineal, así que hay un operador de evolución $U(t,t')$, función del hamiltoniano, tal que

$$\ket{\psi(t)}=U(t,t_0)\ket{\psi_i}\tag{D-27}$$

$$\ket{\psi(t_1)}=U(t_1,t_0)\ket{\psi_i}\tag{D-28}$$

Como $H$ es simétrico, $U$ también conmuta con la permutación:

$$\big[U(t,t'),\,P_{21}\big]=0\tag{D-29}$$

Buscamos la probabilidad de detectar las partículas en las dos direcciones opuestas del eje $\mathbf n$. Para abreviar, llamamos $\ket{\Phi_0}\equiv\ket{1\!:\!p\mathbf e_z;\,2\!:\!-p\mathbf e_z}$ al ket producto inicial:

$$\ket{\psi_f}=\tfrac1{\sqrt2}\big(\uno+\varepsilon P_{21}\big)\ket{1\!:\!p\mathbf n;\,2\!:\!-p\mathbf n}\tag{D-30}$$

:::pasos La amplitud de difusión de dos partículas idénticas
+++ Escribirla
$$\begin{aligned}&\braket{\psi_f}{\psi(t_1)}\\&\;=\tfrac12\bra{1\!:\!p\mathbf n;2\!:\!-p\mathbf n}\big(\uno+\varepsilon P_{21}^\dagger\big)\\&\;\times U(t_1,t_0)\big(\uno+\varepsilon P_{21}\big)\ket{\Phi_0}\end{aligned}\tag{D-31}$$
+++ Pasar $(\uno+\varepsilon P_{21})$ a través de $U$
Por (D-29), $U(\uno+\varepsilon P_{21})=(\uno+\varepsilon P_{21})U$. Los dos factores quedan juntos y, por (D-15), $\tfrac12(\uno+\varepsilon P_{21})^2=\uno+\varepsilon P_{21}$.
> La evolución no estropea el argumento de §α: sólo cambia los productos escalares por elementos de matriz de $U$.
+++ Directo más intercambio
$$\begin{aligned}\bra{\psi_f}U\ket{\psi_i}=\;&\bra{1\!:\!p\mathbf n;2\!:\!-p\mathbf n}U\ket{\Phi_0}\\+\,\varepsilon&\bra{1\!:\!-p\mathbf n;2\!:\!p\mathbf n}U\ket{\Phi_0}\end{aligned}\tag{D-32}$$
> Primer término (fig. 7a): la partícula que venía por $+\mathbf e_z$ sale en $\mathbf n$. Segundo (fig. 7b): sale en $-\mathbf n$, y la otra en $\mathbf n$.
+++ Leerlo con amplitudes de difusión
Si $f(\theta)$ es la amplitud de que una partícula se desvíe un ángulo $\theta$, el primer término va como $f(\theta)$ y el segundo como $f(\pi-\theta)$. La probabilidad de detectar una partícula en $\mathbf n$ es
$$\big|f(\theta)+\varepsilon f(\pi-\theta)\big|^2$$
> Al tomar el módulo al cuadrado aparece un término de interferencia que no existe para partículas distinguibles, $|f(\theta)|^2+|f(\pi-\theta)|^2$.
+++ Simetría $\mathbf n\to-\mathbf n$
Cambiar $\mathbf n$ por $-\mathbf n$ intercambia los dos términos de (D-32), es decir, multiplica la amplitud por $\varepsilon$. La probabilidad no cambia: es simétrica respecto a $\theta=90°$.
> A $\theta=90°$, $f(\theta)=f(\pi-\theta)$: dos fermiones con el mismo espín **nunca** salen a 90°, y dos bosones salen con el doble de probabilidad que dos partículas distinguibles.
:::

```sim
id: colision-identicas
pie: Arriba, los dos procesos de (D-32) para el ángulo θ elegido: directo, f(θ), e intercambio, f(π−θ). Abajo, la probabilidad por ángulo sólido para partículas idénticas (azul bosones, rojo fermiones) y para distinguibles (gris discontinuo). Fíjate en θ = 90°: fermiones con el mismo espín dan cero y bosones de espín 0, el doble que las distinguibles. Todas las curvas son simétricas respecto a 90°. Con «no polarizados» se usa la fórmula del ejercicio 5. Las cifras usan una amplitud modelo (aproximación de Born para un potencial gaussiano de alcance a, normalizada a f(0) = 1), no una del Cohen: lo que importa es cómo se combinan f(θ) y f(π−θ).
```

## D-2-b · Cuándo se puede ignorar el postulado de simetrización {#d-2-b}

Si siempre hubiera que simetrizar, sería imposible estudiar un sistema pequeño: habría que incluir **todos** los electrones del universo, porque todos son idénticos a los nuestros. Por suerte no es así. En ciertas condiciones las partículas idénticas se comportan como si fueran distintas, y el postulado no cambia ninguna predicción. Por lo visto en D-2-a, cabe esperar que eso ocurra cuando **los términos de intercambio son nulos**. El Cohen da dos ejemplos.

### α · Partículas en regiones distintas del espacio {#d-2-b-alfa}

Dos partículas idénticas (sin espín, para simplificar), una en $\varphi$ y otra en $\chi$, con funciones de onda que viven en dominios **disjuntos** $D$ y $\Delta$:

$$\begin{cases}\varphi(\mathbf r)=\braket{\mathbf r}{\varphi}=0 & \text{si }\mathbf r\notin D\\[2pt]\chi(\mathbf r)=\braket{\mathbf r}{\chi}=0 & \text{si }\mathbf r\notin\Delta\end{cases}\tag{D-33}$$

Es la situación clásica del §A-2: mientras $D$ y $\Delta$ no se toquen, cada partícula se puede «seguir».

:::pasos El término de intercambio se anula
+++ Dos aparatos, cada uno en su región
Medimos con dos aparatos: uno ciego a lo que pasa en $\Delta$ y otro ciego a lo que pasa en $D$. Sus resultados corresponden a estados individuales $\ket u$ y $\ket v$ con
$$\begin{aligned}u(\mathbf r)&=\braket{\mathbf r}{u}=0\quad\text{si }\mathbf r\in\Delta\\v(\mathbf r)&=\braket{\mathbf r}{v}=0\quad\text{si }\mathbf r\in D\end{aligned}\tag{D-34}$$
+++ Directo e intercambio
Por (D-17), el término directo es $\braket u\varphi\braket v\chi$ y el de intercambio, $\braket u\chi\braket v\varphi$.
+++ Las funciones no se solapan
$u$ y $\chi$ viven en regiones disjuntas, igual que $v$ y $\varphi$:
$$\braket{u}{\chi}=\braket{v}{\varphi}=0\tag{D-35}$$
> El término de intercambio es exactamente cero.
+++ Se pueden numerar
Da lo mismo razonar como si fueran distintas: 1 = la de $D$, 2 = la de $\Delta$, estado inicial $\ket{1\!:\!\varphi;2\!:\!\chi}$, final $\ket{1\!:\!u;2\!:\!v}$, amplitud $\braket u\varphi\braket v\chi$.
> Por eso podemos estudiar el átomo de hidrógeno del laboratorio sin antisimetrizar con los electrones de la Luna.
:::

:::comentario
Que estén separadas **al principio** no basta. Para seguir estudiando una sin la otra después de la evolución hace falta que (i) sigan en regiones separadas y (ii) **no interactúen**. Una interacción crea correlaciones entre las dos, sean idénticas o no, y ya no se puede describir cada una con su propio vector de estado.
:::

### β · Partículas que se distinguen por su espín {#d-2-b-beta}

Choque elástico de dos partículas idénticas de espín ½ (por ejemplo, electrones) cuando las interacciones que dependen del espín son despreciables: los estados de espín se conservan durante el choque. Si al principio son **ortogonales**, el espín permite saber en todo momento cuál es cuál.

:::pasos El intercambio se anula por el espín
+++ Estados inicial y final
Con $+$ y $-$ el signo de la componente del espín sobre un eje fijo:
$$\begin{aligned}\ket{\psi_i}=\tfrac1{\sqrt2}&\big(\uno-P_{21}\big)\\\times&\ket{1\!:\!p\mathbf e_z,+;\,2\!:\!-p\mathbf e_z,-}\end{aligned}\tag{D-36}$$
$$\begin{aligned}\ket{\psi_f}=\tfrac1{\sqrt2}&\big(\uno-P_{21}\big)\\\times&\ket{1\!:\!p\mathbf n,+;\,2\!:\!-p\mathbf n,-}\end{aligned}\tag{D-37}$$
+++ El término de intercambio de (D-32)
$$\begin{aligned}&\bra{1\!:\!-p\mathbf n,-;\,2\!:\!p\mathbf n,+}\,U\\&\quad\times\ket{1\!:\!p\mathbf e_z,+;\,2\!:\!-p\mathbf e_z,-}\end{aligned}\tag{D-38}$$
> La partícula 1 empieza con $+$ y debería terminar con $-$.
+++ Es cero
$U$ no actúa sobre el espín, así que (D-38) es un elemento de matriz entre estados de espín ortogonales: vale cero. Sólo sobrevive el término directo.
> Se obtiene lo mismo sin antisimetrizar y llamando 1 a la del espín $+$ y 2 a la del $-$. Si $H$ dependiera del espín, el argumento fallaría.
:::

:::pasos Consecuencia: electrones no polarizados (anticipo del ejercicio 5)
+++ Dos casos igual de probables
Si los espines iniciales son al azar, la mitad de las veces son **iguales** y la otra mitad, **opuestos**.
+++ Espines iguales
Las partículas no se distinguen: probabilidad $|f(\theta)-f(\pi-\theta)|^2$.
+++ Espines opuestos
Por §β se comportan como distinguibles: $|f(\theta)|^2+|f(\pi-\theta)|^2$.
+++ Promediar
$$\begin{aligned}&\tfrac12\big|f(\theta)-f(\pi-\theta)\big|^2\\&\;+\tfrac12\Big(|f(\theta)|^2+|f(\pi-\theta)|^2\Big)\\&=|f(\theta)|^2+|f(\pi-\theta)|^2\\&\;-\mathrm{Re}\big[f(\theta)f^*(\pi-\theta)\big]\end{aligned}$$
> Coincide con la fórmula del ejercicio 5 para $s=\tfrac12$, $\varepsilon=-1$: el término de interferencia pesa $2/(2s+1)=1$. A 90° queda $|f|^2$, la mitad que para distinguibles. La simulación de colisiones la usa con «no polarizados».
:::

:::resultado
- La amplitud de una medida sobre dos partículas idénticas es **directo + ε·intercambio** (D-17): $\braket{u_n}{\varphi}\braket{u_{n'}}{\chi}+\varepsilon\braket{u_{n'}}{\varphi}\braket{u_n}{\chi}$, y la probabilidad, su módulo al cuadrado (D-18).
- Para partículas distintas que el aparato no distingue se suman **probabilidades** (D-20); la diferencia es el término de interferencia.
- Mismo resultado para las dos: bosones, el **doble** que distintas (D-23 frente a D-25); fermiones, cero.
- Choque: $|f(\theta)+\varepsilon f(\pi-\theta)|^2$ (D-32), simétrico respecto a 90°; a 90°, fermiones del mismo espín no salen y bosones salen el doble.
- El postulado se puede **ignorar** cuando el intercambio es nulo: partículas en regiones disjuntas que no interactúan (D-33 a D-35), o con espines ortogonales que se conservan (D-36 a D-38).
:::

:::idea-fisica
El término de intercambio no viene de ninguna fuerza: aparece aunque las partículas no interactúen (D-17 no tiene evolución). Es pura interferencia entre dos maneras indistinguibles de obtener el mismo resultado, como en un experimento de doble rendija. De ahí salen el **agrupamiento** de los bosones (dos fotones idénticos tienden a llegar juntos al mismo detector) y el **antiagrupamiento** de los fermiones, que actúa como una «repulsión» sin fuerza. Y se apaga sola cuando los caminos se vuelven distinguibles, por la distancia o por el espín: la identidad sólo importa cuando no hay manera, ni siquiera en principio, de saber cuál es cuál.
:::

## Esqueleto {#esqueleto}

:::esqueleto
1. **Estado y medida:** $\ket{\varphi;\chi}=\tfrac1{\sqrt2}(\uno+\varepsilon P_{21})\ket{1\!:\!\varphi;2\!:\!\chi}$ (D-10); resultado $\ket{u_n;u_{n'}}$ (D-13).
2. **Truco:** $\tfrac12(\uno+\varepsilon P_{21}^\dagger)(\uno+\varepsilon P_{21})=\uno+\varepsilon P_{21}$ (D-15).
3. **Amplitud:** $\braket{u_n}\varphi\braket{u_{n'}}\chi+\varepsilon\braket{u_{n'}}\varphi\braket{u_n}\chi$ (D-17); directo e intercambio; la numeración desaparece.
4. **Distintas:** se suman probabilidades (D-20); idénticas tienen además el término de interferencia.
5. **Mismo estado final:** bosones $2|\braket{u_n}\varphi\braket{u_n}\chi|^2$ (D-23), el doble que distintas (D-25); fermiones 0.
6. **Choque:** $[U,P_{21}]=0$ (D-29) ⇒ amplitud directo + ε·intercambio (D-32) ⇒ $|f(\theta)+\varepsilon f(\pi-\theta)|^2$; simétrico respecto a 90°.
7. **Se ignora el postulado si el intercambio es nulo:** regiones disjuntas y sin interacción (D-33 a D-35); espines ortogonales conservados (D-36 a D-38).
:::

## Preguntas {#preguntas}

:::pregunta Dos núcleos de $^4$He (bosones de espín 0) chocan en el centro de masa. ¿Cuánto vale, a $\theta=90°$, la probabilidad de detección comparada con la de dos partículas distinguibles con la misma $f$?
A 90°, $f(\theta)=f(\pi-\theta)=f$. Idénticas: $|2f|^2=4|f|^2$. Distinguibles: $|f|^2+|f|^2=2|f|^2$. El cociente es **2**.
:::

:::pregunta ¿Y para dos electrones con el mismo espín? ¿Y si no están polarizados?
Mismo espín: $|f-f|^2=0$, no salen a 90°. No polarizados: $|f|^2+|f|^2-|f|^2=|f|^2$, la mitad que para distinguibles.
:::

:::pregunta ¿Por qué en (D-22) aparece $\sqrt2$ y en (D-17) no?
Porque el ket final $\ket{1\!:\!u_n;2\!:\!u_n}$ ya está normalizado y no lleva el $1/\sqrt2$ de (D-13). Los dos términos de $(\uno+P_{21})$ dan lo mismo y suman $2\cdot\tfrac1{\sqrt2}=\sqrt2$. Elevado al cuadrado da el factor 2 de (D-23).
:::

:::pregunta ¿Hace falta antisimetrizar la función de onda de un electrón de un átomo de hidrógeno en Bogotá con la de un electrón en otro átomo en Ibagué?
No. Sus funciones de onda no se solapan, y los aparatos que miden en un lugar no ven el otro: por (D-35) el término de intercambio es nulo y se obtiene lo mismo tratándolos como distinguibles, siempre que no interactúen.
:::

:::pregunta Dos electrones con espines opuestos chocan mediante una interacción que no depende del espín. ¿Hay interferencia de intercambio?
No. El espín se conserva y permite saber cuál es cuál; el término de intercambio (D-38) es un elemento de matriz entre espines ortogonales y vale cero. La probabilidad es $|f(\theta)|^2$ si se mide también el espín, o $|f(\theta)|^2+|f(\pi-\theta)|^2$ si no.
:::

## Errores comunes {#errores-comunes}

:::error-comun Sumar las probabilidades de los dos caminos
Con partículas idénticas se suman **amplitudes** (D-18). Sumar probabilidades (D-20) es tratarlas como distintas y pierde el término de interferencia.
:::

:::error-comun Creer que el término de intercambio viene de una interacción
Aparece aunque las partículas no interactúen: en (D-17) no hay hamiltoniano. Es interferencia entre caminos indistinguibles. (La «energía de intercambio» del helio sí involucra la repulsión, pero su origen es este mismo término.)
:::

:::error-comun Olvidar la normalización cuando el estado final repite un estado individual
$\ket{u_n;u_n}=\ket{1\!:\!u_n;2\!:\!u_n}$ no lleva $1/\sqrt2$. Usar (D-13) con $n=n'$ da un ket mal normalizado y una probabilidad equivocada en un factor 2.
:::

:::error-comun Pensar que basta con que las partículas estén separadas al principio
Hace falta que sigan separadas **y** que no interactúen. Si chocan o se acercan, el intercambio vuelve a contar.
:::

:::error-comun Aplicar $|f(\theta)-f(\pi-\theta)|^2$ a electrones con espines opuestos
Si la interacción no depende del espín y los espines iniciales son ortogonales, los electrones se distinguen por el espín y no hay término de intercambio (§D-2-b-β).
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Cap. XIV, §D-2, pp. 1446–1455: ecuaciones (D-10) a (D-38), figuras 4 a 8 y nota 10. En la p. 1452, la primera línea de (D-32) dice «$\ket{\psi_f}=$» donde debe decir $\bra{\psi_f}U\ket{\psi_i}$.
- Mismos autores, complemento D_XIV, ejercicios 4 y 5 (colisiones de partículas idénticas, polarizadas y no polarizadas).
- R. P. Feynman, R. B. Leighton y M. Sands, *The Feynman Lectures on Physics*, vol. III, cap. 3, §3-4, y cap. 4 (lectura que recomienda el propio Cohen sobre los términos directo y de intercambio).
