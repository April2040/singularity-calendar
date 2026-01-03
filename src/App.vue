<script setup>
import { ref, onMounted } from 'vue'
import PaperLayout from '@/components/layout/PaperLayout.vue'
import DateHeader from '@/components/display/DateHeader.vue'
import NarrativeCard from '@/components/display/NarrativeCard.vue'
import HistoryBenchmark from '@/components/display/HistoryBenchmark.vue'
import MicroAction from '@/components/display/MicroAction.vue'
import MistLayer from '@/components/interaction/MistLayer.vue'
import { todayData } from '@/data/calendarData'

// 状态管理
const stage = ref('loading')  // loading -> mist -> content
const mistLayerRef = ref(null)

// 墨滴加载完成
function handleLoadingComplete() {
  stage.value = 'mist'
}

// 迷雾拨开完成
function handleMistComplete() {
  stage.value = 'content'
}

// 重置体验（可选功能）
function handleReset() {
  stage.value = 'mist'
  if (mistLayerRef.value) {
    mistLayerRef.value.reset()
  }
}
</script>

<template>
  <PaperLayout>
    <!-- 第一阶段：墨滴加载动画 -->
    <Transition name="ink-spread" @after-enter="handleLoadingComplete">
      <div 
        v-if="stage === 'loading'" 
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
    
    <!-- 第二阶段：迷雾交互 -->
    <Transition name="mist-appear">
      <div 
        v-if="stage === 'mist'" 
        class="fixed inset-0 z-40"
      >
        <!-- 迷雾层 -->
        <MistLayer 
          ref="mistLayerRef"
          :threshold="60"
          :brush-size="50"
          @complete="handleMistComplete"
        />
        
        <!-- 背景透出的内容（模糊状态） -->
        <div class="absolute inset-0 pointer-events-none opacity-30 blur-[2px]">
          <DateHeader :date="todayData.date" />
        </div>
      </div>
    </Transition>
    
    <!-- 第三阶段：完整内容展示 -->
    <Transition name="content-reveal">
      <main 
        v-if="stage === 'content'" 
        class="relative z-10 min-h-screen flex flex-col"
      >
        <!-- 日期头部 -->
        <DateHeader :date="todayData.date" />
        
        <!-- 滚动内容区域 -->
        <div class="flex-1 px-5 pb-8 space-y-6">
          <!-- AI叙事卡片 -->
          <NarrativeCard 
            :narrative="todayData.narrative"
            class="animate-fade-in-up"
          />
          
          <!-- 历史对标 -->
          <HistoryBenchmark 
            :benchmark="todayData.historyBenchmark"
            class="animate-fade-in-up animation-delay-200"
          />
          
          <!-- 底部微行动 -->
          <MicroAction 
            :action="todayData.microAction"
            class="animate-fade-in-up animation-delay-400"
          />
          
          <!-- 底部留白与印章 -->
          <div class="animate-fade-in-up animation-delay-600">
            <div class="flex justify-center mt-8 mb-4">
              <div class="seal-mark">
                <span class="text-white font-calligraphy text-lg">奇</span>
              </div>
            </div>
            
            <p class="text-center text-ink-tertiary text-sm font-serif">
              奇点历 · 每日一历
            </p>
            
            <!-- 重置按钮（调试用） -->
            <button 
              @click="handleReset"
              class="mt-6 text-xs text-ink-tertiary underline hover:text-ink-primary transition-colors"
            >
              重新体验
            </button>
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

/* 迷雾出现过渡 */
.mist-appear-enter-active {
  transition: all 0.5s ease-out;
}

.mist-appear-enter-from {
  opacity: 0;
}

/* 内容揭示过渡 */
.content-reveal-enter-active {
  transition: all 0.8s ease-out;
}

.content-reveal-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* 淡入上动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}
</style>
