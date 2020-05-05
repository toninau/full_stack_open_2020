const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    default:
      return state
  }
}

let timeoutId

export const setNotification = (content, duration) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        content: ''
      })
    }, duration * 1000)
  }
}

export default notificationReducer