import React, {useEffect, useState, useCallback} from 'react';
import questionData from '../questionData';
import './styles/ConfessionHelp.css';


const ConfessionHelp = () => {
    const index = Math.floor(Math.random() * questionData.length);
    const [question, setQuestion] = useState(questionData[index]);
    const [isFading, setIsFading] = useState('');


    const shuffleQuestion = useCallback(() => {
        const index = Math.floor(Math.random() * questionData.length);
        setQuestion(questionData[index]);

    },[]);
    
    const isFadingOut = () => {
        if (isFading === 'fade-in') shuffleQuestion();
    }

    useEffect(() => {
        const timeout = setInterval(() => {
            
            if (isFading === 'fade-in') {
                setIsFading('fade-out');
                
            } else {
                setIsFading('fade-in');
            }
             

        }, 6000);
        return () => clearInterval(timeout);
    }, [isFading])

    return (
        <div key={question} onTransitionEnd={isFadingOut} className={`ConfessionHelp ${isFading}`}>
            {question}
        </div>
    );
}

export default ConfessionHelp