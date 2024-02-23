import React from 'react'
import ChatHeader from './ChatHeader'
import Matches from './Matches'
import ChatContent from './ChatContent'
import { useState } from 'react'

function Chat({ user }) {
  const [ clickedUser, setClickedUser ] = useState(null);

  return (
    <div className="chat-container">
      <ChatHeader user={(user)}/>
      <div className="buttons-div">
        <button name="matchbutton" className="btn-small" onClick={() => setClickedUser(null)}>Matches</button>
        <button name="chatbutton" className="btn-small" disabled={!clickedUser}>Chat</button>
      </div>
      {!clickedUser && <Matches setClickedUser={setClickedUser}/>}
      {clickedUser && <ChatContent user={user} clickedUser={clickedUser}/>}
    </div>
  )
}

export default Chat
