<script setup>
import authStore from '../auth/authStore'
import { computed } from 'vue'

const account = computed(() => authStore.account)

function handleLogout() {
//   we will handle logout here
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">Home</h1>
    <div v-if="account">
      <p><strong>Name:</strong> {{ account.name || account.username }}</p>
      <p><strong>Email:</strong> {{ account.username }}</p>
      <p><strong>Home Account ID:</strong> {{ account.homeAccountId }}</p>
      <button @click="handleLogout" class="mt-4 bg-red-600 text-white px-4 py-2 rounded">Sign out</button>
    </div>
    <div v-else>
      <p class="text-slate-600">You are not signed in.</p>
    </div>
  </div>
</template>

<style scoped>
</style>
