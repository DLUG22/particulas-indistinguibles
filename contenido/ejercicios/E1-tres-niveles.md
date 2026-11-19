---
titulo: Tres partículas en tres niveles equidistantes
numero: 1
cohen: Cohen, complemento D del cap. XIV · p. 1496
resumen: Tres partículas independientes en un hamiltoniano de tres niveles 0, ħω₀ y 2ħω₀. Contamos los estados del sistema y sus energías para tres electrones y para tres bosones de espín 0, y vemos cómo el postulado de simetrización cambia el espectro: el fundamental, las degeneraciones y el número total de estados.
---

## Enunciado {#enunciado}

Una partícula tiene un hamiltoniano $h_0$ que sólo actúa sobre las variables orbitales. En el espacio orbital $\mathscr E_r$, $h_0$ tiene tres niveles **no degenerados** e igualmente espaciados,

$$e_0=0,\qquad e_1=\hbar\omega_0,\qquad e_2=2\hbar\omega_0,$$

con $\omega_0>0$. En el espacio total, con espín $s$, cada nivel es $(2s+1)$ veces degenerado. Sólo nos interesa el subespacio generado por esos tres estados orbitales, $\ket{\varphi_0}$, $\ket{\varphi_1}$ y $\ket{\varphi_2}$.

- **a)** Tres electrones independientes, con $H=h_0(1)+h_0(2)+h_0(3)$. ¿Cuáles son los niveles de energía de $H$ y su degeneración?
- **b)** La misma pregunta para tres bosones idénticos de espín 0.

:::nota
En el libro, la segunda fila del hamiltoniano dice $h_o(2)$: es una errata por $h_0(2)$. Las tres partículas tienen el mismo $h_0$, como exige la simetría de $H$ (D-1).
:::

## Qué piden y estrategia {#estrategia}

Hay que encontrar el **espectro de $H$ dentro del espacio físico**: $\mathscr E_A$ para los electrones y $\mathscr E_S$ para los bosones. Como las partículas no interactúan, la sección 4 ya nos dio el método (D-1 a D-4):

1. Los estados propios de $H$ se construyen con **estados individuales** propios de $h_0$; la energía es la suma de las energías individuales.
2. Un estado físico de partículas idénticas queda determinado por **cuántas** partículas hay en cada estado individual (números de ocupación, §C-3-d), no por cuál está en cuál.
3. Para fermiones, cada estado individual admite **a lo sumo una** partícula (Pauli); para bosones, cualquier número.

Entonces basta con contar: para cada energía, ¿cuántos conjuntos (o multiconjuntos) de estados individuales la producen? La energía sólo depende de las ocupaciones **orbitales** $(n_0,n_1,n_2)$:

$$E=(n_1+2n_2)\,\hbar\omega_0,\qquad n_0+n_1+n_2=3$$

## Solución paso a paso {#solucion}

### a) Tres electrones {#a-electrones}

