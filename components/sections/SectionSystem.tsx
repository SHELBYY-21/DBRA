"use client";

import { useEffect, useState } from "react";
import { Section, SectionHeader, GlassCard, Badge } from "@/components/ui";
import { Cpu, Server, Wifi, Lock, AlertTriangle, CheckCircle } from "lucide-react";

function usePulse(base: number, variance: number, interval = 2000) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    const id = setInterval(() => setVal(base + Math.floor(Math.random() * variance * 2) - variance), interval);
    return () => clearInterval(id);
  }, [base, variance, interval]);
  return val;
}

export default function SectionSystem() {
  const cpu   = usePulse(42, 15, 1800);
  const mem   = usePulse(67, 8, 2500);
  const net   = usePulse(88, 10, 2000);
  const disk  = usePulse(34, 3, 5000);

  const nodes = [
    { name: "APEX-NODE-01", ip: "10.0.0.1",  status: "ONLINE",  ping: 8,  load: 42 },
    { name: "APEX-NODE-02", ip: "10.0.0.2",  status: "ONLINE",  ping: 12, load: 58 },
    { name: "APEX-NODE-03", ip: "10.0.0.3",  status: "STANDBY", ping: 22, load: 15 },
    { name: "HK-RELAY-01",  ip: "10.0.1.10", status: "ONLINE",  ping: 31, load: 71 },
  ];

  const LOGS = [
    { time: "09:14:22", level: "INFO",  msg: "Heartbeat OK — all nodes responding" },
    { time: "09:12:01", level: "INFO",  msg: "SHA-256 key rotation completed" },
    { time: "09:08:44", level: "WARN",  msg: "HK-RELAY-01 latency spike 31ms" },
    { time: "09:05:20", level: "INFO",  msg: "Auto-backup checkpoint saved" },
    { time: "08:58:55", level: "INFO",  msg: "Firewall rules updated — OK" },
    { time: "08:52:00", level: "ERROR", msg: "TX-8836 failed — rolled back" },
  ];

  const levelColor: Record<string, string> = { INFO: "#00ffe7", WARN: "#e8b84b", ERROR: "#ff2a6d" };

  function bar(pct: number, color: string) {
    return (
      <div style={{ height: 4, background: "rgba(74,80,104,0.25)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 2, boxShadow: `0 0 6px ${color}`, transition: "width 0.5s ease" }} />
      </div>
    );
  }

  return (
    <Section>
      <SectionHeader title="System Monitor" sub="CE EMPIRE // Infrastructure Status" />

      {/* Resource gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "CPU", icon: <Cpu size={12} />, val: cpu,  color: cpu > 80 ? "#ff2a6d" : "#00ffe7" },
          { label: "Memory", icon: <Server size={12} />, val: mem,  color: mem > 85 ? "#e8b84b" : "#00ffe7" },
          { label: "Network", icon: <Wifi size={12} />, val: net,  color: "#00ff88" },
          { label: "Disk", icon: <Lock size={12} />, val: disk, color: "#e8b84b" },
        ].map(g => (
          <GlassCard key={g.label} className="p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5" style={{ color: g.color }}>
                {g.icon}
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.1em" }}>{g.label}</span>
              </span>
              <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.9rem", fontWeight: 700, color: g.color, textShadow: `0 0 8px ${g.color}50` }}>{g.val}%</span>
            </div>
            {bar(g.val, g.color)}
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Nodes */}
        <GlassCard className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Server size={13} style={{ color: "#00ffe7" }} />
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>NODE STATUS</span>
          </div>
          <div className="flex flex-col gap-2">
            {nodes.map(n => (
              <div key={n.name} className="flex items-center justify-between p-2" style={{ borderRadius: 4, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(0,255,231,0.06)" }}>
                <div className="flex items-center gap-2">
                  <span className={`led ${n.status === "ONLINE" ? "led-neon" : "led-gold"}`} style={{ width: 5, height: 5 }} />
                  <div>
                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: "#e8eaf6", letterSpacing: "0.08em" }}>{n.name}</div>
                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.46rem", color: "#4a5068" }}>{n.ip}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "#4a5068" }}>PING</div>
                    <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.6rem", color: n.ping < 20 ? "#00ff88" : n.ping < 40 ? "#e8b84b" : "#ff2a6d" }}>{n.ping}ms</div>
                  </div>
                  <div className="text-right">
                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "#4a5068" }}>LOAD</div>
                    <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.6rem", color: "#00ffe7" }}>{n.load}%</div>
                  </div>
                  <Badge text={n.status} color={n.status === "ONLINE" ? "neon" : "gold"} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* System log */}
        <GlassCard className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={13} style={{ color: "#e8b84b" }} />
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#e8b84b", letterSpacing: "0.1em" }}>SYSTEM LOG</span>
          </div>
          <div className="flex flex-col">
            {LOGS.map((l, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5" style={{ borderBottom: i < LOGS.length - 1 ? "1px solid rgba(0,255,231,0.05)" : "none" }}>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: "rgba(0,255,231,0.35)", flexShrink: 0, marginTop: 1 }}>{l.time}</span>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: levelColor[l.level], flexShrink: 0, letterSpacing: "0.06em" }}>[{l.level}]</span>
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: l.level === "ERROR" ? "rgba(255,42,109,0.8)" : l.level === "WARN" ? "rgba(232,184,75,0.7)" : "rgba(232,234,246,0.6)" }}>{l.msg}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Security status */}
      <GlassCard className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={13} style={{ color: "#00ff88" }} />
          <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ff88", letterSpacing: "0.1em" }}>SECURITY LAYER</span>
          <Badge text="ALL CLEAR" color="green" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Encryption", value: "SHA-256", ok: true },
            { label: "Firewall", value: "ACTIVE", ok: true },
            { label: "Auth Tokens", value: "VALID", ok: true },
            { label: "Last Audit", value: "2h ago", ok: true },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: "#4a5068", letterSpacing: "0.1em" }}>{s.label}</span>
              <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.65rem", fontWeight: 700, color: "#00ff88" }}>{s.value}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
