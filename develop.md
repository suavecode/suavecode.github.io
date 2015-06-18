---
layout: page
title: Develop
subtitle: Make things more awesome

permalink: /develop/
---


If you want to make changes to SUAVE source, and contribute new functionalities back to the community, this is the page for you!  


## Background

SUAVE is developed via [GitHub](https://github.com/suavecode/SUAVE), and this page will describe how to get started.  There is also a list of open topics available for contribution if you're looking for ideas to get started. 

SUAVE merges new code contributions through [pull requests](https://help.github.com/articles/creating-a-pull-request).  As a new developer, you'll want to [fork](https://help.github.com/articles/fork-a-repo) SUAVE to your personal account.  This creates a clone of the whole SUAVE repository, including all past versions, inside your GitHub account.  Generally you'll want to start from the develop branch, but you can check with the dev-list if you think it would be more appropriate to work on a feature branch.

Development is done on separate branches.  Our branching model is very similar to [this one](http://nvie.com/posts/a-successful-git-branching-model/).  Basically there are three types of branches.

- master -- stable, latest release and fixes 
- develop -- current development, generally the branch for you to start with 
- feature-* -- feature specific branches, names with underscores, check with the developer email list if you think this a better place to contribute 

### Prerequisites

In addition to the package dependencies listed on the [download](/download) page, you will need to install git.

#### Git-Client

[Git](https://en.wikipedia.org/wiki/Git_(software)) is an advanced, distributed version control system. It is the core of the majority of current open source projects.

Here are some instructions for installing git on your machine.<br>
[linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing-on-Linux) , [mac](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing-on-Mac) , [windows](http://msysgit.github.io/) , [more info](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) 

There are several [GUI's](http://git-scm.com/downloads/guis) available to help manage the repository.  On windows [TortoiseGit](https://code.google.com/p/tortoisegit/) is also useful one.

If you're going to install TortoiseGit on windows, when installing the git client (MsysGit), uncheck “Windows Explorer Integration”.  And when installing TortoiseGit, select “Checkout as-is, Unix-style line endings”

Once you've installed git, there a few post-install commands to run, documented [here](https://help.github.com/articles/set-up-git/#setting-up-git).

#### GitHub Account

[GitHub](github.com) is a hosting service for git projects.  SUAVE's repository is located [here](https://github.com/suavecode/SUAVE).

If you don't have a github account already, go ahead and sign up!

Go to the SUAVE github repo at [github.com/suavecode/SUAVE](https://github.com/suavecode/SUAVE) and check out the code!  If you wouldn't mind, tick the “Watch” and “Star” buttons at the top-right of the page, if you think this is a sweet repo.

<br>

## Developer Installation

1. Go to the SUAVE github [repo](https://github.com/suavecode/SUAVE).  
2. To get your own copy of the source, with links into real-time updates, you need to ![fork](/images/fork-button.png){:height="25px"} the repo.  This button is on the top-right of the page too.  
3. This will copy the repo and take you to your fork, notice that your web-browser's URL has changed to include your username. 
4. Now you can [clone](http://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#Cloning-an-Existing-Repository) your fork to your computer.  Find the clone url of your fork on the right hand side of the page and copy it.  You can use the https url. <br> ![clone](/images/clone-example.png){:height="90px"} 
5. Open a command prompt, in a directory that you want to start the repository, and run the git commends <br> `git clone <git url>` <br> Now you should have the source code! 
6.  Change directory into the SUAVE/trunk folder and run a developer installation command.  <br> `python setup.py develop` <br> Now you have a developer version of SUAVE installed!
7.  Test the installation by changing to any other directory, then start a python shell, and run the command <br> `>>> import SUAVE`<br>`>>> print SUAVE.__file__`<br> This should print the file path to your trunk directory.

#### Some Notes

- If you had previously installed a release distribution according to the download page, you'll want to [uninstall](/download#un-installation) the existing package first.  
- The same strategies for dealing with write access can be used here, by simply replacing any `install` commands with `develop`
- To uninstall the developer version, run the command `python setup.py develop --uninstall`

<br>

## Managing your repository

As you make changes to your code, you'll want to [add and commit](http://git-scm.com/docs/git-commit#_examples) them to your [clone](http://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#Cloning-an-Existing-Repository), and [push](http://git-scm.com/docs/git-push#_examples) them to your fork.  You will [fetch](https://help.github.com/articles/syncing-a-fork/) changes from the [upstream remote](https://help.github.com/articles/syncing-a-fork/) suavecode repository, and [merge](http://git-scm.com/docs/git-merge#_examples) them into your clone.  To send your changes back to the upstream repository, you can submit a [pull-request](https://help.github.com/articles/using-pull-requests/#initiating-the-pull-request).


### Setting the upstream

There are a good references for this process [here](https://help.github.com/articles/configuring-a-remote-for-a-fork/) and [here](https://help.github.com/articles/syncing-a-fork/), and else where via a google search for "git update fork".

1. Inspect your current "remote", this is the url's to the repositories to which your clone listens. 
   In the SUAVE directory which has been cloned, type `git remote –v` and it should show the “origin” directory for “fetch” and “push”. This would be your own “cloned” Git repository.
2. Add an upstream repository (the main suavecode/SUAVE repository in this case) using `git remote add upstream https://github.com/suavecode/SUAVE.git`
3. Run `git remote -v` again to see the new remotes.

### Changing branches

You should work on the develop branch in general, it will have the most updated changes from the community.  

1. Inspect your branches, `git branches -v`, you'll see all the branches, for both upstream and origin.  Generally you should only work off the origin branches
2. Start a new branch, `git branch origin/develop develop`, this comand says alias the branch "origin/develop" with the name "develop".
3. Checkout the branch, `git checkout develop`.
4. You can see your current branch with, `git branches`,  the one you have checked out will have a star next to it.
5. Commit all your changes to the current branch before checking out another branch, otherwise the changes will be lost.
6. To dump any changes that you don't want, `git stash`, will be helpful.

### Store changes to your GitHub fork

1. Edit the code as you need on your machine
2. Inspect git's view of the changes you've made, `git status`
2. Add the changed files to your clone, `git add <path to file>`, or to add all the changes, `git add -a` (be careful with this one).  This command does not make the changes part of your repo's history!  You can do multiple add commands for example.
3. Commit them to the history on your machine, `git commit -m 'your message for the commit'`.  Make sure to include a nice description.  This command only affects your local repository!  You can do multiple commits before sending them to github.
4. Push the new commits to github, `git push origin`.  This will send all the commits to your fork on github.  This serves as a backup copy for you, and is needed to share the changes with the upstream suavecode repository via pull-requests.


### Get new changes from upstream

1. Fetch updates from upstream repository, `git fetch upstream`
2. Merge the changes, `git merge upstream/develop`, where develop in this case is the branch name that you want to merge.
3. Push the change to your fork on github, `git push origin master`

### Share your changes with upstream

More detail can be found [here](https://help.github.com/articles/using-pull-requests/#initiating-the-pull-request).

1. Commit and push all your changes to your fork on github.
2. Open a browser and open your branch on the github website.
3. Click the "Compare and Review" button
4. Review the changes for any unexpected differences.  
5. Click the "Create Pull Request" button
6. The devs will take a look and merge the request.



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

