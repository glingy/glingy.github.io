# Prisum Overview

I joined the Prisum Solar Car club (PrISUm #9) during the second semester of my freshman year at ISU. When I joined, the team had recently switched to a new microcontroller (ATSAMC21 family) and were using the Atmel Start Framework (ASF). The team had been struggling with ASF due to poor documentation and lack of visibility into what each  library function actually did, the mapping from function call to datasheet was very unclear. I had previous experience using the Atmel SAM D21 family, so I helped the team transition away from ASF to a more low-level system focused on the datasheet and basic register accesses. We have since fully transitioned all code, and the environment is now PlatformIO (which runs on VSCode, a common IDE most members already have) and the basic CMSIS headers. This has allowed us to write much cleaner and more efficient code which we can debug easily by reading the datasheet and inspecting registers at runtime. Working with the solar car has also given me extensive experience with CAN busses and automotive applications for embedded microcontrollers as well as a far better understanding of how to teach new members how to reference a thousand-page datasheet while writing code.

### The Compute Module
Our car uses a very modular design where every application board that requires programmable capabilities of any kind will have a connector for a Compute S+ module (often just referred to as a "compute") which contains the ATSAMC21 microcontroller. This standardized module allows us to easily swap them out if a part fails without having to solder the microcontroller or entire board again. A technical specification I wrote of the Compute Module for our ENGL 314 Technical Communication class which gives more detail into the Compute Module and how it functions is available here: <a href="/docs/compute.pdf">/docs/compute.pdf</a>




[< Back to Projects](/projects)
