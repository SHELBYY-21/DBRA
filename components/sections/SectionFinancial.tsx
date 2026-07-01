"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy, Check, CreditCard, TrendingUp, TrendingDown } from "lucide-react";
import { Section, SectionHeader, GlassCard, Badge, useToast } from "@/components/ui";

const CARDS = [
  { label: "Primary Vault",    balance: "฿3,241,800", usdt: "$127,420", number: "CE-VAULT-001", status: "ACTIVE",  color: "#D8B46B" },
  { label: "Operations Fund",  balance: "฿841,200",   usdt: "$33,120",  number: "CE-OPS-002",  status: "ACTIVE",  color: "#00D9FF" },
  { label: "Reserve Pool",     balance: "฿520,000",   usdt: "$20,480",  number: "CE-RSV-003",  status: "LOCKED",  color: "#FF5C5C" },
];

const CRYPTO = [
  { symbol: "USDT", name: "Tether",    amount: "127,420",  value: "$127,420", change: "+0.01%", pos: true  },
  { symbol: "BTC",  name: "Bitcoin",   amount: "2.14",     value: "$143,893", change: "+3.2%",  pos: true  },
  { symbol: "ETH",  name: "Ethereum",  amount: "18.5",     value: "$63,270",  change: "-1.4%",  pos: false },
  { symbol: "BNB",  name: "BNB Chain", amount: "84.0",     value: "$49,560",  change: "+0.8%",  pos: true  },
];

const CRYPTO_COLORS: Record<string, string> = {
  USDT: "#37D67A", BTC: "#FFB648", ETH: "#00D9FF", BNB: "#FFD77B",
};

export default function SectionFinancial() {
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { show, ToastEl } = useToast();

  function handleCopy(v: string) {
    navigator.clipboard.writeText(v).catch(() => {});
    setCopied(v);
    show(`คัดลอก ${v} แล้ว`, "success");
    setTimeout(() => setCopied(null), 2000);
  }

  const totalBal = 3241800 + 841200 + 520000;

  return (
    <Section>
      {ToastEl}
      <SectionHeader title="การเงิน" sub="CE EMPIRE // FINANCIAL OPS">
        <button
          onClick={() => setHidden(h => !h)}
          className="glow-btn"
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          {hidden ? <Eye size={12} /> : <EyeOff size={12} />}
          {hidden ? "SHOW" : "HIDE"}
        </button>
      </SectionHeader>

      {/* Total balance hero */}
      <GlassCard style={{ padding: "22px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 140, height: 140, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(216,180,107,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ fontFamily: "'Sarabun',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>
          ยอดรวมทั้งหมด
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: "2rem", fontWeight: 700,
          color: "#FFD77B",
          textShadow: "0 0 28px rgba(216,180,107,0.4)",
          letterSpacing: "-0.02em",
        }}>
          {hidden ? "฿ ••••••••" : `฿${totalBal.toLocaleString()}`}
        </div>
        <div className="flex items-center gap-2" style={{ marginTop: 8 }}>
          <Badge text="+8.4% สัปดาห์นี้" color="success" dot />
          <Badge text="3 VAULTS" color="gold" />
        </div>
      </GlassCard>

      {/* Virtual vault cards — horizontal scroll */}
      <div>
        <div style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "1rem", fontWeight: 600, color: "#F0F2F5",
          marginBottom: 12,
        }}>Vaults</div>
        <div className="flex gap-3 overflow-x-auto" style={{ paddingBottom: 6 }}>
          {CARDS.map(card => (
            <div
              key={card.number}
              style={{
                minWidth: 220,
                borderRadius: 20,
                border: `1px solid ${card.color}25`,
                background: `linear-gradient(135deg, rgba(12,18,28,0.9) 0%, rgba(3,6,13,0.98) 100%)`,
                padding: "18px 16px",
                boxShadow: `0 0 24px ${card.color}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
                backdropFilter: "blur(20px)",
                flexShrink: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top shimmer */}
              <div style={{
                position: "absolute", top: 0, left: "10%", right: "10%",
                height: 1,
                background: `linear-gradient(90deg, transparent, ${card.color}60, transparent)`,
              }} />

              <div className="flex justify-between items-start" style={{ marginBottom: 20 }}>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.55rem", color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.12em", marginBottom: 4,
                  }}>{card.label}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "1.2rem", fontWeight: 700,
                    color: card.color,
                    textShadow: `0 0 14px ${card.color}55`,
                  }}>
                    {hidden ? "฿ •••••" : card.balance}
                  </div>
                </div>
                <Badge
                  text={card.status}
                  color={card.status === "ACTIVE" ? "success" : "danger"}
                  dot
                />
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", marginBottom: 4,
                  }}>
                    {hidden ? "USDT ••••••" : `USDT ${card.usdt}`}
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "0.55rem",
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.06em",
                  }}>{card.number}</div>
                </div>
                <button
                  onClick={() => handleCopy(card.number)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: copied === card.number ? "#37D67A" : "rgba(255,255,255,0.3)",
                    padding: 4, transition: "color 0.2s",
                  }}
                >
                  {copied === card.number ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              {/* Card icon decoration */}
              <div style={{
                position: "absolute", bottom: 12, right: 14,
                opacity: 0.06,
              }}>
                <CreditCard size={48} color={card.color} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crypto portfolio */}
      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 600, color: "#F0F2F5" }}>
            Crypto Portfolio
          </div>
          <Badge text="Live" color="success" dot />
        </div>

        {CRYPTO.map((c, i) => (
          <div
            key={c.symbol}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "12px 0",
              borderBottom: i < CRYPTO.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            {/* Symbol circle */}
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: `${CRYPTO_COLORS[c.symbol]}15`,
              border: `1px solid ${CRYPTO_COLORS[c.symbol]}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: "0.5rem", fontWeight: 700,
              color: CRYPTO_COLORS[c.symbol],
            }}>
              {c.symbol}
            </div>

            {/* Name */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Sarabun',sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "#F0F2F5" }}>
                {hidden ? "••••" : c.amount}
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", marginLeft: 6 }}>
                  {c.symbol}
                </span>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>
                {c.name}
              </div>
            </div>

            {/* Value + change */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.8rem", fontWeight: 700, color: "#F0F2F5" }}>
                {hidden ? "••••" : c.value}
              </div>
              <div className="flex items-center justify-end gap-1" style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "0.65rem", fontWeight: 700,
                color: c.pos ? "#37D67A" : "#FF5C5C",
              }}>
                {c.pos ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {c.change}
              </div>
            </div>
          </div>
        ))}
      </GlassCard>
    </Section>
  );
}
