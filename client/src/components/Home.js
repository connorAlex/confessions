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
    if (!input) return;
    let post = {
      userName: "",
      confession: input,
      time: "test time"
    }

    if (input.length > 50 && input.length < 140) {
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
    } else {
      alert("stay within the text limits.")
    }

  } 
    

  return (
    <div className='Home'>
     
        <div className='title'>confess.</div>
        <div className='confessionHelp'>Do I do needless work on sunday?</div>
        <form name='confession' className='confession'>
        <textarea type="text" value={input} onChange={handleInput}></textarea>
        <div className="count">{input.length}/140</div>
        
        </form>
        <Button onClick={onSubmit} label='Submit'/>
      

     

    </div>
  );
}

export default Home;
