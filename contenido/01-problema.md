---
titulo: El problema de las partículas idénticas
numero: 1
cohen: Cohen §A · pp. 1420–1425
resumen: Por qué la mecánica cuántica necesita una regla nueva cuando un sistema tiene partículas idénticas. En clásica basta con seguir las trayectorias; en cuántica, un mismo estado físico admite muchos kets que predicen cosas distintas.
---

:::idea-central
En mecánica clásica, dos partículas idénticas se distinguen por su trayectoria: basta con numerarlas al principio y seguirlas. En mecánica cuántica no hay trayectorias. Cuando los paquetes de onda se solapan se pierde la etiqueta, y un mismo estado físico queda representado por muchos kets distintos —la **degeneración de intercambio**— que dan predicciones distintas. Los postulados que ya conocemos no dicen cuál usar: hace falta uno nuevo.
:::

## A-1 · Qué quiere decir «idénticas» {#a-1}

Dos partículas son **idénticas** cuando todas sus propiedades intrínsecas —masa, espín, carga…— coinciden exactamente, de modo que **ningún experimento** puede distinguir una de otra. Todos los electrones del universo son idénticos entre sí; también lo son todos los protones y todos los átomos de hidrógeno. En cambio, un electrón y un positrón **no** son idénticos: tienen la misma masa y el mismo espín, pero carga opuesta.

De la definición sale una consecuencia que usaremos en todo el capítulo: si un sistema contiene dos partículas idénticas, **intercambiar sus papeles no cambia ni sus propiedades ni su evolución**.

:::comentario
La definición no depende del experimento. Aunque en cierto montaje nadie mida la carga, un electrón y un positrón nunca pueden tratarse como partículas idénticas: la diferencia existe aunque no la midamos.
:::

## A-2 · En mecánica clásica no hay problema {#a-2}

Tomemos dos partículas idénticas. En el instante $t_0$, el estado físico queda fijado al dar la posición y la velocidad de cada una: una está en $(\mathbf r_0,\mathbf v_0)$ y la otra en $(\mathbf r_0',\mathbf v_0')$. Para escribir las ecuaciones de movimiento hay que numerarlas, pero esa numeración **no tiene fundamento físico**. Por eso el mismo estado admite dos «estados matemáticos»:

$$\begin{cases}\mathbf r_1(t_0)=\mathbf r_0, & \mathbf v_1(t_0)=\mathbf v_0\\ \mathbf r_2(t_0)=\mathbf r_0', & \mathbf v_2(t_0)=\mathbf v_0'\end{cases}\tag{A-1}$$

$$\begin{cases}\mathbf r_1(t_0)=\mathbf r_0', & \mathbf v_1(t_0)=\mathbf v_0'\\ \mathbf r_2(t_0)=\mathbf r_0, & \mathbf v_2(t_0)=\mathbf v_0\end{cases}\tag{A-2}$$

¿Importa cuál elegimos? En clásica, no.

:::pasos Por qué las dos descripciones clásicas son equivalentes
+++ Resolver con la primera numeración
Supongamos que, con las condiciones iniciales (A-1), la solución de las ecuaciones de movimiento es
$$\mathbf r_1(t)=\mathbf r(t),\qquad \mathbf r_2(t)=\mathbf r'(t)\tag{A-3}$$
> Las funciones $\mathbf r(t)$ y $\mathbf r'(t)$ quedan fijadas por las condiciones iniciales y por las fuerzas.
+++ Usar la simetría del hamiltoniano
Como las partículas son idénticas, el lagrangiano y el hamiltoniano no cambian al intercambiar los índices:
$$H(\mathbf r_1,\mathbf p_1;\,\mathbf r_2,\mathbf p_2)=H(\mathbf r_2,\mathbf p_2;\,\mathbf r_1,\mathbf p_1)$$
Entonces, con las condiciones (A-2), la solución es la misma, con los papeles cambiados:
$$\mathbf r_1(t)=\mathbf r'(t),\qquad \mathbf r_2(t)=\mathbf r(t)\tag{A-4}$$
> Las ecuaciones de movimiento tienen la misma forma con las dos numeraciones; lo único que se intercambia son las condiciones iniciales de 1 y de 2.
+++ Comparar las predicciones
En los dos casos, la partícula que salió de $(\mathbf r_0,\mathbf v_0)$ está en $\mathbf r(t)$ con velocidad $\mathrm d\mathbf r/\mathrm dt$, y la que salió de $(\mathbf r_0',\mathbf v_0')$ está en $\mathbf r'(t)$. Sólo cambia el número que le pusimos a cada una, y ese número no se puede medir.
> Dos descripciones matemáticas que dan exactamente las mismas predicciones físicas son equivalentes.
+++ Elegir una y seguir las trayectorias
Basta con escoger una de las dos al principio y olvidar la otra. Desde ahí, los números (1) y (2) funcionan *como si* fueran propiedades intrínsecas: podemos seguir a cada partícula paso a paso por su trayectoria y decir en todo momento dónde está «la 1» y dónde «la 2».
> En la práctica, lo que vuelve distinguibles a dos partículas clásicas idénticas es su trayectoria.
:::

