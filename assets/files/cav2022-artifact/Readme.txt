This file explains the artifact for our paper "STLmc: Robust STL Model Checking
of Hybrid Systems using SMT". 

The STLmc tool is available on our tool webpage:

 https://stlmc.github.io/




=======================================
1. Artifact Overview
=======================================

The artifact can be downloaded from https://stlmc.github.io/cav2022-artifact.
The artifact includes the following things: 

  (1) a short demo of the STLmc tool,
  (2) a script to run the experiments in the paper, and
  (3) additional examples providing more detailed usages not included in the paper.

Part (1) explains how to execute the input model and visualize counterexamples 
in Sec. 3 of the paper. Part (2) shows how to reproduce the experimental results 
in Table 2 in Sec. 5 of the paper. Part (3) describes an additional demo and 
additional benchmark models not included in the paper for 'reusable' badge.

The STLmc artifact includes the following files and directories:

- AUTHORS.md : authors information,
- LICENSE.md : the STLmc tool license,
- Makefile : a makefile for generating Antlr4 parser and setting permissions for executables,
- benchmarks : benchmark models for our paper and additional experiments,
- 3rd_party : 3rd-party SMT sovlers for the STLmc tool,
- experiment : experiment reproduction scripts,
- src : the source codes and executables of STLmc,
- Readme.txt : a file explaining how to use our artifact for reproduction as well as tool usage,
- paper.pdf : an accepted paper,
- logs : the experimental results and raw log files of the experiments that run on provided VM.

The rest of 'README' is organized as follows. Section 2 provides how to set up the artifact 
using the virtual box image. Section 3 describes a short demo of the STLmc tool in Sec. 3 
of the paper. Section 4 explains how to reproduce the experiments in Sec. 5 of the paper.
For "reusable" badge, more usage of the STLmc tool and additional experiments are described
in Section 5 and 6, respectively. Section 7 explains the structure of the log files 
for the experiments. Section 8 describes more details on our scripts. Section 9 explains 
the structure of the model and configuration files for the experiments. Section 10 explains 
the most relevant parts of the source code. Finally, Section 11 provides guidance on 
how to run the artifact without VM.

 


=======================================
2. Running the VirtualBox Image
=======================================


We provide a Zenodo url for the VM image 'STLmc.ova' via 

 http://doi.org/10.5281/zenodo.4699760) 

