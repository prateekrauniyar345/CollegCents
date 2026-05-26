<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authStore from '../auth/authStore'

import HomeNavbar from '../components/home/HomeNavbar.vue'
import HomeHeader from '../components/home/HomeHeader.vue'
import BudgetUtilization from '../components/home/BudgetUtilization.vue'
import RecurringPayments from '../components/home/RecurringPayments.vue'
import BudgetCategoryCards from '../components/home/BudgetCategoryCards.vue'

const router = useRouter()

// Optional: Guard route
onMounted(() => {
  if (!authStore.account) {
    // If you want strictly protected routes, uncomment the redirect.
    // router.push('/signin')
  }
})
</script>

<template>
  <div class="min-h-screen bg-cc-bg text-cc-main font-sans selection:bg-cc-primary-light selection:text-cc-primary-dark">
    <!-- Global Navigation -->
    <HomeNavbar />

    <!-- Main Dashboard Container -->
    <main class="max-w-[1400px] mx-auto px-6 mt-8">
      <HomeHeader />

      <!-- Top Row Metrics (60 / 40 Split) -->
      <div class="flex flex-col lg:flex-row gap-6">
        <div class="w-full lg:w-[60%]">
          <BudgetUtilization />
        </div>
        <div class="w-full lg:w-[40%]">
          <RecurringPayments />
        </div>
      </div>

      <!-- Bottom Row Categories -->
      <BudgetCategoryCards />
    </main>
  </div>
</template>