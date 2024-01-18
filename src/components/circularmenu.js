import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const { x } = useSpring({
    x: index * -100,
    config: { tension: 170, friction: 26 },
  });

  const goToPrevious = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const goToNext = () => {
    setIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const CustomPrevArrow = ({ onClick }) => (
    <div
      className="custom-arrow prev"
      onClick={goToPrevious}
      style={{
        position: 'absolute',
        top: '50%',
        left: '43vw', // Adjust the position as needed
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
        backgroundColor: '#ffffff00',
        fontSize: '34px', // Adjust the font size as needed
        color: '#ffffff',
      }}
    >
      {/* Character arrow icon for the previous button */}
      {"<"}
    </div>
  );
  
  const CustomNextArrow = ({ onClick }) => (
    <div
      className="custom-arrow next"
      onClick={goToNext}
      style={{
        position: 'absolute',
        top: '50%',
        right: '0rem', // Adjust the position as needed
        marginRight:'43vw',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
        backgroundColor: '#ffffff00',
        fontSize: '34px', // Adjust the font size as needed
        color: '#ffffff',
      }}
    >
      {/* Character arrow icon for the next button */}
      {">"}
    </div>
  );
  
  return (
    <div
      style={{ width: '22rem', margin: 'auto', textAlign: 'center', position: 'static', overflow: 'hidden' }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
      >
        {images.map((image, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              flex: '0 0 100%',
              height: '100%',
            }}
          >
            <animated.div
              style={{
                flex: '0 0 100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: x.interpolate((x) => `translate3d(${x}%, 0, 0)`),
              }}
            >
              <img
                src={image}
                alt={`Image ${i}`}
                style={{
                  maxWidth: '15rem',
                  maxHeight: '100%',
                  paddingLeft:'10px',
                  paddingTop:'2.3rem'
                }}
              />
            </animated.div>
          </div>
        ))}
      </div>
      {/* Navigation buttons with custom SVG arrows */}
      <CustomPrevArrow />
      <CustomNextArrow />
    </div>
  );
};

export default Carousel;
