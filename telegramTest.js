const axios = require('axios')
const colors = require('colors')

const config = require('./config')

const message = `SHIT%20IS%20AVAILABLE%2C%20RUN%20MOTHERFUCKER%0AUSER%3A%20${config.cge.user}%0APASS%3A%20${config.cge.pwd}`

async function test() {
  const url = `https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chatId}&text=${message}`
  await axios.post(url, {})
}
console.log('Check telegram'.cyan)
test()
