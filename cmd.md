---
layout: page-no-title
permalink: /stlmc-cmds/
use_math: true

---

#### Command Line Options

The STLmc tool provides a command-line interface with various command line options,
summarized in Table [[2](#cmds)].

| Option | Explanation | Default |
|-------|--------|---------|
| $\textsf{-bound}\<N\>$ | a discrete bound $N$ | - |
| $\textsf{-time-bound}\<\tau\>$ | a time bound $\tau$ | - |
| $\textsf{-time-horizon}\<T\>$ | a mode duration bound $T$ | $\tau$ |
| $\textsf{-threshold}\<\epsilon\>$ | a robustness threshold $\epsilon$ | $0.01$ |
| $\textsf{-goal}\<N\>$ | the list of STL goals to be analyzed | all |
| $\textsf{-two-step}$ | use the two-phase optimization | disabled |
| $\textsf{-parallel}$ | parallelize the two-phase optimization | disabled |
| $\textsf{-visualization}$ | generate extra visualization data | disabled |
| $\textsf{-solver}\<\textsf{Solver}\>$ | an SMT solver to be used ($\textsf{z3}$/$\textsf{yices}$/$\textsf{dreal}$) | $\textsf{z3}$ |
| $\textsf{-precision}\<\delta\>$ | a precision parameter for $\textsf{dreal}$ | $0.001$ |
{: #cmds }
<p class="center">
    <em>Table.2: The command line options of STLmc</em>
</p>

A discrete bound $N$ limits the number of mode changes and
the number of *variable points*-at which the truth value of some STL subformula changes-in trajectories.
A time horizon $T$ limits the maximum time duration of single modes in trajectories.
The options $\textsf{-two-step}$ and $\textsf{-parallel}$ enable the (parallelized) two-phase optimization.
When the option $\textsf{-visualize}$ is set, extra data for visualization is generated. 
Among the STL formulas specified in the input model file, formulas to be analyzed are chosen using the $\textsf{-goal}$.

We can choose different SMT solvers using the $\textsf{-solver}$ option.
The STLmc tool currently supports three SMT solvers: Z3, Yices2 and dReal.
The underlying solver is chosen depending on the flow conditions of a hybrid automaton.
Z3 and Yices2 can deal with linear and polynomial functions, and dReal
can deal with nonlinear ODEs-which is undecidable in general for hybrid automata-approximately up to a given precision 
$\delta > 0$.


