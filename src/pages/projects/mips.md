# CPRE 381 MIPS Processor in VHDL

CPRE 381 is the first microarchitecture class, a continuation of CPRE 281 where we learned the basics of digital logic design with Verilog. My group consisted of three students working to create a pipelined MIPS processor. Our final design had 4 pipeline stages (Fetch, Decode, Execute, Write-back), and reached clock speeds of 73MHz. This project taught me a lot about FPGAs and was the project that started my interest in going deeper than assembly to work on the hardware which allowed code to run.

For this project, the focus was not originally on speed, but as we finished synthesizing the final processor, we realized that some pipeline stages were taking far longer than others and we could speed up the processor significantly by shifting some of the logic around to different pipeline stages. At the end, we reached a speed that was far faster than the benchmark the TA's expected, and had fun working through the optimization steps in the process.

It successfully executed the standard MIPS instruction set, and it was able to pass all the tests run by the TA's.


[< Back to Projects](/projects)