## A-3 · En mecánica cuántica aparece la dificultad {#a-3}

### A-3-a · Un ejemplo: el choque de dos partículas idénticas {#a-3-a}

En cuántica la situación cambia de raíz, porque **las partículas no tienen trayectorias definidas**. Aunque en $t_0$ los paquetes de onda de las dos partículas estén completamente separados, su evolución puede mezclarlos. Si después detectamos una partícula en una región donde las dos tienen probabilidad de estar, no hay forma de saber si es la (1) o la (2): **perdemos el hilo**. Salvo en casos especiales —por ejemplo, cuando los paquetes nunca se solapan—, la numeración se vuelve ambigua al medir posiciones.

El Cohen lo muestra con un choque entre dos partículas idénticas, visto en el sistema del centro de masa:

1. **Antes del choque** hay dos paquetes bien separados que se mueven uno hacia el otro. Podemos acordar llamar (1) al de la izquierda y (2) al de la derecha.
2. **Durante el choque**, los paquetes se solapan.
3. **Después del choque**, la región donde la densidad de probabilidad de las dos partículas no es nula tiene forma de capa esférica, y su radio crece con el tiempo.

Pongamos un detector $D$ en una dirección que forma un ángulo $\theta$ con la velocidad inicial del paquete (1). Si $D$ registra una partícula, por conservación del momento la otra se aleja en la dirección opuesta. Pero es **imposible saber si la detectada es la (1) o la (2)**. Hay dos «caminos» que llevan del estado inicial al resultado observado —(1) hacia $D$ y (2) al lado opuesto, o (2) hacia $D$ y (1) al lado opuesto— y nada permite decidir cuál se siguió.

```sim
id: paquetes-colision
pie: Mueve el tiempo (o pulsa ▶) y compara las dos descripciones. En la clásica, los colores nunca se mezclan. En la cuántica, el solapamiento $S$ pasa de casi 0 a 1 justo antes del choque, y desde ahí las etiquetas pierden sentido; después del choque se dibujan los dos caminos posibles hasta $D$. Es un esquema, como la figura 2 del Cohen: la función de onda real depende de las seis coordenadas de las dos partículas.
```

Aquí aparece la dificultad de fondo. Para calcular la probabilidad de un resultado, los postulados del capítulo III piden el ket final asociado a ese resultado. Pero ahora hay **dos** kets finales, uno por camino, que son distintos (de hecho, ortogonales) y, sin embargo, corresponden a **un solo estado físico**: no existe una medida más completa que los distinga. ¿Se usa el camino de la izquierda, el de la derecha o los dos? Si se usan los dos, ¿se suman las probabilidades o las amplitudes? ¿Con qué signo? Cada opción da predicciones distintas. La respuesta llega en la sección 5 (§D del Cohen), después del postulado de simetrización.

:::nota
El solapamiento $S=\int|\varphi_1|\,|\varphi_2|\,\mathrm d^2r$ de la simulación mide cuánto «se pisan» los paquetes. Para dos gaussianas de ancho $\sigma$ separadas una distancia $d$ vale $S=e^{-d^2/8\sigma^2}$ (lo comprobamos también con integración numérica). Con $S\approx0$, cada región del espacio pertenece a un solo paquete y la etiqueta tiene sentido operativo; con $S\to1$, ya no.
:::

### A-3-b · El origen: la degeneración de intercambio {#a-3-b}

En el choque, los paquetes empezaban separados y eso nos dejó numerarlos: la ambigüedad apareció al buscar el ket del resultado final. En realidad, **la misma dificultad aparece ya al elegir el ket inicial**. Para verlo en el caso más simple, el Cohen toma un sistema de dimensión finita.

