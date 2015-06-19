---
layout: post
title: Turbofan Network
date: 2016-06-15 14:20:00
categories: blog
---

<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

## Turbofan Modeling Tutorial

The tutorial shows how the user can set up a conventional aircraft configuration and a mission the aircraft is to fly and then simulate the aircraft's performance over the defined mission. The code is divided into a number of functions that are called from the main function. The descriptions in the functions clearly explain the function's inputs and outputs and the actions performed on the functions.

###Steps to simulate the aircraft's performance over a mission :

1) Locate the tutorial script folder, SUAVE/scripts/tutorial. If using the command line, cd to this directory.
2) Open the tut_mission_B737.py script in your favorite editor or IDE.
2) The script is setup to run the B737 on its design mission. Run it in your IDE. If using the command line use the command

<pre><code class="python"> $python tut_gasturbine.py  </code></pre>



###Components :

The basic components that can be used to model the turbofan are shown below.


####Ram

<pre><code class="python">


</code></pre>

####Nozzle

<pre><code class="python">


</code></pre>

####Compressor

<pre><code class="python">


</code></pre>

####Fan

<pre><code class="python">


</code></pre>

####Combustor

<pre><code class="python">


</code></pre>

####Turbine

<pre><code class="python">


</code></pre>


####Thrust

<pre><code class="python">


</code></pre>







### Assembling the components to obtain a Turbofan Network


<pre><code class="python">
# ------------------------------------------------------------------
#   Turbofan Network
# ------------------------------------------------------------------    



#instantiate the gas turbine network
turbofan = SUAVE.Components.Energy.Networks.Turbofan()
turbofan.tag = 'turbo_fan'

# setup
turbofan.bypass_ratio      = 5.4
turbofan.number_of_engines = 2.0
turbofan.engine_length     = 2.5
turbofan.nacelle_diameter  = 1.580

# working fluid
turbofan.working_fluid = SUAVE.Attributes.Gases.Air()


# ------------------------------------------------------------------
#   Component 1 - Ram

# to convert freestream static to stagnation quantities

# instantiate
ram = SUAVE.Components.Energy.Converters.Ram()
ram.tag = 'ram'

# add to the network
turbofan.append(ram)


# ------------------------------------------------------------------
#  Component 2 - Inlet Nozzle

# instantiate
inlet_nozzle = SUAVE.Components.Energy.Converters.Compression_Nozzle()
inlet_nozzle.tag = 'inlet_nozzle'

# setup
inlet_nozzle.polytropic_efficiency = 0.98
inlet_nozzle.pressure_ratio        = 0.98

# add to network
turbofan.append(inlet_nozzle)


# ------------------------------------------------------------------
#  Component 3 - Low Pressure Compressor

# instantiate 
compressor = SUAVE.Components.Energy.Converters.Compressor()    
compressor.tag = 'low_pressure_compressor'

# setup
compressor.polytropic_efficiency = 0.91
compressor.pressure_ratio        = 1.14    

# add to network
turbofan.append(compressor)


# ------------------------------------------------------------------
#  Component 4 - High Pressure Compressor

# instantiate
compressor = SUAVE.Components.Energy.Converters.Compressor()    
compressor.tag = 'high_pressure_compressor'

# setup
compressor.polytropic_efficiency = 0.91
compressor.pressure_ratio        = 13.415    

# add to network
turbofan.append(compressor)


# ------------------------------------------------------------------
#  Component 5 - Low Pressure Turbine

# instantiate
turbine = SUAVE.Components.Energy.Converters.Turbine()   
turbine.tag='low_pressure_turbine'

# setup
turbine.mechanical_efficiency = 0.99
turbine.polytropic_efficiency = 0.93     

# add to network
turbofan.append(turbine)


# ------------------------------------------------------------------
#  Component 6 - High Pressure Turbine

# instantiate
turbine = SUAVE.Components.Energy.Converters.Turbine()   
turbine.tag='high_pressure_turbine'

# setup
turbine.mechanical_efficiency = 0.99
turbine.polytropic_efficiency = 0.93     

# add to network
turbofan.append(turbine)


# ------------------------------------------------------------------
#  Component 7 - Combustor

# instantiate    
combustor = SUAVE.Components.Energy.Converters.Combustor()   
combustor.tag = 'combustor'

# setup
combustor.efficiency                = 0.99 
combustor.alphac                    = 1.0     
combustor.turbine_inlet_temperature = 1450
combustor.pressure_ratio            = 0.95
combustor.fuel_data                 = SUAVE.Attributes.Propellants.Jet_A()    

# add to network
turbofan.append(combustor)


# ------------------------------------------------------------------
#  Component 8 - Core Nozzle

# instantiate
nozzle = SUAVE.Components.Energy.Converters.Expansion_Nozzle()   
nozzle.tag = 'core_nozzle'

# setup
nozzle.polytropic_efficiency = 0.95
nozzle.pressure_ratio        = 0.99    

# add to network
turbofan.append(nozzle)


# ------------------------------------------------------------------
#  Component 9 - Fan Nozzle

# instantiate
nozzle = SUAVE.Components.Energy.Converters.Expansion_Nozzle()   
nozzle.tag = 'fan_nozzle'

# setup
nozzle.polytropic_efficiency = 0.95
nozzle.pressure_ratio        = 0.99    

# add to network
turbofan.append(nozzle)


# ------------------------------------------------------------------
#  Component 10 - Fan

# instantiate
fan = SUAVE.Components.Energy.Converters.Fan()   
fan.tag = 'fan'

# setup
fan.polytropic_efficiency = 0.93
fan.pressure_ratio        = 1.7    

# add to network
turbofan.append(fan)


# ------------------------------------------------------------------
#  Component 10 - Thrust

# to compute thrust

# instantiate
thrust = SUAVE.Components.Energy.Processes.Thrust()       
thrust.tag ='thrust'

# setup
thrust.total_design                       =42383.01818423

# add to network
turbofan.thrust = thrust    

#bypass ratio  closer to fan

numerics = Data()

eta=1.0

#size the turbofan
turbofan_sizing(turbofan,0.8,10000.0)
 

</code></pre>




###How the components are linked :



