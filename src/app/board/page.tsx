"use client";

/**
 * SCENE 1 · THE BOARD (dealer hero) — browse local dealer inventory + filters.
 * v2: no dashboard/stats strip (removed the only platform-scale-stat surface).
 * A persisted view toggle switches between a dense "Kompakt" list and the
 * "Großansicht" cards. The entry into the create-order flow now lives on the
 * Aufträge page (＋ Auftrag), so nothing orphans.
 */

import { useMemo, useState } from "react";
import { NavShell } from "@/components/NavShell";
import { ListingCard, CompactListingCard } from "@/components/ListingCard";
import { Input, Select, PageTitle } from "@/components/ui";
import { useDemo } from "@/demo/store";
import { CARS } from "@/fixtures/cars";

const FUELS = ["", "Benzin", "Diesel", "Hybrid", "Elektro"];

export default function BoardPage() {
  const { boardView, setBoardView } = useDemo();
  const [make, setMake] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [fuel, setFuel] = useState("");
  const [sort, setSort] = useState("newest");

  const rows = useMemo(() => {
    // Hide the user's just-traded car from the public board (it's "sold").
    let r = CARS.filter((c) => !c.justTraded);
    if (make.trim())
      r = r.filter((c) =>
        `${c.make} ${c.model}`.toLowerCase().includes(make.trim().toLowerCase()),
      );
    if (priceMax) r = r.filter((c) => c.priceChf <= Number(priceMax));
    if (fuel) r = r.filter((c) => c.fuel === fuel);
    if (sort === "priceAsc") r = [...r].sort((a, b) => a.priceChf - b.priceChf);
    else if (sort === "priceDesc") r = [...r].sort((a, b) => b.priceChf - a.priceChf);
    else r = [...r].sort((a, b) => a.daysOnBoard - b.daysOnBoard);
    return r;
  }, [make, priceMax, fuel, sort]);

  const compact = boardView === "compact";

  return (
    <NavShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 0 12px" }}>
        <PageTitle>Fahrzeugbörse</PageTitle>
        <ViewToggle compact={compact} onChange={setBoardView} />
      </div>

      {/* Filters */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 16,
          padding: 12,
          background: "#fafafa",
          border: "1.5px solid var(--line)",
          borderRadius: "var(--radius)",
        }}
      >
        <Field label="Marke / Modell">
          <Input placeholder="z.B. BMW" value={make} onChange={(e) => setMake(e.target.value)} />
        </Field>
        <Field label="Max. Preis">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="30000"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </Field>
        <Field label="Treibstoff">
          <Select value={fuel} onChange={(e) => setFuel(e.target.value)}>
            {FUELS.map((f) => (
              <option key={f} value={f}>{f === "" ? "Alle" : f}</option>
            ))}
          </Select>
        </Field>
        <Field label="Sortierung">
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Neueste zuerst</option>
            <option value="priceAsc">Preis aufsteigend</option>
            <option value="priceDesc">Preis absteigend</option>
          </Select>
        </Field>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          {rows.length} {rows.length === 1 ? "Inserat" : "Inserate"}
        </span>
      </div>

      {/* List — density driven by the persisted view toggle */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: compact ? 8 : 14 }}>
        {rows.map((car) =>
          compact ? <CompactListingCard key={car.id} car={car} /> : <ListingCard key={car.id} car={car} />,
        )}
        {rows.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 20px",
              color: "var(--muted)",
              border: "1.5px dashed var(--line)",
              borderRadius: "var(--radius)",
            }}
          >
            Keine Inserate gefunden — Filter anpassen.
          </div>
        )}
      </div>
    </NavShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: ".5px",
          color: "var(--muted)",
          display: "block",
          marginBottom: 3,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/** Compact ⇄ Großansicht segmented control. */
function ViewToggle({ compact, onChange }: { compact: boolean; onChange: (v: "compact" | "comfortable") => void }) {
  return (
    <div style={{ display: "flex", border: "1.5px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden" }}>
      <ToggleBtn active={compact} onClick={() => onChange("compact")} label="Kompakt" />
      <ToggleBtn active={!compact} onClick={() => onChange("comfortable")} label="Gross" />
    </div>
  );
}

function ToggleBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="tap"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: ".4px",
        padding: "6px 11px",
        cursor: "pointer",
        border: "none",
        background: active ? "var(--red)" : "#fff",
        color: active ? "#fff" : "var(--muted)",
      }}
    >
      {label}
    </button>
  );
}
