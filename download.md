---
layout: page
title: Download
subtitle: How to download and install this fantastic tool
permalink: /download/
---


Jump in and design!  Here are some helpful steps for downloading and installing the code.  There are stable releases and beta releases.  Also make sure to check out the license under which the code is available.

## Downloading

### Stable Release
Download the latest stable release of SUAVE -- <br>
[SUAVE Version 0.2.0](https://github.com/suavecode/SUAVE/releases)


### Beta Releases
We'll also pre-publish mostly stable beta releases.  You can find them here -- <br>
[Developer Releases](https://github.com/suavecode/SUAVE/releases)


### License

We want SUAVE to grow with the community, so it's available under a [CC BY-SA-NC 4.0 License](https://github.com/suavecode/SUAVE/blob/master/LICENSE).  It can be used freely to design and build commercial vehicles.  Please contact us if you are interested in re-publishing SUAVE source code as part of a commercial software.  

### Dependencies

SUAVE is developed primarily on Python 2.7. It's known to work on versions 2.4 through 2.7.  Let us know if you find that it works on additonal versions.

We strongly recommend using a scientific python distribution like [Anaconda](http://continuum.io/downloads) or [Enthought-Canopy](https://store.enthought.com/downloads).  All the package dependencies below will come pre-packaged and stuff will just work.

If you don't have access to a scientific python distribution, you can install the dependent packages separately.  Below are the packages that SUAVE expects in order to run the tutorial cases.  We link to guides on using package managers for linux and mac, and python installers for windows.  If these fail, check out the source forge links for additional installers or source code.

|package     | link  |
|------------|-------|
| numpy      | [linux](http://www.scipy.org/install.html#linux-packages) , [mac](http://www.scipy.org/install.html#mac-packages) , [windows](http://www.lfd.uci.edu/~gohlke/pythonlibs/#numpy) , [source](http://sourceforge.net/projects/numpy/files/NumPy) |
| scipy      | [linux](http://www.scipy.org/install.html#linux-packages) , [mac](http://www.scipy.org/install.html#mac-packages) , [windows](http://www.lfd.uci.edu/~gohlke/pythonlibs/#scipy) , [source](http://sourceforge.net/projects/scipy/files/scipy) |
| matplotlib | [linux](http://www.scipy.org/install.html#linux-packages) , [mac](http://www.scipy.org/install.html#mac-packages) , [windows](http://www.lfd.uci.edu/~gohlke/pythonlibs/#matplotlib) , [source](http://sourceforge.net/projects/matplotlib/files/matplotlib) |
| pip        | [linux](https://pip.pypa.io/en/stable/installing.html#install-pip) , [mac](https://pip.pypa.io/en/stable/installing.html#install-pip) , [windows](https://pip.pypa.io/en/stable/installing.html#install-pip) |

<br>
**Note**: For the windows installers, you can pick the latest version, for "cp2.7" (C-Python 2.7), for your architecture (32 or 64bit), and for numpy pick the MKL version (it's faster). <br>
**Note**: The pip installer above will also install setuptools, a sub-dependency.

## Installation

Once you've downloaded the code and prepared the software requrements, you're ready to install!

1. Download an extract the code
2. Open the directory SUAVE/trunk
3. Open a command prompt in this folder
4. Run this command: ```python setup.py install```

Now you can check out the [guides](/guides)!

After trying out the guides you find you want to make changes to the innards of the package to fit your problem, take a look at the [develop](/develop) notes.


<br>

### Dealing with Write Access

You shouldn't need this part of the guide, unless you don't have write-access to the python site-packages  directory.  In that case, you can try these approaches to install SUAVE

#### A. Install to local site-packages

This involves the install option --user <br>
``` python setup.py install --user ```


#### B. Start a local site-packages folder 

This involves creating a local directory, and setting up your PYTHONPATH environment variable.

1. Create a local directory.  
   For example: <br>
   ```~/python-site-packages``` or <br> 
   ```C:/Users/your-user-name/python-site-packages```
2. Append this path to PYTHONPATH
   - For Unix operating systems
      - Append this line to your ~/.bashrc file <br>
         ```export PYTHONPATH = $PYTHONPATH:~/python-site-packages```
      - And source the bashrc file <br>
         ```$ source ~/.bashrc```
         
   - For MacOS operating systems
      - Append this line to your ~/.bash_profile file <br>
         ```export PYTHONPATH = $PYTHONPATH:~/python-site-packages```
      - And source the bashrc file <br>
         ```$ source ~/.bash_profile```
         
   - For Windows operating systems
      - Open the start menu and type "environ", this opens the environment variable editor
      - Create or edit the PYTHONPATH "User" environment variable, appending the full path to your custom site-package directory, separating multiple paths with semicolons.  For example: <br>
      	```%PYTHONPATH%;C:/Users/your-user-name/python-site-packages```
      - After this you'll need to open a new command line window. <br>
3. Now Install SUAVE
   Using the example of the custom directoy ~/python-site-packages: <br>
   ``` python setup.py install --prefix=~/python-site-packages```
      
#### Additional Options

Additional setup options, such as overriding the default install location, can be found with the following commands: <br>
`python setup.py install --help` <br>
`python setup.py uninstall --help` <br>
`python setup.py develop --help` <br>
`python setup.py --help` 

<br>

##   Un-Installation

SUAVE requires pip to uninstall.  An alternate approach is provided further below if pip is not available.

#### Un-Installation with pip:

1. Navigate to the SUAVE/trunk directory by command line.
2. Run the uninstall command. (On unix platforms, these commands may require a sudo ('super-user-do') call.) <br>
   ```python setup.py uninstall```
  
#### Alternate Approach:
   Use this if you don't have the pip package.

1. Find your site-packages folder.
    Your site-packages folder is typically located in your python's install directory, unless you manually created it.  You can find it by using the following commands.<br>
    `$ python ` <br>
    `>>> import site` <br>
    `>>> site.getsitepackages()` 
         
2. Manually delete any file including the name "SUAVE".  
   You may also check the file "easy_install.pth", if it exists, for references to the SUAVE package, and delete them.  Never said this would be pretty...  However it is a typical uninstall process for python packages.


