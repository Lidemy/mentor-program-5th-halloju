const newItem = document.querySelector('.add-section')
newItem.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (!newItem.value) return
    const section = document.createElement('div')
    section.classList.add('todo-section')
    section.innerHTML =
    `
        <button class="checkbox"></button>
        <div class="checked">${escapeHTML(newItem.value)}</div>
        <button class="deletebox">X</button>
    `
    newItem.after(section)
    newItem.value = ''
  }
})

document
  .querySelector('.form')
  .addEventListener('click', (e) => {
    if (e.target.classList.contains('checkbox')) {
      e.target.parentNode.classList.toggle('finished')
    }

    if (e.target.classList.contains('deletebox')) {
      e.target.parentNode.remove()
    }
  })

const escapeHTML = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  )
