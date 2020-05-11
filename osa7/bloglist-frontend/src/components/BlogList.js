import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ blogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blogs">
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle} className='blog'>
          <Link to={`blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default UserList