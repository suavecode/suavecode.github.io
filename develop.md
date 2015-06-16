---
layout: page
title: Develop
subtitle: Make things more awesome

permalink: /develop/
---

#####_Refer to the notes at the end of this document for a glimpse into what Git is all about._


#### Prerequisites
1. Search if python 2.7 exists
  1. If not, install python and necessary packages from Anaconda repository
  2. SUAVE also requires _numpy_, _scipy_ and _matplot_ libraries/packages
  3. If the above and other relevant packages are missing, error message will be displayed later on when you are building the SUAVE code. So, install the packages in 1.b. now, and any others that are indicated to you later on.
  4. Most packages are available on the internet. A good source is Christoph Gohlke’s website (http://www.lfd.uci.edu/~gohlke/pythonlibs/)
2. Install _pip_ for python. There are good instructions available to do this on the internet. An example is http://www.saltycrane.com/blog/2010/02/how-install-pip-ubuntu/
3. Make sure “Git client” is installed. Git is default with most Linux-based computers, but double check.
  1. Install Git client on Windows machine (http://git-scm.com/download/win; https://help.github.com/articles/set-up-git/)
    * Uncheck “Windows Explorer Integration” during the software install process. Select “Checkout as-is, Unix-style…”
 2. **_Refer to the notes at the end of this document for a glimpse into what Git is all about._**
4. Setup Github repository from github.com. May have to register and sign-in
  1. Make sure you have the permissions to the particular repository or “fork”
    * If not, ask the person in charge of the repository or “fork” for permission, and get its Git link (“Git URL”)
  2. Activate “Watch,” “Star” and “Fork” on the SUave Git hub webpage at “Git URL”
    * Look at “Git branching model” on Google to learn about the “Fork” and other functions/features of Git (http://nvie.com/posts/a-successful-git-branching-model/)


#### SUAVE installation
1. Obtain the URL (“Git URL”) of the clone Github repository you want to install on your machine. This is either given to you by someone who is the owner of that repository or you can obtain it from a small link shown at the bottom right of the repositories webpage on github.com
2. Use the “Git URL” to clone it to your computer. For this, first `cd` to the location where you want to install the software and execute the following command in the terminal/command-window:
  * `$ git clone <Git URL>`
3. The above step will create a “SUAVE” folder that contains all the source code and many other folders. Next, “cd” to the “trunk” folder located inside this “SUAVE” folder, and run the following command to compile, build and install SUAVE on your computer:
  * `$ python setup.py develop`
4. Next, open a new terminal/command-window and open python (the command “python” usually works)
5. When python is running, type `import SUAVE`. If SUAVE is installed correctly, there should be no output after executing the command
6. Then type `SUAVE.__file__` to look at the folder where SUAVE is installed, which is typically in the “SUAVE” folder located inside the “trunk” folder.

#### Managing your Git repository, “pushing” to Github and other things
1. Search for “Github update fork” in Google (https://help.github.com/articles/syncing-a-fork/)
2. Click on the link in the “Tip” dialog box for necessary “upstream” commands for push and pull requests. Here are some basic commands:
3. Adding the upstream "remote"
  1. In the SUAVE directory which has been cloned, type `git remote –v` and it should show the “origin” directory for “fetch” and “push”. This would be your own “cloned” Git repository
  2. Then add an upstream repository (the main suavecode/SUAVE repository in this case) using `git remote add upstream <address of main repository>`
4. Fetching and pushing changes
  1. Then fetch updates from upstream repository `git fetch upstream`
  2. To merge the changes, use `git merge upstream/master`
  3. To push change, use `git push origin master`


#### What is Git?
Git is an open source program for tracking changes in text files. It was written by the author of the Linux operating system, and is the core technology that GitHub, the social and user interface, is built on top of (https://help.github.com/articles/github-glossary/#git).

The term **version control** is used in Git and other such programs, and refers exactly to what it reads. It allows a group of software developers (the group may comprise one, many or “more than many”) to keep track of changes being made to the software’s code (i.e., versions of code) and have control on the changes (“versions”). This control helps the programmer(s) to decide
* Which versions should remain
* Which versions need higher priority to fix any bugs or problems
* Which versions are ready to be shipped out to customers (“ready for primetime”)
* Which versions can be put on the sidelines since they are a brainchild of a super whiz programmer who is simply playing with some cool ideas
* Which versions are now obsolete since there are alternate and better software/code available to do the same job (these versions are usually nixed!)
* Which versions are too new and require a lot of related work to be done before they can even be brought up for discussions at the weekly meetings
* And so on

_Bottom line is that the concept of version control is mainly to help software development by not losing one’s grip on reality and the primary objectives of the software being developed!_

For those interested in learning more about how version control systems (VCSs) such as Git work, refer to
* http://git-scm.com/ 
* http://git-scm.com/video/what-is-git 
* http://git-scm.com/book/en/v2/Getting-Started-Git-Basics

In addition to Git, there are other popular VCSs such as SVN (http://tortoisesvn.net/ and https://subversion.apache.org/), with their own sets of pros and cons. However, Git was chosen for SUAVE because SUAVE developers felt it can be easily implemented on Linux, Mac and Windows, and offers them a lot of flexibility and control in terms of developing and maintaining multiple parallel versions (“branches”) with each providing further parallelization (“forks”). For more information about the concepts of branching and forking, refer to http://nvie.com/posts/a-successful-git-branching-model/

