---
layout: page
title: Develop
subtitle: Make things more awesome

permalink: /develop/
---


If you want to make changes to SUAVE source, or contribute new functionalities back to the community, this is the page for you!  


## Background

SUAVE is developed via [GitHub](https://github.com/suavecode/SUAVE), and this page will describe how to get started.  There is also a list of [open topics](#areas-of-development) available for contribution if you're looking for ideas to get started. 

As a developer, you'll want to [fork](https://help.github.com/articles/fork-a-repo) SUAVE to your personal account.  This creates a copy of the whole SUAVE repository, including all past versions, inside your GitHub account.  Generally you'll want to start from the develop branch, but you can check with the developers if you think it would be more appropriate to work on a feature branch.

Development is done on separate branches.  Our branching model is very similar to [this one](http://nvie.com/posts/a-successful-git-branching-model/).  Basically there are three types of branches.

- master -- stable, latest release and fixes 
- develop -- current development, generally the branch for you to start with 
- feature-* -- feature specific branches, using names with underscores, check with the developer email list if you think this a better place to contribute 

SUAVE merges new code contributions through [pull requests](https://help.github.com/articles/creating-a-pull-request).  As you make changes to your copy of SUAVE, you'll upload them to your GitHub fork, and then when they're ready for review you'll submit them for merge via pull request.

### Prerequisites

In addition to the package dependencies listed on the [download](/download#dependencies) page, you will need to install git.

#### Git-Client

[Git](https://en.wikipedia.org/wiki/Git_(software)) is an advanced distributed version control system. It is the core of the majority of current open source projects.  Here are some instructions for installing git on your machine.<br>
[linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing-on-Linux) , [mac](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing-on-Mac) , [windows](http://msysgit.github.io/) , [more info](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) 

There are several [GUI's](http://git-scm.com/downloads/guis) available to help manage the repository.  On windows [TortoiseGit](https://code.google.com/p/tortoisegit/) is also useful one.

If you're going to install TortoiseGit on windows, when installing the git client (MsysGit), uncheck “Windows Explorer Integration”.  And when installing TortoiseGit, select “Checkout as-is, Unix-style line endings”

Once you've installed git, there a few post-install commands to run, documented [here](https://help.github.com/articles/set-up-git/#setting-up-git).

#### GitHub Account

[GitHub](https://github.com) is a hosting service for git projects.  SUAVE's repository is located [here](https://github.com/suavecode/SUAVE).

If you don't have a github account already, go ahead and sign up!

Then go to the SUAVE github repo at [github.com/suavecode/SUAVE](https://github.com/suavecode/SUAVE) and check out the code!  If you wouldn't mind, tick the “Watch” and “Star” buttons at the top-right of the page, if you think this is a sweet repo.

<br>

## Developer Installation

Time to pull code.  If you had previously installed a release distribution according to the download page, you'll want to [uninstall](/download#un-installation) the existing package first.

1. Go to the SUAVE github [repo](https://github.com/suavecode/SUAVE).  
2. To get your own copy of the source, with links into real-time updates, you need to ![fork](/images/fork-button.png){:height="25px"} the repo.  This button is on the top-right of the page too.  
3. This will copy the repo and take you to your fork, notice that your web-browser's URL has changed to include your username. 
4. Now you can [clone](http://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#Cloning-an-Existing-Repository) your fork to your computer.  Find the clone url of your fork on the right hand side of the page and copy it.  You can use the https url. <br> ![clone](/images/clone-example.png){:height="90px"} 
5. Open a command prompt, in a directory that you want to start the repository (for example in the SUAVE_Project folder), and run the git clone command <br> `git clone <git url>` <br> Now you should have the source code! You can rename this folder to "Source" if you want to keep the recommended [folder structure](/download#folder-structure).
6.  Change directory into the trunk folder and run a developer installation command.  <br> `python setup.py develop` <br> Now you have a developer version of SUAVE installed!  You can make changes to the source in this directory and the changes will appear the next time you run python, without having to rebuild or reinstall.
7.  Test the installation by changing to any other directory, then start a python shell, and run the command <br> `>>> import SUAVE`<br>`>>> print SUAVE.__file__`<br> This should print the file path to the SUAVE package init.py file in your trunk directory.

#### Some Notes

- You may need to run a sudo (super user do) command to install SUAVE when working on linux or mac systems:  `sudo python setup.py develop`
- The same strategies for dealing with write access can be used here, by simply replacing any `install` keywords with `develop`
- To uninstall the developer version, run the command `python setup.py develop --uninstall`

<br>

## Managing your repository

As you make changes to your code, you'll want to [add](http://git-scm.com/docs/git-commit#_examples) and [commit](http://git-scm.com/docs/git-commit#_examples) them to your [clone](http://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#Cloning-an-Existing-Repository), and [push](http://git-scm.com/docs/git-push#_examples) them to your fork.  You'll [fetch](https://help.github.com/articles/syncing-a-fork/) changes from the [upstream remote](https://help.github.com/articles/syncing-a-fork/) (the suavecode repository), and [merge](http://git-scm.com/docs/git-merge#_examples) them into your clone.  To send your changes back to the upstream repository, you can submit a [pull-request](https://help.github.com/articles/using-pull-requests/#initiating-the-pull-request).


### Setting the upstream

Below is a summary of setting the upstream remote.  There are a good references for this process [here](https://help.github.com/articles/configuring-a-remote-for-a-fork/) and [here](https://help.github.com/articles/syncing-a-fork/), and more via a google search for "git update fork".  

1. Inspect your current "remote", this is the url of the repository to which your clone listens. 
   In the SUAVE Source directory for the cloned repo, type <br> `git remote –v` and it should show the “origin” directory for “fetch” and “push”. These are the remote urls for your own fork.
2. Add an upstream remote to the main suavecode/SUAVE repository using <br>`git remote add upstream https://github.com/suavecode/SUAVE.git`
3. Run `git remote -v` again to see the new remotes.
4. Finally, download the code for the upstream remote with <br> `git fetch upstream`.

### Changing branches

You should work on the develop branch in general, it will have the most updated changes from the community.  

1. Inspect your branches with `git branch -a`.  You'll see all the branches, for both upstream and origin.  Generally you should only work off the origin branches
2. Start a new branch with `git branch develop origin/develop`. This comand aliases the branch "origin/develop" with the name "develop".
3. Checkout the branch, `git checkout develop`.
4. You can see your current branch with, `git branch`,  the one you have checked out will have a star next to it.
5. Commit all your changes to the current branch before checking out another branch, otherwise the changes will be lost.
6. To dump any changes that you don't want, `git stash`, will be helpful.

### Store changes to your GitHub fork

1. Edit the code as you need on your machine
2. Inspect git's view of the changes you've made with `git status`.  This shows what files are new, changed and not yet part of the repo's history.
2. Add the changed files to your commit with `git add <path to file>`, or to add all the changes with `git add -a` (be careful with this one).  The add command does not make the changes part of your repo's history!  You can do multiple add commands for example.
3. Commit them to the history on your machine with <br>`git commit -m 'your message for the commit'`<br>  Make sure to include a nice description.  This command only affects your local repository!  You can do multiple commits before sending them to the cloud.
4. Push the new commits to GitHub with `git push origin`.  This will send all the commits to your fork on GitHub.  This serves as a backup copy for you, and is needed to share the changes with the upstream suavecode repository via pull-requests.


### Get new changes from upstream

In this example the upstream/develop branch is merged into the fork/develop branch.  

1. Checkout your local develp branch with <br>`git checkout develop`.
2. Fetch updates from the upstream repository with <br>`git fetch upstream`.  
3. Merge the changes from the upstream into your fork with <br>`git merge upstream/develop`.
4. Push these changes to your fork on GitHub, <br>`git push origin master`.

### Share your changes with upstream

This creates a nice documentation of the changes that were made.  More detail on pull requests can be found [here](https://help.github.com/articles/using-pull-requests/#initiating-the-pull-request).

1. Commit and push all your changes to your fork on GitHub.
2. Open a browser and navigate to your branch on the GitHub website.
3. Click the "Compare and Review" button.
4. Review the changes for any unexpected differences.  
5. Click the "Create Pull Request" button.
6. The devs will take a look and merge the request.

<br>

## Background on Git

Git is an open source program for tracking changes in text files. It was written by the author of the Linux operating system, and is the core technology that GitHub, the social and user interface, is built on top of it.

The term **version control** is used in Git and other such programs, and refers exactly to what it reads. It allows a group of software developers (the group may comprise one, many or “more than many”) to keep track of changes being made to the software’s code (i.e., versions of code) and have control on the changes (“versions”). This control helps the programmer(s) to decide

- Which versions should remain
- Which versions need higher priority to fix any bugs or problems
- Which versions are ready to be shipped out to customers (“ready for primetime”)
- Which versions can be put on the sidelines since they are a brainchild of a super whiz programmer who is simply playing with some cool ideas
- Which versions are now obsolete since there are alternate and better software/code available to do the same job (these versions are usually nixed!)
- Which versions are too new and require a lot of related work to be done before they can even be brought up for discussions at the weekly meetings
- And so on

_Bottom line is that the concept of version control is mainly to help software development by not losing one’s grip on reality and the primary objectives of the software being developed!_

For those interested in learning more about how version control systems (VCSs) such as Git work, refer to

- [http://git-scm.com/](http://git-scm.com/)
- [http://git-scm.com/video/what-is-git](http://git-scm.com/video/what-is-git)
- [http://git-scm.com/book/en/v2/Getting-Started-Git-Basics](http://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

In addition to Git, there are other popular VCSs such as SVN ([http://tortoisesvn.net/](http://tortoisesvn.net/) and [https://subversion.apache.org/](https://subversion.apache.org/)), with their own sets of pros and cons. However, Git was chosen for SUAVE because SUAVE developers felt it can be easily implemented on Linux, Mac and Windows, and offers them a lot of flexibility and control in terms of developing and maintaining multiple parallel versions (“branches”) with each providing further parallelization (“forks”). For more information about the concepts of branching and forking, refer to http://nvie.com/posts/a-successful-git-branching-model/


<br>

## Areas of Development

These are the areas that are under development, including who is working on them, and what could use support.  Post to the [forum](/forum) if you're intersted in working on any of these, or to suggest a new module!

| Module     | Status  |  
|------------|--------|
| **Aerodynamics** |  |
| Native Vortex Lattice | Implemented for conventional tube and wing, continuing development.|
| High-Lift Systems     | Basic methods in place.|
| Connection to SU2  | Implemented via manual surrogates, automatic capability needed.|
| Connection to AVL  | Implemented for general wings, straight tube fuselage, development needed for control surfaces.| 
| Compressibility Drag | CFD databased can be created for these.| 
| Supersonic Performance | Aerodynamics in place, afterburning turbojet in place. | 
| Low-Speed | Not started, looking for ability to control aircraft at critical conditions at low speed. | 
| **Propulsion** | |
| Jet Engine | 1D model in place for Turbofan and Turbojet | 
| Electric Propulsion | Electric motors in place both with ducted fans and propellers|
| Turboprop/Piston powered | Pieces are available such as propellers and turbines. They need a prebuilt network.|
| Energy storage | Basic models for various Lithium batteries, fuel cells in place.  Additional storage systems for Liquid Natural Gas, Hydrogen are needed.
| **Mission** | |
| Segments | Needed: taxi, reserve, loiter, dash, and more | 
| Performance | Additional performance methods needed, landing and takeoff complete. |
| Payload Range Diagrams | Completed methods.|
| **Environmental Impact** ||
| Subsonic Noise | DC-10 based correlations implemented. New methods in developmen.t| 
| Supersonic Boom | Not started, consider sBOOM, or SUBoom that could be open source.| 
| Emissions - NOx |No correlations yet.|
| Emissions - CO2 |No correlations yet.|
| **Stability and Control** ||
| Static Stability | Correlation methods exist for tube and wing. Derivatives can be pulled from AVL currently.|
| Dynamic Stability | Both approximation and full linearized methods exist.|
| **Structures** ||
| Weights correlations |Implemented for tube/wing, blended wing body, and human powered/solar.|
| Loads | No methodology for loads determination. Need a V-n diagram.|
| Finite Element Modeling |FEM-based primary structure weight estimations would be useful for unconventional configurations.|
| **Geometry**||
| Parametric Geometry|Not currently in SUAVE.|
| Connection to OpenVSP |Not currently in SUAVE.|
| Geometry Visualization |Not currently in SUAVE.|
| Fuselage Layout |Not currently in SUAVE.|
| **Optimization**||
| Optimization interfaces |Process is started internally, will hopefully share soon.|
| Response Surfaces |Not implemented.|
| Uncertainty Management |Hopefully will be able to work with Dakota to accomplish this.|
| **Input/Output** ||
| Data visualization | Looking for D3.JS development. |
| Design templates |Not implemented|
| **Miscellaneous** ||
| Multifidelity Approaches |Will attempt manage once optimization is established.|
| Aeroelastic Constraints |Not implemented.|

<br>

Back to [Top](#background)!

