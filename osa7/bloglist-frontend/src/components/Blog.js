import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button id="like-button" onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {own && <button id="remove-button" onClick={() => handleRemove(blog.id)}>remove</button>}
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
