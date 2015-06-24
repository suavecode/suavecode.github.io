---
layout: post
title: Lithium Air Regional Jet Analysis
date: 2015-06-15 14:25:00
categories: blog

permalink: /guides/lithium_air_regional_jet_analysis.html
---
<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>


##Introduction
The purpose of this tutorial is to highlight some of SUAVE's more exotic propulsion system capabilities. This tutorial assumes that the user has completed the Boeing 737-800 tutorial, and has some familiarity with SUAVE's propulsion system data structures.

##Baseline Case
 Open the file called "tut_lithium_air_jet.py" in 
a text editor or IDE.


 Run the program (cd to the folder, then type python tut_lithium_air_jet.py)

 Look over the plots, to gain a feel for the various idiosyncrasies of the design. Note the significant rise in aircraft mass, as a result of the lithium-air batteries

##Different Propulsion System Assumptions
Go to line 116, and change the battery specific energy from 2000 W-h/kg to 1500 W-h/kg
<pre><code class="python">
    battery = configs.base.energy_network['battery']
    battery.specific_energy=2000*Units.Wh/Units.kg
    battery.specific_power =.67*Units.kW/Units.kg
</code></pre>

run the script (python tut_lithium_air_jet.py).

Iterate on the mass, energy, and power required (lines 201-204, lines 111-112 as you run the mission until desired convergence is achieved. Sizing loops have been stripped out of this script, but will be put back in shortly.

<pre><code class="python">
    vehicle.mass_properties.max_takeoff               = 92110. #use landing mass as 
    vehicle.mass_properties.operating_empty           = 34551. 
    vehicle.mass_properties.takeoff                   = 80721. 
    vehicle.mass_properties.max_zero_fuel             = 92110. #equivalent landing mass
</code></pre>

<pre><code class="python">
    Ereq = 251.58 * 10.**9.
    Preq = 18.67 * 10.**6.
</code></pre>

Now try changing the motor efficiency from .95 to .9 and running the script (line 416).

<pre><code class="python">
    net.nacelle_diameter  = ducted_fan.nacelle_diameter
    net.engine_length     = ducted_fan.engine_length    
    net.number_of_engines = ducted_fan.number_of_engines
    net.motor_efficiency  =.95
</code></pre>

Note the sensitivity of vehicle energy requirements to these various propulsion system assumptions.