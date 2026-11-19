---
titulo: Átomo de helio
numero: 7
cohen: Complemento B_XIV · pp. 1467–1480
resumen: En el helio, la repulsión entre los dos electrones parte cada configuración en términos espectrales. El triplete (ortohelio) queda por debajo del singlete (parahelio) aunque el hamiltoniano no dependa del espín; la separación es 2J, con J la integral de intercambio. El postulado de simetrización no causa la separación, pero decide qué espín le toca a cada nivel. La estructura fina parte después los términos en multipletes.
---

:::idea-central
El hamiltoniano del helio es puramente electrostático y, sin embargo, sus niveles dependen del **espín total**. La razón es el postulado de simetrización: el estado total de dos electrones debe ser antisimétrico, así que el espín simétrico (triplete, $S=1$) va con una parte orbital **antisimétrica**, en la que los electrones nunca coinciden, y el singlete ($S=0$) con una orbital **simétrica**, en la que se acercan. Por eso la repulsión pesa menos en el triplete: $\delta(^3L)=K-J$ y $\delta(^1L)=K+J$, con $K$ la integral directa y $J>0$ la de **intercambio**.
:::

:::nota
**Ojo con la notación.** Esta sección usa la del Cohen: $K$ es la integral **directa** (corrimiento común) y $J$ la de **intercambio** (separación singlete-triplete). Muchos textos (Griffiths, por ejemplo) usan las letras al revés. Las ecuaciones llevan la numeración del complemento B_XIV, (1) a (45).
:::

## 1 · Configuraciones del helio {#configuraciones}

### 1-a · El hamiltoniano electrostático {#hamiltoniano}

Como en la sección 6, separamos el hamiltoniano del helio en una parte de electrones independientes en un potencial central y un resto:

$$H=H_0+W\tag{1}$$

$$\begin{aligned}H_0=\frac{\mathbf P_1^2}{2m_e}&+\frac{\mathbf P_2^2}{2m_e}\\&+V_c(R_1)+V_c(R_2)\end{aligned}\tag{2}$$

$$\begin{aligned}W=&-\frac{2e^2}{R_1}-\frac{2e^2}{R_2}+\frac{e^2}{|\mathbf R_1-\mathbf R_2|}\\&-V_c(R_1)-V_c(R_2)\end{aligned}\tag{3}$$

$V_c$ se elige para que $W$ sea una corrección pequeña. Sin $W$ los electrones son independientes (aunque $V_c$ ya recoge parte de su repulsión promedio): los niveles de $H_0$ definen las **configuraciones**, y $W$ se tratará después con teoría de perturbaciones estacionarias.

### 1-b · Fundamental y primeras excitadas {#excitadas}

Una configuración queda fijada por los números $n,l$ y $n',l'$ de los dos electrones, con energía

$$E_c(n,l;n',l')=E_{n,l}+E_{n',l'}\tag{4}$$

El fundamental es $1s^2$; la primera configuración excitada, $1s\,2s$; la segunda, $1s\,2p$. En general, las excitadas son de la forma $1s,nl$. Existen también configuraciones **doblemente excitadas** $nl,n'l'$ con $n,n'>1$, pero en el helio quedan por encima de la energía de ionización (el límite de $1s,nl$ cuando $n\to\infty$): casi todas se deshacen enseguida en un ion y un electrón (estados **autoionizantes**), aunque algunas decaen emitiendo fotones y se han observado sus líneas.

### 1-c · Degeneración de las configuraciones {#degeneracion}

$V_c$ es central y no depende del espín, así que $E_c$ no depende de $m,m'$ ni de los espines $\varepsilon,\varepsilon'$. Un estado de la configuración se fija con $(n,l,m,\varepsilon)$ y $(n',l',m',\varepsilon')$; por §C-3-b del capítulo, su ket físico es

$$\begin{aligned}&\ket{n,l,m,\varepsilon;\,n',l',m',\varepsilon'}\\&=\tfrac1{\sqrt2}\big(\uno-P_{21}\big)\ket{1\!:\!n,l,m,\varepsilon;\,2\!:\!n',l',m',\varepsilon'}\end{aligned}\tag{5}$$

Los kets (5) no nulos forman una base ortonormal del subespacio $\mathscr E(n,l;n',l')$ de la configuración.

