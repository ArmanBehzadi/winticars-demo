/**
 * ───────────────────────────────────────────────────────────────────────────
 *  DEMO FIXTURE · ORDERS (service jobs)
 * ───────────────────────────────────────────────────────────────────────────
 *  Seed orders shown in the inbox (Scene 5). The transporter/garage/painter
 *  sees THEIR side; the dealer sees the ones they placed. Orders created live
 *  during the demo (Scene 4) are prepended to this list in the demo store.
 *
 *  Each order carries a `carId` (→ cars.ts) and a faked `messages` thread shown
 *  on the Auftrag-detail screen. NO payment / commission fields — the price
 *  shown is just the provider's quote, never a platform cut (H-011 must-not-show).
 *  The detail "key data" panel shows NO VIN / Stammnummer (H-020 gate 3).
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

/** A faked chat message on an order. `from` = who wrote it (perspective-aware). */
export type OrderMessage = {
  id: string;
  from: "requester" | "provider"; // requester = the dealer; provider = the service
  text: string;
  timeText: string; // "vor 2 Std."
};

export type Order = {
  id: string;
  kind: ServiceKind;
  carId: string; // → cars.ts (drives the detail key-data panel)
  carLabel: string; // "BMW 320d Touring (2019)"
  requesterName: string; // dealer who placed it
  providerId: string;
  providerName: string;
  status: OrderStatus;
  priceChf: number;
  whenText: string; // "Morgen, 14:00"
  route?: string; // transport only — "Winterthur → Zürich"
  createdText: string; // "vor 2 Std."
  messages: OrderMessage[]; // faked thread
};

/**
 * Seed inbox so every supply-side actor (transport / MFK / paint) AND the
 * demo dealer ("Auto Eulachblick GmbH") have content on first view. Mix of
 * statuses; several "angefragt" so the supply side has something to "Annehmen".
 */
