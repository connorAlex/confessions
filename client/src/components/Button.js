import React from "react";
import './styles/Button.css';

const Button = ({label, onClick, approved}) => {


    return (
        <div className={`button ${approved? '':'inactive'}`} onClick={onClick}>
            {label}
        </div>
    );
}

export default Button;