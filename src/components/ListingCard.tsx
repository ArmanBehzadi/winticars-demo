import Link from "next/link";
import { Avatar, Badge, chf } from "@/components/ui";
import { CarPhoto } from "@/components/CarPhoto";
import type { Car } from "@/fixtures/cars";
import { dealerById } from "@/fixtures/dealers";

/** Board card — dealer ribbon, cover, red price (production look). */
export function ListingCard({ car }: { car: Car }) {
  const dealer = dealerById(car.dealerId);
  const title = `${car.make} ${car.model}`;
  const specs = [String(car.year), `${car.mileageKm.toLocaleString("de-CH")} km`, car.fuel, car.transmission];

  return (
    <Link href={`/listings/${car.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div
        className="listing-card"
        style={{
          background: "var(--white)",
          border: "1.5px solid var(--line)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
        }}
      >
        {/* dealer ribbon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderBottom: "1px solid var(--line)",
            background: "#fafafa",
          }}
        >
          <Avatar name={dealer?.name ?? "?"} size={26} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: ".4px",
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {dealer?.name}
          </span>
          {dealer?.city && (
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{dealer.city}</span>
          )}
          {dealer?.verified && <Badge tone="verified">Verifiziert</Badge>}
        </div>

        <CarPhoto car={car} />

        <div style={{ padding: "12px 14px 14px" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 19,
              textTransform: "uppercase",
              letterSpacing: ".3px",
              margin: "0 0 4px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </p>
          <p style={{ fontSize: 12, color: "var(--muted)", margin: "0 0 10px" }}>
            {specs.join(" · ")}
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 22,
              color: "var(--red)",
              margin: "0 0 10px",
              letterSpacing: ".3px",
            }}
          >
            {chf(car.priceChf)}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" }}>
            {car.vatLabel && <Badge tone="neutral">{car.vatLabel}</Badge>}
            {car.mfkLabel && <Badge tone="status">{car.mfkLabel}</Badge>}
            <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: "auto" }}>
              {car.daysOnBoard === 0 ? "Heute" : `${car.daysOnBoard}d`} im Board
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
