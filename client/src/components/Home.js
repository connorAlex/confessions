import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Button from './Button'
import Navbar from './Navbar';

const Home = () => {

  const [input, setInput] = useState('');
  const navigate = useNavigate();

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
    navigate("/view", {state: {}});
  }

  return (
    <div className='Home'>
     
        <label htmlFor='confession'>confess</label>
        <form name='confession' className='confession'>
        <input type="text" value={input} onChange={handleInput}></input>
        <Button onClick={onSubmit} label='Submit'/>
        </form>
     

    </div>
  );
}

export default Home;
