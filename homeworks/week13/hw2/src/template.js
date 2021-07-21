function addInitTemplate(siteKey) {
  const commentClassName = `${siteKey}-comments`
  const addCommentFormClassName = `${siteKey}-add-comment-form`
  const moreQueriesClassName = `${siteKey}-more-queries`

  return `
<div>
  <form class="${addCommentFormClassName}">
    <div class="input-group mt-3">
      <span class="input-group-text">暱稱</span>
      <input class="form-control" aria-label="With textarea" name="nickname" rows="10"></input>
    </div>
    <div class="input-group mt-3">
      <span class="input-group-text">留言</span>
      <textarea class="form-control" aria-label="With textarea" rows="10" name="comment"></textarea>
    </div>
    <button type="submit" class="btn btn-primary mt-3">送出</button>
  </form>

  <div class="${commentClassName}">
  </div>
  <div class="${moreQueriesClassName}" mt-1 mb-2" style="display: none;">
    <button type="submit" class="btn btn-primary mt-3">載入更多</button>
  </div>
</div>
`
}

export default { addInitTemplate }
