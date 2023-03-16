<script setup>
import Typing from '../components/Typing.vue'
const header = "> Hello World!"
</script>

<Typing class="header" :text="header" show="0" start="500" end="5000"></Typing>

I'm Gregory Ling, a senior majoring in Computer Engineering at Iowa State University. I lead the software subteam of the Prisum Solar Car Club at ISU, teaching new members how to program the solar car, work with a team researching intermittent computing using FPGA acceleration and wireless power harvesting, and make progress on several other projects as well. I will also be starting my Master's degree in Computer Engineering concurrently in the fall.

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