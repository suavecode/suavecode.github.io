---
layout: post
title: Using the Documentation
date: 2017-01-09 13:25:00
categories: blog
description: Reading (and writing) the documentation

permalink: /guides/docs.html
---

### How to Read (and Write) the Documentation

This is an explanation of how documentation is built in SUAVE so that the user can know what to look for and how to write it if they wish to add their own code. The doxygen page is available [here](/doxygen).

### Docstrings

All classes and functions in SUAVE have docstrings have docstrings. These give the user an understanding of what the function does and information on the input and output variables. 

#### Classes

For a class, the docstring has three parts:

* General description
* Assumptions
* Source

The general description provides a brief summary of what the class is used for. Assumptions list any significant assumptions are important in how it is used. This may be listed as None or N/A if there are no important assumptions. The source section should provide the general source of methods in the class. If there is no overall source, a message like 'see sources in functions' may be appropriate. There are also cases where a source is not relevant, such as simple geometric functions, and may also be listed as None or N/A.

#### Class Docstring Template

This is the general template that can be used when creating a new class. It should be placed directly under the class declaration.

    """<Description>
    
    Assumptions:
    <any assumptions>
    
    Source:
    <source>
    """
    
#### Functions

For functions there are six categories:

* Description

This is a general description of what the function does. It should also include any key information that does not fit into one of the other categories.

* Assumptions

This should contain any assumptions made by the function. None or N/A can be used if none are used.

* Source

The source of any methods that have been implemented. Simple methods like basic geometric relations do not need a source.

* Inputs

This should contain any variables or functions passed to the function. If the passed variable is a data structure, the components that are used should be listed. Each item should include a description if it is not obvious from the name. It should also include any relevant units. In addition, information about the variable type or any other information that might be important can be added here.

* Outputs

This should contain the same information as in the inputs. It may also contain information on variables that are modified but not explicitly returned.

* Properties Used

This carries the same information as input and outputs. It typically contains variables that are properties of the parent class but are not modified. There is some overlap with inputs and outputs, but either category is acceptable as long as the variable is documented.

#### Function Docstring Template

This is a template docstring:

        """<Description>
        
        Assumptions:
        <assumptions>
        
        Source:
        <source>
        
        Inputs:
        <inputs>
                   
        Outputs:
        <outputs>
                
        Properties Used:
        <properties>
            
### Doxygen Grouping Tags

Tags are used to put files into groups that match the SUAVE file structure. `@defgroup` tags define a group and should be placed in the init file. An example is shown here:

	## @defgroup Analyses-Aerodynamics Aerodynamics
	# These are the analyses that control aerodynamic evaluations.
	# @ingroup Analyses
	
In this example, `Analyses-Aerodynamics` is the doxygen tag for the group, while the group appears in the documentation as `Aerodynamics`, the next part of the string. The tag is based on the file structure (Analyses/Aerodynamics here). Since this is a subgroup of Analyses, `@ingroup Analyses` is used here, with `Analyses` as the doxygen tag for the next level up.

In files, the `@ingroup` tag should be inserted before all classes and stand-alone functions. The tag should match the tag in the folder init file's `@defgroup` string.
