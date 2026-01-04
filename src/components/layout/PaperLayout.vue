<script setup>
// 纸纹理由组件
</script>

<template>
  <div class="min-h-screen bg-paper-200 relative overflow-hidden">
    <!-- 宣纸纹理层 -->
    <div class="paper-texture"></div>
    
    <!-- 水墨渐变氛围 -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-b from-paper-100/50 via-transparent to-paper-300/30"></div>
      <div class="absolute top-0 left-1/4 w-1/2 h-32 bg-gradient-to-b from-ink-light/5 to-transparent"></div>
    </div>
    
    <!-- 边缘装饰 -->
    <div class="fixed inset-4 pointer-events-none z-20">
      <div class="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-ink-light/20 rounded-tl-xl"></div>
      <div class="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-ink-light/20 rounded-tr-xl"></div>
      <div class="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-ink-light/20 rounded-bl-xl"></div>
      <div class="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-ink-light/20 rounded-br-xl"></div>
    </div>
    
    <!-- 内容插槽 -->
    <div class="relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.paper-texture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}
</style>
