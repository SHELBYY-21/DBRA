"use client";

import { ReactNode } from "react";

/* ── Section wrapper ── */
export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`panel-rise flex flex-col gap-5 ${className}`}>
      {children}
    </div>
  );
}

/* ── Section header ── */
export function SectionHeader({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1
          style={{
            fontFamily: "'Cinzel','Kanit',serif",
            fontSize: "1.15rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            background: "linear-gradient(135deg,#ffffff 0%,#e8eaf6 35%,#00ffe7 70%,#e8b84b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "titleGlitch 7s ease-in-out infinite",
          }}
        >
          {title}
        </h1>
        {sub && (
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: "rgba(0,255,231,0.45)", letterSpacing: "0.14em", marginTop: 2 }}>
            {sub}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

/* ── Stat card ── */
interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  color?: "neon" | "gold" | "magenta" | "green" | "dim";
  blink?: boolean;
}
const colorMap: Record<string, string> = {
  neon:    "#00ffe7",
  gold:    "#e8b84b",
  magenta: "#ff2a6d",
  green:   "#00ff88",
  dim:     "#4a5068",
};

export function StatCard({ label, value, sub, color = "neon", blink = false }: StatCardProps) {
  return (
    <div className="glass relative flex flex-col gap-1 p-4" style={{ borderRadius: 6 }}>
      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.54rem", color: "rgba(74,80,104,0.9)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Orbitron',sans-serif",
          fontSize: "1.3rem",
          fontWeight: 700,
          color: colorMap[color] ?? colorMap.neon,
          textShadow: `0 0 12px ${colorMap[color]}40`,
          letterSpacing: "0.04em",
          animation: blink ? "valueFlash 0.4s ease" : undefined,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "rgba(74,80,104,0.7)", letterSpacing: "0.1em" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

/* ── Glass card ── */
export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass relative hud ${className}`} style={{ borderRadius: 6 }}>
      {children}
    </div>
  );
}

/* ── Badge ── */
export function Badge({ text, color = "neon" }: { text: string; color?: "neon" | "gold" | "magenta" | "green" }) {
  const bg: Record<string, string> = {
    neon:    "rgba(0,255,231,0.1)",
    gold:    "rgba(232,184,75,0.12)",
    magenta: "rgba(255,42,109,0.12)",
    green:   "rgba(0,255,136,0.1)",
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 3,
        border: `1px solid ${colorMap[color]}40`,
        background: bg[color],
        fontFamily: "'Share Tech Mono',monospace",
        fontSize: "0.5rem",
        letterSpacing: "0.1em",
        color: colorMap[color],
        textTransform: "uppercase",
      }}
    >
      {text}
    </span>
  );
}
