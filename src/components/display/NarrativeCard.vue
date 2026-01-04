<script setup>
import { computed } from 'vue'

const props = defineProps({
  narrative: {
    type: Object,
    required: true
  }
})

// 计算行高样式
const contentStyle = computed(() => {
  return {
    lineHeight: '2',
    letterSpacing: '0.05em'
  }
})
</script>

<template>
  <article class="story-card">
    <!-- 卡片头部 -->
    <div class="flex items-center space-x-3 mb-4">
      <div class="w-2 h-8 bg-seal-red rounded-full"></div>
      <h2 class="text-lg font-serif font-medium text-ink-primary tracking-wide">
        {{ narrative.title }}
      </h2>
    </div>
    
    <!-- 叙事内容 -->
    <div 
      class="prose prose-p:font-serif prose-p:text-ink-secondary prose-p:leading-relaxed text-justify"
      :style="contentStyle"
    >
      <template v-for="(paragraph, index) in narrative.content.split('\n')" :key="index">
        <p 
          v-if="paragraph.trim()"
          class="mb-4 last:mb-0 text-base sm:text-lg"
        >
          {{ paragraph }}
        </p>
      </template>
    </div>
    
    <!-- 底部装饰 -->
    <div class="absolute bottom-3 right-4 w-3 h-3 border border-seal-red/30 rounded-full"></div>
  </article>
</template>

<style scoped>
.story-card {
  background: linear-gradient(180deg, 
    rgba(255,255,255,0.95) 0%, 
    rgba(255,255,255,0.85) 100%);
  backdrop-filter: blur(10px);
}

.story-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, 
    rgba(0,0,0,0.05) 0%, 
    rgba(0,0,0,0) 50%, 
    rgba(0,0,0,0.05) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
</style>
