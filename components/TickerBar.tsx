const ITEMS = [
  { text: "SYSTEM NOMINAL", cls: "" },
  { text: "ALL NODES ONLINE", cls: "text-[#00ffe7]" },
  { text: "ENCRYPTION ACTIVE", cls: "" },
  { text: "CE EMPIRE SECURE", cls: "text-[#e8b84b]" },
  { text: "USDT FEED ACTIVE", cls: "text-[#00ffe7]" },
  { text: "AGENT MATRIX READY", cls: "" },
  { text: "COMMAND CENTER LIVE", cls: "text-[#00ffe7]" },
  { text: "FINANCIAL OPS OK", cls: "text-[#e8b84b]" },
  { text: "NEURAL ENGINE SYNC", cls: "" },
  { text: "AUTH LAYER SECURED", cls: "text-[#00ffe7]" },
];

export default function TickerBar() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center overflow-hidden"
      style={{
        height: 28,
        background: "rgba(3,4,10,0.98)",
        borderTop: "1px solid rgba(0,255,231,0.18)",
        boxShadow: "0 -1px 0 rgba(0,255,231,0.06), 0 -8px 24px rgba(0,0,0,0.5)",
      }}
    >
      {/* Label */}
      <div
        className="flex-shrink-0 flex items-center h-full px-3"
        style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "0.46rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: "#03040a",
          background: "#00ffe7",
          boxShadow: "4px 0 12px rgba(0,255,231,0.3)",
          whiteSpace: "nowrap",
        }}
      >
        CE EMPIRE
      </div>

      {/* Scroll track */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="flex items-center gap-8 whitespace-nowrap"
          style={{
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.12em",
            animation: "tickerScroll 30s linear infinite",
            color: "rgba(0,255,231,0.55)",
          }}
        >
          {doubled.map((item, i) => (
            <span key={i} className={`inline-flex items-center gap-2 ${item.cls}`}>
              <span style={{ color: "rgba(0,255,231,0.3)" }}>◆</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
