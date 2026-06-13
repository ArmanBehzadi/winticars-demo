"use client";

/**
 * CONCEPT TEST (H-029) · agent-to-agent (AI) negotiation mock.
 * Deliberately labelled "Konzept · simuliert" throughout — this overrides the
 * H-011 AI ban for THIS ONE scene because the point is to measure appetite for
 * agent-mediated negotiation. Honesty rules baked in: persistent banner; every
 * path hands back to humans ("der Händler meldet sich"); fictional car/prices;
 * NO payment/commission UI; NO VIN in the info card. All scripted + faked.
 */

import { useEffect, useRef, useState } from "react";
import { DemoNote } from "@/components/DemoNote";
import { Button, chf } from "@/components/ui";
import { fakeLatency } from "@/demo/latency";
import type { Car } from "@/fixtures/cars";

type Who = "you" | "seller";
type Item =
  | { kind: "msg"; id: string; who: Who; text: string }
  | { kind: "info"; id: string }
  | { kind: "offer"; id: string; amount: number; terms: string };

type Phase = "loading" | "brief" | "thinking" | "ask" | "offer" | "seller" | "done";

// Distributive Omit so the discriminated union keeps its per-variant fields.
type NewItem = Item extends infer T ? (T extends Item ? Omit<T, "id"> : never) : never;

const MIC_TRANSCRIPT = "Frag nach dem besten Preis und ob eine Abholung diese Woche möglich ist.";

