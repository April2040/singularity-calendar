/**
 * 日期工具函数
 */

/**
 * 格式化日期
 * @param {Date} date - 日期对象
 * @param {string} format - 格式字符串
 * @returns {string} 格式化后的日期字符串
 */
export function format(date, format) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  
  const map = {
    'yyyy': String(year).padStart(4, '0'),
    'yy': String(year).slice(-2),
    'MM': String(month).padStart(2, '0'),
    'M': String(month),
    'dd': String(day).padStart(2, '0'),
    'd': String(day),
    'HH': String(hours).padStart(2, '0'),
    'H': String(hours),
    'mm': String(minutes).padStart(2, '0'),
    'm': String(minutes),
    'ss': String(seconds).padStart(2, '0'),
    's': String(seconds)
  }
  
  return format.replace(/yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s/g, matched => map[matched])
}

/**
 * 获取农历日期
 * @param {Date} date - 日期对象
 * @returns {Object} 农历日期对象
 */
export function getLunarDate(date) {
  // 简化版农历计算
  // 实际项目中建议使用专门的农历库如 lunar-javascript
  
  const lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
  const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']
  
  // 这里使用简化算法，实际应用中需要更复杂的农历计算
  const baseDate = new Date(1900, 0, 1)  // 农历基准日期
  const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24))
  
  // 简化计算（仅作示例）
  const lunarYear = 1900 + Math.floor(diffDays / 365.2425)
  const dayOfYear = diffDays % 365
  const lunarMonthIndex = Math.floor(dayOfYear / 30) % 12
  const lunarDayIndex = dayOfYear % 30
  
  return {
    year: lunarYear,
    month: lunarMonths[lunarMonthIndex] || '正',
    day: lunarDays[lunarDayIndex] || '初一'
  }
}

/**
 * 判断是否为周末
 * @param {Date} date - 日期对象
 * @returns {boolean} 是否为周末
 */
export function isWeekend(date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

/**
 * 获取一年中的第几周
 * @param {Date} date - 日期对象
 * @returns {number} 周数（1-52）
 */
export function getWeekNumber(date) {
  const start = new Date(date.getFullYear(), 0, 1)
  const diff = date - start
  const oneWeek = 1000 * 60 * 60 * 24 * 7
  return Math.ceil(diff / oneWeek)
}

/**
 * 判断是否为同一天
 * @param {Date} date1 - 日期1
 * @param {Date} date2 - 日期2
 * @returns {boolean} 是否为同一天
 */
export function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
}
