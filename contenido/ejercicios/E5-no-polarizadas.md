---
titulo: Colisión de partículas idénticas no polarizadas
numero: 5
cohen: Cohen, complemento D del cap. XIV · p. 1497
resumen: Si no se conocen los espines iniciales, a veces son iguales (y hay interferencia de intercambio) y a veces distintos (y no la hay). Promediando sobre los (2s+1)² pares de espín, el término de interferencia sobrevive con un peso 1/(2s+1), que se apaga para espines grandes.
---

## Enunciado {#enunciado}

Dos partículas idénticas de espín $s$ chocan. No se conocen sus estados de espín iniciales: cada una tiene la **misma probabilidad** de estar en cualquiera de los $2s+1$ estados de espín ortogonales. Con la notación del ejercicio 4, mostrar que la probabilidad de observar una difusión en la dirección $\mathbf n$ es

$$\begin{aligned}&|F(\mathbf n)|^2+|F(-\mathbf n)|^2\\&\quad+\frac{\varepsilon}{2s+1}\Big[F^*(\mathbf n)F(-\mathbf n)+\text{c.c.}\Big]\end{aligned}$$

con $\varepsilon=+1$ para bosones y $-1$ para fermiones.

## Qué piden y estrategia {#estrategia}

«No polarizadas» describe una **mezcla estadística**, no una superposición: en cada choque los espines tienen valores definidos $(m,m')$ que no conocemos. Por tanto:

1. Calculamos la probabilidad para cada par $(m,m')$ con el ejercicio 4 (b si $m\neq m'$, c si $m=m'$).
2. Promediamos esas **probabilidades** con el peso de cada par, $1/(2s+1)^2$.

Es la regla de probabilidades totales; lo cuántico ya está dentro de cada término. Al final lo comprobamos por otro camino, separando los estados de espín simétricos y antisimétricos.

## Solución paso a paso {#solucion}

:::pasos Promediar sobre los espines iniciales
+++ Los pares de espín
La partícula que llega por $+\mathbf e_z$ tiene $m_s=m$ y la otra $m_s'=m'$, con $m,m'\in\{-s,\dots,s\}$. Hay $(2s+1)^2$ pares ordenados, todos con probabilidad
$$\frac{1}{2s+1}\cdot\frac{1}{2s+1}=\frac{1}{(2s+1)^2}$$
> Los espines de las dos partículas son independientes; «cuál» tiene $m$ está fijado por su momento inicial, así que el par ordenado tiene sentido.
+++ Cuántos pares de cada tipo
$$\begin{aligned}m=m':&\quad 2s+1\ \text{pares}\\m\neq m':&\quad(2s+1)^2-(2s+1)\\&\quad=(2s+1)\,2s\ \text{pares}\end{aligned}$$
+++ Probabilidad si los espines son distintos
Por el ejercicio 4b, sin medir los espines finales:
$$\mathcal P_{\neq}=|F(\mathbf n)|^2+|F(-\mathbf n)|^2$$
> No hay interferencia: el espín distingue las partículas.
+++ Probabilidad si los espines son iguales
Por el ejercicio 4c:
$$\begin{aligned}\mathcal P_{=}&=|F(\mathbf n)+\varepsilon F(-\mathbf n)|^2\\&=|F(\mathbf n)|^2+|F(-\mathbf n)|^2\\&\quad+\varepsilon\big[F^*(\mathbf n)F(-\mathbf n)+\text{c.c.}\big]\end{aligned}$$
> Al desarrollar el módulo al cuadrado aparece el término cruzado; $\varepsilon^2=1$ en el último cuadrado.
+++ Promediar
$$\begin{aligned}\mathcal P(\mathbf n)&=\tfrac{1}{(2s+1)^2}\Big[(2s+1)2s\,\mathcal P_{\neq}\\&\qquad+(2s+1)\,\mathcal P_{=}\Big]\\&=\frac{2s\,\mathcal P_{\neq}+\mathcal P_{=}}{2s+1}\end{aligned}$$
+++ Juntar términos
Las dos probabilidades comparten $|F(\mathbf n)|^2+|F(-\mathbf n)|^2$, que queda con peso $\tfrac{2s+1}{2s+1}=1$. El término cruzado sólo viene de $\mathcal P_=$, con peso $\tfrac{1}{2s+1}$:
$$\begin{aligned}\mathcal P(\mathbf n)=\;&|F(\mathbf n)|^2+|F(-\mathbf n)|^2\\&+\frac{\varepsilon}{2s+1}\Big[F^*(\mathbf n)F(-\mathbf n)\\&\qquad\qquad+\text{c.c.}\Big]\end{aligned}$$
> Es la fórmula del enunciado. El término de interferencia pesa la **probabilidad de que los dos espines coincidan**, $1/(2s+1)$.
:::

## Resultado {#resultado}

:::resultado
$$\begin{aligned}\mathcal P(\mathbf n)=\;&|F(\mathbf n)|^2+|F(-\mathbf n)|^2\\&+\frac{2\varepsilon}{2s+1}\,\mathrm{Re}\big[F^*(\mathbf n)F(-\mathbf n)\big]\end{aligned}$$

A $\theta=90°$, donde $F(-\mathbf n)=F(\mathbf n)$, el cociente con partículas distinguibles es
$$\frac{\mathcal P(90°)}{\mathcal P_{\text{dist}}(90°)}=1+\frac{\varepsilon}{2s+1}$$
:::

## Verificación {#verificacion}

- **Dimensiones.** Los tres términos son productos de dos amplitudes $F$: mismas unidades.
- **Otro camino: espín total.** Los $(2s+1)^2$ estados de espín de dos partículas se dividen en $(2s+1)(s+1)$ **simétricos** y $(2s+1)s$ **antisimétricos**; en la mezcla no polarizada pesan $\tfrac{s+1}{2s+1}$ y $\tfrac{s}{2s+1}$. Como el estado total debe tener simetría $\varepsilon$, la parte orbital lleva $F+\varepsilon F'$ con espín simétrico y $F-\varepsilon F'$ con espín antisimétrico ($F'\equiv F(-\mathbf n)$):
$$\begin{aligned}&\tfrac{s+1}{2s+1}|F+\varepsilon F'|^2+\tfrac{s}{2s+1}|F-\varepsilon F'|^2\\&=|F|^2+|F'|^2+\tfrac{\varepsilon\,[(s+1)-s]}{2s+1}\,2\,\mathrm{Re}(F^*F')\end{aligned}$$
Coincide. Para electrones ($s=\tfrac12$) es la cuenta singlete (¼) + triplete (¾).
- **Casos límite.**
  - $s=0$ (bosones): no hay elección de espín, peso 1, se recupera $|F+F'|^2$ del ejercicio 4c.
  - $s=\tfrac12$, $\varepsilon=-1$: $|F|^2+|F'|^2-\mathrm{Re}(F^*F')$, la fórmula de la sección 5; a 90° da $|F|^2$, la mitad que para distinguibles.
  - $s\to\infty$: el peso $1/(2s+1)\to0$ y se recupera el resultado de partículas distinguibles. Con muchos estados de espín casi nunca coinciden.
- **Simulación con los datos del enunciado.** Hace el promedio **explícito** sobre los $(2s+1)^2$ pares y lo compara con la fórmula cerrada (las dos lecturas coinciden). Abajo, el cociente a 90° frente al espín: los bosones (azul) bajan hacia 1 desde arriba y los fermiones (rojo) suben hacia 1 desde abajo. Para $F$ usamos la esfera dura del ejercicio 4 (modelo propio).

```sim
id: ej5-no-polarizadas
pie: Arriba, la probabilidad angular para partículas no polarizadas (curva de color), comparada con la de espines iguales (punteada) y con la de distinguibles (gris discontinuo); amplitud de esfera dura, unidades de a². Abajo, el cociente a 90° entre idénticas no polarizadas y distinguibles en función del espín: 1 + ε/(2s+1). El círculo marca el espín elegido.
```

## Entendimiento físico {#entendimiento}

:::idea-fisica
El efecto de la indistinguibilidad en un haz no polarizado se **diluye**, pero no desaparece: sólo los choques en que los dos espines coinciden muestran interferencia, y eso ocurre con probabilidad $1/(2s+1)$. Los grados de libertad internos funcionan como «etiquetas parciales»: cuantos más estados internos, más fácil es que las partículas sean distinguibles en la práctica y más clásico es el resultado. Aun así, el signo sobrevive: un haz no polarizado de protones ($s=\tfrac12$) tiene a 90° la mitad de la sección eficaz «clásica», y uno de núcleos de $^4$He ($s=0$), el doble.
:::

:::error-comun Promediar amplitudes en vez de probabilidades
Un haz no polarizado es una mezcla estadística: no hay coherencia entre los distintos pares $(m,m')$. Se promedian **probabilidades**; las amplitudes sólo se suman dentro de un mismo par de espines.
:::

:::error-comun Tomar $\tfrac12$ como peso del término de interferencia para cualquier espín
$\tfrac12$ es la probabilidad de espines iguales sólo para $s=\tfrac12$. En general es $1/(2s+1)$: para espín 1 es $\tfrac13$, para espín $\tfrac32$ es $\tfrac14$.
:::

## ¿Qué pasa si…? {#que-pasa-si}

:::pregunta ¿Y si el haz estuviera totalmente polarizado (todas las partículas con $m_s=s$)?
Los espines siempre coinciden: el peso del término de interferencia pasa de $1/(2s+1)$ a 1 y se recupera el ejercicio 4c, $|F+\varepsilon F'|^2$. Para electrones polarizados, cero a 90°.
:::

:::pregunta ¿Y si las dos partículas fueran deuterones ($s=1$, bosones)?
$\varepsilon=+1$ y peso $\tfrac13$: $\mathcal P=|F|^2+|F'|^2+\tfrac23\mathrm{Re}(F^*F')$. A 90° el cociente con distinguibles es $1+\tfrac13=\tfrac43$ (lectura de la simulación con bosones de espín 1).
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento D_XIV, ejercicio 5, p. 1497. Usa el ejercicio 4 y §D-2-b-β.
- Sección 5 de esta página: el caso $s=\tfrac12$ se adelanta al final del §D-2-b-β.
- Estados de espín total de dos partículas: Cohen, vol. II, cap. X, §B.
