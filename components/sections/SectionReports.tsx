"use client";

import { Section, SectionHeader, GlassCard, Badge } from "@/components/ui";
import { FileText, Download } from "lucide-react";

const REPORTS = [
  { name: "Monthly P&L Report — มิ.ย. 2025", date: "30 มิ.ย. 2025", size: "2.4 MB", status: "Ready", type: "PDF" },
  { name: "Agent Performance Q2 2025", date: "28 มิ.ย. 2025", size: "1.8 MB", status: "Ready", type: "PDF" },
  { name: "Transaction Audit Log — มิ.ย.", date: "30 มิ.ย. 2025", size: "4.1 MB", status: "Ready", type: "CSV" },
  { name: "System Uptime Report", date: "30 มิ.ย. 2025", size: "0.6 MB", status: "Ready", type: "PDF" },
  { name: "Weekly Summary — สัปดาห์ที่ 26", date: "29 มิ.ย. 2025", size: "1.2 MB", status: "Processing", type: "PDF" },
];

export default function SectionReports() {
  return (
    <Section>
      <SectionHeader title="Reports" sub="CE EMPIRE // Document Center" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "ทั้งหมด", value: "24", color: "#00ffe7" },
          { label: "Ready", value: "21", color: "#00ff88" },
          { label: "Processing", value: "3", color: "#e8b84b" },
          { label: "เดือนนี้", value: "8", color: "#e8b84b" },
        ].map(s => (
          <div key={s.label} className="glass p-3 flex flex-col gap-1">
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "#4a5068", letterSpacing: "0.1em" }}>{s.label}</span>
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      <GlassCard className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FileText size={13} style={{ color: "#00ffe7" }} />
          <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>RECENT REPORTS</span>
        </div>
        <div className="flex flex-col gap-0">
          {REPORTS.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: i < REPORTS.length - 1 ? "1px solid rgba(0,255,231,0.06)" : "none" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 rounded" style={{ background: "rgba(0,255,231,0.06)", border: "1px solid rgba(0,255,231,0.15)" }}>
                  <FileText size={11} style={{ color: "#00ffe7" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Kanit',sans-serif", fontSize: "0.75rem", fontWeight: 400, color: "#e8eaf6" }}>{r.name}</div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: "#4a5068", marginTop: 1 }}>
                    {r.date} · {r.size} · <span style={{ color: "#00ffe7" }}>{r.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge text={r.status} color={r.status === "Ready" ? "neon" : "gold"} />
                {r.status === "Ready" && (
                  <button
                    style={{ background: "rgba(0,255,231,0.06)", border: "1px solid rgba(0,255,231,0.2)", borderRadius: 4, padding: "4px 8px", color: "#00ffe7", cursor: "pointer" }}
                  >
                    <Download size={11} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
