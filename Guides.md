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
	a. Find mission_setup() and then the cruise segment
	b. Change the airspeed in segment.airspeed to 500.0 * Units['knots'], notice that SUAVE understands and converts for you units.
	c. Find the second descent segment, change the descent rate to 800.0 * Unit['feet/min'].
	d. Rerun the mission as before and notice the changes in the profile.
7. Similarly the vehicle parameters can be changed. We will let the user decide what changes they want to explore.

### Embraer E-190 Tutorial
1. One day...

### Boeing 737-800 Optimization Tutorial
1. When we are all ready!





