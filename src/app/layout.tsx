import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Saira_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/demo/store";

const display = Saira_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Winti Cars",
  description: "B2B-Fahrzeugbörse & Service-Netzwerk Winterthur (Demo)",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Winti Cars",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // extend under the notch; we pad with safe-area insets
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${mono.variable}`}>
      <body>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
