require('now-env')

const router = require('router')
const server = require('connect')()
const bodyParser = require('body-parser')
const Twilio = require('twilio')

const serverRouter = router()
server.use(bodyParser.json({type: 'application/*'}))

const landing = require('./landing.js')

const { PORT } = process.env

serverRouter.post('/api/text', (req, res) => {
  const textInfo = req.body

  const twilioAPI = Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  twilioAPI.messages.create({
    to: `+1${textInfo.phone}`,
    from: process.env.NUMBER,
    body: `${textInfo.name} get me a beer fam`
  })
    .then((message) => {
      console.log(message.sid)
      res.write(JSON.stringify({
        error: false,
        data: textInfo
      }))
      res.end()
    })
})

serverRouter.get('*', (req, res) => {
  res.write(landing)
  res.end()
})

server.use(serverRouter)

server.listen(PORT || 5001, () => {
  console.log(`internet baby running on ${PORT || 5001}`)
})
