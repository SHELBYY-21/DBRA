"use client";

import { useState } from "react";
import { User, Bell, Shield, Palette, Save, Check } from "lucide-react";
import { Section, SectionHeader, GlassCard, Badge, useToast } from "@/components/ui";

function LuxToggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 42, height: 22, borderRadius: 11,
        background: on ? "rgba(55,214,122,0.15)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${on ? "rgba(55,214,122,0.4)" : "rgba(255,255,255,0.12)"}`,
        position: "relative", cursor: "pointer",
        transition: "all 0.2s ease", flexShrink: 0,
      }}
      aria-label={on ? "Disable" : "Enable"}
    >
      <span style={{
        position: "absolute", top: 3,
        left: on ? "calc(100% - 17px)" : 3,
        width: 14, height: 14, borderRadius: "50%",
        background: on ? "#37D67A" : "rgba(255,255,255,0.25)",
        boxShadow: on ? "0 0 6px #37D67A" : "none",
        transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
      }} />
    </button>
  );
}

export default function SectionSettings() {
  const [notifyTxn,   setNotifyTxn  ] = useState(true);
  const [notifySys,   setNotifySys  ] = useState(true);
  const [notifyAgent, setNotifyAgent] = useState(false);
  const [twoFA,       setTwoFA      ] = useState(true);
  const [autoBak,     setAutoBak    ] = useState(true);
  const [auditLog,    setAuditLog   ] = useState(true);
  const [theme, setTheme] = useState<"gold" | "midnight" | "cyber">("gold");
  const [saved, setSaved] = useState(false);
  const { show, ToastEl } = useToast();

  function handleSave() {
    setSaved(true);
    show("บันทึกการตั้งค่าสำเร็จ", "success");
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <Section>
      {ToastEl}
      <SectionHeader title="ตั้งค่า" sub="CE EMPIRE // SYSTEM CONFIG" />

      {/* Profile */}
      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
          <User size={14} color="#D8B46B" />
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>
            โปรไฟล์ Commander
          </span>
        </div>

        <div className="flex items-center gap-4" style={{ marginBottom: 18 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(216,180,107,0.1)",
            border: "2px solid rgba(216,180,107,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "1.4rem", fontWeight: 700,
            color: "#D8B46B",
            textShadow: "0 0 14px rgba(216,180,107,0.5)",
          }}>C</div>
          <div>
            <div style={{ fontFamily: "'Sarabun',sans-serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>
              Commander
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
              CE EMPIRE // APEX ACCESS
            </div>
            <div style={{ marginTop: 6 }}>
              <Badge text="EMPEROR" color="gold" dot />
            </div>
          </div>
        </div>

        {[
          { label: "Username",     value: "commander" },
          { label: "Access Level", value: "APEX"      },
          { label: "Last Login",   value: "01 ก.ค. 2026 09:00" },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 4 }}>
              {f.label}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.75rem", color: "#F0F2F5",
              padding: "8px 12px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.07)",
            }}>{f.value}</div>
          </div>
        ))}
      </GlassCard>

      {/* Notifications */}
      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
          <Bell size={14} color="#00D9FF" />
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>
            การแจ้งเตือน
          </span>
        </div>
        {[
          { label: "แจ้งเตือนธุรกรรม", on: notifyTxn,   fn: () => setNotifyTxn(v   => !v) },
          { label: "เหตุการณ์ระบบ",    on: notifySys,   fn: () => setNotifySys(v   => !v) },
          { label: "สถานะ Agent",      on: notifyAgent, fn: () => setNotifyAgent(v => !v) },
        ].map(r => (
          <div key={r.label} className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <span style={{ fontFamily: "'Sarabun',sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>
              {r.label}
            </span>
            <LuxToggle on={r.on} onChange={r.fn} />
          </div>
        ))}
      </GlassCard>

      {/* Security */}
      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
          <Shield size={14} color="#37D67A" />
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>
            ความปลอดภัย
          </span>
        </div>
        {[
          { label: "การยืนยัน 2 ขั้นตอน", on: twoFA,    fn: () => setTwoFA(v    => !v) },
          { label: "สำรองข้อมูลอัตโนมัติ", on: autoBak,  fn: () => setAutoBak(v  => !v) },
          { label: "บันทึกกิจกรรม",        on: auditLog, fn: () => setAuditLog(v => !v) },
        ].map(r => (
          <div key={r.label} className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <span style={{ fontFamily: "'Sarabun',sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>
              {r.label}
            </span>
            <LuxToggle on={r.on} onChange={r.fn} />
          </div>
        ))}
      </GlassCard>

      {/* Theme */}
      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
          <Palette size={14} color="#D8B46B" />
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>
            ธีม Interface
          </span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {([
            { id: "gold",     label: "Dark Gold",       accent: "#D8B46B" },
            { id: "midnight", label: "Midnight Blue",   accent: "#00D9FF" },
            { id: "cyber",    label: "Cyberpunk",       accent: "#FF5C5C" },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              style={{
                padding: "8px 16px", borderRadius: 12,
                border: `1px solid ${theme === t.id ? t.accent : "rgba(255,255,255,0.1)"}`,
                background: theme === t.id ? `${t.accent}15` : "transparent",
                color: theme === t.id ? t.accent : "rgba(255,255,255,0.35)",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "0.6rem", letterSpacing: "0.08em",
                cursor: "pointer", transition: "all 0.18s ease",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {theme === t.id && <Check size={10} />}
              {t.label}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="glow-btn"
        style={{
          width: "100%", padding: "14px",
          fontSize: "0.7rem", letterSpacing: "0.14em",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          background: saved ? "rgba(55,214,122,0.12)" : undefined,
          borderColor: saved ? "rgba(55,214,122,0.4)" : undefined,
          color: saved ? "#37D67A" : undefined,
        }}
      >
        {saved ? <Check size={14} /> : <Save size={14} />}
        {saved ? "บันทึกสำเร็จ" : "บันทึกการตั้งค่า"}
      </button>
    </Section>
  );
}
