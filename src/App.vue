<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'

const count = ref(22.33);

function handleCountToFixed() {
  count.value = count.value.toFixed(-1);
}
</script>

<template>
  <h1>{{count}}</h1>
  <button @click="handleCountToFixed" >toFixed</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
