"use client";

/**
 * App chrome for the demo: black top bar with the WINTI·CARS wordmark
 * (triple-tap = hidden reset) + a role chip, and a bottom tab bar adapted to
 * the logged-in actor. Redirects to the login entry frame if no actor is set.
 * Handles iOS safe-area insets so it sits right in standalone (Add to Home).
 */

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDemo, ROLE_LABELS, type Role } from "@/demo/store";

type Tab = { href: string; label: string; icon: ReactNode };

const ICONS = {
  board: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 3v3h6V3" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  ),
  directory: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

function tabsFor(role: Role | null): Tab[] {
  // Supply-side actors lead with their inbox; the dealer leads with the board.
  if (role === "transporter" || role === "garage" || role === "painter") {
    return [
      { href: "/orders", label: "Aufträge", icon: ICONS.orders },
      { href: "/board", label: "Börse", icon: ICONS.board },
      { href: "/dealers", label: "Verzeichnis", icon: ICONS.directory },
    ];
  }
  return [
    { href: "/board", label: "Börse", icon: ICONS.board },
    { href: "/orders", label: "Aufträge", icon: ICONS.orders },
    { href: "/dealers", label: "Verzeichnis", icon: ICONS.directory },
  ];
}

export function NavShell({ children }: { children: ReactNode }) {
  const { role, hydrated, reset } = useDemo();
  const router = useRouter();
  const pathname = usePathname();

  // Auth guard — redirect in an effect (never during render) once hydrated.
  useEffect(() => {
    if (hydrated && !role) router.replace("/");
  }, [hydrated, role, router]);

  if (hydrated && !role) return null;

  const tabs = tabsFor(role);

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <TopBar role={role} onReset={() => { reset(); router.replace("/"); }} />

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
          padding: "16px 14px calc(78px + var(--safe-bottom))",
        }}
      >
        {children}
      </main>

      {/* Bottom tab bar */}
      <nav
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          background: "#000",
          paddingBottom: "var(--safe-bottom)",
          borderTop: "2px solid var(--red)",
          zIndex: 20,
        }}
      >
        {tabs.map((t) => {
          const active = pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="tap"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "9px 0 8px",
                textDecoration: "none",
                color: active ? "#fff" : "#8a8a8a",
              }}
            >
              <span style={{ color: active ? "var(--red)" : "#8a8a8a" }}>{t.icon}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".4px",
                }}
              >
                {t.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function TopBar({ role, onReset }: { role: Role | null; onReset: () => void }) {
  // Triple-tap the wordmark within 600 ms → hidden reset for the next interview.
  const taps = useRef<number[]>([]);
  function onLogoTap() {
    const now = performance.now();
    taps.current = [...taps.current.filter((t) => now - t < 600), now];
    if (taps.current.length >= 3) {
      taps.current = [];
      onReset();
    }
  }
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "#000",
        color: "#fff",
        paddingTop: "var(--safe-top)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <span
          onClick={onLogoTap}
          className="tap"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: ".5px",
            cursor: "pointer",
          }}
        >
          WINTI<span style={{ color: "var(--red)" }}>·</span>CARS
        </span>
        <span style={{ flex: 1 }} />
        {role && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".4px",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: "var(--radius)",
              padding: "3px 8px",
            }}
          >
            {ROLE_LABELS[role]}
          </span>
        )}
      </div>
    </header>
  );
}
