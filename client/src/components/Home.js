import React, { useState } from 'react';
import Button from './Button'

const Home = () => {

  const [input, setInput] = useState('');

  const clearForm = () => {
    setInput('');
  }
  
  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let post = {
      userName: "",
      confession: input,
      time: "test time"
    }

    await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
    .catch(err => {
      console.error(err);
      return;
    });
    clearForm();
  }

  return (
    <div className='Home'>
      <label htmlFor='confession'>confess</label>
      <form name='confession' className='confession'>
        <textarea value={input} onChange={handleInput}></textarea>
        <Button onClick={onSubmit} label='Submit'/>
      </form>

    </div>
  );
}

export default Home;
