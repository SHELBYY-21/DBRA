import type { Metadata, Viewport } from "next";
import "./ce-empire.css";

export const metadata: Metadata = {
  title: "CE EMPIRE — Command Center",
  description: "CE Empire cyberpunk fintech command center dashboard",
};

export const viewport: Viewport = {
  themeColor: "#03040a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="bg-[#03040a]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Share+Tech+Mono&family=Cinzel:wght@400;600;700&family=Syncopate:wght@400;700&family=Kanit:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