export function AgentNegotiation({ car }: { car: Car }) {
  const [items, setItems] = useState<Item[]>([]);
  const [phase, setPhase] = useState<Phase>("loading");
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const idRef = useRef(0);
  const started = useRef(false);

  const nid = () => `n-${idRef.current++}`;
  const push = (it: NewItem) => setItems((p) => [...p, { ...it, id: nid() } as Item]);

  const concession = car.priceChf - 800; // fictional round concession (Konzept)

  // Kickoff: your agent pings, the seller-agent answers with an info card.
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    (async () => {
      push({ kind: "msg", who: "you", text: "Anfrage gesendet — Interesse an diesem Fahrzeug." });
      await fakeLatency(700);
      push({ kind: "info" });
      setPhase("brief");
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function micTap() {
    if (listening) return;
    setListening(true);
    setDraft("");
    setTimeout(() => {
      setDraft(MIC_TRANSCRIPT);
      setListening(false);
    }, 1200);
  }

  async function submitBrief() {
    const brief = draft.trim();
    if (!brief || phase !== "brief") return;
    setDraft("");
    setPhase("thinking");
    push({ kind: "msg", who: "you", text: brief });
    await fakeLatency(800);
    push({ kind: "msg", who: "seller", text: `Das Fahrzeug ist verfügbar. Richtpreis ${chf(car.priceChf)}. Bei seriösem Interesse ist ein fairer Abschluss möglich.` });
    await fakeLatency(800);
    push({ kind: "msg", who: "you", text: "Mein Mandant prüft. Wäre bei Abholung diese Woche ein Entgegenkommen möglich?" });
    await fakeLatency(800);
    push({ kind: "msg", who: "seller", text: `Bei Abholung bis Freitag kann ich ${chf(concession)} anbieten.` });
    await fakeLatency(500);
    setPhase("ask");
  }

  async function answerAsk(yes: boolean) {
    setPhase("thinking");
    if (yes) {
      push({ kind: "msg", who: "you", text: "Gut, halte das bitte als Angebot fest." });
      await fakeLatency(600);
      push({ kind: "offer", amount: concession, terms: "Abholung bis Freitag" });
    } else {
      push({ kind: "msg", who: "you", text: "Halte es unverbindlich — zum Richtpreis, ohne Zusagen." });
      await fakeLatency(600);
      push({ kind: "offer", amount: car.priceChf, terms: "unverbindlich, Termin offen" });
    }
    setPhase("seller");
  }

  async function sellerDecision(kind: "accept" | "reject" | "counter", amount: number) {
    setPhase("thinking");
    if (kind === "accept") {
      push({ kind: "msg", who: "seller", text: "Angenommen ✓ Der Händler meldet sich bei Ihnen für die Übergabe." });
    } else if (kind === "reject") {
      push({ kind: "msg", who: "seller", text: "Aktuell nicht möglich — der Händler meldet sich mit Alternativen." });
    } else {
      push({ kind: "msg", who: "seller", text: `Gegenvorschlag: ${chf(amount + 400)}. Ihr Agent leitet es weiter — der Händler meldet sich.` });
    }
    await fakeLatency(400);
    setPhase("done");
  }

  const lastOffer = [...items].reverse().find((i) => i.kind === "offer") as Extract<Item, { kind: "offer" }> | undefined;

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* persistent honesty banner */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: ".4px",
          color: "var(--red)",
          background: "#fdecec",
          border: "1px solid #f5b9b8",
          borderRadius: "var(--radius)",
          padding: "6px 10px",
          textAlign: "center",
        }}
      >
        🤖 Konzept · simuliert — KI-Agenten verhandeln (Demo)
      </div>

      {/* feed */}
      {items.map((it) => {
        if (it.kind === "info") return <InfoCard key={it.id} car={car} />;
        if (it.kind === "offer") return <OfferCard key={it.id} amount={it.amount} terms={it.terms} />;
        return <AgentBubble key={it.id} who={it.who} text={it.text} />;
      })}

      {phase === "thinking" && <AgentBubble who="seller" text="…" typing />}

      {/* brief composer (text + faked mic) */}
      {phase === "brief" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
            Was soll Ihr Agent aushandeln?
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <textarea
              value={listening ? "" : draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={listening ? "Hört zu…" : "z.B. Bestpreis & Abholung diese Woche"}
              rows={2}
              disabled={listening}
              style={{
                flex: 1, resize: "none", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.4,
                padding: "9px 10px", borderRadius: "var(--radius)", border: "1.5px solid var(--line)",
                background: listening ? "#fafafa" : "var(--white)", color: "var(--ink)", outline: "none",
              }}
            />
            <button
              onClick={micTap}
              className="tap"
              aria-label="Sprachnachricht (Demo)"
              style={{
                fontSize: 18, minHeight: 40, minWidth: 44, borderRadius: "var(--radius)", cursor: "pointer",
                border: listening ? "2px solid var(--red)" : "1.5px solid var(--line)",
                background: listening ? "#fdecec" : "#fff",
              }}
            >
              {listening ? "●" : "🎤"}
            </button>
          </div>
          <Button onClick={submitBrief} disabled={!draft.trim() || listening} style={{ opacity: draft.trim() && !listening ? 1 : 0.5 }}>
            An meinen Agenten senden
          </Button>
        </div>
      )}

      {/* Ja/Nein moment */}
      {phase === "ask" && (
        <div style={{ background: "#fff", border: "1.5px solid var(--red)", borderRadius: "var(--radius)", padding: 12 }}>
          <p style={{ fontSize: 13, margin: "0 0 10px", lineHeight: 1.45 }}>
            <strong>Ihr Agent fragt:</strong> Der Verkäufer bietet {chf(concession)} bei Abholung bis Freitag.
            Soll ich das als Angebot festhalten?
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <Button style={{ flex: 1 }} onClick={() => answerAsk(true)}>Ja</Button>
            <Button variant="ghost" style={{ flex: 1 }} onClick={() => answerAsk(false)}>Nein</Button>
          </div>
        </div>
      )}

      {/* seller-side inline decision */}
      {phase === "seller" && lastOffer && (
        <div style={{ background: "#fafafa", border: "1.5px dashed var(--line)", borderRadius: "var(--radius)", padding: 12 }}>
          <p style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: ".4px", margin: "0 0 8px" }}>
            Verkäufer-Agent · Ihre Reaktion (Demo)
          </p>
          <div style={{ display: "flex", gap: 6 }}>
            <Button style={{ flex: 1, fontSize: 11, padding: "0 8px" }} onClick={() => sellerDecision("accept", lastOffer.amount)}>Annehmen</Button>
            <Button variant="ghost" style={{ flex: 1, fontSize: 11, padding: "0 8px" }} onClick={() => sellerDecision("reject", lastOffer.amount)}>Ablehnen</Button>
            <Button variant="ghost" style={{ flex: 1, fontSize: 11, padding: "0 8px" }} onClick={() => sellerDecision("counter", lastOffer.amount)}>Gegenvorschlag</Button>
          </div>
        </div>
      )}

      {phase === "done" && (
        <DemoNote>
          Konzept · simuliert — am Ende übernehmen immer Menschen. Kein verbindlicher
          Abschluss und keine Zahlung in der Demo. Würde Sie so etwas interessieren?
        </DemoNote>
      )}
    </div>
  );
}

