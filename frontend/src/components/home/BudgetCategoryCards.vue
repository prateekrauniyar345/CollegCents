<script setup>
import { MoreHorizontal } from '@lucide/vue'

const cards = [
  {
    title: 'Marketing',
    budget: '$5,000',
    spent: '$4,200',
    utilization: 84,
    remaining: '$800',
    status: 'Almost Reached',
    statusClass: 'bg-orange-100 text-status-warning',
    type: 'bar',
    delay: '0.3s'
  },
  {
    title: 'Operations',
    budget: '$12,000',
    spent: '$5,400',
    utilization: 45,
    remaining: '$6,600',
    status: 'Healthy',
    statusClass: 'bg-green-100 text-status-healthy',
    type: 'line',
    delay: '0.4s'
  },
  {
    title: 'Payroll',
    budget: '$25,000',
    spent: '$24,500',
    utilization: 98,
    remaining: '$500',
    status: 'Critical',
    statusClass: 'bg-red-100 text-status-critical',
    type: 'donut',
    delay: '0.5s'
  },
  {
    title: 'Software',
    budget: '$3,000',
    spent: '$2,100',
    utilization: 70,
    remaining: '$900',
    status: 'On Track',
    statusClass: 'bg-green-100 text-status-healthy',
    type: 'radial',
    delay: '0.6s'
  }
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pb-20">
    <div v-for="(card, index) in cards" :key="index" class="bg-cc-surface rounded-cc shadow-cc p-6 border border-slate-100 flex flex-col justify-between animate-fade-in-up hover:shadow-lg transition-shadow cursor-pointer" :style="{ animationDelay: card.delay }">
      
      <!-- Top Row -->
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="font-bold text-cc-main text-lg">{{ card.title }}</h3>
          <p class="text-xs font-medium text-cc-muted mt-0.5">Total Budget: {{ card.budget }}</p>
        </div>
        <button class="text-cc-muted hover:text-cc-main p-1"><MoreHorizontal class="w-5 h-5"/></button>
      </div>

      <!-- Middle Row -->
      <div class="flex items-end justify-between mb-6">
        <div class="text-2xl font-black text-cc-main tracking-tight">{{ card.spent }} <span class="text-xs font-medium text-cc-muted block -mt-1">Spent</span></div>
        <div class="text-sm font-bold" :class="{'text-status-critical': card.utilization > 90, 'text-status-warning': card.utilization > 80 && card.utilization <= 90, 'text-status-healthy': card.utilization <= 80}">
          {{ card.utilization }}% <span class="text-xs font-medium text-cc-muted block -mt-1 text-right">Utilization</span>
        </div>
      </div>

      <!-- Visual Data Component (Placeholders based on type) -->
      <div class="h-16 w-full flex items-center justify-center mb-6">
        <!-- Bar Chart (Marketing) -->
        <div v-if="card.type === 'bar'" class="w-full h-full flex items-end space-x-2 justify-center">
          <div class="w-1/6 bg-slate-200 h-[30%] rounded-t-sm"></div>
          <div class="w-1/6 bg-slate-200 h-[50%] rounded-t-sm"></div>
          <div class="w-1/6 bg-slate-200 h-[40%] rounded-t-sm"></div>
          <div class="w-1/6 bg-cc-primary h-[80%] rounded-t-sm"></div>
          <div class="w-1/6 bg-cc-primary-dark h-[60%] rounded-t-sm"></div>
        </div>

        <!-- Line Area (Operations) -->
        <div v-if="card.type === 'line'" class="w-full h-full relative overflow-hidden flex items-end">
           <svg viewBox="0 0 100 50" preserveAspectRatio="none" class="w-full h-full text-green-100 fill-current absolute bottom-0">
             <path d="M0 50 L0 40 Q25 20 50 35 T100 20 L100 50 Z" />
           </svg>
           <svg viewBox="0 0 100 50" preserveAspectRatio="none" class="w-full h-full absolute bottom-0 overflow-visible">
             <path d="M0 40 Q25 20 50 35 T100 20" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" />
           </svg>
        </div>

        <!-- Donut (Payroll) -->
        <div v-if="card.type === 'donut'" class="w-16 h-16 relative">
          <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
            <path class="text-slate-100 fill-none stroke-current" stroke-width="4" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="text-status-critical fill-none stroke-current" stroke-width="4" stroke-dasharray="98, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
        </div>

        <!-- Radial (Software) -->
        <div v-if="card.type === 'radial'" class="w-full h-full relative flex items-center justify-center overflow-hidden">
          <div class="w-24 h-24 rounded-full border-[6px] border-slate-100 absolute"></div>
          <div class="w-24 h-24 rounded-full border-[6px] border-cc-primary absolute border-l-transparent border-b-transparent transform rotate-45"></div>
        </div>
      </div>

      <!-- Footer Row -->
      <div class="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
        <span class="text-sm font-bold text-cc-muted">Remaining: <span class="text-cc-main">{{ card.remaining }}</span></span>
        <span class="px-2.5 py-1 rounded-full text-xs font-bold" :class="card.statusClass">{{ card.status }}</span>
      </div>
    </div>
  </div>
</template>