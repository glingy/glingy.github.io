<script setup lang="ts">
import Typing from '../components/Typing.vue';
let header = "> Hello World!"
let content = 
`I'm Gregory Ling, a Senior in Computer Engineering at Iowa State University. I will be applying to be a concurrent Master's student in the fall, and am already involved with research with faculty.`

</script>

<template>
  <div class="index">
    <Typing class="header" :text="header" show="0" start="500" end="5000"></Typing>
    <!--<Typing :text="content" show="2900" start="1000" speed="70" end="1000"></Typing>-->
    <span>{{ content }}</span>
  </div>
</template>


<style scoped lang="less">
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