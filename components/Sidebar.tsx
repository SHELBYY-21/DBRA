"use client";

import { useState } from "react";
import { LayoutDashboard, BarChart2, CreditCard, Activity, Users, FileText, Server, Settings, X } from "lucide-react";

export type Section =
  | "overview" | "analytics" | "financial" | "transactions"
  | "management" | "reports" | "system" | "settings";

const LEFT_NAV = [
  { id: "overview"  as Section, label: "หน้าหลัก", icon: LayoutDashboard },
  { id: "analytics" as Section, label: "วิเคราะห์", icon: BarChart2 },
];
const RIGHT_NAV = [
  { id: "financial"    as Section, label: "การเงิน", icon: CreditCard },
  { id: "transactions" as Section, label: "ธุรกรรม", icon: Activity },
];
const MORE_NAV = [
  { id: "management" as Section, label: "ทีมงาน",  icon: Users },
  { id: "reports"    as Section, label: "รายงาน",  icon: FileText },
  { id: "system"     as Section, label: "ระบบ",    icon: Server },
  { id: "settings"   as Section, label: "ตั้งค่า", icon: Settings },
];

interface Props {
  active: Section;
  onNavigate: (s: Section) => void;
  mobileOpen?: boolean;
  onClose?: () => void;
  onNavSound?: () => void;
}

export default function BottomNav({ active, onNavigate, onNavSound }: Props) {
  const [moreOpen, setMoreOpen] = useState(false);

  function nav(s: Section) {
    onNavSound?.();
    onNavigate(s);
    setMoreOpen(false);
  }

  return (
    <>
      {/* More drawer backdrop */}
      {moreOpen && (
        <div
          onClick={() => setMoreOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 48,
            background: "rgba(3,6,13,0.7)",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.18s ease",
          }}
          aria-hidden="true"
        />
      )}

      {/* More drawer sheet */}
      {moreOpen && (
        <div style={{
          position: "fixed",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(394px, calc(100vw - 36px))",
          zIndex: 49,
          background: "rgba(10,16,26,0.98)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "20px 18px",
          boxShadow: "0 -8px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(216,180,107,0.08)",
          animation: "sheetUp 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
        }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.95rem", fontWeight: 600,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.04em",
            }}>เมนูเพิ่มเติม</span>
            <button
              onClick={() => setMoreOpen(false)}
              style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              <X size={14} color="rgba(255,255,255,0.4)" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {MORE_NAV.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => nav(id)}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 6,
                    padding: "14px 8px",
                    borderRadius: 16,
                    background: isActive ? "rgba(216,180,107,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? "rgba(216,180,107,0.3)" : "rgba(255,255,255,0.06)"}`,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  aria-label={label}
                >
                  <Icon size={20} color={isActive ? "#D8B46B" : "rgba(255,255,255,0.4)"} strokeWidth={isActive ? 2 : 1.5} />
                  <span style={{
                    fontFamily: "'Sarabun', sans-serif",
                    fontSize: "0.65rem", fontWeight: 500,
                    color: isActive ? "#D8B46B" : "rgba(255,255,255,0.4)",
                    letterSpacing: "0.01em",
                  }}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <nav className="bottom-nav" aria-label="Main navigation">
        <div className="bottom-nav-inner">
          {/* Left items */}
          {LEFT_NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => nav(id)}
              className={`nav-btn${active === id ? " active" : ""}`}
              aria-label={label}
            >
              <Icon size={20} strokeWidth={active === id ? 2 : 1.5} />
              <span>{label}</span>
            </button>
          ))}

          {/* Center CE button — opens more or goes home */}
          <button
            onClick={() => {
              if (moreOpen) { setMoreOpen(false); } else { setMoreOpen(true); }
            }}
            className="ce-button"
            aria-label="C.E. Empire Menu"
            aria-expanded={moreOpen}
            style={moreOpen ? { transform: "scale(1.08)", boxShadow: "0 0 40px rgba(216,180,107,0.6), 0 0 0 6px rgba(216,180,107,0.15)" } : undefined}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem", fontWeight: 700,
              color: "rgba(3,6,13,0.9)",
              letterSpacing: "0.03em",
            }}>CE</span>
          </button>

          {/* Right items */}
          {RIGHT_NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => nav(id)}
              className={`nav-btn${active === id ? " active" : ""}`}
              aria-label={label}
            >
              <Icon size={20} strokeWidth={active === id ? 2 : 1.5} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
