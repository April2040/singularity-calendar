<script setup>
import { ref, onMounted } from 'vue'
import PaperLayout from '@/components/layout/PaperLayout.vue'
import DateHeader from '@/components/display/DateHeader.vue'
import NarrativeCard from '@/components/display/NarrativeCard.vue'
import HistoryBenchmark from '@/components/display/HistoryBenchmark.vue'
import MicroAction from '@/components/display/MicroAction.vue'
import MistLayer from '@/components/interaction/MistLayer.vue'
import { dataManager } from '@/services/dataManager'

// 状态管理
const stage = ref('loading')  // loading -> mist -> content
const mistLayerRef = ref(null)

// 初始化数据加载
async function initializeData() {
  try {
    // 并行加载今日数据和历史对标
    await Promise.all([
      dataManager.loadTodayData(),
      dataManager.loadHistoryBenchmark()
    ])
    
    // 数据加载完成后进入迷雾阶段
    if (dataManager.hasData.value) {
      stage.value = 'mist'
    } else {
      // 如果数据加载失败，直接显示错误状态
      stage.value = 'error'
    }
  } catch (err) {
    console.error('数据初始化失败:', err)
    stage.value = 'error'
  }
}

// 墨滴加载完成
function handleLoadingComplete() {
  // 开始加载数据
  initializeData()
}

// 组件挂载时开始加载
onMounted(() => {
  // 延迟一小段时间显示loading动画效果
  setTimeout(handleLoadingComplete, 800)
})

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

// 重新加载数据
async function handleRetry() {
  stage.value = 'loading'
  await dataManager.refreshAll()
  stage.value = 'mist'
}

// 获取当前日期（用于显示）
function getCurrentDate() {
  if (dataManager.todayData.value) {
    return dataManager.todayData.value.date
  }
  // 回退到当前日期
  const now = new Date()
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    lunar: '未知',
    zodiac: '未知'
  }
}

// 获取叙事数据
function getNarrative() {
  return dataManager.todayData.value?.narrative || null
}

// 获取历史对标数据
function getHistoryBenchmark() {
  return dataManager.historyBenchmark.value || dataManager.todayData.value?.historyBenchmark || null
}

// 获取微行动数据
function getMicroAction() {
  return dataManager.todayData.value?.microAction || null
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
            {{ dataManager.isLoading.value ? '汲取智慧...' : '研墨...' }}
          </p>
        </div>
      </div>
    </Transition>
    
    <!-- 错误状态 -->
    <Transition name="mist-appear">
      <div 
        v-if="stage === 'error'" 
        class="fixed inset-0 flex items-center justify-center z-50 bg-paper-200"
      >
        <div class="text-center px-8">
          <div class="text-ink-tertiary text-6xl mb-4">⚠</div>
          <p class="text-ink-secondary font-serif text-lg mb-6">
            {{ dataManager.error.value || '数据加载失败' }}
          </p>
          <button 
            @click="handleRetry"
            class="px-6 py-2 bg-ink-primary text-paper-100 rounded-lg font-serif hover:bg-ink-secondary transition-colors"
          >
            重新尝试
          </button>
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
          <DateHeader :date="getCurrentDate()" />
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
        <DateHeader :date="getCurrentDate()" />
        
        <!-- 滚动内容区域 -->
        <div class="flex-1 px-5 pb-8 space-y-6">
          <!-- AI叙事卡片 -->
          <NarrativeCard 
            v-if="getNarrative()"
            :narrative="getNarrative()"
            class="animate-fade-in-up"
          />
          
          <!-- 历史对标 -->
          <HistoryBenchmark 
            v-if="getHistoryBenchmark()"
            :benchmark="getHistoryBenchmark()"
            class="animate-fade-in-up animation-delay-200"
          />
          
          <!-- 底部微行动 -->
          <MicroAction 
            v-if="getMicroAction()"
            :action="getMicroAction()"
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
