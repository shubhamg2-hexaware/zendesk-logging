require('dotenv').config()

exports.auth = {
  username: process.env.ZENDESK_USER_NAME,
  token: process.env.ZENDESK_TOKEN,
  remoteUri: process.env.ZENDESK_REMOTE_URI
};