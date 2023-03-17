<script setup>
import Typing from '../components/Typing.vue'
const header = "> Hello World!"
</script>

<Typing class="header" :text="header" show="0" start="500" end="5000"></Typing>

I'm <a href="mailto:gling@ctrtl.com">Gregory Ling</a>, a senior majoring in Computer Engineering at Iowa State University. My interests are in very low-level design, at the HDL microarchitecture or C firmware level, with a focus on optimizations. I lead the software subteam of the Prisum Solar Car Club at ISU, training a large group of new members on how to program the solar car. I am currently working with a team researching intermittent computing using FPGA acceleration and wireless power harvesting, and I will be starting my Master's degree in Computer Engineering concurrently in the fall.

<style lang="less">
.header {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  
  padding: 50px 0px;

  font-size: min(3em, 9vw);
  color: var(--green);
}
</style>