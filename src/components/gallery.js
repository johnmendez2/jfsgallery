import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularMenu from './circularmenu';
import iconstext from '../assets/ICONS.png';
import elegance from '../assets/ELEGANCE.png';

const Gallery = () => {
  const collections = [iconstext, elegance]
  return (
    <div>
      <CircularMenu images={collections}/>
    </div>
  );
};

export default Gallery;
