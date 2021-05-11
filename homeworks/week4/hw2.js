const https = require('https')
const process = require('process')

function parseArgs(args) {
  const options = {
    hostname: 'lidemy-book-store.herokuapp.com',
    method: '',
    path: '/books'
  }
  let data = ''
  if (args[2] === 'list') {
    options.method = 'GET'
    options.path = '/books/?_limit=20'
  } else if (args[2] === 'read') {
    options.method = 'GET'
    options.path = `/books/${args[3]}`
  } else if (args[2] === 'delete') {
    options.method = 'DELETE'
    options.path = `/books/${args[3]}`
  } else if (args[2] === 'create') {
    data = JSON.stringify({
      name: args[3]
    })
    options.method = 'POST'
    options.headers = {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  } else if (args[2] === 'update') {
    data = JSON.stringify({
      name: args[4]
    })
    options.method = 'PATCH'
    options.path = `/books/${args[3]}`
    options.headers = {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  return {
    options,
    data
  }
}

const { options, data } = parseArgs(process.argv)
const req = https.request(options, (res) => {
  if (res.statusCode >= 200 && res.statusCode < 300) {
    let body = ''

    res.on('data', (chunck) => {
      body += chunck
    })

    res.on('end', () => {
      let bookInfo = ''
      try {
        bookInfo = JSON.parse(body)
      } catch (err) {
        console.log(err)
        return
      }
      if (bookInfo.length) {
        for (let i = 0; i < bookInfo.length; i++) {
          console.log(`${bookInfo[i].id} ${bookInfo[i].name}`)
        }
      } else {
        console.log(`${bookInfo.id} ${bookInfo.name}`)
      }
    })
  }
})

req.on('error', (error) => {
  console.error(error)
})

if (options.method === 'POST' || options.method === 'PATCH') {
  req.write(data)
}

req.end()
