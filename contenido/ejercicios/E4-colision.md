---
titulo: Colisión entre dos partículas idénticas
numero: 4
cohen: Cohen, complemento D del cap. XIV · p. 1497
resumen: El choque de la sección 5, ahora con espín. Si las partículas son distinguibles, o idénticas con espines distintos, se suman probabilidades; si son idénticas con el mismo espín, se suman amplitudes con el signo ε. En todos los casos la probabilidad total es la misma en θ y en π − θ.
---

## Enunciado {#enunciado}

Notación del §D-2-a-β del capítulo (sección 5 de esta página).

- **a)** Dos partículas (1) y (2) de la misma masa $m$, **sin espín y distinguibles**, interactúan con un potencial $V(r)$ que sólo depende de la distancia entre ellas. En $t_0$ el sistema está en $\ket{1\!:\!p\mathbf e_z;\,2\!:\!-p\mathbf e_z}$ y $U(t,t_0)$ es el operador de evolución. La amplitud de hallarlo en $\ket{1\!:\!p\mathbf n;\,2\!:\!-p\mathbf n}$ en el instante $t_1$ es
$$\begin{aligned}F(\mathbf n)=\;&\bra{1\!:\!p\mathbf n;2\!:\!-p\mathbf n}U(t_1,t_0)\\&\times\ket{1\!:\!p\mathbf e_z;2\!:\!-p\mathbf e_z}\end{aligned}$$
Sean $\theta$, $\varphi$ los ángulos polares de $\mathbf n$. Mostrar que $F(\mathbf n)$ no depende de $\varphi$. Calcular, en términos de $F$, la probabilidad de hallar **una** de las partículas (sin decir cuál) con momento $p\mathbf n$ y la otra con $-p\mathbf n$. ¿Qué le pasa si $\theta\to\pi-\theta$?
- **b)** El mismo potencial (independiente del espín), pero ahora con dos partículas **idénticas**, una en $\ket{p\mathbf e_z,m_s}$ y la otra en $\ket{-p\mathbf e_z,m_s'}$, con $m_s\neq m_s'$. Expresar con $F$ la probabilidad de hallar en $t_1$ una partícula con momento $p\mathbf n$ y espín $m_s$ y la otra con $-p\mathbf n$ y $m_s'$. Si no se miden los espines, ¿cuál es la probabilidad de hallar una con $p\mathbf n$ y la otra con $-p\mathbf n$? ¿Qué pasa con $\theta\to\pi-\theta$?
- **c)** El caso $m_s=m_s'$. Examinar en particular $\theta=\pi/2$, para bosones y para fermiones. Mostrar que otra vez la probabilidad es la misma en $\theta$ y en $\pi-\theta$.

## Qué piden y estrategia {#estrategia}

Es aplicar la **regla de §D-2-a** en tres situaciones y fijarse en cuándo hay un término de intercambio:

1. **a)** La independencia de $\varphi$ sale de una **simetría**: el estado inicial y el hamiltoniano son invariantes ante rotaciones alrededor de $Oz$. Para la probabilidad, con partículas distinguibles y un aparato que no las distingue, hay **dos estados finales ortogonales**: se suman probabilidades (como D-20).
2. **b)** Con partículas idénticas escribimos la amplitud «directo + ε·intercambio» (D-32) y vemos que el espín, que $U$ no toca, **anula** el intercambio (como D-38).
3. **c)** Con el mismo espín los dos términos sobreviven e **interfieren**.

La clave para comparar $\theta$ y $\pi-\theta$: $-\mathbf n$ tiene ángulos $(\pi-\theta,\varphi+\pi)$; como $F$ no depende de $\varphi$, $F(-\mathbf n)$ es «$F$ evaluada en $\pi-\theta$».

## Solución paso a paso {#solucion}

### a) Partículas distinguibles sin espín {#a-distinguibles}

