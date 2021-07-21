import $ from 'jquery'
import { appendCommentToDOM, showButton } from './utils'
import addInitTemplate from './template'
import { getCommentsAPI, addCommentsAPI } from './api'

function init(options) {
  let id
  const maxLength = 5
  const { apiUrl, siteKey } = options
  const addCommentFormSelector = `.${siteKey}-add-comment-form`
  const commentSelector = `.${siteKey}-comments`
  const querySelector = `.${siteKey}-query`
  const commentDOM = $(commentSelector)
  const containerElement = $(options.container)
  containerElement.append(addInitTemplate(siteKey))

  getCommentsAPI(apiUrl, siteKey, id, getComments, commentDOM)
  $(addCommentFormSelector).submit((e) => {
    e.preventDefault()
    const commentData = {
      site_key: siteKey,
      nickname: $(`${addCommentFormSelector} input[name=nickname]`).val(),
      comment: $(`${addCommentFormSelector} textarea[name=comment]`).val()
    }

    addCommentsAPI(apiUrl, appendCommentToDOM, commentDOM, commentData)
  })

  $(querySelector).click((e) => {
    e.preventDefault()
    getCommentsAPI(apiUrl, siteKey, id, getComments, commentDOM)
  })

  function getComments(data) {
    if (!data.ok) {
      alert(data.message)
      return
    }
    const comments = data.data
    for (let i = 0; i < Math.min(maxLength, comments.length); i++) {
      appendCommentToDOM(commentDOM, comments[i])
      id = comments[i].id
    }
    showButton(comments.length, maxLength, $(querySelector))
  }
}

export default init
