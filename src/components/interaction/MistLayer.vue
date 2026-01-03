<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  threshold: {
    type: Number,
    default: 60  // 擦除60%视为完成
  },
  brushSize: {
    type: Number,
    default: 60  // 笔触大小
  }
})

const emit = defineEmits(['complete', 'progress'])

// DOM引用
const canvasRef = ref(null)
const containerRef = ref(null)

// 状态
const isDrawing = ref(false)
const isComplete = ref(false)
const clearProgress = ref(0)
const showHint = ref(true)

// Canvas上下文
let ctx = null
let canvas = null
let animationFrameId = null
let lastPoint = null

// 画布尺寸
let canvasWidth = 0
let canvasHeight = 0

// 性能优化：节流
let lastCheckTime = 0
const CHECK_INTERVAL = 200  // 每200ms检查一次进度

// 初始化Canvas
onMounted(() => {
  initCanvas()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

// 监听完成状态
watch(isComplete, (newVal) => {
  if (newVal) {
    // 触发完成动画
    setTimeout(() => {
      emit('complete')
    }, 800)
  }
})

// 初始化Canvas
function initCanvas() {
  canvas = canvasRef.value
  if (!canvas) return
  
  const container = containerRef.value
  canvasWidth = container.clientWidth
  canvasHeight = container.clientHeight
  
  // 设置Canvas尺寸（考虑设备像素比）
  const dpr = window.devicePixelRatio || 1
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  canvas.style.width = `${canvasWidth}px`
  canvas.style.height = `${canvasHeight}px`
  
  ctx = canvas.getContext('2d')
  
  // 缩放上下文
  ctx.scale(dpr, dpr)
  
  // 填充迷雾
  fillMist()
}

// 填充迷雾效果
function fillMist() {
  // 使用径向渐变创建迷雾效果
  const gradient = ctx.createRadialGradient(
    canvasWidth / 2, canvasHeight / 2, 0,
    canvasWidth / 2, canvasHeight / 2, Math.max(canvasWidth, canvasHeight) * 0.8
  )
  gradient.addColorStop(0, 'rgba(244, 241, 234, 0.95)')
  gradient.addColorStop(1, 'rgba(230, 230, 230, 0.98)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  
  // 添加一些噪点纹理
  addNoiseTexture()
}

// 添加噪点纹理
function addNoiseTexture() {
  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
  const data = imageData.data
  
  for (let i = 0; i < data.length; i += 4) {
    if (Math.random() > 0.7) {
      const noise = Math.random() * 15 - 7.5
      data[i] = Math.max(0, Math.min(255, data[i] + noise))
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
    }
  }
  
  ctx.putImageData(imageData, 0, 0)
}

// 处理窗口大小变化
function handleResize() {
  if (isComplete.value) return
  
  // 保存当前图像数据
  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
  
  // 重新初始化
  initCanvas()
  
  // 恢复（可能需要调整位置，这里简单处理）
  ctx.putImageData(imageData, 0, 0)
}

// 获取触摸/鼠标坐标
function getCoordinates(event) {
  const rect = canvas.getBoundingClientRect()
  const clientX = event.touches ? event.touches[0].clientX : event.clientX
  const clientY = event.touches ? event.touches[0].clientY : event.clientY
  
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  }
}

// 开始绘制
function startDrawing(event) {
  if (isComplete.value) return
  
  event.preventDefault()
  isDrawing.value = true
  showHint.value = false  // 隐藏提示
  
  const point = getCoordinates(event)
  lastPoint = point
  
  // 绘制起始点
  erase(point.x, point.y)
}

// 绘制中
function drawing(event) {
  if (!isDrawing.value || isComplete.value) return
  event.preventDefault()
  
  const currentPoint = getCoordinates(event)
  
  // 使用贝塞尔曲线连接点，使线条更平滑
  if (lastPoint) {
    const controlPoint = {
      x: (lastPoint.x + currentPoint.x) / 2,
      y: (lastPoint.y + currentPoint.y) / 2
    }
    eraseCurve(lastPoint, controlPoint, currentPoint)
  }
  
  lastPoint = currentPoint
  
  // 节流检查进度
  const now = Date.now()
  if (now - lastCheckTime > CHECK_INTERVAL) {
    lastCheckTime = now
    checkProgress()
  }
}

// 结束绘制
function stopDrawing(event) {
  if (!isDrawing.value) return
  isDrawing.value = false
  lastPoint = null
  
  // 最后检查一次进度
  checkProgress()
}

// 擦除点
function erase(x, y) {
  if (!ctx) return
  
  ctx.globalCompositeOperation = 'destination-out'
  
  // 使用径向渐变实现羽化边缘
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, props.brushSize)
  gradient.addColorStop(0, 'rgba(0, 0, 0, 1)')
  gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.8)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(x, y, props.brushSize, 0, Math.PI * 2)
  ctx.fill()
}

