import React from 'react';
import Navbar from "./navbar";
import Gallery from "./gallery";  // Import the Gallery component
import Slide1 from './gallery/icons';
import Slide2 from './gallery/gallerywall';

export default function Homepage() {
    return (
        <div>   
            {/* <Slide1 />  */}
            <Slide2/>
        </div>
    );
}
