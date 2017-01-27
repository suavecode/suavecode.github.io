---
layout: post
title: Lithium Air Regional Jet Sizing
date: 2015-06-15 14:25:00
categories: blog
description: Incorporate more novel propulsion configurations



permalink: /guides/lithium_air_regional_jet_sizing.html
---
<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>


## Introduction
The purpose of this tutorial is to highlight some of SUAVE's more exotic propulsion system capabilities, as well as the sizing methodology recently introduced

## Baseline Case
 Open the file called "Lithium_Air_Sizing/Sizing.py" in a text editor or IDE. Type "python Sizing.py" to run the file.



 Look over the plots, to gain a feel for the various idiosyncrasies of the design. Note the significant rise in aircraft mass, as a result of the lithium-air batteries, which accumulates oxygen as it discharges.

![li air mass](../images/li_air_mass.png)

<pre><code class="python">
    battery = configs.base.energy_network['battery']
    battery.specific_energy=2000*Units.Wh/Units.kg
    battery.specific_power =.67*Units.kW/Units.kg
</code></pre>

Run the script (python tut_lithium_air_jet.py).

Now try changing the motor efficiency from .95 to .9 and running the script by going to Vehicle.py 

<pre><code class="python">
    net.nacelle_diameter  = ducted_fan.nacelle_diameter
    net.engine_length     = ducted_fan.engine_length    
    net.number_of_engines = ducted_fan.number_of_engines
    net.motor_efficiency  =.95
</code></pre>

Note the sensitivity of vehicle energy and mass requirements to these various propulsion system assumptions.

Now try changing the cruise range of the aircraft. Go to Mission.py, find the cruise segment, and change segment.distance

 
<pre><code class="python">
    segment = Segments.Cruise.Constant_Speed_Constant_Altitude()
    segment.tag = "cruise"
    
    segment.analyses.extend( analyses.cruise )
    
    segment.air_speed  = 230 * Units['m/s']
    segment.distance   = 2000 * Units.nautical_miles
    
</code></pre>

Try changing other parameters (e.g. specific power, cruise altitude), and observe their effects on the overall design.

Now look into how a an aircraft sizing problem is set up within SUAVE. Go to the function "run_sizing_loop" within Sizing.py. The default initial guesses for your sizing parameters can be seen in the lines below

<pre><code class="python">
    #initial guesses
    m_guess    = 60000.       
    Ereq_guess = 100000000000.  
    Preq_guess=  200000. 
 
  
    scaling       = np.array([1E4,1E9,1E6])
    y             = np.array([m_guess, Ereq_guess, Preq_guess])/scaling
    min_y         = [.05, 1E-5,10.]
    max_y         = [10., 10., 10.]
    

</code></pre>

For a given aircraft, a numpy array we call "y" is used to define its set of sizing parameters. In this case, because it is a battery-powered aircraft, we iterate on aircraft total mass, battery energy, as well as battery power. Scaling is used to make the parameter guesses of order 1, as it makes some of the sizing methods more stable and robust. The default initial guess is then assigned to the sizing loop object, as seen below

<pre><code class="python">
  sizing_loop.tolerance                                      = 1E-4 #percentage difference in mass and energy between iterations
    sizing_loop.initial_step                                   = 'Default' #Default, Table, SVR
    sizing_loop.update_method                                  = 'successive_substitution' #'successive_substitution','newton-raphson', 'broyden'
    sizing_loop.default_y                                      = y
    sizing_loop.min_y                                          = min_y
    sizing_loop.max_y                                          = max_y
    sizing_loop.default_scaling                                = scaling

</code></pre>





In this case, only successive substitution is used to solve the problem