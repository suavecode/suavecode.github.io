---
layout: post
title: Regional Jet Optimization
date: 2015-06-14 23:22:25
categories: blog
description: Learn the optimization framework within SUAVE

permalink: /guides/regional_jet_optimization.html
---

<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

### Regional Jet Optimization Tutorial
This tutorial assumes familiarity with SUAVE, and that the user has completed the Boeing 737-800 Analysis Tutorial. It teaches the user the structure of running an optimization problem using SUAVE's framework, as well as how to modify it for their own needs 

Some important files for the optimization problem can be seen below


### Important Files :

#### Optimize.py:
Defines the optimization framework of the problem, wherein one minimizes an assigned objective, subject to certain constraints, by altering some design variables.

 In order to ensure that the subfunctions can communicate with eachother, as well as that SUAVE can communicate with the external optimizer, a special data object called the "Nexus" is used. The nexus object contains all of the vehicles, missions, as well as results, altering them at each optimizer iteration, depending on the input parameters defined in Optimize.py.

In this particular setup, there are two design variables: wing area and cruise altitude. The objective is fuel burn, while there is only one constraint: fuel margin.. The default inputs are defined in the following lines.


<pre><code class="python">
   # [ tag, initial, (lb,ub), scaling, units]
   problem.inputs = np.array([
       [ 'wing_area'      ,  95., ( 90., 130.), 100., Units.meter**2],
       [ 'cruise_altitude',  11., (  9.,  14.),  10., Units.km      ],
   ])
</code></pre>    

Each input parameter takes in 5 values; a tag (an identification to communicate between the optimizer and SUAVE), an initial value, set of bounds, a scale factor (many optimizers tend to be more effective when the input values are of order 1), as well as the units used. 

The objective and constraints are defined in the lines below.

<pre><code class="python">
# [ tag, scaling, units ]
    problem.objective = np.array([
        [ 'fuel_burn', 10000, Units.kg ]
    ])

 # [ tag, sense, edge, scaling, units ]
    problem.constraints = np.array([
        [ 'design_range_fuel_margin' , '>', 0., 1E-1, Units.less],
    ])
</code></pre>    

Note that in this case, only a single constraint is used; Multiple constraints may be used using a list format, similar to the input variables.



This file also defines the "aliasing," i.e. how the design variables, constraints, and objective "map" to the variables used in Procedure.py (which is runs the problem). The aliases for this problem are defined in the lines below.  Note that the first entry refers to the tag defined in either problem.inputs, problem.objective, or problem.constraints.

<pre><code class="python">
    problem.aliases = [
        [ 'wing_area'                        ,   ['vehicle_configurations.*.wings.main_wing.areas.reference',
                                                  'vehicle_configurations.*.reference_area'                    ]],  
        [ 'cruise_altitude'                  ,    'missions.base.segments.climb_5.altitude_end'                 ],
        [ 'fuel_burn'                        ,    'summary.base_mission_fuelburn'                               ],
        [ 'design_range_fuel_margin'         ,    'summary.max_zero_fuel_margin'                                ],
    ]    
    
</code></pre>

Note that, sometimes, a single input can map to multiple outputs, such as the "wing_area" design variable; in this case, use a list for the outputs, as seen above. The use of a wild card "*", can also allow values to map to multiple outputs. Values to be outputted cannot contain wild cards as that would be ambiguous to an optimizer.

#### Procedure.py:
Links everything together, defining the steps you would use to size and analyze the aircraft at each optimizer iteration.

This file contains a number of subfunctions to alter the vehicle and mission. The function setup() instantiates the procedure, defining the functions that are called at each step of the optimizer in their order of execution. 

1. simple_sizing() defines the geometry of the aircraft based on the input parameters (in this case, wing area and cruise altitude). 

2. weights() determines the weight breakdown of the aircraft

3. mission() decides which missions are run at each step, as well as the design mission of the aircraft

4. post_process() handles the results from the missions, outputting the constraints and objective value

Each step of the procedure takes as the nexus object as an input, and returns the object as an output, ensuring that the data is available for handling.
   

#### Vehicles.py:
 Initializes whatever vehicles are used in the optimization problem. This includes two subfunctions: base_setup(), where the vehicle structure is itself defined, including the fuselage, wing, vertical and horizontal tail, as well as the propulsion system.

