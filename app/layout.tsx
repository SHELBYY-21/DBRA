import type { Metadata, Viewport } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