:::pasos Tres electrones en tres niveles
+++ Los estados individuales
Un electrón tiene espín $s=\tfrac12$, así que cada nivel orbital da dos estados individuales, $\ket{\varphi_k,+}$ y $\ket{\varphi_k,-}$:
$$\begin{gathered}h_0\ket{\varphi_k,\pm}=k\,\hbar\omega_0\ket{\varphi_k,\pm}\\k=0,1,2\end{gathered}$$
En total hay $3\times2=6$ estados individuales ortonormales.
> El espín no cambia la energía ($h_0$ sólo actúa sobre lo orbital), pero sí cuenta para Pauli: dos electrones pueden compartir orbital si tienen espines opuestos.
+++ Los estados del sistema
Por (D-9), cada estado propio de $H$ en $\mathscr E_A$ es un determinante de Slater de **tres estados individuales distintos**:
$$\ket{u_i;u_j;u_l}=\tfrac1{\sqrt{3!}}\det\big[\ket{n\!:\!u_m}\big]$$
con $u_i,u_j,u_l$ tomados entre los 6. Su energía es $e_i+e_j+e_l$ (D-4). Hay
$$\binom{6}{3}=20$$
estados en total.
> Elegir tres estados de seis sin orden y sin repetir: eso es exactamente lo que cuenta un determinante de Slater.
+++ Las ocupaciones orbitales permitidas
Como cada orbital tiene sólo dos estados de espín, $n_k\le2$. Las ternas $(n_0,n_1,n_2)$ con suma 3 y ningún $n_k$ mayor que 2 son
$$\begin{gathered}(2,1,0),\ (2,0,1),\ (1,2,0),\ (1,1,1),\\(0,2,1),\ (1,0,2),\ (0,1,2)\end{gathered}$$
> Queda excluida $(3,0,0)$: un tercer electrón en $\varphi_0$ repetiría un estado individual.
+++ Cuántos estados da cada ocupación
Un orbital con **dos** electrones sólo admite una elección de espines (uno $+$ y otro $-$): $\binom22=1$. Un orbital con **un** electrón admite dos: $\binom21=2$. Uno vacío, una: $\binom20=1$. Por tanto
$$g(n_0,n_1,n_2)=\binom{2}{n_0}\binom{2}{n_1}\binom{2}{n_2}$$
> Las elecciones en orbitales distintos son independientes; por eso se multiplican.
+++ Energía y degeneración de cada ocupación
| $(n_0,n_1,n_2)$ | $E/\hbar\omega_0$ | estados |
|---|---|---|
| $(2,1,0)$ | 1 | 2 |
| $(2,0,1)$ | 2 | 2 |
| $(1,2,0)$ | 2 | 2 |
| $(1,1,1)$ | 3 | 8 |
| $(0,2,1)$ | 4 | 2 |
| $(1,0,2)$ | 4 | 2 |
| $(0,1,2)$ | 5 | 2 |
> $(1,1,1)$ da $2^3=8$: tres electrones solos en su orbital, cada uno con el espín que quiera.
+++ Agrupar por energía
$$\begin{aligned}E&=\hbar\omega_0: &g&=2\\E&=2\hbar\omega_0: &g&=2+2=4\\E&=3\hbar\omega_0: &g&=8\\E&=4\hbar\omega_0: &g&=2+2=4\\E&=5\hbar\omega_0: &g&=2\end{aligned}$$
Suma: $2+4+8+4+2=20$ ✓.
> Dos ocupaciones distintas pueden dar la misma energía porque los niveles son equidistantes: $(2,0,1)$ y $(1,2,0)$ suman $2\hbar\omega_0$ las dos.
+++ El estado fundamental
$E_0=\hbar\omega_0$, **dos veces degenerado**: dos electrones en $\varphi_0$ (espines opuestos) y el tercero en $\varphi_1$, con espín $+$ o $-$:
$$\begin{aligned}\ket{\Psi_0^{\pm}}=\tfrac1{\sqrt6}\det\big[&\ket{\varphi_0,+},\ket{\varphi_0,-},\\&\ket{\varphi_1,\pm}\big]\end{aligned}$$
> Pauli empuja al tercer electrón un nivel arriba. La degeneración que queda es la del espín de ese electrón «de valencia». La energía de Fermi (§D-1-a) es $e_1=\hbar\omega_0$.
:::

### b) Tres bosones de espín 0 {#b-bosones}