**Dos espines ½.** Consideremos dos partículas idénticas de espín ½ y miremos sólo sus grados de libertad de espín. Supongamos que medimos la componente $S_z$ de cada una y obtenemos una con $+\hbar/2$ y la otra con $-\hbar/2$. Parecería que con eso conocemos por completo el estado físico.

Para describirlo numeramos las partículas: $\mathbf S_1$ y $\mathbf S_2$ son sus espines, y $\{\ket{\varepsilon_1,\varepsilon_2}\}$, con $\varepsilon_i=\pm$, es la base de autoestados comunes de $S_{1z}$ y $S_{2z}$. Igual que en clásica, el mismo estado físico admite dos kets:

$$\ket{\varepsilon_1=+,\ \varepsilon_2=-}\equiv\ket{+,-}\tag{A-5a}$$

$$\ket{\varepsilon_1=-,\ \varepsilon_2=+}\equiv\ket{-,+}\tag{A-5b}$$

Pero aquí hay una diferencia esencial con la clásica: por el principio de superposición, **cualquier** combinación normalizada

$$\ket{\psi}=\alpha\ket{+,-}+\beta\ket{-,+}\tag{A-6}$$

$$|\alpha|^2+|\beta|^2=1\tag{A-7}$$

describe igual de bien «una con $+\hbar/2$ y la otra con $-\hbar/2$». Esa familia infinita de kets para un mismo estado físico es la **degeneración de intercambio**.

¿Importa cuál elijamos? Sí. Calculemos la probabilidad de que, al medir $S_x$ en las dos partículas, ambas den $+\hbar/2$.

:::pasos Probabilidad de medir $S_x=+\hbar/2$ en las dos partículas
+++ El ket de una partícula con $S_x=+\hbar/2$
Para un espín ½, el autoestado de $S_x$ con valor propio $+\hbar/2$ es
$$\ket{+}_x=\frac{1}{\sqrt2}\Big(\ket{+}+\ket{-}\Big)$$
> Es la ecuación (A-20) del capítulo IV del Cohen.
+++ El ket del resultado «ambas $+\hbar/2$»
A este resultado le corresponde un único ket del sistema, el producto tensorial:
$$\begin{aligned}\ket{1\!:\!+_x;\,2\!:\!+_x}=\tfrac12\Big(&\ket{+,+}+\ket{+,-}\\&+\ket{-,+}+\ket{-,-}\Big)\end{aligned}\tag{A-8}$$
> Aquí no hay degeneración: las dos partículas dan el mismo valor, así que intercambiarlas no cambia el ket.
+++ Proyectar el estado
Como la base es ortonormal, sólo sobreviven los términos $\ket{+,-}$ y $\ket{-,+}$:
$$\braket{1\!:\!+_x;\,2\!:\!+_x}{\psi}=\tfrac12\,(\alpha+\beta)$$
> Los términos $\ket{+,+}$ y $\ket{-,-}$ no aparecen en (A-6); por eso no contribuyen.
+++ La probabilidad
$$\mathcal P=\Big|\tfrac12(\alpha+\beta)\Big|^2=\frac{|\alpha+\beta|^2}{4}\tag{A-9}$$
> Depende de $\alpha$ y $\beta$, es decir, del ket que escogimos dentro de la familia (A-6).
+++ Casos concretos
- $\ket{+,-}$ ($\alpha=1,\ \beta=0$): $\mathcal P=1/4$.
- Ket simétrico ($\alpha=\beta=1/\sqrt2$): $\mathcal P=1/2$, el máximo posible.
- Ket antisimétrico ($\alpha=-\beta=1/\sqrt2$): $\mathcal P=0$.

> El mismo estado físico da tres predicciones distintas. Eso no puede ser: la teoría tiene que decir cuál ket usar.
:::

```sim
id: degeneracion-intercambio
pie: Recorre la familia de kets (A-6) con $\chi$ y $\varphi$, o usa los botones. La barra gris ($S_z$) vale 1 para todos los kets: esa medida no los distingue. Las de $S_x$ sí cambian. En el mapa, el ket simétrico da el máximo (0,5) y el antisimétrico, cero.
```

Con la parametrización de la simulación, $\alpha=\cos\chi$ y $\beta=e^{i\varphi}\sin\chi$, la ecuación (A-9) queda

$$\mathcal P=\frac{1+\sin2\chi\,\cos\varphi}{4}\;\in\;\Big[0,\tfrac12\Big],$$

