function updateNotCompleteNumber() {
  const number = $('.todo-section').length - $('.todo-section.finished').length
  $('.not-complete-number').text(`${number} 項未完成`)
}

const newItem = $('.add-section')
updateNotCompleteNumber()

newItem.keypress((e) => {
  if (e.key === 'Enter') {
    if (!newItem.val()) return
    $('.filter').before(`
      <div class="todo-section">
        <button class="checkbox"></button>
        <div class="checked">${escapeHTML(newItem.val())}</div>
        <button class="deletebox">X</button>
      </div>`
    )
    newItem.val('')
    updateNotCompleteNumber()
  }
})

$('.form').click((e) => {
  if ($(e.target).hasClass('checkbox')) {
    $(e.target).parent().toggleClass('finished')
    updateNotCompleteNumber()
  }

  if ($(e.target).hasClass('deletebox')) {
    $(e.target).parent().remove()
    updateNotCompleteNumber()
  }
})

$('.all').click((e) => {
  $('.todo-section').each(function() {
    $(this).show()
  })
})

$('.complete').click((e) => {
  $('.todo-section').each(function() {
    $(this).hide()
  })
  $('.todo-section.finished').each(function() {
    $(this).show()
  })
})

$('.notcomplete').click((e) => {
  $('.todo-section').each(function() {
    $(this).show()
  })
  $('.todo-section.finished').each(function() {
    $(this).hide()
  })
})

$('.clear-completed').click((e) => {
  $('.todo-section.finished').each(function() {
    $(this).remove()
    updateNotCompleteNumber()
  })
})

$('.clear-all').click((e) => {
  $('.todo-section').each(function() {
    $(this).remove()
    updateNotCompleteNumber()
  })
})

$('.form').dblclick((e) => {
  if ($(e.target).hasClass('checked')) {
    const task = $(e.target).text()
    $(e.target).html(`
      <textarea class="task_edit" rows="1" columns="1">${task}</textarea>`
    )
    $('.task_edit').focus()
    $('.task_edit').focus().blur(() => {
      const newTask = $('.task_edit').val()
      $(e.target).text(newTask)
    })
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
