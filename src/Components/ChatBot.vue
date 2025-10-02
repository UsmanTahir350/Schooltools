<template>
  <div>
    <h1>Chat Bot</h1>
    <input v-model="chatting" placeholder="Type message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
  </div>

  <div v-for="(msg, index) in chatHistory" :key="index" class="chat-line">
    <p><strong>You:</strong> {{ msg.question }}</p>
    <p><strong>AI:</strong> {{ msg.answer }}</p>
    <hr>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OpenAI from 'openai'
import { schoolTools } from '@/utils/schoolTools.js'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const chatting = ref('')
const reply   = ref('')
const chatHistory = ref([])

function sendMessage() {
  if (!chatting.value) return

  const info = schoolTools.getStudentInfoByName(chatting.value)
  console.log('Student Info:', info)

  if (info) {
    chatHistory.value.push({
      question: chatting.value,
      answer: JSON.stringify(info)
    })
    chatting.value = ''
    return
  }
  
  const contextMessages = chatHistory.value
    .slice(-15)
    .flatMap(m => [
      { role: 'user', content: m.question },
      { role: 'assistant', content: m.answer }
    ])

  openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      ...contextMessages,
      { role: 'user', content: chatting.value }
    ]
  })
  .then(res => {
    reply.value = res.choices?.[0]?.message?.content || 'No reply'
    chatHistory.value.push({
      question: chatting.value,
      answer: reply.value
    })
    chatting.value = ''
  })
  .catch(err => {
    reply.value = 'Error: ' + err.message
    console.error(err)
  })
}
</script>

<style>
.chat-line {
  margin-bottom: 20px;
}
hr {
  border: 0;
  height: 1px;
  background: #ccc;
}
input {
  padding: 10px;
  width: 300px;
  margin-right: 10px;
}
button {
  padding: 10px 20px;
}
</style>