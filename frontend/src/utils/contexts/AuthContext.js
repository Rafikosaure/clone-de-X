import { createContext } from "react"
import { useState } from "react"
import axios from "axios"
import { API_URL } from "../constants/backend"

// Créez un contexte d'authentification
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    // Etat pour stocker les informations de l'utilisateur connecté
    const [ user, setUser ] = useState(null)

    // Fonction pour gérer l'authentification de l'utilisateur
    const login = async (userData) => {
        axios.post(`${API_URL}/user/login`, userData)
        .then(data => {
        console.log(data)
        setUser(data.data)
        localStorage.setItem('user', JSON.stringify(data.data.pseudonym))
        })
        .catch(error => console.log(error));
    }
    
    return (
        <AuthContext.Provider value={{ login, user }}>
            {children}
        </AuthContext.Provider>
    )
}