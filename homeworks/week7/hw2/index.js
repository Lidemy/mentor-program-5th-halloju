document
  .querySelector('.qa-block')
  .addEventListener('click', (e) => {
    e.target.closest('.qa-item').classList.toggle('content-hide')
  })
