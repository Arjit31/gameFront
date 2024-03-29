import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./game.css";

const socket = io("https://gameback-6z3w.onrender.com");

export default function Game() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyParam = queryParams.get("key");
  const navigate = useNavigate();
  
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [ready, setReady] = useState(false);
  const [otherUser, setOtherUser] = useState("");
  const [count, setCount] = useState(-1);

  useEffect(() => {
    
    socket.emit("connectAgain", [keyParam, socket.id]);

    socket.on("userConnected", (param) => {
      if(param != socket.id)
      {
        setOtherUser(param);
        // console.log("connected via key: "+param);
        // console.log(socket.id);
        socket.emit("connectAgain", [keyParam, socket.id]);
        // console.log(otherUser);
      }
    });
    socket.on('close', () => {
      navigate("/");
    })
    return () => {
      socket.off("userConnected");
      // socket.off("wordsEntered");
    };
    
  }, []);

  useEffect(() => {
    console.log(ready);
    if(ready){
      console.log(otherUser);
      socket.emit("sendReady", [inputWord, otherUser]);
      socket.on("otherReady", (word) => {
        // console.log(word);
        // console.log(ready);
        socket.emit("bothReady", [inputWord, word, otherUser]);
        // socket.off("otherReady");
      });
      socket.on("wordsEntered", ([ w1, w2 ]) => {
        // console.log(w1);
        // console.log(w2);
        setWord1(w1.toLowerCase());
        setWord2(w2.toLowerCase());
        setReady(false);
        // socket.off("wordsEntered");
      });
    }
    else{
      setCount(prevCount => prevCount + 1);
      socket.off("otherReady");
      socket.off("wordsEntered");
      socket.off('bothReady');
      socket.off('sendReady');
      // socket.on('disconnect');
      // console.log(count);
      if(word1 && word1 == word2)
      {
        let scoreURL = "/connect?";
        scoreURL += `count=${count+1}&word=${word1}`;
        navigate(scoreURL);
      }
    };

  }, [ready]);

  const tryConnect = (e) => {
    e.preventDefault();
    setReady(true);
  }

  // const goBack = (e) => {
  //   e.preventDefault();
  //   // socket.emit('disconnect');
  //   navigate("/");
  // }

  return (
    <div className="gameScreen">
      <form className="gameForm">
        <div className="labelGroup labelCount">
          <label>{count}</label>
        </div>
        <div className="labelGroup">
          <label>{word1}</label>
          <label>{word2}</label>
        </div>
        <input
          type="text"
          className="guess"
          placeholder="What connects you?"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
        />
        {(ready) || (inputWord == "") ?(<div></div>):(
          <button className="btn1 connect1" onClick={tryConnect}>Connect</button>
        )}
      </form>
      <button className="btn1 disconnect" onClick={() => socket.emit('discon', otherUser)}>Disconnect</button>;
    </div>
  );
}
