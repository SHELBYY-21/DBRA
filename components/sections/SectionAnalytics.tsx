"use client";

import { Section, SectionHeader, GlassCard, Badge } from "@/components/ui";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const WEEKLY = [
  { day: "จ", profit: 42000, txn: 48 },
  { day: "อ", profit: 68000, txn: 71 },
  { day: "พ", profit: 55000, txn: 60 },
  { day: "พฤ", profit: 91000, txn: 98 },
  { day: "ศ", profit: 74000, txn: 82 },
  { day: "ส", profit: 38000, txn: 44 },
  { day: "อา", profit: 21000, txn: 26 },
];

const MONTHLY = [
  { month: "ม.ค.", value: 280000 },
  { month: "ก.พ.", value: 410000 },
  { month: "มี.ค.", value: 360000 },
  { month: "เม.ย.", value: 520000 },
  { month: "พ.ค.", value: 480000 },
  { month: "มิ.ย.", value: 641200 },
];

const tooltipStyle = {
  contentStyle: { background: "rgba(3,4,10,0.95)", border: "1px solid rgba(0,255,231,0.2)", borderRadius: 4, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: "#e8eaf6" },
  itemStyle: { color: "#00ffe7" },
  labelStyle: { color: "#4a5068" },
};

export default function SectionAnalytics() {
  return (
    <Section>
      <SectionHeader title="Analytics" sub="CE EMPIRE // Performance Data" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly profit */}
        <GlassCard className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>กำไรรายสัปดาห์</span>
            <Badge text="Weekly" color="neon" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={WEEKLY} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ffe7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00ffe7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,231,0.07)" />
              <XAxis dataKey="day" tick={{ fill: "#4a5068", fontSize: 10, fontFamily: "'Share Tech Mono',monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4a5068", fontSize: 9, fontFamily: "'Share Tech Mono',monospace" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`฿${v.toLocaleString()}`, "Profit"]} />
              <Area type="monotone" dataKey="profit" stroke="#00ffe7" strokeWidth={1.5} fill="url(#profitGrad)" dot={{ fill: "#00ffe7", r: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Monthly revenue */}
        <GlassCard className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#e8b84b", letterSpacing: "0.1em" }}>รายได้รายเดือน</span>
            <Badge text="Monthly" color="gold" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={MONTHLY} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,231,0.07)" />
              <XAxis dataKey="month" tick={{ fill: "#4a5068", fontSize: 10, fontFamily: "'Share Tech Mono',monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4a5068", fontSize: 9, fontFamily: "'Share Tech Mono',monospace" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`฿${v.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="value" fill="rgba(232,184,75,0.7)" radius={[2,2,0,0]} stroke="#e8b84b" strokeWidth={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Weekly transactions bar */}
      <GlassCard className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#ff2a6d", letterSpacing: "0.1em" }}>ธุรกรรมรายวัน</span>
          <Badge text="Txn Count" color="magenta" />
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={WEEKLY} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,231,0.07)" />
            <XAxis dataKey="day" tick={{ fill: "#4a5068", fontSize: 10, fontFamily: "'Share Tech Mono',monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#4a5068", fontSize: 9, fontFamily: "'Share Tech Mono',monospace" }} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => [v, "Transactions"]} />
            <Bar dataKey="txn" fill="rgba(255,42,109,0.6)" radius={[2,2,0,0]} stroke="#ff2a6d" strokeWidth={0.5} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </Section>
  );
}
