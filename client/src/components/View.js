import React, {useEffect, useState} from "react";

const View = React.memo(() => {

    const [confession, setConfession ] = useState();

    useEffect(() => {
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
            <div>{confession}</div>
            <div>-Anon</div>
        </div>
    );
});

export default View;