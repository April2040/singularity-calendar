<script setup>
defineProps({
  action: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="relative group cursor-pointer">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-gradient-to-r from-seal-red/5 via-transparent to-seal-red/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <!-- 主内容 -->
    <div class="relative p-5 rounded-xl border border-ink-light/20 bg-paper-100/50">
      <!-- 顶部标签 -->
      <div class="flex items-center space-x-2 mb-3">
        <div class="w-8 h-8 rounded-lg bg-seal-red flex items-center justify-center shadow-sm">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span class="text-xs font-serif font-medium text-seal-red uppercase tracking-widest">
          今日微行动
        </span>
      </div>
      
      <!-- 行动内容 -->
      <p class="text-lg font-serif text-ink-primary leading-relaxed">
        {{ action }}
      </p>
      
      <!-- 装饰角 -->
      <div class="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-seal-red/20 rounded-tr"></div>
      <div class="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-seal-red/20 rounded-bl"></div>
    </div>
    
    <!-- 点击提示 -->
    <div class="mt-3 flex items-center justify-center space-x-2 text-ink-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span class="text-xs font-serif tracking-wider">点击执行此行动</span>
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </div>
</template>
