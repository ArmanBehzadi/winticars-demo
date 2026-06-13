"use client";

/**
 * SCENE 0 · Login = a thin entry frame only (façade, not a validation scene).
 * Any input "works". Pick the actor you're showing → ~2 taps into the app.
 * The role picker also lets Arman run the per-actor interview flow (H-011).
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemo, ROLE_LABELS, type Role } from "@/demo/store";
import { Input } from "@/components/ui";

const ROLE_ORDER: Role[] = ["dealer", "transporter", "garage", "painter"];
const ROLE_SUB: Record<Role, string> = {
  dealer: "Fahrzeuge handeln & finden",
  transporter: "Transportaufträge erhalten",
  garage: "MFK- & Service-Aufträge erhalten",
  painter: "Lackier-Aufträge erhalten",
};

export default function LoginPage() {
  const { role, hydrated, login } = useDemo();
  const router = useRouter();

  // Already logged in (e.g. relaunch) → straight into the app.
  useEffect(() => {
    if (hydrated && role) {
      router.replace(role === "dealer" ? "/board" : "/orders");
    }
  }, [hydrated, role, router]);

  function enter(r: Role) {
    login(r);
    router.replace(r === "dealer" ? "/board" : "/orders");
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "calc(var(--safe-top) + 40px) 22px calc(var(--safe-bottom) + 28px)",
      }}
    >
      {/* Brand hero */}
      <div style={{ marginTop: "8vh", marginBottom: 28 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 52,
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: ".5px",
            margin: 0,
          }}
        >
          WINTI<span style={{ color: "var(--red)" }}>·</span>CARS
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "#aaa",
            margin: "12px 0 0",
            maxWidth: 320,
          }}
        >
          Die lokale B2B-Fahrzeugbörse & das Service-Netzwerk für Winterthur.
        </p>
      </div>

      {/* Cosmetic credential frame — any input works */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 26 }}>
        <Input placeholder="E-Mail" defaultValue="haendler@winti-garage.ch" />
        <Input placeholder="Passwort" type="password" defaultValue="demo1234" />
      </div>

      {/* Role picker (= the login button) */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: ".6px",
          color: "#777",
          margin: "0 0 8px",
        }}
      >
        Eintreten als
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ROLE_ORDER.map((r) => (
          <button
            key={r}
            onClick={() => enter(r)}
            className="press"
            style={{
              textAlign: "left",
              background: "#111",
              border: "1.5px solid #333",
              borderLeft: "3px solid var(--red)",
              borderRadius: "var(--radius)",
              color: "#fff",
              padding: "13px 15px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: ".4px",
              }}
            >
              {ROLE_LABELS[r]}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#999", marginTop: 2 }}>
              {ROLE_SUB[r]}
            </div>
          </button>
        ))}
      </div>

      <span style={{ flex: 1 }} />
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#555", textAlign: "center", marginTop: 24 }}>
        Demo · Beispieldaten · keine echten Fahrzeuge oder Preise
      </p>
    </div>
  );
}
