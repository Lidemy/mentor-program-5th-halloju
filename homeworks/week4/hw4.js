const https = require('https')

const options = {
  hostname: 'api.twitch.tv',
  path: '/kraken/games/top',
  port: 443,
  method: 'GET',
  headers: {
    'Client-ID': '7kmqu65fptrsg7qz50ztd17ip80ue3',
    Accept: 'application/vnd.twitchtv.v5+json'
  }
}

const req = https.request(options, (res) => {
  let data = ''

  res.on('data', (chunck) => {
    data += chunck
  })

  res.on('end', () => {
    const parsedData = JSON.parse(data)
    for (let i = 0; i < parsedData.top.length; i++) {
      console.log(`${parsedData.top[i].viewers} ${parsedData.top[i].game.name}`)
    }
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.end()
