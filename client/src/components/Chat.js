import React from 'react'
import ChatHeader from './ChatHeader'
import Matches from './Matches'
import ChatContent from './ChatContent'
import { useState } from 'react'

// CONTAINS THE MATCHES LISTING/CHAT HISTORY AND REQUIRED BUTTONS TO SWITCH BETWEEN THE TWO. CHAT BUTTON IS DISABLED IF MATCH IS NOT SELECTED
function Chat({ user, newSwipe }) {
  const [ clickedUser, setClickedUser ] = useState(null);

  return (
    <div className="chat-container">
      <ChatHeader user={(user)}/>
      <div className="buttons-div">
        <button name="matchbutton" className="btn-small" onClick={() => setClickedUser(null)}>Matches</button>
        <button name="chatbutton" className="btn-small" disabled={!clickedUser}>Chat</button>
      </div>
      {!clickedUser && <Matches setClickedUser={setClickedUser} newSwipe={newSwipe}/>}
      {clickedUser && <ChatContent user={user} clickedUser={clickedUser}/>}
    </div>
  )
}

export default Chat
