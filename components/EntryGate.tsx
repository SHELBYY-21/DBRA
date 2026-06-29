"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  { text: "INITIALIZING CE EMPIRE v3.1.0 ...", cls: "text-[#00ffe7]" },
  { text: "LOADING NEURAL MODULES ........", cls: "text-[#00ffe7]" },
  { text: "[OK] QUANTUM ENCRYPTION LAYER", cls: "text-[#00ff88]" },
  { text: "[OK] GROK AI ENGINE ONLINE", cls: "text-[#00ff88]" },
  { text: "[~~] SYNCING FINANCIAL MATRIX", cls: "text-[#e8b84b]" },
  { text: "> SYSTEM READY — AUTHENTICATE", cls: "text-[#e8eaf6]" },
];

const QUOTES = [
  "จักรวรรดิไม่ได้สร้างในคืนเดียว — <strong>แต่วางรากฐานในวันนี้</strong>",
  "เงินคือเครื่องมือ — <strong>ผู้ควบคุมเครื่องมือคือจักรพรรดิ์</strong>",
  "ข้อมูลคือทอง — <strong>ผู้อ่านข้อมูลคือผู้ชนะ</strong>",
];

function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  function getCtx() {
    if (!ctxRef.current) {
      const AC = (window as typeof window & { webkitAudioContext?: typeof AudioContext }).AudioContext
        || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }
  function bootSound() {
    try {
      const c = getCtx(); if (!c) return;
      const now = c.currentTime;
      // Sweep
      const sw = c.createOscillator(), swE = c.createGain();
      sw.type = "triangle";
      sw.frequency.setValueAtTime(200, now + 0.1);
      sw.frequency.exponentialRampToValueAtTime(2400, now + 0.8);
      swE.gain.setValueAtTime(0, now + 0.1);
      swE.gain.linearRampToValueAtTime(0.3, now + 0.2);
      swE.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      sw.connect(swE); swE.connect(c.destination);
      sw.start(now + 0.1); sw.stop(now + 0.9);
      // Ping
      const ping = c.createOscillator(), pingE = c.createGain();
      ping.type = "sine"; ping.frequency.setValueAtTime(3200, now + 0.8);
      ping.frequency.exponentialRampToValueAtTime(1800, now + 1.1);
      pingE.gain.setValueAtTime(0, now + 0.8);
      pingE.gain.linearRampToValueAtTime(0.28, now + 0.82);
      pingE.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      ping.connect(pingE); pingE.connect(c.destination);
      ping.start(now + 0.8); ping.stop(now + 1.25);
    } catch (_) {}
  }
  function clickSound() {
    try {
      const c = getCtx(); if (!c) return;
      const now = c.currentTime;
      const osc = c.createOscillator(), env = c.createGain();
      osc.type = "square"; osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.4, now + 0.003);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(env); env.connect(c.destination);
      osc.start(now); osc.stop(now + 0.09);
    } catch (_) {}
  }
  return { bootSound, clickSound };
}

interface Props { onEnter: () => void }

