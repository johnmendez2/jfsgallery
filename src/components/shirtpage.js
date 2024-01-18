import React, { useEffect, useState } from "react";
import Equalcarousel from "./equalcarousel";
import backgroundImg from "../assets/whitewall.png"; // Replace with the correct path
import Navbar from "./navbar";
import '../styles/shirtpage.css';
import shirtsArray from "./shirtsArray";
import MobileEqualcarousel from "./mobileequalcarousel"
import MobileNavbar from "./mobilenavbar";
import MobileWhiteNavbar from "./mobilewhitenavbar";
import { useParams } from "react-router-dom";
import { fs } from './Config/config';
function Shirtpage() {
  const { id } = useParams(); // Get the shirtId from the URL params
  const [shirtDetails, setShirtDetails] = useState({});
  const [animationClass, setAnimationClass] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false); // Add state for controlling carousel visibility

  useEffect(() => {
    const fetchShirtDetails = async () => {
      try {
        const doc = await fs.collection('JFSGallery').doc(id).get();
        if (doc.exists) {
          setShirtDetails(doc.data());
          console.log(doc.data())
        } else {
          console.error(`No document with id ${id} found`);
        }
      } catch (error) {
        console.error('Error fetching shirt details:', error);
      }
    };

    fetchShirtDetails();
  }, [id]);

  useEffect(() => {
    // Add a small delay before applying the animation class
    const timeout = setTimeout(() => {
      setAnimationClass('animate-left');
    }, 400);

    // Clear the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Add a delay before displaying the video
    const timeout = setTimeout(() => {
      setShowVideo(true);
    }, 4000); // Adjust the delay time in milliseconds

    // Clear the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Add a delay before displaying the carousel
    const timeout = setTimeout(() => {
      setShowCarousel(true);
    }, 300); // Adjust the delay time in milliseconds

    // Clear the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  const pageStyle = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    opacity: showVideo ? 1 : 0, // Show or hide the video based on the state
    transition: 'opacity 1s ease-in-out',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 0,
  };

  const content = {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    transition: 'transform 1s ease-in-out',
    transform: animationClass === 'animate-left' ? 'translateX(-20%)' : 'translateX(0)',
  };

  const contentnoanimation = {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  };

  const textContainer = {
    position: 'absolute',
    top: '28%',
    right: '10vw',
    color: 'white',
    textAlign: 'left',
    maxWidth: '35vw',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '20px',
    visibility: animationClass === 'animate-left' ? 'visible' : 'hidden',
    opacity: animationClass === 'animate-left' ? 1 : 0,
    transition: 'visibility 0s, opacity 1s ease-out 1.5s',
  };

  const videoSrc = shirtDetails.video
  const imgarray = [shirtDetails.frameImage, ...(Array.isArray(shirtDetails.imageArray) ? shirtDetails.imageArray : [])];

  console.log(imgarray)
  return (
    <div>
      <div className="desktop">
        <div style={pageStyle}>
          {shirtDetails.video && (
            <video style={videoStyle} autoPlay loop muted>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div style={overlayStyle}></div>
          <Navbar />
          <div style={content}>
            {showCarousel && <Equalcarousel shirts={imgarray} />}
          </div>
          <div style={textContainer}>
            <h1 className='shirtname'>{shirtDetails.shirtname}</h1>
            <p className='shirtprice'>{shirtDetails.price}</p>
            <p className='shirtdesc'>{shirtDetails.description}</p>
          </div>
        </div>
      </div>

      <div className="mobile">
        <div style={pageStyle}>
          {shirtDetails.video && (
            <video controls={false}  style={videoStyle} muted autoPlay playsInline>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div style={overlayStyle}></div>
          <MobileWhiteNavbar />
          <div style={contentnoanimation}>
            <h1 style={{ width:'80%',fontFamily: 'Playfair Display',  fontSize: '3vh', zIndex: 2, color:'white',textAlign:'center', position: 'absolute', top: '17.5%', left: '50%', transform: 'translate(-50%, -50%)' }}>{shirtDetails.shirtname}</h1>
            <p style={{ width:'80%',fontFamily: 'Raleway',  fontSize: '3vh', zIndex: 2, color:'white',textAlign:'center', position: 'absolute', top: '23.5%', left: '50%', transform: 'translate(-50%, -50%)' }}>{shirtDetails.price}</p>
            {showCarousel && <MobileEqualcarousel shirts={imgarray} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shirtpage;