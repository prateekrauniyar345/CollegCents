<script setup>
import { ArrowRight } from '@lucide/vue'
</script>

<template>
  <main class="w-full max-w-7xl mx-auto px-6 pt-12 pb-20 flex flex-col items-center text-center z-10">
    <!-- Trust Banner -->
    <div class="inline-flex items-center bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm mb-8 animate-fade-in-up">
      <div class="flex -space-x-2 mr-3">
        <div class="w-6 h-6 rounded-full bg-green-200 border-2 border-white"></div>
        <div class="w-6 h-6 rounded-full bg-blue-200 border-2 border-white"></div>
        <div class="w-6 h-6 rounded-full bg-purple-200 border-2 border-white"></div>
      </div>
      <span class="text-sm font-medium text-slate-700">1.5M+ Happy Students like you</span>
    </div>

    <!-- Main Headline -->
    <h1 class="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6 max-w-4xl tracking-tight">
      Your Personalized AI to manage your <span class="text-green-500">finances smartly</span>
    </h1>
    
    <!-- Sub-headline -->
    <p class="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl font-medium leading-relaxed">
      An easy way to manage, track, and study your finance. Reach your goals faster with intelligent insights.
    </p>

    <!-- CTA -->
    <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <button class="group bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 flex items-center">
        Get Started Now
        <ArrowRight class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </main>
</template>