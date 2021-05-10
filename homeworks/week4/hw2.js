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
  let body = ''

  res.on('data', (chunck) => {
    body += chunck
  })

  res.on('end', () => {
    const parsedData = JSON.parse(body)
    if (parsedData.length) {
      let bookInfo = ''
      for (let i = 0; i < parsedData.length; i++) {
        bookInfo = Object.values(parsedData[i])
        console.log(`${bookInfo[0]} ${bookInfo[1]}`)
      }
    } else {
      console.log(`${parsedData.id} ${parsedData.name}`)
    }
  })
})

req.on('error', (error) => {
  console.error(error)
})

if (options.method === 'POST' || options.method === 'PATCH') {
  req.write(data)
}

req.end()
