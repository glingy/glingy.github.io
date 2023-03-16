# CPRE 488 Projects

CPRE 488 is focused around the ZedBoard, a development board for the Zynq-7000 series FPGA from Xilinx. I worked with a group of 5 students to complete these projects as a part of the class.

## MP-0 Tennindo NES Emulator

The Tennindo was our introductory project, the NES emulation core was provided to us, but we had to interface with all the hardware components, the VGA connector, game controllers, buttons, etc. My personal goal on this project was to get sound working because we had been told that no group had ever gotten sound working during the first project before. As you can see, it worked:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/6rHcjFWlj7o?modestbranding=1&playlist=6rHcjFWlj7o&loop=1" title="MP-0 Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## MP-1 Quadcopter Control

This project's goal was to control a quadcopter using the FPGA. The requirement was to fly it with some basic flight assistance, but we opted to put a camera on the ceiling and see if we could get OpenCV to find a checkerboard attached to the top of the quadcopter, then use that location data to autonomously keep the drone in flight. We got close, but OpenCV kept losing track of the checkerboard.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/SIp8UwMDCi0?modestbranding=1&playlist=SIp8UwMDCi0&loop=1" title="MP-1 Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## MP-2 Image Processing

This project's goal was to take the raw Bayer filter mosaic image from a camera CMOS sensor, process and convert it to YCbCr, and display it on a connected HDMI display. A part of this lab was also comparing a hardware processing pipeline with a software pipeline. I saw a note in the lab doc that we should make "a good effort in the software pipeline" and decided to write it in assembly. Using assembly, I could make full use of the NEON VFPv3 vector operations to process 32 pixels of YCbCr at a time, producing 35fps video where with our initial C implementation we were processing a frame about every 2 seconds.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/_kTeLst0oig?modestbranding=1&playlist=_kTeLst0oig&loop=1" title="MP-2 Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## MP-3

This project is currently in progress.

## MP-4

This project is currently in progress.



[< Back to Projects](/projects)