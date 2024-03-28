import React from 'react';
import "./key.css";

export default function Wait() {
  var a = Math.floor(Math.random()*1000000);
  return (
    <div className='waitScreen'>{a}</div>
  )
}
