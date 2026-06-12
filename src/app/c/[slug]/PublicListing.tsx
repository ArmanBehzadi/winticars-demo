"use client";

/**
 * SCENE 3 · "TEILEN" → public listing page + WhatsApp-share preview.
 * This is the PUBLIC view a non-member sees when a dealer shares the link —
 * the likely true early wedge. Standalone (no app nav): it's the outside view.
 */

import { useState } from "react";
import Link from "next/link";
import { CarPhoto } from "@/components/CarPhoto";
import { Avatar, Badge, Button, chf } from "@/components/ui";
import { fakeLatency } from "@/demo/latency";
import { carById } from "@/fixtures/cars";
import { dealerById } from "@/fixtures/dealers";

export function PublicListing({ carId }: { carId: string }) {
  const car = carById(carId);
  const [shared, setShared] = useState(false);
  const [sharing, setSharing] = useState(false);

  if (!car) {
    return (
      <Centered>
        <p style={{ color: "var(--muted)" }}>Inserat nicht gefunden (Demo).</p>
        <Link href="/board"><Button>Zur Börse</Button></Link>
      </Centered>
    );
  }
  const dealer = dealerById(car.dealerId);

  async function share() {
    setSharing(true);
    await fakeLatency(500);
    setSharing(false);
    setShared(true);
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)" }}>
      {/* slim public header */}
      <header
        style={{
          background: "#000",
          color: "#fff",
          padding: "calc(var(--safe-top) + 12px) 16px 12px",
          textAlign: "center",
        }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, textTransform: "uppercase", letterSpacing: ".5px" }}>
          WINTI<span style={{ color: "var(--red)" }}>·</span>CARS
        </span>
      </header>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "16px 14px calc(24px + var(--safe-bottom))" }}>
        {/* WhatsApp share-preview (link unfurl) */}
        <p style={whatsLabel}>So sieht der geteilte Link aus:</p>
        <div
          style={{
            background: "#dcf8c6",
            borderRadius: 10,
            padding: 8,
            marginBottom: 18,
            maxWidth: 320,
            marginLeft: "auto",
          }}
        >
          <div style={{ background: "#fff", borderRadius: 6, overflow: "hidden", border: "1px solid #cfe8bd" }}>
            <div style={{ height: 96, overflow: "hidden" }}>
              <CarPhoto car={car} aspect="20/9" />
            </div>
            <div style={{ padding: "6px 9px 8px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>
                {car.make} {car.model} — {chf(car.priceChf)}
              </div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>
                {car.year} · {car.mileageKm.toLocaleString("de-CH")} km · {car.fuel}
              </div>
              <div style={{ fontSize: 10, color: "#8aa", marginTop: 4 }}>winticars.ch</div>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 10, color: "#7a9", marginTop: 2 }}>11:24 ✓✓</div>
        </div>

        {/* the public listing itself */}
        <div style={{ background: "#fff", border: "1.5px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden" }}>
          <CarPhoto car={car} aspect="16/9" />
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Avatar name={dealer?.name ?? "?"} size={26} />
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12, flex: 1 }}>
                {dealer?.name}
              </span>
              {dealer?.verified && <Badge tone="verified">Verifiziert</Badge>}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, textTransform: "uppercase", margin: "0 0 2px" }}>
              {car.make} {car.model}
            </h1>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--red)", marginBottom: 8 }}>
              {chf(car.priceChf)}
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", margin: "0 0 12px" }}>
              {car.year} · {car.mileageKm.toLocaleString("de-CH")} km · {car.fuel} · {car.transmission} · {dealer?.city}
            </p>

            {!shared ? (
              <Button
                onClick={share}
                style={{ width: "100%", background: "#25d366", borderColor: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                {sharing ? <><span className="spinner" /> Wird geteilt…</> : "Per WhatsApp teilen"}
              </Button>
            ) : (
              <div className="fade-in" style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#1a7f37", fontWeight: 600 }}>
                  ✓ Link bereit zum Teilen
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                  winticars.ch/c/{dealer?.slug}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 18 }}>
          <Link href="/board" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
            ← Zurück zur App
          </Link>
        </div>
      </div>
    </div>
  );
}

const whatsLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: ".5px",
  color: "var(--muted)",
  textAlign: "right",
  margin: "0 0 6px",
  maxWidth: 320,
  marginLeft: "auto",
};

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 24 }}>
      {children}
    </div>
  );
}
