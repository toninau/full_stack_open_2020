import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
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

  if (!visible) {
    return (
      <div style={blogStyle}>
        <div>{blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
      </div>
      <p>{blog.url}</p>
      <div>likes {blog.likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <p>{blog.user.name}</p>
    </div>
  )
}


export default Blog
