---
layout: page-no-title
title: Download

---

#### Install the STLmc Tool

The STLmc tool is written in Python. 
The tool is available for Ubuntu 18.04 (64-bit) and macOS (64-bit). 
There are two ways to install the tool:

<!-- no toc -->
1. [Install the Tool from Source Code](#install-the-tool-from-source-code)
2. [Install the Tool from Vagrant](#install-the-tool-from-vagrant)

*Remark: Our tool can be run on [Ubuntu 18.04](https://ubuntu.com/download) only.
We made this restriction because one of our underlying SMT solvers, Yices2, does not support Ubuntu 20.04 on Ubuntu PPA.*
<br>

----

#### Install the Tool from Source Code

**1. Prerequisites**

The following libraries are prerequisites for our tool:

* Python3 (3.8.6) or newer: [https://www.python.org/downloads/](https://www.python.org/downloads/)
* Java8 or newer: [https://openjdk.java.net/install/](https://openjdk.java.net/install/)
* Python3-pip: [https://pypi.org/](https://pypi.org/)
    
    Please make sure that pip is up-to-date. Otherwise some Python libraries STLmc used, such as numpy, may fail to be installed.

* Yices2: [https://github.com/SRI-CSL/yices2/](https://github.com/SRI-CSL/yices2/)

    Our artifact needs MCSAT-enabled version of Yices2. Please follow the below installation steps to get this specific version of Yices2:

    **Ubuntu or Debian**

    To install Yices on Ubuntu or Debian, do the following:

    ~~~
    sudo apt install software-properties-common
    sudo add-apt-repository ppa:sri-csl/formal-methods
    sudo apt-get update
    sudo apt-get install yices2-dev
    ~~~

    **MacOS**

    To install on Darwin, use homebrew:

    ~~~
    brew install SRI-CSL/sri-csl/yices2
    ~~~

    *Remark: Some experiments may not run properly on the following architectures:
    Apple MacBook Pro 2015 or earlier (Yices 2.6 with QF-NRA is not working).*

* Z3: [https://github.com/Z3Prover/z3/](https://github.com/Z3Prover/z3/)

    **Ubuntu or Debian**

    Normally, Z3 solver is automatically installed when downloading its Python3 package (i.e., using pip3 install z3-solver).


    **MacOS** 

    Normally, Z3 solver is automatically installed as in Linux environment. But for some cases, we found that one may need to install Z3 binaries manually. This can be done using the following command:

    ~~~
    brew install z3
    ~~~


  
* Gnuplot: [http://www.gnuplot.info/](http://www.gnuplot.info/)

    STLmc uses 'Gnuplot' to visualize counterexample graphs. You can install Gnuplot using the following command:


    **Ubuntu or Debian**
    
    ~~~
    sudo apt install gnuplot
    ~~~
    
    
    **MacOS**
    
    ~~~
    brew install gnuplot
    ~~~

<br>

**2. Installation**

To install the tool, follow the below instructions:

1. Download the source code ([stlmc-tool.zip](https://tinyurl.com/55vfu7cr)) and unzip it.
2. Install the following python packages:

    ```
    pip3 install termcolor yices z3-solver antlr4-python3-runtime==4.9.1 sympy numpy bokeh scipy
    ```

3. Run the following command:

    ```
    cd stlmc-tool && make
    ```

4. Use the following command to run smoke tests for our installation:

    ```
    make test
    ```

    This command requires sudo permission. The command tests if all neccessary executables exist and are set to right permissions.
  Also, it tests underlying SMT solvers (i.e., Z3, Yices2, and dReal) using several smt2 
  test cases for integrity. Then, it tests STLmc using test STLmc models in 'tests' subdirectory.

    *Remark: One may see 'clock skew warning'. To resolve this, use the following command in the 'stlmc' directory:*
    ```
    find . -exec touch {} \;
    ```

5. If the tests succeed, you will see the following messages:

    ```
start smoke test ...
[exec] Python: pass
[exec] Yices: pass
[exec] dReal: pass
[exec] Z3: pass
[exec] Java: pass
[exec] Gnuplot: pass
[file] Config: pass
[smt] dReal
  ./tests/smt2/dreal/01.smt2: pass
  ./tests/smt2/dreal/02.smt2: pass
[smt] Z3
  ./tests/smt2/z3/01.smt2: pass
  ./tests/smt2/z3/02.smt2: pass
[smt] Yices
  ./tests/smt2/yices2/01.smt2: pass
  ./tests/smt2/yices2/02.smt2: pass
[tool] STLmc
  ./tests/stlmc/01.model: pass
  ./tests/stlmc/02.model: pass
    ```
<br>

STLmc uses the following SMT solvers as its underlying SMT solvers:

* Z3: [https://github.com/Z3Prover/z3/](https://github.com/Z3Prover/z3/)
* Yices2: [https://github.com/SRI-CSL/yices2/](https://github.com/SRI-CSL/yices2/)
* dReal: [https://github.com/dreal/dreal3/](https://github.com/dreal/dreal3/)


The archive file already contains dReal under the directory "stlmc-tool/stlmc/3rd_party".
Please see [Readme.txt](/assets/files/cav2022-artifact/Readme.txt) for instructions to run the experiments.

---

#### Install the Tool from Vagrant

We provide a vagrant set-up \'[STLmc-Tool-Vagrant.zip](https://tinyurl.com/yv2e89p9)\'.
You can create a VirtualBox image using Vagrant ([https://www.vagrantup.com](https://www.vagrantup.com)) as follows:

1. Download and unzip the archive file ([STLmc-Tool-Vagrant.zip](https://tinyurl.com/yv2e89p9)).
2. Use the following command to initialize Vagrant:

    ```
    cd STLmc-Tool-Vagrant && vagrant up
    ```
  Vagrant automatically creates a VM image for our artifact.

    *Remark: At the end of the creation, one may see 'clock skew warning'. To resolve this, please refer to the step 5 below.*

3. To use the generated VM image, use ssh connect as follows:

    ```
    vagrant ssh
    ```

4. If succeed, you can see the artifact directory \'stlmc-tool\' as follows:
    
    ```
    vagrant@ubuntu-bionic:~$ ls
    stlmc-tool
    ```

5. (Optional step) When the 'clock skew warning' occurred, use the following command in the 'stlmc-tool' directory:

    ```
    vagrant@ubuntu-bionic:~/stlmc-tool$ find . -exec touch {} \;
    ```

Vagrant generates VM with a name 'ubuntu-bionic' and a username 'vagrant'.

In general, we don't need any sudo permission to use/reproduce our artifact. 
But for your information, the password of 'vagrant' is 'vagrant'.

