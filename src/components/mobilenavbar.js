import React, { useState } from 'react';
import '../styles/mobilenavbar.css';
import jfslogo from '../assets/jfsblack.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faInstagram } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { faInstagram as fabInstagram } from '@fortawesome/free-brands-svg-icons';

function MobileNavbar({ whiteBackground }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarStyle = {
    background: whiteBackground ? 'white' : 'transparent',
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="mobile-navbar" style={navbarStyle}>
          <a href="/">
      <img src={jfslogo} alt="JFS Logo" className="mobile-logo" />
    </a>

      <div className={`sliding-menu ${menuOpen ? 'open' : ''}`}>
           <a href="/">
      <img src={jfslogo} alt="JFS Logo" className="sliding-logo" />
    </a>
        <a href="/">Home</a>
        <a href="/collection">Collection</a>
        <a href="https://instagram.com/johnsfootballshirts" target="_blank" rel="noopener noreferrer">
          Socials
        </a>
        <div className='igicon' onClick={() => window.location.href = "https://instagram.com/johnsfootballshirts"}>
          <FontAwesomeIcon icon={fabInstagram} color='black' fontSize={'6vh'} />
        </div>
    
      </div>

      <div className="close-icon" onClick={handleMenuClick}>
        <FontAwesomeIcon color="black" icon={menuOpen ? faTimes : faBars} fontSize={'25px'} style={{marginTop:'20px'}} />
      </div>
    </div>
  );
}
MobileNavbar.propTypes = {
  whiteBackground: PropTypes.bool,
};

export default MobileNavbar;
