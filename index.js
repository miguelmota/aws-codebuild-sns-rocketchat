var request = require('request')

exports.handler = function(event, context) {
  console.log(JSON.stringify(event, null, 2))
  console.log('From SNS:', event.Records[0].Sns.Message)

  const ROCKET_CHAT_BASE_URL = process.env.ROCKET_CHAT_BASE_URL
  const ROCKET_CHAT_USERNAME = process.env.ROCKET_CHAT_USERNAME
  const ROCKET_CHAT_PASSWORD = process.env.ROCKET_CHAT_PASSWORD
  const ROCKET_CHAT_CHANNEL = process.env.ROCKET_CHAT_CHANNEL

  request({
    url: ROCKET_CHAT_BASE_URL + '/api/v1/login',
    method: 'POST',
    form: {
      username: ROCKET_CHAT_USERNAME,
      password: ROCKET_CHAT_PASSWORD
    },
    json: true
  }, function(error, response, body) {
    if (error) {
      console.error(error)
      context.done(null)
      return
    }

    const authToken = body.data.authToken
    const userId = body.data.userId

    postMessage(authToken, userId)
  })

  const postMessage = function(authToken, userId) {
    request({
      url: ROCKET_CHAT_BASE_URL + '/api/v1/chat.postMessage',
      method: 'POST',
      headers: {
        'X-Auth-Token': authToken,
        'X-User-ID': userId
      },
      form: {
        channel: ROCKET_CHAT_CHANNEL,
        text: event.Records[0].Sns.Message
      }
    }, function(error, response, body) {
      if (error) {
        console.error(error)
        context.done(null)
        return
      }

      console.log(body)
      context.done(null)
    })
  }
}