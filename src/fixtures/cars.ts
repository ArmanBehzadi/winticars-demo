/**
 * ───────────────────────────────────────────────────────────────────────────
 *  DEMO FIXTURE · CARS (board listings)
 * ───────────────────────────────────────────────────────────────────────────
 *  Fake inventory shown on the board. To edit a car: change the fields below.
 *  To add one: copy a block, give it a unique `id`, point `dealerId` at a
 *  dealer in dealers.ts. Prices are ROUND/PLACEHOLDER on purpose — the app is
 *  about discovery, not price-anchoring (H-011). NO VIN / Stammnummer anywhere.
 *
 *  `image`: leave undefined to use the built-in branded silhouette placeholder.
 *  To drop in a real photo, put the file in /public/cars/ and set
 *  image: "/cars/my-photo.jpg".
 * ───────────────────────────────────────────────────────────────────────────
 */

export type Car = {
  id: string;
  dealerId: string;
  make: string;
  model: string;
  priceChf: number;
  mileageKm: number;
  year: number;
  fuel: string; // German display label, e.g. "Diesel"
  transmission: string; // e.g. "Automatik"
  bodyType: string; // e.g. "SUV"
  color: string; // hex — used by the placeholder silhouette
  vatLabel?: "Margenbesteuerung" | "Vorsteuerabzugsberechtigt";
  mfkLabel?: "Frische MFK" | "MFK gültig";
  accident?: string; // e.g. "Unfallfrei"
  daysOnBoard: number;
  description: string;
  image?: string; // optional real photo path under /public
  /** Set on the car the logged-in dealer "just sold" — drives Scene 4. */
  justTraded?: boolean;
  tradedLabel?: string; // e.g. "Heute verkauft"
};

