"use client";

import { useState } from "react";
import { Section, SectionHeader, GlassCard, Badge } from "@/components/ui";
import { User, Bell, Shield, Database, Save } from "lucide-react";

export default function SectionSettings() {
  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(true);
  const [autoBak, setAutoBak] = useState(true);
  const [theme, setTheme] = useState<"cyber" | "gold">("cyber");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
      <button
        onClick={onChange}
        style={{ width: 40, height: 20, borderRadius: 10, background: on ? "rgba(0,255,231,0.15)" : "rgba(74,80,104,0.2)", border: `1px solid ${on ? "rgba(0,255,231,0.4)" : "rgba(74,80,104,0.3)"}`, position: "relative", cursor: "pointer", transition: "all 0.2s ease" }}
      >
        <span style={{ position: "absolute", top: 2, left: on ? "calc(100% - 16px)" : 2, width: 14, height: 14, borderRadius: "50%", background: on ? "#00ffe7" : "#4a5068", boxShadow: on ? "0 0 8px #00ffe7" : "none", transition: "all 0.2s ease" }} />
      </button>
    );
  }

  return (
    <Section>
      <SectionHeader title="Settings" sub="CE EMPIRE // System Configuration" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profile */}
        <GlassCard className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <User size={13} style={{ color: "#00ffe7" }} />
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>COMMANDER PROFILE</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: "rgba(0,255,231,0.08)", border: "1px solid rgba(0,255,231,0.3)", fontFamily: "'Cinzel',serif", fontSize: "1.2rem", color: "#00ffe7", textShadow: "0 0 12px #00ffe7" }}>
              C
            </div>
            <div>
              <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#e8eaf6" }}>Commander</div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "#4a5068", letterSpacing: "0.08em" }}>CE EMPIRE // APEX ACCESS</div>
              <Badge text="EMPEROR" color="gold" />
            </div>
          </div>
          {[
            { label: "Username", value: "commander" },
            { label: "Access Level", value: "APEX" },
            { label: "Last Login", value: "Today 09:00" },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: "#4a5068", letterSpacing: "0.1em", marginBottom: 3 }}>{f.label}</div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#e8eaf6", padding: "6px 10px", background: "rgba(0,0,0,0.3)", borderRadius: 4, border: "1px solid rgba(0,255,231,0.08)" }}>
                {f.value}
              </div>
            </div>
          ))}
        </GlassCard>

        {/* Toggles */}
        <div className="flex flex-col gap-4">
          <GlassCard className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Bell size={13} style={{ color: "#00ffe7" }} />
              <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>NOTIFICATIONS</span>
            </div>
            {[
              { label: "Transaction Alerts", on: notifications, fn: () => setNotifications(v => !v) },
              { label: "System Events", on: true, fn: () => {} },
              { label: "Agent Status", on: true, fn: () => {} },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: "#4a5068", letterSpacing: "0.08em" }}>{r.label}</span>
                <Toggle on={r.on} onChange={r.fn} />
              </div>
            ))}
          </GlassCard>

          <GlassCard className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Shield size={13} style={{ color: "#00ffe7" }} />
              <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>SECURITY</span>
            </div>
            {[
              { label: "2-Factor Auth", on: twoFA, fn: () => setTwoFA(v => !v) },
              { label: "Auto Backup", on: autoBak, fn: () => setAutoBak(v => !v) },
              { label: "Audit Logs", on: true, fn: () => {} },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: "#4a5068", letterSpacing: "0.08em" }}>{r.label}</span>
                <Toggle on={r.on} onChange={r.fn} />
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      {/* Theme selector */}
      <GlassCard className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Database size={13} style={{ color: "#00ffe7" }} />
          <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>INTERFACE THEME</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {([
            { id: "cyber", label: "Cyberpunk Neon", accent: "#00ffe7" },
            { id: "gold", label: "Dark Gold", accent: "#e8b84b" },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              style={{
                padding: "8px 16px",
                borderRadius: 4,
                border: `1px solid ${theme === t.id ? t.accent : "rgba(74,80,104,0.3)"}`,
                background: theme === t.id ? `${t.accent}15` : "transparent",
                color: theme === t.id ? t.accent : "#4a5068",
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 cursor-pointer"
          style={{
            padding: "10px 24px",
            borderRadius: 4,
            border: `1px solid ${saved ? "rgba(0,255,136,0.5)" : "rgba(0,255,231,0.4)"}`,
            background: saved ? "rgba(0,255,136,0.1)" : "rgba(0,255,231,0.08)",
            color: saved ? "#00ff88" : "#00ffe7",
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
        >
          <Save size={12} />
          {saved ? "SAVED" : "SAVE SETTINGS"}
        </button>
      </div>
    </Section>
  );
}
