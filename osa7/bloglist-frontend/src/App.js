import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async (userObject) => {
    dispatch(loginUser(userObject))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
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

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={create} />
    </Togglable>
  )

  return (
    <Router>
      <Notification />
      {user === null ?
        <LoginForm loginUser={handleLogin} /> :
        <div>
          <h2>blogs</h2>
          <div>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
      }
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {user &&
            <div>
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
        </Route>
      </Switch>
    </Router>
  )
}

export default App