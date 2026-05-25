<script setup>
import { ref } from 'vue'
import authStore, { setAccount } from '../../auth/authStore'

const loading = ref(false)
const error = ref(null)

async function handleSignIn() {
//   here we will handle the signin
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-bold mb-4">Sign in</h2>
    <p class="text-sm text-slate-600 mb-4">Sign in with your Microsoft account.</p>
    <button @click="handleSignIn" :disabled="loading" class="w-full bg-blue-600 text-white py-2 rounded-lg">
      <span v-if="!loading">Sign in with Microsoft</span>
      <span v-else>Signing in…</span>
    </button>
    <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
  </div>
</template>

<style scoped>
</style>
