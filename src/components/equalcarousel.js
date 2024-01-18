import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/equalcarousel.css';

const Equalcarousel = ({ shirts }) => {
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

  useEffect(() => {
    imagesLoaded.forEach((index) => {
      const image = document.getElementById(`carousel-image-${index}`);
      if (image) {
        image.style.visibility = 'visible';
      }
    });
  }, [imagesLoaded]);

  return (
    <div className="carousel-container">
      <Slider ref={sliderRef} {...settings}>
        {shirts.map((image, index) => (
          <div key={index}>
            <img
              id={`carousel-image-${index}`}
              className={`carousel-image ${index === activeIndex ? 'focused' : ''}`}
              src={image}
              alt={`Slide ${index + 1}`}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </Slider>

      <div className="thumbnail-container">
        {shirts.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
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

export default Equalcarousel;
