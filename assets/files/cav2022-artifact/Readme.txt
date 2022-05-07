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


We provide a Zenodo url for the VM image 'STLmc.ova' via our tool webpage:

  https://stlmc.github.io/cav2022-artifact

This VM image contains our tool and experiments (with Ubuntu 18.04.6 installed). The size 
of the image is about 3.1GB. A minimum system requirement is a quad-core machine with 
4096MB memory. You can run the image using VirtualBox (https://www.virtualbox.org) as follows:

- Download 'STLmc.ova' from our webpage (https://stlmc.github.io/cav2022-artifact)
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
                                      -cfg ./therm_b5_f2_dreal.cfg -output pdf

The default visualization configuration makes two graphs: (1) a graph of continuous 
variables and (2) a graph of STL subformulas. User can determine grouping which variables
or STL subformulas for drawing graphs. This can be done by changing the visualization 
configuration file. For example, we can generate Figure 3 of our paper by modifying 
the group attributes in 'therm_b5_f2_dreal.cfg' as follows and re-running the above command:

      group { (x0, x1), (f2_0, f2_1), (f2_2, f2_3), (f2_4, f2_5)}
    
Using the group information, the 'stlmc-vis' script generates four pdf files, where each 
pdf file corresponding to each group. For example, using the above group information, 
'stlmc-vis' generates the following four pdf files:

  { 'state_x0_x1.pdf' , 'rob_f2_5_f2_4.pdf' , 'rob_f2_3_f2_2.pdf' , 'rob_f2_0_f2_1.pdf' }

The name of pdf files may differ because the ordering of elements in each group is not fixed.
See our tool manual 'STLmc-manual.pdf' for more details. 




=======================================
4. Running the Experiments 
=======================================


In Sec. 5 of our paper, we evaluate the effectiveness of STLmc using a number of 
hybrid system benchmarks. We analyze three STL properties for each benchmark as 
indicated in Table 2 of our paper, with various discrete bounds considering model 
dynamics (i.e., 20, 10, 5 for linear, polynomial, and ODE dynamics).


The experimental results of Table 2 were obtained by running each analysis with a timeout 
of 30 minutes. In VM, it will take about 1 hour on AMD Ryzen 9 3.3GHz with VM quad-core 
and 4096MB memory. 


We provide the script 'run-exp' in the 'experiment' subdirectory to automate the reproduction 
of our experiments. The following command reproduces our papar experiment, explained in Sec. 5
(i.e., the script runs all 18 cases for this experiment including 6 models each with 3 formulas 
under a 30-minute timeout): 

user@VB:~/CAV2022-AeC/experiment$ ./run-exp "../benchmarks/paper/*" -t 1800

In order to support wildcard matching (i.e., "<DIR>*"), 'run-exp' takes a glob pattern as its
argument (i.e., the argument of the script must be given within the two quotation marks: "<ARG>").

The argument '-t 1800' sets a timeout in seconds. The script searches for STLmc model files under 
all the subdirectories of '../benchmarks/paper'. The script produces raw log data files under 
the 'log-<ARG>' subdirectory, placed in the same directory as the 'run-exp' script.
For example, the above command produces raw log files in the 'log-benchmarks-paper-*' subdirectory,
placed at 'CAV2022-AeC/experiment'.  


For easy reproduction, we provide a 'gen-report' script to generate a CSV file report 
from the raw data. For example, the following command generates CSV report file for our paper experiment:

user@VB:~/CAV2022-AeC/experiment$ ./gen-report

For easy data comparison to our paper, we provide a 'gen-paper-table' script to generate html tables from 
raw log files. This script searches all csv files having names starting with 'log-*' and generates 
html tables with the layout of Table2 of our paper. For example, suppose we already have 
'log-benchmarks-paper-*' directories. The following command generates a html version of Table 2 of our paper 
named 'logs-benchmarks-paper-*-paper-table2.html':

user@VB:~/CAV2022-AeC/experiment$ ./gen-paper-table


Remark: When solving a problem using the parallelized two-step algorithm, the bound (k) at which 
a counterexample is found may differ by up to '1' because of the concurrency and non-determinism of our algorithm. 
Thus, we run all paper experiments for five times and attach the results in the 'logs' directory.



=======================================
5. More usage of the STLmc Tool
=======================================


We explain more detailed usages of the STLmc tool using the autonomous driving of two car model,
placed under the subdirectory 'benchmarks/paper/car-poly'. We can select the property to be analyzed 
using the '-goal' option. The default argument for the option is 'all'. This will run all STL properties
specified in the model file. The following command performs a robust STL model checking 'f1' properties 
of the car model at bound 10 and time bound 15 with respect to robustness threshold 0.5 using Yices2 solver:

user@VB:~/CAV2022-AeC/src$./stlmc ../benchmarks/paper/car-poly/car.model \ 
                                  -bound 10 -time-bound 15 -threshold 0.5 -solver yices -goal f1

The analyses in VM took 10 seconds on AMD Ryzen 9 3.3GHz with VM quad-core and 4096MB of memory.


The STLmc tool supports some error handling. For example, consider the STL property in the same model
'[f1]: [][0,inf] (vx < -2 -> <>[2,5] rx <= -2);' in which the interval is infeasible. Then, our tool raises 
the following error message:

    syntax error: in "../benchmarks/paper/car-poly/car.model" line 91:16 mismatched input ']' expecting ')'




=======================================
6. Running the Additional Experiments 
=======================================


We consider the following additional benchmark models: bat-poly, bat-ode, wat-poly, wat-ode, 
car-linear, car-ode, rail-linear, rail-ode, thm-linear, the-poly, nav-ode, space-ode.
See the STLmc technical report (https://stlmc.github.io/documents) for more details.
These models and formulas are declared in the 'benchmarks/additional' directory.


Using the script 'run-exp', we can run all additional benchmark models with a 1-hour timeout as follows:

user@VB:~/CAV2022-AeC/experiment$ ./run-exp "../benchmarks/additional/" -t 3600

In VM, it will take about 3 hours on AMD Ryzen 9 3.3GHz with VM quad-core and 4096MB memory. 

The script produces raw log data files in the 'log-benchmarks-additional' subdirectory, explained above. 
We also provide a 'gen-tech-table' script, similar to the 'gen-paper-table' script, for generating 
Table 2 and 3 of our technical report. The following command generates Table 2 and Table 3 of the technical 
report, named 'log-benchmarks-additional-tech-table2.html' and 'log-benchmarks-additional-tech-table3.html', 
respectively:

user@VB:~/CAV2022-AeC/experiment$ ./gen-tech-table




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
- paper/paper-result-table.pdf: the html table generating from paper-result.csv, matching the Table 2 of our paper

- additional/raw.zip: the raw log files of the extended experiments of the STLmc technical report (Table 2 and Table 3)
- additional/result.csv: the csv report of averaging the data of all N trials
- additional/result-table2.html: the html table generating from additional-result.csv, matching the Table 2
- additional/result-table3.html: the html table generating from additional-result.csv, matching the Table 3




=======================================
8. More Details on Our Scripts 
=======================================


(1) The 'run-exp' script

The 'run-exp' script provides options to run a subset of the experiments. 
The command './run-exp -h' shows more details about arguments.
There are two (optional) command line arguments as follows: 

user@VB:~/CAV2022-AeC/experiment$ ./run-exp "<PATH TO MODELS>" \
                                            [-t <TIMEOUT>] 

The script takes a path to directories of a model file to be analyzed and a timeout in seconds.
As mentioned, in order to support wildcard matching (i.e., "<DIR>*"), 'run-exp' takes a glob pattern as its
argument (i.e., the argument of the script must be given within the two quotation marks: "<ARG>").

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
    goal = "f1"  
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
    goal = "f1"
    threshold = 5 
}

Then, STLmc will analyze the 'therm.model' on STL property 'f1' upto time bound 10 with respect 
to the threshold 5. See our tool manual 'STLmc-manual.pdf' for more details. 



(2) The 'stlmc-vis' script


The 'stlmc-vis' script provides several options to generate counterexample witnesses. 
The command './stlmc-vis -h' shows more details about arguments.
There are three command line arguments as follows: 

user@VB:~/CAV2022-AeC/src$ ./stlmc-vis [-output <FORMAT>] \
                                       -cfg <CONF_FILE> \
                                       <FILE>

The 'stlmc' generates a counterexample file and a visualization configuration file 
when '-visualize' option is set. The visualization configuration file contains 
grouping information for drawing counterexample witnesses. For example, we can draw two graphs 
in pdf format, where each graph containing continuous variables 'x0' and 'x1', respectively, 
by modifying the group attributes in 'therm_b5_f2_dreal.cfg' as follows: 

	group { (x0), (x1) } 

and run the following command:

user@VB:~/CAV2022-AeC/src$./stlmc-vis ./therm_b5_f2_dreal.counterexample \
                                      -cfg ./therm_b5_f2_dreal.cfg \
                                      -output pdf

When '-output' is not specified, the script generates counterexample graphs in html format.
See our tool manual 'STLmc-manual.pdf' for more details. 



(3) The 'gen-report' script


The 'gen-report' script finds directories having names starting with 'log-*' and 
generates a csv report file with the same name. E.g., for the 'log-benchmarks-paper' directory 
the script generates 'log-benchmarks-paper.csv' file in the same directory.


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

- (a) user@VB:~/CAV2022-AeC/experiment$ ./run-exp "../benchmarks/paper/" -t 1800 
- (b) user@VB:~/CAV2022-AeC/experiment$ ./run-exp "../benchmarks/paper/*-poly" -t 1800

The above commands generates two log directories (i.e., log-benchmarks-paper and 
log-benchmarks-paper-*-poly) in the current directory. Then, 'gen-report' generates 
two csv files: logs-benchmarks-paper.csv and logs-benchmarks-paper-*-poly.csv 
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

For example, the autonomous car model with polynomial dynamics of our paper is placed under the directory 
'benchmarks/paper/car-poly' as follows:

- benchmarks/paper/car-poly
  * car.model: a model of an autonomus driving of two cars
  * car.cfg: basic model configuration
  * car-f1.cfg: configuration considering the goal 'f1'
  * car-f2.cfg: configuration considering the goal 'f2'
  * car-f3.cfg: configuration considering the goal 'f3'


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

  - Gnuplot: http://www.gnuplot.info/



To install our artifact, follow the below instruction steps:

1. Download and unzip the archive file (CAV2022-AeC.zip).
2. Install the following python packages:
    
  - pip3 install termcolor yices z3-solver \
                 antlr4-python3-runtime==4.9.1 \
                 sympy numpy bokeh scipy
    

3. Run the following command:

  - cd CAV2022-AeC && make
  
4. Use the following command to run smoke tests for our installation:
  
  - make test

  This command requires sudo permission.

5. If the tests succeed, you will see the following messages:

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

STLmc uses the following SMT solvers as its underlying SMT solvers:

* Z3: https://github.com/Z3Prover/z3/
* Yices2: https://github.com/SRI-CSL/yices2/
* dReal: https://github.com/dreal/dreal3/

The archive file already contains dReal under the directory 'CAV2022-AeC/3rd_party'.
Note that, we also use the above installation instructions to create our Zenodo 
VirtualBox image. You can create a new VM image using Ubuntu by following the step 
1 ~ 5, starting from downloading and unzipping the 'CAV2022-AeC.zip' on the virtual machine.

See our webpage https://stlmc.github.io/cav2022-artifact/ for more details
