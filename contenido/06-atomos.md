---
titulo: Átomos de muchos electrones
numero: 6
cohen: Complemento A_XIV · pp. 1459–1466
resumen: En un átomo de Z electrones la repulsión entre ellos impide resolver el problema exacto. La aproximación de campo central la reemplaza por un potencial central promedio, y el átomo pasa a ser un sistema de fermiones independientes. Llenar las capas (n, l) de abajo hacia arriba con el principio de Pauli da las configuraciones electrónicas y, con ellas, la tabla periódica.
---

:::idea-central
La repulsión entre electrones no es pequeña (vale entre un cuarto y la mitad de la atracción del núcleo), así que no sirve tratarla como perturbación. La salida es repartirla: cada electrón siente el núcleo **apantallado** por la nube de los otros, un potencial central $V_c(r)$ que va de $-Ze^2/r$ cerca del núcleo a $-e^2/r$ lejos. Con ese potencial los electrones son **independientes**, la energía depende de $n$ **y** de $l$, y el estado fundamental se arma como en la sección 4: un determinante de Slater con los estados individuales más bajos que permite Pauli.
:::

:::nota
Este complemento es cualitativo: el Cohen no calcula $V_c(r)$, sólo dice cómo debe comportarse. Las ecuaciones llevan la numeración del complemento A_XIV, (1) a (15). Es la respuesta a la pregunta guía del curso sobre la **estructura electrónica** de la materia: la tabla periódica es el principio de Pauli aplicado capa por capa.
:::

## 1 · La aproximación de campo central {#campo-central}

Tomamos un átomo de $Z$ electrones. El núcleo pesa miles de veces más que los electrones, así que el centro de masa coincide en la práctica con él y lo dejamos quieto en el origen (se desprecia el efecto de masa finita). Sin correcciones relativistas y, en particular, sin términos que dependan del espín, el hamiltoniano de los electrones es

$$\begin{aligned}H=\sum_{i=1}^{Z}\frac{\mathbf P_i^2}{2m_e}&-\sum_{i=1}^{Z}\frac{Ze^2}{R_i}\\&+\sum_{i<j}\frac{e^2}{|\mathbf R_i-\mathbf R_j|}\end{aligned}\tag{1}$$

$$e^2=\frac{q^2}{4\pi\varepsilon_0}\tag{2}$$

con $q$ la carga del electrón. Los tres términos son la energía cinética, la atracción que el núcleo, de carga $-Zq=Z|q|$, ejerce sobre cada electrón y la repulsión entre electrones, sumada sobre los $Z(Z-1)/2$ pares distintos. La numeración de los electrones es arbitraria; $H$ es simétrico ante cualquier permutación, como pide el capítulo.

### 1-a · Por qué no basta la teoría de perturbaciones {#dificultad}

Sin el último término de (1) los electrones serían independientes: cada uno, un átomo de hidrógeno de carga $Z$ (cap. VII), y el estado del átomo, el producto antisimetrizado de sus estados. Todo el problema está en la repulsión.

:::pasos ¿Qué tan grande es la repulsión?
+++ Estimar las distancias
La distancia media entre dos electrones, $|\mathbf R_i-\mathbf R_j|$, es del orden de la distancia de un electrón al núcleo, $R_i\sim r$.
> Es una estimación de órdenes de magnitud, no un cálculo: basta para decidir si la repulsión es una corrección.
+++ Contar los términos
La atracción tiene $Z$ términos de tamaño $Ze^2/r$; la repulsión, $Z(Z-1)/2$ términos de tamaño $e^2/r$.
> La repulsión crece como $Z^2$, igual que la atracción: no se vuelve despreciable en los átomos pesados.
+++ El cociente
$$\eta\simeq\frac{Z(Z-1)/2}{Z\cdot Z}=\frac{Z-1}{2Z}\tag{3}$$
> $\eta=1/4$ para el helio, $1/3$ para el litio y tiende a $1/2$ si $Z\gg1$.
+++ Conclusión
Una perturbación de un cuarto puede dar algo razonable para el helio (complemento B, sección 7), pero desde el litio está fuera de cuestión.
> Hace falta un método que meta la mayor parte de la repulsión en el problema de orden cero.
:::

### 1-b · El potencial central {#principio}

Fijémonos en un electrón $(i)$. En primera aproximación, los otros $Z-1$ sólo le importan porque su carga **compensa en parte** la del núcleo. Entonces $(i)$ se mueve en un potencial que depende sólo de su posición y recoge el efecto **promedio** de la repulsión de los demás; si lo tomamos con simetría esférica, es el **potencial central** $V_c(r)$ del átomo.

