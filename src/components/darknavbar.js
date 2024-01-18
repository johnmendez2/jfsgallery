// DarkNavbar.js

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/navbar.css';
import jfslogo from '../assets/jfsblack.png';

function DarkNavbar({ whiteBackground }) {
  const navbarStyle = {
    background: whiteBackground ? 'white' : 'transparent',
  };

  return (
    <div className="navbar" style={navbarStyle}>
          <a href="/">
      <img src={jfslogo} alt="JFS Logo" className="logo" />
    </a>
      <div className="nav-options-dark">
        <a href="/">Home</a>
        <a href="/collection">Collection</a>
        <a href="https://instagram.com/johnsfootballshirts">Socials</a>
      </div>
    </div>
  );
}

DarkNavbar.propTypes = {
  whiteBackground: PropTypes.bool,
};

export default DarkNavbar;
