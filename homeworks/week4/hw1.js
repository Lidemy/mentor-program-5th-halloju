const https = require('https')

const options = {
  hostname: 'lidemy-book-store.herokuapp.com',
  path: '/books?_limit=10',
  method: 'GET'
}

const req = https.request(options, (res) => {
  if (res.statusCode >= 200 && res.statusCode < 300) {
    let data = ''

    res.on('data', (chunck) => {
      data += chunck
    })

    res.on('end', () => {
      let bookInfo
      try {
        bookInfo = JSON.parse(data)
      } catch (err) {
        console.log(err)
        return
      }
      for (let i = 0; i < bookInfo.length; i++) {
        console.log(`${bookInfo[i].id} ${bookInfo[i].name}`)
      }
    })
  }
})

req.on('error', (error) => {
  console.error(error)
})

req.end()
