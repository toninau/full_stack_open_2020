import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, Link,
  useHistory,
  useRouteMatch
} from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import BlogList from './components/BlogList'
import CommentList from './components/CommentList'
import CommentForm from './components/CommentForm'

import usersService from './services/users'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog, createComment } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const [users, setUsers] = useState([])

  const history = useHistory()

  useEffect(() => {
    usersService
      .getAll()
      .then(users => setUsers(users))
  }, [])

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
    history.push('/')
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

  const addComment = async (comment, id) => {
    const commentedBlog = blogs.find(b => b.id === id)
    dispatch(createComment(commentedBlog, comment))
    dispatch(setNotification(`a new comment ${comment.text} added!`))
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
      history.push('/')
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={create} />
    </Togglable>
  )

  const userMatch = useRouteMatch('/users/:id')
  const userInfo = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogInfo = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  const styling = {
    display: 'flex',
    alignItems: 'baseline',
    backgroundColor: 'lightgrey',
    padding: 5,
    margin: 5
  }

  return (
    <div>
      <div style={styling}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        {user &&
          <p>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
        }
      </div>
      <Notification />
      {user === null &&
        <LoginForm loginUser={handleLogin} />
      }
      <Switch>
        <Route path="/users/:id">
          <User user={userInfo} />
        </Route>
        <Route path="/users">
          <UserList users={users} />
        </Route>
        <Route path="/blogs/:id">
          {user && blogInfo &&
            <div>
              <Blog
                blog={blogInfo}
                handleLike={like}
                handleRemove={remove}
                own={user.username === blogInfo.user.username}
              />
              <h3>comments</h3>
              <CommentForm handleComment={addComment} id={blogInfo.id} />
              <CommentList comments={blogInfo.comments} />
            </div>
          }
        </Route>
        <Route path="/">
          {user &&
            <div>
              <h2>blog app</h2>
              {blogForm()}
              <BlogList blogs={blogs} />
            </div>
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App