import React, { useEffect, useState } from "react";

function Clock() {
  const [currentTime, setCurrentTime] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // ⏰ الوقت الحالي
      const options = { hour: "numeric", minute: "numeric", second: "numeric", hour12: false };
      setCurrentTime(now.toLocaleTimeString("ar-DZ", options));

// 📅 التاريخ الميلادي
      const gOptions = { day: "numeric", month: "long", year: "numeric" };
      setGregorianDate(now.toLocaleDateString("ar-DZ", gOptions));

      // 🕌 التاريخ الهجري
      const hOptions = { day: "numeric", month: "long", year: "numeric", calendar: "islamic" };
      setHijriDate(now.toLocaleDateString("ar-TN-u-ca-islamic", hOptions));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <h2>{gregorianDate}</h2>
      <h3>{hijriDate}</h3>
      <h1>{currentTime}</h1>
      </div>
  );
}

export default Clock;