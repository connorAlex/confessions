import './App.css';
import React, { useState } from 'react';
import Button from './components/Button.js';

const App = () => {

  const [input, setInput] = useState('');

  const clearForm = () => {
    setInput('');
  }
  
  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
    .catch(err => {
      console.err(err);
      return;
    });
    clearForm();
  }

  return (
    <div className='App'>
      <label htmlFor='confession'>confess</label>
      <form name='confession' className='confession'>
        <textarea value={input} onChange={handleInput}></textarea>
        <Button onClick={onSubmit} label='Submit'/>
      </form>

    </div>
  );
}

export default App;
