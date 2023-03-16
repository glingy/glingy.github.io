# ATSAMD21 Playground

As software lead for Solar Car, my main goal is to teach new members as much of what I know and have discovered as I can and make sure that when I leave the team, they will have a solid foundation of documentation and example code for them to continue to build off of. I have tried several iterations of this, but I kept circling back to the main issue that we had no good ways for them to just try code and see what happens. The boards in the car are all very application-specific and don't lend themselves to good just playing around. I've found that just playing around period to be one of the most interesting and best times for a new member to learn, so I decided at the end of one semester to design a playground board where new software members could play and experiment without fear of them breaking anything and that is very simple to use.

The playground board I ended up with is a pair of Atmel SAM D21 microcontrollers (MCUs) and various peripherals for users to see the effects of their code upon the real world to help them visualize the idea that writing to specific location in memory causes a physical effect. One MCU (the target) is connected to all the peripherals, 4 buttons, 8 LEDs, a 7-segment display, a piezo buzzer, a potentiometer, and an RGB LED which communicates over SPI. The other MCU (the debugger) is connected to the debug port of the target and over UART. The debugger is running a version of BlackMagic Probe (https://github.com/blackmagic-debug/blackmagic) firmware which I ported to the ATSAMD21. 

<div class="row">
<img src="../../assets/playground_front.png" alt="Playground Front" />
<img src="../../assets/playground_back.png" alt="Playground Back" />
</div>

To get started with the board is as simple as plugging it in, installing VSCode, cloning the repository and installing the extensions when VSCode prompts you. The development environment uses PlatformIO (https://platformio.org) and a custom extension to more easily manage projects within the development repository.

What makes this design significant is that it has an embedded debugger, so you can pause, step through your code, and inspect variables as your code runs and requires no extra setup. An Arduino allows for greater flexibility, but requires an external debugger to step through code and you have to connect parts together, often with many wires cluttering your workspace. An Adafruit Circuit Playground Express has the external parts to play with, but has no embedded debugger. TI's LaunchPad series has the embedded debugger, but no peripherals to experiment on. This is effectively a combination of a TI LaunchPad with an Adafruit Circuit Playground Express made for solar car members to learn on.

For more information, see the project's repository at https://github.com/glingy/playground where you can find example code and schematics for the board.

[< Back to Projects](/projects)
