import React from 'react'
import Messages from './Messages'
import ChatInput from './ChatInput'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

// THIS CONTAINS THE MESSAGE HISTORY AND CHAT INPUT FIELD/SUBMIT BUTTON. 
function ChatContent({user, clickedUser}) {
  const s_email = user?.email;
  const r_email = clickedUser?.email;
  const [ messages, setMessages ] = useState();
  const [ matchMessages, setMatchMessages ] = useState();

  // GETS ALL MESSAGES SENT BY LOGGED IN USER TO SELECTED MATCH
  const getMessages = async () => {
    try {
      const response = await axios.get('/getmessages', {
        params: {userEmail: s_email, chatterEmail: r_email}
      })
      setMessages(response.data);
    } catch (error) {
      console.log("Axios failed");
    }    
  }

  // GETS ALL MESSAGES SET BY SELECTED MATCH TO LOGGED IN USER
  const getMatchMessages = async () => {
    try {
      const response = await axios.get('/getmessages', {
        params: {userEmail: r_email, chatterEmail: s_email}
      })
      setMatchMessages(response.data);
    } catch (error) {
      console.log("Axios failed");
    }    
  }

  useEffect(() => {
    getMessages();
    getMatchMessages();
  }, [])

  // FORMATTING THE MESSAGES TO INCLUDE THE SENDER NAME INSTEAD OF EMAIL AND SORTING THEM IN CHRONOLOGICAL ORDER
  const tempMessages = [];

  messages?.forEach(message => {
    const message_formatted = {};
    message_formatted['name'] = "You";
    message_formatted['message'] = message.message;
    message_formatted['time'] = message.time;
    tempMessages.push(message_formatted);
  });

  matchMessages?.forEach(message => {
    const message_formatted = {};
    message_formatted['name'] = clickedUser?.name;
    message_formatted['message'] = message.message;
    message_formatted['time'] = message.time;
    tempMessages.push(message_formatted);
  });

  const orderedMessages = tempMessages.sort((a,b) => a.time.localeCompare(b.time));

  return (
    <>
    <Messages orderedMessages={orderedMessages}/>
    <ChatInput user={user} clickedUser={clickedUser} getMessages={getMessages} getMatchMessages={getMatchMessages}/>
    </>
  )
}

export default ChatContent
