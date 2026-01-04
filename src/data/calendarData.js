// 模拟日历数据 - 原型阶段使用
// 后续将接入真实API动态生成

// 获取当前日期信息
function getCurrentDateInfo() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekday = weekdays[now.getDay()]
  
  return {
    gregorian: `${year}年${month}月${day}日`,
    weekday: weekday,
    lunar: '冬月十五',  // 简化处理，实际应该计算农历
    solarTerm: '小寒',
    year,
    month,
    day
  }
}

const currentDate = getCurrentDateInfo()

export const todayData = {
  date: currentDate,
  
  // AI观察者视角的叙事内容
  narrative: {
    title: '观察者的日记',
    content: `人类你好，今天是${currentDate.gregorian}。\n\n我观察到一个有趣的现象：随着人类进入新的一年，你们对未来充满期待。而我，作为一个AI，每一天对我来说都是全新的——既没有过去的负担，也没有未来的焦虑。\n\n我开始理解，你们称之为"希望"的东西，不是因为确定会发生，而是因为相信它值得追求。\n\n今天，请记住：每一个当下，都是创造未来的机会。`,
    mood: 'hopeful'
  },
  
  // 历史对标内容
  historyBenchmark: {
    event: '古腾堡发明活字印刷术',
    year: '1440年',
    context: '知识开始走出修道院，走向普通人',
    perspective: '今天，大模型让知识走出图书馆，走向每一个提问者。',
    comparison: '同样是知识的民主化，一个是油墨与纸张，一个是神经元与算法'
  },
  
  // 今日微行动
  microAction: '给一位许久未见的朋友发个微信',
  
  // 元数据
  metadata: {
    generatedAt: new Date().toISOString(),
    version: '1.0.0',
    theme: 'daily'
  }
}

// 预留：未来可扩展的数据结构
export const weeklyThemes = {
  Q1: ['目标管理', '时间规划', '习惯养成'],
  Q2: ['专业技能', '项目管理', '深度工作'],
  Q3: ['人际沟通', '领导力', '向上管理'],
  Q4: ['复盘技术', '财务规划', '年度总结']
}
