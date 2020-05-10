import blogService from '../services/blogs'

const byLikes = (a, b) => b.likes - a.likes

const reducer = (state = [], action) => {
  console.log(state)
  switch (action.type) {
  case 'INIT':
    return action.data.sort(byLikes)
  case 'CREATE':
    return [...state, action.data]
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

export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const data = await blogService.update(toLike)
    dispatch({
      type: 'LIKE',
      data: { ...data, user: blog.user }
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