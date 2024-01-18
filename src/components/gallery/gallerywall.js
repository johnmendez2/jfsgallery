import React, { useState, useEffect } from 'react';
import '../../styles/slide.css';
import slideImage from '../../assets/whitewall.png';
import ImageCarousel from '../carousel';
import Navbar from '../navbar';
import Gallery from '../gallery';
import DarkNavbar from '../darknavbar';
import MobileNavbar from '../mobilenavbar';
import MobileImageCarousel from '../mobilecarousel';
import { fs } from '../Config/config';

const Slide2 = () => {
  const [shirtsArray, setShirtsArray] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase Firestore
    const fetchData = async () => {
      try {
        const snapshot = await fs.collection('JFSGallery').get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          frameImage: doc.data().frameImage,
          shirtname: doc.data().shirtname,
          price: doc.data().price,
        }));
        setShirtsArray(data);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount
  
 return (
    <div>
      <div className='desktop'>
        <div className="slide" style={{ backgroundImage: `url(${slideImage})` }}>
          <DarkNavbar />
          <ImageCarousel shirts={shirtsArray} />
          {/* Content for Slide 1 */}
        </div>
      </div>
      <div className='mobile'>
        <div className="slide" style={{ backgroundImage: `url(${slideImage})` }}>
          <MobileNavbar />
          <MobileImageCarousel shirts={shirtsArray} />
          {/* Content for Slide 1 */}
        </div>
      </div>
    </div>
  );
}

export default Slide2;
