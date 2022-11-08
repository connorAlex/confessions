import React, { useCallback, useEffect, useState } from 'react';
import './styles/Home.css'
import {useNavigate} from 'react-router-dom';
import Button from './Button'
import questionData from '../questionData';

const Home = () => {

  const [input, setInput] = useState('');
  const index = Math.floor(Math.random() * questionData.length);
  const [question, setQuestion] = useState(questionData[index]);
  const navigate = useNavigate();
  
  const shuffleQuestion = useCallback(() => {
    const index = Math.floor(Math.random() * questionData.length);
    setQuestion(questionData[index]);

  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffleQuestion, 20000);
    return () => clearInterval(intervalID);
  }, [shuffleQuestion]);

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
        <div className='confessionHelp'>{question}</div>
        <form name='confession' className='confession'>
        <textarea type="text" value={input} onChange={handleInput}></textarea>
        <div className="count">{input.length}/140</div>
        
        </form>
        <Button onClick={onSubmit} label='Submit'/>
      

     

    </div>
  );
}

export default Home;
