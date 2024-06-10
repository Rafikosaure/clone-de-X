import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Auth.css'
import XLOGO from '../images/X-logo.png'
import { API_URL } from '../utils/constants/backend'
import { useNavigate } from 'react-router-dom'


export default function Login() {

  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((user) => ({ ...user, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${API_URL}/user/login`, userData)
    .then(data => console.log(data))
    .catch(error => console.log(error));
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
