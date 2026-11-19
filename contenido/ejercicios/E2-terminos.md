---
titulo: Términos espectrales de dos bosones de espín 1
numero: 2
cohen: Cohen, complemento D del cap. XIV · p. 1496
resumen: Dos bosones idénticos de espín 1 en un mismo potencial central, en las configuraciones 1s², 1s 2s y 2p². Se adapta el método del helio (complemento B): el espín total puede ser 0, 1 o 2, y la simetría de cada estado de espín decide qué valores de L permite el postulado. Resultado: 1s² da ¹S y ⁵S; 1s 2s, ¹S, ³S y ⁵S; 2p², ¹S, ⁵S, ³P, ¹D y ⁵D.
---

## Enunciado {#enunciado}

Un sistema de dos bosones idénticos de espín $s=1$ está en un mismo potencial central $V(r)$. ¿Cuáles son los términos espectrales (complemento B_XIV, §2-b) que corresponden a las configuraciones $1s^2$, $1s\,2s$ y $2p^2$?

## Qué piden y estrategia {#estrategia}

Es la sección 7 con dos cambios: las partículas son **bosones** (el ket total debe ser simétrico) y su espín es **1**, no ½. El plan:

1. Como en el helio, si la interacción entre las partículas no depende del espín, $\{\mathbf L^2,L_z,\mathbf S^2,S_z\}$ es un ECOC dentro de cada configuración y los niveles son **términos** $^{2S+1}L$ con degeneración $(2L+1)(2S+1)$.
2. Sumar dos espines 1: $S=0,1,2$. Averiguar cómo se comporta cada $\ket{S,M_S}$ ante el intercambio.
3. Capas distintas: todos los $(L,S)$ están permitidos. Misma capa: la parte orbital con momento $L$ tiene simetría $(-1)^L$ (relación (22) del complemento B) y el producto de las dos simetrías debe ser $+1$.
4. Comprobar contando estados: la suma de las degeneraciones debe dar el número de estados simétricos de dos bosones en la configuración.

## Solución paso a paso {#solucion}

### El espín total de dos partículas de espín 1 {#espin}

:::pasos Simetría de los estados |S, M_S⟩
+++ Valores posibles
Por la suma de momentos angulares, $\mathbf S=\mathbf S_1+\mathbf S_2$ con $s_1=s_2=1$ da
$$S=2,\;1,\;0$$
con $5+3+1=9=3\times3$ estados.
> Cada partícula tiene tres estados de espín, $m_s=1,0,-1$.
+++ Cómo permuta un estado acoplado
La relación de simetría de los coeficientes de Clebsch-Gordan, (21) del complemento B_XIV con $l=l'=s$, da
$$\begin{aligned}&\braket{s,m;s,m'}{S,M}\\&=(-1)^{2s-S}\braket{s,m';s,m}{S,M}\end{aligned}$$
y, como en (22),
$$P_{21}^{(S)}\ket{S,M_S}=(-1)^{2s-S}\ket{S,M_S}$$
> Para $s=\tfrac12$ es $(-1)^{1-S}=(-1)^{S+1}$: la relación (17) del helio.
+++ Para $s=1$
$$P_{21}^{(S)}\ket{S,M_S}=(-1)^S\ket{S,M_S}$$
$S=2$ y $S=0$ son **simétricos**; $S=1$ es **antisimétrico**.
> Comprobación con $M_S=0$: el estado de $S=1$ es $\tfrac1{\sqrt2}\big(\ket{1\!:\!1;2\!:\!-1}-\ket{1\!:\!-1;2\!:\!1}\big)$, que cambia de signo al permutar. El de $S=2$, $M_S=2$, es $\ket{1\!:\!1;2\!:\!1}$, evidentemente simétrico.
+++ La condición para bosones
El ket total es el producto de la parte orbital y la de espín, $P_{21}=P_{21}^{(0)}\otimes P_{21}^{(S)}$ (18). Para bosones debe valer $+1$:
$$\text{orbital simétrica}\iff S=0,2$$
$$\text{orbital antisimétrica}\iff S=1$$
> Es al revés que con electrones, donde el singlete ($S=0$) va con la orbital simétrica y el triplete con la antisimétrica.
:::

### Configuración 1s² {#1s2}

