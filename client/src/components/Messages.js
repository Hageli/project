import React from 'react'

// THIS CONTAINS THE MESSAGES DISPLAY. ALL MESSAGES ARE SHOWN IN SIMPLE MESSAGE CARDS THAT INCLUDE THE SENDER NAME AS HEADER
function Messages({ orderedMessages }) {
  return (
    <>
      <div className="message-display">
        {orderedMessages.map((message, index) => (
          <div key={index} className="message-card">
            <div className="message-header">
              <b><p>{message.name}</p></b>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Messages
