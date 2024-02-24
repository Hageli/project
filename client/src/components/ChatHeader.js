import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

// THIS CONTAINS THE HEADER FOR CHAT. INCLUDES LOGGED IN USER NAME AND BUTTONS FOR EDITING USER DATA/LOGGING OUT
function ChatHeader({ user }) {
  const [ cookies, setCookie, removeCookie ] = useCookies();
  
  let navigate = useNavigate();

  // REMOVES COOKIES ON LOGOUT AND NAVIGATES TO HOMEPAGE
  const logout = () => {
    removeCookie('UserID', cookies.UserID);
    removeCookie('UserEmail', cookies.UserEmail);
    removeCookie('AuthToken', cookies.AuthToken);
    navigate("/home");
  }

  // NAVIGATES TO ACCOUNT EDITING PAGE
  const editProfile = () => {
    navigate("/account");
  }

  return (
    <div className="header-div">
      <p><b>{user.name}</b></p>
      <div className="buttons-div">
        <button className="btn-small" onClick={logout}>Logout</button>
        <button className="btn-small" onClick={editProfile}>Edit profile</button>
      </div>
    </div>
    )
}

export default ChatHeader
