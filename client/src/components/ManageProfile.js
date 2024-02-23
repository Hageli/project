import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'


function ManageProfile() {
    const [ name, setName ] = useState();
    const [ age, setAge ] = useState();
    const [ description, setDescription ] = useState();
    const [ cookies, setCookie, removeCookie ] = useCookies(['user']);

    const handleSubmit = () => {
        const userData = {
            email: cookies.UserEmail,
            name: name,
            age: age,
            description: description
        }
        setCookie('UserEmail', email);
    }

    return (
    <div>
      <form className="manageForm">
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
        <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
        <button type="submit" className="btn-large" onClick={handleSubmit}>Save Changes</button>
      </form>
    </div>
  )
}

export default ManageProfile
