<script setup>
import {
  Bell,
  Target,
  TrendingUp,
  Star,
  Users,
  ArrowUpRight,
  ArrowDownRight
} from '@lucide/vue'
</script>

<template>
  <section class="w-full max-w-7xl mx-auto px-6 relative z-10 mt-4">
    <div class="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-slate-100 relative overflow-hidden flex flex-col lg:flex-row">
      
      <!-- Left Section: Feature Split -->
      <div class="lg:w-1/2 flex flex-col justify-center pr-8 mb-12 lg:mb-0 relative z-20">
        <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          Finance made <br/><span class="text-green-500">Easier with AI</span>
        </h2>
        
        <div class="flex items-center space-x-6 mb-12">
          <div class="flex items-center space-x-2">
            <div class="bg-green-100 p-2 rounded-xl">
              <Users class="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div class="font-bold text-xl text-slate-900">1k+</div>
              <div class="text-sm text-slate-500 font-medium">Active Users</div>
            </div>
          </div>
          <div class="w-px h-10 bg-slate-200"></div>
          <div class="flex items-center space-x-2">
            <div class="bg-yellow-100 p-2 rounded-xl">
              <Star class="w-6 h-6 text-yellow-600 fill-current" />
            </div>
            <div>
              <div class="font-bold text-xl text-slate-900 flex items-center">4.9 <Star class="w-4 h-4 ml-1 fill-current text-yellow-500"/></div>
              <div class="text-sm text-slate-500 font-medium">App Ratings</div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Clear Targets Card -->
          <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
            <div class="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
              <Target class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Create Budget</h3>
            <p class="text-slate-500 font-medium">Create your own budget plan with automated categorization and smart limits to keep you on track.</p>
          </div>
          
          <!-- Promising Progress Card -->
          <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
            <div class="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
              <TrendingUp class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Promising Progress</h3>
            <p class="text-slate-500 font-medium">Personalized insights based on your past spending habits to help you reach your goals faster.</p>
          </div>
        </div>
      </div>

      <!-- Right Section: Floating Mobile Mockups (Component C) -->
      <div class="lg:w-1/2 relative min-h-[600px] hidden md:block">
        
        <!-- Mockup 2: Background Right (Analytics) -->
        <div class="absolute right-0 top-10 w-[300px] bg-white rounded-[2.5rem] shadow-2xl border-[6px] border-slate-50 p-6 z-10 hover:-translate-y-2 transition-transform duration-500">
          <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
            Statistics
            <span class="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">+20% this month</span>
          </h3>
          
          <!-- Chart Placeholder -->
          <div class="h-32 w-full bg-slate-50 rounded-2xl mb-4 relative overflow-hidden flex items-end">
            <!-- Fake area chart -->
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" class="w-full h-full text-green-100 fill-current absolute bottom-0">
              <path d="M0 50 L0 30 Q10 20 20 30 T40 15 T60 25 T80 10 L100 20 L100 50 Z" />
            </svg>
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" class="w-full h-full absolute bottom-0 overflow-visible">
              <path d="M0 30 Q10 20 20 30 T40 15 T60 25 T80 10 L100 20" fill="none" stroke="#22c55e" stroke-width="2" />
            </svg>
          </div>
          
          <div class="flex justify-between text-xs text-slate-400 font-medium mb-6 px-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
          </div>
          
          <!-- Quick Summary Mini Cards -->
          <div class="flex space-x-3">
            <div class="flex-1 bg-slate-50 rounded-2xl p-4">
              <div class="text-slate-400 text-xs font-semibold mb-1">Total Inflow</div>
              <div class="text-green-600 font-bold text-sm flex items-center"><ArrowDownRight class="w-3 h-3 mr-1"/> $2,450</div>
            </div>
            <div class="flex-1 bg-slate-50 rounded-2xl p-4">
              <div class="text-slate-400 text-xs font-semibold mb-1">Total Outflow</div>
              <div class="text-red-500 font-bold text-sm flex items-center"><ArrowUpRight class="w-3 h-3 mr-1"/> $1,210</div>
            </div>
          </div>
        </div>

        <!-- Mockup 1: Foreground Left (Spending Tracker) -->
        <div class="absolute left-0 lg:-left-10 top-32 w-[300px] bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-[6px] border-white p-6 z-20 hover:-translate-y-2 transition-transform duration-500">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border border-slate-100 flex items-center justify-center text-slate-500 font-bold">
                A
              </div>
              <div>
                <div class="text-xs text-slate-500 font-medium">Welcome Back!</div>
                <div class="font-bold text-slate-900 text-sm">Hello, Azhar</div>
              </div>
            </div>
            <button class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100">
              <Bell class="w-4 h-4" />
            </button>
          </div>
          
          <!-- Active Balance Card -->
          <div class="bg-green-500 rounded-3xl p-5 text-white mb-6 shadow-lg shadow-green-500/30 relative overflow-hidden">
            <div class="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div class="text-green-100 text-xs font-medium mb-1 relative z-10">Semester Savings Goal</div>
            <div class="text-3xl font-black mb-4 relative z-10 tracking-tight">$529.73</div>
            <div class="flex justify-between items-center text-xs font-medium text-green-100 relative z-10">
              <span>Target: August 2026</span>
              <span class="bg-white/20 px-2 py-1 rounded-lg">82%</span>
            </div>
          </div>
          
          <!-- Recent Activity -->
          <div>
            <div class="text-sm font-bold text-slate-900 mb-4 flex justify-between items-center">
              Recent Activity
              <span class="text-xs text-green-500 cursor-pointer hover:underline">See All</span>
            </div>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-bold">🍔</div>
                  <div>
                    <div class="font-bold text-slate-900 text-sm">Campus Cafe</div>
                    <div class="text-xs text-slate-400 font-medium">Food & Dining</div>
                  </div>
                </div>
                <div class="font-bold text-slate-900 text-sm">-$12.50</div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold">📚</div>
                  <div>
                    <div class="font-bold text-slate-900 text-sm">Bookstore</div>
                    <div class="text-xs text-slate-400 font-medium">Education</div>
                  </div>
                </div>
                <div class="font-bold text-slate-900 text-sm">-$85.00</div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center font-bold">💳</div>
                  <div>
                    <div class="font-bold text-slate-900 text-sm">Venmo - Sarah</div>
                    <div class="text-xs text-slate-400 font-medium">Transfer</div>
                  </div>
                </div>
                <div class="font-bold text-green-500 text-sm">+$25.00</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>