function InfoCard({ car }: { car: Car }) {
  // Verkäufer-Agent's instant info card. NO VIN / Stammnummer.
  return (
    <div style={{ alignSelf: "flex-start", maxWidth: "92%" }}>
      <AgentLabel who="seller" />
      <div style={{ background: "#fff", border: "1.5px solid var(--line)", borderRadius: "var(--radius)", padding: 12 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, textTransform: "uppercase", marginBottom: 6 }}>
          {car.make} {car.model}
        </div>
        <Row k="Jahr" v={String(car.year)} />
        <Row k="Kilometer" v={`${car.mileageKm.toLocaleString("de-CH")} km`} />
        <Row k="MFK" v={car.mfkLabel ?? "—"} />
        <Row k="Zustand" v={car.accident ?? "—"} />
        <Row k="Richtpreis" v={chf(car.priceChf)} accent />
        <Row k="Verfügbarkeit" v="Sofort verfügbar" />
      </div>
    </div>
  );
}

function OfferCard({ amount, terms }: { amount: number; terms: string }) {
  return (
    <div style={{ alignSelf: "flex-start", maxWidth: "92%" }}>
      <AgentLabel who="you" />
      <div style={{ background: "#fff", border: "2px solid var(--red)", borderRadius: "var(--radius)", padding: 12 }}>
        <p style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".4px", margin: "0 0 4px" }}>
          Konzept-Angebot
        </p>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--red)" }}>{chf(amount)}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{terms}</div>
      </div>
    </div>
  );
}

function AgentBubble({ who, text, typing }: { who: Who; text: string; typing?: boolean }) {
  const mine = who === "you";
  return (
    <div style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "82%" }}>
      <AgentLabel who={who} right={mine} />
      <div
        className="fade-in"
        style={{
          background: mine ? "var(--red)" : "#fff",
          color: mine ? "#fff" : "var(--ink)",
          border: mine ? "none" : "1.5px solid var(--line)",
          borderRadius: "var(--radius)",
          padding: "8px 11px",
          fontSize: 13,
          lineHeight: 1.45,
        }}
      >
        {typing ? <span className="spinner" /> : text}
      </div>
    </div>
  );
}

function AgentLabel({ who, right }: { who: Who; right?: boolean }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, textTransform: "uppercase",
        letterSpacing: ".5px", color: "var(--muted)", margin: "0 2px 3px", textAlign: right ? "right" : "left",
      }}
    >
      {who === "you" ? "🤖 Ihr Agent" : "🤖 Verkäufer-Agent"}
    </div>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: "1px solid #f4f4f4" }}>
      <span style={{ fontSize: 12, color: "var(--muted)" }}>{k}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: accent ? "var(--red)" : "var(--ink)" }}>{v}</span>
    </div>
  );
}
