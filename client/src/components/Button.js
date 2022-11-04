import React from "react";
import './styles/Button.css';

const Button = ({label, onClick}) => {

    const fakeOnclick = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    return (
        <div className="button" onClick={onClick}>
            {label}
        </div>
    );
}

export default Button;