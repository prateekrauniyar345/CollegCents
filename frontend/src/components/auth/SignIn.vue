// src/components/auth/SignIn.vue
<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { setAccount, setCurrentUser } from '../../auth/authStore';
import User from '../../models/user';
import { checkUserloginWithMicrosoft } from '../../api/authApi';
import authStore from '../../auth/authStore';

const router = useRouter()
const msalInstance = inject('msal');

const loading = ref(false);
const error = ref(null);

async function handleSignIn() {
  if (loading.value) return;

  loading.value = true;
  error.value = null;

  try {
    const response = await msalInstance.loginPopup();

    if (!response?.account) {
      error.value = 'Microsoft login failed. No account returned.';
      return;
    }
    setAccount(response.account);
    const user = User.fromMicrosoftPayload(response.account);
    const currentUser = await checkUserloginWithMicrosoft(user); 
    const currentUserObj = currentUser ? new User(currentUser.user) : null;
    if (!currentUserObj) {
      error.value = 'Failed to create or fetch user.';
      return;
    }
    setCurrentUser(currentUserObj);
    router.push('/home/overview');
  } catch (e) {
    console.error('Sign in failed:', e);

    if (e.errorCode === 'interaction_in_progress') {
      error.value = 'A sign-in window is already open. Please complete or close it first.';
    } else {
      error.value = e.message || String(e);
    }
  } finally {
    loading.value = false;
  }

}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Sign in</h2>

      <p class="text-sm text-slate-600 mb-6 text-center">
        Sign in with your Microsoft account.
      </p>

      <div class="mt-4 flex justify-center">
        <button
          @click="handleSignIn"
          :disabled="loading"
          class="w-full max-w-xs bg-blue-600 text-white py-2 rounded-lg disabled:opacity-60 text-center"
        >
          <span v-if="!loading">Sign in with Microsoft</span>
          <span v-else>Signing in…</span>
        </button>
      </div>

      <p v-if="error" class="text-red-500 mt-3 text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>