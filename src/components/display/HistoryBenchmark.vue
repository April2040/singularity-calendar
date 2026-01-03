<script setup>
defineProps({
  benchmark: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="history-card">
    <!-- 标题 -->
    <div class="flex items-center space-x-2 mb-4">
      <div class="flex items-center justify-center w-6 h-6 rounded border border-seal-red/40">
        <span class="text-seal-red text-xs font-bold">史</span>
      </div>
      <h3 class="text-sm font-serif font-medium text-ink-secondary uppercase tracking-widest">
        历史坐标系
      </h3>
    </div>
    
    <!-- 历史事件 -->
    <div class="mb-4">
      <div class="flex items-baseline space-x-2">
        <span class="text-xs text-ink-tertiary font-serif">{{ benchmark.year }}</span>
        <span class="text-lg font-serif font-medium text-ink-primary leading-tight">
          {{ benchmark.event }}
        </span>
      </div>
      <p class="mt-2 text-sm text-ink-secondary font-serif leading-relaxed">
        {{ benchmark.context }}
      </p>
    </div>
    
    <!-- 对比线 -->
    <div class="relative py-3">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-dashed border-ink-light/30"></div>
      </div>
      <div class="relative flex justify-center">
        <div class="flex items-center space-x-2 bg-paper-200 px-3">
          <svg class="w-4 h-4 text-ink-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span class="text-xs text-ink-tertiary font-serif uppercase tracking-wider">对标</span>
        </div>
      </div>
    </div>
    
    <!-- AI视角 -->
    <div class="space-y-2">
      <p class="text-sm text-ink-primary font-serif leading-relaxed">
        <span class="text-seal-red font-medium">今日：</span>
        {{ benchmark.perspective }}
      </p>
      <p class="text-xs text-ink-tertiary font-serif italic">
        {{ benchmark.comparison }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.history-card {
  background: linear-gradient(135deg, 
    rgba(0,0,0,0.015) 0%, 
    rgba(0,0,0,0) 50%, 
    rgba(0,0,0,0.015) 100%);
}
</style>
