const axios = require('axios')
const puppeteer = require('puppeteer')
const colors = require('colors')

require('dotenv').config()

// Telegram config
const telegramToken = process.env.telegram_token
const telegramChatId = process.env.telegram_chat_id
const cgeUser = process.env.cge_user
const cgePassword = process.env.cge_password
const message = `SHIT%20IS%20AVAILABLE%2C%20RUN%20MOTHERFUCKER%0AUSER%3A%20${cgeUser}%0APASS%3A%20${cgePassword}`

// Puppeteer config
const pageUrl = process.env.page_url
const selector = '#contenido > div > div > div > table > tbody > tr:nth-child(11) > td:nth-child(3)'

// Main function
async function scrape() {
  // launch browser and page
  let browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1000,
      height: 400
    }
  })
  let page = await browser.newPage()
  let cge = await page.goto(pageUrl)

  // evaluate page
  let isAvailable = await page.$eval(selector, element => element.textContent)

  // error handling
  page.on("pageerror", async function (err) {
    theTempValue = err.toString();
    console.log("Page error: " + theTempValue);
    // clear from memory
    await page.removeAllListeners()
    await browser.close();
    return
  })

  // if true, then notify user
  if (isAvailable !== 'fecha por confirmar') {
    let url = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${telegramChatId}&text=${message}`
    axios.post(url, {}).then(console.log('HAY TURNOS'.green))
    // clear memory
    await page.removeAllListeners()
    await browser.close();
    return true
  }


  if (isAvailable == 'fecha por confirmar') {
    console.log('SIN TURNOS TODAVIA'.red)

    // clear memory
    await page.removeAllListeners()
    await browser.close();

    // temporal memory log so I can check how much is being used
    const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`

    const memoryData = process.memoryUsage()

    const memoryUsage = {
      rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
      heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
      heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
      external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
    }

    console.log(memoryUsage)


    return false
  }

}

scrape()

setInterval(() => {
  scrape()
}, 1000 * 30)
