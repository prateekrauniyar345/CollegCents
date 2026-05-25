<script setup>
import Navbar from '../components/dashboard/Navbar.vue'
import HeroLanding from '../components/dashboard/HeroLanding.vue'
import FeaturePreview from '../components/dashboard/FeaturePreview.vue'
import AiInsights from '../components/dashboard/AiInsights.vue'
import Footer from '../components/dashboard/Footer.vue'
</script>

<template>
  <div class="min-h-screen relative overflow-hidden flex flex-col items-center">
    <Navbar />
    <HeroLanding />
    <FeaturePreview />
    <AiInsights />
    <Footer />
  </div>
</template>