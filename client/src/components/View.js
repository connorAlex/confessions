import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles/View.css";

const View = React.memo(() => {
  const [confession, setConfession] = useState();
  const navigate = useNavigate();
  let { state } = useLocation();

  useEffect(() => {
    if (!state.approved) {
      navigate("/");
    }
    console.log(state);
    state = false;
    if (localStorage.getItem("confession")) {
      setConfession(localStorage.getItem("confession"));
    } else {
      getConfession();
    }
  }, []);

  let getConfession = async () => {
    let response = await fetch("http://localhost:5000/view");

    if (!response.ok) {
      const message = `Error: ${response.statusText}`;
      console.log(message);
      return;
    }

    const confessionJson = await response.json();
    localStorage.setItem("confession", confessionJson.confession);
    setConfession(await confessionJson.confession);
  };

  return (
    <div className="View">
      <div className="confessionTitle">Another's Thoughts.</div>
      <div className="message">
        <SkeletonTheme width="95%" baseColor="#f3f4f6" highlightColor="#d1d5db">
          <div className="confessionText">
            {!confession ? (
              <Skeleton count={5} />
            ) : (
              <div style={{ animation: `fadeIn 500ms` }}> {confession}</div>
            )}
          </div>
          <div className="signature">
            {!confession ? (
              <Skeleton className={`signature`} count={1} />
            ) : (
              <div style={{ animation: `fadeIn 500ms` }}>- Anon</div>
            )}
          </div>
        </SkeletonTheme>
      </div>
      <Navbar />
    </div>
  );
});

export default View;
