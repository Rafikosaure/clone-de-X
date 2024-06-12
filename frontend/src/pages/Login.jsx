import React, { useState } from 'react'
import '../styles/Auth.css'
import XLOGO from '../images/X-logo.png'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../utils/contexts/AuthContext'


export default function Login() {

  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const { login, user } = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((user) => ({ ...user, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(userData)
    console.log(user)
  }

  return (
    <div className='auth-page'>
        <div onClick={() => navigate('/')} className='auth-close-button'><p>x</p></div>
        <div className='auth-content'>
            <div className='div-image'><img src={XLOGO} alt='logo de X' /></div>
            <h1>Connectez-vous à X</h1>
            <form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
                <input type="email" name='email' placeholder='Email' onChange={handleChange} required />
                <input type="password" name='password' placeholder='Mot de passe' onChange={handleChange} required/>
                <button>Se connecter</button>
            </form>
        </div>
    </div>
  )
}