import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  console.log(state)
  switch (action.type) {
  case 'INIT_USER':
    return action.user
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      storage.saveUser(user)

      dispatch(setNotification(`${user.name} welcome back!`))

      dispatch({
        type: 'LOGIN',
        user
      })

    } catch (exception) {
      dispatch(setNotification('wrong username/password', 'error'))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const user = storage.loadUser()
    dispatch({
      type: 'INIT_USER',
      user
    })
  }
}

export default reducer