:::pasos Contar los estados de una configuración
+++ Electrones en capas distintas
Si no se tiene a la vez $n=n'$ y $l=l'$, los estados individuales nunca coinciden y $m,\varepsilon,m',\varepsilon'$ son libres:
$$\begin{aligned}&2(2l+1)\cdot2(2l'+1)\\&=4(2l+1)(2l'+1)\end{aligned}\tag{6}$$
> $1s\,2s$: 4 estados. $1s\,2p$: 12 estados.
+++ Electrones en la misma capa
Si $n=n'$ y $l=l'$, Pauli excluye los pares con el mismo estado individual. Con $2(2l+1)$ estados individuales, el número de pares distintos es
$$\binom{2(2l+1)}{2}=(2l+1)(4l+1)\tag{7}$$
> Es el mismo conteo de la sección 6 con $k=2$.
+++ El fundamental 1s²
Para $l=0$, (7) da 1: el fundamental **no** está degenerado. Tomando en (5) $n=n'=1$, $l=l'=m=m'=0$, $\varepsilon=+$, $\varepsilon'=-$ y sacando la parte espacial como factor común:
$$\begin{aligned}\ket{1s^2}=\;&\ket{1\!:\!1,0,0;\,2\!:\!1,0,0}\\\otimes\,&\tfrac1{\sqrt2}\big(\ket{1\!:\!+;2\!:\!-}\\&-\ket{1\!:\!-;2\!:\!+}\big)\end{aligned}\tag{8}$$
> La parte de espín es el **singlete** $\ket{S=0,M_S=0}$. $H_0$ no depende del espín, pero la simetrización obliga al fundamental a tener $S=0$.
:::

## 2 · La repulsión: energía de intercambio y términos espectrales {#repulsion}

A primer orden, la corrección de energía sale de diagonalizar la restricción de $W$ al subespacio $\mathscr E(n,l;n',l')$. Cualquier base sirve, pero conviene una adaptada a las simetrías de $W$: en ella, la matriz ya es diagonal.

### 2-a · Una base adaptada: L y S {#base}

:::pasos Las simetrías de W
+++ Momento angular orbital total
$W$ no conmuta con $\mathbf L_1$ ni con $\mathbf L_2$, pero sí con su suma:
$$\mathbf L=\mathbf L_1+\mathbf L_2\tag{9}$$
$$\big[W,\mathbf L\big]=\Big[\frac{e^2}{R_{12}},\mathbf L\Big]=0\tag{10}$$
> Al girar **los dos** electrones, la distancia $R_{12}$ no cambia; al girar uno solo, sí.
+++ Espín total
$W$ no actúa sobre el espín:
$$\big[W,\mathbf S\big]=0\tag{11}$$
+++ Un ECOC
$\{\mathbf L^2,L_z,\mathbf S^2,S_z\}$ conmutan entre sí y con $W$, y forman un ECOC dentro de $\mathscr E(n,l;n',l')$. En $\mathscr E(1)\otimes\mathscr E(2)$, la suma de momentos angulares del cap. X da la base
$$\ket{1\!:\!n,l;\,2\!:\!n',l';\,L,M_L}\otimes\ket{S,M_S}\tag{12}$$
$$\begin{aligned}L&=l+l',\,l+l'-1,\dots,|l-l'|\\S&=1,\;0\end{aligned}\tag{13}$$
> Como los cuatro operadores son simétricos (conmutan con $P_{21}$), al antisimetrizar (12) se conservan sus valores propios. Los kets resultantes no nulos son ortogonales y forman una base de $\mathscr E(n,l;n',l')$, $\ket{n,l;n',l';L,M_L;S,M_S}$ (14), (15).
+++ Separar la permutación en orbital y espín
Con $P_{21}^{(S)}$ la permutación en el espacio de espín y $P_{21}^{(0)}$ en el orbital,
$$P_{21}^{(S)}\ket{1\!:\!\varepsilon;2\!:\!\varepsilon'}=\ket{1\!:\!\varepsilon';2\!:\!\varepsilon}\tag{16}$$
$$P_{21}^{(S)}\ket{S,M_S}=(-1)^{S+1}\ket{S,M_S}\tag{17}$$
$$P_{21}=P_{21}^{(0)}\otimes P_{21}^{(S)}\tag{18}$$
> (17) dice que el triplete es simétrico y el singlete antisimétrico (cap. X, §B-4).
+++ El ket de la base
Sustituyendo (17) y (18) en $c\,(\uno-P_{21})$:
$$\begin{aligned}&\ket{n,l;n',l';L,M_L;S,M_S}\\&=c\Big[\uno+(-1)^SP_{21}^{(0)}\Big]\\&\quad\times\ket{1\!:\!n,l;2\!:\!n',l';L,M_L}\\&\quad\otimes\ket{S,M_S}\end{aligned}\tag{19}$$
> Con $S=1$ la parte orbital lleva $\uno-P_{21}^{(0)}$: es **antisimétrica**. Con $S=0$, $\uno+P_{21}^{(0)}$: **simétrica**.
:::

