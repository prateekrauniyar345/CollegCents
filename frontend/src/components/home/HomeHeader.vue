<script setup>
import { Sparkles, Plus } from '@lucide/vue'
</script>

<template>
  <div class="w-full flex flex-col md:flex-row md:items-end justify-between mt-8 mb-8 animate-fade-in-up">
    <!-- Left Text Group -->
    <div class="mb-6 md:mb-0">
      <h1 class="text-3xl md:text-4xl font-black text-cc-main tracking-tight mb-2">Budgets</h1>
      <p class="text-cc-muted font-medium text-sm md:text-base">
        Plan, track, and control your spending limits with ease.
      </p>
    </div>

    <!-- Right Action Group -->
    <div class="flex items-center space-x-3">
      <button class="bg-white hover:bg-slate-50 text-cc-main border border-slate-200 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm flex items-center">
        <Plus class="w-4 h-4 mr-1.5" />
        Create Budget
      </button>
      <button class="bg-cc-primary hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center">
        <Sparkles class="w-4 h-4 mr-2 fill-current" />
        Ask Campus Cents
      </button>
    </div>
  </div>
</template>