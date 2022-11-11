import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }

    return (
        <div className='Navbar'>
            <div onClick={goHome}>confess again?</div>
        </div>
    );
}

export default Navbar;