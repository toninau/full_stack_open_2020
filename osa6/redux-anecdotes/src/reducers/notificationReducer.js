const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification
    }
  }
}

export const notificationRemove = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer