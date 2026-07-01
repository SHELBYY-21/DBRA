"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Bell } from "lucide-react";

/* ── Particle system ── */
interface Particle {
  x: number; y: number; vx: number; vy: number; r: number; a: number; life: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: Particle[] = [];

    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawn() {
      particles.push({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random(),
        life: Math.random() * 120 + 60,
      });
    }
    for (let i = 0; i < 60; i++) spawn();

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life--;
        p.a = p.life > 30 ? Math.min(p.a + 0.02, 0.7) : p.a * 0.95;
        if (p.life <= 0) { particles.splice(i, 1); spawn(); continue; }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(216,180,107,${p.a * 0.6})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
}

/* ── Audio hook ── */
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
  const bootSound = useCallback(() => {
    try {
      const c = getCtx(); if (!c) return;
      const now = c.currentTime;
      const osc = c.createOscillator(); const env = c.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now); osc.frequency.exponentialRampToValueAtTime(880, now + 0.6);
      env.gain.setValueAtTime(0, now); env.gain.linearRampToValueAtTime(0.25, now + 0.05);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(env); env.connect(c.destination);
      osc.start(now); osc.stop(now + 0.85);
    } catch (_) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const clickSound = useCallback(() => {
    try {
      const c = getCtx(); if (!c) return;
      const now = c.currentTime;
      const osc = c.createOscillator(); const env = c.createGain();
      osc.type = "sine"; osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);
      env.gain.setValueAtTime(0, now); env.gain.linearRampToValueAtTime(0.3, now + 0.005);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(env); env.connect(c.destination);
      osc.start(now); osc.stop(now + 0.1);
    } catch (_) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { bootSound, clickSound };
}

/* ── HUD rings ── */
function HudRings({ children }: { children: React.ReactNode }) {
  return (
    <div className="hud-rings" style={{ width: 260, height: 260 }}>
      {/* Outermost ring — slow cyan pulse */}
      <div className="hud-ring" style={{
        inset: 0,
        border: "1px solid rgba(0,217,255,0.25)",
        animation: "cyanRingPulse 3s ease-in-out infinite",
      }} />
      {/* Ring 2 — rotating dashes */}
      <div className="hud-ring" style={{
        inset: "10%",
        border: "1px dashed rgba(216,180,107,0.2)",
        animation: "ringRotate 20s linear infinite",
      }} />
      {/* Ring 3 — cyan arc */}
      <div className="hud-ring" style={{
        inset: "20%",
        borderTopColor: "#00D9FF",
        borderRightColor: "rgba(0,217,255,0.2)",
        borderBottomColor: "transparent",
        borderLeftColor: "rgba(0,217,255,0.2)",
        borderWidth: "1px",
        animation: "ringRotate 8s linear infinite",
        boxShadow: "0 0 14px rgba(0,217,255,0.15)",
      }} />
      {/* Ring 4 — gold arc reverse */}
      <div className="hud-ring" style={{
        inset: "30%",
        borderTopColor: "transparent",
        borderRightColor: "#D8B46B",
        borderBottomColor: "rgba(216,180,107,0.2)",
        borderLeftColor: "transparent",
        borderWidth: "1px",
        animation: "ringRotateRev 12s linear infinite",
      }} />
      {/* Inner glow ring */}
      <div className="hud-ring" style={{
        inset: "38%",
        border: "1px solid rgba(0,217,255,0.4)",
        animation: "cyanRingPulse 2s ease-in-out infinite 0.5s",
        boxShadow: "0 0 20px rgba(0,217,255,0.2), inset 0 0 20px rgba(0,217,255,0.1)",
      }} />
      {/* Center emblem */}
      <div style={{
        position: "relative", zIndex: 10,
        animation: "emblemFloat 5s ease-in-out infinite",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── CE Emblem ── */
function CEEmblem() {
  return (
    <div style={{
      width: 88, height: 88,
      borderRadius: "50%",
      background: "radial-gradient(circle at 35% 30%, #FFD77B, #D8B46B 40%, #AA771C 80%)",
      border: "2px solid rgba(255,215,123,0.6)",
      boxShadow: "0 0 32px rgba(216,180,107,0.55), 0 0 0 6px rgba(216,180,107,0.1), inset 0 2px 0 rgba(255,255,255,0.3)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      animation: "glowPulse 3s ease-in-out infinite",
    }}>
      {/* Crown */}
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none" style={{ marginBottom: 2 }}>
        <path d="M1 13L4 4L8 9L11 1L14 9L18 4L21 13H1Z"
          fill="rgba(3,6,13,0.5)" stroke="rgba(3,6,13,0.8)" strokeWidth="0.6" />
      </svg>
      {/* C.E. */}
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.4rem", fontWeight: 700,
        color: "rgba(3,6,13,0.9)",
        letterSpacing: "0.05em",
        lineHeight: 1,
        textShadow: "0 1px 0 rgba(255,255,255,0.3)",
      }}>C.E.</span>
    </div>
  );
}

interface Props { onEnter: () => void }

export default function EntryGate({ onEnter }: Props) {
  const [phase, setPhase] = useState<"loading" | "ready" | "exiting">("loading");
  const [progress, setProgress] = useState(0);
  const [ripple, setRipple] = useState(false);
  const { bootSound, clickSound } = useAudio();

  useEffect(() => {
    bootSound();
    const start = Date.now();
    const duration = 2200;
    let raf: number;
    function tick() {
      const p = Math.min((Date.now() - start) / duration, 1);
      setProgress(p);
      if (p < 1) { raf = requestAnimationFrame(tick); }
      else { setTimeout(() => setPhase("ready"), 200); }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEnter() {
    clickSound();
    setRipple(true);
    setPhase("exiting");
    setTimeout(onEnter, 650);
  }

  const pct = Math.round(progress * 100);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: "#03060D",
        opacity: phase === "exiting" ? 0 : 1,
        transition: "opacity 0.6s ease",
        overflow: "hidden",
      }}
    >
      <ParticleCanvas />

      {/* Ambient radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(216,180,107,0.06) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(0,217,255,0.04) 0%, transparent 60%)",
      }} />

      {/* Content */}
      <div
        className="relative flex flex-col items-center gap-6"
        style={{ zIndex: 1, width: "min(430px, 100vw)", padding: "0 24px" }}
      >
        {/* Brand name */}
        <div className="flex flex-col items-center gap-1" style={{ animation: "fadeUp 0.6s ease both" }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem,8vw,2.8rem)",
            fontWeight: 700,
            letterSpacing: "0.25em",
            lineHeight: 1,
          }} className="gold-text">
            C.E. EMPIRE
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.3)",
          }}>
            BUILD &bull; GROW &bull; EMPOWER
          </div>
        </div>

        {/* HUD rings + emblem */}
        <div style={{ animation: "scaleIn 0.7s ease 0.2s both" }}>
          <HudRings>
            <CEEmblem />
          </HudRings>
        </div>

        {/* Thai welcome */}
        <div className="flex flex-col items-center gap-1" style={{ animation: "fadeUp 0.6s ease 0.4s both", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Sarabun', sans-serif",
            fontSize: "1rem",
            fontWeight: 300,
            color: "rgba(240,242,245,0.6)",
            letterSpacing: "0.04em",
          }}>
            ยินดีต้อนรับกลับ
          </p>
          <p style={{
            fontFamily: "'Sarabun', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 300,
            color: "rgba(240,242,245,0.35)",
            letterSpacing: "0.02em",
          }}>
            สร้าง &bull; เติบโต &bull; เสริมพลัง ไปด้วยกัน
          </p>
        </div>

        {/* Loading / Enter */}
        <div className="w-full flex flex-col items-center gap-4" style={{ animation: "fadeUp 0.6s ease 0.5s both" }}>
          {phase === "loading" && (
            <>
              {/* Progress bar */}
              <div style={{
                width: "100%", height: 2,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 2, overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #D8B46B, #FFD77B)",
                  borderRadius: 2,
                  boxShadow: "0 0 10px rgba(216,180,107,0.6)",
                  transition: "width 0.08s linear",
                }} />
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(216,180,107,0.6)",
                letterSpacing: "0.1em",
              }}>
                INITIALIZING {pct}%
              </div>
            </>
          )}

          {phase === "ready" && (
            <button
              onClick={handleEnter}
              className="relative overflow-hidden"
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 16,
                background: "linear-gradient(135deg, rgba(216,180,107,0.15), rgba(216,180,107,0.08))",
                border: "1px solid rgba(216,180,107,0.4)",
                color: "#D8B46B",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                cursor: "pointer",
                boxShadow: "0 0 24px rgba(216,180,107,0.15)",
                animation: "scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg,rgba(216,180,107,0.25),rgba(216,180,107,0.12))";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(216,180,107,0.35)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg,rgba(216,180,107,0.15),rgba(216,180,107,0.08))";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(216,180,107,0.15)";
              }}
            >
              {ripple && (
                <span style={{
                  position: "absolute", inset: 0, borderRadius: 16,
                  background: "rgba(216,180,107,0.2)",
                  animation: "ripple 0.6s ease forwards",
                }} />
              )}
              ENTER EMPIRE
            </button>
          )}
        </div>

        {/* Status dots */}
        <div className="flex items-center gap-4" style={{ animation: "fadeUp 0.6s ease 0.7s both" }}>
          {[
            { label: "VAULT", ok: true },
            { label: "AI", ok: true },
            { label: "SYNC", ok: phase !== "loading" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: s.ok ? "#37D67A" : "#FFB648",
                boxShadow: s.ok ? "0 0 6px #37D67A" : "0 0 6px #FFB648",
                display: "inline-block",
              }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.1em",
              }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Notification bell hint */}
        <div className="flex items-center gap-2" style={{
          animation: "fadeUp 0.6s ease 0.9s both",
          opacity: 0.35,
        }}>
          <Bell size={11} color="#D8B46B" />
          <span style={{
            fontFamily: "'Sarabun', sans-serif",
            fontSize: "0.7rem",
            color: "rgba(216,180,107,0.7)",
          }}>มีการแจ้งเตือน 3 รายการ</span>
        </div>
      </div>
    </div>
  );
}
