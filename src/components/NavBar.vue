<script lang="ts" setup>
import { RouterLink } from 'vue-router'
function hide() {
  // Webkit currently has a bug where this comes back after hiding
  // It's better to just not attempt to hide it. iPad also has the
  // issue, can't tell how to identify it.
  if (navigator.userAgent.includes('iPhone')) return

  let navbar = document.getElementById('navbar')
  if (navbar == null) return
  navbar.classList.add('routing')
  setTimeout(() => {
    document.body.focus()
    navbar!.classList.remove('routing')
  }, 500);
}
</script>

<template>
  <div id="navbar" @click="hide">
    <div>
      <router-link to='/'><img src="/turtle.svg" width="40"/></router-link>
      <router-link to='/projects'>Projects</router-link>
      <router-link to='/work'>Work</router-link>
      <router-link to='/docs'>Documents</router-link>
    </div>
    <div>
      <a href="https://github.com/glingy">GitHub</a>
    </div>
  </div>
</template>

<style lang="less">
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  height: var(--navbar-height);
  width: 100%;
  padding: 0;
  z-index: 10;

  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: space-between;
  background-color: var(--navbar-background);
  border-bottom: 2px solid var(--navbar-background);

  font-weight: bold;

  > div {
    display: flex;
    flex-flow: row nowrap;

    a {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0px 20px;
      text-decoration: none;
      color: var(--theme-color);
      border-bottom: 2px solid transparent;
    }
    
    a.router-link-active {
      border-bottom: 2px solid var(--navbar-active);
    }

    > div > div {
      display: none;

      flex-flow: column nowrap;
      text-align: left;

      background-color: var(--navbar-background);

      a {
        justify-content: left;
        padding: 10px 20px;
      }
    }
    > div:hover > div {
      display: flex;
    }

    > div a:not(.router-link-exact-active) {
      border-bottom: 2px solid transparent;
    }

    a:hover, > div:hover a:hover {
      border-bottom: 2px solid var(--navbar-highlight);
    }
  }
}

#navbar.routing > div > div:hover > div {
  display: none;
}
</style>