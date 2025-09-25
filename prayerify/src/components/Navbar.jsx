import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">🏠 الرئيسية</Link>
      <Link to="/prayer-times">🕌 مواقيت الصلاة</Link>
    </nav>
  );
}

export default Navbar;
