import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import Navbar from "./Navbar";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles/View.css'

const View = React.memo(() => {

    const [confession, setConfession ] = useState();
    const [isFading, setIsFading] = useState();
    const navigate = useNavigate();
    const {state} = useLocation();

    useEffect(() => {
        if (!state) {
            navigate("/");
        };
        getConfession();
    }, []);

    // useEffect(() => {
            
    //     if (confession) {
    //         setIsFading('fade-out');
            
    //     }
    
    //     return () => clearInterval(timeout);
    // }, [isFading])

    let getConfession = async () => {
        let response = await fetch("http://localhost:5000/view");

        if (!response.ok) {
            const message = `Error: ${response.statusText}`
            console.log(message);
            return;
        }

        const confessionJson = await response.json();
        setConfession( await confessionJson.confession);
    };
            

    return (
        <div className="View">
            <div className = "message">
                <SkeletonTheme  baseColor="#f3f4f6" highlightColor="#d1d5db">
                    <div>Another's confession.</div>
                    <div className="confessionText">{!confession? (<Skeleton count={4}/>) : (<div style={{animation: `fadeIn 1s`}}> {confession}</div>) }</div>
                    <div className="signature">{!confession? (<Skeleton className={`signature`} count={1}/>) : (<div style={{animation: `fadeIn 1s`}}>-Anon</div>) }</div>
                </SkeletonTheme>
            </div>
            <Navbar />
        </div>
    );
});

export default View;