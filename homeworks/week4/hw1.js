const https = require('https')
const process = require('process')

const options = {
  hostname: 'lidemy-book-store.herokuapp.com',
  path: `/books?_limit=${process.argv[2]}`,
  method: 'GET'
}

const req = https.request(options, (res) => {
  let data = ''

  res.on('data', (chunck) => {
    data += chunck
  })

  res.on('end', () => {
    const parsedData = JSON.parse(data)
    let bookInfo = ''
    for (let i = 0; i < parsedData.length; i++) {
      bookInfo = Object.values(parsedData[i])
      console.log(`${bookInfo[0]} ${bookInfo[1]}`)
    }
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.end()
