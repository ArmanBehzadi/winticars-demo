"use client";

/**
 * SCENE 1 · THE BOARD (dealer hero) — browse local dealer inventory + filters.
 * Doubles as the dashboard: when logged in as a dealer it leads with a greeting,
 * quick stats, and the "just-traded car → organise transport" entry to Scene 4.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { NavShell } from "@/components/NavShell";
import { ListingCard } from "@/components/ListingCard";
import { CarPhoto } from "@/components/CarPhoto";
import { Input, Select, Badge, PageTitle, chf } from "@/components/ui";
import { useDemo } from "@/demo/store";
import { CARS, justTradedCar } from "@/fixtures/cars";
import { dealerById, ME_DEALER_ID } from "@/fixtures/dealers";

const FUELS = ["", "Benzin", "Diesel", "Hybrid", "Elektro"];

export default function BoardPage() {
  const { role } = useDemo();
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

  const isDealer = role === "dealer";

  return (
    <NavShell>
      {isDealer && <DealerDashboard count={rows.length} />}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "4px 0 12px" }}>
        <PageTitle>Fahrzeugbörse</PageTitle>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          {rows.length} {rows.length === 1 ? "Inserat" : "Inserate"}
        </span>
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

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
        {rows.map((car) => (
          <ListingCard key={car.id} car={car} />
        ))}
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

/** Dashboard strip shown to a logged-in dealer (board doubles as dashboard). */
function DealerDashboard({ count }: { count: number }) {
  const me = dealerById(ME_DEALER_ID);
  const traded = justTradedCar();
  return (
    <div style={{ marginBottom: 18 }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)", margin: "0 0 10px" }}>
        Grüezi, <strong style={{ color: "var(--ink)" }}>{me?.name}</strong> 👋
      </p>

      {/* quick stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <Stat value={String(count)} label="auf dem Board" />
        <Stat value="3" label="meine Inserate" />
        <Stat value="2" label="offene Anfragen" />
      </div>

      {/* just-traded car → Scene 4 entry */}
      {traded && (
        <Link href={`/order/${traded.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
          <div
            className="press"
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              background: "var(--white)",
              border: "1.5px solid var(--line)",
              borderLeft: "3px solid var(--red)",
              borderRadius: "var(--radius)",
              padding: 10,
            }}
          >
            <div style={{ width: 96, flexShrink: 0 }}>
              <CarPhoto car={traded} rounded />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Badge tone="red" style={{ marginBottom: 4 }}>{traded.tradedLabel ?? "Verkauft"}</Badge>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 16,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {traded.make} {traded.model}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{chf(traded.priceChf)}</div>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                color: "var(--red)",
                whiteSpace: "nowrap",
              }}
            >
              Transport →
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        flex: 1,
        background: "var(--white)",
        border: "1.5px solid var(--line)",
        borderRadius: "var(--radius)",
        padding: "10px 8px",
        textAlign: "center",
      }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--ink)" }}>
        {value}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".3px" }}>
        {label}
      </div>
    </div>
  );
}
