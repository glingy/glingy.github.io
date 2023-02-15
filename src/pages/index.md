<script setup>
import Typing from '../components/Typing.vue'
const header = "> Hello World!"
</script>

<Typing class="header" :text="header" show="0" start="500" end="5000"></Typing>


Text goes here...
<!--I'm Gregory Ling, a Senior in Computer Engineering at Iowa State University. I will be applying to be a concurrent Master's student in the fall, and am already involved with research with faculty.-->

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