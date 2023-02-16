<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar/>
  <router-view class="content"/>
</template>

<style>
.content {
  position: relative;
  top: 0;
  display: block;
  margin-left: calc(50% - 520px);
  width: 1000px;
  padding: 20px;
  background-color: var(--content-background);
  box-shadow: 0px 0px 5px 0px black;
  margin-top: calc(10px + var(--navbar-height));
  margin-bottom: 10px;
  min-height: calc(100vh - 60px - var(--navbar-height));
}

@media screen and (max-width: 1060px) {
  .content {
    margin-left: 10px;
    width: calc(100vw - 60px);
  }
}

@media screen and (max-width: 600px) {
  .content {
    margin-left: 0;
    padding: 10px;
    width: calc(100vw - 20px);
    min-height: calc(100vh - 40px - var(--navbar-height));
  }
}
</style>
