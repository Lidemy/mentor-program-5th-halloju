const https = require('https')
const process = require('process')

const options = {
  hostname: 'api.twitch.tv',
  path: `/kraken/streams/?game=${process.argv[2]}`,
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
    const streamData = {}
    const sortable = []
    for (let i = 0; i < parsedData.streams.length; i++) {
      streamData[parsedData.streams[i].channel._id] = parsedData.streams[i].channel.name
      sortable.push([parsedData.streams[i].channel._id, parsedData.streams[i].viewers])
    }
    sortable.sort((a, b) => b[1] - a[1])
    for (let j = 0; j < Math.min(200, sortable.length); j++) {
      console.log(`${sortable[j][0]} ${streamData[sortable[j][0]]}`)
    }
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.end()
