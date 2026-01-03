<script setup>
import { ref, onMounted } from 'vue'
import PaperLayout from '@/components/layout/PaperLayout.vue'
import DateHeader from '@/components/display/DateHeader.vue'
import NarrativeCard from '@/components/display/NarrativeCard.vue'
import HistoryBenchmark from '@/components/display/HistoryBenchmark.vue'
import MicroAction from '@/components/display/MicroAction.vue'
import { todayData } from '@/data/calendarData'

// 加载状态
const isLoading = ref(true)
const showContent = ref(false)

// 模拟加载动画
onMounted(() => {
  // 模拟墨滴扩散动画
  setTimeout(() => {
    isLoading.value = false
    // 延迟显示内容，产生淡入效果
    setTimeout(() => {
      showContent.value = true
    }, 300)
  }, 1500)
})
</script>

<template>
  <PaperLayout>
    <!-- 加载状态：墨滴扩散动画 -->
    <Transition name="ink-spread">
      <div 
        v-if="isLoading" 
        class="fixed inset-0 flex items-center justify-center z-50 bg-paper-200"
      >
        <div class="text-center">
          <!-- 墨滴动画 -->
          <div class="relative w-24 h-24 mx-auto">
            <div class="absolute inset-0 bg-ink-primary rounded-full animate-ping opacity-20"></div>
            <div class="absolute inset-2 bg-ink-primary rounded-full animate-pulse"></div>
            <div class="absolute inset-4 bg-ink-primary rounded-full"></div>
          </div>
          <p class="mt-6 text-ink-secondary font-serif text-lg tracking-widest animate-pulse">
            研墨...
          </p>
        </div>
      </div>
    </Transition>
    
    <!-- 主内容区域 -->
    <Transition name="fade-content">
      <main 
        v-if="!isLoading" 
        class="relative z-10 min-h-screen flex flex-col"
      >
        <!-- 日期头部 -->
        <DateHeader :date="todayData.date" />
        
        <!-- 滚动内容区域 -->
        <div class="flex-1 px-5 pb-8 space-y-6">
          <!-- AI叙事卡片 -->
          <NarrativeCard 
            :narrative="todayData.narrative"
            :class="{ 'opacity-0 translate-y-4': !showContent }"
            class="transition-all duration-700 delay-200"
          />
          
          <!-- 历史对标 -->
          <HistoryBenchmark 
            :benchmark="todayData.historyBenchmark"
            :class="{ 'opacity-0 translate-y-4': !showContent }"
            class="transition-all duration-700 delay-400"
          />
          
          <!-- 底部微行动 -->
          <MicroAction 
            :action="todayData.microAction"
            :class="{ 'opacity-0 translate-y-4': !showContent }"
            class="transition-all duration-700 delay-600"
          />
          
          <!-- 底部留白与印章 -->
          <div 
            :class="{ 'opacity-0': !showContent }"
            class="transition-all duration-700 delay-800"
          >
            <div class="flex justify-center mt-8 mb-4">
              <div class="seal-mark">
                <span class="text-white font-calligraphy text-lg">奇</span>
              </div>
            </div>
            
            <p class="text-center text-ink-tertiary text-sm font-serif">
              奇点历 · 每日一历
            </p>
          </div>
        </div>
      </main>
    </Transition>
  </PaperLayout>
</template>

<style scoped>
/* 墨滴扩散过渡 */
.ink-spread-enter-active {
  animation: inkIn 1.5s ease-out;
}

.ink-spread-leave-active {
  animation: inkOut 0.5s ease-out forwards;
  animation-delay: 0.3s;
}

@keyframes inkIn {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 1;
  }
}

@keyframes inkOut {
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* 内容淡入过渡 */
.fade-content-enter-active {
  transition: all 0.8s ease-out;
}

.fade-content-enter-from {
  opacity: 0;
}
</style>
