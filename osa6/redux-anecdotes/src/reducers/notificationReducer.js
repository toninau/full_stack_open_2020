const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    default:
      return state
  }
}

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        content: ''
      })
    }, duration * 1000)
  }
}

export default notificationReducer