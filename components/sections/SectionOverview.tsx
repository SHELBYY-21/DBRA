"use client";

import { useEffect, useRef, useState } from "react";
import {
  TrendingUp, TrendingDown, Users, Activity,
  ArrowUpRight, ArrowDownLeft, Wallet,
} from "lucide-react";
import { Section, StatCard, GlassCard, Badge, useToast } from "@/components/ui";

/* ── Chart.js mixed bar + line ── */
function MixedChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    import("chart.js").then(({
      Chart, CategoryScale, LinearScale,
      BarController, BarElement,
      LineController, LineElement,
      PointElement, Tooltip, Legend, Filler,
    }) => {
      Chart.register(
        CategoryScale, LinearScale,
        BarController, BarElement,
        LineController, LineElement,
        PointElement, Tooltip, Legend, Filler,
      );
      if (cancelled || !canvasRef.current) return;
      if (chartRef.current) (chartRef.current as { destroy: () => void }).destroy();

      const labels = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
      const income  = [42000, 68000, 55000, 91000, 74000, 38000, 61000];
      const expense = [18000, 24000, 20000, 35000, 28000, 15000, 22000];
      const net     = income.map((v, i) => v - expense[i]);

      chartRef.current = new Chart(canvasRef.current, {
        data: {
          labels,
          datasets: [
            {
              type: "bar" as const,
              label: "รายได้",
              data: income,
              backgroundColor: "rgba(0,217,255,0.25)",
              borderColor: "#00D9FF",
              borderWidth: 1.5,
              borderRadius: 6,
              order: 2,
            },
            {
              type: "bar" as const,
              label: "รายจ่าย",
              data: expense,
              backgroundColor: "rgba(255,92,92,0.2)",
              borderColor: "rgba(255,92,92,0.6)",
              borderWidth: 1,
              borderRadius: 6,
              order: 3,
            },
            {
              type: "line" as const,
              label: "กำไรสุทธิ",
              data: net,
              borderColor: "#D8B46B",
              borderWidth: 2,
              pointBackgroundColor: "#D8B46B",
              pointRadius: 3,
              pointHoverRadius: 5,
              tension: 0.4,
              fill: false,
              order: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1000, easing: "easeOutQuart" },
          plugins: {
            legend: {
              labels: {
                color: "rgba(255,255,255,0.45)",
                font: { family: "'JetBrains Mono', monospace", size: 9 },
                boxWidth: 8, boxHeight: 8, padding: 12,
              },
            },
            tooltip: {
              backgroundColor: "rgba(10,16,26,0.96)",
              borderColor: "rgba(216,180,107,0.3)",
              borderWidth: 1,
              titleColor: "rgba(255,255,255,0.6)",
              bodyColor: "#D8B46B",
              titleFont: { family: "'JetBrains Mono', monospace", size: 9 },
              bodyFont: { family: "'JetBrains Mono', monospace", size: 10 },
              padding: 10,
              callbacks: {
                label: (ctx) => ` ฿${(ctx.raw as number).toLocaleString()}`,
              },
            },
          },
          scales: {
            x: {
              grid: { color: "rgba(255,255,255,0.04)" },
              ticks: {
                color: "rgba(255,255,255,0.3)",
                font: { family: "'JetBrains Mono', monospace", size: 9 },
              },
              border: { color: "transparent" },
            },
            y: {
              grid: { color: "rgba(255,255,255,0.04)" },
              ticks: {
                color: "rgba(255,255,255,0.3)",
                font: { family: "'JetBrains Mono', monospace", size: 9 },
                callback: (v) => `${Number(v)/1000}k`,
              },
              border: { color: "transparent" },
            },
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (chartRef.current) (chartRef.current as { destroy: () => void }).destroy();
    };
  }, []);

  return (
    <div style={{ height: 200, position: "relative" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

/* ── Recent transactions ── */
const RECENT_TXN = [
  { id: "TX-8841", label: "ปิดดีล Sector A", agent: "Alpha", amount: "+฿84,000", type: "in", time: "09:14" },
  { id: "TX-8840", label: "รับจาก Client B", agent: "Delta", amount: "+฿210,000", type: "in", time: "09:12" },
  { id: "TX-8839", label: "ค่าดำเนินการ", agent: "Beta", amount: "-฿42,000", type: "out", time: "09:08" },
  { id: "TX-8838", label: "Commission Q2", agent: "Delta", amount: "+฿96,000", type: "in", time: "09:05" },
  { id: "TX-8837", label: "กำลังดำเนินการ", agent: "Alpha", amount: "-฿18,000", type: "pending", time: "08:58" },
];

/* ── Team members ── */
const TEAM = [
  { initial: "A", name: "Alpha", role: "Lead Agent", online: true  },
  { initial: "D", name: "Delta", role: "Finance",    online: true  },
  { initial: "B", name: "Beta",  role: "Operations", online: true  },
  { initial: "Z", name: "Zeta",  role: "Analytics",  online: false },
  { initial: "E", name: "Eps",   role: "Support",    online: true  },
];

function randomBetween(a: number, b: number) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

export default function SectionOverview() {
  const [capital, setCapital] = useState(3241800);
  const [usdt, setUsdt]       = useState(127420);
  const [agents]              = useState(12);
  const [online, setOnline]   = useState(8);
  const [winRate]             = useState(83.4);
  const { show, ToastEl }     = useToast();

  useEffect(() => {
    const id = setInterval(() => {
      setCapital(v => v + randomBetween(-3000, 12000));
      setUsdt(v   => v + randomBetween(-100, 600));
      setOnline(randomBetween(6, agents));
    }, 4000);
    return () => clearInterval(id);
  }, [agents]);

  return (
    <Section>
      {ToastEl}

      {/* ── Hero banner ── */}
      <div className="lux-card" style={{ padding: "24px 20px", position: "relative", overflow: "hidden" }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(216,180,107,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -20, left: -20,
          width: 120, height: 120, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          fontFamily: "'Sarabun', sans-serif",
          fontSize: "0.8rem", fontWeight: 300,
          color: "rgba(255,255,255,0.45)",
          marginBottom: 4,
        }}>ยินดีต้อนรับกลับ</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.9rem", fontWeight: 700,
          lineHeight: 1.1,
        }} className="gold-text">C.E. Empire</div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.18em",
          marginTop: 4,
        }}>BUILD &bull; GROW &bull; EMPOWER</div>

        {/* Capital display */}
        <div style={{ marginTop: 20 }}>
          <div style={{
            fontFamily: "'Sarabun', sans-serif",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 4,
          }}>เงินทุนรวม</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "2.2rem", fontWeight: 700,
            color: "#FFD77B",
            textShadow: "0 0 32px rgba(216,180,107,0.45)",
            letterSpacing: "-0.02em",
          }}>
            ฿{capital.toLocaleString()}
          </div>
          <div className="flex items-center gap-2" style={{ marginTop: 6 }}>
            <Badge text="+12.4% เดือนนี้" color="success" dot />
            <Badge text="LIVE" color="cyan" dot />
          </div>
        </div>
      </div>

      {/* ── 2-col stat cards ── */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="USDT สำรอง"
          value={`$${usdt.toLocaleString()}`}
          sub="+2.1% / 24h"
          pct={68}
          color="cyan"
          icon={<Wallet size={18} />}
        />
        <StatCard
          label="Agent ออนไลน์"
          value={`${online}/${agents}`}
          sub="กำลังทำงาน"
          pct={Math.round((online/agents)*100)}
          color="success"
          icon={<Users size={18} />}
        />
        <StatCard
          label="Win Rate"
          value={`${winRate}%`}
          sub="ชนะสัปดาห์นี้"
          pct={winRate}
          color="gold"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="ธุรกรรม"
          value="1,284"
          sub="วันนี้"
          pct={74}
          color="warning"
          icon={<Activity size={18} />}
        />
      </div>

      {/* ── Chart.js mixed bar + line ── */}
      <GlassCard style={{ padding: "18px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem", fontWeight: 600,
              color: "#F0F2F5",
            }}>รายได้ / รายจ่าย</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
              marginTop: 2,
            }}>รายสัปดาห์ — กำไรสุทธิ (เส้น)</div>
          </div>
          <Badge text="สด" color="gold" dot />
        </div>
        <MixedChart />
      </GlassCard>

      {/* ── Performance bars ── */}
      <GlassCard style={{ padding: "18px" }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1rem", fontWeight: 600,
          color: "#F0F2F5",
          marginBottom: 14,
        }}>ประสิทธิภาพ</div>
        {[
          { label: "กำไรสัปดาห์นี้",  value: "+฿214,000", pct: 72, color: "#00D9FF" },
          { label: "กำไรเดือนนี้",   value: "+฿841,200", pct: 88, color: "#D8B46B" },
          { label: "Win Rate",       value: "83.4%",     pct: 83, color: "#37D67A" },
          { label: "Agent Efficiency", value: "91.2%",   pct: 91, color: "#FFB648" },
        ].map(row => (
          <div key={row.label} style={{ marginBottom: 12 }}>
            <div className="flex justify-between" style={{ marginBottom: 6 }}>
              <span style={{
                fontFamily: "'Sarabun', sans-serif",
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.45)",
              }}>{row.label}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem", fontWeight: 700,
                color: row.color,
              }}>{row.value}</span>
            </div>
            <div className="prog-bar">
              <div className="prog-fill" style={{
                width: `${row.pct}%`,
                background: row.color,
                boxShadow: `0 0 8px ${row.color}66`,
              }} />
            </div>
          </div>
        ))}
      </GlassCard>

      {/* ── Recent transactions ── */}
      <GlassCard style={{ padding: "18px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem", fontWeight: 600,
            color: "#F0F2F5",
          }}>ธุรกรรมล่าสุด</div>
          <Badge text="LIVE" color="cyan" dot />
        </div>
        <div className="flex flex-col">
          {RECENT_TXN.map((t, i) => {
            const isIn = t.type === "in";
            const isPending = t.type === "pending";
            return (
              <div
                key={t.id}
                className="txn-row"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="icon-circle" style={{
                  background: isIn
                    ? "rgba(55,214,122,0.1)"
                    : isPending
                    ? "rgba(255,182,72,0.1)"
                    : "rgba(255,92,92,0.1)",
                  borderColor: isIn ? "rgba(55,214,122,0.2)" : isPending ? "rgba(255,182,72,0.2)" : "rgba(255,92,92,0.2)",
                }}>
                  {isIn ? (
                    <ArrowDownLeft size={16} color="#37D67A" />
                  ) : isPending ? (
                    <Activity size={16} color="#FFB648" />
                  ) : (
                    <ArrowUpRight size={16} color="#FF5C5C" />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Sarabun', sans-serif",
                    fontSize: "0.85rem", fontWeight: 500,
                    color: "#F0F2F5",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{t.label}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    color: "rgba(255,255,255,0.28)",
                  }}>{t.agent} &bull; {t.time}</div>
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem", fontWeight: 700,
                  color: isIn ? "#37D67A" : isPending ? "#FFB648" : "#FF5C5C",
                  whiteSpace: "nowrap",
                }}>{t.amount}</div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* ── Team members ── */}
      <GlassCard style={{ padding: "18px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem", fontWeight: 600,
            color: "#F0F2F5",
          }}>ทีมงาน</div>
          <Badge text={`${TEAM.filter(t => t.online).length} ออนไลน์`} color="success" dot />
        </div>
        <div className="flex gap-3 overflow-x-auto" style={{ paddingBottom: 4 }}>
          {TEAM.map(member => (
            <div
              key={member.name}
              className="flex flex-col items-center gap-2 cursor-pointer"
              style={{ flexShrink: 0, minWidth: 64 }}
              onClick={() => show(`${member.name} — ${member.role}`, member.online ? "success" : "dim")}
            >
              <div className="team-avatar" style={{
                boxShadow: member.online ? "0 0 12px rgba(216,180,107,0.2)" : "none",
                borderColor: member.online ? "rgba(216,180,107,0.4)" : "rgba(255,255,255,0.1)",
                opacity: member.online ? 1 : 0.5,
              }}>
                {member.initial}
                {member.online && <span className="online-dot" />}
              </div>
              <div style={{
                fontFamily: "'Sarabun', sans-serif",
                fontSize: "0.7rem", fontWeight: 500,
                color: member.online ? "#F0F2F5" : "rgba(255,255,255,0.35)",
                textAlign: "center",
              }}>{member.name}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.52rem",
                color: "rgba(255,255,255,0.25)",
                textAlign: "center",
              }}>{member.role}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "โอนเงิน", icon: <ArrowUpRight size={16} />, color: "#D8B46B" },
          { label: "รับเงิน",  icon: <ArrowDownLeft size={16} />, color: "#37D67A" },
          { label: "รายงาน",  icon: <TrendingUp size={16} />, color: "#00D9FF" },
          { label: "Agent",   icon: <Users size={16} />, color: "#FFB648" },
        ].map(a => (
          <button
            key={a.label}
            onClick={() => show(`${a.label} — เปิดใช้งาน`, "gold")}
            className="lux-card"
            style={{
              padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 10,
              cursor: "pointer", background: "rgba(12,18,28,0.72)",
              border: "none", textAlign: "left",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(216,180,107,0.3)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `${a.color}15`,
              border: `1px solid ${a.color}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: a.color, flexShrink: 0,
            }}>{a.icon}</div>
            <span style={{
              fontFamily: "'Sarabun', sans-serif",
              fontSize: "0.85rem", fontWeight: 500,
              color: "#F0F2F5",
            }}>{a.label}</span>
          </button>
        ))}
      </div>
    </Section>
  );
}
