"use client";

import { useState } from "react";
import { Section, SectionHeader, GlassCard, Badge } from "@/components/ui";
import { Users, TrendingUp, TrendingDown } from "lucide-react";

const INITIAL_AGENTS = [
  { id: 1, name: "Agent Alpha",  code: "AGT-001", active: true,  capital: "฿420,000", txn: 284, win: 87, region: "BKK" },
  { id: 2, name: "Agent Beta",   code: "AGT-002", active: true,  capital: "฿310,000", txn: 201, win: 79, region: "CNX" },
  { id: 3, name: "Agent Gamma",  code: "AGT-003", active: false, capital: "฿180,000", txn: 98,  win: 72, region: "HKG" },
  { id: 4, name: "Agent Delta",  code: "AGT-004", active: true,  capital: "฿540,000", txn: 342, win: 91, region: "SGP" },
  { id: 5, name: "Agent Epsilon",code: "AGT-005", active: true,  capital: "฿220,000", txn: 155, win: 68, region: "BKK" },
  { id: 6, name: "Agent Zeta",   code: "AGT-006", active: false, capital: "฿95,000",  txn: 44,  win: 61, region: "CNX" },
];

export default function SectionAgents() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);

  function toggle(id: number) {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  }

  const activeCount = agents.filter(a => a.active).length;
  const totalCapital = agents.filter(a => a.active).reduce((sum, a) => sum + parseInt(a.capital.replace(/[฿,]/g, "")), 0);

  return (
    <Section>
      <SectionHeader title="จัดการ Agents" sub="CE EMPIRE // Agent Matrix">
        <div className="flex items-center gap-3" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem" }}>
          <span style={{ color: "#4a5068" }}>ACTIVE</span>
          <span style={{ color: "#00ff88", fontWeight: 700 }}>{activeCount}/{agents.length}</span>
        </div>
      </SectionHeader>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Agents", value: `${agents.length}`, color: "#e8eaf6" },
          { label: "Active", value: `${activeCount}`, color: "#00ff88" },
          { label: "Inactive", value: `${agents.length - activeCount}`, color: "#ff2a6d" },
          { label: "Capital Active", value: `฿${totalCapital.toLocaleString()}`, color: "#e8b84b" },
        ].map(s => (
          <div key={s.label} className="glass p-3 flex flex-col gap-1">
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "#4a5068", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</span>
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: s.color, textShadow: `0 0 10px ${s.color}40` }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map(agent => (
          <GlassCard key={agent.id} className="p-4 flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: agent.active ? "rgba(0,255,231,0.08)" : "rgba(74,80,104,0.15)", border: `1px solid ${agent.active ? "rgba(0,255,231,0.3)" : "rgba(74,80,104,0.3)"}` }}>
                  <Users size={13} style={{ color: agent.active ? "#00ffe7" : "#4a5068" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: agent.active ? "#e8eaf6" : "#4a5068" }}>{agent.name}</div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: "#4a5068", letterSpacing: "0.1em" }}>{agent.code} · {agent.region}</div>
                </div>
              </div>
              {/* Toggle */}
              <button
                onClick={() => toggle(agent.id)}
                className="relative cursor-pointer flex-shrink-0"
                style={{
                  width: 36, height: 18, borderRadius: 9,
                  background: agent.active ? "rgba(0,255,231,0.15)" : "rgba(74,80,104,0.2)",
                  border: `1px solid ${agent.active ? "rgba(0,255,231,0.4)" : "rgba(74,80,104,0.3)"}`,
                  transition: "all 0.2s ease",
                  padding: 0,
                }}
                aria-label={agent.active ? "Deactivate" : "Activate"}
              >
                <span style={{
                  position: "absolute",
                  top: 2,
                  left: agent.active ? "calc(100% - 14px)" : 2,
                  width: 12, height: 12, borderRadius: "50%",
                  background: agent.active ? "#00ffe7" : "#4a5068",
                  boxShadow: agent.active ? "0 0 6px #00ffe7" : "none",
                  transition: "all 0.2s ease",
                }} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Capital", value: agent.capital, color: "#e8b84b" },
                { label: "Txn", value: `${agent.txn}`, color: "#00ffe7" },
                { label: "Win%", value: `${agent.win}%`, color: agent.win >= 80 ? "#00ff88" : agent.win >= 70 ? "#e8b84b" : "#ff2a6d" },
              ].map(s => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.46rem", color: "#4a5068", letterSpacing: "0.08em" }}>{s.label}</span>
                  <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Win-rate bar */}
            <div>
              <div style={{ height: 3, background: "rgba(74,80,104,0.25)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${agent.win}%`, background: agent.win >= 80 ? "#00ff88" : agent.win >= 70 ? "#e8b84b" : "#ff2a6d", borderRadius: 2, transition: "width 0.4s ease" }} />
              </div>
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-1.5">
              <span className={`led ${agent.active ? "led-neon" : "led-red"}`} style={{ width: 5, height: 5 }} />
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: agent.active ? "#00ffe7" : "#ff2a6d", letterSpacing: "0.1em" }}>
                {agent.active ? "ACTIVE" : "INACTIVE"}
              </span>
              {agent.win >= 80 ? <TrendingUp size={10} style={{ color: "#00ff88", marginLeft: "auto" }} /> : <TrendingDown size={10} style={{ color: "#e8b84b", marginLeft: "auto" }} />}
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