:::pasos Tres bosones de espín 0
+++ Los estados individuales
Con $s=0$ no hay espín: los únicos estados individuales son $\ket{\varphi_0}$, $\ket{\varphi_1}$ y $\ket{\varphi_2}$.
+++ Los estados del sistema
Por (D-3) y (C-15), cada estado de $\mathscr E_S$ queda fijado por las ocupaciones $(n_0,n_1,n_2)$, **sin límite** en cada $n_k$, y cada ocupación da **un solo** estado:
$$\begin{aligned}&\ket{n_0,n_1,n_2}\\&\;=c\,S\ket{1\!:\!\varphi_{k_1};2\!:\!\varphi_{k_2};3\!:\!\varphi_{k_3}}\end{aligned}$$
El número de ternas con $n_0+n_1+n_2=3$ es
$$\binom{3+3-1}{3}=\binom53=10$$
> Repartir 3 bolas idénticas en 3 cajas: el conteo de Bose-Einstein de la sección 4.
+++ Energía de cada ocupación
| $(n_0,n_1,n_2)$ | $E/\hbar\omega_0$ |
|---|---|
| $(3,0,0)$ | 0 |
| $(2,1,0)$ | 1 |
| $(2,0,1)$, $(1,2,0)$ | 2 |
| $(1,1,1)$, $(0,3,0)$ | 3 |
| $(1,0,2)$, $(0,2,1)$ | 4 |
| $(0,1,2)$ | 5 |
| $(0,0,3)$ | 6 |
> $E=(n_1+2n_2)\hbar\omega_0$; cada fila con dos ternas es un nivel doblemente degenerado.
+++ Agrupar por energía
$$\begin{aligned}E&=0: &g&=1\\E&=\hbar\omega_0: &g&=1\\E&=2\hbar\omega_0: &g&=2\\E&=3\hbar\omega_0: &g&=2\\E&=4\hbar\omega_0: &g&=2\\E&=5\hbar\omega_0: &g&=1\\E&=6\hbar\omega_0: &g&=1\end{aligned}$$
Suma: $1+1+2+2+2+1+1=10$ ✓.
+++ El estado fundamental
$E_0=0$, **no degenerado**: los tres bosones en $\varphi_0$ (D-5, D-6),
$$\ket{\Psi_0}=\ket{1\!:\!\varphi_0;2\!:\!\varphi_0;3\!:\!\varphi_0}$$
> Ya es simétrico y está normalizado (C-11). Nada impide que los bosones se amontonen en el nivel más bajo.
:::

## Resultado {#resultado}

:::resultado
| $E/\hbar\omega_0$ | a) tres electrones | b) tres bosones de espín 0 |
|---|---|---|
| 0 | — | 1 |
| 1 | 2 | 1 |
| 2 | 4 | 2 |
| 3 | 8 | 2 |
| 4 | 4 | 2 |
| 5 | 2 | 1 |
| 6 | — | 1 |
| total | 20 | 10 |

(degeneración de cada nivel; «—»: no existe ese nivel)

Fundamental: $\hbar\omega_0$ y doble para los electrones; $0$ y no degenerado para los bosones.
:::

## Verificación {#verificacion}

- **Dimensiones.** Todas las energías son múltiplos enteros de $\hbar\omega_0$, que tiene unidades de energía.
- **Conteo total.** $\dim\mathscr E_A=\binom{6}{3}=20$ y $\dim\mathscr E_S=\binom{5}{3}=10$ coinciden con la suma de las degeneraciones. Si las partículas fueran distinguibles habría $3^3=27$ estados de espín 0 y $6^3=216$ de espín ½: el postulado deja una fracción pequeña.
- **Simetría del espectro.** Cambiar cada partícula del nivel $k$ al $2-k$ lleva la energía $E$ a $6\hbar\omega_0-E$ y conserva el tipo de estado. Por eso las dos listas de degeneraciones son simétricas respecto a $3\hbar\omega_0$.
- **Límite de muchos estados de espín.** Con $g=2s+1$ grande casi nunca se repite un estado individual y los conteos de bosones y fermiones se acercan al clásico corregido $(3g)^3/3!$ (sección 4). Con $g=2$ la diferencia todavía es enorme.
- **Simulación con los datos del enunciado.** Por defecto muestra el caso a): tres fermiones de espín ½. Las barras deben dar 2, 4, 8, 4, 2; cambia a «bosones idénticos» con espín 0 para el caso b). Abajo se ven las ocupaciones que componen el nivel elegido y cuántos estados aporta cada una. Sus pruebas reproducen las dos tablas con enumeración directa.

