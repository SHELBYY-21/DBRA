"use client";

import { useState } from "react";
import {
  ArrowUpRight, ArrowDownLeft, Clock, CheckCircle,
  XCircle, Search, Filter, Download,
} from "lucide-react";
import { Section, SectionHeader, GlassCard, Badge, useToast } from "@/components/ui";

const ALL_TXN = [
  { id: "TX-8841", time: "09:14", type: "IN",  agent: "Alpha",   amount: 84000,  status: "SUCCESS", note: "ปิดดีล Sector A" },
  { id: "TX-8840", time: "09:12", type: "IN",  agent: "Delta",   amount: 210000, status: "SUCCESS", note: "รับเงินจาก Client B" },
  { id: "TX-8839", time: "09:08", type: "OUT", agent: "Beta",    amount: 42000,  status: "SUCCESS", note: "ค่าดำเนินการ" },
  { id: "TX-8838", time: "09:05", type: "IN",  agent: "Delta",   amount: 96000,  status: "SUCCESS", note: "Commission Q2" },
  { id: "TX-8837", time: "08:58", type: "OUT", agent: "Alpha",   amount: 18000,  status: "PENDING", note: "กำลังดำเนินการ" },
  { id: "TX-8836", time: "08:52", type: "OUT", agent: "Zeta",    amount: 55000,  status: "FAILED",  note: "ยกเลิก — ข้อผิดพลาด" },
  { id: "TX-8835", time: "08:44", type: "IN",  agent: "Beta",    amount: 130000, status: "SUCCESS", note: "Settlement D" },
  { id: "TX-8834", time: "08:30", type: "OUT", agent: "Epsilon", amount: 27000,  status: "SUCCESS", note: "Transfer fees" },
  { id: "TX-8833", time: "08:15", type: "IN",  agent: "Alpha",   amount: 175000, status: "SUCCESS", note: "รับเงิน VIP Client" },
  { id: "TX-8832", time: "07:50", type: "OUT", agent: "Zeta",    amount: 62000,  status: "SUCCESS", note: "ค่าบริการ Q2" },
];

const STATUS_CONFIG = {
  SUCCESS: { color: "#37D67A", icon: <CheckCircle size={13} />, label: "success" as const },
  PENDING: { color: "#FFB648", icon: <Clock size={13} />,       label: "warning" as const },
  FAILED:  { color: "#FF5C5C", icon: <XCircle size={13} />,    label: "danger"  as const },
};

export default function SectionTransactions() {
  const [filter, setFilter] = useState<"ALL" | "IN" | "OUT">("ALL");
  const [search, setSearch] = useState("");
  const { show, ToastEl } = useToast();

  const filtered = ALL_TXN.filter(t => {
    if (filter !== "ALL" && t.type !== filter) return false;
    if (search && !`${t.id} ${t.agent} ${t.note}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalIn  = ALL_TXN.filter(t => t.type === "IN"  && t.status === "SUCCESS").reduce((s, t) => s + t.amount, 0);
  const totalOut = ALL_TXN.filter(t => t.type === "OUT" && t.status === "SUCCESS").reduce((s, t) => s + t.amount, 0);
  const pending  = ALL_TXN.filter(t => t.status === "PENDING").length;

  function exportJSON() {
    const blob = new Blob([JSON.stringify(ALL_TXN, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "ce-transactions.json"; a.click();
    URL.revokeObjectURL(url);
    show("ส่งออก JSON สำเร็จ", "success");
  }

  return (
    <Section>
      {ToastEl}
      <SectionHeader title="ธุรกรรม" sub="CE EMPIRE // TRANSACTION LOG">
        <button
          onClick={exportJSON}
          className="glow-btn"
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <Download size={12} />
          Export JSON
        </button>
      </SectionHeader>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "เงินเข้า",  value: `฿${(totalIn/1000).toFixed(0)}k`,  color: "#37D67A", icon: <ArrowDownLeft size={14} /> },
          { label: "เงินออก",  value: `฿${(totalOut/1000).toFixed(0)}k`, color: "#FF5C5C", icon: <ArrowUpRight size={14} />  },
          { label: "รอดำเนิน", value: `${pending}`,                       color: "#FFB648", icon: <Clock size={14} />         },
        ].map(s => (
          <div key={s.label} className="lux-card" style={{ padding: "14px 12px" }}>
            <div style={{ color: s.color, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "1.1rem", fontWeight: 700, color: s.color }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "'Sarabun',sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex gap-2">
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={14} style={{
            position: "absolute", left: 12, top: "50%",
            transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)",
          }} />
          <input
            className="lux-input"
            style={{ paddingLeft: 36 }}
            placeholder="ค้นหา TX ID, Agent, หมายเหตุ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => show("Filter — เร็ว ๆ นี้", "warning")}
          className="glow-btn"
          style={{ display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}
        >
          <Filter size={12} />
        </button>
      </div>

      {/* Type tabs */}
      <div className="flex gap-2">
        {(["ALL", "IN", "OUT"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 16px", borderRadius: 10,
              border: "1px solid",
              borderColor: filter === f ? "rgba(216,180,107,0.4)" : "rgba(255,255,255,0.08)",
              background: filter === f ? "rgba(216,180,107,0.1)" : "transparent",
              color: filter === f ? "#D8B46B" : "rgba(255,255,255,0.35)",
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.65rem", letterSpacing: "0.1em",
              cursor: "pointer", transition: "all 0.18s ease",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <GlassCard style={{ padding: "4px 0" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "32px 18px", textAlign: "center", color: "rgba(255,255,255,0.25)", fontFamily: "'Sarabun',sans-serif", fontSize: "0.85rem" }}>
            ไม่พบรายการ
          </div>
        ) : (
          filtered.map((t, i) => {
            const isIn = t.type === "IN";
            const sc   = STATUS_CONFIG[t.status as keyof typeof STATUS_CONFIG];
            return (
              <div
                key={t.id}
                className="txn-row"
                style={{
                  padding: "12px 18px",
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  animationDelay: `${i * 0.04}s`,
                  cursor: "pointer",
                }}
                onClick={() => show(`${t.id} — ฿${t.amount.toLocaleString()} [${t.status}]`, sc.label)}
              >
                <div className="icon-circle" style={{
                  background: isIn ? "rgba(55,214,122,0.1)" : "rgba(255,92,92,0.1)",
                  borderColor: isIn ? "rgba(55,214,122,0.2)" : "rgba(255,92,92,0.2)",
                }}>
                  {isIn
                    ? <ArrowDownLeft size={15} color="#37D67A" />
                    : <ArrowUpRight size={15}  color="#FF5C5C" />
                  }
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center gap-2">
                    <span style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "0.65rem", fontWeight: 700, color: "#F0F2F5",
                    }}>{t.id}</span>
                    <span style={{ color: sc.color }}>{sc.icon}</span>
                  </div>
                  <div style={{
                    fontFamily: "'Sarabun',sans-serif",
                    fontSize: "0.78rem", color: "rgba(255,255,255,0.45)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{t.note}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.58rem", color: "rgba(255,255,255,0.22)",
                  }}>{t.agent} &bull; {t.time}</div>
                </div>

                <div style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.88rem", fontWeight: 700,
                  color: isIn ? "#37D67A" : "#FF5C5C",
                  whiteSpace: "nowrap",
                }}>
                  {isIn ? "+" : "-"}฿{t.amount.toLocaleString()}
                </div>
              </div>
            );
          })
        )}
      </GlassCard>
    </Section>
  );
}
