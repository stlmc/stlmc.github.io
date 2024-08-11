---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: front
title: Artifact
permalink: /cav2022-artifact/
use_math: true

---


#### Artifact

This page explains the CAV2022 artifact for our paper: "STLmc: Robust STL Model Checking of Hybrid
Systems using SMT" by G. Yu, J. Lee, and K. Bae. The artifact includes the STLmc tool and scripts for running the experiments of the paper.
We prepare our artifact to satisfy available, functional, and reusable evaluation criteria.



We provide the [zip file](https://doi.org/10.5281/zenodo.6620846) containing the VirtualBox image, [Readme.txt](/assets/files/cav2022-artifact/Readme.txt), and
[LICENSE.md](/assets/files/cav2022-artifact/LICENSE.md)  through Zenodo ([https://doi.org/10.5281/zenodo.6620846](https://doi.org/10.5281/zenodo.6620846)).

* CAV2022AeC.zip: [https://doi.org/10.5281/zenodo.6620846](https://doi.org/10.5281/zenodo.6620846)
  * Checksums: [[SHA256](/assets/files/cav2022-artifact/CAV2022-AeC/SHA256SUMS), [MD5](/assets/files/cav2022-artifact/CAV2022-AeC/MD5SUMS)]

In the provided VM, we locate the artifact in the directory \"/home/user/CAV2022-AeC\". See [Readme.txt](/assets/files/cav2022-artifact/Readme.txt) in the artifact's top directory for more information about the tool, experiments, and our artifact.

We also provide additional VM image through Vagrant.

* [STLmc-Vagrant.zip](https://tinyurl.com/w574su7x)
  * Checksums: [[SHA256](/assets/files/cav2022-artifact/STLmc-Vagrant/SHA256SUMS), [MD5](/assets/files/cav2022-artifact/STLmc-Vagrant/MD5SUMS)]


Our artifact can also be used outside of VM. We provide the source code of our tool:

* [CAV2022-AeC-NoN-VM.zip](https://tinyurl.com/zw8awzhf)
  * Checksums: [[SHA256](/assets/files/cav2022-artifact/CAV2022-AeC-NoN-VM/SHA256SUMS), [MD5](/assets/files/cav2022-artifact/CAV2022-AeC-NoN-VM/MD5SUMS)]


---


#### Running the Artifact in VM Environment

**Zenodo** 

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.6620846.svg)](https://doi.org/10.5281/zenodo.6620846)

We provide the [zip file](https://doi.org/10.5281/zenodo.6620846) containing the VirtualBox image, [Readme.txt](/assets/files/cav2022-artifact/Readme.txt), and
[LICENSE.md](/assets/files/cav2022-artifact/LICENSE.md).
The VM image 'STLmc.ova' contains our tool and experiments. 
The VM image uses Ubuntu 18.04.6 and STLmc is installed. The size of the image is about 4GB. 

A minimum system requirement for the artifact evaluation is a quad-core virtual CPUs with 4096MB memory.
You can run the image using VirtualBox ([https://www.virtualbox.org](https://www.virtualbox.org)) as follows:

- Click 'File/Import Appliance' in the top menu.
- Choose 'STLmc.ova', and click 'Continue'.
- Set the number of CPU cores ($\geq$ 4) and the size of memory ($\geq$ 4096 MB).
- Click 'Import' (which will take a few minutes).
- Click the green right arrow to run the imported image.

You can login to the VM with a username 'user' without any password.

Generally, we don't need any sudo permission to use/reproduce our artifact. 
But for your information, the password of 'user' is 'user'. 

Please see [Readme.txt](/assets/files/cav2022-artifact/Readme.txt) for instructions to run the experiments.

**Vagrant**

We also provide a vagrant set-up \'[STLmc-Vagrant.zip](https://tinyurl.com/w574su7x)\'.
You can create a VirtualBox image using Vagrant ([https://www.vagrantup.com](https://www.vagrantup.com)) as follows:

1. Download and unzip the archive file ([STLmc-Vagrant.zip](https://tinyurl.com/w574su7x)).
2. Use the following command to initialize Vagrant:

    ```shell
    cd STLmc-Vagrant && vagrant up
    ```
  Vagrant automatically creates a VM image for our artifact.

    *Remark: At the end of the creation, one may see 'clock skew warning'. To resolve this, please refer to the step 5 below.*

3. To use the generated VM image, use ssh connect as follows:

    ```shell
    vagrant ssh
    ```

4. If succeed, you can see the artifact directory \'CAV2022-AeC\' as follows:
    
    ```shell
    vagrant@ubuntu-bionic:~$ ls
    CAV2022-AeC
    ```

5. (Optional step) When the 'clock skew warning' occurred, use the following command in the 'CAV2022-AeC' directory:

    ```shell
    vagrant@ubuntu-bionic:~/CAV2022-AeC$ find . -exec touch {} \;
    ```

Vagrant generates VM with a name 'ubuntu-bionic' and a username 'vagrant'.

In general, we don't need any sudo permission to use/reproduce our artifact. 
But for your information, the password of 'vagrant' is 'vagrant'.

Please see [Readme.txt](/assets/files/cav2022-artifact/Readme.txt) for instructions to run the experiments.

---

#### Running the Artifact in a non-VM Environment

**1. Prerequisites**

We explain how to install and run the artifact in a non-VM environment. The artifact requires the following libraries for prerequisites:

* Ubuntu 18.04 [https://ubuntu.com/download](https://ubuntu.com/download)
  
  We made this restriction because one of our underlying SMT solvers, Yices2, does not support Ubuntu 20.04 on Ubuntu PPA.

* Python3 (3.8.6) or newer: [https://www.python.org/downloads/](https://www.python.org/downloads/)
* Java8 or newer: [https://openjdk.java.net/install/](https://openjdk.java.net/install/)
* Python3-pip: [https://pypi.org/](https://pypi.org/)
    
    Please make sure that pip is up-to-date. Otherwise some Python libraries STLmc used, such as numpy, may fail to be installed.

* Yices2: [https://github.com/SRI-CSL/yices2/](https://github.com/SRI-CSL/yices2/)

    Our artifact needs MCSAT-enabled version of Yices2. Please follow the below installation steps to get this specific version of Yices2:

    **Ubuntu or Debian**

    To install Yices on Ubuntu or Debian, do the following:

    ~~~shell
    sudo apt install software-properties-common
    sudo add-apt-repository ppa:sri-csl/formal-methods
    sudo apt-get update
    sudo apt-get install yices2-dev
    ~~~

    **MacOS**

    To install on Darwin, use homebrew:

    ~~~shell
    brew install SRI-CSL/sri-csl/yices2
    ~~~

    *Remark: Some experiments may not run properly on the following architectures:
    Apple MacBook Pro 2015 or earlier (Yices 2.6 with QF-NRA is not working).*

* Z3: [https://github.com/Z3Prover/z3/](https://github.com/Z3Prover/z3/)

    **Ubuntu or Debian**

    Normally, Z3 solver is automatically installed when downloading its Python3 package (i.e., using pip3 install z3-solver).


    **MacOS** 

    Normally, Z3 solver is automatically installed as in Linux environment. But for some cases, we found that one may need to install Z3 binaries manually. This can be done using the following command:

    ~~~shell
    brew install z3
    ~~~


  
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

<br>

**2. Installation**

To install our artifact, follow the below instruction steps:

1. Download and unzip the archive file ([CAV2022-AeC-NoN-VM.zip](https://tinyurl.com/zw8awzhf)).
2. Install the following python packages:

    ```shell
    pip3 install termcolor yices z3-solver antlr4-python3-runtime==4.9.1 sympy numpy bokeh scipy
    ```

3. Run the following command:

    ```shell
    cd CAV2022-AeC-NoN-VM && make
    ```

4. Use the following command to run smoke tests for our installation:

    ```shell
    make test
    ```

    This command requires sudo permission. The command tests if all neccessary executables exist and are set to right permissions.
  Also, it tests underlying SMT solvers (i.e., Z3, Yices2, and dReal) using several smt2 
  test cases for integrity. Then, it tests STLmc using test STLmc models in 'tests' subdirectory.

    *Remark: One may see 'clock skew warning'. To resolve this, use the following command in the 'CAV2022-AeC-NoN-VM' directory:*
    ```shell
    find . -exec touch {} \;
    ```

5. If the tests succeed, you will see the following messages:

    ```shell
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


The archive file already contains dReal under the directory "CAV2022-AeC/stlmc/3rd_party".
Please see [Readme.txt](/assets/files/cav2022-artifact/Readme.txt) for instructions to run the experiments.