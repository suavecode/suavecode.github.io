---
layout: post
title: Blended Wing Body with CFD
date: 2015-06-13 23:22:21
categories: blog
description: Run an unconventional configuration with SU2!

permalink: /guides/BWB.html
---

<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

## Blended Wing Body using CFD

The purpose of this tutorial is to show the analysis settings used to generate geometry, a mesh, and run CFD via SU2 from SUAVE. It will also show how to add individual wing segments. We assume you are familiar with SUAVE and have some CFD experience already. For this example we use a Blended Wing Body (BWB). The BWB used here is similar to the Boeing BWB-450 by Liebeck.

# Other Software You need

For the full tool chain 3 additional pieces of software are needed. These are OpenVSP, Gmsh, and SU2. These are all open source and freely available online.

First, you will need [OpenVSP](http://openvsp.org) compiled with Python support. Unfortunately, you cannot use the precompiled binary versions of OpenVSP. You must compile it from scratch. This tutorial was tested with version 3.15.0.

Second, you must install [Gmsh](http://gmsh.info). In this case you can use the precompiled binaries. Make sure to add Gmsh to your command line path so it can be called from the terminal. This tutorial was tested with version 3.0.6.

Finally, you need to install [SU2](https://su2code.github.io/). If you want parallel support then you must also compile the code. Otherwise, you can the precompiled versions. This tutorial was tested with version 6.0.0.

# Vehicle Setup

Here we see how to construct multi-segment wings. With multiple segments we can build more complex shapes such as cranks, yehudis, and winglets. We also show how to specify an airfoil on the wing or on a wing segment. If an airfoil is not specified, it will default to a symmertic airfoil.

This BWB is broken down into 7 segments. We first specify the top level parameters of the wing and then add each segment sequentially as shown below.

<pre><code class="python">


    # ------------------------------------------------------------------        
    #   Main Wing
    # ------------------------------------------------------------------        

    wing = SUAVE.Components.Wings.Main_Wing()
    wing.tag = 'main_wing'

    wing.aspect_ratio            = 289.**2 / (7840. * 2)
    wing.thickness_to_chord      = 0.15
    wing.taper                   = 0.0138
    wing.span_efficiency         = 0.95
    wing.spans.projected         = 289.0 * Units.feet    
    wing.chords.root             = 145.0 * Units.feet
    wing.chords.tip              = 3.5   * Units.feet
    wing.chords.mean_aerodynamic = 86.   * Units.feet
    wing.areas.reference         = 15680. * Units.feet**2   
    wing.sweeps.quarter_chord    = 33. * Units.degrees
    wing.twists.root             = 0.0 * Units.degrees
    wing.twists.tip              = 0.0 * Units.degrees
    wing.dihedral                = 2.5 * Units.degrees
    wing.origin                  = [0.,0.,0]
    wing.aerodynamic_center      = [0,0,0] 
    wing.vertical                = False
    wing.symmetric               = True
    wing.high_lift               = True
    wing.dynamic_pressure_ratio  = 1.0

    segment = SUAVE.Components.Wings.Segment()
    segment.tag                   = 'section_1'
    segment.percent_span_location = 0.0
    segment.twist                 = 0. * Units.deg
    segment.root_chord_percent    = 1.
    segment.dihedral_outboard     = 0. * Units.degrees
    segment.sweeps.quarter_chord  = 30.0 * Units.degrees
    segment.thickness_to_chord    = 0.165 
    wing.Segments.append(segment)    
    
    segment = SUAVE.Components.Wings.Segment()
    segment.tag                   = 'section_2'
    segment.percent_span_location = 0.052
    segment.twist                 = 0. * Units.deg
    segment.root_chord_percent    = 0.921
    segment.dihedral_outboard     = 0.   * Units.degrees
    segment.sweeps.quarter_chord  = 52.5 * Units.degrees
    segment.thickness_to_chord    = 0.167    
    wing.Segments.append(segment)   

    segment = SUAVE.Components.Wings.Segment()
    segment.tag                   = 'section_3'
    segment.percent_span_location = 0.138
    segment.twist                 = 0. * Units.deg
    segment.root_chord_percent    = 0.76
    segment.dihedral_outboard     = 1.85 * Units.degrees
    segment.sweeps.quarter_chord  = 36.9 * Units.degrees  
    segment.thickness_to_chord    = 0.171    
    wing.Segments.append(segment)   
    
    segment = SUAVE.Components.Wings.Segment()
    segment.tag                   = 'section_4'
    segment.percent_span_location = 0.221
    segment.twist                 = 0. * Units.deg
    segment.root_chord_percent    = 0.624
    segment.dihedral_outboard     = 1.85 * Units.degrees
    segment.sweeps.quarter_chord  = 30.4 * Units.degrees    
    segment.thickness_to_chord    = 0.175
    wing.Segments.append(segment)       
    
    segment = SUAVE.Components.Wings.Segment()
    segment.tag                   = 'section_5'
    segment.percent_span_location = 0.457
    segment.twist                 = 0. * Units.deg
    segment.root_chord_percent    = 0.313
    segment.dihedral_outboard     = 1.85  * Units.degrees
    segment.sweeps.quarter_chord  = 30.85 * Units.degrees
    segment.thickness_to_chord    = 0.118
    wing.Segments.append(segment)       
    
    segment = SUAVE.Components.Wings.Segment()
    segment.tag                   = 'section_6'
    segment.percent_span_location = 0.568
    segment.twist                 = 0. * Units.deg
    segment.root_chord_percent    = 0.197
    segment.dihedral_outboard     = 1.85 * Units.degrees
    segment.sweeps.quarter_chord  = 34.3 * Units.degrees
    segment.thickness_to_chord    = 0.10
    wing.Segments.append(segment)     
    
    segment = SUAVE.Components.Wings.Segment()
    segment.tag                   = 'section_7'
    segment.percent_span_location = 0.97
    segment.twist                 = 0. * Units.deg
    segment.root_chord_percent    = 0.086
    segment.dihedral_outboard     = 73. * Units.degrees
    segment.sweeps.quarter_chord  = 55. * Units.degrees
    segment.thickness_to_chord    = 0.10
    wing.Segments.append(segment)      

    # add to vehicle
    vehicle.append_component(wing)

</code></pre>

Once we build the vehicle we can write the OpenVSP file. If there are multiple configurations then you will need multiple writes to OpenVSP. We highly suggest you only have one configuration when possible to minimize computational costs. Also note that while the tip section was not defined here (meaning the top level tip values were used), it can also be added with `segment.percent_span_location = 1.`.

<pre><code class="python">
# ----------------------------------------------------------------------
#   Define the Configurations
# ---------------------------------------------------------------------

def configs_setup(vehicle):

    # ------------------------------------------------------------------
    #   Initialize Configurations
    # ------------------------------------------------------------------

    configs = SUAVE.Components.Configs.Config.Container()

    base_config = SUAVE.Components.Configs.Config(vehicle)
    base_config.tag = 'base'
    configs.append(base_config)
    
    write(vehicle,base_config.tag) 


    # done!
    return configs

</code></pre>

# Analyses Setup

Here we setup the SU2 analysis. We commented out the parallel setting but you may use these if you want to parallelize the computation.

The next setting which is commented out is the input file for pregenerated CFD data. We have included an example of this, so even if you don't have SU2 and Gmsh installed you can still run this file to generate the surrogate and run the mission. A 10 iteration limit is used so that the tutorial can be run in a reasonable amount of time (~15 min). Data for runs with the 10 iteration limit and 1500 iteration limit are provided.

After that we specify the points we want to use to generate the SU2-based lift surrogate. SUAVE has default values for these, but we suggest the user specify their own Mach numbers and angles of attack.

Next we set up a bit of mesh refinement by modifying the source parameters at specific segments. Here we reduce the source length in the root area which refines the mesh there. This is optional as sources will also be added by default if these options are not specified.

<pre><code class="python">

    # ------------------------------------------------------------------
    #  Aerodynamics Analysis
    aerodynamics = SUAVE.Analyses.Aerodynamics.SU2_Euler()
    aerodynamics.geometry = vehicle
    
    #aerodynamics.process.compute.lift.inviscid.settings.parallel   = True
    #aerodynamics.process.compute.lift.inviscid.settings.processors = 12  
    #aerodynamics.process.compute.lift.inviscid.training_file       = 'base_data_1500.txt'
    aerodynamics.process.compute.lift.inviscid.settings.maximum_iterations = 10
    aerodynamics.settings.drag_coefficient_increment = 0.0000
    
    aerodynamics.process.compute.lift.inviscid.training.Mach             = np.array([.3, .5, .7, .85]) 
    aerodynamics.process.compute.lift.inviscid.training.angle_of_attack  = np.array([0.,3.,6.]) * Units.deg    
    
    wing_segments = vehicle.wings.main_wing.Segments
    wing_segments.section_1.vsp_mesh = Data()
    wing_segments.section_1.vsp_mesh.inner_radius  = 4.
    wing_segments.section_1.vsp_mesh.outer_radius  = 4.
    wing_segments.section_1.vsp_mesh.inner_length  = .14
    wing_segments.section_1.vsp_mesh.outer_length  = .14
    
    wing_segments.section_2.vsp_mesh = Data()
    wing_segments.section_2.vsp_mesh.inner_radius  = 4.
    wing_segments.section_2.vsp_mesh.outer_radius  = 4.
    wing_segments.section_2.vsp_mesh.inner_length  = .14
    wing_segments.section_2.vsp_mesh.outer_length  = .14
    
    wing_segments.section_3.vsp_mesh = Data()
    wing_segments.section_3.vsp_mesh.inner_radius  = 4.
    wing_segments.section_3.vsp_mesh.outer_radius  = 4.
    wing_segments.section_3.vsp_mesh.inner_length  = .14
    wing_segments.section_3.vsp_mesh.outer_length  = .14
    
    wing_segments.section_4.vsp_mesh = Data()
    wing_segments.section_4.vsp_mesh.inner_radius  = 4.
    wing_segments.section_4.vsp_mesh.outer_radius  = 2.8
    wing_segments.section_4.vsp_mesh.inner_length  = .14
    wing_segments.section_4.vsp_mesh.outer_length  = .14      
    
    analyses.append(aerodynamics)


</code></pre>


The rest of the code runs as usual. However, we add in an extra plot which shows the surrogate and the points that were used to build it.