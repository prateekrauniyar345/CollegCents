<script setup>
import { ArrowRight, BrainCircuit, AlertTriangle, Zap, BookOpen } from '@lucide/vue'
</script>

<template>
  <section class="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
    <div class="text-center mb-16">
      <div class="inline-flex items-center justify-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-md">
        <BrainCircuit class="w-4 h-4 text-green-400" />
        <span>Your Personal Finance Coach, Powered by AI</span>
      </div>
      <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
        Smarter Decisions, <br/> <span class="text-green-500">Every Single Day</span>
      </h2>
      <p class="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
        Our AI constantly analyzes your spending habits to provide you with actionable recommendations and quick financial lessons to keep you on top of your game.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Feature 1: Predictive Budgeting Card -->
      <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
        <div class="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <AlertTriangle class="w-7 h-7 text-red-500" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-3">Projected Spending Alert</h3>
        <p class="text-slate-500 font-medium mb-6 leading-relaxed">
          AI predicts you will exceed your monthly <strong class="text-slate-700">Food & Dining</strong> budget by Friday if current spending trends continue.
        </p>
        <button class="text-red-600 font-bold text-sm flex items-center hover:text-red-700 transition-colors">
          Review Budget <ArrowRight class="ml-1 w-4 h-4" />
        </button>
      </div>

      <!-- Feature 2: Goal Acceleration Recommendations -->
      <div class="bg-slate-900 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1 transition-transform relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div class="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 border border-green-500/30 group-hover:scale-110 transition-transform relative z-10">
          <Zap class="w-7 h-7 text-green-400" />
        </div>
        <h3 class="text-xl font-bold text-white mb-3 relative z-10">Accelerate Your Laptop Fund</h3>
        <p class="text-slate-400 font-medium mb-6 leading-relaxed relative z-10">
          You saved $45 on subscriptions this month! Reallocate this surplus to your Laptop Fund to reach your goal 2 weeks earlier.
        </p>
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-5 rounded-full text-sm transition-colors relative z-10 w-full">
          Transfer $45 Now
        </button>
      </div>

      <!-- Feature 3: Interactive Learning Module -->
      <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group flex flex-col justify-between">
        <div>
          <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BookOpen class="w-7 h-7 text-blue-500" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">Daily Finance Byte</h3>
          <p class="text-slate-500 font-medium mb-6 leading-relaxed">
            <strong>Learn:</strong> Basics of Emergency Funds. Why you need one and how to start building it with just $10 a week.
          </p>
        </div>
        <div class="w-full bg-slate-50 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors border border-slate-100">
          <span class="text-sm font-bold text-slate-700">Start 2-min Lesson</span>
          <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
            <ArrowRight class="w-4 h-4 text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>