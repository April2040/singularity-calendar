/**
 * API 配置常量
 */

// 阿里云ECS服务器地址（部署后修改为实际地址）
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// API端点
export const API_ENDPOINTS = {
  TODAY: '/api/today',
  HISTORY: '/api/history',
  WEEKLY: '/api/weekly',
  NEWS: '/api/news'
}

// 超时设置（毫秒）
export const API_TIMEOUT = 10000

// 重试次数
export const MAX_RETRIES = 2