:::pasos Dos bosones en la capa 1s
+++ La parte orbital
Las dos partículas están en el mismo orbital: $\varphi_{100}(\mathbf r_1)\varphi_{100}(\mathbf r_2)$, con $L=0$. Es **simétrica**.
> Con una sola función orbital no se puede formar una combinación antisimétrica.
+++ El espín
La orbital simétrica exige espín simétrico: $S=0$ o $S=2$.
+++ Los términos
$$1s^2:\quad{}^1S,\ {}^5S$$
con degeneraciones $1$ y $5$.
> $L+S$ par, como en (23): $0+0$ y $0+2$. El $^3S$ ($L+S=1$) está prohibido.
+++ Contar estados
Los estados individuales de la capa son $3$ (el espín; $m=0$). Los estados **simétricos** de dos bosones en 3 estados individuales son los pares no ordenados con repetición:
$$\binom32+3=\frac{3\cdot4}2=6=1+5$$
> Para dos electrones en $1s$ (2 estados individuales y sin repetición) sale $\binom22=1$: sólo $^1S$. Los bosones de espín 1 tienen además el $^5S$.
:::

### Configuración 1s 2s {#1s2s}

:::pasos Una partícula en 1s y otra en 2s
+++ Dos combinaciones orbitales
Con $L=0$, $\ket{1\!:\!1s;2\!:\!2s}$ y $\ket{1\!:\!2s;2\!:\!1s}$ son ortogonales, así que se forman
$$\tfrac1{\sqrt2}\big(\uno\pm P_{21}^{(0)}\big)\ket{1\!:\!1s;2\!:\!2s}$$
una simétrica y otra antisimétrica, ninguna nula.
> Es la situación de (26a) y (26b) del helio.
+++ Emparejar con el espín
La orbital simétrica va con $S=0,2$; la antisimétrica, con $S=1$.
+++ Los términos
$$1s\,2s:\quad{}^1S,\ {}^3S,\ {}^5S$$
con degeneraciones $1$, $3$ y $5$.
> En capas distintas aparecen todos los valores de $S$.
+++ Contar estados
Por (6) generalizada a espín $s$: $(2s+1)^2(2l+1)(2l'+1)=9\cdot1\cdot1=9=1+3+5$.
:::

### Configuración 2p² {#2p2}

:::pasos Dos bosones en la capa 2p
+++ Los valores de L
Dos momentos $l=1$ dan $L=2,1,0$.
+++ Simetría de la parte orbital
En la misma capa, por (22) del complemento B,
$$\begin{aligned}&P_{21}^{(0)}\ket{1\!:\!2p;2\!:\!2p;L,M_L}\\&=(-1)^L\ket{1\!:\!2p;2\!:\!2p;L,M_L}\end{aligned}$$
$L=0$ y $L=2$ son simétricas; $L=1$ es antisimétrica.
> Es el mismo argumento que para el espín, ahora con los Clebsch-Gordan de $l=l'=1$.
+++ Bosones: el producto debe ser +1
$(-1)^L(-1)^S=+1$, es decir, $L+S$ **par**:

| $L$ (orbital) | $S$ | Términos |
|---|---|---|
| 0 (sim.) | 0, 2 | $^1S$, $^5S$ |
| 1 (antisim.) | 1 | $^3P$ |
| 2 (sim.) | 0, 2 | $^1D$, $^5D$ |

> La regla «$L+S$ par» es la misma que para dos electrones, pero por razones distintas: allí el espín da $(-1)^{S+1}$ y el total debe ser $-1$; aquí el espín da $(-1)^S$ y el total debe ser $+1$.
+++ Los términos
$$2p^2:\quad{}^1S,\ {}^5S,\ {}^3P,\ {}^1D,\ {}^5D$$
con degeneraciones $1$, $5$, $9$, $5$ y $25$.
+++ Contar estados
La capa $2p$ tiene $g=3\times3=9$ estados individuales ($m$ y $m_s$). Los estados simétricos de dos bosones son
$$\frac{g(g+1)}2=\frac{9\cdot10}2=45$$
y $1+5+9+5+25=45$.
> La cuenta cierra: ningún estado sobra ni falta.
:::

## Resultado {#resultado}

:::resultado
Para dos bosones idénticos de espín 1 ($P_{21}^{(S)}=(-1)^S$: $S=0,2$ simétricos, $S=1$ antisimétrico):

| Config. | Términos (degeneración) |
|---|---|
| $1s^2$ | $^1S$ (1), $^5S$ (5): 6 estados |
| $1s\,2s$ | $^1S$ (1), $^3S$ (3), $^5S$ (5): 9 estados |
| $2p^2$ | $^1S$ (1), $^5S$ (5), $^3P$ (9), $^1D$ (5), $^5D$ (25): 45 estados |

En la misma capa sólo aparecen los términos con $L+S$ par.
:::

## Verificación {#verificacion}

- **Conteo.** Las degeneraciones suman el número de estados simétricos de la configuración: $g(g+1)/2$ en la misma capa (6 y 45) y $g_1g_2$ en capas distintas (9).
- **Límite conocido.** Con electrones (espín ½, antisimétricos) el mismo método da $1s^2\to{}^1S$ y $2p^2\to{}^1S,{}^3P,{}^1D$, los términos del complemento B (§2-b) y los 15 estados del carbono de la sección 6.
- **Método independiente.** La simulación no usa la regla «$L+S$ par»: arma todos los estados físicos de dos partículas con $m$ y $m_s$ definidos, cuenta cuántos hay con cada $(M_L,M_S)$ y «pela» los términos desde el $(M_L,M_S)$ más alto. Las pruebas comparan con la regla de paridad calculada en Python.

```sim
id: ej2-terminos
pie: Arriba, la tabla del número de estados de dos partículas con cada (M_L, M_S): cada término ^{2S+1}L ocupa un rectángulo |M_L| ≤ L, |M_S| ≤ S, y los términos se obtienen quitando rectángulos desde la esquina más alta. Abajo, los términos que resultan con su degeneración (2L+1)(2S+1). Cambia a «electrones» para recuperar los términos del helio y del carbono, o a «bosones de espín 0», donde sólo sobreviven los L pares.
```

## Entendimiento físico {#entendimiento}

:::idea-fisica
La regla de qué términos existen sale de un solo hecho: el ket total debe tener la simetría que manda la estadística, y tanto la parte orbital como la de espín tienen una simetría **definida** en cada término, $(-1)^L$ y $(-1)^{2s-S}$. Con electrones el producto debe dar $-1$; con bosones, $+1$. Por eso un mismo cálculo de momentos angulares produce listas distintas: el $^5S$ de $1s^2$ existe para bosones de espín 1 y no tiene análogo electrónico, porque dos fermiones de espín ½ no pueden tener espín total 2 y, en el mismo orbital, sólo pueden ser singlete.

Como en el helio, el postulado no reparte las energías: si la interacción entre los bosones no depende del espín, los términos con la misma parte orbital (por ejemplo $^1S$ y $^5S$ de $1s^2$) quedan **degenerados** a primer orden, porque la energía sólo depende de la simetría orbital. Lo que hace el postulado es decidir qué espines acompañan a cada parte orbital.
:::

:::error-comun Usar para bosones la relación de espín de los electrones
$P_{21}^{(S)}=(-1)^{S+1}$ vale para $s=\tfrac12$. Para $s=1$ es $(-1)^S$: el estado de espín total 1 es antisimétrico, no simétrico.
:::

:::error-comun Aplicar «L + S par» a capas distintas
En $1s\,2s$ hay una combinación orbital simétrica y otra antisimétrica, ambas no nulas: aparecen todos los $S$, también el $^3S$ con $L+S$ impar.
:::

## ¿Qué pasa si…? {#que-pasa-si}

:::pregunta ¿Y si los bosones tuvieran espín 0?
Sólo hay $S=0$, simétrico, así que la parte orbital debe ser simétrica: en $2p^2$ sobreviven $^1S$ y $^1D$ (6 estados, $3\cdot4/2$), y el $^1P$ está prohibido. Es la versión atómica del ejercicio 6: dos bosones idénticos de espín 0 sólo tienen momento angular relativo par.
:::

:::pregunta ¿Cuáles son los términos de la configuración $1s\,2p$ para los mismos bosones?
Capas distintas: $L=1$ y todos los $S$, $^1P$, $^3P$ y $^5P$, con $3+9+15=27=9\cdot3$ estados.
:::

:::pregunta ¿Cuál es la degeneración total de $3d^2$ para dos bosones de espín 1?
$g=5\cdot3=15$ estados individuales, $15\cdot16/2=120$ estados. Los términos son los de $L+S$ par con $L=0,\dots,4$: $^1S$, $^5S$, $^3P$, $^1D$, $^5D$, $^3F$, $^1G$, $^5G$ (la simulación los cuenta).
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento D_XIV, ejercicio 2, p. 1496. Usa el complemento B_XIV, §2-a y §2-b, relaciones (17), (18), (21)–(23).
- Sección 7 de esta página (átomo de helio) y sección 6 (configuraciones y el carbono).
