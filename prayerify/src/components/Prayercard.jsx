import React from "react";

function Prayercard({ name, time }) {
 return (
  <div key={name} className="prayer-card">
    <span className="prayer-name">{name}</span>
    <span className="prayer-time">{time}</span>
  </div>
)}



export default Prayercard;