import './App.css';
import React, { useState } from 'react';
import Button from './components/Button.js';

const App = () => {

  const [input, setInput] = useState('');

  const clearForm = (e) => {
    e.preventDefault();
    setInput('');
  }
  
  const handleInput = (e) => {
    setInput(e.target.value);
  }

  return (
    <div className='App'>
      <label htmlFor='confession'>confess</label>
      <form name='confession' className='confession'>
        <textarea value={input} onChange={handleInput}></textarea>
        <Button onClick={clearForm} label='Submit'/>
      </form>

    </div>
  );
}

export default App;
