"use client";

/**
 * SCENE 4 · CREATE AN ORDER FROM A JUST-TRADED CAR.
 * Transport is the HERO. Paint + MFK are the SAME flow with a different
 * provider list — a segmented toggle, not three separate screens (H-011).
 * Picking a provider → fake confirm with price + pickup time → order lands in
 * the inbox (Scene 5). NO payment/commission UI — price is the provider quote.
 */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { NavShell } from "@/components/NavShell";
import { CarPhoto } from "@/components/CarPhoto";
import { DemoNote } from "@/components/DemoNote";
import { Badge, Button, Input, chf } from "@/components/ui";
import { useDemo } from "@/demo/store";
import { fakeLatency } from "@/demo/latency";
import { carById } from "@/fixtures/cars";
import { dealerById, ME_DEALER_ID } from "@/fixtures/dealers";
import {
  providersByKind,
  providerById,
  SERVICE_LABELS,
  SERVICE_CTA,
  type ServiceKind,
  type Provider,
} from "@/fixtures/providers";
import type { Order } from "@/fixtures/orders";

const KINDS: ServiceKind[] = ["transport", "paint", "mechanic"];

export function CreateOrder({ carId }: { carId: string }) {
  const router = useRouter();
  const { addOrder } = useDemo();
  const car = carById(carId);

  const [kind, setKind] = useState<ServiceKind>("transport");
  const [dest, setDest] = useState("Zürich-Altstetten");
  const [picked, setPicked] = useState<string | null>(null);
  const [stage, setStage] = useState<"pick" | "placing" | "done">("pick");
  const [placed, setPlaced] = useState<Order | null>(null);

  const providers = useMemo(() => providersByKind(kind), [kind]);

  if (!car) {
    return (
      <NavShell>
        <DemoNote>Fahrzeug nicht gefunden (Demo).</DemoNote>
      </NavShell>
    );
  }
  const carLabel = `${car.make} ${car.model} (${car.year})`;
  const me = dealerById(ME_DEALER_ID);

  async function place() {
    const p = providerById(picked!);
    if (!p) return;
    setStage("placing");
    await fakeLatency(900);
    const order: Order = {
      id: `o-${carId}-${kind}`,
      kind,
      carLabel,
      requesterName: me?.name ?? "Mein Betrieb",
      providerId: p.id,
      providerName: p.name,
      status: "bestätigt",
      priceChf: p.priceFromChf,
      whenText: kind === "transport" ? "Morgen, 14:00 Abholung" : "Termin diese Woche",
      route: kind === "transport" ? `${me?.city ?? "Winterthur"} → ${dest}` : undefined,
      createdText: "gerade eben",
    };
    addOrder(order);
    setPlaced(order);
    setStage("done");
  }

  return (
    <NavShell>
      <button onClick={() => router.back()} className="tap" style={backStyle}>
        ← Zurück
      </button>

      {/* car summary */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <div style={{ width: 110, flexShrink: 0 }}>
          <CarPhoto car={car} rounded />
        </div>
        <div>
          {car.tradedLabel && <Badge tone="red" style={{ marginBottom: 4 }}>{car.tradedLabel}</Badge>}
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, textTransform: "uppercase", margin: 0 }}>
            {car.make} {car.model}
          </h1>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>{chf(car.priceChf)}</div>
        </div>
      </div>

      {stage === "done" && placed ? (
        <Confirmation order={placed} onInbox={() => router.push("/orders")} />
      ) : (
        <>
          <h2 style={sectionTitle}>Service organisieren</h2>

          {/* segmented service toggle — same flow, different supply list */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {KINDS.map((k) => (
              <button
                key={k}
                onClick={() => { setKind(k); setPicked(null); }}
                className="press"
                style={{
                  flex: 1,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".3px",
                  padding: "9px 4px",
                  borderRadius: "var(--radius)",
                  cursor: "pointer",
                  border: kind === k ? "2px solid var(--red)" : "1.5px solid var(--line)",
                  background: kind === k ? "var(--red)" : "#fff",
                  color: kind === k ? "#fff" : "var(--ink)",
                }}
              >
                {SERVICE_LABELS[k]}
              </button>
            ))}
          </div>

          {/* transport-only destination */}
          {kind === "transport" && (
            <div style={{ marginBottom: 14 }}>
              <label style={miniLabel}>Zieladresse</label>
              <Input value={dest} onChange={(e) => setDest(e.target.value)} placeholder="z.B. Zürich" />
            </div>
          )}

          {/* provider list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {providers.map((p) => (
              <ProviderRow
                key={p.id}
                p={p}
                selected={picked === p.id}
                onSelect={() => setPicked(p.id)}
              />
            ))}
          </div>

          <Button
            onClick={place}
            disabled={!picked || stage === "placing"}
            style={{ width: "100%", opacity: picked ? 1 : 0.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            {stage === "placing" ? <><span className="spinner" /> Wird angefragt…</> : SERVICE_CTA[kind]}
          </Button>

          <div style={{ marginTop: 12 }}>
            <DemoNote>
              Lackierung & MFK funktionieren genau gleich — nur die Anbieterliste
              wechselt. Transport ist das Hauptszenario.
            </DemoNote>
          </div>
        </>
      )}
    </NavShell>
  );
}

function ProviderRow({ p, selected, onSelect }: { p: Provider; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="press"
      style={{
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: 11,
        borderRadius: "var(--radius)",
        cursor: "pointer",
        background: "#fff",
        border: selected ? "2px solid var(--red)" : "1.5px solid var(--line)",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 13 }}>{p.name}</span>
          {p.verified && <Badge tone="verified">Verifiziert</Badge>}
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
          {p.city} · ★ {p.rating.toFixed(1)} · {p.etaText}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--red)" }}>
          ab {chf(p.priceFromChf)}
        </div>
        <div style={{ fontSize: 10, color: "var(--muted)" }}>{selected ? "ausgewählt" : "wählen"}</div>
      </div>
    </button>
  );
}

function Confirmation({ order, onInbox }: { order: Order; onInbox: () => void }) {
  return (
    <div className="fade-in" style={{ textAlign: "center", padding: "12px 0" }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#e6f4ea",
          color: "#1a7f37",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
          fontSize: 28,
        }}
      >
        ✓
      </div>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, textTransform: "uppercase", margin: "0 0 6px" }}>
        Auftrag bestätigt
      </h2>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 16px" }}>
        {order.providerName} hat angenommen.
      </p>

      <div style={{ textAlign: "left", background: "#fff", border: "1.5px solid var(--line)", borderRadius: "var(--radius)", padding: 14, marginBottom: 16 }}>
        <Line k="Fahrzeug" v={order.carLabel} />
        <Line k="Anbieter" v={order.providerName} />
        {order.route && <Line k="Route" v={order.route} />}
        <Line k="Termin" v={order.whenText} />
        <Line k="Preis" v={chf(order.priceChf)} accent />
      </div>

      <Button style={{ width: "100%" }} onClick={onInbox}>
        Zu meinen Aufträgen
      </Button>
    </div>
  );
}

function Line({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f0f0f0" }}>
      <span style={{ fontSize: 12, color: "var(--muted)" }}>{k}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: accent ? "var(--red)" : "var(--ink)" }}>{v}</span>
    </div>
  );
}

const backStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--muted)",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  padding: "0 0 10px",
  cursor: "pointer",
};
const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 18,
  textTransform: "uppercase",
  letterSpacing: ".4px",
  margin: "0 0 10px",
};
const miniLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: ".5px",
  color: "var(--muted)",
  display: "block",
  marginBottom: 4,
};
