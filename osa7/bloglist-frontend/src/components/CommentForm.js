import React, { useState } from 'react'

const CommentForm = ({ handleComment, id }) => {
  const [comment, setComment] = useState('')

  if (!id) {
    return null
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    handleComment({ text: comment }, id)
    setComment('')
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        id="comment"
        type="text"
        value={comment}
        name="Comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button id="comment-button" type="submit">add comment</button>
    </form>
  )
}

export default CommentForm