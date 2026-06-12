"use client";

/**
 * SCENE 6 · VERIFIED DIRECTORY (trust). Local dealers with illustrative
 * "Verifiziert" badges — attach the interview's trust question here. The
 * badges are obviously illustrative; we never fake a network size (H-011).
 */

import { NavShell } from "@/components/NavShell";
import { DemoNote } from "@/components/DemoNote";
import { Avatar, Badge, PageTitle } from "@/components/ui";
import { DEALERS, type Dealer } from "@/fixtures/dealers";

export default function DealersPage() {
  // Verified first, then by founding year (oldest = most established).
  const sorted = [...DEALERS].sort((a, b) => {
    if (a.verified !== b.verified) return a.verified ? -1 : 1;
    return a.since - b.since;
  });

  return (
    <NavShell>
      <PageTitle>Verzeichnis</PageTitle>
      <p style={{ fontSize: 12, color: "var(--muted)", margin: "0 0 14px" }}>
        Lokale Händler im Netzwerk. Verifizierte Betriebe wurden geprüft.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map((d) => (
          <DealerRow key={d.id} d={d} />
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <DemoNote>
          „Verifiziert“ ist hier illustrativ. In der echten App steht dahinter eine
          Prüfung (Handelsregister, Referenzen) — Vertrauen ist der Kern.
        </DemoNote>
      </div>
    </NavShell>
  );
}

function DealerRow({ d }: { d: Dealer }) {
  return (
    <div
      className="dealer-row"
      style={{
        display: "flex",
        gap: 11,
        alignItems: "flex-start",
        background: "#fff",
        border: "1.5px solid var(--line)",
        borderRadius: "var(--radius)",
        padding: 12,
      }}
    >
      <Avatar name={d.name} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 14 }}>{d.name}</span>
          {d.verified ? <Badge tone="verified">Verifiziert</Badge> : <Badge tone="neutral">Nicht geprüft</Badge>}
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
          {d.city} · seit {d.since} · {d.cars} Fahrzeuge
        </div>
        <p style={{ fontSize: 12, color: "#444", margin: "6px 0 0", lineHeight: 1.45 }}>{d.blurb}</p>
      </div>
    </div>
  );
}
