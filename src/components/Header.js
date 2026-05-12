import React from "react";
import { getSpecialDayMessage } from "../helpers";

export default function Header() {
  const specialMessage = getSpecialDayMessage();

  return (
    <>
      {specialMessage && (
        <div
          className="special-banner"
          style={{
            position: "fixed",
            width: "100%",
            height: "50px",
            top: 0,
            left: 0,
            backgroundColor: "#ff4081",
            color: "white",
            fontWeight: "bold",
            fontSize: "24px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            zIndex: 9999,
            alignContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              animation: "marquee 15s linear infinite",
            }}
          >
            {specialMessage}
          </div>
        </div>
      )}

      <h1
        className="main-title"
        style={{
          color: "#fff",
          marginBottom: 20,
          marginTop: specialMessage ? 80 : 30,
          fontSize: "clamp(20px, 7vw, 38px)",
          letterSpacing: 2,
          textShadow: "0 2px 8px #fda085",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <img
          src="/123.png"
          alt="kien"
          className="title-icon"
          style={{ width: "60px", height: "60px" }}
        />
        <span>Đức Kiên & Anh Loan</span>
        <img
          src="/321.png"
          alt="loan"
          className="title-icon"
          style={{ width: "60px", height: "60px" }}
        />
      </h1>
    </>
  );
}
