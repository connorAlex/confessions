import React, {useEffect, useState} from "react";

const View = () => {

    const [confession, setConfession ] = useState();

    let getConfession = async () => {
        let response = await fetch("http://localhost:5000/view");

        if (!response.ok) {
            const message = `Error: ${response.statusText}`
            console.log(message);
            return;
        }

        const confessionJson = response.json();
        setConfession(confessionJson);
    };
    getConfession();

    return (
        <div className="View">
            This is the view page
            <div>{confession}</div>
        </div>
    );
}

export default View;