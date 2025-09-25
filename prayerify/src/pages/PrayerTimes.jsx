import React, { useEffect, useState } from "react";
import PrayerCard from "../components/Prayercard";

function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [city, setCity] = useState("Algiers");
  const [country] = useState("Algeria");
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");
  const [progress, setProgress] = useState(0); // progress bar

 const wilayas = [
  { nameAR: "أدرار", nameEN: "Adrar" },
  { nameAR: "الشلف", nameEN: "Chlef" },
  { nameAR: "الأغواط", nameEN: "Laghouat" },
  { nameAR: "أم البواقي", nameEN: "Oum El Bouaghi" },
  { nameAR: "باتنة", nameEN: "Batna" },
  { nameAR: "بجاية", nameEN: "Bejaia" },
  { nameAR: "بسكرة", nameEN: "Biskra" },
  { nameAR: "بشار", nameEN: "Bechar" },
  { nameAR: "البليدة", nameEN: "Blida" },
  { nameAR: "البويرة", nameEN: "Bouira" },
  { nameAR: "تمنراست", nameEN: "Tamanrasset" },
  { nameAR: "تبسة", nameEN: "Tebessa" },
  { nameAR: "تلمسان", nameEN: "Tlemcen" },
  { nameAR: "تيارت", nameEN: "Tiaret" },
  { nameAR: "تيزي وزو", nameEN: "Tizi Ouzou" },
  { nameAR: "الجزائر", nameEN: "Algiers" },
  { nameAR: "الجلفة", nameEN: "Djelfa" },
  { nameAR: "جيجل", nameEN: "Jijel" },
  { nameAR: "سطيف", nameEN: "Setif" },
  { nameAR: "سعيدة", nameEN: "Saida" },
  { nameAR: "سكيكدة", nameEN: "Skikda" },
  { nameAR: "سيدي بلعباس", nameEN: "Sidi Bel Abbes" },
  { nameAR: "عنابة", nameEN: "Annaba" },
  { nameAR: "قالمة", nameEN: "Guelma" },
  { nameAR: "قسنطينة", nameEN: "Constantine" },
  { nameAR: "المدية", nameEN: "Medea" },
  { nameAR: "مستغانم", nameEN: "Mostaganem" },
  { nameAR: "المسيلة", nameEN: "M'Sila" },
  { nameAR: "معسكر", nameEN: "Mascara" },
  { nameAR: "ورقلة", nameEN: "Ouargla" },
  { nameAR: "وهران", nameEN: "Oran" },
  { nameAR: "البيض", nameEN: "El Bayadh" },
  { nameAR: "إليزي", nameEN: "Illizi" },
  { nameAR: "برج بوعريريج", nameEN: "Bordj Bou Arreridj" },
  { nameAR: "بومرداس", nameEN: "Boumerdes" },
  { nameAR: "الطارف", nameEN: "El Tarf" },
  { nameAR: "تندوف", nameEN: "Tindouf" },
  { nameAR: "تيسمسيلت", nameEN: "Tissemsilt" },
  { nameAR: "الوادي", nameEN: "El Oued" },
  { nameAR: "خنشلة", nameEN: "Khenchela" },
  { nameAR: "سوق أهراس", nameEN: "Souk Ahras" },
  { nameAR: "تيبازة", nameEN: "Tipaza" },
  { nameAR: "ميلة", nameEN: "Mila" },
  { nameAR: "عين الدفلى", nameEN: "Ain Defla" },
  { nameAR: "النعامة", nameEN: "Naama" },
  { nameAR: "عين تموشنت", nameEN: "Ain Temouchent" },
  { nameAR: "غرداية", nameEN: "Ghardaia" },
  { nameAR: "غليزان", nameEN: "Relizane" },
  { nameAR: "تيميمون", nameEN: "Timimoun" },
  { nameAR: "برج باجي مختار", nameEN: "Bordj Badji Mokhtar" },
  { nameAR: "أولاد جلال", nameEN: "Ouled Djellal" },
  { nameAR: "بني عباس", nameEN: "Beni Abbes" },
  { nameAR: "إن صالح", nameEN: "In Salah" },
  { nameAR: "إن قزام", nameEN: "In Guezzam" },
  { nameAR: "تقرت", nameEN: "Touggourt" },
  { nameAR: "جانت", nameEN: "Djanet" },
  { nameAR: "المغير", nameEN: "El M'Ghair" },
  { nameAR: "المنيعة", nameEN: "El Menia" },
];

  
  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2&tune=0,0,0,0,0,5,0,2,0`
    )
      .then((res) => res.json())
      .then((data) => {
        const timings = data.data.timings;
        setPrayerTimes(timings);
        calculateNextPrayer(timings);
      })
      .catch((err) => console.error("Error fetching prayer times:", err));
  }, [city, country]);

  const calculateNextPrayer = (timings) => {
    const now = new Date();
    const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    for (let i = 0; i < prayerOrder.length; i++) {
      const prayer = prayerOrder[i];
      const [h, m] = timings[prayer].split(":");
      const prayerTime = new Date(now);
      prayerTime.setHours(h, m, 0, 0);
      if (now < prayerTime) {
        setNextPrayer(prayer);
        const prevPrayer = i === 0 ? "Isha" : prayerOrder[i - 1];
        const [ph, pm] = timings[prevPrayer].split(":");
        const prevTime = new Date(now);
        if (i === 0) prevTime.setDate(now.getDate() - 1); // last Isha
        prevTime.setHours(ph, pm, 0, 0);

        startCountdown(prevTime, prayerTime);
        return;
      }
    }
    // If all passed, next is Fajr tomorrow
    setNextPrayer("Fajr");
    const [h, m] = timings.Fajr.split(":");
    const nextFajr = new Date(now);
    nextFajr.setDate(now.getDate() + 1);
    nextFajr.setHours(h, m, 0, 0);

    const [ih, im] = timings.Isha.split(":");
    const lastIsha = new Date(now);
    lastIsha.setHours(ih, im, 0, 0);

    startCountdown(lastIsha, nextFajr);
  };

  const startCountdown = (prevTime, targetTime) => {
    clearInterval(window.prayerInterval);
    window.prayerInterval = setInterval(() => {
      const now = new Date();
      const diff = targetTime - now;
      const total = targetTime - prevTime;

      if (diff <= 0) {
        clearInterval(window.prayerInterval);
        setCountdown("حان وقت الصلاة");
        setProgress(100);
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${hours.toString().padStart(2, "0")} : ${minutes
          .toString()
          .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`
      );

      // progress %
      const passed = now - prevTime;
      setProgress(((passed / total) * 100).toFixed(2));
    }, 1000);
  };

  const translatePrayerName = (name) => {
    const translations = {
      Fajr: "الفجر",
      Dhuhr: "الظهر",
      Asr: "العصر",
      Maghrib: "المغرب",
      Isha: "العشاء",
    };
    return translations[name] || name;
  };

  return (
    <div className="app-container">
      <h2>⏰ مواقيت الصلاة - {wilayas.find((w) => w.nameEN === city).nameAR}</h2>

      <div className="select-wrapper">
        <select
          className="select-wilaya"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {wilayas.map((w, i) => (
            <option key={i} value={w.nameEN}>
              {w.nameAR}
            </option>
          ))}
        </select>
      </div>

      {prayerTimes && (
        <>
          <section className="prayer-section">
            <div className="prayer-grid">
              <PrayerCard name="الفجر" time={prayerTimes.Fajr} />
              <PrayerCard name="الشروق" time={prayerTimes.Sunrise} />
              <PrayerCard name="الظهر" time={prayerTimes.Dhuhr} />
              <PrayerCard name="العصر" time={prayerTimes.Asr} />
              <PrayerCard name="المغرب" time={prayerTimes.Maghrib} />
              <PrayerCard name="العشاء" time={prayerTimes.Isha} />
            </div>
          </section>

          {nextPrayer && (
            <div
              style={{
                marginTop: "1rem",
                fontSize: "1.2rem",
                 
                textAlign: "center",
                background: "#a5b2ccff",
                padding: "1rem",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <strong>صلاة</strong> {translatePrayerName(nextPrayer)} <br />
              <strong>بعد    </strong>
              
               <span
      style={{
        direction: "ltr",      // 👈 يبدل اتجاه العد التنازلي
        display: "inline-block",
        fontWeight: "bold",
      }}
    >
              
              
              
               {countdown}
               </span>
              <div
                style={{
                  marginTop: "1rem",
                  height: "12px",
                  width: "100%",
                  background: "#e0e0e0",
                  borderRadius: "8px",
              direction: "ltr",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    
                    background: "#7551daff",
                    transition: "width 1s linear",
                  }}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PrayerTimes;
