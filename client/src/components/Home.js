import React, { useState } from 'react';
import './styles/Home.css'
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
     
        <div className='title'>confess</div>

        <form name='confession' className='confession'>
        <textarea type="text" value={input} onChange={handleInput}></textarea>
        <div className="count">{input.length}/140</div>
        <Button onClick={onSubmit} label='Submit'/>
        </form>

     

    </div>
  );
}

export default Home;
