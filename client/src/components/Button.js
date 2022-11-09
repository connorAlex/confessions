import React from "react";
import './styles/Button.css';

const Button = ({label, onClick, approved}) => {

    const fakeOnclick = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    return (
        <div className={`button ${approved? '':'inactive'}`} onClick={onClick}>
            {label}
        </div>
    );
}

export default Button;