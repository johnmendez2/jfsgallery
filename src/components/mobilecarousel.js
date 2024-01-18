import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import '../styles/carousel.css';

const MobileImageCarousel = ({ shirts }) => {
  const sliderRef = useRef();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentIndex(newIndex);
  };

  const handleWheel = (event) => {
    if (sliderRef.current) {
      if (event.deltaY > 0) {
        sliderRef.current.slickNext();
      } else {
        sliderRef.current.slickPrev();
      }
    }
  };

  const sliderSettings = {
    ref: sliderRef,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '100px',
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: false,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: false,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    document.body.addEventListener('wheel', handleWheel);

    // Add a timeout to delay the initialization of the slider
    const timeoutId = setTimeout(() => {
    }, 500); // Set the delay in milliseconds

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component is unmounted
      document.body.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);
  
  useEffect(() => {
    document.body.addEventListener('wheel', handleWheel);
  
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // Set the initial slide to 0
    }
  
    return () => {
      document.body.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);
  

  return (
    <div style={{ width: '100%', margin: 'auto', textAlign: 'center', position: 'relative', paddingTop: '5.5rem' }}>
      <Slider {...sliderSettings}>
        {shirts.map((shirt, i) => (
          <div key={i} onClick={() => navigate(`/id/${shirt.id}`)}>
            <img
              src={shirt.frameImage}
              alt={`Shirt ${i}`}
              style={{
                width: '80vw',
                height: 'auto',
                margin: 'auto',
                transform: `scale(${i === currentIndex ? 0.8 : 0.2})`,
                transition: 'all 0.5s ease-in-out',
              }}
            />
            {i === currentIndex && (
              <h1 className='mobile-shirtName' style={{ fontSize: '2.2vh', wordWrap: 'break-word', paddingTop: '0px', width:'80%', margin:'auto' }}>
                {shirt.shirtname}
              </h1>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MobileImageCarousel;
