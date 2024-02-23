import React from 'react'
import { useState } from 'react'
import AddNewAccount from './AddNewAccount';
import Login from './Login';

function Home() {
    const authToken = false;
    const [ showNewAccount, setShowNewAccount] = useState(false)
    const [ showLogin, setShowLogin ] = useState(false);

    const signInClick = () => {
        setShowLogin(true);
    }

    const createAccountClick = () => {
        setShowNewAccount(true);
    }

    return (
    <div className="home">
        {!showNewAccount && !showLogin && (
            <h1>Welcome to NotTinder</h1>
        )}

        <div className="buttonDiv">
            {!showNewAccount && !authToken && !showLogin && (
                <button className="btn-large" onClick={signInClick}>Log in </button>
            )}
        </div>
        <div className="buttonDiv">
            {!showNewAccount && !showLogin && (
                <button className="btn-large" onClick={createAccountClick}>
                    {authToken ? 'Log out': 'Create account'}
                </button>
            )}
        </div>

        {showNewAccount && (
            <AddNewAccount setShowNewAccount={(setShowNewAccount)} />
        )}
        {showLogin && (
            <Login setShowLogin={(setShowLogin)}/>
        )}
    </div>
  )
}

export default Home
