import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Button from './components/Button.js';
import Home from './components/Home';

const App = () => {



  return (
    <div className='App'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        
      </Routes>

    </div>
  );
}

export default App;
