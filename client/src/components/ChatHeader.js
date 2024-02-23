import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

function ChatHeader({ user }) {
  const [ cookies, setCookie, removeCookie ] = useCookies();
  
  let navigate = useNavigate();

  const logout = () => {
    removeCookie('UserID', cookies.UserID);
    removeCookie('UserEmail', cookies.UserEmail);
    removeCookie('AuthToken', cookies.AuthToken);
    navigate("/home");
  }

  return (
    <div className="header-div">
      <p><b>{user.name}</b></p>
      <button className="btn-small" onClick={logout}>Logout</button>
    </div>
    )
}

export default ChatHeader
