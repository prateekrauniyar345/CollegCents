<script setup>
import { Settings, Bell, LogOut } from '@lucide/vue'
import { computed, inject } from 'vue'
import authStore, { clearAccount } from '../../auth/authStore'
import { useRouter, useRoute } from 'vue-router'

const account = computed(() => authStore.account)
const router = useRouter()
const route = useRoute()
const msalInstance = inject('msal')

const getInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

async function handleLogout() {
  try {
    const currentAccount = msalInstance.getAllAccounts()[0] || null
    if (currentAccount) {
      try { await msalInstance.logoutPopup({ account: currentAccount }) } catch (e) { try { await msalInstance.logoutRedirect({ account: currentAccount }) } catch (_) {} }
    }
    clearAccount()
    router.push('/signin')
  } catch (e) {
    router.push('/signin')
  }
}

const navLinks = [
  { name: 'Overview', path: '/home/overview' },
  { name: 'Transactions', path: '/home/transactions' },
  { name: 'Accounts', path: '/home/accounts' },
  { name: 'Budgets', path: '/home' },
  { name: 'Analytics', path: '/home/analytics' },
  { name: 'Reports', path: '/home/reports' }
]
</script>

<template>
  <header class="w-full bg-cc-surface shadow-sm border-b border-slate-100 z-30 sticky top-0">
    <div class="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
      
      <!-- Left: App Branding -->
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-cc-primary-dark flex items-center justify-center">
          <span class="text-white font-bold text-sm">CC</span>
        </div>
        <span class="text-xl font-bold text-cc-main tracking-tight">Campus Cents</span>
      </div>

      <!-- Center: Main Navigation Tabs -->
      <nav class="hidden lg:flex items-center space-x-1 bg-slate-50 p-1 rounded-full border border-slate-100">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          :class="[
            'px-5 py-2 rounded-full text-sm transition-colors',
            route.path === link.path 
              ? 'font-bold bg-cc-primary-dark text-white shadow-sm' 
              : 'font-semibold text-cc-muted hover:text-cc-main'
          ]"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <!-- Right: Global Utility Actions -->
      <div class="flex items-center space-x-5">
        <router-link to="/home/settings" class="text-cc-muted hover:text-cc-main transition-colors">
          <Settings class="w-5 h-5" />
        </router-link>
        <router-link to="/home/notifications" class="relative text-cc-muted hover:text-cc-main transition-colors">
          <Bell class="w-5 h-5" />
          <!-- Red Badge Indicator -->
          <span class="absolute top-0 right-0 w-2 h-2 bg-status-critical rounded-full border-2 border-white"></span>
        </router-link>
        
        <div class="h-6 w-px bg-slate-200 mx-2"></div>
        
        <!-- User Profile Pill -->
        <div class="flex items-center space-x-3 group cursor-pointer relative">
          <div class="flex flex-col items-end hidden md:flex">
            <span class="text-sm font-bold text-cc-main leading-tight">{{ account?.name || 'User' }}</span>
            <span class="text-xs text-cc-muted font-medium">{{ account?.username || account?.email || 'user@example.com' }}</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-cc-primary-dark font-bold text-sm shadow-sm overflow-hidden">
             {{ getInitials(account?.name) }}
          </div>

          <!-- Dropdown (Hover) -->
          <div class="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-xl border border-slate-100 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden flex flex-col">
            <button @click="handleLogout" class="w-full text-left px-4 py-3 text-sm text-status-critical hover:bg-slate-50 flex items-center font-medium">
              <LogOut class="w-4 h-4 mr-2" /> Sign Out
            </button>
          </div>
        </div>
      </div>

    </div>
  </header>
</template>