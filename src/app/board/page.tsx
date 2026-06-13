"use client";

/**
 * SCENE 1 · THE BOARD (dealer hero) — browse local dealer inventory.
 * v2: no dashboard/stats strip (removed the only platform-scale-stat surface).
 * v2.1 (Arman feedback #1): no filter panel either — the first car must be
 * visible immediately on a 390px iPhone with no scroll. Only a minimal header
 * (title + persisted Kompakt/Gross view toggle + count) sits above the list.
 * The entry into the create-order flow lives on the Aufträge page (＋ Auftrag).
 */

import { NavShell } from "@/components/NavShell";
import { ListingCard, CompactListingCard } from "@/components/ListingCard";
import { PageTitle } from "@/components/ui";
import { useDemo } from "@/demo/store";
import { CARS } from "@/fixtures/cars";

// Hide the user's just-traded car (it's "sold"); newest on the board first.
const ROWS = CARS.filter((c) => !c.justTraded).sort((a, b) => a.daysOnBoard - b.daysOnBoard);

export default function BoardPage() {
  const { boardView, setBoardView } = useDemo();
  const compact = boardView === "compact";

  return (
    <NavShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <PageTitle>Fahrzeugbörse</PageTitle>
        <ViewToggle compact={compact} onChange={setBoardView} />
      </div>

      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>
        {ROWS.length} Inserate
      </div>

      {/* List — density driven by the persisted view toggle */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: compact ? 8 : 14 }}>
        {ROWS.map((car) =>
          compact ? <CompactListingCard key={car.id} car={car} /> : <ListingCard key={car.id} car={car} />,
        )}
      </div>
    </NavShell>
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
