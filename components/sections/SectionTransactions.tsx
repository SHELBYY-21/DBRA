"use client";

import { Section, SectionHeader, GlassCard, Badge } from "@/components/ui";
import { ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";

const TXN = [
  { id: "TX-8841", time: "09:14:22", type: "OUT", agent: "Alpha", amount: "฿84,000", status: "SUCCESS", note: "ปิดดีล Sector A" },
  { id: "TX-8840", time: "09:12:05", type: "IN",  agent: "Delta", amount: "฿210,000", status: "SUCCESS", note: "รับเงินจาก Client B" },
  { id: "TX-8839", time: "09:08:47", type: "OUT", agent: "Beta",  amount: "฿42,000", status: "SUCCESS", note: "ค่าดำเนินการ" },
  { id: "TX-8838", time: "09:05:30", type: "IN",  agent: "Delta", amount: "฿96,000", status: "SUCCESS", note: "Commission Q2" },
  { id: "TX-8837", time: "08:58:11", type: "OUT", agent: "Alpha", amount: "฿18,000", status: "PENDING", note: "กำลังดำเนินการ..." },
  { id: "TX-8836", time: "08:52:44", type: "OUT", agent: "Zeta",  amount: "฿55,000", status: "FAILED",  note: "ยกเลิก — ข้อผิดพลาด" },
  { id: "TX-8835", time: "08:44:02", type: "IN",  agent: "Beta",  amount: "฿130,000", status: "SUCCESS", note: "Settlement D" },
  { id: "TX-8834", time: "08:30:18", type: "OUT", agent: "Epsilon", amount: "฿27,000", status: "SUCCESS", note: "Transfer fees" },
];

const statusColor: Record<string, string> = {
  SUCCESS: "#00ff88",
  PENDING: "#e8b84b",
  FAILED:  "#ff2a6d",
};

export default function SectionTransactions() {
  const totalIn  = TXN.filter(t => t.type === "IN" && t.status === "SUCCESS").reduce((s, t) => s + parseInt(t.amount.replace(/[฿,]/g,"")), 0);
  const totalOut = TXN.filter(t => t.type === "OUT" && t.status === "SUCCESS").reduce((s, t) => s + parseInt(t.amount.replace(/[฿,]/g,"")), 0);

  return (
    <Section>
      <SectionHeader title="ธุรกรรม" sub="CE EMPIRE // Transaction Log" />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "เงินเข้า", value: `฿${totalIn.toLocaleString()}`, color: "#00ff88", icon: <ArrowDownLeft size={12} /> },
          { label: "เงินออก", value: `฿${totalOut.toLocaleString()}`, color: "#ff2a6d", icon: <ArrowUpRight size={12} /> },
          { label: "สุทธิ", value: `฿${(totalIn - totalOut).toLocaleString()}`, color: "#e8b84b", icon: <RefreshCw size={12} /> },
        ].map(s => (
          <div key={s.label} className="glass p-3 flex flex-col gap-1">
            <div className="flex items-center gap-1.5" style={{ color: s.color }}>{s.icon}<span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.1em", color: "#4a5068" }}>{s.label}</span></div>
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1rem", fontWeight: 700, color: s.color, textShadow: `0 0 10px ${s.color}40` }}>{s.value}</span>
          </div>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <div className="p-3 border-b" style={{ borderColor: "rgba(0,255,231,0.08)" }}>
          <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>TRANSACTION LOG</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,255,231,0.08)" }}>
                {["TX ID", "เวลา", "Type", "Agent", "จำนวน", "Status", "หมายเหตุ"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: "#4a5068", letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TXN.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: i < TXN.length - 1 ? "1px solid rgba(0,255,231,0.04)" : "none", background: "transparent" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,255,231,0.025)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "8px 12px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: "#00ffe7", whiteSpace: "nowrap" }}>{t.id}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: "#4a5068", whiteSpace: "nowrap" }}>{t.time}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <span className="flex items-center gap-1" style={{ color: t.type === "IN" ? "#00ff88" : "#ff2a6d", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem" }}>
                      {t.type === "IN" ? <ArrowDownLeft size={10} /> : <ArrowUpRight size={10} />}
                      {t.type}
                    </span>
                  </td>
                  <td style={{ padding: "8px 12px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: "#e8eaf6", whiteSpace: "nowrap" }}>{t.agent}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "'Orbitron',sans-serif", fontSize: "0.65rem", fontWeight: 700, color: t.type === "IN" ? "#00ff88" : "#e8eaf6", whiteSpace: "nowrap" }}>{t.amount}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 7px", borderRadius: 3, border: `1px solid ${statusColor[t.status]}30`, background: `${statusColor[t.status]}10`, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: statusColor[t.status], letterSpacing: "0.08em" }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: statusColor[t.status] }} />
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: "8px 12px", fontFamily: "'Kanit',sans-serif", fontSize: "0.68rem", fontWeight: 300, color: "#4a5068" }}>{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </Section>
  );
}
