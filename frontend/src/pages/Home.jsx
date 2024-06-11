import React, { useEffect } from 'react'
import '../App.css'
import { useState } from 'react'


export default function Home() {

  const [loggedUser, setLoggedUser] = useState(localStorage.getItem('user'))

  useEffect(() => {
    if (!loggedUser) {
      setLoggedUser('Hello world!')
    }
  }, [loggedUser])
 
  return (
    <div className='App'>
      {loggedUser}
    </div>
  )
}
