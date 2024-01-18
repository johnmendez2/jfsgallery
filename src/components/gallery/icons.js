// Slide1.js
import React from 'react';
import '../../styles/slide.css';
import slideImage from '../../assets/iconwall.png';
import ImageCarousel from '../carousel';
import Navbar from '../navbar';
import MobileNavbar from '../mobilenavbar';
import MobileImageCarousel from '../mobilecarousel';
import shirtsArray from '../shirtsArray';

const Slide1 = () => {
  return (
    <div className="slide" style={{ backgroundImage: `url(${slideImage})` }}>
      {/* Mobile version */}
      <div className="mobile" style={{ display: 'none' }}>
        <MobileNavbar />
        <MobileImageCarousel shirts={shirtsArray} />
      </div>

      {/* Desktop version */}
      <div className="desktop" style={{ display: 'block' }}>
        <Navbar />
        <ImageCarousel shirts={shirtsArray} />
      </div>

      {/* Content for Slide 1 */}
    </div>
  );
}

export default Slide1;
