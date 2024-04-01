import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/home';
import Shirtpage from './components/shirtpage';
import Collection from './components/collection';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/id/:id" element={<Shirtpage />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
