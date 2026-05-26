<script setup>
import { Plus } from '@lucide/vue'

const subscriptions = [
  { name: 'SaaS Tools', count: 6, amount: 840 },
  { name: 'Cloud Services', count: 3, amount: 320 },
  { name: 'Entertainment', count: 5, amount: 80 }
]
</script>

<template>
  <div class="bg-cc-surface rounded-cc shadow-cc p-6 h-[400px] border border-slate-100 flex flex-col animate-fade-in-up" style="animation-delay: 0.2s;">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-cc-main">Recurring Payments</h2>
        <p class="text-xs font-medium text-cc-muted mt-1">Track active subscriptions</p>
      </div>
      <button class="text-cc-primary font-bold text-sm flex items-center hover:text-green-700 transition-colors bg-cc-primary-light px-3 py-1.5 rounded-lg">
        <Plus class="w-4 h-4 mr-1" /> Add New
      </button>
    </div>

    <!-- Key Statistics -->
    <div class="mb-6">
      <div class="text-3xl font-black text-cc-main tracking-tight">$1,240 <span class="text-sm font-medium text-cc-muted align-middle">Monthly total</span></div>
      <div class="text-sm font-bold text-cc-muted mt-1">14 Active subscriptions</div>
    </div>

    <!-- Progress Indicator -->
    <div class="mb-6">
      <div class="flex justify-between text-xs font-bold text-cc-main mb-2">
        <span>Budget Utilization</span>
        <span>68%</span>
      </div>
      <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div class="bg-cc-primary h-full rounded-full transition-all duration-1000" style="width: 68%"></div>
      </div>
    </div>

    <!-- List Items -->
    <div class="flex-1 overflow-y-auto pr-2 space-y-4">
      <div v-for="(sub, index) in subscriptions" :key="index" class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-cc-main text-xs">
            {{ sub.count }}
          </div>
          <div class="font-bold text-cc-main text-sm">{{ sub.name }}</div>
        </div>
        <div class="font-bold text-cc-main">${{ sub.amount }}<span class="text-cc-muted text-xs font-medium">/mo</span></div>
      </div>
    </div>
  </div>
</template>