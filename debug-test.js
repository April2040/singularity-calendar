import { chromium } from 'playwright'

async function debugPage() {
  console.log('开始调试页面...\n')
  
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()
  
  // 收集所有控制台消息
  const consoleMessages = []
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    })
  })
  
  // 收集页面错误
  const pageErrors = []
  page.on('pageerror', error => {
    pageErrors.push(error.message)
  })
  
  // 收集网络请求失败
  const failedRequests = []
  page.on('requestfailed', request => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()
    })
  })
  
  try {
    // 访问部署的页面
    console.log('访问: https://april2040.github.io/singularity-calendar/')
    const response = await page.goto('https://april2040.github.io/singularity-calendar/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })
    
    console.log(`\n响应状态: ${response.status()}`)
    console.log(`响应URL: ${response.url()}`)
    
    // 检查页面标题
    const title = await page.title()
    console.log(`页面标题: ${title}`)
    
    // 检查页面HTML内容
    const html = await page.content()
    console.log(`\nHTML长度: ${html.length} 字符`)
    
    // 检查#app元素
    const appElement = await page.$('#app')
    if (appElement) {
      const appHTML = await appElement.innerHTML()
      console.log(`#app内容长度: ${appHTML.length} 字符`)
      console.log(`#app内容预览: ${appHTML.substring(0, 500)}...`)
    } else {
      console.log('❌ 未找到 #app 元素')
    }
    
    // 分析控制台错误
    console.log('\n--- 控制台消息 ---')
    const errors = consoleMessages.filter(m => m.type === 'error')
    if (errors.length > 0) {
      console.log(`发现 ${errors.length} 个控制台错误:`)
      errors.forEach((e, i) => {
        console.log(`\n错误 ${i+1}:`)
        console.log(`  消息: ${e.text}`)
        if (e.location) {
          console.log(`  位置: ${JSON.stringify(e.location)}`)
        }
      })
    } else {
      console.log('✅ 无控制台错误')
    }
    
    // 分析网络请求失败
    console.log('\n--- 网络请求 ---')
    if (failedRequests.length > 0) {
      console.log(`发现 ${failedRequests.length} 个失败的请求:`)
      failedRequests.forEach((r, i) => {
        console.log(`\n请求 ${i+1}:`)
        console.log(`  URL: ${r.url}`)
        console.log(`  失败原因: ${r.failure}`)
      })
    } else {
      console.log('✅ 无失败的请求')
    }
    
    // 分析页面错误
    console.log('\n--- 页面错误 ---')
    if (pageErrors.length > 0) {
      console.log(`发现 ${pageErrors.length} 个页面错误:`)
      pageErrors.forEach((e, i) => {
        console.log(`  错误 ${i+1}: ${e}`)
      })
    } else {
      console.log('✅ 无页面错误')
    }
    
  } catch (error) {
    console.error('测试失败:', error.message)
  } finally {
    await browser.close()
  }
}

debugPage()