// 擦除曲线（更平滑）
function eraseCurve(start, control, end) {
  if (!ctx) return
  
  ctx.globalCompositeOperation = 'destination-out'
  
  ctx.beginPath()
  ctx.moveTo(start.x, start.y)
  ctx.quadraticCurveTo(control.x, control.y, end.x, end.y)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = props.brushSize
  
  // 添加阴影实现羽化
  ctx.shadowBlur = 20
  ctx.shadowColor = '#000'
  
  ctx.stroke()
  
  // 重置阴影
  ctx.shadowBlur = 0
}

// 检查清除进度
function checkProgress() {
  if (isComplete.value) return
  
  // 获取图像数据
  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
  const data = imageData.data
  
  let transparentPixels = 0
  let totalPixels = 0
  
  // 网格采样（每隔10个像素）
  const step = 10
  for (let y = 0; y < canvasHeight; y += step) {
    for (let x = 0; x < canvasWidth; x += step) {
      const index = (y * canvasWidth + x) * 4
      // 检查Alpha通道
      if (data[index + 3] < 128) {
        transparentPixels++
      }
      totalPixels++
    }
  }
  
  const progress = Math.round((transparentPixels / totalPixels) * 100)
  clearProgress.value = progress
  emit('progress', progress)
  
  // 检查是否达到阈值
  if (progress >= props.threshold) {
    isComplete.value = true
    completeAnimation()
  }
}

// 完成动画
function completeAnimation() {
  // 渐变消失效果
  const fadeOut = () => {
    const currentOpacity = parseFloat(canvas.style.opacity || 1)
    if (currentOpacity > 0) {
      canvas.style.opacity = currentOpacity - 0.1
      requestAnimationFrame(fadeOut)
    } else {
      canvas.style.display = 'none'
    }
  }
  
  requestAnimationFrame(fadeOut)
}

// 重置（用于重新开始）
function reset() {
  isComplete.value = false
  clearProgress.value = 0
  showHint.value = true
  canvas.style.display = 'block'
  canvas.style.opacity = 1
  fillMist()
}

// 暴露方法给父组件
defineExpose({
  reset
})
</script>

<template>
  <div ref="containerRef" class="mist-container">
    <!-- 引导提示 -->
    <Transition name="hint-fade">
      <div v-if="showHint && !isComplete" class="mist-hint">
        <div class="hint-content">
          <svg class="hint-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
          </svg>
          <span>滑动拨开迷雾</span>
          <span class="hint-arrow">→</span>
        </div>
      </div>
    </Transition>
    
    <!-- 进度指示 -->
    <Transition name="progress-fade">
      <div v-if="!isComplete && clearProgress > 0" class="mist-progress">
        {{ clearProgress }}%
      </div>
    </Transition>
    
    <!-- 迷雾Canvas -->
    <canvas
      ref="canvasRef"
      class="mist-canvas"
      :class="{ 'is-complete': isComplete }"
      @mousedown="startDrawing"
      @mousemove="drawing"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart.prevent="startDrawing"
      @touchmove.prevent="drawing"
      @touchend="stopDrawing"
      @touchcancel="stopDrawing"
    ></canvas>
  </div>
</template>

<style scoped>
.mist-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: auto;
}

.mist-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  transform-origin: center center;
}

.mist-canvas.is-complete {
  pointer-events: none;
}

/* 引导提示 */
.mist-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  pointer-events: none;
}

.hint-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 32px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Serif SC', serif;
  color: #575757;
  font-size: 18px;
  letter-spacing: 2px;
}

.hint-icon {
  width: 48px;
  height: 48px;
  color: #B91C1C;
  animation: hintPulse 2s ease-in-out infinite;
}

.hint-arrow {
  font-size: 24px;
  color: #B91C1C;
  animation: hintBounce 1s ease-in-out infinite;
}

@keyframes hintPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.95); }
}

@keyframes hintBounce {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(8px); }
}

/* 进度指示 */
.mist-progress {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 24px;
  background: rgba(185, 28, 28, 0.9);
  color: white;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 24px;
  border-radius: 24px;
  z-index: 101;
  pointer-events: none;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* 过渡动画 */
.hint-fade-enter-active,
.hint-fade-leave-active {
  transition: all 0.5s ease;
}

.hint-fade-enter-from,
.hint-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

.progress-fade-enter-active,
.progress-fade-leave-active {
  transition: all 0.3s ease;
}

.progress-fade-enter-from,
.progress-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
</style>
