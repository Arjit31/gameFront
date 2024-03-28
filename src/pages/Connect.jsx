import React from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./connect.css";

export default function Connect() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const word = queryParams.get("word");
  const count = queryParams.get("count");
  const navigate = useNavigate();
  return (
    <div className='connect'>
        <div className="wordGroup">
            <div className="w1">" {word} "</div>
        </div>
        <div className="congo">Congratulations!!</div>
        <div className="num">You connected in {count} attempts</div>
        <button className="btn1 disconnect" onClick={() => navigate("/")}>Disconnect</button>
    </div>
  )
}