:::pasos F no depende de φ, y la probabilidad
+++ Rotaciones alrededor de $Oz$
Sea $\mathcal R_z(\phi)$ la rotación de ángulo $\phi$ alrededor de $Oz$ aplicada **a las dos** partículas. La energía cinética y $V(|\mathbf r_1-\mathbf r_2|)$ son invariantes, así que $[H,\mathcal R_z]=0$ y también
$$\big[U(t_1,t_0),\,\mathcal R_z(\phi)\big]=0$$
> $U$ es función de $H$ (D-27); lo que conmuta con $H$ conmuta con $U$.
+++ El estado inicial no cambia al girar
$\mathcal R_z$ deja quieto el eje $Oz$, así que
$$\begin{aligned}&\mathcal R_z(\phi)\ket{1\!:\!p\mathbf e_z;2\!:\!-p\mathbf e_z}\\&=\ket{1\!:\!p\mathbf e_z;2\!:\!-p\mathbf e_z}\end{aligned}$$
+++ Meter la rotación en la amplitud
Llamando $\ket{i}$ al estado inicial:
$$\begin{aligned}F(\mathbf n)&=\bra{1\!:\!p\mathbf n;2\!:\!-p\mathbf n}U\mathcal R_z\ket{i}\\&=\bra{1\!:\!p\mathbf n;2\!:\!-p\mathbf n}\mathcal R_zU\ket{i}\\&=F\big(\mathcal R_z^{-1}\mathbf n\big)\end{aligned}$$
porque $\mathcal R_z^\dagger$ actuando sobre el bra gira $\mathbf n$ un ángulo $-\phi$.
> $\mathcal R_z^{-1}\mathbf n$ tiene el mismo $\theta$ y $\varphi-\phi$. Como $\phi$ es arbitrario, $F$ **sólo depende de $\theta$**.
+++ Los estados finales que cuentan
«Una con $p\mathbf n$ y la otra con $-p\mathbf n$» corresponde a **dos** estados finales distintos y ortogonales:
$$\ket{1\!:\!p\mathbf n;2\!:\!-p\mathbf n}\quad\text{y}\quad\ket{1\!:\!-p\mathbf n;2\!:\!p\mathbf n}$$
La amplitud del segundo es, por definición, $F(-\mathbf n)$.
> El aparato no distingue la partícula, pero las partículas sí son distintas: son dos resultados físicamente diferentes que el aparato agrupa.
+++ Sumar probabilidades
$$\mathcal P_a(\mathbf n)=|F(\mathbf n)|^2+|F(-\mathbf n)|^2$$
> Es (D-20): no hay término de interferencia.
+++ $\theta\to\pi-\theta$
$-\mathbf n$ tiene ángulos $(\pi-\theta,\varphi+\pi)$ y $F$ no depende de $\varphi$, así que $F(-\mathbf n)=F(\pi-\theta)$:
$$\mathcal P_a(\theta)=|F(\theta)|^2+|F(\pi-\theta)|^2$$
Cambiar $\theta$ por $\pi-\theta$ **intercambia** los dos términos: $\mathcal P_a$ no cambia.
> Cada término por separado no es simétrico ($|F(\theta)|^2$ suele ser mucho mayor hacia adelante), pero la suma sí, porque el aparato cuenta las dos partículas.
:::

### b) Idénticas con espines distintos {#b-espines-distintos}

