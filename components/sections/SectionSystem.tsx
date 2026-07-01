"use client";

import { useEffect, useState } from "react";
import { Cpu, Server, Wifi, HardDrive, ShieldCheck, AlertTriangle } from "lucide-react";
import { Section, SectionHeader, GlassCard, Badge } from "@/components/ui";

function usePulse(base: number, variance: number, interval = 2000) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    const id = setInterval(
      () => setVal(Math.min(99, Math.max(1, base + Math.floor(Math.random() * variance * 2) - variance))),
      interval
    );
    return () => clearInterval(id);
  }, [base, variance, interval]);
  return val;
}

function GaugeBar({ val, color }: { val: number; color: string }) {
  return (
    <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
      <div style={{
        height: "100%",
        width: `${Math.min(val, 100)}%`,
        background: color,
        borderRadius: 2,
        boxShadow: `0 0 8px ${color}66`,
        transition: "width 0.6s ease",
      }} />
    </div>
  );
}

const NODES = [
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
  { time: "08:52:00", level: "ERROR", msg: "TX-8836 failed — rolled back" },
];

const LOG_COLOR: Record<string, string> = {
  INFO:  "#00D9FF",
  WARN:  "#FFB648",
  ERROR: "#FF5C5C",
};

export default function SectionSystem() {
  const cpu  = usePulse(42, 15, 1800);
  const mem  = usePulse(67, 8,  2500);
  const net  = usePulse(88, 10, 2000);
  const disk = usePulse(34, 3,  5000);

  const gauges = [
    { label: "CPU",     icon: <Cpu size={14} />,       val: cpu,  color: cpu > 80 ? "#FF5C5C" : "#00D9FF" },
    { label: "Memory",  icon: <Server size={14} />,    val: mem,  color: mem > 85 ? "#FFB648" : "#D8B46B" },
    { label: "Network", icon: <Wifi size={14} />,      val: net,  color: "#37D67A" },
    { label: "Disk",    icon: <HardDrive size={14} />, val: disk, color: "#FFB648" },
  ];

  return (
    <Section>
      <SectionHeader title="System" sub="CE EMPIRE // INFRASTRUCTURE" />

      {/* Resource gauges */}
      <div className="grid grid-cols-2 gap-3">
        {gauges.map(g => (
          <GlassCard key={g.label} style={{ padding: "16px" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
              <div className="flex items-center gap-2" style={{ color: g.color }}>
                {g.icon}
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)" }}>
                  {g.label}
                </span>
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "1.2rem", fontWeight: 700,
                color: g.color,
                textShadow: `0 0 12px ${g.color}66`,
              }}>{g.val}%</span>
            </div>
            <GaugeBar val={g.val} color={g.color} />
          </GlassCard>
        ))}
      </div>

      {/* Node status */}
      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
          <Server size={14} color="#D8B46B" />
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>
            Node Status
          </span>
          <Badge text={`${NODES.filter(n => n.status === "ONLINE").length} Online`} color="success" dot />
        </div>
        <div className="flex flex-col gap-2">
          {NODES.map(n => (
            <div key={n.name} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 12px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div className="flex items-center gap-3">
                <span style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: n.status === "ONLINE" ? "#37D67A" : "#FFB648",
                  boxShadow: `0 0 6px ${n.status === "ONLINE" ? "#37D67A" : "#FFB648"}`,
                }} />
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem", fontWeight: 700, color: "#F0F2F5" }}>
                    {n.name}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)" }}>
                    {n.ip}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)" }}>PING</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", fontWeight: 700,
                    color: n.ping < 20 ? "#37D67A" : n.ping < 40 ? "#FFB648" : "#FF5C5C",
                  }}>{n.ping}ms</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)" }}>LOAD</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", fontWeight: 700, color: "#D8B46B" }}>
                    {n.load}%
                  </div>
                </div>
                <Badge text={n.status} color={n.status === "ONLINE" ? "success" : "warning"} dot />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* System log */}
      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
          <AlertTriangle size={14} color="#FFB648" />
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>
            System Log
          </span>
        </div>
        <div className="flex flex-col">
          {LOGS.map((l, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: "10px 0",
              borderBottom: i < LOGS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", color: "rgba(255,255,255,0.2)", flexShrink: 0, paddingTop: 1 }}>{l.time}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", fontWeight: 700, color: LOG_COLOR[l.level], flexShrink: 0, letterSpacing: "0.06em" }}>[{l.level}]</span>
              <span style={{ fontFamily: "'Sarabun',sans-serif", fontSize: "0.8rem", color: "rgba(240,242,245,0.6)" }}>{l.msg}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Security layer */}
      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
          <ShieldCheck size={14} color="#37D67A" />
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>
            Security
          </span>
          <Badge text="ALL CLEAR" color="success" dot />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Encryption",  value: "SHA-256" },
            { label: "Firewall",    value: "ACTIVE"  },
            { label: "Auth Tokens", value: "VALID"   },
            { label: "Last Audit",  value: "2h ago"  },
          ].map(s => (
            <div key={s.label} style={{
              padding: "10px 12px", borderRadius: 14,
              background: "rgba(55,214,122,0.04)",
              border: "1px solid rgba(55,214,122,0.1)",
            }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.78rem", fontWeight: 700, color: "#37D67A" }}>{s.value}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
