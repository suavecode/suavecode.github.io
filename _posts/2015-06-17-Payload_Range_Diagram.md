---
layout: post
title: Payload Range Diagram
date: 2015-06-17 23:22:21
categories: blog

permalink: /guides/payload_range_diagram.html
---

### Embraer E-190 Payload Range Diagram Tutorial
1) Locate the tutorial script folder, SUAVE/scripts/tutorial. If necessary cd to this directory.

2) Open the test_payload_range.py script in your favorite editor or IDE.

3) For the Payload Range Diagram, besides the vehicle and mission, the user must provide the following inputs:

* **cruise_segment_tag**: You must inform the tag of the segment that will have the length modified in order to comply with required fuel burn for each one of the payload range diagram points.
* **reserves**: This will be considered as a fixed fuel reserve for all the diagram points.
 
4) The tutorial presents the following definition (line 50):
~~~
# run payload diagram	
config = configs.base
cruise_segment_tag = "Cruise"
reserves = 1750.
payload_range_results = payload_range(vehicle,mission,cruise_segment_tag,reserves)
~~~
5) First, let's just run it as it is for now. Run the script in either the IDE or in a terminal: 
~~~
$python test_payload_range.py 
~~~

6) After all the calculation the payload diagram will be ploted, and the data will be stored in a file named 'PayloadRangeDiagram.dat', in the folder where you run the script.

![Reference Payload Range Diagram] (/images/PayloadRange_ref.pdf)

7) You can try to modify vehicle and/or mission parameters, e see how the payload range diagram is affected. For now, let's add some drag counts to the airplane:
* Locate ``` base_analysis() ``` and then the Aerodynamics Analysis text block (line 129) 
* Add 50 drag counts to the vehicle (line 132): <br>
`aerodynamics.settings.drag_coefficient_increment = 0.0050 `
* Rerun the script as before and notice the changes in the results.

![Modified Payload Range Diagram] (/images/PayloadRange_+50dc.pdf)

8) Similarly the mission parameters can be changed. Again, let's the user decide what changes they want to explore.

