<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import HomeNavbar from '../components/home/HomeNavbar.vue'
import { getTransactions, getTransactionSummary } from '../api/transactionApi'
import authStore from '../auth/authStore'
import { Loader2 } from '@lucide/vue'

const router = useRouter()

const transactions = ref([])
const loading = ref(false)
const summaryLoading = ref(false)
const error = ref('')

const summary = ref({
    spendingThisMonth: 0,
    savingsThisMonth: 0,
    remainingBalance: 0
})

const userId = computed(() => {
    return authStore.currentUser?.id || 1;
});

const fetchData = async () => {
    loading.value = true;
    summaryLoading.value = true;
    error.value = '';
    try {
        if (userId.value) {
            // Fetch summary
            const summaryData = await getTransactionSummary(userId.value);
            if (summaryData) {
                summary.value = summaryData;
            }

            // Fetch latest 10 transactions
            transactions.value = await getTransactions(userId.value, { limit: 10 });
        }
    } catch (err) {
        error.value = 'Failed to load data.';
        console.error(err);
    } finally {
        loading.value = false;
        summaryLoading.value = false;
    }
};

onMounted(() => {
    fetchData();
});

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
          <div v-if="summaryLoading" class="mt-2"><Loader2 class="w-6 h-6 animate-spin text-slate-400" /></div>
          <span v-else class="text-3xl font-bold text-red-600 mt-2">${{ summary.spendingThisMonth.toFixed(2) }}</span>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Savings This Month</span>
          <div v-if="summaryLoading" class="mt-2"><Loader2 class="w-6 h-6 animate-spin text-slate-400" /></div>
          <span v-else :class="summary.savingsThisMonth >= 0 ? 'text-green-600' : 'text-slate-900'" class="text-3xl font-bold mt-2">
              <span v-if="summary.savingsThisMonth < 0">-$</span>
              <span v-else>$</span>{{ Math.abs(summary.savingsThisMonth).toFixed(2) }}
          </span>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Remaining Balance</span>
          <div v-if="summaryLoading" class="mt-2"><Loader2 class="w-6 h-6 animate-spin text-slate-400" /></div>
          <span v-else :class="summary.remainingBalance >= 0 ? 'text-blue-600' : 'text-red-600'" class="text-3xl font-bold mt-2">
              <span v-if="summary.remainingBalance < 0">-$</span>
              <span v-else>$</span>{{ Math.abs(summary.remainingBalance).toFixed(2) }}
          </span>
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

      <!-- Recent Transactions List -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h2 class="text-lg font-bold text-slate-900">Recent Transactions</h2>
        </div>
        
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                        <th class="px-6 py-3 font-semibold">Date</th>
                        <th class="px-6 py-3 font-semibold">Description</th>
                        <th class="px-6 py-3 font-semibold">Direction</th>
                        <th class="px-6 py-3 font-semibold text-right">Amount</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="loading && transactions.length === 0">
                        <td colspan="4" class="px-6 py-8 text-center text-slate-500">
                            <Loader2 class="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
                            Loading recent transactions...
                        </td>
                    </tr>
                    <tr v-else-if="transactions.length === 0">
                        <td colspan="4" class="px-6 py-8 text-center text-slate-500">No recent transactions found.</td>
                    </tr>
                    <tr v-for="t in transactions" :key="t.id" class="hover:bg-slate-50/50 transition-colors">
                        <td class="px-6 py-4 text-sm font-medium text-slate-700">{{ t.date }}</td>
                        <td class="px-6 py-4 text-sm text-slate-900 truncate max-w-xs" :title="t.description">{{ t.description }}</td>
                        <td class="px-6 py-4 text-sm">
                            <span :class="t.direction === 'credit' ? 'text-green-600 bg-green-50 border-green-100' : 'text-slate-600 bg-slate-100 border-slate-200'" class="px-2.5 py-0.5 rounded-full border text-xs font-semibold uppercase">
                                {{ t.direction }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm font-bold text-right" :class="t.direction === 'credit' ? 'text-green-600' : 'text-slate-900'">
                            {{ t.direction === 'credit' ? '+' : '-' }}${{ t.amount.toFixed(2) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>

      <!-- Bottom Row: Action Button -->
      <div class="flex justify-center mt-10">
        <button 
          @click="goToTransactions"
          class="bg-slate-900 hover:bg-black text-white font-semibold py-3 px-8 rounded-full shadow-md transition-colors inline-flex items-center hover:scale-105 transform duration-200"
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