

import React from 'react'; // Importation de React et useState pour gérer l'état
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importation de Router, Routes et Route pour la gestion des routes
import Header from './components/Header.jsx'; // Importation du composant Header
import Register from './pages/Register'; // Importation du composant Register
import Login from './pages/Login'; // Importation du composant Login

function App() {
  // État local pour stocker les informations de l'utilisateur

  return (
    <>
    <Router>
     
      <Routes>
        {/* Définition des routes pour les différentes pages */}
        <Route path="/home" element={<Header/>} /> {/* Afficher le Header en haut de toutes les pages */}
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/lists" element={<>list</>} />
        <Route path="/messages" element={<>messages</>} />
        <Route path="/profile" element={<>profile</>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
