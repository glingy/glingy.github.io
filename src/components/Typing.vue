<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps(['show', 'start', 'end', 'text', 'speed'])
let text = props.text.slice(0)
let textDiv = ref<HTMLDivElement>(null!)
let cursorState = ref("")

let interval: NodeJS.Timer

function nextChar() {
  if (!textDiv.value) return
  textDiv.value.innerText += text.charAt(0)
  if (text.charAt(0) === '.') {
    clearInterval(interval)
    setTimeout(() => {
      interval = setInterval(nextChar, props.speed || 100)
    }, 1000)
  }
  text = text.slice(1)
  if (text == '') {
    clearInterval(interval)
    if (props.end !== undefined) {
      setTimeout(() => {
        cursorState.value = ""
      }, props.end)
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    cursorState.value = "visible"
    setTimeout(() => {
      interval = setInterval(nextChar, props.speed || 100)
    }, props.start || 0)
  }, props.show || 0)
})

</script>

<template>
  <div class="typing">
    <span ref="textDiv"></span><span class="cursor" :class="cursorState"></span>
  </div>
</template>


<style scoped lang="less">
.typing {
  font-family: var(--base-font);
  span {
    color: var(--text-highlight);
    line-height: 1em;
    white-space: pre-wrap;
  }

  .cursor {
    height: 1em;
    border-right: 3px solid transparent;
    animation: none;
  }

  .cursor.visible {
    border-right: 3px solid var(--text-highlight);
    animation: 1s steps(1) 0s infinite cursor;
  }
}

@keyframes cursor {
  from {
    border-color: var(--text-highlight);
  }

  50% {
    border-color: transparent;
  }

  to {
    border-color: var(--text-highlight);
  }
}
</style>