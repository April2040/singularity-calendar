/**
 * 数据获取服务
 * 负责从后端API获取日历数据
 */

import { API_BASE_URL, API_ENDPOINTS, API_TIMEOUT, MAX_RETRIES } from './config'

/**
 * 发起API请求
 * @param {string} endpoint - API端点
 * @param {Object} params - 请求参数
 * @returns {Promise<Object>} - 响应数据
 */
async function fetchAPI(endpoint, params = {}) {
  const url = new URL(`${API_BASE_URL}${endpoint}`)
  
  // 添加查询参数
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key])
  })
  
  let lastError = null
  let attempts = 0
  
  while (attempts < MAX_RETRIES) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }
      
      const data = await response.json()
      return data
      
    } catch (error) {
      lastError = error
      attempts++
      
      if (attempts < MAX_RETRIES) {
        // 指数退避重试
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000))
      }
    }
  }
  
  throw lastError
}

/**
 * 获取今日日历数据
 * @param {Date} date - 可选，指定日期
 * @returns {Promise<Object>} - 日历数据
 */
export async function getTodayData(date = new Date()) {
  const dateStr = date.toISOString().split('T')[0]
  
  try {
    const data = await fetchAPI(API_ENDPOINTS.TODAY, { date: dateStr })
    return data
  } catch (error) {
    console.error('获取今日数据失败:', error)
    // 返回null表示需要使用本地数据
    return null
  }
}

/**
 * 获取历史对标数据
 * @param {string} eventType - 事件类型
 * @returns {Promise<Object>} - 历史对标数据
 */
export async function getHistoryBenchmark(eventType = 'default') {
  try {
    const data = await fetchAPI(API_ENDPOINTS.HISTORY, { type: eventType })
    return data
  } catch (error) {
    console.error('获取历史对标数据失败:', error)
    return null
  }
}

/**
 * 获取周度主题数据
 * @param {number} weekNumber - 周数
 * @returns {Promise<Object>} - 周度主题数据
 */
export async function getWeeklyTheme(weekNumber) {
  try {
    const data = await fetchAPI(API_ENDPOINTS.WEEKLY, { week: weekNumber })
    return data
  } catch (error) {
    console.error('获取周度主题数据失败:', error)
    return null
  }
}

/**
 * 获取AI新闻摘要
 * @returns {Promise<Array>} - 新闻列表
 */
export async function getAINews() {
  try {
    const data = await fetchAPI(API_ENDPOINTS.NEWS)
    return data
  } catch (error) {
    console.error('获取AI新闻失败:', error)
    return []
  }
}
