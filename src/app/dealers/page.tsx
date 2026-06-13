"use client";

/**
 * SCENE 6 · VERFIED DIRECTORY (trust). Local dealers with illustrative
 * "Verifiziert" badges — attach the interview's trust question here. v2: each
 * row is tappable → a profile page (dealers/[slug]). Names are verified-FICTIONAL
 * (fixtures/dealers.ts header, H-020 gate 1); the badge is obviously illustrative
 * and we never fake a network size (H-011).
 */

import Link from "next/link";
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
        Lokale Händler im Netzwerk. Verifizierte Betriebe wurden geprüft. Tippen für Profil.
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
    <Link href={`/dealers/${d.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div
        className="dealer-row press"
        style={{
          display: "flex",
          gap: 11,
          alignItems: "center",
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
            {d.city} · seit {d.since} · ★ {d.rating.toFixed(1)}
          </div>
          <p style={{ fontSize: 12, color: "#444", margin: "6px 0 0", lineHeight: 1.45 }}>{d.blurb}</p>
        </div>
        <span style={{ color: "var(--muted)", fontSize: 18, flexShrink: 0 }}>›</span>
      </div>
    </Link>
  );
}
