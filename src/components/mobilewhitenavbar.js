// MobileNavbar.js
import React, { useState } from 'react';
import '../styles/mobilenavbar.css';
import jfslogo from '../assets/jfs.png';
import jfslogoblack from '../assets/jfsblack.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faInstagram as fabInstagram } from '@fortawesome/free-brands-svg-icons';
function MobileWhiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="mobile-navbar">
                <a href="/">
      <img src={jfslogo} alt="JFS Logo" className="mobile-logo" />
    </a>

      <div className={`sliding-menu ${menuOpen ? 'open' : ''}`}>
      <img src={jfslogoblack} alt="JFS Logo" className="sliding-logo" />
        <a href="/">Home</a>
        <a href="/collection">Collection</a>
        <a href="https://instagram.com/johnsfootballshirts">Socials</a>
        <div className='igicon' onClick={() => window.location.href = "https://instagram.com/johnsfootballshirts"}>
          <FontAwesomeIcon icon={fabInstagram} color={menuOpen ? 'black' : 'white'} fontSize={'6vh'} />
        </div>
      </div>

      <div className="close-icon" onClick={handleMenuClick} style={{top:'25px'}}>
      <FontAwesomeIcon color={menuOpen ? 'black' : 'white'} icon={menuOpen ? faTimes : faBars} fontSize={'25px'} />
      </div>
    </div>
  );
}

export default MobileWhiteNavbar;
