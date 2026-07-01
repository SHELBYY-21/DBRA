import type { Metadata, Viewport } from "next";
import "./ce-empire.css";

export const metadata: Metadata = {
  title: "C.E. EMPIRE — BUILD • GROW • EMPOWER",
  description: "C.E. Empire — สร้าง เติบโต เสริมพลัง ไปด้วยกัน",
};

export const viewport: Viewport = {
  themeColor: "#03060D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="bg-[#03060D]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=JetBrains+Mono:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&subset=thai,latin&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
