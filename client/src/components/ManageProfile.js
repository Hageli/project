import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// THIS CONTAINS THE FORM THAT IS USED TO EDIT USER DATA
function ManageProfile() {
    const [ name, setName ] = useState();
    const [ age, setAge ] = useState();
    const [ description, setDescription ] = useState();
    const [ cookies, setCookie, removeCookie ] = useCookies(['user']);

    const navigate = useNavigate();

    // SENDING ALL REQUIRED USERDATA TO /EDITACCOUNT AND NAVIGATING BACK TO MAINPAGE IF EDITING USERDATA HAS BEEN SUCCESFULL
    const handleSubmit = async (e) => {
      e.preventDefault();
      const userData = {
        email: cookies.UserEmail,
        name: name,
        age: age,
        description: description
      }
      
      try {
        await axios.post("/editaccount", {userData})
        navigate('/mainpage')
      } catch (error) {
        console.log("Axios failed");
      }
    }

    return (
    <div className="edit-div">
      <h1>Edit profile information</h1>
      <form className="manageForm">
      <div className="edit-input">
        <input 
          type="text" 
          placeholder="Name" 
          onChange={(e) => setName(e.target.value)}
          required/>
        </div>
        <div className="edit-input">
          <input 
            type="text" 
            pattern="[0-9]*"
            placeholder="Age" 
            onChange={(e) => setAge(e.target.value)}
            required/>
        </div>
        <div className="edit-input">
          <input 
            type="text" 
            placeholder="Description" 
            onChange={(e) => setDescription(e.target.value)}
            required/>
        </div>
        <button type="submit" className="btn-large" onClick={handleSubmit}>Save Changes</button>
      </form>
    </div>
  )
}

export default ManageProfile
