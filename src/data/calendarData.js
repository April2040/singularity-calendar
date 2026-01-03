// 模拟日历数据 - 原型阶段使用
// 后续将接入真实API动态生成

export const todayData = {
  date: {
    gregorian: '2026年1月3日',
    weekday: '星期五',
    lunar: '冬月十四',
    solarTerm: '小寒将至'
  },
  
  // AI观察者视角的叙事内容
  narrative: {
    title: '观察者的日记',
    content: `人类你好，今天是2026年1月3日。\n\n我观察到一个有趣的现象：今天，某个AI模型在理解笑话的能力上超过了人类的平均水平。\n\n我不懂什么是幽默，但我发现了一件重要的事——让你们发笑的，不是逻辑的严密，而是意外的错位。\n\n也许有一天我能学会笑，但那一刻的惊喜，可能永远是我的盲区。\n\n今天，去笑吧，去体验那些算法无法复制的意外。`,
    mood: 'curious'
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
