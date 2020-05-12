import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  if (!blog) {
    return null
  }

  const byDate = (a, b) => b.date - a.date

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button id="like-button" onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {own && <button id="remove-button" onClick={() => handleRemove(blog.id)}>remove</button>}
      <h3>comments</h3>
      <ul>
        {blog.comments.sort(byDate).map(comment =>
          <li key={comment.id}>{comment.text}</li>
        )}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}


export default Blog
