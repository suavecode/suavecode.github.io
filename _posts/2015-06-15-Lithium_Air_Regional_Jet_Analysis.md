---
layout: post
title: Lithium Air Regional Jet Analysis
date: 2015-06-15 14:25:00
categories: blog
---
<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>


##Introduction
The purpose of this tutorial is to illustrate one way of forming an optimization problem using SUAVE, as well as to highlight some of the more exotic propulsion system capabilities. This tutorial assumes that the user has completed the Boeing 737-800 tutorial, and has some familiarity with SUAVE's propulsion system data structures.

##Analysis Mode
 Open the file called "tut_opt_lithium_air_jet.py" in 
a text editor or IDE.
 Change the variable called "disp_results" from 0 to 1 (line 23)
<pre><code class="python">
    def main():
        global iteration_number #use global variable to keep track of how long optimization has gone
        global disp_results
        disp_results=0
</code></pre>

 Run the program (cd to the folder, then type python tut_opt_lithium_air_jet.py)

 Look at the plots or various values (more can be plotted, and are currently commented out). Press enter to close the plots.

##Optimization Mode
 Now try to run an optimization case. The initial guess is a python list

   * The variable order can be
seen in lines 27-44, along with the corresponding variable scaling factors.
<pre><code class="python">
    P_mot        =2E7 /(10.**7.);  
    climb_alt_1  =.01;  
    climb_alt_2  =.1;   
    climb_alt_3  =1;    
    climb_alt_4  =2;    
    climb_alt_5  =3;    
    alpha_rc     =-1.2; 
    alpha_tc     =-1.3; 
    wing_sweep   =0.1;  
    vehicle_S    =45*1./100.;   
    Vclimb_1     =120.*1./100.; 
    Vclimb_2     =130.*1./100.;  
    Vclimb_3     =200.*1./100.;  
    Vclimb_4     =210.*1./100.;  
    Vclimb_5     =230.*1./100.;  
    desc_alt_1   =2.;   
    desc_alt_2   =1;    
    cruise_range=2900.*1./1000; 
</code></pre> 

First change disp_results from 1 to 0 (signifying optimization)

Change the target range from 4800 km to 4400 km (line 101)
<pre><code class="python">
    m_guess    = 64204.6490117
    Ereq_guess = 117167406053.0
    Preq_guess = 8007935.5158
    target_range=4800 
</code></pre>

run the script (python tut_opt_lithium_air_jet.py).

Let it run awhile; feel free to check it intermittently to see the current guess as well as how the optimizer is handling constraints
  
If you're feeling ambitious, try tweaking other parts of the script.

 * reduce cruise range in the optimization (the final input)
 * modify or add a constraint (lines 232-291)
 * try different battery assumptions(uncomment line 449, change from 2000 W-h/kg (default lithium air) to 1500 W-h/kg.)
<pre><code class="python">
 #create battery
    battery = SUAVE.Components.Energy.Storages.Batteries.Variable_Mass.Lithium_Air()
    #battery.specific_energy=2000.*Units.Wh/Units.kg

</code></pre>
