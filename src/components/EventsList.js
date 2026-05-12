import React, { useRef } from "react";
import {
  loveStartDate,
  generateDayMilestones,
  generateYearMilestones,
  getNextBirthday,
  diffInDays,
  formatDate,
} from "../helpers";

export default function EventsList() {
  const today = new Date();
  const containerRef = useRef(null);

  const dayMilestones = generateDayMilestones(loveStartDate, 10)
    .map((event) => ({ ...event, daysLeft: diffInDays(event.date, today) }))
    .filter((event) => event.daysLeft >= -3);

  const yearMilestones = generateYearMilestones(loveStartDate, 10)
    .map((event) => ({ ...event, daysLeft: diffInDays(event.date, today) }))
    .filter((event) => event.daysLeft >= -3);

  const birthday = getNextBirthday("10-04");
  birthday.daysLeft = diffInDays(birthday.date, today);

  const upcomingEvents = [...dayMilestones, ...yearMilestones, birthday]
    .sort((a, b) => a.date - b.date)
    .slice(0, 3);

  const getCountdownText = (daysLeft) => {
    if (daysLeft > 0) {
      return `Còn ${daysLeft} ngày`;
    }

    if (daysLeft === 0) {
      return "Là hôm nay 🎉";
    }

    return `Đã qua ${-daysLeft} ngày`;
  };

  const spawnHearts = (x, y, count = 8) => {
    const container = containerRef.current || document.body;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "flying-heart";
      const size = 12 + Math.round(Math.random() * 12);
      el.style.fontSize = `${size}px`;
      el.style.left = `${x + (Math.random() - 0.5) * 40}px`;
      el.style.top = `${y + (Math.random() - 0.5) * 10}px`;
      el.style.opacity = "0.95";
      el.textContent = "💖";
      container.appendChild(el);
      el.addEventListener("animationend", () => {
        el.remove();
      });
    }
  };

  const handleCardClick = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnHearts(x, y, 10);
  };

  return (
    <div
      ref={containerRef}
      className="events"
      style={{ marginTop: 10, position: "relative" }}
    >
      <h3
        style={{
          fontSize: 20,
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Sự kiện sắp tới
      </h3>
      {upcomingEvents.map((event) => (
        <button
          key={`${event.label}-${event.date.getTime()}`}
          type="button"
          className="event"
          onClick={handleCardClick}
          style={{
            borderBottom: "1px dashed #eee",
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
            width: "100%",
            background: "transparent",
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
            padding: 0,
          }}
        >
          <div style={{ fontSize: 13, color: "#555" }}>{event.label}</div>
          <div style={{ fontSize: 13, color: "#f66" }}>
            {getCountdownText(event.daysLeft)}
          </div>
        </button>
      ))}
    </div>
  );
}
