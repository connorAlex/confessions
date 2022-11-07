import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }

    return (
        <div className='Navbar'>
            <div onClick={goHome}>home</div>
        </div>
    );
}

export default Navbar;