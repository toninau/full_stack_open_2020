import React from 'react'

const CommentList = ({ comments }) => {
  if (!comments) {
    return null
  }

  return (
    <ul>
      {comments.map(comment =>
        <li key={comment.id}>{comment.text}</li>
      )}
    </ul>
  )
}

export default CommentList