const request = new XMLHttpRequest()
const topStreamings = document.querySelector('.top-streamings')

function addCard(json) {
  const cardList = []
  for (let i = 0; i < 20; i++) {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `<a href="${json[i].channel.url}" target="_blank">
    <div class="thumbnail"><img src="${json[i].preview.large}"/></div>
    <div class="channel-info">
      <div class="logo"><img src="${json[i].channel.logo}"/></div>
      <div class="info">
        <div class="streaming-name">${json[i].channel.status}</div>
        <div class="channel-name">${json[i].channel.display_name}</div>
      </div>
    </div>`

    cardList.push(div)
  }

  return cardList
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

function getStreams(nameOfGame, cb) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `https://api.twitch.tv/kraken/streams/?game=${nameOfGame}&limit=20`, true)
  xhr.setRequestHeader('Client-ID', '7kmqu65fptrsg7qz50ztd17ip80ue3')
  xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  xhr.send()

  xhr.onload = function() {
    if (xhr.status >= 200 && request.status < 400) {
      try {
        const xhrJSON = JSON.parse(xhr.responseText).streams
        const cards = addCard(xhrJSON)
        cb(null, cards, nameOfGame)
      } catch (err) {
        cb('error')
      }
    } else {
      cb('error')
    }
  }
}

function listTop20Games(err, cards, nameOfGame) {
  if (!err) {
    const div = document.createElement('div')
    div.classList.add('name-of-the-game')
    div.innerText = nameOfGame
    topStreamings.appendChild(div)

    const div2 = document.createElement('div')
    div2.classList.add('subtitle')
    div2.innerText = 'Top 20 popular live streamings sorted by current viewers'
    topStreamings.appendChild(div2)

    for (const card of cards) {
      topStreamings.appendChild(card)
    }
  } else {
    alert('error')
  }
}

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    const games = JSON.parse(request.responseText).top
    for (const game of games) {
      const li = document.createElement('li')
      li.innerHTML = `<a href="#">${game.game.name}</a>`
      document.querySelector('.navbar-list').appendChild(li)
    }
    getStreams(games[0].game.name, listTop20Games)
  }
}

request.onerror = function() {
  alert('error')
}

request.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true)
request.setRequestHeader('Client-ID', '7kmqu65fptrsg7qz50ztd17ip80ue3')
request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
request.send()

document
  .querySelector('.navbar')
  .addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') {
      getStreams(e.target.innerText, listTop20Games)
      removeAllChildNodes(topStreamings)
    }
  })

document.addEventListener('mousemove', (e) => {
  document.querySelector('.cursor').style.left = `${e.pageX}px`
  document.querySelector('.cursor').style.top = `${e.pageY}px`
})
