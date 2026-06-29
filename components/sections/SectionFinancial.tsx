"use client";

import { Section, SectionHeader, GlassCard, Badge } from "@/components/ui";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { useState } from "react";

const CARDS = [
  { label: "Primary Vault", balance: "฿3,241,800", usdt: "$127,420", number: "CE-VAULT-001", status: "ACTIVE" },
  { label: "Operations Fund", balance: "฿841,200", usdt: "$33,120", number: "CE-OPS-002", status: "ACTIVE" },
  { label: "Reserve Pool", balance: "฿520,000", usdt: "$20,480", number: "CE-RSV-003", status: "LOCKED" },
];

const CRYPTO = [
  { symbol: "USDT", name: "Tether", amount: "127,420", price: "$1.00", change: "+0.01%", pos: true },
  { symbol: "BTC",  name: "Bitcoin", amount: "2.14", price: "$67,240", change: "+3.2%", pos: true },
  { symbol: "ETH",  name: "Ethereum", amount: "18.5", price: "$3,420", change: "-1.4%", pos: false },
  { symbol: "BNB",  name: "BNB Chain", amount: "84.0", price: "$590", change: "+0.8%", pos: true },
];

export default function SectionFinancial() {
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function handleCopy(v: string) {
    navigator.clipboard.writeText(v).catch(() => {});
    setCopied(v);
    setTimeout(() => setCopied(null), 1800);
  }

  return (
    <Section>
      <SectionHeader title="การเงิน" sub="CE EMPIRE // Financial Operations">
        <button
          onClick={() => setHidden(h => !h)}
          className="flex items-center gap-1.5 cursor-pointer"
          style={{ background: "rgba(0,255,231,0.06)", border: "1px solid rgba(0,255,231,0.2)", borderRadius: 4, padding: "5px 10px", color: "#00ffe7", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.1em" }}
        >
          {hidden ? <Eye size={11} /> : <EyeOff size={11} />}
          {hidden ? "SHOW" : "HIDE"}
        </button>
      </SectionHeader>

      {/* Virtual cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CARDS.map(card => (
          <div
            key={card.number}
            className="relative flex flex-col justify-between p-4 overflow-hidden"
            style={{
              borderRadius: 8,
              border: "1px solid rgba(0,255,231,0.18)",
              background: "linear-gradient(135deg,rgba(0,255,231,0.04) 0%,rgba(3,4,10,0.95) 60%,rgba(255,42,109,0.04) 100%)",
              minHeight: 140,
              backdropFilter: "blur(18px)",
            }}
          >
            {/* Decorative lines */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,255,231,0.4),transparent)" }} />
            <div className="flex justify-between items-start">
              <div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "rgba(0,255,231,0.5)", letterSpacing: "0.12em" }}>{card.label}</div>
                <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#e8b84b", textShadow: "0 0 10px rgba(232,184,75,0.3)", marginTop: 4 }}>
                  {hidden ? "฿ ••••••" : card.balance}
                </div>
              </div>
              <Badge text={card.status} color={card.status === "ACTIVE" ? "neon" : "gold"} />
            </div>
            <div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "rgba(0,255,231,0.4)", marginBottom: 4 }}>
                {hidden ? "USDT ••••••" : `USDT ${card.usdt}`}
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: "#4a5068", letterSpacing: "0.08em" }}>{card.number}</span>
                <button
                  onClick={() => handleCopy(card.number)}
                  style={{ background: "none", border: "none", color: copied === card.number ? "#00ff88" : "rgba(0,255,231,0.4)", cursor: "pointer", padding: 2 }}
                >
                  {copied === card.number ? <Check size={11} /> : <Copy size={11} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Crypto portfolio */}
      <GlassCard className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#00ffe7", letterSpacing: "0.1em" }}>CRYPTO PORTFOLIO</span>
          <Badge text="Live" color="green" />
        </div>
        <div className="flex flex-col gap-0">
          {CRYPTO.map((c, i) => (
            <div
              key={c.symbol}
              className="flex items-center justify-between py-2.5"
              style={{ borderBottom: i < CRYPTO.length - 1 ? "1px solid rgba(0,255,231,0.06)" : "none" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full" style={{ background: "rgba(0,255,231,0.07)", border: "1px solid rgba(0,255,231,0.15)", fontFamily: "'Orbitron',sans-serif", fontSize: "0.45rem", fontWeight: 700, color: "#00ffe7" }}>
                  {c.symbol.slice(0,2)}
                </div>
                <div>
                  <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.62rem", fontWeight: 700, color: "#e8eaf6" }}>{c.symbol}</div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "#4a5068" }}>{c.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#e8eaf6" }}>
                  {hidden ? "••••" : c.amount}
                </div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "#4a5068" }}>{c.price}</div>
              </div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", fontWeight: 700, color: c.pos ? "#00ff88" : "#ff2a6d", textShadow: `0 0 6px ${c.pos ? "rgba(0,255,136,0.4)" : "rgba(255,42,109,0.4)"}`, minWidth: 60, textAlign: "right" }}>
                {c.change}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
