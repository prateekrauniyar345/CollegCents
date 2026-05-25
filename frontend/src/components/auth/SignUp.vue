<script setup>
import { setAccount } from '../../auth/authStore'
import { ref } from 'vue'

const loading = ref(false)
const error = ref(null)

async function handleSignUp() {
  //   here we will handle the signup
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-bold mb-4">Sign up</h2>
    <p class="text-sm text-slate-600 mb-4">Create an account using your Microsoft account.</p>
    <button @click="handleSignUp" :disabled="loading" class="w-full bg-green-600 text-white py-2 rounded-lg">
      <span v-if="!loading">Sign up with Microsoft</span>
      <span v-else>Signing up…</span>
    </button>
    <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
  </div>
</template>

<style scoped>
</style>
