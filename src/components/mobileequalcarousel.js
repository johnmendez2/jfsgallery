import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/equalcarousel.css';
import { useEffect } from 'react';
const MobileEqualcarousel = ({ shirts }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState([]);
  const sliderRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    sliderRef.current.slickGoTo(index);
  };

  const handleImageLoad = (index) => {
    setImagesLoaded((prev) => [...prev, index]);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  document.addEventListener("DOMContentLoaded", function () {
    // Get the image element
    var image = document.querySelector(".carousel-image");
  
    // Set a timeout to delay the scaling effect for a smooth transition
    setTimeout(function () {
      
      // Change the width to 36vw
      image.style.width = "36vw";
    }, 500);
  });
  
  useEffect(() => {
    imagesLoaded.forEach((index) => {
      const image = document.getElementById(`mobile-carousel-image-${index}`);
      if (image) {
        image.style.visibility = 'visible';
      }
    });
  }, [imagesLoaded]);
  return (
    <div className="mobile-carousel-container">
      <Slider ref={sliderRef} {...settings}>
      {shirts.map((image, index) => (
          <div key={index}>
            <img
              id={`mobile-carousel-image-${index}`}
              className={`mobile-carousel-image ${index === activeIndex ? 'focused' : ''}`}
              src={image}
              alt={`${index + 1}`}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </Slider>

      <div className="mobile-thumbnail-container">
        {shirts.map((image, index) => (
          <div
            key={index}
            className={`mobile-thumbnail ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              loading="lazy"
              style={{ visibility: imagesLoaded.includes(index) ? 'visible' : 'hidden' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileEqualcarousel;
