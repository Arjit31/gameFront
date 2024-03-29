import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./home.css"; //imports css file into project not just the component
//for importing into components use import styles from "./home.css"

const socket = io("https://gameback-6z3w.onrender.com");

export default function Home() {
  const [key, setKey] = useState("");
  const [inputKey, setInputKey] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    socket.on("keyGenerated", (generatedKey) => {
      setKey(generatedKey);
    });
    socket.on("userConnected", (param) => {
      // setConnectedUserId(otherUserId);
      redirect(param);
    });
    return () => {
      socket.off("keyGenerated");
      socket.off("userConnected");
    };
  }, []);

  const generateKey = (e) => {
    e.preventDefault();
    socket.emit("generateKey");
  };

  const connectByKey = (e) => {
    e.preventDefault();
    socket.emit("connectByKey", inputKey);
    // navigate("/game");
    // redirect();
  };

  const redirect = (param) => {
    const key = param[0];
    let gameURL = "/game?";
    gameURL += `key=${key}&user=${param[1]}`;
    // console.log(param);
    // console.log(param);
    // if({key})
    // {
    //   gameURL += `key=${key}`;
    // }
    // else{
    //   gameURL += `key=${inputKey}`;
    // }
    navigate(gameURL);
  }
  return (
    <div className="homeScreen">
      {key ? (
        <div className="keyGen">{key}</div>
      ) : (
        <div>
          <form className="gameForm">
            <input
              className="gameKey"
              placeholder="Game Key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            ></input>
            <div className="buttonGroup">
              <button className="btn join" onClick={connectByKey}>
                Join
              </button>
              <button className="btn create" onClick={generateKey}>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
