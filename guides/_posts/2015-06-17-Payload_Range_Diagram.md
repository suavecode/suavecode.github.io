---
layout: post
title: Payload Range Diagram
date: 2015-06-17 23:22:21
categories: blog
description: Learn how to use SUAVE for creating a payload-range diagram

permalink: /guides/payload_range_diagram.html
---

### Embraer E-190 Payload Range Diagram Tutorial
1) Locate the tutorial script folder.

2) Open the test_payload_range.py script in your favorite editor or IDE.

3) Similar to the B737-800 Tutorial, the setup is divided into steps.

4) For the Payload Range Diagram, besides the vehicle and mission, the user must provide the following inputs:

* **cruise_segment_tag**: You must enter the tag of the segment which will have its length modified in order to comply with required fuel burn for each one of the payload range diagram points.
* **reserves**: This will be considered as a fixed fuel reserve for all the diagram points.
 
5) The tutorial presents the following definition:

~~~
# run payload diagram	
cruise_segment_tag = "Cruise"
reserves = 1750.
payload_range_results = payload_range(vehicle,mission,cruise_segment_tag,reserves)
~~~

6) First, let's just run it as it is for now. Run the script in either the IDE or in a terminal as `python tut_payload_range.py`

7) After the calculations are completed, the payload diagram will be plotted and the data will be stored in a file named 'PayloadRangeDiagram.dat'. This is in the folder where you run the script.

8) You can try to modify vehicle and/or mission parameters and see how the payload range diagram is affected. For now, let's add some drag counts to the airplane:

* Locate and open the script test_mission_Embraer_E190_constThr.py, in the tutorial folder (this is the script that contains the vehicle and mission setups)
* Locate ``` base_analysis() ``` and then the Aerodynamics Analysis text block (line 113) 
* Add 50 drag counts to the vehicle (line 115): `aerodynamics.settings.drag_coefficient_increment = 0.0050 `
* Rerun the script as before and notice the changes in the results.

9) Similarly the mission parameters can be changed. Again, this lets the user decide what changes they want to explore.
