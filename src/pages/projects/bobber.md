# BOBBER iFPGA Accelerator

Over the spring of 2023, I worked with the Bobber team under Dr. Duwe to optimize their existing intermittent computing accelerator. This is the next step from the paper "BOBBER A Prototyping Platform for Batteryless Intermittent Accelerators" published previously (https://dl.acm.org/doi/abs/10.1145/3543622.3573046).

The general idea is to implement an effective neural network accelerator (specifically a LeNet-5 model) under intermittent power. To test this, we have a node comprised of one MSP430FR5994 which contains FRAM for us to easily persist data betwen power cycles and an Actel IGLOO Nano FPGA which has only volatile RAM besides logic configuration storage in ROM. In our current setup, the node will turn on for approximately 150ms of usable processing time before shutting down to recharge, and during that time, all information required for computation must be went to the FPGA, the FPGA must compute the outputs, and the outputs must be sent back to the MSP430. Any computations left on the FPGA are lost when power is lost, so one major design goal is to minimize data loss, but maximize computational efficiency.

The current implemention created by the authors of the paper worked, but used far more power than non-accelerated MSP430-only computations with far longer computation times. In other words, it set up the concept, but the accelerator actually decelerated the computation of the neural network. I worked closely with the original author of the paper to optimize the design and it ended up becoming a successful accelerator working under intermittent power.

The project repository can be found at https://git.ece.iastate.edu/iowa-state-batteryless-intelligent-computation/Bobber.


[< Back to Projects](/projects)