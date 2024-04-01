import React from 'react';
import '../styles/navbar.css';
import jfslogo from '../assets/jfs.png';
import Gallery from './gallery';

function Navbar() {
  return (
    <div className="navbar">
          <a href="/">
      <img src={jfslogo} alt="JFS Logo" className="logo" />
    </a>
      <div className="nav-options">
        <a href="/">Home</a>
        <a href="/collection">Collection</a>
        <a href="https://www.depop.com/johnsfootballshirts/">Shop</a>
        <a href="https://instagram.com/johnsfootballshirts">Socials</a>
      </div>
    </div>
  );
}

export default Navbar;
