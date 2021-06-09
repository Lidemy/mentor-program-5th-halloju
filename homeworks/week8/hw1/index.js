const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errorMessage = '系統不穩定，請再試一次'

function jackpot(cb) {
  const request = new XMLHttpRequest()
  request.open('GET', apiUrl, true)
  request.send()
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      try {
        const json = JSON.parse(request.responseText)
        const { prize } = json
        cb(null, prize)
      } catch (err) {
        cb(errorMessage)
      }
    } else {
      cb(errorMessage)
    }
  }
  request.onerror = function() {
    cb(errorMessage)
  }
}

document
  .querySelector('.lottery-section')
  .addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'input') {
      jackpot((err, prize) => {
        if (!err) {
          document.querySelector(`.${prize}`).classList.remove('hide')
        } else {
          alert(errorMessage)
        }
      })
      e.target.closest('section').classList.add('hide')
    }
  })