**Lo que el postulado permite.** Si los electrones están en capas distintas, la parte orbital de (19) es suma o resta de dos kets ortogonales y nunca se anula: todos los $L$ y $S$ de (13) existen ($c=1/\sqrt2$). En $1s\,2s$, $(L,S)=(0,0)$ y $(0,1)$; en $1s\,2p$, $(1,0)$ y $(1,1)$.

:::pasos Dos electrones en la misma capa: L + S debe ser par
+++ Desarrollar en la base desacoplada
$$\begin{aligned}&\ket{1\!:\!n,l;2\!:\!n,l;L,M}\\&=\sum_{m,m'}\braket{l,m;l,m'}{L,M}\\&\qquad\times\ket{1\!:\!n,l,m;2\!:\!n,l,m'}\end{aligned}\tag{20}$$
+++ Simetría de los Clebsch-Gordan
$$\begin{aligned}&\braket{l,m;l',m'}{L,M}\\&=(-1)^{l+l'-L}\braket{l',m';l,m}{L,M}\end{aligned}\tag{21}$$
> Es la relación (25) del complemento B_X. Con $l=l'$ el signo es $(-1)^{2l-L}=(-1)^L$.
+++ Cómo permuta la parte orbital
Intercambiar $m\leftrightarrow m'$ en (20) y usar (21):
$$\begin{aligned}&P_{21}^{(0)}\ket{1\!:\!n,l;2\!:\!n,l;L,M}\\&\;=(-1)^L\ket{1\!:\!n,l;2\!:\!n,l;L,M}\end{aligned}\tag{22}$$
+++ Llevarlo a (19)
El corchete vale $1+(-1)^{S+L}$:
$$\begin{aligned}&\ket{\dots;L,M_L;S,M_S}=0\\&\text{si }L+S\text{ es impar}\end{aligned}\tag{23}$$
Si $L+S$ es par, el ket es simplemente $\ket{\dots;L,M_L}\otimes\ket{S,M_S}$.
> En $1s^2$, $L=0$ obliga a $S=0$: el ³S está prohibido, como ya mostró (8). En $2p^2$ sobreviven $^1S$, $^3P$ y $^1D$. Es la regla que usa el ejercicio 2 con bosones.
:::

:::comentario
El postulado ata la simetría de la parte orbital a la del espín: el ket total debe ser antisimétrico, así que $S=1$ (espín simétrico) exige orbital antisimétrico y $S=0$ (espín antisimétrico) exige orbital simétrico. De ahí sale todo lo que sigue.
:::

### 2-b · Términos espectrales {#terminos}

$W$ conmuta con el ECOC $\{\mathbf L^2,L_z,\mathbf S^2,S_z\}$, así que es **diagonal** en la base (14), con valores propios

$$\begin{aligned}\delta(L,S)=\big\langle&n,l;n',l';L,M_L;S,M_S\big|\,W\\&\big|n,l;n',l';L,M_L;S,M_S\big\rangle\end{aligned}\tag{24}$$

que no dependen de $M_L$ ni de $M_S$, porque $W$ conmuta con $\mathbf L$ y $\mathbf S$ completos (es escalar en el espacio orbital y en el de espín). Cada configuración se abre en niveles $E_c+\delta(L,S)$ con degeneración $(2L+1)(2S+1)$: los **términos espectrales**. Se nombran con la letra mayúscula de $L$ ($S,P,D,\dots$) y, arriba a la izquierda, $2S+1$.

| Configuración | Términos (degeneración) | Total |
|---|---|---|
| $1s^2$ | $^1S$ (1) | 1 |
| $1s\,2s$ | $^1S$ (1), $^3S$ (3) | 4 |
| $1s\,2p$ | $^1P$ (3), $^3P$ (9) | 12 |
| $2p^2$ | $^1S$ (1), $^3P$ (9), $^1D$ (5) | 15 |

La repulsión levanta **en parte** la degeneración de la configuración ($1s^2$, que no está degenerada, sólo se corre). Las sumas coinciden con (6) y (7): $2p^2$ da los mismos 15 estados del carbono de la sección 6.

### 2-c · Discusión: ¿por qué el triplete queda abajo? {#discusion}

#### α · Las energías de los términos de 1s 2s {#energias}

Aquí $l=l'=L=0$, y el ket orbital de (20) es simplemente $\ket{1\!:\!1s;2\!:\!2s}$ (25).

:::pasos Corrimientos del singlete y del triplete
+++ Los dos términos
Con (19):
$$\begin{aligned}\ket{^3S,M_S}=\;&\tfrac1{\sqrt2}\big(\uno-P_{21}^{(0)}\big)\\\times\,&\ket{1\!:\!1s;2\!:\!2s}\\\otimes\,&\ket{S=1,M_S}\end{aligned}\tag{26a}$$
$$\begin{aligned}\ket{^1S,0}=\;&\tfrac1{\sqrt2}\big(\uno+P_{21}^{(0)}\big)\\\times\,&\ket{1\!:\!1s;2\!:\!2s}\\\otimes\,&\ket{S=0,M_S=0}\end{aligned}\tag{26b}$$
+++ Los corrimientos
$W$ no actúa sobre el espín, así que (24) sólo ve la parte orbital:
$$\begin{aligned}\delta(^3S)=\;&\tfrac12\bra{1\!:\!1s;2\!:\!2s}\big(\uno-P_{21}^{(0)}\big)\\\times\;&W\big(\uno-P_{21}^{(0)}\big)\\\times\;&\ket{1\!:\!1s;2\!:\!2s}\end{aligned}\tag{27a}$$
y lo mismo con signos $+$ para $\delta(^1S)$ (27b).
> Se usó que $P_{21}^{(0)}$ es hermítico.
+++ Simplificar
$P_{21}^{(0)}$ conmuta con $W$ y su cuadrado es la identidad:
$$\begin{aligned}&\big(\uno\pm P_{21}^{(0)}\big)W\big(\uno\pm P_{21}^{(0)}\big)\\&=2\big(\uno\pm P_{21}^{(0)}\big)W\end{aligned}\tag{28}$$
> El mismo truco de (D-15) en la sección 5.
+++ El resultado
$$\delta(^3S)=K-J\tag{29a}$$
$$\delta(^1S)=K+J\tag{29b}$$
$$K=\bra{1\!:\!1s;2\!:\!2s}W\ket{1\!:\!1s;2\!:\!2s}\tag{30}$$
$$\begin{aligned}J&=\bra{1\!:\!1s;2\!:\!2s}P_{21}^{(0)}W\ket{1\!:\!1s;2\!:\!2s}\\&=\bra{1\!:\!2s;2\!:\!1s}W\ket{1\!:\!1s;2\!:\!2s}\end{aligned}\tag{31}$$
> $K$, la integral **directa**, corre los dos términos por igual. $J$, la de **intercambio**, los separa en $2J$. Experimentalmente, $2J\simeq0{,}8$ eV (fig. 2 del Cohen).
:::

#### β · La integral de intercambio {#integral-intercambio}

:::pasos Sólo sobrevive la repulsión
+++ Los términos de un solo electrón se anulan
Al poner (3) en (31) aparecen términos como
$$\begin{aligned}&\bra{1\!:\!2s;2\!:\!1s}V_c(R_1)\ket{1\!:\!1s;2\!:\!2s}\\&=\bra{1\!:\!2s}V_c(R_1)\ket{1\!:\!1s}\\&\quad\times\braket{2\!:\!1s}{2\!:\!2s}=0\end{aligned}\tag{32}$$
> El operador sólo actúa sobre el electrón 1, y el electrón 2 está en estados ortogonales en el bra y en el ket. Lo mismo pasa con $V_c(R_2)$, $-2e^2/R_1$ y $-2e^2/R_2$.
+++ Lo que queda
$$\begin{aligned}J=\;&\bra{1\!:\!2s;2\!:\!1s}\frac{e^2}{|\mathbf R_1-\mathbf R_2|}\\\times\;&\ket{1\!:\!1s;2\!:\!2s}\end{aligned}\tag{33}$$
> $J$ sólo depende de la repulsión entre electrones; $K$, en cambio, depende de todo $W$, incluida la elección de $V_c$.
+++ En la representación de posición
Con $\varphi_{n,l,m}(\mathbf r)=\braket{\mathbf r}{\varphi_{n,l,m}}$ (34), los estados estacionarios de un electrón en $V_c$:
$$\begin{aligned}J=\int\!\mathrm d^3r_1\,\mathrm d^3r_2\;&\varphi_{2,0,0}^*(\mathbf r_1)\,\varphi_{1,0,0}^*(\mathbf r_2)\\\times\;&\frac{e^2}{|\mathbf r_1-\mathbf r_2|}\\\times\;&\varphi_{1,0,0}(\mathbf r_1)\,\varphi_{2,0,0}(\mathbf r_2)\end{aligned}\tag{35}$$
> Es la «integral de intercambio»: la densidad de transición $\varphi_{1,0,0}^*\varphi_{2,0,0}$ del electrón 1 interactúa con la del 2. El Cohen no la calcula, pero señala que es **positiva**: por eso el triplete queda abajo.
:::

```sim
id: helio-intercambio
pie: Arriba, el diagrama de la fig. 2 del Cohen con números: la configuración (sin W), el corrimiento común K y la separación 2J entre el triplete (rojo, ortohelio) y el singlete (azul, parahelio), con la degeneración entre paréntesis. Abajo, la densidad de los dos electrones cuando están sobre una misma semirrecta que sale del núcleo, en función de sus distancias r₁ y r₂: en el triplete se anula en la diagonal r₁ = r₂ y en el singlete no. Con «partículas ficticias distinguibles» (§2-c-γ) los niveles no cambian, pero cada uno admite S = 0 y S = 1. Los números salen de un modelo propio, no del Cohen: V_c = −Ze²/r sin apantallar (así W es sólo la repulsión) y orbitales hidrogenoides de carga Z, con K y J por desarrollo multipolar; las pruebas los comparan con las fracciones exactas (17Z/81, 16Z/729…). El modelo exagera J (2J = 2,39 eV en vez de 0,8 eV para 1s 2s), porque el electrón externo debería ver una carga apantallada, pero acierta el orden: el triplete siempre abajo.
```

#### γ · El origen físico de la separación {#origen}

La diferencia está en la simetría de la parte orbital, fijada por $S$. En el **singlete**, la función de onda orbital es simétrica y los electrones tienen probabilidad no nula de estar en el mismo punto: la repulsión $e^2/r_{12}$, que es grande cuando están cerca, sube su energía. En el **triplete**, la orbital es antisimétrica y los electrones **nunca** están en el mismo punto (el hueco de Fermi del ejercicio 7): el valor medio de la repulsión es menor. Es la simulación de arriba: el triplete vacía la diagonal $r_1=r_2$.

#### δ · ¿Qué hace exactamente el postulado de simetrización? {#papel-postulado}

Podría parecer que el postulado **levanta** la degeneración. No es así: sólo fija el espín de cada término.

:::pasos El experimento mental de las partículas distinguibles
+++ Partículas ficticias
Imaginemos dos partículas con la masa, la carga y el espín del electrón, pero con alguna otra propiedad que las hace distinguibles, y el **mismo** hamiltoniano (1). No hay que simetrizar, y como $H$ no depende del espín se puede olvidar el espín y multiplicar al final las degeneraciones por 4.
+++ La configuración es doble
$\ket{1\!:\!1s;2\!:\!2s}$ y $\ket{1\!:\!2s;2\!:\!1s}$ son estados físicos **distintos** con la misma energía de $H_0$. La restricción de $W$ a ese plano es
$$\begin{pmatrix}K&J\\J&K\end{pmatrix}\tag{36}$$
> Los elementos diagonales son iguales porque $W$ es invariante ante la permutación de las dos partículas.
+++ Diagonalizar
Valores propios $K+J$ (combinación **simétrica**) y $K-J$ (**antisimétrica**).
> La simetría de los estados propios no tiene nada que ver con Pauli: viene de que $[W,P_{21}^{(0)}]=0$.
+++ Comparar con el helio
Mismos niveles y misma simetría orbital. Lo único distinto es la degeneración: con partículas distinguibles **cada** nivel admite $S=0$ y $S=1$ (4 estados cada uno). Pauli sólo prohíbe el singlete abajo y el triplete arriba, porque serían estados totales simétricos.
> La separación la produce la repulsión; el postulado decide qué espín acompaña a cada nivel.
:::

#### Hamiltoniano efectivo de espín {#efectivo}

Dentro de la configuración, el mismo resultado se obtiene reemplazando $W$ por un operador que sólo actúa sobre los espines:

:::pasos Una interacción «de espín» que es electrostática
+++ El operador
$$W_{\text{ef}}=\alpha+\beta\,\mathbf S_1\cdot\mathbf S_2\tag{37}$$
+++ Sus valores propios
$$\mathbf S_1\cdot\mathbf S_2=-\frac{3\hbar^2}{4}+\frac{\mathbf S^2}{2}\tag{38}$$
vale $+\hbar^2/4$ en el triplete y $-3\hbar^2/4$ en el singlete.
+++ Ajustar α y β
Pedir $\alpha+\beta\hbar^2/4=K-J$ y $\alpha-3\beta\hbar^2/4=K+J$:
$$\alpha=K-\frac J2\qquad\beta=-\frac{2J}{\hbar^2}\tag{39}$$
> Con $J>0$, $\beta<0$: la «interacción» favorece los espines **paralelos**.
:::

:::comentario
$W_{\text{ef}}$ tiene la forma de un acoplamiento magnético entre dos espines, pero su origen no es magnético: dos momentos magnéticos como el del electrón, separados ~1 Å, interactúan con una energía mucho menor que $J$. Lo mismo ocurre en los **ferromagnetos**: los espines tienden a alinearse porque así la parte orbital es antisimétrica y la repulsión electrostática es mínima. Los hamiltonianos de espín del tipo (37) que se usan ahí describen una física electrostática.
:::

:::pasos Comentarios del Cohen sobre 2-c
+++ La configuración 1s 2p
Igual que 1s 2s, pero con $L=1$ ($M_L=-1,0,1$): términos $^3P$ (9 estados) y $^1P$ (3), con el triplete abajo y una separación proporcional a una integral de intercambio análoga a (35). Lo mismo para todas las $1s,nl$.
+++ ¿Es legítimo usar perturbaciones?
La separación $^1S-{}^3S$ de $1s\,2s$ (≈ 0,8 eV) es **mayor** que la distancia entre configuraciones, por ejemplo $(1s\,2p)\,^3P-(1s\,2s)\,^1S\approx0{,}35$ eV. Parece que no se puede tratar $W$ como perturbación.
> Sí se puede. En toda configuración $1s,nl$, $L=l$, y $W$ conmuta con $\mathbf L$ (10): no tiene elementos de matriz entre $1s\,2s$ ($L=0$) y $1s\,2p$ ($L=1$). Sólo acopla $1s,nl$ con configuraciones mucho más altas: $1s,n'l$ con el mismo $l$, o doblemente excitadas.
:::

## 3 · Estructura fina: multipletes {#multipletes}

Hasta aquí sólo hubo interacciones electrostáticas. Los efectos relativistas y magnéticos (corrección de masa con la velocidad, espín-órbita y término de Darwin, como en el hidrógeno; y en el helio, además, el acoplamiento magnético espín-espín) son mucho menores que la separación entre términos, así que se tratan como una perturbación $W_f$ dentro de cada término.

:::pasos De los términos a los multipletes
+++ La simetría que sobrevive
$W_f$ es invariante ante una rotación **simultánea** de todas las variables orbitales y de espín, pero no ante una rotación sólo de unas u otras:
$$\mathbf J=\mathbf L+\mathbf S\tag{40}$$
$$\big[W_f,\mathbf J\big]=0\tag{41}$$
$$\big[W_f,\mathbf L\big]\neq0\qquad\big[W_f,\mathbf S\big]\neq0\tag{42}$$
+++ El subespacio de un término
Con $L$ y $S$ fijos,
$$-L\le M_L\le L\qquad-S\le M_S\le S\tag{43}$$
En él, $\mathbf J^2$ y $J_z$ forman un ECOC que conmuta con $W_f$: los niveles dependen de $J$ y no de $M_J$.
+++ Los valores de J
Por la suma de momentos angulares,
$$J=L+S,\;L+S-1,\;\dots,\;|L-S|\tag{44}$$
Cada nivel, $(2J+1)$ veces degenerado, es un **multiplete** $^{2S+1}L_J$.
> Fundamental: $^1S_0$. $1s\,2s$: $^1S_0$ y $^3S_1$. $1s\,2p$: $^1P_1$ y $^3P_2,\,^3P_1,\,^3P_0$, separados ~$10^{-4}$ eV frente a los 0,25 eV entre $^1P$ y $^3P$ (fig. 3 del Cohen).
:::

:::comentario
**Landé y el hiperfino.** En muchos átomos $W_f\simeq\sum_i\xi(R_i)\,\mathbf L_i\cdot\mathbf S_i$ (45), y con el teorema de Wigner-Eckart la energía de un multiplete es proporcional a $J(J+1)-L(L+1)-S(S+1)$: la **regla de los intervalos de Landé**. El helio no la cumple bien ($^3P_1$ y $^3P_2$ están mucho más cerca de lo predicho) porque pesa el acoplamiento dipolar entre los dos espines. Medir esa estructura fina con precisión da la constante de estructura fina $\alpha=e^2/\hbar c$. Tampoco se incluyó el efecto hiperfino: sólo existe en el $^3$He (espín nuclear ½), donde cada multiplete con $J\neq0$ se parte en $F=J\pm\tfrac12$; el núcleo del $^4$He tiene espín 0.
:::

:::resultado
- Configuraciones: $E_c=E_{n,l}+E_{n',l'}$ (4); degeneración $4(2l+1)(2l'+1)$ en capas distintas (6), $(2l+1)(4l+1)$ en la misma capa (7); $1s^2$ es un singlete (8).
- $[W,\mathbf L]=[W,\mathbf S]=0$ (10), (11) ⇒ $W$ es diagonal en la base $\ket{L,M_L;S,M_S}$; la parte orbital es simétrica si $S=0$ y antisimétrica si $S=1$ (19).
- Misma capa: sólo $L+S$ par (23). Términos $^{2S+1}L$ con degeneración $(2L+1)(2S+1)$.
- $1s,nl$: $\delta(^3L)=K-J$, $\delta(^1L)=K+J$ (29), con $K$ directa (30) y $J=\bra{2s,1s}e^2/r_{12}\ket{1s,2s}>0$ de intercambio (33), (35). Ortohelio (triplete) debajo del parahelio (singlete).
- La separación la causa la repulsión; el postulado sólo asigna el espín (36). Equivale a $W_{\text{ef}}=K-J/2-(2J/\hbar^2)\,\mathbf S_1\cdot\mathbf S_2$ (37)–(39).
- Estructura fina: $[W_f,\mathbf J]=0$ (41) ⇒ multipletes $^{2S+1}L_J$ con $J=|L-S|,\dots,L+S$ (44).
:::

:::idea-fisica
La «energía de intercambio» no es una fuerza nueva: es la repulsión de Coulomb de siempre, vista a través de la simetría que el espín impone a la parte orbital. Dos electrones con espines paralelos se evitan (el hueco de Fermi), así que se repelen menos; con espines antiparalelos en el singlete, pueden encontrarse. Por eso, en el helio, el ortohelio queda por debajo del parahelio en cada configuración excitada, y por eso, a escala macroscópica, existen los imanes: la tendencia de los espines a alinearse en un ferromagneto viene de esta misma energía electrostática, cientos de veces mayor que cualquier interacción magnética entre espines.
:::

## Esqueleto {#esqueleto}

:::esqueleto
1. **$H=H_0+W$** (1)–(3); configuraciones $1s^2$, $1s\,2s$, $1s\,2p$… con $E_c=E_{n,l}+E_{n',l'}$ (4).
2. **Degeneración:** $4(2l+1)(2l'+1)$ (6) o $(2l+1)(4l+1)$ (7); $1s^2$ singlete (8).
3. **Simetrías:** $[W,\mathbf L]=[W,\mathbf S]=0$ (10), (11) ⇒ base $\ket{L,M_L;S,M_S}$; $P_{21}^{(S)}=(-1)^{S+1}$ (17) ⇒ orbital $\uno+(-1)^SP_{21}^{(0)}$ (19).
4. **Misma capa:** $P_{21}^{(0)}=(-1)^L$ (22) ⇒ sólo $L+S$ par (23).
5. **Términos** $^{2S+1}L$, degeneración $(2L+1)(2S+1)$ (24).
6. **1s 2s:** $\delta=K\mp J$ (29); $K$ directa (30), $J$ de intercambio (31) = $\bra{2s,1s}e^2/r_{12}\ket{1s,2s}$ (33), (35) $>0$ ⇒ triplete abajo; $2J\simeq0{,}8$ eV.
7. **Postulado:** con partículas distinguibles salen los mismos niveles $K\pm J$ (36); Pauli sólo fija $S$. $W_{\text{ef}}=\alpha+\beta\,\mathbf S_1\cdot\mathbf S_2$ (37)–(39).
8. **Multipletes:** $[W_f,\mathbf J]=0$ (41), $J=|L-S|\dots L+S$ (44), notación $^{2S+1}L_J$.
:::

## Preguntas {#preguntas}

:::pregunta ¿Cuántos estados tiene la configuración $1s\,3d$ del helio y en qué términos se parte?
Capas distintas: $4(2\cdot0+1)(2\cdot2+1)=20$ estados (6). Con $L=2$ y $S=0,1$: $^1D$ (5) y $^3D$ (15). Suman 20, y el $^3D$ queda abajo.
:::

:::pregunta ¿Por qué no existe el término $^3S$ en la configuración $1s^2$?
Los dos electrones están en la misma capa con $L=0$; por (23), $L+S$ debe ser par, así que $S=0$. Dicho de otro modo: la parte orbital $\varphi_{1s}(\mathbf r_1)\varphi_{1s}(\mathbf r_2)$ es simétrica y obliga a un espín antisimétrico.
:::

:::pregunta Si $J$ fuera negativa, ¿qué término quedaría abajo?
El singlete, porque $\delta(^1S)=K+J<K-J=\delta(^3S)$. En el helio $J>0$ porque el término de intercambio de la repulsión, una «autoenergía» de la densidad de transición $\varphi_{1s}^*\varphi_{2s}$, es positivo. En moléculas puede ser al revés: en el H₂, la integral análoga de Heitler-London es negativa y el fundamental es un singlete.
:::

:::pregunta ¿Por qué $J$ sólo depende de $e^2/r_{12}$ y no de $V_c$?
Porque los términos de un electrón de $W$ (como $V_c(R_1)$) dan un producto escalar del otro electrón entre estados ortogonales, $\braket{1s}{2s}=0$ (32). $K$, en cambio, sí depende de toda $W$.
:::

:::pregunta ¿En cuántos multipletes se parte el término $^3D$ y cuántos estados tiene cada uno?
$L=2$, $S=1$: $J=3,2,1$ (44), con $7$, $5$ y $3$ estados. Suman 15, la degeneración del término.
:::

## Errores comunes {#errores-comunes}

:::error-comun Intercambiar las letras de las integrales
En el Cohen, $K$ es la directa y $J$ la de intercambio, con $\delta(^3S)=K-J$. Griffiths y otros textos usan $J$ para la directa y $K$ para la de intercambio. Lo que no cambia es la física: la separación singlete-triplete es el doble de la integral de **intercambio**, se llame $J$ o $K$.
:::

:::error-comun Creer que la separación singlete-triplete es magnética
Sale de la repulsión electrostática. El hamiltoniano efectivo $\mathbf S_1\cdot\mathbf S_2$ (37) es sólo una forma cómoda de escribirla; la interacción magnética real entre los espines es mucho más débil.
:::

:::error-comun Decir que el principio de Pauli separa los niveles
Con partículas distinguibles y el mismo hamiltoniano aparecen los mismos niveles $K\pm J$ (36). Pauli sólo prohíbe el singlete en el nivel antisimétrico y el triplete en el simétrico.
:::

:::error-comun Aplicar «$L+S$ par» a electrones en capas distintas
La restricción (23) es sólo para la misma capa ($n=n'$, $l=l'$). En $1s\,2s$ existen $^1S$ y $^3S$, aunque $L+S$ sea impar en el triplete.
:::

:::error-comun Olvidar que el fundamental del helio está fijado por la simetrización
$H_0$ no depende del espín, pero el fundamental $1s^2$ tiene necesariamente $S=0$ (8): no hay ortohelio en $1s^2$.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento B_XIV, pp. 1467–1480: ecuaciones (1) a (45), figuras 1 a 3, notas 1 a 7.
- Mismos autores, cap. X, §B-4 (suma de dos espines ½) y complemento B_X (simetría de los coeficientes de Clebsch-Gordan); cap. XII, §B-1 (estructura fina del hidrógeno).
- Sección 6 (campo central), sección 5 (directo e intercambio) y ejercicio 7 (hueco de Fermi) de esta página; el ejercicio 2 aplica la regla «$L+S$ par» a dos bosones.
- Referencias que da el Cohen: Kuhn, cap. III-B; Slater; Bethe y Salpeter; Landau y Lifshitz, §§64–65; Sobel'man, §19.6 (hamiltoniano de Breit).
