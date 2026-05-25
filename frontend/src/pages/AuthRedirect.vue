<script setup>
      import { broadcastResponseToMainFrame } from "/src/auth/redirectBridge.js";
      broadcastResponseToMainFrame();
</script>


<template>
    <div class="max-w-3xl mx-auto p-6">
        <h1 class="text-3xl font-bold mb-4">Authenticating...</h1>
        <p class="text-slate-600">Please wait while we sign you in...</p>
    </div>
</template>