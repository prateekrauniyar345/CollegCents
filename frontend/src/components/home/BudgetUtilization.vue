<script setup>
// Mock data for the chart
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const planned = [40, 50, 45, 60, 55, 70, 80, 60, 50, 45, 55, 65]
const actual = [35, 48, 50, 58, 40, 65, 85, 55, 45, 42, 58, 60]

const getBarHeight = (val) => `${val}%`
</script>

<template>
  <div class="bg-cc-surface rounded-cc shadow-cc p-6 flex flex-col h-[400px] border border-slate-100 animate-fade-in-up" style="animation-delay: 0.1s;">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xl font-bold text-cc-main">Budget Utilization</h2>
      
      <!-- Legend -->
      <div class="hidden sm:flex items-center space-x-4">
        <div class="flex items-center space-x-1.5">
          <div class="w-3 h-3 rounded-full bg-cc-primary"></div>
          <span class="text-xs font-medium text-cc-muted">Planned Budget</span>
        </div>
        <div class="flex items-center space-x-1.5">
          <div class="w-3 h-3 rounded-full bg-cc-primary-dark"></div>
          <span class="text-xs font-medium text-cc-muted">Actual Spend</span>
        </div>
      </div>

      <!-- Time Toggle -->
      <div class="flex bg-slate-100 p-1 rounded-full border border-slate-200">
        <button class="px-3 py-1 rounded-full text-xs font-bold bg-white text-cc-main shadow-sm">1Y</button>
        <button class="px-3 py-1 rounded-full text-xs font-bold text-cc-muted hover:text-cc-main transition-colors">6M</button>
        <button class="px-3 py-1 rounded-full text-xs font-bold text-cc-muted hover:text-cc-main transition-colors">1M</button>
      </div>
    </div>

    <!-- Chart Body -->
    <div class="flex-1 flex items-end justify-between space-x-2 md:space-x-4 relative">
      <!-- Grid lines -->
      <div class="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
        <div class="w-full border-t border-dashed border-slate-200"></div>
        <div class="w-full border-t border-dashed border-slate-200"></div>
        <div class="w-full border-t border-dashed border-slate-200"></div>
        <div class="w-full border-t border-dashed border-slate-200"></div>
      </div>

      <!-- Bars -->
      <div v-for="(month, index) in months" :key="index" class="flex-1 flex flex-col items-center justify-end h-full z-10 group relative">
        <!-- Tooltip -->
        <div class="absolute -top-12 bg-cc-main text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
          <div class="font-bold mb-1">{{ month }}</div>
          <div>Planned: ${{ planned[index] * 100 }}</div>
          <div>Actual: ${{ actual[index] * 100 }}</div>
        </div>

        <div class="w-full max-w-[20px] flex items-end justify-center relative h-full pb-6">
          <!-- Planned Bar (Background/Taller usually) -->
          <div class="absolute bottom-6 w-full max-w-[12px] md:max-w-[16px] bg-cc-primary opacity-30 rounded-t-md transition-all duration-500" :style="{ height: getBarHeight(planned[index]) }"></div>
          <!-- Actual Bar (Foreground) -->
          <div class="absolute bottom-6 w-full max-w-[12px] md:max-w-[16px] bg-cc-primary-dark rounded-t-md transition-all duration-500" :style="{ height: getBarHeight(actual[index]) }" :class="{'bg-status-critical': actual[index] > planned[index]}"></div>
        </div>
        <span class="text-[10px] sm:text-xs font-medium text-cc-muted mt-2">{{ month }}</span>
      </div>
    </div>
  </div>
</template>