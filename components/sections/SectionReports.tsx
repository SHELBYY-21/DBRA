"use client";

import { useState } from "react";
import { FileText, Download, Copy, Check, Search } from "lucide-react";
import { Section, SectionHeader, GlassCard, Badge, useToast } from "@/components/ui";

const REPORTS = [
  { name: "Monthly P&L — มิ.ย. 2026",         date: "30 มิ.ย. 2026", size: "2.4 MB", status: "Ready",      type: "PDF" },
  { name: "Agent Performance Q2 2026",          date: "28 มิ.ย. 2026", size: "1.8 MB", status: "Ready",      type: "PDF" },
  { name: "Transaction Audit Log — มิ.ย.",      date: "30 มิ.ย. 2026", size: "4.1 MB", status: "Ready",      type: "CSV" },
  { name: "System Uptime Report",               date: "30 มิ.ย. 2026", size: "0.6 MB", status: "Ready",      type: "PDF" },
  { name: "Weekly Summary — สัปดาห์ที่ 26",   date: "29 มิ.ย. 2026", size: "1.2 MB", status: "Processing", type: "PDF" },
  { name: "Capital Flow Analysis",              date: "27 มิ.ย. 2026", size: "3.0 MB", status: "Ready",      type: "XLSX" },
];

const TYPE_COLORS: Record<string, string> = {
  PDF: "#FF5C5C", CSV: "#37D67A", XLSX: "#37D67A",
};

function CopyReportButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);
  const { show, ToastEl } = useToast();

  function handle() {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopied(true);
    show(`คัดลอก: ${name}`, "gold");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {ToastEl}
      <button
        onClick={handle}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10, padding: "6px 8px",
          cursor: "pointer",
          color: copied ? "#37D67A" : "rgba(255,255,255,0.4)",
          transition: "all 0.18s ease",
        }}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </>
  );
}

export default function SectionReports() {
  const [search, setSearch] = useState("");
  const { show, ToastEl } = useToast();

  const filtered = REPORTS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  const ready = REPORTS.filter(r => r.status === "Ready").length;
  const processing = REPORTS.filter(r => r.status === "Processing").length;

  function handleDownload(name: string) {
    show(`ดาวน์โหลด: ${name}`, "success");
  }

  return (
    <Section>
      {ToastEl}
      <SectionHeader title="รายงาน" sub="CE EMPIRE // DOCUMENT CENTER" />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "ทั้งหมด",   value: REPORTS.length, color: "#D8B46B" },
          { label: "Ready",     value: ready,           color: "#37D67A" },
          { label: "กำลังสร้าง", value: processing,     color: "#FFB648" },
        ].map(s => (
          <div key={s.label} className="lux-card" style={{ padding: "14px 12px" }}>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "1.4rem", fontWeight: 700,
              color: s.color,
            }}>{s.value}</div>
            <div style={{
              fontFamily: "'Sarabun',sans-serif",
              fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: 2,
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative" }}>
        <Search size={14} style={{
          position: "absolute", left: 12, top: "50%",
          transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)",
        }} />
        <input
          className="lux-input"
          style={{ paddingLeft: 36 }}
          placeholder="ค้นหารายงาน..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Report list */}
      <GlassCard style={{ padding: "4px 0" }}>
        {filtered.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 18px",
              borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            {/* Icon */}
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `${TYPE_COLORS[r.type]}12`,
              border: `1px solid ${TYPE_COLORS[r.type]}25`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <FileText size={16} color={TYPE_COLORS[r.type]} />
            </div>

            {/* Details */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'Sarabun',sans-serif",
                fontSize: "0.85rem", fontWeight: 500, color: "#F0F2F5",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>{r.name}</div>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "0.58rem", color: "rgba(255,255,255,0.25)", marginTop: 3,
              }}>
                {r.date} &bull; {r.size} &bull;{" "}
                <span style={{ color: TYPE_COLORS[r.type] }}>{r.type}</span>
              </div>
            </div>

            {/* Status + actions */}
            <div className="flex items-center gap-2" style={{ flexShrink: 0 }}>
              <Badge
                text={r.status === "Ready" ? "Ready" : "Processing"}
                color={r.status === "Ready" ? "success" : "warning"}
                dot
              />
              <CopyReportButton name={r.name} />
              {r.status === "Ready" && (
                <button
                  onClick={() => handleDownload(r.name)}
                  className="glow-btn"
                  style={{ padding: "6px 8px" }}
                >
                  <Download size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </GlassCard>
    </Section>
  );
}