:::pasos El espín anula el intercambio
+++ Estados inicial y final
$$\begin{aligned}\ket{\psi_i}&=\tfrac1{\sqrt2}(\uno+\varepsilon P_{21})\\&\;\;\times\ket{1\!:\!p\mathbf e_z,m_s;2\!:\!-p\mathbf e_z,m_s'}\\\ket{\psi_f}&=\tfrac1{\sqrt2}(\uno+\varepsilon P_{21})\\&\;\;\times\ket{1\!:\!p\mathbf n,m_s;2\!:\!-p\mathbf n,m_s'}\end{aligned}$$
> Los dos están normalizados porque $m_s\neq m_s'$ hace ortogonales los estados individuales.
+++ La amplitud: directo + ε·intercambio
Exactamente como en (D-31) y (D-32), con $[U,P_{21}]=0$:
$$\begin{aligned}&\bra{\psi_f}U\ket{\psi_i}\\&=\bra{1\!:\!p\mathbf n,m_s;2\!:\!-p\mathbf n,m_s'}U\ket{i}\\&+\varepsilon\bra{1\!:\!-p\mathbf n,m_s';2\!:\!p\mathbf n,m_s}U\ket{i}\end{aligned}$$
con $\ket i=\ket{1\!:\!p\mathbf e_z,m_s;2\!:\!-p\mathbf e_z,m_s'}$.
+++ $U$ no actúa sobre el espín
$U=U_{\text{orb}}\otimes\uno_{\text{espín}}$, así que cada elemento de matriz se factoriza:
$$\begin{aligned}\text{dir.}&=F(\mathbf n)\,\braket{m_s}{m_s}\braket{m_s'}{m_s'}\\&=F(\mathbf n)\\\text{interc.}&=F(-\mathbf n)\,\braket{m_s'}{m_s}\braket{m_s}{m_s'}\\&=0\end{aligned}$$
> El intercambio pediría que la partícula 1 pasara de $m_s$ a $m_s'$: imposible si nada actúa sobre el espín (D-38).
+++ Probabilidad con los espines medidos
$$\mathcal P(p\mathbf n,m_s;\,-p\mathbf n,m_s')=|F(\mathbf n)|^2$$
Del mismo modo, para el estado final con los espines al revés el directo es cero y sobrevive el intercambio:
$$\mathcal P(p\mathbf n,m_s';\,-p\mathbf n,m_s)=|F(-\mathbf n)|^2$$
> Es justo lo que daría el cálculo con partículas distinguibles numeradas por su espín.
+++ Sin medir los espines
Los dos estados finales son ortogonales y son los únicos posibles (el espín se conserva), así que
$$\mathcal P_b(\mathbf n)=|F(\mathbf n)|^2+|F(-\mathbf n)|^2$$
el mismo resultado que en a).
+++ $\theta\to\pi-\theta$
Las dos probabilidades con espín medido se **intercambian** (la de $m_s$ en $\mathbf n$ pasa a ser la de $m_s'$ en $\mathbf n$); su suma $\mathcal P_b$ no cambia.
> Si se mide el espín, la distribución **no** es simétrica respecto a 90°: el espín funciona como etiqueta.
:::

### c) Idénticas con el mismo espín {#c-mismo-espin}

:::pasos Interferencia y el caso θ = π/2
+++ Estados y amplitud
Con $m_s=m_s'=m$:
$$\begin{aligned}\ket{\psi_i}=\tfrac1{\sqrt2}&(\uno+\varepsilon P_{21})\\\times&\ket{1\!:\!p\mathbf e_z,m;2\!:\!-p\mathbf e_z,m}\end{aligned}$$
y el final análogo con $\pm p\mathbf n$. Ahora los factores de espín del término de intercambio valen $\braket mm\braket mm=1$:
$$\bra{\psi_f}U\ket{\psi_i}=F(\mathbf n)+\varepsilon F(-\mathbf n)$$
+++ La probabilidad
$$\mathcal P_c(\theta)=\big|F(\theta)+\varepsilon F(\pi-\theta)\big|^2$$
> Es (D-32) de la sección 5, ahora justificada también con espín: lo que importa es que los espines sean **iguales**.
+++ El caso $\theta=\pi/2$
$\pi-\theta=\theta$, así que $F(-\mathbf n)=F(\mathbf n)\equiv F$:
$$\begin{aligned}\mathcal P_c\big(\tfrac\pi2\big)&=|F+\varepsilon F|^2\\&=\begin{cases}4|F|^2&\text{bosones}\\0&\text{fermiones}\end{cases}\end{aligned}$$
> Distinguibles (a) darían $2|F|^2$: los bosones salen a 90° con el **doble** de probabilidad y los fermiones del mismo espín **nunca**.
+++ $\theta\to\pi-\theta$
La amplitud pasa a $F(-\mathbf n)+\varepsilon F(\mathbf n)=\varepsilon\big[F(\mathbf n)+\varepsilon F(-\mathbf n)\big]$, que difiere sólo en el factor $\varepsilon=\pm1$:
$$\mathcal P_c(\pi-\theta)=\mathcal P_c(\theta)$$
:::

## Resultado {#resultado}

:::resultado
- **a)** $F(\mathbf n)=F(\theta)$ no depende de $\varphi$; $\ \mathcal P_a=|F(\theta)|^2+|F(\pi-\theta)|^2$, invariante ante $\theta\to\pi-\theta$.
- **b)** $\mathcal P(p\mathbf n,m_s;-p\mathbf n,m_s')=|F(\theta)|^2$ y $\mathcal P(p\mathbf n,m_s';-p\mathbf n,m_s)=|F(\pi-\theta)|^2$ (se intercambian con $\theta\to\pi-\theta$). Sin medir el espín, $|F(\theta)|^2+|F(\pi-\theta)|^2$, invariante.
- **c)** $\mathcal P_c=|F(\theta)+\varepsilon F(\pi-\theta)|^2$, invariante; a $\theta=\pi/2$ vale $4|F|^2$ (bosones) y $0$ (fermiones).
:::

