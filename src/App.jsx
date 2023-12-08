import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Make sure to use BrowserRouter

import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