así que, según el ket que se escoja, la predicción va de 0 a ½. La conclusión es que **hay que levantar la degeneración de intercambio**: indicar sin ambigüedad cuál de los kets (A-6) describe el estado físico.

:::comentario
En este ejemplo la degeneración aparece sólo en el estado inicial, porque en el final las dos componentes valen lo mismo. En general —por ejemplo, si el resultado da dos valores distintos de $S_x$— aparece tanto en el estado inicial como en el final.
:::

#### Generalización a $N$ partículas {#a-3-b-generalizacion}

La dificultad aparece en cualquier sistema con varias partículas idénticas. Con tres, el espacio de estados es el producto tensorial

$$\mathscr E=\mathscr E(1)\otimes\mathscr E(2)\otimes\mathscr E(3)\tag{A-10}$$

Sea $B(1)$ un observable (o un conjunto de observables) que forma un C.S.C.O. en $\mathscr E(1)$, con espectro $\{b_i\}$. Como las partículas son idénticas, existen también $B(2)$ y $B(3)$, con el mismo espectro, y la base producto

$$\Big\{\ket{1\!:\!b_i;\,2\!:\!b_j;\,3\!:\!b_k}\Big\}\tag{A-11}$$

es ortonormal en $\mathscr E$. No podemos medir $B(1)$ —la numeración no es física—, pero sí «la magnitud $B$ de cada una de las tres». Si el resultado son tres valores distintos $b_n$, $b_p$ y $b_q$, el estado puede ser cualquier ket del subespacio generado por las **seis** permutaciones:

$$\begin{gathered}
\ket{1\!:\!b_n;2\!:\!b_p;3\!:\!b_q},\quad \ket{1\!:\!b_q;2\!:\!b_n;3\!:\!b_p},\\
\ket{1\!:\!b_p;2\!:\!b_q;3\!:\!b_n},\quad \ket{1\!:\!b_n;2\!:\!b_q;3\!:\!b_p},\\
\ket{1\!:\!b_p;2\!:\!b_n;3\!:\!b_q},\quad \ket{1\!:\!b_q;2\!:\!b_p;3\!:\!b_n}
\end{gathered}\tag{A-12}$$

Así, una medida completa sobre cada una de las partículas **no** determina un ket único. La degeneración es menor si hay valores repetidos y desaparece si todos son iguales:

| Resultado de la medida | Dimensión del subespacio degenerado |
|---|---|
| 3 partículas, 3 valores distintos | $3!=6$ |
| 3 partículas, 2 valores iguales y 1 distinto | $3!/2!=3$ |
| 3 partículas, los 3 valores iguales | $1$ (no hay degeneración) |
| $N$ partículas, valores con multiplicidades $n_1,n_2,\dots$ | $N!/(n_1!\,n_2!\cdots)$ |

:::resultado
- La numeración de partículas idénticas no tiene contenido físico.
- En clásica es inofensiva: las dos descripciones dan las mismas predicciones, y la trayectoria permite seguir a cada partícula.
- En cuántica no hay trayectorias: los paquetes se solapan y aparecen varios caminos indistinguibles hacia un mismo resultado.
- **Degeneración de intercambio:** un mismo estado físico corresponde a todo un subespacio de kets (de dimensión hasta $N!$), y kets distintos de ese subespacio predicen cosas distintas, como muestra (A-9).
- Los postulados de los capítulos anteriores no bastan: hace falta uno nuevo que elija el ket.
:::

:::idea-fisica
La pregunta «¿cuál de las dos es la partícula 1?» no tiene respuesta, así que la física no puede depender de ella. La mecánica cuántica lo resuelve con el **postulado de simetrización** (sección 3): para partículas idénticas, sólo son físicos los kets totalmente simétricos (bosones) o totalmente antisimétricos (fermiones). En el ejemplo de los espines ½, que son fermiones, y mirando sólo el espín, el postulado deja un único ket de la familia (A-6): el antisimétrico, que da $\mathcal P=0$. Cuando también hay grados de libertad orbitales, lo que debe ser antisimétrico es el ket **total**; eso lo veremos en la sección 3.
:::

## Esqueleto {#esqueleto}

