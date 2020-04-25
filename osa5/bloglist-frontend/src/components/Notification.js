import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  const color = notification.style === 'success' ? 'green' : 'red'
  const notificationStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (notification.message) {
    return (
      <div style={notificationStyle}>
        <p>{notification.message}</p>
      </div>
    )
  }
  return <></>
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification