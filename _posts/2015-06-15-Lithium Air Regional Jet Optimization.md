---
layout: post
title: Lithium Air Regional Jet Optimization
date: 2015-06-15 14:25:00
categories: blog
permalink:/lithium_air_optimization
---

### Lithium Air Regional Jet Optimization
1. Open the file called "tut_opt_Embraer_E190_bat.py" in 
a text editor or IDE.
2. Change the variable called "disp_results" from 0 to 1 (line 23)
3. Run the program (cd to the folder, then type python tut_opt_Embraer_E190_bat.py)
4. Look at the plots or various values (more can be plotted, and are currently commented out)
   Press enter to close the plots.
5. Now try to run an optimization case. The initial guess is a python list; the variable order can be
seen in lines 27-44, along with the corresponding variable scaling factors.
    * First change disp_results from 1 to 0 (signifying optimization)
    * Change the target range from 4800 km to 4400 km (line 101)
    * run the script (python tut_opt_Embraer_E190_bat.py)
    * let it run awhile; feel free to check it intermittently to see the current guess as well as how the optimizer is handling constraints
  
6. If you're feeling ambitious, try tweaking other parts of the script
 * reduce cruise range in the optimization (the final input)
 * modify or add a constraint (lines 232-291)
  * try different battery assumptions(uncomment line 449, change from 2000 W-h/kg (default lithium air) to 1500 W-h/kg.
