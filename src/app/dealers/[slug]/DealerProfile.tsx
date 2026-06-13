"use client";

/**
 * VERZEICHNIS PROFILE (v2) · a tappable directory entry. Shows a FICTIONAL
 * business with illustrative address/phone/Verifiziert + cosmetic stats and
 * (for the demo dealers that have inventory) their current listings.
 *
 * ⛔ GATE 1 (H-020): every name/address/phone here is a verified-FICTIONAL
 * placeholder (see fixtures/dealers.ts header). The "Verifiziert" badge and the
 * stats are illustrative — disclaimed in-app; we never fake a real network size.
 */

import { useRouter } from "next/navigation";
import { NavShell } from "@/components/NavShell";
import { CompactListingCard } from "@/components/ListingCard";
import { DemoNote } from "@/components/DemoNote";
import { Avatar, Badge } from "@/components/ui";
import { dealerBySlug } from "@/fixtures/dealers";
import { carsByDealer } from "@/fixtures/cars";

export function DealerProfile({ slug }: { slug: string }) {
  const router = useRouter();
  const d = dealerBySlug(slug);

  if (!d) {
    return (
      <NavShell>
        <button onClick={() => router.back()} className="tap" style={backStyle}>← Zurück</button>
        <DemoNote>Betrieb nicht gefunden (Demo).</DemoNote>
      </NavShell>
    );
  }

  const cars = carsByDealer(d.id);

  return (
    <NavShell>
      <button onClick={() => router.back()} className="tap" style={backStyle}>← Verzeichnis</button>

      {/* identity header */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
        <Avatar name={d.name} size={56} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, textTransform: "uppercase", margin: "0 0 4px", lineHeight: 1.05 }}>
            {d.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {d.verified ? <Badge tone="verified">Verifiziert</Badge> : <Badge tone="neutral">Nicht geprüft</Badge>}
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{d.city} · seit {d.since}</span>
          </div>
        </div>
      </div>

      {/* cosmetic stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <Stat value={`★ ${d.rating.toFixed(1)}`} label="Bewertung" />
        <Stat value={String(d.cars)} label="Inserate" />
        <Stat value={String(d.deals)} label="Abschlüsse" />
      </div>

      {/* contact (illustrative) */}
      <div style={{ background: "#fff", border: "1.5px solid var(--line)", borderRadius: "var(--radius)", padding: 12, marginBottom: 12 }}>
        <Line k="Adresse" v={d.address} />
        <Line k="Telefon" v={d.phone} />
      </div>

      <p style={{ fontSize: 13, color: "#444", margin: "0 0 16px", lineHeight: 1.5 }}>{d.blurb}</p>

      {/* this dealer's listings, if any */}
      {cars.length > 0 && (
        <>
          <h2 style={sectionTitle}>Aktuelle Inserate</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
            {cars.map((c) => (
              <CompactListingCard key={c.id} car={c} />
            ))}
          </div>
        </>
      )}

      <DemoNote>
        Adresse, Telefon, Bewertung und „Verifiziert“ sind illustrativ und gehören
        zu einem fiktiven Betrieb. In der echten App stehen hier geprüfte Angaben.
      </DemoNote>
    </NavShell>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ flex: 1, background: "var(--white)", border: "1.5px solid var(--line)", borderRadius: "var(--radius)", padding: "10px 8px", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--ink)" }}>{value}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".3px" }}>{label}</div>
    </div>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f0f0f0", gap: 10 }}>
      <span style={{ fontSize: 12, color: "var(--muted)", flexShrink: 0 }}>{k}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", textAlign: "right" }}>{v}</span>
    </div>
  );
}

const backStyle: React.CSSProperties = {
  background: "none", border: "none", color: "var(--muted)",
  fontFamily: "var(--font-mono)", fontSize: 12, padding: "0 0 10px", cursor: "pointer",
};
const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, textTransform: "uppercase",
  letterSpacing: ".4px", margin: "0 0 10px",
};
