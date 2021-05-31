document
  .querySelector('.sheet')
  .addEventListener('submit', (e) => {
    e.preventDefault()
    const elements = document.querySelectorAll('.required')
    const answer = {}
    let hasError = false
    for (const element of elements) {
      const input = element.querySelector('input[type=text]')
      const radios = element.querySelectorAll('input[type=radio]')
      let isValid = true
      if (input) {
        if (!input.value.trim().length) {
          isValid = false
        } else {
          answer[element.querySelector('.question').innerText] = input.value
        }
      }

      if (radios.length) {
        const radio = [...radios].some((radio) => radio.checked)
        if (!radio) {
          isValid = false
        } else {
          answer[element.querySelector('.question').innerText] = element.querySelectorAll('input[type=radio]:checked')[0].labels[0].innerText
        }
      }

      if (!isValid) {
        element.querySelector('.error-message').classList.remove('error-hidden')
        hasError = true
      } else {
        element.querySelector('.error-message').classList.add('error-hidden')
      }
    }

    if (!hasError) {
      alert(JSON.stringify(answer))
    }
  })
