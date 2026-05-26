import { createRouter, createWebHistory } from 'vue-router'

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
    path: '/home',
    name: 'home',
    component: Home
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
    path: '/overview',
    name: 'overview',
    component: Overview
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: Transactions
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: Analytics
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router