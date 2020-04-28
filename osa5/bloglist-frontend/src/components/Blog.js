import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, username }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const fullDetails = () => {
    if (visible) {
      return (
        <>
          <p>{blog.url}</p>
          <div>likes {blog.likes}
            <button id="like-button" onClick={() => handleLike(blog)}>like</button>
          </div>
          <p>{blog.user.name}</p>
          {username === blog.user.username ?
            <button id="remove-button" onClick={() => handleRemove(blog.id)}>remove</button> :
            <></>
          }
        </>
      )
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>{blog.title} {blog.author}
        <button id="view-button" onClick={toggleVisibility}>view</button>
      </div>
      {fullDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}


export default Blog
