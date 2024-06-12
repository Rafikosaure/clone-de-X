import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Auth.css'
import XLOGO from '../images/X-logo.png'
import { API_URL } from '../utils/constants/backend'
import { useNavigate } from 'react-router-dom'


export default function Register() {

  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((user) => ({ ...user, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${API_URL}/user/register`, userData)
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }

  return (
    <div className='auth-page'>
        <div onClick={() => navigate('/login')} className='auth-close-button'><p>x</p></div>
        <div className='auth-content'>
            <div className='div-image'><img src={XLOGO} alt='logo de X' /></div>
            <h1>Créer votre compte</h1>
            <form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
                <input type="text" name='pseudonym' placeholder='Pseudonyme' onChange={handleChange} required />
                <input type="email" name='email' placeholder='Email' onChange={handleChange} required />
                <input type="password" name='password' placeholder='Mot de passe' onChange={handleChange} required/>
                <button>Inscription</button>
            </form>
        </div>
    </div>
  )
}
