<template>
  <div class="chatbot-container">
    <h2>🎓 School Chat Bot</h2>

    <div class="chat-window">
      <div v-for="(msg, index) in messages" :key="index" :class="msg.sender">
        <p>{{ msg.text }}</p>
      </div>
    </div>

    <input
      v-model="userInput"
      placeholder="Type your question..."
      @keyup.enter="handleUserInput"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SchoolTools from '../SchoolTools.js'

// Reactive variables
const userInput = ref('')
const messages = ref([
  { sender: 'bot', text: 'Hello! I am your school chatbot. Ask me anything 🙂' }
])

// Default responses
const defaultReplies = [
  "Sorry, I didn’t quite get that. Could you please rephrase?",
  "Hmm, that question seems unclear. Can you explain it a bit more?",
  "I’m not sure I understood. Try asking in a different way?",
  "That doesn’t sound familiar. Could you give me more details?",
  "Can you make that a little clearer, please?"
]

// Track the last response to avoid repetition
let lastResponseIndex = -1

function handleUserInput() {
  const question = userInput.value.trim()
  if (!question) return

  // Show user's message
  messages.value.push({ sender: 'user', text: question })

  // Get chatbot's answer
  const answer = getAnswer(question)
  messages.value.push({ sender: 'bot', text: answer })

  // Clear input
  userInput.value = ''
}

function getAnswer(text) {
  const lower = text.toLowerCase()

  // 1️⃣ School Info
  if (lower.includes('school') && lower.includes('name')) {
    const schoolName = SchoolTools.getSchoolInfo().name
    return `The school name is: ${schoolName}`
  }

  // 2️⃣ Student Info
  if (lower.includes('student') || lower.includes('which class') || lower.includes('class of')) {
    const name = extractName(lower)
    if (name) {
      const student = SchoolTools.getStudentByName(name)
      if (student) {
        const cls = SchoolTools.getClassById(student.class_id)
        return `${student.name} is in ${cls.class_name}.`
      }
      return `I couldn’t find any student named ${name}.`
    }
  }

  // 3️⃣ Teacher Info
  if (lower.includes('teacher') || lower.includes('sir') || lower.includes('madam')) {
    const name = extractName(lower)
    if (name) {
      const teacher = SchoolTools.getTeacherByName(name)
      if (teacher) {
        return `${teacher.name} teaches ${teacher.subjects_taught.length} subjects.`
      }
      return `I couldn’t find any teacher named ${name}.`
    }
  }

  // 4️⃣ Attendance Info
  if (lower.includes('attendance')) {
    const name = extractName(lower)
    const student = SchoolTools.getStudentByName(name)
    if (student) {
      const att = SchoolTools.getStudentAttendance(student.student_id)
      const last = att[att.length - 1]
      return `${student.name}'s last attendance on ${last.date} was: ${last.status}.`
    }
  }

  // 5️⃣ Default response (if nothing matches)
  return getDefaultResponse()
}

// Random default response function
function getDefaultResponse() {
  let index
  do {
    index = Math.floor(Math.random() * defaultReplies.length)
  } while (index === lastResponseIndex)
  lastResponseIndex = index
  return defaultReplies[index]
}

// Simple name extractor (for demo)
function extractName(text) {
  const words = text.split(' ')
  const names = ['ali', 'ahmad', 'ayesha', 'fatima', 'bilal', 'usman', 'sara']
  return words.find(w => names.includes(w))
}
</script>

<style scoped>
.chatbot-container {
  width: 400px;
  margin: 20px auto;
  padding: 15px;
  background: #1e1e2e;
  color: white;
  border-radius: 10px;
}

.chat-window {
  height: 300px;
  overflow-y: auto;
  background: #2a2a3a;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.user {
  text-align: right;
}

.bot {
  text-align: left;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
}
</style>
