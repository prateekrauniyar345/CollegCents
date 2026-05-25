<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginWithPopup } from '../../auth/msalConfig'
import { setAccount } from '../../auth/authStore'

const router = useRouter()

const loading = ref(false)
const error = ref(null)

async function handleSignIn() {
  if (loading.value) return

  loading.value = true
  error.value = null

  try {
    const response = await loginWithPopup()

    if (response?.account) {
      setAccount(response.account)
    }

    router.push('/home')
  } catch (e) {
    console.error('Sign in failed:', e)

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
  <div class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-bold mb-4">Sign in</h2>

    <p class="text-sm text-slate-600 mb-4">
      Sign in with your Microsoft account.
    </p>

    <button
      @click="handleSignIn"
      :disabled="loading"
      class="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-60"
    >
      <span v-if="!loading">Sign in with Microsoft</span>
      <span v-else>Signing in…</span>
    </button>

    <p v-if="error" class="text-red-500 mt-3">
      {{ error }}
    </p>
  </div>
</template>