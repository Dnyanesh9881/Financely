import React from "react";
import "./style.css";

function Input({ type, label, state, setState, placeholder }) {
  return (
    <div className="input">
      <p className="input-label">{label}</p>
      <input type={type} value={state} onChange={(e)=>setState(e.target.value)} className="custom-input" placeholder={placeholder} required/>
    </div>
  );
}

export default Input;
