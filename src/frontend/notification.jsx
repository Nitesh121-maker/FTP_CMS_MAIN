import React from 'react'
import '../css/notification.css'
import Header from  "./header";
const notification = () => {
  return (
    <>
    <Header />
    <div className="notification-container">
          <div className="notification blue">
              <span className="notification-message">Notification 1: This is a blue notification message.</span>
          </div>
          <div className="notification green">
              <span className="notification-message">Notification 2: This is a green notification message.</span>
          </div>
          <div className="notification blue">
              <span className="notification-message">Notification 3: Another blue notification message.</span>
          </div>
      </div></>
  )
}

export default notification