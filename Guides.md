---
layout: page
title: Guides
subtitle: You now have a cool tool, but here's how to use it...
permalink: /Guides/
---

### Boeing 737-800 Analysis Tutorial
1. Locate the tutorial script folder, SUAVE/scripts/tutorial. If necessary cd to this directory.
2. Open the tut_mission_B737.py script in your favorite editor or IDE
3. The setup is divided into several steps:
	* Specify the analyses used under base_analysis()
	* Define the vehicle in vehicle_setup()
	* Establish different configurations in configs_setup()
	* Define the flight profile in mission_setup()
4. Let's just run it as it is for now. Run the script in either the IDE or in a terminal: python tut_mission_B737.py
5. Enjoy the beautiful plots that created.
6. Now, let's modifiy the mission and see what changes
	* Find mission_setup() and then the cruise segment
	* Change the airspeed in segment.airspeed to 500.0 * Units['knots'], notice that SUAVE understands and converts for you units.
	* Find the second descent segment, change the descent rate to 800.0 * Unit['feet/min'].
	* Rerun the mission as before and notice the changes in the profile.
7. Similarly the vehicle parameters can be changed. We will let the user decide what changes they want to explore.

### Embraer E-190 Tutorial
1. One day...

### Boeing 737-800 Optimization Tutorial
1. When we are all ready!



### Lithium Air Regional Jet Optimization Tutorial
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
    * let it run awhile; feel free to check it intermittently to see the currently guess as well as how the optimizer is handling constraints
  
6. If you're feeling ambitious, tweak some of the initial guesses
 (for instance reduce cruise range in the optimization), 
 or modify or add a constraint (lines 232-291)
   * may also try different battery assumptions(uncomment line 449, change from 2000 W-h/kg (default lithium air) to 1500 W-h/kg)
