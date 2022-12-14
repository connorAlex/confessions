import React, { useState } from "react";
import "./styles/Home.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import ConfessionHelp from "./ConfessionHelp";

const Home = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  let approved = false;

  const clearForm = () => {
    setInput("");
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  if (input.length >= 50 && input.length <= 140) {
    approved = true;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!input) return;

    let post = {
      userName: "",
      confession: input,
      time: "test time",
    };

    if (approved) {
      await fetch("https://confessions.fly.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }).catch((err) => {
        console.error(err);
        return;
      });

      clearForm();
      navigate("/view", { state: { approved } });
    } else {
      approved = false;

      // remove after /view styling complete
      // navigate("/view", {state: {}});
    }
    approved = false;
    localStorage.clear();
  };

  return (
    <div className="Home">
      <div className="title">confess.</div>
      <ConfessionHelp />
      <form name="confession" className="confession">
        <textarea
          className="confessionInput"
          type="text"
          value={input}
          onChange={handleInput}
        ></textarea>
        <div className={`count ${approved ? "approved" : "fake"}`}>
          {input.length}/140
        </div>
      </form>
      <Button approved={approved} onClick={onSubmit} label="Submit" />
    </div>
  );
};

export default Home;
