const axios = require('axios')
const puppeteer = require('puppeteer')

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
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  const cge = await page.goto(pageUrl)
  const isAvailable = await page.$eval(selector, element => element.textContent)
  if (isAvailable == 'fecha por confirmar') {
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${telegramChatId}&text=${message}`
    axios.post(url, {}).then(console.log('HAY TURNOS'))
  }
}

scrape()

setInterval(() => {
  scrape()
}, 60000)
