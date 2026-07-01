"use client";

import { LayoutDashboard, BarChart2, CreditCard, Activity, Users, FileText } from "lucide-react";

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

interface Props {
  active: Section;
  onNavigate: (s: Section) => void;
  // kept for compat
  mobileOpen?: boolean;
  onClose?: () => void;
  onNavSound?: () => void;
}

export default function BottomNav({ active, onNavigate, onNavSound }: Props) {
  function nav(s: Section) {
    onNavSound?.();
    onNavigate(s);
  }

  return (
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

        {/* Center CE button */}
        <button
          onClick={() => nav("overview")}
          className="ce-button"
          aria-label="C.E. Empire Home"
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
  );
}
