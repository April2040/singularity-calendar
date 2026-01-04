<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: Object,
    required: true
  }
})

// 格式化年份显示
const yearDisplay = computed(() => {
  return props.date.gregorian.replace(/年\d+月\d+日/, '')
})

// 格式化月日
const monthDayDisplay = computed(() => {
  const match = props.date.gregorian.match(/(\d+)年(\d+)月(\d+)日/)
  if (match) {
    return `${match[2]}.${match[3]}`
  }
  return ''
})

// 获取农历月份和日期（简化为"冬月"格式）
const lunarDisplay = computed(() => {
  return props.date.lunar
})
</script>

<template>
  <header class="pt-8 pb-6 px-5 text-center">
    <!-- 顶部小字：节气/农历 -->
    <div class="flex justify-center items-center space-x-3 mb-4">
      <span class="text-ink-tertiary text-xs font-serif tracking-widest uppercase">
        {{ date.weekday }}
      </span>
      <span class="w-1 h-1 rounded-full bg-ink-tertiary/40"></span>
      <span class="text-ink-tertiary text-xs font-serif tracking-widest">
        {{ date.solarTerm }}
      </span>
    </div>
    
    <!-- 主日期展示区 -->
    <div class="relative">
      <!-- 农历小字（竖排） -->
      <div class="absolute -left-4 top-1/2 -translate-y-1/2 hidden sm:block">
        <div class="vertical-text text-ink-tertiary/60 text-sm font-serif tracking-wider py-8">
          {{ lunarDisplay }}
        </div>
      </div>
      
      <!-- 年份大字 -->
      <h1 class="date-display text-7xl sm:text-8xl md:text-9xl font-calligraphy tracking-tight">
        {{ yearDisplay }}
      </h1>
      
      <!-- 月日行 -->
      <p class="text-2xl sm:text-3xl font-serif text-ink-secondary mt-2 tracking-widest">
        {{ monthDayDisplay }}
      </p>
      
      <!-- 装饰线 -->
      <div class="flex justify-center mt-4">
        <div class="w-16 h-px bg-ink-light/30"></div>
      </div>
    </div>
    
    <!-- 农历显示（移动端） -->
    <div class="mt-3 sm:hidden">
      <span class="text-ink-tertiary text-sm font-serif tracking-widest">
        {{ lunarDisplay }}
      </span>
    </div>
  </header>
</template>

<style scoped>
.date-display {
  font-family: 'Ma Shan Zheng', cursive;
  background: linear-gradient(135deg, #1F1F1F 0%, #3F3F3F 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
