import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogsREMOVE, setBlogs] = useState([])
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

  const handleLike = async (id) => {
    const blogToLike = blogsREMOVE.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    setBlogs(blogsREMOVE.map(b => b.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b))
    dispatch(setNotification(`${likedBlog.title} by ${likedBlog.author} liked!`))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogsREMOVE.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      setBlogs(blogsREMOVE.filter(b => b.id !== id))
      dispatch(setNotification(`Removed ${blogToRemove.title} by ${blogToRemove.author}`))
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
                handleLike={handleLike}
                handleRemove={handleRemove}
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