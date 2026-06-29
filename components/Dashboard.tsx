"use client";

import { useState, useCallback, useRef } from "react";
import TopBar from "@/components/TopBar";
import Sidebar, { Section as NavSection } from "@/components/Sidebar";
import TickerBar from "@/components/TickerBar";

import SectionOverview    from "@/components/sections/SectionOverview";
import SectionAnalytics   from "@/components/sections/SectionAnalytics";
import SectionFinancial   from "@/components/sections/SectionFinancial";
import SectionTransactions from "@/components/sections/SectionTransactions";
import SectionAgents      from "@/components/sections/SectionAgents";
import SectionReports     from "@/components/sections/SectionReports";
import SectionSystem      from "@/components/sections/SectionSystem";
import SectionSettings    from "@/components/sections/SectionSettings";

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
      osc.type = "square";
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.04);
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.2, now + 0.005);
      env.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(env); env.connect(c.destination);
      osc.start(now); osc.stop(now + 0.065);
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const navSound = useNavSound();

  return (
    <div className="min-h-screen" style={{ background: "#03040a" }}>
      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 neon-grid" style={{ zIndex: 0 }} />
      <div className="pointer-events-none fixed inset-0 scanlines opacity-20" style={{ zIndex: 0 }} />
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 0, background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,255,231,0.03) 0%, transparent 70%)" }}
      />

      <TopBar onMenuToggle={() => setMobileOpen(o => !o)} />

      <Sidebar
        active={active}
        onNavigate={setActive}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavSound={navSound}
      />

      {/* Main content — sidebar is 240px wide, fixed */}
      <main
        key={active}
        style={{
          paddingTop: 72,
          paddingBottom: 52,
          paddingLeft: 16,
          paddingRight: 16,
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          animation: "panelRise 0.25s ease both",
        }}
      >
        {/* On md+, offset left by sidebar width (240px) + gap (16px) */}
        <style>{`@media (min-width:768px){.dash-main{padding-left:264px!important;padding-right:24px!important;}}`}</style>
        <div className="dash-main" style={{ maxWidth: 1280, margin: "0 auto" }}>
          {SECTION_MAP[active]}
        </div>
      </main>

      <TickerBar />
    </div>
  );
}
