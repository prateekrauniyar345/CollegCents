import { createRouter, createWebHistory } from 'vue-router'
import authStore from '../auth/authStore'

import Home from '../pages/Home.vue'
import SignInPage from '../pages/SignInPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import Dashboard from '../pages/Dashboard.vue'
import AuthRedirect from '../pages/AuthRedirect.vue'
import Overview from '../pages/Overview.vue'
import Transactions from '../pages/Transactions.vue'
import Accounts from '../pages/Accounts.vue'
import Analytics from '../pages/Analytics.vue'
import Reports from '../pages/Reports.vue'
import Settings from '../pages/Settings.vue'
import Notifications from '../pages/Notifications.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInPage
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }, 
  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: AuthRedirect
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/home/overview',
    name: 'overview',
    component: Overview
  },
  {
    path: '/home/transactions',
    name: 'transactions',
    component: Transactions
  },
  {
    path: '/home/accounts',
    name: 'accounts',
    component: Accounts
  },
  {
    path: '/home/analytics',
    name: 'analytics',
    component: Analytics
  },
  {
    path: '/home/reports',
    name: 'reports',
    component: Reports
  },
  {
    path: '/home/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/home/notifications',
    name: 'notifications',
    component: Notifications
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  // Protect all /home routes
  if (to.path.toLowerCase().startsWith('/home')) {
    if (!authStore.account) {
      return '/signin'
    }
  }
  return true
})

export default router