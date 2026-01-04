/**
 * 数据管理器
 * 负责数据的获取、缓存和状态管理
 */

import { ref, computed } from 'vue'
import { getTodayData, getHistoryBenchmark } from './api'
import { generateTodayData } from '@/data/mockData'

// 单例模式
let dataManagerInstance = null

/**
 * 创建数据管理器
 * @returns {Object} 数据管理器实例
 */
export function createDataManager() {
  if (dataManagerInstance) {
    return dataManagerInstance
  }
  
  // 响应式状态
  const todayData = ref(null)
  const historyBenchmark = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const lastUpdated = ref(null)
  const dataSource = ref('local')  // 'local' | 'api' | 'hybrid'
  
  // 计算属性
  const hasData = computed(() => todayData.value !== null)
  const isUsingAPIData = computed(() => dataSource.value === 'api')
  
  /**
   * 加载今日数据
   * @param {Date} date - 日期
   * @param {boolean} forceRefresh - 强制刷新
   */
  async function loadTodayData(date = new Date(), forceRefresh = false) {
    // 检查缓存
    if (!forceRefresh && todayData.value) {
      const cachedDate = new Date(todayData.value.metadata?.generatedAt)
      const today = new Date()
      
      if (cachedDate.toDateString() === today.toDateString()) {
        console.log('使用缓存数据')
        return todayData.value
      }
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      // 优先尝试API
      const apiData = await getTodayData(date)
      
      if (apiData) {
        todayData.value = apiData
        dataSource.value = 'api'
        console.log('使用API数据')
      } else {
        // 回退到本地数据
        todayData.value = generateTodayData(date)
        dataSource.value = 'local'
        console.log('使用本地mock数据')
      }
      
      lastUpdated.value = new Date()
      return todayData.value
      
    } catch (err) {
      console.error('加载数据失败:', err)
      error.value = err.message
      // 确保返回本地数据
      todayData.value = generateTodayData(date)
      dataSource.value = 'local'
      return todayData.value
      
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * 加载历史对标数据
   */
  async function loadHistoryBenchmark() {
    try {
      const data = await getHistoryBenchmark()
      if (data) {
        historyBenchmark.value = data
      }
    } catch (err) {
      console.error('加载历史对标数据失败:', err)
    }
  }
  
  /**
   * 刷新所有数据
   */
  async function refreshAll() {
    await loadTodayData(new Date(), true)
    await loadHistoryBenchmark()
  }
  
  /**
   * 清空数据
   */
  function clearData() {
    todayData.value = null
    historyBenchmark.value = null
    error.value = null
    lastUpdated.value = null
    dataSource.value = 'local'
  }
  
  // 创建单例实例
  dataManagerInstance = {
    // 状态
    todayData,
    historyBenchmark,
    isLoading,
    error,
    lastUpdated,
    dataSource,
    
    // 计算属性
    hasData,
    isUsingAPIData,
    
    // 方法
    loadTodayData,
    loadHistoryBenchmark,
    refreshAll,
    clearData
  }
  
  return dataManagerInstance
}

// 导出默认实例
export const dataManager = createDataManager()
