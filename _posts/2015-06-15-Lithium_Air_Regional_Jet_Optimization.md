--
layout: post
title: Lithium Air Regional Jet Optimization
date: 2015-06-15 14:25:00
categories: blog
description: Learn the sizing and regression framework in an optimization problemx



permalink: /guides/lithium_air_regional_jet_optimization.html
---
<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

## Introduction
The purpose of this tutorial is to introduce the user to the sizing/optimization process, which uses machine learning regression techniques to accelerate convergence.

The user, is he/she so chooses, could directly run Optimize.py (located in Tutorials/Lithium_Air_Jet_Sizing). However this would be a relatively slow process (~5,200 SUAVE mission evaluations), due to the fact that each step in the optimizer would have to use the same initial guess for y to converge on mass, energy, and power. Here we're going to be smarter, and tabulate the converged solutions, using them to inform the initial guesses. Go to Sizing.py, in the "setup" function, and uncomment "procedure.write_optimization."

<pre><code class="python">
def setup():
    
    # ------------------------------------------------------------------
    #   Analysis Procedure
    # ------------------------------------------------------------------ 
    
    # size the base config
    procedure = Process()
    procedure.run_sizing_loop       = run_sizing_loop #size aircraft and run mission
    procedure.evaluate_field_length = evaluate_field_length
    procedure.evaluate_constraints  = evaluate_constraints
    #procedure.write_optimization    = write_optimization  #only use when writing an optimization problem
    return procedure

</code></pre>


What this does is makes it so, at each converged step, SUAVE tabulates the optimization variables, constraints, as well as objective, which allows the user use to view how the optimization proceeds, as well as whether it can satisfy the constraints. 

Additionally,SUAVE automatically creates a file called "sizing_outputs.txt" which outputs the converged sizing results vs. the optimization variables, allowing it to be read in and used to choose a more informed initial guess.. This saves a large amount of computational time, especially for gradient-based optimization. To use this, go to the "run_sizing_loop" function, to the section where you choose your sizing options, and change "sizing_loop.initial_step" from "Default" to "Table"


<pre><code class="python">
    sizing_loop.tolerance                                      = 1E-4 #percentage difference in mass and energy between iterations
    sizing_loop.initial_step                                   = 'Default' #Default, Table, SVR
    sizing_loop.update_method                                  = 'successive_substitution' #'successive_substitution','newton-raphson', 'broyden'
    sizing_loop.default_y                                      = y
    sizing_loop.min_y                                          = min_y
    sizing_loop.max_y                                          = max_y
    sizing_loop.default_scaling                                = scaling
    sizing_loop.sizing_evaluation                              = sizing_evaluation
    
</code></pre>

At this point, it is worth looking into changes to the optimizer options to ensure consistency. Because the solution is converged to 1E-4, the user needs to ensure that the finite differencing step is taken reduced to account for this. Go to Optimize.py, and look at the line where the Optimizer is called

<pre><code class="python">
    def main():
        
        problem = setup()
    
        output = scipy_setup.SciPy_Solve(problem, sense_step = 1E-2, solver = 'SLSQP')
        print output
        
        Plot_Mission.plot_mission(problem)

        return
</code></pre>

Note that, the "sense_step," that is, the finite differencing step is set to 1E-2 (it is recommended to set the finite differencing step to the square root of the solution tolerance). Now try running the problem (type "python Optimize.py" while in the Lithium_Air_Sizing), and observe the weight reduction as well as the number of iterations it takes to converge; in this case, it takes ~1,000 SUAVE sizing/mission evaluations to converge, decreasing computational cost by a factor of 5. Feel free to play with the optimization options, as well as sizing options to observe there impact on the solution path.
