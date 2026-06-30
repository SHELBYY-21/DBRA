"use client";

import { useEffect, useState } from "react";
import { Section, SectionHeader, StatCard, GlassCard, Badge } from "@/components/ui";
import { TrendingUp, Zap, ShieldCheck, Globe } from "lucide-react";

function randomBetween(a: number, b: number) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

const SYSTEM_STATS = [
  { label: "Core Engine", value: "ONLINE", color: "green" as const },
  { label: "DB Connection", value: "STABLE", color: "green" as const },
  { label: "API Gateway", value: "ACTIVE", color: "neon" as const },
  { label: "Encryption", value: "SHA-256", color: "gold" as const },
];

const ACTIVITY = [
  { time: "09:14:22", event: "Agent #7 ปิดธุรกรรม +฿84,000", type: "success" },
  { time: "09:12:05", event: "ระบบ sync USDT feed สำเร็จ", type: "info" },
  { time: "09:08:47", event: "Agent #3 เริ่ม session ใหม่", type: "info" },
  { time: "09:05:30", event: "Auth layer renew — OK", type: "success" },
  { time: "09:01:11", event: "Backup checkpoint บันทึกแล้ว", type: "info" },
];

export default function SectionOverview() {
  const [capital, setCapital] = useState(3241800);
  const [usdt, setUsdt] = useState(127420);
  const [agents, setAgents] = useState(12);
  const [online, setOnline] = useState(8);

  useEffect(() => {
    const id = setInterval(() => {
      setCapital(v => v + randomBetween(-5000, 15000));
      setUsdt(v => v + randomBetween(-200, 800));
      setOnline(randomBetween(6, agents));
    }, 3000);
    return () => clearInterval(id);
  }, [agents]);

  return (
    <Section>
      <SectionHeader title="ภาพรวม" sub="CE EMPIRE // System Status" />

      {/* Main stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="เงินทุนรวม" value={`฿${capital.toLocaleString()}`} sub="Capital Under Management" color="gold" />
        <StatCard label="USDT Balance" value={`$${usdt.toLocaleString()}`} sub="Stablecoin Reserve" color="neon" />
        <StatCard label="Agent ทั้งหมด" value={`${agents}`} sub={`${online} ACTIVE`} color="green" />
        <StatCard label="Transactions" value="1,284" sub="วันนี้ / Today" color="magenta" />
      </div>

      {/* Quick info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Performance */}
        <GlassCard className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} style={{ color: "#00ffe7" }} />
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>PERFORMANCE</span>
            <Badge text="Live" color="green" />
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "กำไรสัปดาห์นี้", value: "+฿214,000", pct: 72, color: "#00ff88" },
              { label: "กำไรเดือนนี้", value: "+฿841,200", pct: 88, color: "#00ffe7" },
              { label: "Win Rate", value: "83.4%", pct: 83, color: "#e8b84b" },
            ].map(row => (
              <div key={row.label}>
                <div className="flex justify-between mb-1" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem" }}>
                  <span style={{ color: "#4a5068" }}>{row.label}</span>
                  <span style={{ color: row.color }}>{row.value}</span>
                </div>
                <div style={{ height: 3, background: "rgba(74,80,104,0.3)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${row.pct}%`, background: row.color, borderRadius: 2, boxShadow: `0 0 6px ${row.color}` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* System monitor */}
        <GlassCard className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} style={{ color: "#00ffe7" }} />
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>SYSTEM MONITOR</span>
            <Badge text="Online" color="neon" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SYSTEM_STATS.map(s => (
              <div key={s.label} className="glass p-2.5 flex flex-col gap-0.5">
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "#4a5068", letterSpacing: "0.1em" }}>{s.label}</span>
                <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: s.color === "green" ? "#00ff88" : s.color === "neon" ? "#00ffe7" : "#e8b84b", letterSpacing: "0.06em" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Activity feed */}
      <GlassCard className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Zap size={14} style={{ color: "#e8b84b" }} />
          <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#e8b84b", letterSpacing: "0.1em" }}>RECENT ACTIVITY</span>
        </div>
        <div className="flex flex-col gap-0">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: i < ACTIVITY.length - 1 ? "1px solid rgba(0,255,231,0.06)" : "none" }}>
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: "rgba(0,255,231,0.4)", flexShrink: 0, marginTop: 1 }}>{a.time}</span>
              <span className="flex items-center gap-1.5">
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: a.type === "success" ? "#00ff88" : "#00ffe7", flexShrink: 0, boxShadow: `0 0 5px ${a.type === "success" ? "#00ff88" : "#00ffe7"}` }} />
                <span style={{ fontFamily: "'Kanit',sans-serif", fontSize: "0.7rem", fontWeight: 300, color: "#e8eaf6" }}>{a.event}</span>
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Globe decorative */}
      <div className="flex items-center gap-2 justify-end" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "rgba(0,255,231,0.3)", letterSpacing: "0.1em" }}>
        <Globe size={11} style={{ color: "rgba(0,255,231,0.3)" }} />
        NODE: ASIA-PACIFIC // PING: 12ms // STATUS: OPTIMAL
      </div>
    </Section>
  );
}
