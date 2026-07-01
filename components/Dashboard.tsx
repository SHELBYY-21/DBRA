"use client";

import { useState, useCallback, useRef } from "react";
import TopBar from "@/components/TopBar";
import BottomNav, { Section as NavSection } from "@/components/Sidebar";
import TickerBar from "@/components/TickerBar";

import SectionOverview    from "@/components/sections/SectionOverview";
import SectionAnalytics   from "@/components/sections/SectionAnalytics";
import SectionFinancial   from "@/components/sections/SectionFinancial";
import SectionTransactions from "@/components/sections/SectionTransactions";
import SectionAgents      from "@/components/sections/SectionAgents";
import SectionReports     from "@/components/sections/SectionReports";
import SectionSystem      from "@/components/sections/SectionSystem";
import SectionSettings    from "@/components/sections/SectionSettings";

const SECTION_LABELS: Record<NavSection, string> = {
  overview:     "หน้าหลัก",
  analytics:    "วิเคราะห์",
  financial:    "การเงิน",
  transactions: "ธุรกรรม",
  management:   "ทีมงาน",
  reports:      "รายงาน",
  system:       "ระบบ",
  settings:     "ตั้งค่า",
};

function useNavSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  return useCallback(() => {
    try {
      if (!ctxRef.current) {
        const AC = (window as typeof window & { webkitAudioContext?: typeof AudioContext }).AudioContext
          || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        ctxRef.current = new AC();
      }
      const c = ctxRef.current;
      if (c.state === "suspended") c.resume();
      const now = c.currentTime;
      const osc = c.createOscillator();
      const env = c.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.15, now + 0.005);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(env); env.connect(c.destination);
      osc.start(now); osc.stop(now + 0.09);
    } catch (_) {}
  }, []);
}

const SECTION_MAP: Record<NavSection, React.ReactNode> = {
  overview:     <SectionOverview />,
  analytics:    <SectionAnalytics />,
  financial:    <SectionFinancial />,
  transactions: <SectionTransactions />,
  management:   <SectionAgents />,
  reports:      <SectionReports />,
  system:       <SectionSystem />,
  settings:     <SectionSettings />,
};

export default function Dashboard() {
  const [active, setActive] = useState<NavSection>("overview");
  const navSound = useNavSound();

  return (
    <div style={{ background: "#03060D", minHeight: "100vh" }}>
      {/* Subtle ambient radial */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(216,180,107,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 40% at 80% 80%, rgba(0,217,255,0.03) 0%, transparent 60%)",
        }}
      />

      <TopBar section={SECTION_LABELS[active]} />

      <main
        key={active}
        className="page-wrap"
        style={{ position: "relative", zIndex: 1, animation: "panelRise 0.3s ease both" }}
      >
        {SECTION_MAP[active]}
      </main>

      <BottomNav
        active={active}
        onNavigate={setActive}
        onNavSound={navSound}
      />

      <TickerBar />
    </div>
  );
}
