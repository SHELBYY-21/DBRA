"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/* ─── Section wrapper ─── */
export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {children}
    </div>
  );
}

/* ─── Section header ─── */
export function SectionHeader({
  title, sub, children,
}: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-3" style={{ marginBottom: 2 }}>
      <div>
        <h1 className="section-title gold-text">{title}</h1>
        {sub && (
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.58rem",
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.12em",
            marginTop: 3,
          }}>{sub}</div>
        )}
      </div>
      {children}
    </div>
  );
}

/* ─── Glass card ─── */
export function GlassCard({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`lux-card ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ─── Stat card (2-col grid) ─── */
interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  pct?: number;
  color?: "gold" | "cyan" | "success" | "danger" | "warning";
  icon?: ReactNode;
}

const STAT_COLORS = {
  gold:    { main: "#D8B46B", hi: "#FFD77B", dim: "rgba(216,180,107,0.12)", glow: "rgba(216,180,107,0.3)" },
  cyan:    { main: "#00D9FF", hi: "#00D9FF", dim: "rgba(0,217,255,0.1)",    glow: "rgba(0,217,255,0.3)" },
  success: { main: "#37D67A", hi: "#37D67A", dim: "rgba(55,214,122,0.1)",   glow: "rgba(55,214,122,0.3)" },
  danger:  { main: "#FF5C5C", hi: "#FF5C5C", dim: "rgba(255,92,92,0.1)",   glow: "rgba(255,92,92,0.3)" },
  warning: { main: "#FFB648", hi: "#FFB648", dim: "rgba(255,182,72,0.1)",   glow: "rgba(255,182,72,0.3)" },
};

export function StatCard({ label, value, sub, pct, color = "gold", icon }: StatCardProps) {
  const c = STAT_COLORS[color];
  const [displayed, setDisplayed] = useState("0");
  const mounted = useRef(false);

  // Animate numeric values on mount
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num) || num === 0) { setDisplayed(value); return; }
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
    const suffix = value.match(/[^0-9.]*$/)?.[0] ?? "";
    let start = 0;
    const duration = 1000;
    const startTime = Date.now();
    function tick() {
      const p = Math.min((Date.now() - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      start = num * ease;
      setDisplayed(`${prefix}${Number.isInteger(num) ? Math.round(start).toLocaleString() : start.toFixed(1)}${suffix}`);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplayed(value);
    }
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <div className="stat-card" style={{ animation: "fadeUp 0.4s ease both" }}>
      {/* Icon circle */}
      <div className="icon-circle" style={{ background: c.dim, borderColor: `${c.main}22` }}>
        <div style={{ color: c.main }}>{icon}</div>
      </div>

      {/* Value */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "1.5rem", fontWeight: 700,
        color: c.hi,
        textShadow: `0 0 20px ${c.glow}`,
        letterSpacing: "-0.01em",
        lineHeight: 1,
        animation: "countUp 0.6s ease both",
      }}>
        {displayed}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'Sarabun', sans-serif",
        fontSize: "0.75rem", fontWeight: 400,
        color: "rgba(255,255,255,0.45)",
      }}>{label}</div>

      {/* Sub + progress */}
      {sub && (
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          color: c.main,
          letterSpacing: "0.04em",
        }}>{sub}</div>
      )}
      {pct !== undefined && (
        <div className="prog-bar" style={{ marginTop: 4 }}>
          <div className="prog-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c.main}, ${c.hi})`, boxShadow: `0 0 8px ${c.glow}` }} />
        </div>
      )}
    </div>
  );
}

/* ─── Badge ─── */
type BadgeColor = "gold" | "cyan" | "success" | "danger" | "warning" | "dim";
const BADGE_COLORS: Record<BadgeColor, { bg: string; border: string; text: string }> = {
  gold:    { bg: "rgba(216,180,107,0.12)", border: "rgba(216,180,107,0.3)", text: "#D8B46B" },
  cyan:    { bg: "rgba(0,217,255,0.1)",    border: "rgba(0,217,255,0.3)",   text: "#00D9FF" },
  success: { bg: "rgba(55,214,122,0.1)",   border: "rgba(55,214,122,0.3)",  text: "#37D67A" },
  danger:  { bg: "rgba(255,92,92,0.1)",    border: "rgba(255,92,92,0.3)",   text: "#FF5C5C" },
  warning: { bg: "rgba(255,182,72,0.1)",   border: "rgba(255,182,72,0.3)",  text: "#FFB648" },
  dim:     { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", text: "rgba(255,255,255,0.4)" },
};

export function Badge({ text, color = "gold", dot }: { text: string; color?: BadgeColor; dot?: boolean }) {
  const c = BADGE_COLORS[color];
  return (
    <span className="lux-badge" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.text, boxShadow: `0 0 5px ${c.text}`, flexShrink: 0 }} />}
      {text}
    </span>
  );
}

/* ─── Divider ─── */
export function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 1 }} />;
}

/* ─── Toast hook ─── */
export function useToast() {
  const [toast, setToast] = useState<{ msg: string; color?: BadgeColor } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show(msg: string, color: BadgeColor = "gold") {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ msg, color });
    timerRef.current = setTimeout(() => setToast(null), 2500);
  }

  const ToastEl = toast ? (
    <div className="lux-toast" style={{
      borderColor: BADGE_COLORS[toast.color ?? "gold"].border,
      color: BADGE_COLORS[toast.color ?? "gold"].text,
    }}>
      {toast.msg}
    </div>
  ) : null;

  return { show, ToastEl };
}
