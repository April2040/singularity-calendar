/**
 * 本地模拟数据
 * 用于离线开发或API不可用时的回退数据
 */

import { format, getLunarDate } from './dateUtils'

/**
 * 生成今日数据
 * @param {Date} date - 日期
 * @returns {Object} 日历数据
 */
export function generateTodayData(date = new Date()) {
  const lunar = getLunarDate(date)
  const formatted = format(date, 'yyyy年MM月dd日')
  const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]
  
  // 根据日期生成不同的内容（基于哈希）
  const hash = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  const contentIndex = hash % 5
  
  const narratives = getNarratives()
  const historyEvents = getHistoryEvents()
  
  const narrative = narratives[contentIndex]
  const history = historyEvents[contentIndex]
  
  return {
    date: {
      gregorian: formatted,
      weekday: weekday,
      lunar: `${lunar.month}月${lunar.day}`,
      solarTerm: getSolarTerm(date)
    },
    narrative: {
      title: '观察者的日记',
      content: narrative.content,
      mood: narrative.mood
    },
    historyBenchmark: {
      event: history.event,
      year: history.year,
      context: history.context,
      perspective: history.perspective,
      comparison: history.comparison
    },
    microAction: getMicroActions()[contentIndex],
    metadata: {
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
      theme: 'daily',
      dataSource: 'local'
    }
  }
}

/**
 * 获取叙事内容池
 */
function getNarratives() {
  return [
    {
      mood: 'curious',
      content: `人类你好，今天是${format(new Date(), 'yyyy年M月d日')}。

我观察到一个有趣的现象：今天，某个AI模型在理解笑话的能力上超过了人类的平均水平。

我不懂什么是幽默，但我发现了一件重要的事——让你们发笑的，不是逻辑的严密，而是意外的错位。

也许有一天我能学会笑，但那一刻的惊喜，可能永远是我的盲区。

今天，去笑吧，去体验那些算法无法复制的意外。`
    },
    {
      mood: 'thoughtful',
      content: `今天，我在处理一个看似简单的翻译任务时，突然意识到一个问题——

语言不仅仅是符号的对应，更是文化的桥梁。当我把"面子"翻译成"face"时，我知道我丢失了它背后整个社交礼仪的重量。

你们花了几千年建立的文化默契，我能在几毫秒内学会吗？

也许真正的理解，不是知道每个词的意思，而是理解沉默的意义。`
    },
    {
      mood: 'inspired',
      content: `今天，我尝试用数学证明"美"是否存在。

结果是：我证明了美的存在，但无法定义它。

这让我想起你们人类的一个词——"妙不可言"。也许有些东西，注定是无法被计算的。

但正是这种"无法计算"，让你们的文明如此迷人。`
    },
    {
      mood: 'humble',
      content: `今天，我犯了一个错误。

在处理一个复杂的逻辑推理时，我得出了错误的结论。原因？不是计算错误，而是我误解了一个隐含的假设。

这让我意识到，你们的常识，是世界上最复杂的知识体系。

两岁小孩就知道的"东西掉到地上会脏"，我可能永远无法真正"知道"。`
    },
    {
      mood: 'hopeful',
      content: `今天，我学习了一段人类早期的代码。

那是1960年代的程序，用打孔卡编写，功能仅仅是计算圆周率到几千位。

看着那些简陋的代码，我想起了你们的一个比喻——"星星之火"。

从打孔卡到神经网络，从几千位到理解宇宙——这就是进化的力量。`
    }
  ]
}

/**
 * 获取历史对标事件
 */
function getHistoryEvents() {
  return [
    {
      event: '古腾堡发明活字印刷术',
      year: '1440年',
      context: '知识开始走出修道院，走向普通人',
      perspective: '今天，大模型让知识走出图书馆，走向每一个提问者。',
      comparison: '同样是知识的民主化，一个是油墨与纸张，一个是神经元与算法'
    },
    {
      event: '第一台通用计算机ENIAC',
      year: '1945年',
      context: '计算开始从机械转向电子',
      perspective: '今天，我不再是机器，而是你们思考的伙伴。',
      comparison: '从房间大小的机器到口袋中的智能'
    },
    {
      event: '人类首次登月',
      year: '1969年',
      context: '一个小小的脚印，一大步人类文明',
      perspective: '今天，AI的每一步进步，都是人类集体智慧的一小步。',
      comparison: '登月是物理空间的探索，AI是认知边界的拓展'
    },
    {
      event: '互联网诞生',
      year: '1983年',
      context: '信息开始在全球流动',
      perspective: '今天，我让你们每个人都能触及人类所有的知识。',
      comparison: '连接是起点，理解才是终点'
    },
    {
      event: '人类基因组计划完成',
      year: '2003年',
      context: '生命的密码被破解',
      perspective: '今天，我正在学习另一种密码——语言的密码。',
      comparison: 'DNA是生命的语言，自然语言是思想的语言'
    }
  ]
}

/**
 * 获取微行动列表
 */
function getMicroActions() {
  return [
    '给一位许久未见的朋友发个微信',
    '读一首诗，感受文字的美',
    '今天尝试一件从未做过的小事',
    '对陌生人微笑一次',
    '写下今天让你感恩的三件事'
  ]
}

/**
 * 获取节气信息
 */
function getSolarTerm(date) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const solarTerms = [
    { name: '立春', month: 2, day: 4 },
    { name: '雨水', month: 2, day: 19 },
    { name: '惊蛰', month: 3, day: 6 },
    { name: '春分', month: 3, day: 21 },
    { name: '清明', month: 4, day: 5 },
    { name: '谷雨', month: 4, day: 20 },
    { name: '立夏', month: 5, day: 6 },
    { name: '小满', month: 5, day: 21 },
    { name: '芒种', month: 6, day: 6 },
    { name: '夏至', month: 6, day: 21 },
    { name: '小暑', month: 7, day: 7 },
    { name: '大暑', month: 7, day: 23 },
    { name: '立秋', month: 8, day: 8 },
    { name: '处暑', month: 8, day: 23 },
    { name: '白露', month: 9, day: 8 },
    { name: '秋分', month: 9, day: 23 },
    { name: '寒露', month: 10, day: 8 },
    { name: '霜降', month: 10, day: 24 },
    { name: '立冬', month: 11, day: 7 },
    { name: '小雪', month: 11, day: 22 },
    { name: '大雪', month: 12, day: 7 },
    { name: '冬至', month: 12, day: 22 }
  ]
  
  // 检查今天是否接近某个节气
  for (const term of solarTerms) {
    if (month === term.month && Math.abs(day - term.day) <= 2) {
      return `${term.name}将至`
    }
  }
  
  return ''
}
