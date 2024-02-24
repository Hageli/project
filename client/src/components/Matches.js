import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

// THIS CONTAINS THE LIST OF ALL MATCHED ACCOUNTS. ALL MATCHES ARE SHOWN IN SIMPLE MATCH CARDS THAT CONTAIN THE NAME OF MATCHED ACCOUNT
function Matches({ setClickedUser, newSwipe }) {
  const [ matchedAccounts, setMatchedAccounts ] = useState()
  const [ cookies, setCookie, removeCookie] = useCookies(['user'])


  // THIS GETS ALL THE ACCOUNT LOGGED IN USER HAS LIKED
  const getMatches = async() => {
    try {
      const response = axios.get('/matchedusers', {
        params: {email: cookies.UserEmail}
      })
      const accountList = await response;
      setMatchedAccounts(accountList.data);
    } catch (error) {
      console.log("Axios failed");
    }
  }

  // UPDATE MATCHES DISPLAY EACH TIME A NEW USER IS SWIPED
  useEffect(() => {
    getMatches();
  }, [newSwipe])

  // FILTERING THE LIKED USERS TO ONLY SHOW THE ONES THAT HAVE LIKED LOGGED IN USER BACK AKA MATCHED ACCOUNTS
  const filteredAccounts = matchedAccounts?.filter((matchedAccount) => 
    matchedAccount.matches?.filter((account) => account.email == cookies.UserEmail).length > 0
  )

  return (
    <div className="matches-list">
      {filteredAccounts?.map((match, index) => (
        <div key={index} className="match-card" onClick={() => setClickedUser(match)}>
          <b><p>{match?.name}</p></b>
        </div>
      ))}
    </div>
  )
}

export default Matches
