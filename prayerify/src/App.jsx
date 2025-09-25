import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PrayerTimes from "./pages/PrayerTimes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prayer-times" element={<PrayerTimes />} />
      </Routes>
    </>
  );
}

export default App;