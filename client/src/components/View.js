import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import Navbar from "./Navbar";

const View = React.memo(() => {

    const [confession, setConfession ] = useState();
    const navigate = useNavigate();
    const {state} = useLocation();
    const {verified} = state;

    useEffect(() => {
        if (verified !== true) {
            console.log("did not pass check");
            console.log(verified);
            navigate("/");
        };
        getConfession();
    }, []);

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
            <Navbar />
            <div>
                <div>{confession}</div>
                <div>-Anon</div>
            </div>
        </div>
    );
});

export default View;