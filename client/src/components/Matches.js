import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

function Matches({ setClickedUser }) {
  const [ matchedAccounts, setMatchedAccounts ] = useState()
  const [ cookies, setCookie, removeCookie] = useCookies(['user'])


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

  useEffect(() => {
    getMatches();
  }, [])

  return (
    <div className="matches-list">
      {matchedAccounts?.map((match, index) => (
        <div key={index} className="match-card" onClick={() => setClickedUser(match)}>
          <b><p>{match?.name}</p></b>
        </div>
      ))}
    </div>
  )
}

export default Matches
