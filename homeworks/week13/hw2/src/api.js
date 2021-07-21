export function getCommentsAPI(apiUrl, siteKey, id, cb, commentDOM) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`
  if (typeof id !== 'undefined') {
    url += `&id=${id}`
  }
  $.ajax({
    url
  }).done((data) => {
    cb(data, commentDOM)
  })
}

export function addCommentsAPI(apiUrl, cb, commentDOM, commentData) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/add_comments.php`,
    data: commentData
  }).done((data) => {
    if (!data.ok) {
      alert(data.message)
      return
    }
    cb(commentDOM, commentData, false)
    $('input[name=nickname]').val('')
    $('textarea[name=comment]').val('')
  })
}