```sim
id: ej1-tres-niveles
pie: Arriba, la degeneración de cada nivel del sistema (en rojo para fermiones, azul para bosones, gris para distinguibles); la barra resaltada es el nivel que se detalla abajo. Abajo, las configuraciones de ocupación (n₀, n₁, n₂) que dan esa energía, con un punto por partícula y ×k estados. Prueba N = 4 electrones: el fundamental pasa a ser 2ħω₀ y deja de estar degenerado, porque llena por completo los dos primeros orbitales.
```

## Entendimiento físico {#entendimiento}

:::idea-fisica
El hamiltoniano es el mismo en los dos casos; lo único que cambia es **qué estados son físicos**. Para los fermiones, Pauli prohíbe tres partículas en $\varphi_0$ y sube el fundamental a $\hbar\omega_0$; la degeneración que sobrevive (2) es la del espín del electrón solitario, igual que en un átomo con una capa llena y un electrón de valencia. Para los bosones, el fundamental es el «condensado» de los tres en $\varphi_0$ y no hay degeneración de intercambio: cada lista de ocupaciones es un solo estado. Ni bosones ni fermiones tienen la degeneración de intercambio de las distinguibles (las $3!$ maneras de asignar etiquetas): el postulado la elimina (§C-2).
:::

:::error-comun Contar las configuraciones orbitales como si cada una fuera un estado
Para electrones, $(1,1,1)$ no es un estado sino **ocho**: cada electrón solitario puede tener espín $+$ o $-$. En cambio, un orbital doblemente ocupado sólo admite el par de espines opuestos.
:::

:::error-comun Multiplicar por $3!$ las asignaciones
Con partículas idénticas «la partícula 1 en $\varphi_0$ y la 2 en $\varphi_1$» y «la 2 en $\varphi_0$ y la 1 en $\varphi_1$» son el **mismo** estado físico. Sólo cuentan los números de ocupación.
:::

## ¿Qué pasa si…? {#que-pasa-si}

:::pregunta ¿Y si fueran cuatro electrones?
Las ocupaciones posibles con $n_k\le2$ y suma 4 son $(2,2,0)$, $(2,1,1)$, $(1,2,1)$, $(2,0,2)$, $(1,1,2)$, $(0,2,2)$. Energías $2,3,4,4,5,6$ (en $\hbar\omega_0$) y estados $1,4,4,1,4,1$: el espectro es $2\,(1),\ 3\,(4),\ 4\,(5),\ 5\,(4),\ 6\,(1)$, con $\binom64=15$ estados. El fundamental $(2,2,0)$ **no** está degenerado: dos «capas» llenas. Compruébalo en la simulación con $N=4$.
:::

:::pregunta ¿Y si los tres bosones tuvieran espín 1?
Ahora hay $3\times3=9$ estados individuales y $\binom{9+2}{3}=165$ estados del sistema. El fundamental sigue siendo $E=0$ (los tres en $\varphi_0$), pero ahora es **10 veces** degenerado: es el número de estados simétricos de tres espines 1, $\binom{3+2}{3}=10$. La simulación da $10,18,36,37,36,18,10$.
:::

:::pregunta ¿Y si fueran tres partículas distinguibles de espín 0?
Cada asignación ordenada cuenta: las degeneraciones son los coeficientes de $(1+x+x^2)^3$, es decir $1,3,6,7,6,3,1$ (27 estados). El fundamental sigue en $E=0$, pero el nivel $\hbar\omega_0$ ya es triple: hay tres maneras de escoger **cuál** partícula sube.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento D_XIV, ejercicio 1, p. 1496. Usa §C-3 (construcción de kets físicos, determinante de Slater, números de ocupación) y §D-1-a (partículas independientes, ecs. D-1 a D-9).
- Sección 4 de esta página (Bosones, fermiones y Pauli) y sus simulaciones `llenado-niveles` y `conteo-microestados`.
