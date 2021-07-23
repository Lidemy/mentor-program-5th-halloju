export function escapeHtml(str) {
  return str.replace(/&/g, 'amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;').replace(/'/g, '&#039;')
}

export function appendCommentToDOM(container, comment, isAppend = true) {
  const content = `
        <div class="card mt-2 mb-1">
          <div class="card-body">
            <h5 class="card-title">${escapeHtml(comment.nickname)}</h5>
            <p class="card-text">${escapeHtml(comment.comment)}</p>
          </div>
        </div>
      `
  if (isAppend) {
    container.append(content)
  } else {
    container.prepend(content)
  }
}

export function showButton(commentsLength, maxLength, cls) {
  if (commentsLength > maxLength) {
    cls.show()
  } else {
    cls.hide()
  }
}
