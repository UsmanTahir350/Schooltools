<template>
  <div id="app">
    <h1>My Vue App</h1>
    <ChatBot />
  </div>
</template>

<script setup>
import ChatBot from './components/ChatBot.vue'
import { ref } from 'vue'

const message = ref('Welcome to the Chat Bot!')
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
</style>
