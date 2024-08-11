---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: front

---

[![example workflow](https://github.com/stlmc/stlmc/actions/workflows/release.yml/badge.svg)](https://github.com/stlmc/stlmc)
[![PyPI - Version](https://img.shields.io/pypi/v/stlmc?color=66b2ff)](https://pypi.org/project/stlmc/)
[![GitHub License](https://img.shields.io/github/license/stlmc/stlmc)](https://github.com/stlmc/stlmc)

<pre class="logo">
 _____  _____  _
/  ___||_   _|| |
\ `--.   | |  | |     _ __ ___    ___
 `--. \  | |  | |    | '_ ` _ \  / __|
/\__/ /  | |  | |____| | | | | || (__
\____/   \_/  \_____/|_| |_| |_| \___|
v1.0.0.dev0
</pre>

**STLmc** is a bounded model checker for signal temporal logic (STL) of hybrid systems. The algorithm of the tool is refutationally complete for STL properties of bounded signals. It reduces bounded STL model checking problems into the satisfiability of a first-order logic formula over the reals. The satisfiability of the formula can be determined using SMT solvers (**Z3**, **Yices2**, or **dReal3**). STLmc supports an input modelling language to describe hybrid automata and STL properties. The tool searches for counterexample trajectories that falsify the given STL formulas and if counterexamples exist, the tool generates counterexample graphs.

<br>

**Bug report**

If you encounter any issues while using STLmc, please submit a bug report through GitHub Issues [https://github.com/stlmc/stlmc/issues](https://github.com/stlmc/stlmc/issues).
Please include enough information in your bug report to enable us to reproduce and fix the problem.

Contact us at [stlmc@postech.ac.kr](mailto:stlmc@postech.ac.kr) for troubleshooting assistance.