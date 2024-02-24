import React, { useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { useState } from 'react'
import Chat from './Chat' 
import axios from 'axios'
import { useCookies } from 'react-cookie'

// THIS IS THE MAINPAGE. CONTAINS THE TINDER CARDS AND CHAT/MATCH LISTING
function Mainpage() {
    const [ user, setUser ] = useState('');
    const [ cookies, setCookie, removeCookie ] = useCookies(['user']);
    const [ characters, setCharacter ] = useState([]);
    const [ newSwipe, setNewSwipe] = useState();
    
    // GETS THE CURRENT LOGGED IN USER
    const getUser = async () => {
      try {
        const userEmail = cookies.UserEmail;
        const response = await axios.get('/user', {
          params: {userEmail}
        })
        setUser(response.data);
      } catch (error) {
        console.log("Axios failed");
      } 
    }

    // GETS ALL USERS, EXCLUDING LOGGED IN ONE, FOR THE TINDERCARDS
    const getAllUsers = async () => {
      try {
        const response = await axios.get('/allusers', {
          params: { email: cookies.UserEmail}
        })
        setCharacter(response.data);
      } catch (error) {
        console.log("Axios failed");
      }
    }

    // ADDS A LIKE TO THE SWIPED USER
    const setMatched = async (swipedEmail) => {
      const currentEmail = cookies.UserEmail;
      try {
        await axios.post('/matched', {
          currentEmail,
          swipedEmail
        })
        getUser();
      } catch (error) {
        console.log("Axios failed");
      }
    }


    useEffect(() => {
      getUser();
      getAllUsers();
    }, [])

    // IF THE DIRECTION OF SWIPE IS RIGHT, CALLS A FUNCTION TO ADD LIKE. PARTIALLY FROM REACT-TINDER-CARD
    const swiped = (direction, swipedEmail) => {
      setNewSwipe(swipedEmail);
      if(direction === 'right') {
        setMatched(swipedEmail);
      }
    }
  
    // FUNCTION TO NOTIFY WHEN CARDS HAS LEFT SCREEN. FROM REACT-TINDER-CARD
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }

  return (
    <div className="mainpage">
        <Chat user={(user)} newSwipe={newSwipe}/>
        <div className="main-container">
            <div className='cardContainer'>
            {characters.map((character) =>
            <TinderCard 
                className='swipe' 
                key={character.name} 
                onSwipe={(dir) => swiped(dir, character.email)} 
                onCardLeftScreen={() => outOfFrame(character.name)}>
                <div style={{ color: "blue" }} className='card'>
                <h3>{character.name}</h3>
                <p>Age: {character.age}</p>
                <p className="desc">{character.description}</p>
                </div>
            </TinderCard>
            )}
        </div>
      </div>
    </div>
  )
}

export default Mainpage
