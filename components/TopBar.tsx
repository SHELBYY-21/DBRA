"use client";

import { useEffect, useState } from "react";

export default function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
      setDate(now.toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6"
      style={{
        height: 52,
        background: "rgba(3,4,10,0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(0,255,231,0.14)",
        boxShadow: "0 1px 0 rgba(0,255,231,0.06), 0 4px 24px rgba(0,0,0,0.6)",
      }}
    >
      {/* Left — logo + menu toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", padding: 4 }}
        >
          {[0,1,2].map(i => (
            <span key={i} className="block" style={{ width: 20, height: 1, background: "#00ffe7", boxShadow: "0 0 4px #00ffe7" }} />
          ))}
        </button>
        <div className="flex items-center gap-2">
          <span className="led led-neon" />
          <span
            style={{ fontFamily: "'Syncopate','Kanit',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.3em" }}
            className="gold-text hidden sm:inline"
          >
            CE EMPIRE
          </span>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: "rgba(0,255,231,0.5)", letterSpacing: "0.1em" }}>
            v3.1
          </span>
        </div>
      </div>

      {/* Center — status chips */}
      <div className="hidden md:flex items-center gap-4" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.1em" }}>
        <span className="flex items-center gap-1.5" style={{ color: "rgba(0,255,231,0.6)" }}>
          <span className="led led-neon" style={{ width: 5, height: 5 }} />
          COMMAND CENTER ONLINE
        </span>
        <span style={{ color: "rgba(0,255,231,0.2)" }}>|</span>
        <span style={{ color: "rgba(232,184,75,0.7)" }}>GROK AI [CONNECTED]</span>
        <span style={{ color: "rgba(0,255,231,0.2)" }}>|</span>
        <span style={{ color: "rgba(0,255,231,0.5)" }}>SHA-256 ACTIVE</span>
      </div>

      {/* Right — clock */}
      <div className="flex items-center gap-3" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
        <div className="text-right">
          <div style={{ fontSize: "0.78rem", color: "#00ffe7", textShadow: "0 0 8px rgba(0,255,231,0.5)", letterSpacing: "0.08em" }}>{time}</div>
          <div style={{ fontSize: "0.5rem", color: "rgba(0,255,231,0.4)", letterSpacing: "0.06em" }}>{date}</div>
        </div>
        <div style={{ width: 1, height: 28, background: "rgba(0,255,231,0.15)" }} />
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(0,255,231,0.3)", background: "rgba(0,255,231,0.05)", fontFamily: "'Cinzel',serif", fontSize: "0.7rem", color: "#00ffe7" }}>
          C
        </div>
      </div>
    </header>
  );
}
