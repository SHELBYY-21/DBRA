"use client";

import { useState } from "react";
import { Users, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Section, SectionHeader, GlassCard, Badge, useToast } from "@/components/ui";

const INITIAL_AGENTS = [
  { id: 1, name: "Alpha",   code: "AGT-001", active: true,  capital: 420000, txn: 284, win: 87, region: "BKK" },
  { id: 2, name: "Beta",    code: "AGT-002", active: true,  capital: 310000, txn: 201, win: 79, region: "CNX" },
  { id: 3, name: "Gamma",   code: "AGT-003", active: false, capital: 180000, txn: 98,  win: 72, region: "HKG" },
  { id: 4, name: "Delta",   code: "AGT-004", active: true,  capital: 540000, txn: 342, win: 91, region: "SGP" },
  { id: 5, name: "Epsilon", code: "AGT-005", active: true,  capital: 220000, txn: 155, win: 68, region: "BKK" },
  { id: 6, name: "Zeta",    code: "AGT-006", active: false, capital: 95000,  txn: 44,  win: 61, region: "CNX" },
];

const INITIALS = ["A", "B", "G", "D", "E", "Z"];

function winColor(w: number) {
  return w >= 80 ? "#37D67A" : w >= 70 ? "#FFB648" : "#FF5C5C";
}

export default function SectionAgents() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const { show, ToastEl } = useToast();

  function toggle(id: number) {
    setAgents(prev => prev.map(a => {
      if (a.id !== id) return a;
      const next = { ...a, active: !a.active };
      show(`Agent ${a.name} — ${next.active ? "เปิดใช้งาน" : "ปิดใช้งาน"}`, next.active ? "success" : "danger");
      return next;
    }));
  }

  const activeCount  = agents.filter(a => a.active).length;
  const totalCapital = agents.filter(a => a.active).reduce((s, a) => s + a.capital, 0);

  return (
    <Section>
      {ToastEl}
      <SectionHeader title="ทีมงาน" sub="CE EMPIRE // AGENT MATRIX">
        <button
          className="glow-btn"
          style={{ display: "flex", alignItems: "center", gap: 6 }}
          onClick={() => show("เพิ่ม Agent — เร็ว ๆ นี้", "gold")}
        >
          <Plus size={12} />
          เพิ่ม Agent
        </button>
      </SectionHeader>

      {/* Summary row */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Agent ทั้งหมด", value: `${agents.length}`, sub: `${activeCount} ออนไลน์`, color: "gold" as const },
          { label: "Capital ออนไลน์", value: `฿${(totalCapital/1000).toFixed(0)}k`, sub: "ทั้งหมด", color: "cyan" as const },
        ].map(s => (
          <div key={s.label} className="lux-card" style={{ padding: "16px" }}>
            <div style={{
              fontFamily: "'Sarabun',sans-serif",
              fontSize: "0.72rem", color: "rgba(255,255,255,0.35)",
            }}>{s.label}</div>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "1.6rem", fontWeight: 700,
              color: s.color === "gold" ? "#D8B46B" : "#00D9FF",
              lineHeight: 1.1, marginTop: 4,
            }}>{s.value}</div>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.25)", marginTop: 3,
            }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Agent cards */}
      <div className="flex flex-col gap-3">
        {agents.map((agent, idx) => (
          <GlassCard key={agent.id} style={{ padding: "16px 18px" }}>
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="team-avatar" style={{
                width: 46, height: 46,
                borderColor: agent.active ? "rgba(216,180,107,0.4)" : "rgba(255,255,255,0.1)",
                opacity: agent.active ? 1 : 0.5,
                flexShrink: 0,
              }}>
                {INITIALS[idx]}
                {agent.active && <span className="online-dot" />}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex items-center gap-2">
                  <span style={{
                    fontFamily: "'Sarabun',sans-serif",
                    fontSize: "0.92rem", fontWeight: 600, color: "#F0F2F5",
                  }}>Agent {agent.name}</span>
                  <Badge
                    text={agent.active ? "ACTIVE" : "OFFLINE"}
                    color={agent.active ? "success" : "danger"}
                    dot
                  />
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.58rem",
                  color: "rgba(255,255,255,0.25)",
                  marginTop: 2,
                }}>{agent.code} &bull; {agent.region}</div>

                {/* Mini stats */}
                <div className="flex items-center gap-4" style={{ marginTop: 8 }}>
                  {[
                    { label: "Capital", value: `฿${(agent.capital/1000).toFixed(0)}k`, color: "#D8B46B" },
                    { label: "Txn",     value: `${agent.txn}`,                          color: "#00D9FF" },
                    { label: "Win",     value: `${agent.win}%`,                         color: winColor(agent.win) },
                  ].map(s => (
                    <div key={s.label}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)" }}>{s.label}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.78rem", fontWeight: 700, color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Win rate bar */}
                <div className="prog-bar" style={{ marginTop: 8 }}>
                  <div className="prog-fill" style={{
                    width: `${agent.win}%`,
                    background: winColor(agent.win),
                    boxShadow: `0 0 6px ${winColor(agent.win)}66`,
                  }} />
                </div>
              </div>

              {/* Toggle */}
              <div className="flex flex-col items-center gap-2" style={{ flexShrink: 0 }}>
                <button
                  onClick={() => toggle(agent.id)}
                  style={{
                    width: 40, height: 22, borderRadius: 11,
                    background: agent.active ? "rgba(55,214,122,0.15)" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${agent.active ? "rgba(55,214,122,0.4)" : "rgba(255,255,255,0.12)"}`,
                    cursor: "pointer", position: "relative", transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                  aria-label={agent.active ? "Deactivate" : "Activate"}
                >
                  <span style={{
                    position: "absolute", top: 3,
                    left: agent.active ? "calc(100% - 17px)" : 3,
                    width: 14, height: 14, borderRadius: "50%",
                    background: agent.active ? "#37D67A" : "rgba(255,255,255,0.3)",
                    boxShadow: agent.active ? "0 0 6px #37D67A" : "none",
                    transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                  }} />
                </button>
                {agent.win >= 80
                  ? <TrendingUp size={13} color="#37D67A" />
                  : <TrendingDown size={13} color="#FFB648" />
                }
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Quick stats footer */}
      <GlassCard style={{ padding: "14px 18px" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={14} color="#D8B46B" />
            <span style={{ fontFamily: "'Sarabun',sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>
              Win Rate เฉลี่ย
            </span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "1rem", fontWeight: 700, color: "#37D67A" }}>
            {Math.round(agents.reduce((s, a) => s + a.win, 0) / agents.length)}%
          </span>
        </div>
      </GlassCard>
    </Section>
  );
}
