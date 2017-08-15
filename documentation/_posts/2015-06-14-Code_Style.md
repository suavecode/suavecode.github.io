---
layout: post
title: Code Style
date: 2017-01-10 13:25:00
categories: blog
description: Code style and basic development information

permalink: /guides/style.html
---

<link rel="stylesheet" href="//cdn.jsdelivr.net/highlight.js/8.6/styles/default.min.css">
<script src="//cdn.jsdelivr.net/highlight.js/8.6/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

## SUAVE Code Style Guide

SUAVE is built on a slightly modified PEP8 style guide, with changes made to implement a data-oriented view of the code.  To help support discovering code, the SUAVE folder structure explicitly mirrors the package structure.  Flexibility of the package structure is important, so in general all objects live in their own file, with the same file name as the object name.  In order to maintain a separation between Analysis and Data structures, there are often parallel package trees inside the main branches of the package, like SUAVE.Methods.Aerodynamics and SUAVE.Analysis.Aerodynamics.  Where possible the names of fields that live in the SUAVE package are written out verbosely, avoiding jargon built on mathematical variable names or acronyms. 

Templates for new methods and objects can be found in the SUAVE repo's [templates](https://github.com/suavecode/SUAVE/tree/develop/templates) folder.

### Naming Convention

In terms of typography -- 

* ```any_variable_name``` - lower case with underscore <br>
   This includes working variables and instantiated objects.
* ```field_name``` - lower case with underscore
   Any field of an object should be lower case.
* ```function_name``` - lower case with underscore
* ```Class_Type``` - upper case with underscore <br>
   The underscores are chosen here to permit the inclusion of acronyms if needed and to maintain symmetry with field name styling.
* ```Package_Name``` - upper case with underscore <br>
   For example folders within the SUAVE package.


In terms of naming --

* Chunk similar field types under a containing field
* Bias names towards being specific
* Write out field name verbosely, but try to keep short


### Development Life Cycle

As you develop new features for SUAVE, this is generally how you can expect your feature to evolve, in terms of its level of abstraction, and where it lives.

1. Prototype <br>
   Either a new function or class.  You may want to test these within a separate folder. If you are developing a new analysis approach, for example for aerodynamics or weights, you can usually start with a function.  If you are working off of an object like a wing, you can abstract the objects as needed.  Generally the lowest level object you'll use is the SUAVE.Core.Data class.  <br>
   A lot of development can be accomplished in a local environment.

2. Initial Integration <br>
   Once you're comfortable that your new feature works robustly, and that it has been tested, it's time to integrate it into SUAVE.  Here are some tips for identifying where it could live.
   - SUAVE.Methods - if it's a python function.  Ping the [forum](http:suavecode.github.io/forum) if you want to double check your decision!
   - SUAVE.Analyses - if it's an object that manages an analysis like aerodynamics
   - SUAVE.Components - if it's a data storage container for a vehicle component like a wing or landing gear
   - SUAVE.Attributes - if it's a data storage container for any other type of object, like atmospheres or water<br>

   At this point you might want to initiate a pull request to contribute the code back to the main repository.<br>
  
3. Full-Blown Subpackage <br>
   As you write more code, and follow the SUAVE style of keeping one file per object, you will need to create a folder to contain a subpackage.  This step may come later in the life of your code, so don't rush to it if you don't need the extra overhead.
