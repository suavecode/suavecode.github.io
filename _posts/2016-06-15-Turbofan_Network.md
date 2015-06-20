---
layout: post
title: Turbofan Network
date: 2015-06-15 14:20:03
categories: blog
---

<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

## Turbofan Modeling Tutorial

The tutorial describes how the energy network in SUAVE can be used to build a model of a turbofan engine. Once this is clear to the user, then the understanding the setup of the other gasturbine models, the ducted fan and the turbojet should not be very difficult. The turbofan model is built using the different turbofan components as its building blocks and then linking the inputs and outputs of the different components. 



###Setting up the Turbofan model

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

</code></pre>


###Components :

The basic components that can be used to model the turbofan are shown below.


####Ram

<pre><code class="python">

# ------------------------------------------------------------------
#   Component 1 - Ram

# to convert freestream static to stagnation quantities

# instantiate
ram = SUAVE.Components.Energy.Converters.Ram()
ram.tag = 'ram'

# add to the network
turbofan.append(ram)

</code></pre>

####Nozzle

<pre><code class="python">

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



</code></pre>

####Compressor

<pre><code class="python">

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


</code></pre>

####Fan

<pre><code class="python">


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

</code></pre>

####Combustor

<pre><code class="python">


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


</code></pre>

####Turbine

<pre><code class="python">


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


</code></pre>



####Thrust

<pre><code class="python">

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


</code></pre>




### Sizing the Turbofan

<pre><code class="python">

#bypass ratio  closer to fan

numerics = Data()

eta=1.0

#size the turbofan
turbofan_sizing(turbofan,0.8,10000.0)
 

</code></pre>








