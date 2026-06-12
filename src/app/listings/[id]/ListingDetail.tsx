"use client";

/**
 * SCENE 2 · LISTING DETAIL → "Händler kontaktieren" → faked inquiry with a
 * canned reply arriving after ~300 ms. Also hosts the SCENE 3 entry: "Teilen".
 */

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavShell } from "@/components/NavShell";
import { CarPhoto } from "@/components/CarPhoto";
import { DemoNote } from "@/components/DemoNote";
import { Avatar, Badge, Button, chf } from "@/components/ui";
import { useDemo } from "@/demo/store";
import { fakeLatency } from "@/demo/latency";
import { carById } from "@/fixtures/cars";
import { dealerById } from "@/fixtures/dealers";
import { cannedReply, DEFAULT_INQUIRY } from "@/fixtures/replies";

type Stage = "idle" | "form" | "sending" | "replied";

export function ListingDetail({ id }: { id: string }) {
  const router = useRouter();
  const { markContacted } = useDemo();
  const car = carById(id);
  const [stage, setStage] = useState<Stage>("idle");
  const [msg, setMsg] = useState(DEFAULT_INQUIRY);

  if (!car) {
    return (
      <NavShell>
        <DemoNote>Dieses Fahrzeug ist in der Demo nicht hinterlegt.</DemoNote>
      </NavShell>
    );
  }
  const dealer = dealerById(car.dealerId);

  async function send() {
    setStage("sending");
    await fakeLatency(700);
    markContacted(car!.id);
    setStage("replied");
  }

  return (
    <NavShell>
      <BackLink onClick={() => router.back()} />

      <CarPhoto car={car} aspect="16/10" rounded />

      {/* dealer ribbon */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "12px 0" }}>
        <Avatar name={dealer?.name ?? "?"} size={30} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 13 }}>
            {dealer?.name}
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>{dealer?.city}</div>
        </div>
        {dealer?.verified && <Badge tone="verified">Verifiziert</Badge>}
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 28,
          textTransform: "uppercase",
          letterSpacing: ".4px",
          margin: "0 0 4px",
        }}
      >
        {car.make} {car.model}
      </h1>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 26,
          color: "var(--red)",
          margin: "0 0 14px",
        }}
      >
        {chf(car.priceChf)}
      </div>

      {/* spec grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          background: "var(--line)",
          border: "1.5px solid var(--line)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          marginBottom: 14,
        }}
      >
        <Spec k="Jahrgang" v={String(car.year)} />
        <Spec k="Kilometer" v={`${car.mileageKm.toLocaleString("de-CH")} km`} />
        <Spec k="Treibstoff" v={car.fuel} />
        <Spec k="Getriebe" v={car.transmission} />
        <Spec k="Karosserie" v={car.bodyType} />
        <Spec k="MFK" v={car.mfkLabel ?? "—"} />
        <Spec k="MwSt." v={car.vatLabel ?? "—"} />
        <Spec k="Zustand" v={car.accident ?? "—"} />
      </div>

      <p style={{ fontSize: 13, lineHeight: 1.5, color: "#333", margin: "0 0 18px" }}>
        {car.description}
      </p>

      {/* contact / share actions */}
      {stage === "idle" && (
        <div style={{ display: "flex", gap: 8 }}>
          <Button style={{ flex: 1 }} onClick={() => setStage("form")}>
            Händler kontaktieren
          </Button>
          <Link href={`/c/${dealer?.slug}--${car.id}`} style={{ textDecoration: "none" }}>
            <Button variant="ghost">Teilen</Button>
          </Link>
        </div>
      )}

      {stage === "form" && (
        <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={labelStyle}>Nachricht an {dealer?.name}</label>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={3}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              padding: 10,
              borderRadius: "var(--radius)",
              border: "1.5px solid var(--line)",
              resize: "none",
            }}
          />
          <Button onClick={send}>Senden</Button>
        </div>
      )}

      {stage === "sending" && (
        <Button disabled style={{ width: "100%", opacity: 0.85, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span className="spinner" /> Wird gesendet…
        </Button>
      )}

      {stage === "replied" && (
        <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* sent bubble */}
          <Bubble side="right">{msg}</Bubble>
          {/* dealer reply */}
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <Avatar name={dealer?.name ?? "?"} size={26} />
            <Bubble side="left">{cannedReply(dealer?.name ?? "")}</Bubble>
          </div>
          <DemoNote>
            In der echten App läuft hier ein Chat mit dem Händler — plus „Transport
            organisieren“ direkt aus der Anfrage.
          </DemoNote>
        </div>
      )}
    </NavShell>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ background: "var(--white)", padding: "8px 10px" }}>
      <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".4px" }}>{k}</div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
    </div>
  );
}

function Bubble({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  const right = side === "right";
  return (
    <div
      style={{
        alignSelf: right ? "flex-end" : "flex-start",
        maxWidth: "82%",
        background: right ? "var(--red)" : "#fff",
        color: right ? "#fff" : "var(--ink)",
        border: right ? "none" : "1.5px solid var(--line)",
        borderRadius: "var(--radius)",
        padding: "9px 12px",
        fontSize: 13,
        lineHeight: 1.45,
      }}
    >
      {children}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: ".5px",
  color: "var(--muted)",
};

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="tap"
      style={{
        background: "none",
        border: "none",
        color: "var(--muted)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        padding: "0 0 10px",
        cursor: "pointer",
      }}
    >
      ← Zurück zur Börse
    </button>
  );
}
