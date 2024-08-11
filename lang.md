---
layout: page-no-title
permalink: /stlmc-language/ 
use_math: true

---

#### STLmc Input Model

The input format of STLmc consists of five sections:
(i) [variable declarations](#variable-declarations), (ii) [mode definitions](#mode-definitions), 
(iii) [initial conditions](#initial-conditions), (iv) [state propositions](#state-propositions), and (v) [STL properties](#stl-properties). 
Mode and continuous variables specify discrete and continuous
states of hybrid automata. Mode definitions specify flow, jump, and invariant
conditions. STL formulas can also include user-defined state propositions.

**Variable Declarations.**{: #variable-declarations}
STLmc uses mode and continuous variables to specify
discrete and continuous states of a hybrid automaton. Mode variables define a
set of discrete modes $Q$, and continuous variables define a set of real-valued
variables $X$. We can also declare named constants whose values do not change.
Mode variables are declared with one of three types: $\textsf{bool}$ variables with $\textsf{true}$
and $\textsf{false}$ values, $\textsf{int}$ variables with integer values, and $\textsf{real}$ variables with real
values. For example, in the [thermostat model](#two-networked-thermostat-systems), the following declares two $\textsf{int}$ variables $\textsf{on0}$ and $\textsf{on1}$ and two $\textsf{real}$ variables $\textsf{x0}$ and $\textsf{x1}$.

~~~
int on0;         int on1;
[10, 35] x0; [10, 35] x1;
~~~


**Mode Definitions.**{: #mode-definitions }
In STLmc, mode blocks define mode, jump, invariant, and
flow conditions for a group of modes in a hybrid automaton. Multiple model
blocks can be declared, and each mode block consists of four components:
~~~
{ mode: ...
  inv:  ...
  flow: ...
  jump: ...
}
~~~
* A mode component contains a semicolon-separated set of Boolean conditions over mode variables. 
* An inv component contains a semicolon-separated set of Boolean formulas over continuous variables.
* A flow component contains either a system of ordinary differential equations
(ODEs) or a closed-form solution of ODEs. In STLmc, a system of ODEs over
continuous variables $x\_1$, $...$ , $x\_n$ is written as a semicolon-separated equation of
the following form, where $e\_i$ denotes an expression over $x\_1$, $...$ , $x\_n$:

  ~~~
  d/dt[x1] = e1(x1,...,xn) ;
  ...
  d/dt[xn] = en(x1,...,xn) ;
  ~~~
A closed-form solution of ODEs is written as a set of continuous functions,
parameterized by a time variable $\textsf{t}$ and the initial values $x\_1(0)$, $...$, $x\_n(0)$:

  ~~~
  x1(t) = e1(t, x1(0),...,xn(0)) ;
  ...
  xn(t) = en(t, x1(0),...,xn(0)) ;
  ~~~
* A jump component contains a set of jump conditions *guard* => *reset*, where 
guard and reset are Boolean conditions over mode and continuous variables.
We use "primed" variables to denote states after jumps have occurred

For example, the $\textsf{Off}\_{\textsf{0}}\textsf{On}\_{\textsf{1}}$ mode is defined as follows:
~~~
{ mode: on0 = 0; on1 = 1;
  inv: 10 < x0; x1 < 30;
  flow: d/dt[x0] = - k0 * (c0 * x0 - d0 * x1);
        d/dt[x1] = k1 * (h1 - (c1 * x1 - d1 * x0));
  jump: x0 <= 17 => (and (on0' = 1) (on1' = 0)
                    (x0' = x0) (x1' = x1));
        x1 >= 26 => (and (on1' = 0) (on0' = on0)
                    (x0' = x0) (x1' = x1));
}
~~~


**Initial Conditions.**{: #initial-conditions }
In the init section, an initial condition is declared as a
set of Boolean formulas over mode and continuous variables.
For example, the initial conditions $18 \leq x\_0 \, , \, x\_1 \leq 22$ with 
$\textsf{on0} = 0$ and $\textsf{on1} = 0$ are defined as follows:
~~~
init: on0 = 0;  18 <= x0;  x0 <= 22;
      on1 = 0;  18 <= x1;  x1 <= 22;
~~~

**STL properties.**{: #stl-properties }
In the goal section, STL properties are declared with labels.
State propositions are arithmetic and relational expressions over mode and continuous variables, 
and labels can be omitted.  
For example, the following declares an STL formula 
$\square\_{[2,4]} ((x_0 - x_1 \geq 4) \to \lozenge\_{[3,10]} (x_0 - x_1 \leq -3))$ with label $\textsf{f2}$:
~~~
f2: [][2, 4]((x0 - x1 >= 4) -> <>[3, 10] (x0 - x1 <= -3));
~~~

**State Propositions.**{: #state-propositions }
To make it easy to write repeated propositions, "named" state propositions
can be declared in the proposition section. For example, the above STL formula
can be rewritten using two propositions $\textsf{p1}$ and $\textsf{p2}$ as follows:
~~~
proposition:
[p1]: x0 - x1 >= 4;
[p2]: x0 - x1 <= -3;

goal:
[f2]: [][2, 4](p1 -> <>[3, 10] p2);
~~~

