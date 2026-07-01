"use client";

import { useEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";
import { Section, SectionHeader, GlassCard, Badge, StatCard } from "@/components/ui";

function AreaChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    import("chart.js").then(({ Chart, CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip }) => {
      Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip);
      if (cancelled || !canvasRef.current) return;
      if (chartRef.current) (chartRef.current as { destroy(): void }).destroy();

      const labels = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "รายได้",
              data: [280000, 410000, 360000, 520000, 480000, 641200, 580000, 720000, 690000, 810000, 770000, 920000],
              borderColor: "#D8B46B",
              borderWidth: 2,
              pointRadius: 3,
              pointBackgroundColor: "#D8B46B",
              tension: 0.4,
              fill: true,
              backgroundColor: (ctx: { chart: { ctx: CanvasRenderingContext2D; chartArea: { top: number; bottom: number } | null } }) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, ctx.chart.chartArea?.top ?? 0, 0, ctx.chart.chartArea?.bottom ?? 300);
                gradient.addColorStop(0, "rgba(216,180,107,0.25)");
                gradient.addColorStop(1, "rgba(216,180,107,0)");
                return gradient;
              },
            },
            {
              label: "รายจ่าย",
              data: [120000, 180000, 160000, 210000, 200000, 240000, 220000, 270000, 250000, 290000, 280000, 320000],
              borderColor: "#FF5C5C",
              borderWidth: 1.5,
              pointRadius: 2,
              pointBackgroundColor: "#FF5C5C",
              tension: 0.4,
              fill: true,
              backgroundColor: "rgba(255,92,92,0.06)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1200, easing: "easeOutQuart" },
          plugins: {
            legend: {
              labels: {
                color: "rgba(255,255,255,0.4)",
                font: { family: "'JetBrains Mono',monospace", size: 9 },
                boxWidth: 8, padding: 12,
              },
            },
            tooltip: {
              backgroundColor: "rgba(10,16,26,0.96)",
              borderColor: "rgba(216,180,107,0.3)",
              borderWidth: 1,
              titleColor: "rgba(255,255,255,0.5)",
              bodyColor: "#D8B46B",
              titleFont: { family: "'JetBrains Mono',monospace", size: 9 },
              bodyFont: { family: "'JetBrains Mono',monospace", size: 10 },
              padding: 10,
              callbacks: { label: (c) => ` ฿${(c.raw as number).toLocaleString()}` },
            },
          },
          scales: {
            x: {
              grid: { color: "rgba(255,255,255,0.04)" },
              ticks: { color: "rgba(255,255,255,0.25)", font: { family: "'JetBrains Mono',monospace", size: 8 } },
              border: { color: "transparent" },
            },
            y: {
              grid: { color: "rgba(255,255,255,0.04)" },
              ticks: {
                color: "rgba(255,255,255,0.25)",
                font: { family: "'JetBrains Mono',monospace", size: 8 },
                callback: (v) => `${Number(v)/1000}k`,
              },
              border: { color: "transparent" },
            },
          },
        },
      });
    });
    return () => { cancelled = true; if (chartRef.current) (chartRef.current as { destroy(): void }).destroy(); };
  }, []);

  return <div style={{ height: 220 }}><canvas ref={canvasRef} /></div>;
}

function DonutChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    import("chart.js").then(({ Chart, DoughnutController, ArcElement, Tooltip, Legend }) => {
      Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
      if (cancelled || !canvasRef.current) return;
      if (chartRef.current) (chartRef.current as { destroy(): void }).destroy();

      chartRef.current = new Chart(canvasRef.current, {
        type: "doughnut",
        data: {
          labels: ["Alpha", "Delta", "Beta", "Zeta", "Eps"],
          datasets: [{
            data: [35, 28, 18, 11, 8],
            backgroundColor: ["#D8B46B", "#00D9FF", "#37D67A", "#FF5C5C", "#FFB648"],
            borderColor: "transparent",
            borderWidth: 0,
            hoverOffset: 6,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "72%",
          animation: { duration: 1000 },
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: "rgba(255,255,255,0.4)",
                font: { family: "'JetBrains Mono',monospace", size: 9 },
                boxWidth: 8, padding: 10,
              },
            },
            tooltip: {
              backgroundColor: "rgba(10,16,26,0.96)",
              borderColor: "rgba(216,180,107,0.3)",
              borderWidth: 1,
              titleFont: { family: "'JetBrains Mono',monospace", size: 9 },
              bodyFont: { family: "'JetBrains Mono',monospace", size: 10 },
              callbacks: { label: (c) => ` ${c.raw}%` },
            },
          },
        },
      });
    });
    return () => { cancelled = true; if (chartRef.current) (chartRef.current as { destroy(): void }).destroy(); };
  }, []);

  return <div style={{ height: 180 }}><canvas ref={canvasRef} /></div>;
}

export default function SectionAnalytics() {
  return (
    <Section>
      <SectionHeader title="Analytics" sub="CE EMPIRE // PERFORMANCE DATA" />

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="กำไรรวม YTD" value="฿6.2M" sub="+18.4% vs ปีที่แล้ว" pct={74} color="gold" icon={<TrendingUp size={18} />} />
        <StatCard label="ROI เฉลี่ย" value="34.8%" sub="12 เดือน" pct={35} color="cyan" icon={<TrendingUp size={18} />} />
      </div>

      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>รายได้รายปี</div>
          <Badge text="12M" color="gold" />
        </div>
        <AreaChart />
      </GlassCard>

      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>สัดส่วน Agent</div>
          <Badge text="Q2 2026" color="cyan" />
        </div>
        <DonutChart />
      </GlassCard>

      <GlassCard style={{ padding: 18 }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5", marginBottom: 14 }}>
          ตัวชี้วัดสำคัญ
        </div>
        {[
          { label: "อัตราปิดดีล",     value: "83.4%", pct: 83, color: "#37D67A" },
          { label: "ค่าเฉลี่ยต่อดีล",  value: "฿142k", pct: 58, color: "#D8B46B" },
          { label: "เวลาเฉลี่ย/ดีล",   value: "3.2h",  pct: 45, color: "#00D9FF" },
          { label: "อัตราความพึงพอใจ", value: "96.1%", pct: 96, color: "#FFB648" },
        ].map(m => (
          <div key={m.label} style={{ marginBottom: 12 }}>
            <div className="flex justify-between" style={{ marginBottom: 5 }}>
              <span style={{ fontFamily: "'Sarabun',sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>{m.label}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem", fontWeight: 700, color: m.color }}>{m.value}</span>
            </div>
            <div className="prog-bar">
              <div className="prog-fill" style={{ width: `${m.pct}%`, background: m.color, boxShadow: `0 0 8px ${m.color}66` }} />
            </div>
          </div>
        ))}
      </GlassCard>
    </Section>
  );
}