export default function EntryGate({ onEnter }: Props) {
  const [bootLines, setBootLines] = useState<{ text: string; cls: string }[]>([]);
  const [quoteHtml, setQuoteHtml] = useState("");
  const [showCta, setShowCta] = useState(false);
  const [exiting, setExiting] = useState(false);
  const { bootSound, clickSound } = useAudio();

  // Boot sequence
  useEffect(() => {
    bootSound();
    BOOT_LINES.forEach(({ text, cls }, i) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, { text, cls }]);
      }, 300 + i * 220);
    });
    const quoteIdx = Math.floor(Math.random() * QUOTES.length);
    setTimeout(() => setQuoteHtml(QUOTES[quoteIdx]), 300 + BOOT_LINES.length * 220 + 100);
    setTimeout(() => setShowCta(true), 300 + BOOT_LINES.length * 220 + 600);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEnter() {
    clickSound();
    setExiting(true);
    setTimeout(onEnter, 600);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 px-6 transition-opacity duration-500 ${exiting ? "opacity-0" : "opacity-100"}`}
      style={{ paddingBottom: "8vh", background: "#03040a" }}
    >
      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 neon-grid" />
      <div className="pointer-events-none fixed inset-0 scanlines opacity-40" />
      <div className="pointer-events-none fixed inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(3,4,10,0.88) 75%, #03040a 100%)" }} />

      {/* Boot terminal */}
      <div
        className="w-full max-w-md border-l-2 border-[#00ffe7] pl-3"
        style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", lineHeight: 1.65, color: "#00ffe7", textShadow: "0 0 8px rgba(0,255,231,0.4)", animation: "bootFlicker 0.8s ease-in-out 1" }}
      >
        {bootLines.map((l, i) => (
          <span key={i} className={`block ${l.cls}`}>{l.text}</span>
        ))}
      </div>

      {/* Rings + coin */}
      <div className="relative flex items-center justify-center" style={{ width: "clamp(160px,36vw,280px)", height: "clamp(160px,36vw,280px)" }}>
        {/* Ring 1 — neon cyan */}
        <div className="absolute inset-0 rounded-full" style={{ border: "1px solid transparent", borderTopColor: "#00ffe7", borderRightColor: "rgba(0,255,231,0.3)", animation: "orbSpin 18s linear infinite", boxShadow: "0 0 14px rgba(0,255,231,0.1)" }} />
        {/* Ring 2 — magenta */}
        <div className="absolute rounded-full" style={{ inset: "10%", border: "1px solid transparent", borderBottomColor: "#ff2a6d", borderLeftColor: "rgba(255,42,109,0.3)", animation: "orbSpin 9s linear infinite reverse" }} />
        {/* Ring 3 — gold dashed */}
        <div className="absolute rounded-full" style={{ inset: "21%", border: "1px dashed rgba(232,184,75,0.3)", animation: "orbSpin 6s linear infinite" }} />
        {/* Ring 4 — inner cyan */}
        <div className="absolute rounded-full" style={{ inset: "32%", border: "1px solid transparent", borderTopColor: "rgba(0,255,231,0.6)", borderBottomColor: "rgba(0,255,231,0.6)", animation: "orbSpin 14s linear infinite reverse" }} />
        {/* Coin */}
        <div className="relative z-10 flex items-center justify-center rounded-full" style={{ width: "clamp(64px,15vw,88px)", height: "clamp(64px,15vw,88px)", background: "radial-gradient(circle,#060d14 0%,#03040a 100%)", border: "2px solid #00ffe7", animation: "coinSpin 4s ease-in-out infinite", filter: "drop-shadow(0 0 14px rgba(0,255,231,0.4))", fontFamily: "'Cinzel',serif", fontSize: "clamp(1.6rem,5vw,2.4rem)", color: "#00ffe7", textShadow: "0 0 16px #00ffe7" }}>
          ₮
        </div>
      </div>

      {/* Quote */}
      {quoteHtml && (
        <p
          className="text-center max-w-lg"
          style={{ fontFamily: "'Kanit',sans-serif", fontWeight: 300, fontSize: "clamp(0.85rem,2.2vw,1.1rem)", lineHeight: 1.65, color: "rgba(232,234,246,0.9)", animation: "panelRise 0.5s ease both" }}
          dangerouslySetInnerHTML={{ __html: quoteHtml.replace(/<strong>/g, '<strong style="font-weight:600;background:linear-gradient(135deg,#BF953F,#FCF6BA,#B38728);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">').replace(/<\/strong>/g, "</strong>") }}
        />
      )}

      {/* CTA */}
      {showCta && (
        <button
          onClick={handleEnter}
          className="relative flex items-center gap-4 cursor-pointer"
          style={{
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            color: "#00ffe7",
            background: "rgba(0,255,231,0.04)",
            border: "1px solid rgba(0,255,231,0.5)",
            borderRadius: "2px",
            padding: "14px 40px",
            textTransform: "uppercase",
            clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
            boxShadow: "0 0 14px rgba(0,255,231,0.1)",
            animation: "panelRise 0.4s ease both",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "#00ffe7";
            el.style.color = "#03040a";
            el.style.boxShadow = "0 0 30px rgba(0,255,231,0.5)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "rgba(0,255,231,0.04)";
            el.style.color = "#00ffe7";
            el.style.boxShadow = "0 0 14px rgba(0,255,231,0.1)";
          }}
        >
          <span>ENTER COMMAND CENTER</span>
          <span style={{ display: "inline-block", width: 20, height: 1, background: "currentColor", position: "relative" }}>
            <span style={{ position: "absolute", right: 0, top: -3, width: 7, height: 7, borderRight: "1px solid currentColor", borderTop: "1px solid currentColor", transform: "rotate(45deg)" }} />
          </span>
        </button>
      )}
    </div>
  );
}
