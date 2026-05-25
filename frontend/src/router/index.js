import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import SignInPage from '../pages/SignInPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import Dashboard from '../pages/Dashboard.vue'
import AuthRedirect from '../pages/AuthRedirect.vue'

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
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router