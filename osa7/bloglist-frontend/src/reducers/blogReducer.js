import blogService from '../services/blogs'

const byLikes = (a, b) => b.votes - a.votes

const reducer = (state = [], action) => {
  console.log(state)
  switch (action.type) {
  case 'INIT':
    return action.data.sort(byLikes)
  case 'CREATE':
    return [...state, action.data]
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