configs_setup() takes in the vehicle that was defined in base_setup() and defines other configurations (such as takeoff and landing, which include different flap settings). This may be used to define other parameters, such as changing the sweep angle of a variable-sweep-wing at higher Mach Numbers, or the use of afterburners.

#### Missions.py:
 Initializes the missions that are run at each iteration. In this case, only a single mission is run.

#### Analyses.py:
 Defines the set of features that are used in this particular problem (e.g. weights correlations, aerodynamics correlations, etc.).

#### Plot_Mission.py:
Plots the mission outputs using matplotlib.

### Running the Problem:
1. Locate the tutorial script folder "regional_jet_optimization." If necessary cd to this directory.

2. Open the Optimize.py script in a text editor or IDE

3. Run it with the default set of inputs; uncomment out the following line in Optimize.py;

<pre><code class="python">
output = problem.objective()
</code></pre>

Open up a terminal, and type "python Optimize.py." You should see a set of output plots.


### Running a Sweep of the Inputs
Now try running a 2D sweep of the problem to observe the shape of the design space: re-comment  "output = problem.objective" then uncomment the following.

<pre><code class="python">
variable_sweep(problem)
</code></pre>

Then run the program(python Optimize.py). This could take a few minutes. The results should look like the plot below

![2D Sweep](/images/wing_area_v_cruise_altitude_v_fuel_burn_5_steps.png)

The labeled lines depict the fuel margin (i.e. fraction of the aircraft remaining weight that can be loaded with fuel). Positive values indicate a feasible design. Fuel burn is shown in the colored contours. Note that, a smoother plot may be had by changing the number of points in the sweep function, but this will take more time. A carpet plot run using 20 points can be seen below.

![2D Sweep_20](/images/wing_area_v_cruise_altitude_v_fuel_burn.png)


### Optimizing:

 Now, try running an Optimization; recomment "variable_sweep(problem)", then comment out 
<pre><code class="python">
output = scipy_setup.SciPy_Solve(problem,solver='SLSQP')
</code></pre>

and run python Optimize.py in the terminal.

From the default inputs, the terminal should display an optimum of [ 1.14127857  1.05251198], which corresponds to a wing area of 114.1 m^2, and 10.5 km (which, from the 2D sweep section of this tutorial, is not quite the true minimum, but it is close). A zoomed-in-plot of the objective function shape near the optimum is shown below to illustrate.

![2D Sweep_zoom](/images/wing_area_v_cruise_altitude_v_fuel_burn_5_steps_zoomed.png)


As can be seen in the plot above, there is a large region of local optima near the "true" optimum

Now, try starting the optimization from a different "initial guess;" one can either modify the input parameters in the initial formulation (the relevant lines are repeated below)

<pre><code class="python">
    #   [ tag                            , initial, (lb,ub)             , scaling , units ]
    problem.inputs = np.array([
        [ 'wing_area'                    ,  95    , (   90. ,   130.   ) ,   100. , Units.meter**2],
        [ 'cruise_altitude'              ,  11    , (   9   ,    14.   ) ,   10.  , Units.km],
    ])
</code></pre>    


or set up the optimization problem and change the inputs manually by uncommenting the following lines.



<pre><code class="python">
    inputs                                   = [1.28, 1.38]
    scaling                                  = problem.optimization_problem.inputs[:,3] #have to rescale inputs to start problem from here
    scaled_inputs                            = np.multiply(inputs,scaling)
    problem.optimization_problem.inputs[:,1] = scaled_inputs
</code></pre>   

 The latter starts the optimization problem above the feasible region (wing area =128 m^2, altitude = 13.8 km), and results in a fuel burn that is 30 kg lower than the result using the initial guess; this illustrates the important of choosing a starting point when running optimization problem. Additionally, this demonstrates SUAVE's ability to handle even strongly infeasible cases, and that it can converge to a feasible case even when starting from an infeasible set of initial inputs. Plots of the default optimization history for both sets of inputs can be seen below.

![Opt History](/images/optimization_path.png)


At this point, explore other starting points, or alter the vehicle or mission properties in Vehicles.py or Missions.py. Additionally, feel free to start using this as the basis for creating custom optimization scripts.