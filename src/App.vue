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
  display: block;
  width: calc(1000px - var(--content-side-padding-large)*2);
  padding: 20px;
  background-color: var(--content-background);
  box-shadow: 0px 0px 5px 0px black;
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: calc(100vh - 60px - var(--navbar-height));
  padding-left: var(--content-side-padding-large);
  padding-right: var(--content-side-padding-large);
}

@media screen and (max-width: 1060px) {
  .content {
    width: calc(100vw - var(--content-side-padding-medium)*2 - 60px);
    padding-left: var(--content-side-padding-medium);
    padding-right: var(--content-side-padding-medium);
  }
}

@media screen and (max-width: 600px) {
  .content {
    padding: 10px;
    width: calc(100vw - 40px);
    min-height: calc(100vh - 40px - var(--navbar-height));
  }
}
</style>
