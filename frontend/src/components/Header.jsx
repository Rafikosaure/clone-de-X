

import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';
import homelogo from '../images/homelogo.png';
import listeslogo from '../images/listeslogo.png';
import messagelogo from '../images/messagelogo.png';
import profilelogo from '../images/profilelogo.png';

const Header = () => {
  return (
    <header className="header">
      <NavLink to="/home" exact={true} className="nav-link" >
        <img src={homelogo} alt="Accueil" className="nav-logo" />
        Accueil
      </NavLink>
      <NavLink to="/listes" className="nav-link">
        <img src={listeslogo} alt="Listes" className="nav-logo" />
        Listes
      </NavLink>
      <NavLink to="/messages" className="nav-link" >
        <img src={messagelogo} alt="Messages" className="nav-logo" />
        Messages
      </NavLink>
      <NavLink to="/profile" className="nav-link" >
        <img src={profilelogo} alt="Profile" className="nav-logo" />
        Profile
      </NavLink>
      <button className="logout-button">Déconnexion</button>
    </header>
  );
};

export default Header;

