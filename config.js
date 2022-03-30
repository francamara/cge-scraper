require('dotenv').config()

module.exports = {
  telegram: {
    token: process.env.telegram_token,
    chatId: process.env.telegram_chat_id,
  },
  cge: {
    user: process.env.cge_user,
    pwd: process.env.cge_password
  },
}
