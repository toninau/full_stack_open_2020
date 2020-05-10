import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import loginService from './services/login'
import storage from './utils/storage'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      setUser(user)
      dispatch(setNotification(`${user.name} welcome back!`))
      storage.saveUser(user)
    } catch (exception) {
      dispatch(setNotification('wrong username/password', 'error'))
    }
  }

  const create = async (blog) => {
    try {
      dispatch(createBlog(blog))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author} added!`))
    } catch (exception) {
      console.log(exception)
    }
  }

  const like = async (id) => {
    const likedBlog = blogs.find(b => b.id === id)
    dispatch(likeBlog(likedBlog))
    dispatch(setNotification(`${likedBlog.title} by ${likedBlog.author} liked!`))
  }

  const remove = async (id) => {
    const removedBlog = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${removedBlog.title} by ${removedBlog.author}`)
    if (ok) {
      dispatch(removeBlog(removedBlog.id))
      dispatch(setNotification(`Removed ${removedBlog.title} by ${removedBlog.author}`))
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={create} />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm loginUser={handleLogin} /> :
        <div>
          <h2>blogs</h2>
          <div>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          {blogForm()}
          <div className="blogs">
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={like}
                handleRemove={remove}
                own={user.username === blog.user.username}
              />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App