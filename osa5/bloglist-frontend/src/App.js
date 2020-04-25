import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    style: null
  })

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }, [blogs])

  const showNotification = (message, style) => {
    setNotification({ message: message, style: style })
    setTimeout(() => {
      setNotification({ message: null, style: null })
    }, 4000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
        const blogToAdd = { ...returnedBlog, user }
        setBlogs(blogs.concat(blogToAdd))
      })
  }

  const likeBlog = async (blogObject) => {
    const likedBlog = {
      user: blogObject.user.id,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }
    const returnedBlog = await blogService.update(blogObject.id, likedBlog)
    showNotification(`${returnedBlog.title} by ${returnedBlog.author} liked`, 'success')
    setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : { ...blog, likes: ++blog.likes }))
  }

  const removeBlog = id => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteId(id)
        .then(response => {
          showNotification(`Deleted ${blog.title} by ${blog.author}`, 'success')
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
        .catch(error => {
          showNotification(`Information of ${blog.title} has already been removed from server`, 'error')
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
    }
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        <LoginForm loginUser={handleLogin} /> :
        <div>
          <h2>blogs</h2>
          <div>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          {blogForm()}
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={likeBlog}
              handleRemove={removeBlog}
              username={user.username}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App