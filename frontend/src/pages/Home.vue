<script setup>
import authStore, { clearAccount } from '../auth/authStore'
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'


const account = computed(() => authStore.account);
console.log("Current account in Home.vue:", account.value);
const router = useRouter();
const msalInstance = inject('msal');

async function handleLogout() {
  try {
    const instance = msalInstance;
    const accounts = instance.getAllAccounts();
    const currentAccount = accounts.length ? accounts[0] : null;
    if (currentAccount) {
      try { await instance.logoutPopup({ account: currentAccount }) } catch (e) { try { await instance.logoutRedirect({ account: currentAccount }) } catch (_) {} };
    }
    clearAccount();
    router.push('/signin');
  } catch (e) {
    // ignore or show error later
    router.push('/signin');
  }
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
