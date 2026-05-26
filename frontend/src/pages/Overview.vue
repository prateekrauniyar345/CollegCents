<script setup>
import { useRouter } from 'vue-router'
import HomeNavbar from '../components/home/HomeNavbar.vue'

const router = useRouter()

const goToTransactions = () => {
  router.push('/home/transactions')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans">
    <HomeNavbar />
    <main class="max-w-[1400px] mx-auto px-6 mt-8 pb-12">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
        <p class="text-slate-500 mt-1">Here is a summary of your finances for this month.</p>
      </div>

      <!-- Top Row: Metrics (3 Cols) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Spending This Month</span>
          <span class="text-3xl font-bold text-red-600 mt-2">$1,245.00</span>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Savings This Month</span>
          <span class="text-3xl font-bold text-green-600 mt-2">$450.00</span>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Remaining Balance</span>
          <span class="text-3xl font-bold text-blue-600 mt-2">$2,305.00</span>
        </div>
      </div>

      <!-- Middle Row: Chart Placeholder -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 h-[400px] flex flex-col relative overflow-hidden">
        <h3 class="text-lg font-bold text-slate-900 mb-4">Financial History (Year-to-Date)</h3>
        <div class="flex-1 w-full flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50">
          <div class="text-center">
            <svg class="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <p class="font-medium">Plot Placeholder</p>
            <p class="text-sm mt-1">Spending, Saving, and Balance History (by month)</p>
          </div>
        </div>
      </div>

      <!-- Bottom Row: Action Button -->
      <div class="flex justify-start">
        <button 
          @click="goToTransactions"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-sm transition-colors inline-flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Transaction
        </button>
      </div>
    </main>
  </div>
</template>