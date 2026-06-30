"use client";

import { BarChart2, CreditCard, Activity, Users, FileText, Cpu, Settings, LayoutDashboard, X } from "lucide-react";

export type Section =
  | "overview" | "analytics" | "financial" | "transactions"
  | "management" | "reports" | "system" | "settings";

const NAV_GROUPS = [
  {
    label: "ภาพรวม",
    items: [
      { id: "overview" as Section, label: "Overview", icon: LayoutDashboard },
      { id: "analytics" as Section, label: "Analytics", icon: BarChart2 },
    ],
  },
  {
    label: "การเงิน",
    items: [
      { id: "financial" as Section, label: "Financial", icon: CreditCard },
      { id: "transactions" as Section, label: "Transactions", icon: Activity },
    ],
  },
  {
    label: "ปฏิบัติการ",
    items: [
      { id: "management" as Section, label: "Agents", icon: Users },
      { id: "reports" as Section, label: "Reports", icon: FileText },
    ],
  },
  {
    label: "ระบบ",
    items: [
      { id: "system" as Section, label: "System", icon: Cpu },
      { id: "settings" as Section, label: "Settings", icon: Settings },
    ],
  },
];

interface Props {
  active: Section;
  onNavigate: (s: Section) => void;
  mobileOpen: boolean;
  onClose: () => void;
  onNavSound: () => void;
}

export default function Sidebar({ active, onNavigate, mobileOpen, onClose, onNavSound }: Props) {
  function nav(s: Section) {
    onNavSound();
    onNavigate(s);
    onClose();
  }

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: "rgba(3,4,10,0.7)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{
          width: 240,
          paddingTop: 52,
          paddingBottom: 28,
          background: "rgba(3,4,10,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(0,255,231,0.12)",
          animation: "borderNeon 5s ease-in-out infinite",
        }}
      >
        {/* Mobile close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:hidden"
          style={{ background: "none", border: "none", color: "#4a5068", cursor: "pointer", padding: 4 }}
          aria-label="Close menu"
        >
          <X size={16} />
        </button>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto px-3 pt-3 flex flex-col gap-1">
          {NAV_GROUPS.map(group => (
            <div key={group.label} className="mb-2">
              <div
                className="px-2 mb-1"
                style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", letterSpacing: "0.18em", color: "rgba(74,80,104,0.8)", textTransform: "uppercase" }}
              >
                {group.label}
              </div>
              {group.items.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => nav(id)}
                    className="w-full flex items-center gap-2.5 text-left relative overflow-hidden"
                    style={{
                      padding: "8px 10px",
                      borderRadius: 4,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Share Tech Mono',monospace",
                      fontSize: "0.64rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      transition: "all 0.18s ease",
                      background: isActive ? "rgba(0,255,231,0.08)" : "transparent",
                      color: isActive ? "#00ffe7" : "#4a5068",
                      borderLeft: isActive ? "2px solid #00ffe7" : "2px solid transparent",
                      paddingLeft: isActive ? 8 : 10,
                      textShadow: isActive ? "0 0 10px rgba(0,255,231,0.4)" : "none",
                      boxShadow: isActive ? "inset 2px 0 12px rgba(0,255,231,0.04)" : "none",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#00ffe7"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#4a5068"; }}
                  >
                    {isActive && (
                      <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg,rgba(0,255,231,0.08) 0%,transparent 70%)" }} />
                    )}
                    <Icon size={13} style={{ flexShrink: 0 }} />
                    <span>{label}</span>
                    {isActive && <span className="ml-auto" style={{ width: 4, height: 4, borderRadius: "50%", background: "#00ffe7", boxShadow: "0 0 6px #00ffe7" }} />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Grok widget */}
        <div className="mx-3 mt-auto glass relative p-3" style={{ borderRadius: 6 }}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="led led-neon" style={{ width: 5, height: 5 }} />
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.12em", color: "#00ffe7" }}>GROK AI ENGINE</span>
          </div>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: "#4a5068", letterSpacing: "0.06em" }}>[CONNECTED]</div>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "rgba(0,255,231,0.35)", marginTop: 2 }}>Neural sync: ACTIVE</div>
        </div>
      </aside>
    </>
  );
}
