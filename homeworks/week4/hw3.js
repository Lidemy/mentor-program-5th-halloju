const https = require('https')
const process = require('process')

const options = {
  hostname: 'restcountries.eu',
  path: `/rest/v2/name/${process.argv[2]}`,
  port: 443,
  method: 'GET'
}

const req = https.request(options, (res) => {
  let data = ''

  res.on('data', (chunck) => {
    data += chunck
  })

  res.on('end', () => {
    const parsedData = JSON.parse(data)
    if (parsedData.status === 404) {
      console.log('找不到國家資訊')
    }
    for (let i = 0; i < parsedData.length; i++) {
      console.log(' ============')
      console.log(`國家：${parsedData[i].name}`)
      console.log(`首都：${parsedData[i].capital}`)
      console.log(`貨幣：${parsedData[i].currencies[0].code}`)
      console.log(`國碼：${parsedData[i].callingCodes[0]}`)
    }
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.end()
