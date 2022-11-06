import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import View from './components/View';

const App = () => {



  return (
    <div className='App'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/view' element={<View />} />
      </Routes>

    </div>
  );
}

export default App;
