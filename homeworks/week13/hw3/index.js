const topStreamings = document.querySelector('.top-streamings')
const twitchHeader = new Headers({
  'Content-Type': 'application/json',
  'Client-ID': '7kmqu65fptrsg7qz50ztd17ip80ue3',
  Accept: 'application/vnd.twitchtv.v5+json'
})

function addCard(json) {
  if (json.status <= 200 || json.status >= 400) {
    console.log(json.message)
    return []
  }
  const xhrJSON = json.streams
  const cardList = []
  for (let i = 0; i < 20; i++) {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `<a href="${xhrJSON[i].channel.url}" target="_blank">
    <div class="thumbnail"><img src="${xhrJSON[i].preview.large}"/></div>
    <div class="channel-info">
      <div class="logo"><img src="${xhrJSON[i].channel.logo}"/></div>
      <div class="info">
        <div class="streaming-name">${xhrJSON[i].channel.status}</div>
        <div class="channel-name">${xhrJSON[i].channel.display_name}</div>
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

function listTop20Games(cards, nameOfGame) {
  if (cards.length === 0) {
    console.log('No streamings')
    return
  }

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
}

async function getStreams(nameOfGame) {
  const response = await fetch(`https://api.twitch.tv/kraken/streams/?game=${nameOfGame}&limit=20`, {
    headers: twitchHeader
  })
  const data = await response.json()
  return data
}

function appendNavbarGames(json) {
  if (json.status <= 200 || json.status >= 400) {
    console.log(json.message)
    return
  }
  const games = json.top
  for (const game of games) {
    const li = document.createElement('li')
    li.innerHTML = `<a href="#">${game.game.name}</a>`
    document.querySelector('.navbar-list').appendChild(li)
  }
}

async function appendGameCards(nameOfGame) {
  const data = await getStreams(nameOfGame)
  const cards = addCard(data)
  listTop20Games(cards, nameOfGame)
}

async function main() {
  try {
    const response = await fetch('https://api.twitch.tv/kraken/games/top?limit=5', {
      headers: twitchHeader
    })
    const json = await response.json()
    const NameOfTopGame = json.top[0].game.name
    appendNavbarGames(json)
    appendGameCards(NameOfTopGame)
  } catch (err) {
    console.log(err)
  }
}

document
  .querySelector('.navbar')
  .addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') {
      appendGameCards(e.target.innerText)
      removeAllChildNodes(topStreamings)
    }
  })

document.addEventListener('mousemove', (e) => {
  document.querySelector('.cursor').style.left = `${e.pageX}px`
  document.querySelector('.cursor').style.top = `${e.pageY}px`
})

main()
