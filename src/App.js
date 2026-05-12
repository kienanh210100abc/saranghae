import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import QuoteCard from "./components/QuoteCard";
import EventsList from "./components/EventsList";
import { diffInDays, loveStartDate } from "./helpers";

function App() {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    let timeoutId;

    const scheduleNextTick = () => {
      const now = new Date();
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);

      const delay = nextMidnight.getTime() - now.getTime();
      timeoutId = setTimeout(() => {
        setCurrentTime(new Date());
        scheduleNextTick();
      }, delay);
    };

    scheduleNextTick();

    return () => clearTimeout(timeoutId);
  }, []);

  const today = currentTime;
  const daysTogether = diffInDays(today, loveStartDate);

  return (
    <div
      className="app-root"
      style={{
        textAlign: "center",
        paddingRight: 15,
        paddingLeft: 15,
        minHeight: "100vh",
        fontFamily: "'Segoe UI', 'Arial', sans-serif",
        background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header />

      <div
        className="container"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          borderRadius: 18,
          padding: 32,
          margin: "0 auto",
          maxWidth: 420,
          boxShadow: "0 8px 32px rgba(253, 160, 133, 0.18)",
          marginBottom: 30,
        }}
      >
        <p
          style={{
            fontSize: 26,
            color: "#d63384",
            marginBottom: 18,
            fontWeight: 600,
          }}
        >
          Hôm nay là ngày thứ{" "}
          <span style={{ color: "#fda085", fontWeight: 700 }}>
            {daysTogether}
          </span>{" "}
          mình bên nhau 😍
        </p>

        <QuoteCard />

        <EventsList />
      </div>
    </div>
  );
}

export default App;
