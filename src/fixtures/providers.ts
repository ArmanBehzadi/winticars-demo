/**
 * ───────────────────────────────────────────────────────────────────────────
 *  DEMO FIXTURE · SERVICE PROVIDERS (transporters · paint shops · MFK/mechanic)
 * ───────────────────────────────────────────────────────────────────────────
 *  The supply side of the "service job" wedge. Transport is the HERO service;
 *  paint + MFK are the "same pattern" variants. Fictional names, round prices.
 * ───────────────────────────────────────────────────────────────────────────
 */

export type ServiceKind = "transport" | "paint" | "mechanic";

export const SERVICE_LABELS: Record<ServiceKind, string> = {
  transport: "Transport",
  paint: "Lackierung",
  mechanic: "MFK / Mechanik",
};

export const SERVICE_CTA: Record<ServiceKind, string> = {
  transport: "Transport anfragen",
  paint: "Lackierung anfragen",
  mechanic: "MFK / Service anfragen",
};

export type Provider = {
  id: string;
  name: string;
  kind: ServiceKind;
  city: string;
  verified: boolean;
  rating: number; // illustrative 0–5
  jobs: number; // illustrative completed-jobs count
  etaText: string; // e.g. "Heute abholbar"
  priceFromChf: number;
  blurb: string;
};

export const PROVIDERS: Provider[] = [
  // ── Transport (hero) ──────────────────────────────────────────────────────
  {
    id: "p-eulach-trans",
    name: "Eulach Transport GmbH",
    kind: "transport",
    city: "Winterthur",
    verified: true,
    rating: 4.8,
    jobs: 210,
    etaText: "Heute abholbar",
    priceFromChf: 120,
    blurb: "Fahrzeugtransport Region Zürich/Ostschweiz · versichert.",
  },
  {
    id: "p-blitz-log",
    name: "BlitzCar Logistik",
    kind: "transport",
    city: "Winterthur-Töss",
    verified: true,
    rating: 4.6,
    jobs: 156,
    etaText: "Morgen abholbar",
    priceFromChf: 95,
    blurb: "Express-Überführungen · auch nicht fahrbereite Fahrzeuge.",
  },
  {
    id: "p-ost-trailer",
    name: "OstSchweiz Trailer",
    kind: "transport",
    city: "Wiesendangen",
    verified: false,
    rating: 4.3,
    jobs: 64,
    etaText: "In 2 Tagen",
    priceFromChf: 80,
    blurb: "Günstige Sammeltransporte für Händler.",
  },
  // ── Paint / Carrosserie ───────────────────────────────────────────────────
  {
    id: "p-lack-toss",
    name: "Lackierwerk Töss",
    kind: "paint",
    city: "Winterthur-Töss",
    verified: true,
    rating: 4.7,
    jobs: 98,
    etaText: "Termin diese Woche",
    priceFromChf: 350,
    blurb: "Smart-Repair & Komplettlackierung · Händlerkonditionen.",
  },
  {
    id: "p-carr-seen",
    name: "Carrosserie Seen",
    kind: "paint",
    city: "Winterthur-Seen",
    verified: false,
    rating: 4.4,
    jobs: 51,
    etaText: "Termin nächste Woche",
    priceFromChf: 290,
    blurb: "Dellen, Kratzer, Aufbereitung vor dem Wiederverkauf.",
  },
  // ── MFK / Mechanic ────────────────────────────────────────────────────────
  {
    id: "p-mfk-express",
    name: "MFK-Express Winterthur",
    kind: "mechanic",
    city: "Oberwinterthur",
    verified: true,
    rating: 4.9,
    jobs: 143,
    etaText: "Vorführung in 3 Tagen",
    priceFromChf: 180,
    blurb: "MFK-Vorbereitung & Vorführung · Service · Bremsen.",
  },
  {
    id: "p-mech-matten",
    name: "Mechanik Mattenbach",
    kind: "mechanic",
    city: "Winterthur-Mattenbach",
    verified: false,
    rating: 4.2,
    jobs: 37,
    etaText: "Termin diese Woche",
    priceFromChf: 150,
    blurb: "Allround-Service, kleine Reparaturen, Pneuwechsel.",
  },
];

export function providersByKind(kind: ServiceKind): Provider[] {
  return PROVIDERS.filter((p) => p.kind === kind);
}

export function providerById(id: string): Provider | undefined {
  return PROVIDERS.find((p) => p.id === id);
}
