"use client";

import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";

export default function TopBar({ section }: { section?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", hour12: false }));
    }
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="lux-header">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #FFD77B, #D8B46B 45%, #AA771C)",
          border: "1px solid rgba(255,215,123,0.4)",
          boxShadow: "0 0 14px rgba(216,180,107,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.85rem", fontWeight: 700,
            color: "rgba(3,6,13,0.9)",
          }}>C</span>
        </div>
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem", fontWeight: 700, letterSpacing: "0.12em",
            lineHeight: 1,
          }} className="gold-text">C.E. EMPIRE</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.52rem", color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.1em", marginTop: 1,
          }}>
            {section?.toUpperCase() ?? "COMMAND CENTER"}
          </div>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem",
          color: "rgba(216,180,107,0.7)",
        }}>{time}</div>

        <button style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }} aria-label="Search">
          <Search size={15} color="rgba(255,255,255,0.5)" />
        </button>

        <button style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative",
        }} aria-label="Notifications">
          <Bell size={15} color="rgba(255,255,255,0.5)" />
          <span style={{
            position: "absolute", top: 6, right: 6,
            width: 7, height: 7, borderRadius: "50%",
            background: "#FF5C5C", border: "1.5px solid #03060D",
            boxShadow: "0 0 6px #FF5C5C",
          }} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(216,180,107,0.2), rgba(216,180,107,0.08))",
          border: "1.5px solid rgba(216,180,107,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.9rem", fontWeight: 700,
          color: "#D8B46B",
          cursor: "pointer",
        }}>E</div>
      </div>
    </header>
  );
}