Es una aproximación con dos defectos claros: ignora las **correlaciones** (el movimiento de $(i)$ influye en el de los otros) y, cuando $(i)$ pasa muy cerca de otro electrón, la fuerza dominante es la de ése, que no es central. Pero en cuántica la idea funciona mejor que en clásica: los electrones están **deslocalizados** y su carga está repartida en una nube extensa.

:::pasos Separar H en una parte de electrones independientes y un resto
+++ Sumar y restar el potencial central
$$H=\sum_{i=1}^{Z}\left[\frac{\mathbf P_i^2}{2m_e}+V_c(R_i)\right]+W\tag{4}$$
> Es una identidad: se suma $\sum V_c(R_i)$ y se resta dentro de $W$.
+++ El resto $W$
$$\begin{aligned}W=-\sum_{i=1}^{Z}\frac{Ze^2}{R_i}&+\sum_{i<j}\frac{e^2}{|\mathbf R_i-\mathbf R_j|}\\&-\sum_{i=1}^{Z}V_c(R_i)\end{aligned}\tag{5}$$
> Si $V_c$ está bien elegido, $W$ es la parte de la repulsión que el promedio no capta: debería ser **pequeña**.
+++ Despreciar $W$
La aproximación de campo central se queda con
$$H_0=\sum_{i=1}^{Z}\left[\frac{\mathbf P_i^2}{2m_e}+V_c(R_i)\right]\tag{6}$$
> $W$ se tratará como perturbación de $H_0$ en el complemento B (sección 7).
+++ Un problema de una partícula
$H_0$ es una suma de términos idénticos de una partícula: sus estados propios salen de los del hamiltoniano de **un** electrón,
$$\frac{\mathbf P^2}{2m_e}+V_c(R)\tag{7}$$
> Es exactamente la situación de la sección 4 (§D-1-a): partículas idénticas **independientes**. Los estados propios de $H_0$ son determinantes de Slater.
:::

:::comentario
(4) y (5) **no fijan** $V_c$: $H=H_0+W$ vale para cualquier $V_c(r)$. Hay que escogerlo para que $W$ sea lo más pequeño posible, y eso es un problema circular. El potencial que siente un electrón depende de cómo están repartidos los otros, y esa distribución depende de sus funciones de onda, que a su vez se calculan con $V_c$. La solución debe ser **autoconsistente**: las funciones de onda calculadas con $V_c$ deben dar una nube de carga que reproduzca el mismo $V_c$. Así trabajan los métodos de Hartree y Hartree-Fock (cap. XI del Cohen).
:::

### 1-c · Los niveles de energía {#niveles}

Aunque el cálculo exacto de $V_c$ es largo, sus dos extremos son fáciles de prever.