## Verificación {#verificacion}

- **Dimensiones.** Las tres expresiones son módulos al cuadrado de la misma amplitud $F$: tienen las mismas unidades (en la simulación, $a^2$, como una sección eficaz diferencial).
- **Baja energía.** Si sólo cuenta la onda $s$ ($ka\ll1$), $F$ es isótropa: $F(\theta)=F(\pi-\theta)$ para **todo** $\theta$. Entonces los fermiones del mismo espín no se dispersan en ninguna dirección. Es la regla del ejercicio 6: con espín simétrico la parte orbital debe tener $l$ impar, y la onda $s$ ($l=0$) está prohibida.
- **Consistencia entre b) y a).** Sin medir el espín, b) da lo mismo que dos partículas distinguibles: el espín ortogonal hace el papel de etiqueta (§D-2-b-β).
- **Simulación con los datos del enunciado.** El Cohen no da un potencial; usamos una **esfera dura** de radio $a$ (modelo propio) para tener un $F(\theta)$ complejo y realista, con desfases $\tan\delta_l=j_l(ka)/y_l(ka)$. Las lecturas de $\theta$ y $\pi-\theta$ coinciden en los tres casos; en c) con fermiones, la lectura a 90° es 0. Las pruebas comparan con Python (funciones de Bessel calculadas por otro método).

```sim
id: ej4-colision
pie: Probabilidad de detectar las partículas en las direcciones ±n en función de θ, para una esfera dura de radio a (modelo propio; unidades de a²). a) distinguibles (gris discontinuo). b) espines distintos: punteado, la de espín m_s en n; discontinuo, la de m_s′ en n; continuo, la suma. c) mismo espín: la curva de color frente a la de distinguibles. Los dos puntos marcan θ y π − θ. Baja ka: los fermiones del mismo espín casi no se dispersan.
```

## Entendimiento físico {#entendimiento}

:::idea-fisica
Los tres casos se ordenan según **cuánto se puede saber** sobre qué partícula llega al detector. En a) y en b) se puede saber, al menos en principio (por la naturaleza de la partícula o por su espín): los dos caminos son distinguibles y se suman probabilidades. En c) no hay ninguna manera de saberlo y se suman amplitudes, con el signo que dicta el postulado. La simetría respecto a 90° de la probabilidad total no es una coincidencia: viene de que el aparato cuenta las dos partículas, que salen siempre en direcciones opuestas.

El caso de los fermiones a 90° es un experimento real: en la dispersión protón-protón o de dos núcleos idénticos, la sección eficaz a 90° en el centro de masa muestra directamente el signo de la estadística.
:::

:::error-comun Usar $|F(\theta)-F(\pi-\theta)|^2$ para electrones con espines distintos
Si la interacción no depende del espín y $m_s\neq m_s'$, el término de intercambio es cero (paso 3 de b). Restar amplitudes sólo vale con el mismo espín.
:::

:::error-comun Decir que $|F(\mathbf n)|^2$ es simétrica respecto a 90°
No lo es: para un potencial de corto alcance la difusión es mucho más probable hacia adelante. Lo simétrico es lo que mide un aparato que no distingue las partículas.
:::

## ¿Qué pasa si…? {#que-pasa-si}

:::pregunta ¿Y si la interacción dependiera del espín (por ejemplo, un término $\mathbf S_1\cdot\mathbf S_2$)?
Entonces $U$ ya no se factoriza en órbita × espín y el término de intercambio de b) deja de ser cero: el espín podría «voltearse» durante el choque y la partícula de $m_s$ podría salir con $m_s'$. El espín ya no serviría de etiqueta.
:::

:::pregunta ¿Y si los espines iniciales no se conocen?
La mitad de las veces (para espín ½) son iguales y la otra mitad distintos, y hay que promediar los resultados de b) y c). Es el ejercicio 5: aparece un término de interferencia con peso $1/(2s+1)$.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento D_XIV, ejercicio 4, p. 1497. Usa §D-2-a-β (ecs. D-26 a D-32) y §D-2-b-β (ecs. D-36 a D-38).
- Sección 5 de esta página y su simulación `colision-identicas` (con otra amplitud modelo).
- Desfases y amplitud de difusión: Cohen, vol. I, cap. VIII, §C (ondas parciales).