:::esqueleto
1. **Idénticas:** todas las propiedades intrínsecas iguales; ningún experimento las distingue (un electrón y un positrón no lo son).
2. **Clásica:** numerar es arbitrario, pero $H$ es simétrico, así que (A-1) y (A-2) dan las mismas predicciones; se sigue cada trayectoria.
3. **Cuántica:** no hay trayectorias; los paquetes se solapan y la etiqueta se pierde.
4. **Choque en el centro de masa:** dos caminos indistinguibles llevan al mismo resultado en $D$. ¿Probabilidades o amplitudes? ¿Con qué signo?
5. **Degeneración de intercambio:** $\alpha\ket{+,-}+\beta\ket{-,+}$ describe el mismo estado físico para todos los $\alpha,\beta$ normalizados.
6. **Predicciones distintas:** $\mathcal P(\text{ambas } S_x=+\hbar/2)=|\alpha+\beta|^2/4$ depende del ket elegido.
7. **$N$ partículas:** con valores distintos, el subespacio degenerado tiene dimensión $N!$.
8. **Conclusión:** hace falta un postulado nuevo, el postulado de simetrización.
:::

## Preguntas {#preguntas}

:::pregunta ¿Un electrón y un positrón son partículas idénticas si en el experimento nadie mide la carga?
No. Ser idénticas es una propiedad de las partículas, no del montaje: el electrón y el positrón tienen cargas opuestas, y esa diferencia existe aunque el experimento no la registre.
:::

:::pregunta ¿Por qué en mecánica clásica podemos quedarnos con una sola de las descripciones (A-1) o (A-2)?
Porque el hamiltoniano es simétrico frente al intercambio de índices: la solución de (A-2) es la de (A-1) con los papeles cambiados, (A-4) frente a (A-3), y ambas predicen exactamente lo mismo. Además, cada partícula tiene una trayectoria que permite seguirla.
:::

:::pregunta Para los kets (A-6), ¿qué probabilidad tiene el resultado «una con $S_z=+\hbar/2$ y la otra con $-\hbar/2$»? ¿Depende de $\alpha$ y $\beta$?
Vale $|\alpha|^2+|\beta|^2=1$ para **todos** los kets de la familia. Esa medida no distingue los kets de (A-6): por eso es una degeneración. La medida de $S_x$, en cambio, sí los distingue.
:::

:::pregunta ¿Cuál es el valor máximo de $|\alpha+\beta|^2/4$ y qué ket lo alcanza?
Por la desigualdad de Cauchy-Schwarz, $|\alpha+\beta|^2\le2\,(|\alpha|^2+|\beta|^2)=2$, así que el máximo es $1/2$. Se alcanza cuando $\alpha=\beta$, es decir, con el ket simétrico $\tfrac{1}{\sqrt2}\big(\ket{+,-}+\ket{-,+}\big)$ (salvo una fase global).
:::

:::pregunta Tres partículas idénticas; la medida de $B$ da $b_1$, $b_1$ y $b_2$. ¿Qué dimensión tiene el subespacio degenerado?
Tres: $\ket{1\!:\!b_1;2\!:\!b_1;3\!:\!b_2}$, $\ket{1\!:\!b_1;2\!:\!b_2;3\!:\!b_1}$ y $\ket{1\!:\!b_2;2\!:\!b_1;3\!:\!b_1}$. En general, $3!/2!=3$.
:::

## Errores comunes {#errores-comunes}

:::error-comun Creer que «idénticas» depende de lo que se mida
La identidad es una propiedad de las partículas, no del experimento. Un electrón y un positrón no son idénticos aunque nadie mida su carga.
:::

:::error-comun Sumar las probabilidades de los dos caminos del choque
Eso sería tratarlos como alternativas distinguibles, y justamente no lo son. La regla correcta (sumar amplitudes, con un signo que depende del tipo de partícula) llega en la sección 5.
:::

:::error-comun Pensar que la degeneración de intercambio es sólo un asunto de notación
No es un problema de nombres: kets distintos de la familia (A-6) predicen probabilidades distintas, como muestra (A-9).
:::

:::error-comun Leer $\ket{+,-}$ como «la partícula 1 tiene el espín hacia arriba»
El número de la partícula no es observable. Lo único que se mide es que «una tiene $+\hbar/2$ y la otra $-\hbar/2$».
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Cap. XIV, §A, pp. 1420–1425: figuras 1–3 y ecuaciones (A-1) a (A-12).
- Mismos autores, *Quantum Mechanics*, vol. I, cap. IV, ec. (A-20): autoestados de $S_x$ para un espín ½.
- Lectura complementaria: D. J. Griffiths y D. F. Schroeter, *Introduction to Quantum Mechanics*, 3.ª ed., Cambridge University Press, 2018, §5.1.