:::pasos Cómo es V_c(r)
+++ Cerca del núcleo
Para $r$ pequeño, el electrón está **dentro** de la nube de los otros $Z-1$. Una capa esférica de carga no ejerce fuerza en su interior, así que sólo ve el núcleo: $V_c(r)\simeq-Ze^2/r$.
> Ésta es la mitad de (8) para $r$ pequeño.
+++ Lejos del núcleo
Para $r$ grande, está **fuera** de la nube, que actúa como una carga puntual en el origen. Núcleo ($+Z$) y nube ($-(Z-1)$) suman $+1$:
$$V_c(r)\simeq\begin{cases}-\dfrac{e^2}{r}&r\ \text{grande}\\[6pt]-\dfrac{Ze^2}{r}&r\ \text{pequeño}\end{cases}\tag{8}$$
> Los $Z-1$ electrones **apantallan** al núcleo. En medio, la forma de $V_c$ depende del átomo (fig. 1 del Cohen).
+++ Se rompe la degeneración del hidrógeno
$V_c$ no es proporcional a $1/r$, así que desaparece la degeneración **accidental** en $l$ del hidrógeno (cap. VII, §C-4-b): la energía depende de $n$ y de $l$. Sigue sin depender de $m$, porque $V_c$ es central. Como en el hidrógeno, $n$ es $l$ más el número cuántico radial más uno, de modo que
$$0\le l\le n-1\tag{9}$$
+++ Orden en $n$
A $l$ fijo, más nodos radiales es más energía:
$$E_{n,l}<E_{n',l}\quad\text{si}\quad n<n'\tag{10}$$
+++ Orden en $l$
A $n$ fijo, el estado de menor $l$ es el más **penetrante**: tiene más probabilidad cerca del núcleo, donde el apantallamiento es menor, y queda más ligado:
$$E_{n,0}<E_{n,1}<\dots<E_{n,n-1}\tag{11}$$
> Es (8) en acción: cuanto más tiempo pasa el electrón en la región de $-Ze^2/r$, más baja su energía.
:::

Resulta que la **jerarquía** de los niveles es casi la misma en todos los átomos, aunque los valores absolutos cambien con $Z$. La fig. 2 del Cohen la resume (es esquemática, sin escala de energía), y cada nivel tiene degeneración $2(2l+1)$ por el espín:

$$\begin{aligned}&1s\;|\;2s\;|\;2p\;|\;3s\;|\;3p\;|\;[4s\;3d]\;|\;4p\\&|\;[5s\;4d]\;|\;5p\;|\;[6s\;4f\;5d]\;|\;6p\;|\;\dots\end{aligned}$$

Los niveles entre corchetes están muy cerca y su orden puede cambiar de un átomo a otro. Compárese con el hidrógeno, donde $3s$, $3p$ y $3d$ tienen la misma energía: aquí no sólo se separan, sino que el $4s$ queda **por debajo** del $3d$, porque es mucho más penetrante. Lo mismo pasa con $5s$ y $4d$, o con $6s$ y $4f$. Esas inversiones muestran lo importante que es la repulsión entre electrones.

## 2 · Configuraciones electrónicas {#configuraciones}

En la aproximación de campo central, los estados propios de $H_0$ son determinantes de Slater construidos con los estados individuales $(n,l,m,m_s)$. Es la situación de la sección 4: el **fundamental** se obtiene ocupando los estados individuales más bajos compatibles con el principio de Pauli.

:::pasos Capas, configuraciones y el llenado
+++ Capa
El conjunto de estados individuales con la misma energía $E_{n,l}$ es una **capa**. Admite como máximo $2(2l+1)$ electrones: $2$ en una $s$, $6$ en una $p$, $10$ en una $d$, $14$ en una $f$.
> El factor 2 es el espín; $2l+1$, los valores de $m$. Con Pauli, cada estado individual admite un electrón a lo sumo.
+++ Configuración
La lista de capas ocupadas, con cuántos electrones tiene cada una, es la **configuración** electrónica. Se escribe con exponentes: $1s^2\,2s^2\,2p^3$.
+++ Llenar de abajo hacia arriba
Se van llenando las capas en el orden de la fig. 2, empezando por $1s$, hasta agotar los $Z$ electrones. Hidrógeno: $1s$. Después
$$\text{He}:\;1s^2\tag{12}$$
> Los dos electrones tienen la misma función de onda espacial y espines ortogonales.
+++ Litio
La capa $1s$ ya está llena, así que el tercer electrón va al nivel siguiente, $2s$:
$$\text{Li}:\;1s^2\,2s\tag{13}$$
> Por eso el litio es químicamente parecido al hidrógeno: un electrón solo, fuera de una capa cerrada.
+++ Berilio, y de ahí en adelante
$$\text{Be}:\;1s^2\,2s^2\tag{14}$$
Desde $Z=5$ se llena la $2p$ (B, C, N, O, F, Ne), luego $3s$ (Na, Mg), $3p$ (Al … Ar), $4s$ (K, Ca), $3d$ (Sc … Zn), y así.
> Los elementos con la misma capa externa a medio llenar se parecen químicamente: es la clasificación de Mendeleiev.
:::

```sim
id: configuraciones
pie: Arriba, las capas en el orden de energía de la fig. 2 del Cohen (de abajo hacia arriba), con un círculo por estado individual; los rellenos son los electrones del elemento elegido y la cifra de la derecha es «ocupados/capacidad». Los corchetes de la izquierda marcan los niveles muy cercanos. Dentro de una capa el orden de los círculos no significa nada: en H₀ todos esos estados tienen la misma energía, y por eso el fundamental de una capa abierta está degenerado (lectura «degeneración»). Con ▶ se recorre la tabla hasta el radón. La casilla cambia el llenado ideal por el real en las excepciones conocidas (dato externo al Cohen, que sólo nombra Cr, Cu y Nb). Abajo, la carga efectiva que ve un electrón, −r V_c(r)/e²: vale Z junto al núcleo y 1 lejos, como dice (8). Su forma intermedia es un modelo propio de apantallamiento exponencial con la escala de Thomas-Fermi, a = 0,885 a₀ Z^(−1/3), no un cálculo autoconsistente.
```

:::comentario
**Llenado irregular.** Cuando dos capas están muy cerca (las de un mismo corchete), el orden de llenado real puede no seguir la fig. 2. El cromo ($Z=24$), en lugar de $4s^2\,3d^4$, tiene **cinco** electrones $3d$ con la $4s$ incompleta, $4s\,3d^5$; algo parecido pasa con el cobre ($Z=29$, $4s\,3d^{10}$), el niobio ($Z=41$) y otros. La aproximación de campo central no puede decidir estos casos finos: ahí manda la parte de la repulsión que quedó en $W$.
:::

:::pasos Tres consecuencias de la regla de llenado (comentarios del Cohen)
+++ Configuraciones excitadas
Las primeras excitaciones de $H_0$ llevan un electrón a un nivel por encima de la última capa ocupada. En el helio, la primera configuración excitada es
$$1s\,2s\tag{15}$$
> Es el punto de partida del complemento B (sección 7).
+++ Capas cerradas: fundamental no degenerado
Si la configuración termina en una capa **completa**, hay tantos estados individuales disponibles como electrones: un único determinante de Slater, y el fundamental **no** está degenerado. Pasa en los gases nobles ($\dots p^6$) y en los alcalinotérreos ($\dots s^2$).
> Si la capa externa está incompleta, hay que **elegir** qué estados ocupan los electrones, y cada elección es un determinante distinto con la misma energía.
+++ Contar la degeneración
Con $k$ electrones en una capa de $g=2(2l+1)$ estados, hay $\binom gk$ determinantes. Alcalinos ($\dots s^1$): $\binom21=2$. Carbono ($1s^2\,2s^2\,2p^2$): dos estados elegidos entre los seis de la $2p$,
$$\binom62=15$$
> La repulsión residual $W$ parte esos 15 estados en **términos** espectrales; es lo que hace el complemento B con el helio y el ejercicio 2 con dos bosones.
+++ Momento angular de una capa cerrada
Se puede mostrar que una capa completa tiene momento angular orbital total, espín total y momento angular total **nulos**. El momento angular electrónico del átomo lo ponen sólo los electrones externos: el helio en su fundamental tiene $J=0$ y un alcalino, $J=\tfrac12$ (un electrón $s$ de espín ½).
> Al momento angular del átomo hay que sumarle el del núcleo, que es otro asunto.
:::

:::nota
**Conexión nuclear.** Las mismas ideas sirven para el núcleo: los nucleones son fermiones (protones y neutrones, cada uno con su principio de Pauli) y en el **modelo de capas** se mueven en un potencial promedio creado por los demás. Las capas cerradas dan los «números mágicos» de núcleos especialmente estables. El Cohen remite a las referencias de física nuclear de este complemento (Mayer, Peierls, Baranger).
:::

:::resultado
- $H=H_0+W$ con $H_0=\sum_i[\mathbf P_i^2/2m_e+V_c(R_i)]$ (6): en $H_0$ los electrones son **independientes** y los estados son determinantes de Slater.
- $V_c(r)\simeq-Ze^2/r$ cerca del núcleo y $-e^2/r$ lejos (8); se elige de forma **autoconsistente**.
- La energía de un electrón depende de $n$ y $l$ (no de $m$): sube con $n$ (10) y, a $n$ fijo, con $l$ (11), por la penetración. El $4s$ queda por debajo del $3d$.
- Capa $(n,l)$: $2(2l+1)$ estados. El fundamental llena las capas en el orden de la fig. 2 con Pauli: He $1s^2$ (12), Li $1s^2\,2s$ (13), Be $1s^2\,2s^2$ (14)… Las irregularidades (Cr, Cu, Nb) ocurren entre capas casi degeneradas.
- Capas cerradas: fundamental no degenerado y $L=S=J=0$. Capa abierta con $k$ de $g$ electrones: $\binom gk$ estados (carbono, 15).
:::

:::idea-fisica
La tabla periódica es el principio de Pauli hecho química. Si los electrones fueran bosones, todos caerían al $1s$ y todos los átomos se parecerían: no habría capas externas distintas, ni valencia, ni química. Como son fermiones, cada electrón nuevo tiene que ir a un estado libre, y el último en entrar, el que está en la capa externa y menos ligado, decide cómo se enlaza el átomo. El apantallamiento añade el otro ingrediente: separa los niveles de un mismo $n$ según $l$ y fija el orden en que las capas se ocupan, que es el orden de los períodos.
:::

## Esqueleto {#esqueleto}

:::esqueleto
1. **Hamiltoniano:** cinética $-\sum Ze^2/R_i+\sum_{i<j}e^2/|\mathbf R_i-\mathbf R_j|$ (1); la repulsión es del orden de $\eta=(Z-1)/2Z$ de la atracción (3): no es perturbación.
2. **Campo central:** $H=\sum[\mathbf P_i^2/2m_e+V_c(R_i)]+W$ (4), (5); se desprecia $W$: $H_0$ (6), electrones independientes (7).
3. **$V_c$ autoconsistente**, con $-Ze^2/r$ cerca y $-e^2/r$ lejos (8).
4. **Niveles $E_{n,l}$:** $0\le l\le n-1$ (9), suben con $n$ (10) y con $l$ (11) por la penetración; $4s<3d$.
5. **Capa** = $2(2l+1)$ estados; **configuración** = capas ocupadas; se llenan con Pauli en el orden de la fig. 2: He (12), Li (13), Be (14).
6. **Consecuencias:** excitada $1s\,2s$ del He (15); capa cerrada ⇒ un determinante, no degenerado, $L=S=J=0$; capa abierta ⇒ $\binom gk$ (carbono 15).
:::

## Preguntas {#preguntas}

:::pregunta ¿Por qué el sodio ($Z=11$) se parece químicamente al litio y no al neón?
Na es $1s^2\,2s^2\,2p^6\,3s$: un electrón $s$ fuera de una capa cerrada, como Li ($1s^2\,2s$). El neón, $1s^2\,2s^2\,2p^6$, sólo tiene capas cerradas: fundamental no degenerado, $J=0$ y nada «suelto» para enlazarse.
:::

:::pregunta ¿Cuántos estados tiene el fundamental del nitrógeno en la aproximación de campo central?
N es $1s^2\,2s^2\,2p^3$: tres electrones en los seis estados de la $2p$, $\binom63=20$ determinantes con la misma energía de $H_0$.
:::

:::pregunta ¿Por qué el potasio ($Z=19$) pone su último electrón en $4s$ y no en $3d$?
Porque el $4s$ es mucho más penetrante que el $3d$ ($l=0$ frente a $l=2$): pasa más tiempo cerca del núcleo, donde ve casi toda la carga $Ze^2/r$, y queda más ligado. Es la inversión de la fig. 2, imposible en el hidrógeno.
:::

:::pregunta Si en (4) se cambia $V_c$ por otro potencial central cualquiera, ¿cambia $H$?
No: $H=H_0+W$ es una identidad para cualquier $V_c$. Cambia el reparto entre $H_0$ y $W$, y con él la calidad de la aproximación $H\simeq H_0$. El $V_c$ bueno es el que deja $W$ pequeño, y se obtiene de forma autoconsistente.
:::

:::pregunta ¿Por qué el helio, con $\eta=1/4$, sí admite un tratamiento perturbativo de la repulsión?
Porque $1/4$ ya es una corrección moderada, y además el helio tiene sólo un par de electrones. Es lo que hace el complemento B: arranca de $H_0$ y trata $W$ (o toda la repulsión) a primer orden. Para $Z\ge3$, con $\eta\ge1/3$ y muchos pares, eso deja de funcionar.
:::

## Errores comunes {#errores-comunes}

:::error-comun Usar los niveles del hidrógeno para un átomo de muchos electrones
En el hidrógeno $E$ sólo depende de $n$. Con apantallamiento depende de $n$ y $l$, y el orden cambia: $4s$ antes que $3d$, $6s$ antes que $4f$.
:::

:::error-comun Creer que la aproximación de campo central desprecia la repulsión
No la desprecia: mete su parte **promedio** en $V_c$ y desprecia sólo el resto, $W$. Despreciarla entera ($V_c=-Ze^2/r$) sería la aproximación de electrones hidrogenoides, mucho peor.
:::

:::error-comun Pensar que la regla de llenado es exacta
Es la del fundamental de $H_0$. Entre capas casi degeneradas, el orden real puede cambiar (Cr $4s\,3d^5$, Cu $4s\,3d^{10}$).
:::

:::error-comun Olvidar el espín al contar la capacidad de una capa
Una capa $(n,l)$ tiene $2l+1$ orbitales pero $2(2l+1)$ estados individuales: cada orbital admite dos electrones con espines opuestos.
:::

:::error-comun Confundir la degeneración de la capa con la del átomo
La capa $2p$ tiene 6 estados; el fundamental del carbono, con dos electrones ahí, tiene $\binom62=15$ estados de dos electrones, no 6 ni $6^2$.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento A_XIV, pp. 1459–1466: ecuaciones (1) a (15), figuras 1 y 2, comentarios (i) a (iii).
- Mismos autores, cap. XIV, §D-1-a (estado fundamental de partículas independientes; sección 4 de esta página) y complemento B_XIV (sección 7).
- Referencias que da el Cohen: Pauling y Wilson, cap. IX; Levine, cap. 11; Slater, cap. 6; Landau y Lifshitz, §§68–70; para el modelo de capas nuclear, Mayer, Peierls y Baranger.
