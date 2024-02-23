import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function ChatInput({ user, clickedUser, getMessages, getMatchMessages }) {
    const [ textArea, setTextArea ] = useState("")
    const tempUserEmail = user?.email;
    const tempClickedEmail = clickedUser?.email;

    const addMessage = async () => {
        const newMessage = {
            time: new Date().toISOString(),
            sender_email: tempUserEmail,
            receiver_email: tempClickedEmail,
            message: textArea
        }
        try {
            await axios.post('/addmessage', {newMessage});
            getMessages();
            getMatchMessages();
            setTextArea("");
        } catch (error) {
            console.log("Axios failed");
        }
    }

    return (
        <div className="chat-textarea">
            <textarea value={textArea} className="chat-input" onChange={(e) => setTextArea(e.target.value)}/>
            <button className="btn" onClick={addMessage}>Send</button>
        </div>
    )
}

export default ChatInput