export const SEED_ORDERS: Order[] = [
  {
    id: "o-1001",
    kind: "transport",
    carId: "c-a3",
    carLabel: "Audi A3 Sportback (2019)",
    requesterName: "Rietwies Automobile AG",
    providerId: "p-eulach-trans",
    providerName: "Eulach Transport GmbH",
    status: "unterwegs",
    priceChf: 140,
    whenText: "Heute, 16:30",
    route: "Winterthur → Zürich-Altstetten",
    createdText: "vor 1 Std.",
    messages: [
      { id: "m-1", from: "requester", text: "Grüezi, ist die Abholung um 16:30 ok? Schlüssel liegt beim Empfang.", timeText: "vor 2 Std." },
      { id: "m-2", from: "provider", text: "Ja, Fahrer ist unterwegs. Melde mich 10 Min vorher.", timeText: "vor 1 Std." },
      { id: "m-3", from: "provider", text: "Bin gerade losgefahren 👍", timeText: "vor 20 Min." },
    ],
  },
  {
    id: "o-1002",
    kind: "transport",
    carId: "c-octavia",
    carLabel: "Skoda Octavia Combi (2018)",
    requesterName: "Auto Eulachblick GmbH",
    providerId: "p-eulach-trans",
    providerName: "Eulach Transport GmbH",
    status: "angefragt",
    priceChf: 110,
    whenText: "Morgen, 09:00",
    route: "Winterthur-Seen → Frauenfeld",
    createdText: "vor 3 Std.",
    messages: [
      { id: "m-1", from: "requester", text: "Transport nach Frauenfeld möglich morgen früh?", timeText: "vor 3 Std." },
    ],
  },
  {
    id: "o-1003",
    kind: "paint",
    carId: "c-golf",
    carLabel: "VW Golf 1.5 TSI (2020)",
    requesterName: "Garage Breitwiesen",
    providerId: "p-lack-toss",
    providerName: "Lackierwerk Töss",
    status: "bestätigt",
    priceChf: 420,
    whenText: "Do, 08:00 Annahme",
    createdText: "gestern",
    messages: [
      { id: "m-1", from: "requester", text: "Heckstossstange Kratzer, bitte Smart-Repair. Foto folgt.", timeText: "gestern" },
      { id: "m-2", from: "provider", text: "Geht klar, Donnerstag 08:00 Annahme. Richtpreis CHF 420.", timeText: "gestern" },
    ],
  },
  {
    id: "o-1004",
    kind: "mechanic",
    carId: "c-corsa",
    carLabel: "Opel Corsa 1.2 (2020)",
    requesterName: "Tössfeld Occasionen",
    providerId: "p-mfk-express",
    providerName: "MFK-Express Winterthur",
    status: "erledigt",
    priceChf: 180,
    whenText: "Mo, MFK bestanden",
    createdText: "vor 4 Tagen",
    messages: [
      { id: "m-1", from: "requester", text: "MFK-Vorbereitung + Vorführung bitte.", timeText: "vor 5 Tagen" },
      { id: "m-2", from: "provider", text: "Erledigt — MFK bestanden, Bericht liegt im Handschuhfach.", timeText: "vor 4 Tagen" },
    ],
  },
  {
    id: "o-1005",
    kind: "transport",
    carId: "c-tiguan",
    carLabel: "VW Tiguan 2.0 TDI (2019)",
    requesterName: "Auto Eulachblick GmbH",
    providerId: "p-blitz-log",
    providerName: "BlitzCar Logistik",
    status: "bestätigt",
    priceChf: 95,
    whenText: "Morgen, 13:00",
    route: "Winterthur → Wil SG",
    createdText: "vor 5 Std.",
    messages: [
      { id: "m-1", from: "requester", text: "Überführung nach Wil, Fahrzeug fahrbereit.", timeText: "vor 6 Std." },
      { id: "m-2", from: "provider", text: "Bestätigt für morgen 13:00. CHF 95 inkl. Rückfahrt.", timeText: "vor 5 Std." },
    ],
  },
  {
    id: "o-1006",
    kind: "paint",
    carId: "c-passat",
    carLabel: "VW Passat Variant 2.0 TDI (2018)",
    requesterName: "Rietwies Automobile AG",
    providerId: "p-carr-seen",
    providerName: "Carrosserie Seen",
    status: "angefragt",
    priceChf: 290,
    whenText: "Termin offen",
    createdText: "vor 2 Std.",
    messages: [
      { id: "m-1", from: "requester", text: "Türe vorne links Delle, vor Wiederverkauf. Wann hättet ihr Zeit?", timeText: "vor 2 Std." },
    ],
  },
  {
    id: "o-1007",
    kind: "mechanic",
    carId: "c-xc60",
    carLabel: "Volvo XC60 D4 AWD (2018)",
    requesterName: "Tössfeld Occasionen",
    providerId: "p-mech-matten",
    providerName: "Mechanik Mattenbach",
    status: "angefragt",
    priceChf: 150,
    whenText: "Termin offen",
    createdText: "vor 1 Std.",
    messages: [
      { id: "m-1", from: "requester", text: "Service + Bremsen prüfen vor Verkauf. Kostenvoranschlag?", timeText: "vor 1 Std." },
    ],
  },
  {
    id: "o-1008",
    kind: "transport",
    carId: "c-clio",
    carLabel: "Renault Clio TCe 90 (2021)",
    requesterName: "Mattenhof Cars",
    providerId: "p-ost-trailer",
    providerName: "OstSchweiz Trailer",
    status: "erledigt",
    priceChf: 80,
    whenText: "Letzte Woche",
    route: "Winterthur → Schaffhausen",
    createdText: "vor 6 Tagen",
    messages: [
      { id: "m-1", from: "provider", text: "Fahrzeug geliefert, Übergabe ok. Danke!", timeText: "vor 6 Tagen" },
    ],
  },
  {
    id: "o-1009",
    kind: "paint",
    carId: "c-ioniq",
    carLabel: "Hyundai Ioniq Elektro (2019)",
    requesterName: "Auto Eulachblick GmbH",
    providerId: "p-lack-toss",
    providerName: "Lackierwerk Töss",
    status: "bestätigt",
    priceChf: 350,
    whenText: "Di, 07:30 Annahme",
    createdText: "gestern",
    messages: [
      { id: "m-1", from: "requester", text: "Komplette Aufbereitung + Politur vor dem Inserat.", timeText: "gestern" },
      { id: "m-2", from: "provider", text: "Eingeplant Dienstag. Richtpreis CHF 350.", timeText: "gestern" },
    ],
  },
  {
    id: "o-1010",
    kind: "transport",
    carId: "c-320d",
    carLabel: "BMW 320d Touring (2019)",
    requesterName: "Garage Breitwiesen",
    providerId: "p-eulach-trans",
    providerName: "Eulach Transport GmbH",
    status: "angefragt",
    priceChf: 130,
    whenText: "Übermorgen",
    route: "Winterthur → Uster",
    createdText: "vor 30 Min.",
    messages: [
      { id: "m-1", from: "requester", text: "Transport nach Uster, gerne diese Woche.", timeText: "vor 30 Min." },
    ],
  },
];