export const CARS: Car[] = [
  {
    id: "c-320d",
    dealerId: "d-eulach",
    make: "BMW",
    model: "320d Touring",
    priceChf: 24900,
    mileageKm: 96000,
    year: 2019,
    fuel: "Diesel",
    transmission: "Automatik",
    bodyType: "Kombi",
    color: "#2b3a55",
    vatLabel: "Margenbesteuerung",
    mfkLabel: "Frische MFK",
    accident: "Unfallfrei",
    daysOnBoard: 0,
    description:
      "Gepflegter 320d Touring, Schweizer Auslieferung, Service lückenlos. Sofort verfügbar für Wiederverkäufer.",
    justTraded: true,
    tradedLabel: "Heute verkauft",
  },
  {
    id: "c-golf",
    dealerId: "d-seen",
    make: "VW",
    model: "Golf 1.5 TSI",
    priceChf: 18500,
    mileageKm: 62000,
    year: 2020,
    fuel: "Benzin",
    transmission: "Schaltgetriebe",
    bodyType: "Hatchback",
    color: "#c9ccd1",
    vatLabel: "Margenbesteuerung",
    mfkLabel: "MFK gültig",
    accident: "Unfallfrei",
    daysOnBoard: 1,
    description:
      "Sparsamer Golf, ideal als Wiederverkauf im unteren Preissegment. Pneus neu.",
  },
  {
    id: "c-tiguan",
    dealerId: "d-wuelflingen",
    make: "VW",
    model: "Tiguan 2.0 TDI 4Motion",
    priceChf: 31500,
    mileageKm: 78000,
    year: 2019,
    fuel: "Diesel",
    transmission: "Automatik",
    bodyType: "SUV",
    color: "#1d1d1f",
    vatLabel: "Vorsteuerabzugsberechtigt",
    mfkLabel: "MFK gültig",
    accident: "Unfallfrei",
    daysOnBoard: 2,
    description:
      "Allrad-SUV mit Anhängerkupplung, viel Platz. Für den Familien-Wiederverkauf gefragt.",
  },
  {
    id: "c-a3",
    dealerId: "d-toss",
    make: "Audi",
    model: "A3 Sportback 35 TFSI",
    priceChf: 22000,
    mileageKm: 71000,
    year: 2019,
    fuel: "Benzin",
    transmission: "Automatik",
    bodyType: "Hatchback",
    color: "#7a1f1f",
    vatLabel: "Margenbesteuerung",
    mfkLabel: "MFK gültig",
    accident: "Unfallfrei",
    daysOnBoard: 3,
    description:
      "Audi A3 in gutem Zustand, S-Line Optik. Beliebtes Wiederverkaufsmodell.",
  },
  {
    id: "c-octavia",
    dealerId: "d-eulach",
    make: "Skoda",
    model: "Octavia Combi 2.0 TDI",
    priceChf: 19900,
    mileageKm: 110000,
    year: 2018,
    fuel: "Diesel",
    transmission: "Automatik",
    bodyType: "Kombi",
    color: "#e8e9eb",
    vatLabel: "Vorsteuerabzugsberechtigt",
    mfkLabel: "MFK gültig",
    accident: "Unfallfrei",
    daysOnBoard: 4,
    description:
      "Geräumiger Kombi, perfekt als Gewerbe- oder Familienauto. Frisch ab Service.",
  },
  {
    id: "c-corsa",
    dealerId: "d-seen",
    make: "Opel",
    model: "Corsa 1.2",
    priceChf: 12500,
    mileageKm: 48000,
    year: 2020,
    fuel: "Benzin",
    transmission: "Schaltgetriebe",
    bodyType: "Hatchback",
    color: "#1f5fae",
    vatLabel: "Margenbesteuerung",
    mfkLabel: "Frische MFK",
    accident: "Unfallfrei",
    daysOnBoard: 5,
    description:
      "Kleiner Stadtflitzer mit wenig Kilometern. Schneller Wiederverkauf garantiert.",
  },
  {
    id: "c-xc60",
    dealerId: "d-wuelflingen",
    make: "Volvo",
    model: "XC60 D4 AWD",
    priceChf: 33500,
    mileageKm: 89000,
    year: 2018,
    fuel: "Diesel",
    transmission: "Automatik",
    bodyType: "SUV",
    color: "#3a3f44",
    vatLabel: "Vorsteuerabzugsberechtigt",
    mfkLabel: "MFK gültig",
    accident: "Unfallfrei",
    daysOnBoard: 6,
    description:
      "Premium-SUV mit Leder und Standheizung. Top-Ausstattung, gefragt im Wiederverkauf.",
  },
  {
    id: "c-ioniq",
    dealerId: "d-mattenbach",
    make: "Hyundai",
    model: "Ioniq Elektro",
    priceChf: 17500,
    mileageKm: 54000,
    year: 2019,
    fuel: "Elektro",
    transmission: "Automatik",
    bodyType: "Hatchback",
    color: "#dfe6ea",
    vatLabel: "Margenbesteuerung",
    mfkLabel: "MFK gültig",
    accident: "Unfallfrei",
    daysOnBoard: 7,
    description:
      "Effizientes E-Auto mit guter Reichweite im Alltag. Steigende Nachfrage.",
  },
  {
    id: "c-passat",
    dealerId: "d-toss",
    make: "VW",
    model: "Passat Variant 2.0 TDI",
    priceChf: 21500,
    mileageKm: 132000,
    year: 2018,
    fuel: "Diesel",
    transmission: "Automatik",
    bodyType: "Kombi",
    color: "#4a4f57",
    vatLabel: "Vorsteuerabzugsberechtigt",
    mfkLabel: "MFK gültig",
    accident: "Unfallfrei",
    daysOnBoard: 9,
    description:
      "Vielseitiger Kombi mit grossem Kofferraum. Robuster Diesel, ideal für Vielfahrer.",
  },
  {
    id: "c-clio",
    dealerId: "d-mattenbach",
    make: "Renault",
    model: "Clio TCe 90",
    priceChf: 13900,
    mileageKm: 41000,
    year: 2021,
    fuel: "Benzin",
    transmission: "Schaltgetriebe",
    bodyType: "Hatchback",
    color: "#d8b32a",
    vatLabel: "Margenbesteuerung",
    mfkLabel: "Frische MFK",
    accident: "Unfallfrei",
    daysOnBoard: 11,
    description:
      "Junger Clio mit tiefem Kilometerstand. Beliebt als Erstauto-Wiederverkauf.",
  },
];

export function carById(id: string): Car | undefined {
  return CARS.find((c) => c.id === id);
}

export function carsByDealer(dealerId: string): Car[] {
  return CARS.filter((c) => c.dealerId === dealerId);
}

/** The car the logged-in dealer just traded — entry point to Scene 4. */
export function justTradedCar(): Car | undefined {
  return CARS.find((c) => c.justTraded);
}
