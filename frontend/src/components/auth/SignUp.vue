<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { setAccount } from '../../auth/authStore'

const router = useRouter()
const msalInstance = inject('msal')

const loading = ref(false)
const error = ref(null)

async function handleSignUp() {
  if (loading.value) return

  loading.value = true
  error.value = null

  try {
    const response = await msalInstance.loginPopup()

    if (response?.account) {
      setAccount(response.account)
    }

    router.push('/home')
  } catch (e) {
    console.error('Sign up failed:', e)

    if (e.errorCode === 'interaction_in_progress') {
      error.value = 'A sign-in window is already open. Please complete or close it first.'
    } else {
      error.value = e.message || String(e)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Sign up</h2>
      <p class="text-sm text-slate-600 mb-6 text-center">Create an account using your Microsoft account.</p>

      <div class="mt-4 flex justify-center">
        <button @click="handleSignUp" :disabled="loading" class="w-full max-w-xs bg-green-600 text-white py-2 rounded-lg disabled:opacity-60">
          <span v-if="!loading">Sign up with Microsoft</span>
          <span v-else>Signing up…</span>
        </button>
      </div>

      <p v-if="error" class="text-red-500 mt-3 text-center">{{ error }}</p>
    </div>
  </div>
</template>