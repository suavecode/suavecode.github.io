---
layout: post
title: Turbofan Network
date: 2015-06-15 14:20:03
categories: blog

permalink: /guides/turbofan_network.html
---

<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

## Turbofan Modeling Tutorial

The tutorial describes how the energy network in SUAVE can be used to build a model of a turbofan engine. Once this is clear to the user, then the understanding the setup of the other gasturbine models, the ducted fan and the turbojet should not be very difficult. The turbofan model is built using the different turbofan components as its building blocks and then linking the inputs and outputs of the different components. The script to follow is the tut_mission_B737.py script that was used in the [Boeing 737-800 Analysis Tutorial](/guides/boeing_737-800.html)


###Setting up the Turbofan model

First the turbofan energy energy network is instantiated. The parameters associated with the network as a whole are assigned.

<pre><code class="python"># ------------------------------------------------------------------
#   Turbofan Network
# ------------------------------------------------------------------    

#instantiate the gas turbine network
turbofan = SUAVE.Components.Energy.Networks.Turbofan()
turbofan.tag = 'turbofan'

# setup
turbofan.bypass_ratio      = 5.4
turbofan.number_of_engines = 2.0
turbofan.engine_length     = 2.5
turbofan.nacelle_diameter  = 1.580

# working fluid
turbofan.working_fluid = SUAVE.Attributes.Gases.Air()
</code></pre>

Then the different components are added


###Components :

The basic components used to model the turbofan are described below.


####Ram

The 'Ram' component is used to convert the freestream quantities that are passed into the Turbofan network into stagnation quantities. As the turbofan network as based on a 1D gasdynamic analysis, most of the energy transfer across the different components are modelled as changes in the stagnation quantities. Thus the Ram component acts as a preprocessor converting the input 'Conditions' into quantities required by the network.

<pre><code class="python"># ------------------------------------------------------------------
#   Component 1 - Ram

# to convert freestream static to stagnation quantities

# instantiate
ram = SUAVE.Components.Energy.Converters.Ram()
ram.tag = 'ram'

# add to the network
turbofan.append(ram)
</code></pre>

####Nozzle

The 'Nozzle' component is used to model the inlet diffuser and the outlet fan and compressor nozzles as shown below.


<pre><code class="python"># ------------------------------------------------------------------
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

Two compressors are used in the turbofan model, a low and a high pressure compressor.

<pre><code class="python"># ------------------------------------------------------------------
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

A fan component is also added to the network. To model turbojets, the fan component and the fan nozzle are not added but all the other components remain the same.

<pre><code class="python"># ------------------------------------------------------------------
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

The combustor component is where the the fuel to air ratio is computed and this is used to compute the sfc and the thrust later in the network.

<pre><code class="python"># ------------------------------------------------------------------
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

The work done by the fan and the compressors is used to compute the turbine work required. This is used to compute the change in the stagnation quantities across the turbine.

<pre><code class="python"># ------------------------------------------------------------------
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

The thrust component takes in the initial (inputs of the inlet nozzle) and final (exit of the fan and core exirt nozzles) stagnation quantities of the network and the fuel to air ratio and computes the specific fuel conspumption (sfc) and thrust generated by the network (turbofan engine).

<pre><code class="python"># ------------------------------------------------------------------
#  Component 10 - Thrust

# to compute thrust

# instantiate
thrust = SUAVE.Components.Energy.Processes.Thrust()       
thrust.tag ='thrust'

# setup
thrust.total_design =42383.01

# add to network
turbofan.thrust = thrust   
</code></pre>



### Sizing the Turbofan

Once the network is built, it is essential to size the engine with a set of sizing conditions. The sizing function 'turbofan_sizing' takes in the model of the turbofan and the mach number and the altitude for which the turbofan is sized. The sizing thrust is an engine/network property (defined in the 'Setting up the Turbofan model' section above. The function takes these quantities and computes the design mass flow rate through the components. Once sized, the network/engine can be added to the vehicle as shown in the  B737 tutorial.

<pre><code class="python">#bypass ratio  closer to fan

#design sizing conditions
altitude      = 35000.0*Units.ft
mach_number   = 0.78 
isa_deviation = 0.

# add to network
turbofan.thrust = thrust

#size the turbofan (for thrust)
turbofan_sizing(turbofan,mach_number,altitude)   

#compute the turbofan diameter and engine length
#note that the second input is to maintain a common interface with other sizing methods
compute_turbofan_geometry(turbofan,None)
</code></pre>








