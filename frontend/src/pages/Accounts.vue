<script setup>
import { ref } from 'vue'
import HomeNavbar from '../components/home/HomeNavbar.vue'
import { Plus, CreditCard, Building } from '@lucide/vue'

const showModal = ref(false)
const newAccountType = ref('credit')
const newAccountName = ref('')

// Placeholder accounts
const accounts = ref([
  { id: 1, type: 'credit', name: 'Chase Sapphire Preferred', balance: -450.00 },
  { id: 2, type: 'debit', name: 'Bank of America Checking', balance: 2750.50 }
])

const openModal = () => {
  newAccountType.value = 'credit'
  newAccountName.value = ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const addAccount = () => {
  if (newAccountName.value.trim() === '') return
  
  accounts.value.push({
    id: Date.now(),
    type: newAccountType.value,
    name: newAccountName.value,
    balance: 0.00
  })
  
  closeModal()
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans relative">
    <HomeNavbar />
    
    <main class="max-w-[1400px] mx-auto px-6 mt-8 pb-12">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Accounts</h1>
          <p class="text-slate-500 mt-1">Manage your connected credit and debit accounts.</p>
        </div>
        <button 
          @click="openModal"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-sm transition-colors flex items-center"
        >
          <Plus class="w-5 h-5 mr-2" />
          Add New Account
        </button>
      </div>

      <!-- Accounts List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="account in accounts" :key="account.id" class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div class="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600">
            <CreditCard v-if="account.type === 'credit'" class="w-6 h-6" />
            <Building v-else class="w-6 h-6" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-slate-900">{{ account.name }}</h3>
            <p class="text-sm text-slate-500 capitalize">{{ account.type }} {{ account.type === 'credit' ? 'Card' : 'Account' }}</p>
          </div>
          <div class="text-right">
            <span :class="{'text-slate-900': account.balance >= 0, 'text-slate-900': account.balance < 0}" class="text-lg font-bold">
              <span v-if="account.balance < 0">-$</span>
              <span v-else>$</span>{{ Math.abs(account.balance).toFixed(2) }}
            </span>
          </div>
        </div>
        
        <!-- Add Account Card Button -->
        <button @click="openModal" class="bg-white rounded-xl shadow-sm border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all min-h-[120px]">
          <Plus class="w-8 h-8 mb-2" />
          <span class="font-semibold">Add Account</span>
        </button>
      </div>
    </main>

    <!-- Modal for Adding Account -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
        <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 class="text-xl font-bold text-slate-900">Add New Account</h2>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">&times;</button>
        </div>
        
        <div class="p-6">
          <div class="mb-5">
            <label class="block text-sm font-semibold text-slate-700 mb-2">Account Type</label>
            <div class="relative">
              <select v-model="newAccountType" class="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 font-medium">
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card / Checking</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          
          <div class="mb-8">
            <label class="block text-sm font-semibold text-slate-700 mb-2">Account Name</label>
            <input 
              v-model="newAccountName" 
              type="text" 
              placeholder="e.g. American Express" 
              class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400 font-medium"
              @keyup.enter="addAccount"
            />
          </div>
          
          <div class="flex justify-end space-x-3 pt-2 border-t border-slate-100">
            <button @click="closeModal" class="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition-colors">
              Cancel
            </button>
            <button @click="addAccount" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-colors flex items-center">
              Add Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>