This image contains our tool and experiments (with Ubuntu 18.04.6 installed). The size 
of the image is about 3.1GB. A minimum system requirement is a quad-core machine with 
4096MB memory. You can run the image using VirtualBox (https://www.virtualbox.org) as follows:

- Download 'STLmc.ova' from http://doi.org/10.5281/zenodo.4699760
- Click 'File/Import Appliance' in the top menu.
- Choose 'STLmc.ova', and click 'Continue'.
- Set the number of CPU cores (>= 4) and the size of memory (>= 4096 MB).
- Click 'Import' (which will take a few minutes).
- Click the green right arrow to run the imported image.




=======================================
3. Short Demo of the STLmc Tool 
=======================================


The directory '/home/user/CAV2022-AeC' (i.e., $HOME/CAV2022-AeC) in the virtual
machine contains the STLmc tool and experiments. To start the STLmc tool, run 'stlmc' 
in the subdirectory 'src', using the command line. You can find the model file 
'therm.model', explained in Sec. 3 of our paper, under the subdirectory 
'benchmarks/paper/thm-ode'.


The following command performs a robust STL model checking the property
labeled 'f2' of the thermostat model at bound 5 and time bound 30 with respect to
robustness threshold 2 using parallelized 2-step algorithm and dReal:

user@VB:~/CAV2022-AeC/src$./stlmc ../benchmarks/paper/thm-ode/therm.model \ 
                                  -bound 5 -time-bound 30 -threshold 2 \
                                  -goal f2 -solver dreal -two-step -parallel \
		 		                          -visualize

The analyses in VM took 91 seconds for 'f2' (found counterexample) on AMD Ryzen 9 
3.3GHz with VM quad-core and 4096MB of memory. 

The command generates a counterexample file, named 'therm_b5_f2_dreal.counterexample',
and a visualization configuration file, named 'therm_b5_f2_dreal.cfg', in the current 
directory because the '-visualize' option is set. These files are used to draw graphs 
of counterexamples. 


We provide a script 'stlmc-vis' to draw counterexample signals and robustness
degrees. The script takes a counterexample file and a visualization configuration 
and generates graphs of counterexamples. For example, the counterexample graphs 
for the property 'f2' of the thermostat can be generated using the following command:

user@VB:~/CAV2022-AeC/src$./stlmc-vis ./therm_b5_f2_dreal.counterexample \
                                      -cfg ./therm_b5_f2_dreal.cfg

The default visualization configuration makes two graphs: (1) a graph of continuous 
variables and (2) a graph of STL subformulas. User can determine grouping which variables
or STL subformulas for drawing graphs. This can be done by changing the visualization 
configuration file. For example, we can generate Figure 3 of our paper by modifying 
the group attributes in 'therm_b5_f2_dreal.cfg' as follows:

     group { (x0, x1), (f2, f2_1), (f2_2, f2_3), (p_1, p_2)}

See our tool manual 'STLmc-manual.pdf' for more details. 




=======================================
4. Running the Experiments 
=======================================


In Sec. 5 of our paper, we evaluate the effectiveness of STLmc using a number of 
hybrid system benchmarks. We analyze three STL properties for each benchmark as 
indicated in Table 2 of our paper, with various discrete bounds considering model 
dynamics (i.e., 20, 10, 5 for linear, polynomial, and ODE dynamics).


The experimental results of Table 2 were obtained by running each analysis with a timeout 
of 30 minutes. In VM, it will take about 1 hours on AMD Ryzen 9 3.3GHz with VM quad-core 
and 4096MB memory. 


We provide the script 'run-exp' in the 'experiment' subdirectory to automate the reproduction 
of our experiments. The following command reproduces our papar experiment, explained in Sec. 5
(i.e., the script runs all 18 cases for this experiment including 6 models each with 3 formulas 
under a 30-minute timeout): 

user@VB:~/CAV2022-AeC/experiment$ ./run-exp ../benchmarks/paper/* -t 1800

The argument '-t 1800' sets a timeout in seconds. The script searches for STLmc model files under 
all the subdirectories of '../benchmarks/paper'. The script produces raw log data files under 
the 'logs-<GIVEN_INPUT_DIR>' subdirectory, placed in the same directory as the 'run-exp' script.
For example, the above command produces raw log files in the 'logs-benchmarks-paper' subdirectory,
placed at 'CAV2022-AeC/experiment'.  


For easy reproduction, we provide a 'gen-report' script to generate a CSV file report 
from the raw data. For example, the following command generates CSV report file 
for our paper experiment:

user@VB:~/CAV2022-AeC/experiment$ ./gen-report

For easy data comparison to our paper, we provide a 'gen-table' script to generate html tables 
from the generated csv files. This script searches all csv files having names starting 
with 'logs-*' and generates html tables with the layout of Table2 of our paper. 
For example, suppose we already have 'logs-benchmarks-paper.csv' by running (a).
The following command generates a html version of Table 2 of our paper named 
'logs-benchmarks-paper.html':

user@VB:~/CAV2022-AeC/experiment$ ./gen-table


Remark: When solving a problem using the parallelized two-step algorithm, the bound (k) at which 
a counterexample is found can differ by up to '1' because of the concurrency issue of the algorithm. 
Thus, we run all experiments for five times and attach these results to the 'logs' directory.



=======================================
5. More usage of the STLmc Tool
=======================================


We explain more usage of the STLmc tool using the load management for two batteries
model file under the subdirectory 'benchmarks/paper/bat-linear'. We can select the property
to be analyzed using the '-goal' option. The default argument for the option is 'all' 
that runs all STL properties. The following command performs a robust STL model checking 
all properties of the battery model at bound 20 and time bound 30 with respect to robustness 
threshold 1 using direct STM solving and yices:

user@VB:~/CAV2022-AeC/src$./stlmc ../benchmarks/paper/bat-linear/battery.model \ 
                                  -bound 20 -time-bound 30 -threshold 1 -solver yices

<----The analyses in VM took 91 seconds on AMD Ryzen 9 3.3GHz with VM quad-core and 4096MB of memory. ---->


The STLmc tool supports some error handling. For example, consider the STL property 
'f1: []_(5, 2] x > 3' in which the interval of the temporal operator is wrong.
Then, our tool raises the following error message:

<---'''''''' ---->




=======================================
6. Running the Additional Experiments 
=======================================


We consider the following additional benchmark models: bat-poly, bat-ode, wat-poly, wat-ode, 
car-linear, car-ode, rail-linear, rail-ode, thm-linear, the-poly, nav-ode, space-ode.
See the STLmc technical report (https://stlmc.github.io/documents) for more details.
These models and formulas are declared in the "benchmark/additional" directory.


Using the script 'run-exp', we can run all additional benchmark models with a 1-hour timeout, 
e.g., by the following command:

user@VB:~/CAV2022-AeC/experiment$ ./run-exp ../benchmarks/additional/* -t 3600

The script produces raw log data files in the 'logs-benchmarks-additional' subdirectory,
explained above. The following command generates Table 2 and Table 3 of the technical report 
named 'logs-benchmarks-additional.html':

user@VB:~/CAV2022-AeC/experiment$ ./gen-table




=======================================
7. Log Files for the Experiments
=======================================


The subdirectory 'logs' of the top artifact directory 'CAV2022-AeC' contains the raw log data
and CSV reports and corresponding html tables for the experiments. Note that due to concurrency 
and non-determinism of parallelization algorithm, we run five times for all reproductions. 
Each result of experiments is saved under the directory, named 'trial-<N>', where 'N' is one of 
{1, 2, 3, 4, 5}. We also provide summarized csv report file averaging the data of all trials. 
The 'logs' directory contains the following (the raw log files are compressed in trial-<N>.zip):

- paper/trial-<N>.zip: the raw log files of N-th trial of experiments of our paper (Table 2)
- paper/trial-<N>.csv: the csv report of N-th trial
- paper/paper-result.csv: the csv report of averaging the data of all N trials
- paper/paper-result-table2.html: the html table generating from paper-result.csv, matching the Table 2 of our paper

- additional/trial-<N>.zip: the raw log files of the extended experiments of the STLmc technical report (Table 2 and Table 3)
- additional/trial-<N>.csv: the csv report of N-th trial
- additional/additional-result.csv: the csv report of averaging the data of all N trials
- additional/additional-result-table2.html: the html table generating from additional-result.csv, matching the Table 2 and Table 3




=======================================
8. More Details on Our Scripts 
=======================================


(1) The 'run-exp' script

The 'run-exp' script provides options to run a subset of the experiments. 
The command './run-exp -h' shows more details about arguments.
There are two (optional) command line arguments as follows: 

user@VB:~/CAV2021-AeC/experiment$ ./run-exp "<PATH TO MODELS>" \
                                            [-t <TIMEOUT>] 

The script takes a path to directories of a model file to be analyzed and a timeout in seconds.
E.g, the following command runs all thermostat models in additional experiments 
with a 1-hour timeout.

user@VB:~/CAV2022-AeC/experiment$ ./run-expo "../benchmarks/additional/thm-*" -t 3600 

We can instantiate analysis parameters such as bound, time bound, etc. by modifying
a model configuration file and a model-specific configuration file. 

The configuration files are located in the same directory as the corresponding model.
For example, a model configuration file 'therm.cfg' and a model specific configuration 
'therm-f1.cfg' are in the subdirectory 'benchmarks/paper/thm-ode' together with the model 
file 'therm.model'.


We can change common analysis parameters of a model by editing the model configuration file.
For example, we can change the time bound for the thermostat model to 5 by modifying 
the time-bound parameter in 'therm.cfg' as follows:

  common {
    ...
    time-bound = 5 # originally it was 20 ... 
  }


The analysis parameters for a specific formula, such as threshold, can be modified using 
a model specification configuration file. For example, we can change the threshold 
for the property 'f2' of the thermostat to 5 by modifying the threshold parameter 
'therm-f1.cfg' as follows:

  common { 
    goal = f1  
    threshold = 5 
  }

If some parameters are defined in a model configuration file and a model specific 
configuration file at the same time, the values of the parameters in model specific 
configuration file override the values in the model configuration file.
For example, suppose the 'therm.cfg' given as follows:

  common { 
    time-bound = 20 
  }

and the 'therm-f1.cfg' is given as follows:

  common { 
    time-bound = 10 
    goal = f1
    threshold = 5 
}

Then, STLmc will analyze the 'therm.model' on STL property 'f1' upto time bound 10 with respect 
to the threshold 5. See our tool manual 'STLmc-manual.pdf' for more details. 



(2) The 'stlmc-vis' script


The 'stlmc-vis' script provides several options to generate counterexample witnesses. 
The command './stlmc-vis -h' shows more details about arguments.
There are three command line arguments as follows: 

user@VB:~/CAV2021-AeC/src$ ./stlmc-vis [-output <FORMAT>] \
                                       -cfg <CONF_FILE> \
                                       <FILE>

The 'stlmc' generates a counterexample file and a visualization configuration file 
when '-visualize' option is set. The visualization configuration file contains 
grouping information for drawing counterexample witnesses. For example, we can draw two graphs 
in html format, where each graph containing continuous variables 'x0' and 'x1', respectively, 
by modifying the group attributes in 'therm_b5_f2_dreal.cfg' as follows: 

	group { (x0), (x1) } 

and run the following command:

user@VB:~/CAV2022-AeC/src$./stlmc-vis ./therm_b5_f2_dreal.counterexample \
                                      -cfg ./therm_b5_f2_dreal.cfg \
                                      -output html

See our tool manual 'STLmc-manual.pdf' for more details. 



(3) The 'gen-report' script


The 'gen-report' script finds directories having names starting with 'logs-*' and 
generates a csv report file with the same name. E.g., the above command generates 
'logs-benchmarks-paper.csv' file in the current directory.


The csv file contains the following columns for each case of the experiment 
described in Sec.5  of our paper:

- dynamics: the countinuous dynamics of the model
- model: the name of the benchmark model
- formula: the labels of the STL formulas for the model (f1, f2, or f3)
- time bound: the time bound for the model
- threshold: the robustness threshold
- size: the size of generated SMT encoding
- time: the execution time of the selected algorithm
- result: the result of the STL model checking
- bound: the bound at which the selected algorithm is terminated
- scenarios: the number of minimal scenarios
- algorithm:	the model checking algorithm, either 1-step or 2-step

Each row of the csv file corresponds to an item in the Table 2. 
For example, the following csv row corresponds to the case of (Linear, Wat, f2)
in Table 2 of the paper:

linear, wat, f2, 20, 0.1, 1878, 4.22, FALSE, 4, -, 1-step.


There can be multiple log directories. In this case, 'gen-report' generates multiple 
csv files corresponding to each log directory. For example, suppose we use 'run-exp' 
to reproduce the whole paper experiment and the subset of the paper experiment 
(i.e., polynomial cases) as follows:

- (a) user@VB:~/CAV2022-AeC/experiment$ ./run-exp ../benchmarks/paper/* -t 1800 
- (b) user@VB:~/CAV2022-AeC/experiment$ ./run-exp ../benchmarks/paper/*-poly -t 1800

The above commands generates two log directories (i.e., logs-benchmarks-paper and 
logs-benchmarks-paper-poly) in the current directory. Then, 'gen-report' generates 
two csv files: logs-benchmarks-paper.csv and logs-benchmarks-paper-poly.csv 
for (a) and (b), respectively.




=======================================
9. Model and Configuration Files
=======================================


The benchmark models and configuration files of our paper are included in the subdirectory 
'benchmarks/paper/' of the top directory 'CAV2022-AeC'. The files are in the following, 
where <MODEL>-<DYNAMICS> is one of {bat-linear, wat-linear, car-poly, rail-poly, thm-ode, oscil-ode}
and <LABEL> is one of {f1,f2,f3}:

- benchmarks/paper/<MODEL>-<DYNAMICS>/
  * <MODEL>.model: the STLmc model <MODEL>
  * <MODEL>.cfg: basic model configuration
  * <MODEL>-<LABEL>.cfg: configuration considering the goal '<LABEL>'

For example, the Thermostat controller with ODE dynamics of our paper is placed under the directory 
'benchmarks/paper/thm-ode' as follows:

- benchmarks/paper/thm-ode
  * thm.model: a thermostat controller model
  * thm.cfg: basic model configuration
  * thm-f1.cfg: configuration considering the goal 'f1'
  * thm-f2.cfg: configuration considering the goal 'f2'
  * thm-f3.cfg: configuration considering the goal 'f3'


Additional models and configuration files are placed under the directory 'benchmarks/additional/'
in the same structure above. The files are in the following, where <MODEL>-<DYNAMICS> is one of 
{bat-poly, bat-ode, wat-poly, wat-ode, car-linear, car-ode, rail-linear, rail-ode, thm-linear, 
the-poly, nav-ode, space-ode} and <LABEL> is one of {f1,f2,f3}:


For example, the Spacecraft with ODE dynamics of our technical report
is placed under the directory 'benchmarks/additional/space-ode' as follows:

- benchmarks/additional/space-ode
  * space.model: a docking of spacecraft model
  * space.cfg: basic model configuration
  * space-f1.cfg: configuration considering the goal 'f1'
  * space-f2.cfg: configuration considering the goal 'f2'
  * space-f3.cfg: configuration considering the goal 'f3'



=======================================
10. STLmc Source Code
=======================================


The entire source code of our tool is located in the 'src' subdirectory of the top directory 
'CAV2022-AeC'. Our tool is implemented in around 9,500 lines of Python code.
Some interesting parts of the source codes are as follow:

- src/stlmcPy/driver/base_driver.py:
    a base driver for the STLmc tool

- src/stlmcPy/encoding/monolithc.py: 
    1-step solving algorithm implementation, explained in Sec. 4.2 of our paper
    
- src/stlmcPy/encoding/enumerate.py:
    implementation of 2-step solving algorithm, explained in Sec. 4.3 of our paper

- src/stlmcPy/objects/algorithm.py:
    implementation of SMT parallelization algorithm

- src/stlmcPy/solver/abstract_solver.py:
    an abstract SMT solving interface 

- src/stlmcPy/solver/yices.py:
    implementation of the solving interface for Yices2 solver 

- src/stlmcPy/solver/z3.py:
    implementation of the solving interface for Z3 solver 

- src/stlmcPy/solver/dreal.py:
    implementation of the solving interface for dReal solver 

- src/stlmcPy/visualize
    the counterexample visualization implementation




=======================================
11. Running the Artifact without VM
=======================================


To run the STLmc tool in other than provided virtual machine, 
the followings are required:

- Python version 3.8.6 or newer: https://www.python.org/downloads/

- JAVA 8 or newer: https://openjdk.java.net/install/

- Python3-pip: https://pypi.org/
    Please make sure that pip is up-to-date. Otherwise some Python libraries STLmc used, such as numpy, 
    may fail to be installed.

- Yices2: https://github.com/SRI-CSL/yices2/

    Our artifact needs MCSAT-enabled version of Yices2. Please follow the below installation steps to get 
    this specific version of Yices2:

    * MacOS

      To install on macOS, use homebrew:

      $brew install SRI-CSL/sri-csl/yices2
  

    * Ubuntu

      To install Yices on Ubuntu, do the following:
    
      $sudo apt install software-properties-common
      $sudo add-apt-repository ppa:sri-csl/formal-methods
      $sudo apt-get update
      $sudo apt-get install yices2-dev



To install our artifact, follow the below instruction steps:

1. Download and unzip the archive file (CAV2022-AeC.zip) to some directory (e.g., /home/\<USER\>/).
2. Install the following python packages:
    
  - pip3 install termcolor yices z3-solver \
                 antlr4-python3-runtime==4.9.1 \
                 sympy numpy bokeh scipy
    

3. Run the following command:

  - cd CAV2022-AeC && make
  
4. Use the following command to run smoke tests for our installation:
  
  - cd CAV2022-AeC && make test

  This command tests if all neccessary executables exist and are set to right permissions.
  Also, it tests underlying SMT solvers (i.e., Z3, Yices2, and dReal) using several smt2 
  test cases for integrity. Then, it tests STLmc using test STLmc models in 'tests' subdirectory.

5. If the tests succeed, you will see the following messages:

  start smoke test ...
  [exec] Python: pass
  [exec] Yices: pass
  [exec] dReal: pass
  [exec] Z3: pass
  [exec] Java: pass
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

STLmc uses the following SMT solvers as its underlying SMT solvers:

* Z3: https://github.com/Z3Prover/z3/
* Yices2: https://github.com/SRI-CSL/yices2/
* dReal: https://github.com/dreal/dreal3/

The archive file already contains dReal under the directory 'CAV2022-AeC/3rd_party'.
Note that, we also use the above installation instructions to create our Zenodo 
VirtualBox image (http://doi.org/10.5281/zenodo.4699760). You can create a new 
VM image using Ubuntu by following the step 1 ~ 5, starting from downloading and 
unzipping the 'CAV2022-AeC.zip' on the virtual machine.
