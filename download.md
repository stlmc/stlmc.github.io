---
layout: page-no-title
title: Download
permalink: /download/

---

#### Install the STLmc Tool

The STLmc tool is written in Python. 
The tool is available for Ubuntu 18.04 (64-bit) and macOS (64-bit). 
You can download the tool using the following command:

~~~shell
pip install stlmc
~~~

<!-- *Remark: Our tool can be run on [Ubuntu 18.04](https://ubuntu.com/download) only.
We made this restriction because one of our underlying SMT solvers, Yices2, does not support Ubuntu 20.04 on Ubuntu PPA.* -->

----

#### Prerequisites

The following libraries are prerequisites for our tool:

* Python3 (3.8.6) or newer: [https://www.python.org/downloads/](https://www.python.org/downloads/)
* Python3-pip: [https://pypi.org/](https://pypi.org/)
    
    Please make sure that pip is up-to-date. Otherwise some Python libraries STLmc used, such as numpy, may fail to be installed.

* Gnuplot: [http://www.gnuplot.info/](http://www.gnuplot.info/)

    STLmc uses 'Gnuplot' to visualize counterexample graphs. You can install Gnuplot using the following command:


    **Ubuntu or Debian**
    
    ~~~shell
    sudo apt install gnuplot
    ~~~
    
    
    **MacOS**
    
    ~~~shell
    brew install gnuplot
    ~~~