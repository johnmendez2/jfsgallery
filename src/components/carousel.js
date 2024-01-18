// ImageCarousel.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useSpring, animated, config } from 'react-spring';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import '../styles/carousel.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = ({ shirts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = React.useRef();
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const [index, setIndex] = React.useState(0);

  const handleAfterChange = (current) => {
    setIndex(current);
  };

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      // Scroll down for next slide
      sliderRef.current.slickNext();
    } else {
      // Scroll up for previous slide
      sliderRef.current.slickPrev();
    }
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="custom-prev-arrow"
        onClick={onClick}
        style={{
          position: 'absolute',
          top: '50%',
          left: '500px',
          transform: 'translateY(-50%)',
          fontSize: '50px',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        {''}
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="custom-next-arrow"
        onClick={onClick}
        style={{
          position: 'absolute',
          top: '50%',
          right: '500px',
          transform: 'translateY(-50%)',
          fontSize: '50px',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        {''}
      </div>
    );
  };

  const fade = useSpring({
    opacity: 0, // Initial opacity value
    config: { duration: 1000 },
  });

  const sliderSettings = {
    ref: sliderRef,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Set the number of slides to show
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px', // Adjust the padding as needed
    afterChange: handleAfterChange,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
    beforeChange: (oldIndex, newIndex) => {
      setCurrentIndex(newIndex);
    },
  };

  useEffect(() => {
    document.body.addEventListener('wheel', handleWheel);
    return () => {
      document.body.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  return (
    <div style={{ width: '100%', margin: 'auto', textAlign: 'center', position: 'relative', paddingTop:'5.5rem' }}>
      <Slider {...sliderSettings}>
        {shirts.map((shirt, i) => {
          const distance = i - currentIndex;

          fade.opacity = distance === 0 ? 1 : 0; // Update opacity based on distance

          return (
            <animated.div
              key={i}
              style={{
                ...fade,
                width: '100%',
                height: '100%',
                display: 'block',
                position: 'absolute',
                left: `${distance * 20}%`, // Adjust the factor based on your design
              }}
              onClick={() => {
                // Navigate to /shirtpage when clicking on the image
                navigate(`/id/${shirt.id}`);
              }}
            >
              <img
                src={shirt.frameImage}
                alt={`Shirt ${i}`}
                style={{
                  width: '30vw',
                  height: 'auto',
                  margin: 'auto',
                  transform: `scale(${distance === 0 ? 0.8 : 0.55})`,
                  transition: 'all 0.5s ease-in-out',
                }}  
              />
              {/* Display the title of the shirt in focus */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
  {distance === 0 && (
    <h1 className='shirtName'>
      {shirt.shirtname}
    </h1>
  )}
</div>

            </animated.div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
