/**
 * ───────────────────────────────────────────────────────────────────────────
 *  DEMO FIXTURE · ORDERS (service jobs)
 * ───────────────────────────────────────────────────────────────────────────
 *  Seed orders shown in the inbox (Scene 5). The transporter/garage sees THEIR
 *  side; the dealer sees the ones they placed. Orders created live during the
 *  demo (Scene 4) are prepended to this list in the demo store.
 *
 *  NO payment / commission fields — the price shown is just the provider's
 *  quote, never a platform cut (H-011 must-not-show).
 * ───────────────────────────────────────────────────────────────────────────
 */

import type { ServiceKind } from "@/fixtures/providers";

export type OrderStatus = "angefragt" | "bestätigt" | "unterwegs" | "erledigt";

export const STATUS_LABELS: Record<OrderStatus, string> = {
  angefragt: "Angefragt",
  bestätigt: "Bestätigt",
  unterwegs: "Unterwegs",
  erledigt: "Erledigt",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  angefragt: "#d97706", // amber
  bestätigt: "#2563eb", // blue
  unterwegs: "#7c3aed", // violet
  erledigt: "#1a7f37", // green
};

export type Order = {
  id: string;
  kind: ServiceKind;
  carLabel: string; // "BMW 320d Touring (2019)"
  requesterName: string; // dealer who placed it
  providerId: string;
  providerName: string;
  status: OrderStatus;
  priceChf: number;
  whenText: string; // "Morgen, 14:00"
  route?: string; // transport only — "Winterthur → Zürich"
  createdText: string; // "vor 2 Std."
};

/**
 * Seed inbox so both supply-side actors have content on first view.
 * Two are addressed to providers the demo user might "be"; mix of statuses.
 */
export const SEED_ORDERS: Order[] = [
  {
    id: "o-1001",
    kind: "transport",
    carLabel: "Audi A3 Sportback (2019)",
    requesterName: "Auto Töss AG",
    providerId: "p-eulach-trans",
    providerName: "Eulach Transport GmbH",
    status: "unterwegs",
    priceChf: 140,
    whenText: "Heute, 16:30",
    route: "Winterthur → Zürich-Altstetten",
    createdText: "vor 1 Std.",
  },
  {
    id: "o-1002",
    kind: "transport",
    carLabel: "Skoda Octavia Combi (2018)",
    requesterName: "Garage Eulachpark",
    providerId: "p-eulach-trans",
    providerName: "Eulach Transport GmbH",
    status: "angefragt",
    priceChf: 110,
    whenText: "Morgen, 09:00",
    route: "Winterthur-Seen → Frauenfeld",
    createdText: "vor 3 Std.",
  },
  {
    id: "o-1003",
    kind: "paint",
    carLabel: "VW Golf 1.5 TSI (2020)",
    requesterName: "Stadtgarage Seen",
    providerId: "p-lack-toss",
    providerName: "Lackierwerk Töss",
    status: "bestätigt",
    priceChf: 420,
    whenText: "Do, 08:00 Annahme",
    createdText: "gestern",
  },
  {
    id: "o-1004",
    kind: "mechanic",
    carLabel: "Opel Corsa 1.2 (2020)",
    requesterName: "Autocenter Wülflingen",
    providerId: "p-mfk-express",
    providerName: "MFK-Express Winterthur",
    status: "erledigt",
    priceChf: 180,
    whenText: "Mo, MFK bestanden",
    createdText: "vor 4 Tagen",
  },
];
