"use client";

/**
 * AUFTRAG-DETAIL (v2) · car key-data panel + status + a FAKED chat thread.
 * The supply-side hero for transporter/garage/painter interviews. The viewer's
 * "side" (requester = dealer, provider = service) decides bubble alignment and
 * who the canned auto-reply comes from.
 *
 * ⛔ GATE 3 (H-020): the key-data panel shows NO VIN / Stammnummer — Car has no
 * such field and we do not add one. NO payment/commission — price = quote only.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NavShell } from "@/components/NavShell";
import { CarPhoto } from "@/components/CarPhoto";
import { DemoNote } from "@/components/DemoNote";
import { Badge, chf } from "@/components/ui";
import { useDemo } from "@/demo/store";
import { fakeLatency } from "@/demo/latency";
import { carById } from "@/fixtures/cars";
import { SERVICE_LABELS } from "@/fixtures/providers";
import { STATUS_LABELS, STATUS_COLORS, type OrderMessage } from "@/fixtures/orders";

export function OrderDetail({ orderId }: { orderId: string }) {
  const router = useRouter();
  const { role, orders, addMessage } = useDemo();
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <NavShell>
        <button onClick={() => router.back()} className="tap" style={backStyle}>← Zurück</button>
        <DemoNote>Auftrag nicht gefunden (Demo) — zurück zur Übersicht.</DemoNote>
      </NavShell>
    );
  }

  // Viewer side: the dealer is the requester; every supply-side role is provider.
  const mySide: OrderMessage["from"] = role === "dealer" ? "requester" : "provider";
  const car = carById(order.carId);
  const messages = order.messages ?? [];

  async function send() {
    const text = draft.trim();
    if (!text || sending) return;
    setDraft("");
    addMessage(order!.id, { id: uid(), from: mySide, text, timeText: "gerade eben" });
    setSending(true);
    await fakeLatency(800);
    addMessage(order!.id, {
      id: uid(),
      from: mySide === "requester" ? "provider" : "requester",
      text: cannedReply(mySide),
      timeText: "gerade eben",
    });
    setSending(false);
  }

  return (
    <NavShell>
      <button onClick={() => router.back()} className="tap" style={backStyle}>← Zurück</button>

      {/* header: service + status */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Badge tone="neutral">{SERVICE_LABELS[order.kind]}</Badge>
        <span style={{ flex: 1 }} />
        <span
          style={{
            fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, textTransform: "uppercase",
            letterSpacing: ".4px", color: "#fff", background: STATUS_COLORS[order.status],
            borderRadius: "var(--radius)", padding: "2px 8px",
          }}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      {/* car + key data (NO VIN) */}
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        {car && (
          <div style={{ width: 104, flexShrink: 0 }}>
            <CarPhoto car={car} rounded />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, textTransform: "uppercase", margin: "0 0 4px" }}>
            {order.carLabel}
          </h1>
          {car && (
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
              {car.year} · {car.mileageKm.toLocaleString("de-CH")} km · {car.fuel} · {car.transmission}
            </div>
          )}
        </div>
      </div>

      {/* order facts */}
      <div style={{ background: "#fff", border: "1.5px solid var(--line)", borderRadius: "var(--radius)", padding: 12, marginBottom: 16 }}>
        <Line k={mySide === "requester" ? "Anbieter" : "Auftraggeber"} v={mySide === "requester" ? order.providerName : order.requesterName} />
        {order.route && <Line k="Route" v={order.route} />}
        <Line k="Termin" v={order.whenText} />
        <Line k="Richtpreis" v={chf(order.priceChf)} accent />
      </div>

      {/* chat thread */}
      <h2 style={sectionTitle}>Nachrichten</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {messages.length === 0 && (
          <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>Noch keine Nachrichten — schreiben Sie die erste.</p>
        )}
        {messages.map((m) => (
          <Bubble key={m.id} mine={m.from === mySide} text={m.text} time={m.timeText} />
        ))}
        {sending && <Bubble mine={false} text="…" time="" typing />}
      </div>

      {/* composer */}
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Nachricht schreiben…"
          rows={1}
          style={{
            flex: 1, resize: "none", fontFamily: "var(--font-mono)", fontSize: 14, lineHeight: 1.4,
            padding: "9px 10px", borderRadius: "var(--radius)", border: "1.5px solid var(--line)",
            background: "var(--white)", color: "var(--ink)", outline: "none",
          }}
        />
        <button
          onClick={send}
          disabled={!draft.trim() || sending}
          className="press"
          style={{
            fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 13, textTransform: "uppercase",
            letterSpacing: ".5px", minHeight: 40, padding: "0 16px", borderRadius: "var(--radius)",
            cursor: "pointer", border: "2px solid var(--red)", background: "var(--red)", color: "#fff",
            opacity: draft.trim() && !sending ? 1 : 0.5,
          }}
        >
          Senden
        </button>
      </div>

      <div style={{ marginTop: 14 }}>
        <DemoNote>Demo-Chat — Antworten sind vorgefertigt. In der echten App chatten Sie direkt mit dem Betrieb.</DemoNote>
      </div>
    </NavShell>
  );
}

function Bubble({ mine, text, time, typing }: { mine: boolean; text: string; time: string; typing?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
      <div
        className="fade-in"
        style={{
          maxWidth: "78%",
          background: mine ? "var(--red)" : "#fff",
          color: mine ? "#fff" : "var(--ink)",
          border: mine ? "none" : "1.5px solid var(--line)",
          borderRadius: "var(--radius)",
          padding: "8px 11px",
          fontSize: 14,
          lineHeight: 1.45,
        }}
      >
        {typing ? <span className="spinner" /> : text}
        {!typing && time && (
          <div style={{ fontSize: 10, marginTop: 3, opacity: 0.7, color: mine ? "#fff" : "var(--muted)" }}>{time}</div>
        )}
      </div>
    </div>
  );
}

function Line({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f0f0f0" }}>
      <span style={{ fontSize: 12, color: "var(--muted)" }}>{k}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: accent ? "var(--red)" : "var(--ink)", textAlign: "right" }}>{v}</span>
    </div>
  );
}

function cannedReply(mySide: OrderMessage["from"]): string {
  // Reply comes from the OTHER side; keep it quote-only, no payment talk.
  return mySide === "requester"
    ? "Alles klar, ist notiert 👍 Wir melden uns mit der Bestätigung."
    : "Super, danke für die schnelle Antwort!";
}

function uid(): string {
  return `m-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
}

const backStyle: React.CSSProperties = {
  background: "none", border: "none", color: "var(--muted)",
  fontFamily: "var(--font-mono)", fontSize: 12, padding: "0 0 10px", cursor: "pointer",
};
const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, textTransform: "uppercase",
  letterSpacing: ".4px", margin: "0 0 10px",
};
