---
layout: post
title: AVL - Boeing 737-800
date: 2014-03-14 13:25:00
categories: blog
description: Setup and analyze an aircraft using Athena Vortex Lattice (AVL)

permalink: /guides/AVL_Tutorial.html
---

<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

## Boeing 737 Using AVL

SUAVE was built upon the philosophy of creating a conceptualizing space that enables the user to have maximum design, 
analysis and optimization flexibility. In SUAVE, the aerodynamics and stability module is set up to permit multiple fidelity
levels of analysis. The addition of  Athena Vortex Lattice (AVL), a vortex lattice method (VLM) code developed by Professor
Mark Drela at MIT, extends SUAVE aerodynamic and stability analysis of aircraft configurations whose geometry have prior 
posed difficulty in obtaining accurate results. Examples include oblique wings, joined wings, canard configurations and 
blended-wing-bodies (BWB). For this example we use the Boeing 737-800 used in the Boeing 737-800 Tutorial. 

### Downloading AVL
The tutorial assumes that AVL is available on your machine and can be called using just “avl” in the command line. AVL can be downloaded [here](http://web.mit.edu/drela/Public/web/avl/) for all platforms. 

### Steps to simulate the aircraft's performance over a mission 
1. Locate the folder where you have the tutorial repository. If using the command line, cd to this directory.
2. Open the tut_mission_B737_AVL.py script in your favorite editor or IDE. The script is setup to run the B737 on its design
mission. Run it in your IDE. If using the command line use the command.

<pre><code class="python"> python tut_mission_B737_800_AVL.py  </code></pre>

It is very simple to interchange analysis tools in SUAVE. AVL is no exception. To study an aircraft in SUAVE using AVL, simply change the two lines in the analysis_set up shown below form Fidelity_Zero (SUAVE’s first order approximation method) to AVL.

Replace line 109        
<pre><code class="python"> aerodynamics = SUAVE.Analyses.Aerodynamics.Fidelity_Zero() </code></pre>
with    
<pre><code class="python">  aerodynamics = SUAVE.Analyses.Aerodynamics.AVL() </code></pre>

SUAVE launches AVL from the command line, runs analyses and then reads in the files. This process is done automatically. All
subroutines described later in this tutorial are done in the background. Since running a full stability analysis at each 
point in the mission can be extremely expensive, a surrogate model is built for the aerodynamic coefficients, stability
derivatives, and neutral point locations by running through a set of representative angles of attack and mach numbers. 

3. A few plots depicting the variation of the different aircraft performance parameters over the course of the mission are shown.

### Important Functions: 
The important functions used in this tutorial are exactly the same as the ones used in the Boeing Boeing 737-800 Analysis 
Tutorial. Refer to this section in this tutorial [here](http://suave.stanford.edu/guides/boeing_737-800.html). 
### Subroutines Unique to SUAVE-AVL
*Excluding the functions **tut_mission_B737_AVL.py** script, all of the subroutine python scripts described below are located
in the SUAVE/Methods/Aerodynamics/AVL repository*. 
#### Geometry Creation - Wing 
Parameters defining the aircraft geometry in the in the vehicle_setup() are translated to an AVL file format using embedded 
subroutines. Shown below is an example of the translation of the wing geometry from the vehicle-setup() function to AVL file
format.
1. Firstly, if the wing defined by segments, a data structure is created to store the geometry parameters (chord length,twist,span location) of the beginning and end of each segment. For example the 737-800 wing below will be divided into three segments - yehudi, inboard and outboard wing). 
2. Secondly, if control surfaces are defined either the full wing or its segments, the data structure created in step 1 is 
further divided into sections at instances where the control surfaces begin and end. This is shown images below.

     <img src="https://github.com/suavecode/suavecode.github.io/blob/develop/images/B737_avl.PNG" width="300" height="200">       <img src="https://github.com/suavecode/suavecode.github.io/blob/develop/images/B737_avl_wing.PNG" width="300" height="200">

The above steps describing wing geometry parameterization are found in **create_avl_datasturcture.py** script. Along with 
the creation of wing geometry, the SAUVE-AVL wrapper allows the user to refine the accuracy of the analysis by modifying the
vortex spacing placed on the wings. The number of chordwise/spanwise horseshoe vertices can also be modified. This is located in the Analyses/Aerodynamics/**AVL_Inviscid.py** (for Aerodynamics)  and Analyses/Stability/**AVL.py** (for Stability) scripts below.  
<pre><code class="python">  # Default spanwise vortex density 
  self.settings.spanwise_vortex_density  = 1.5
</code></pre>

#### Geometry Creation - Fuselage 
Despite AVL having the capability of modelling bodies, a decision was made to model the fuselage as a wake-producing, lifting surface. The entire body is defined by a series of vertical and horizontal chords that create a cross when viewed from the front. 

#### Defining Flight Conditions
This is done in the **translate_data.py** script which translates flight conditions parameters defined in the 
**mission_setup()** to an AVL data structure to be used in run cases. This script also stores AVL results into SUAVE’s 
results data structures.  
#### Writing Run Cases 
Uses information in the AVL run case data structure created in **translate_data.py**  to write an AVL format run case to be
used by the AVL executable. This is done in **write_run_cases.py** script. 
#### Writing Commend Instructions for AVL executable
This is a sequence of commands used to load AVL files into the executable, perform aerodynamic and stability analyses, and 
save results. This is done in **write_input_deck.py** script.
#### Reading Results
Opens saved AVL result files and stores data in a data structure used to create aerodynamic and stability surrogate models.
This is done in **read_results.py** script.

### Results
The plots shown below should be generated if the mission analysis executes correctly. The results show the aerodynamic, propulsion and mission properties of the B737-800 for the defined mission.


![B737 mission](/images/B737_AVL_Altitude_sfc_weight.png)

![B737 Aerodynamics](/images/B737_AVL_Aerodynamic_Coefficients.png)

![B737 Propulsion](/images/B737_AVL_Aerodynamic_Forces.png)

![B737 Drag](/images/B737_AVL_Drag_Components.png)
