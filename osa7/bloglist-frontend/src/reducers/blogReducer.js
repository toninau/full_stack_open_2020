import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const byLikes = (a, b) => b.likes - a.likes

const reducer = (state = [], action) => {
  console.log(state)
  switch (action.type) {
  case 'INIT':
    return action.data.sort(byLikes)
  case 'CREATE':
    return [...state, action.data]
  case 'CREATE_COMMENT': {
    const commentedBlog = action.data
    return state.map(blog => blog.id === commentedBlog.id ? commentedBlog : blog)
  }
  case 'LIKE': {
    const likedBlog = action.data
    return state.map(blog => blog.id === likedBlog.id ? likedBlog : blog).sort(byLikes)
  }
  case 'REMOVE':
    return state.filter(b => b.id !== action.id)
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const createComment = (blog, comment) => {
  return async dispatch => {
    try {
      const data = await blogService.comment(comment, blog.id)
      const comments = [...blog.comments, data]
      dispatch({
        type: 'CREATE_COMMENT',
        data: { ...blog, comments }
      })
    } catch (exception) {
      dispatch(setNotification('comment missing!', 'error'))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const { comments, ...toLike } = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const data = await blogService.update(toLike)
    dispatch({
      type: 'LIKE',
      data: { ...data, comments, user: blog.user }
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export default reducer