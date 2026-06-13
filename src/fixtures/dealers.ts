/**
 * ───────────────────────────────────────────────────────────────────────────
 *  DEMO FIXTURE · DEALERS  (+ Verzeichnis profile data)
 * ───────────────────────────────────────────────────────────────────────────
 *  ⛔ GATE 1 (reviewer H-020): EVERY name here MUST be verified-FICTIONAL.
 *  v2 attaches a fake address + phone + illustrative "Verifiziert" badge to each
 *  profile — attaching that to a REAL local business shown live in interviews is
 *  the worst must-NOT-show breach + a legal/reputational hazard. So:
 *    • Names are obviously-INVENTED compounds (coined word + generic trade term).
 *    • District/place words (Töss, Seen, Wülflingen…) are real geography, but no
 *      name reproduces a real competitor. Address numbers + phone numbers are
 *      ILLUSTRATIVE placeholders (disclaimed in-app).
 *    • Before interview #1, the reviewer does the final real-world collision
 *      check on this list (their offered step). If any name is too close to a
 *      real business, rename it here — it's a one-line edit.
 *  Edit freely between interviews. Keep IDs d-toss/d-eulach/d-seen/d-wuelflingen/
 *  d-mattenbach — cars.ts points at them.
 * ───────────────────────────────────────────────────────────────────────────
 */

export type Dealer = {
  id: string;
  name: string;
  slug: string;
  city: string;
  verified: boolean; // illustrative "Verifiziert" badge only
  since: number; // founding year — for the directory
  blurb: string;
  cars: number; // listings shown in the directory (cosmetic)
  address: string; // illustrative — fictional entity
  phone: string; // illustrative — fictional entity
  rating: number; // illustrative 0–5
  deals: number; // illustrative completed trades
};

export const DEALERS: Dealer[] = [
  {
    id: "d-eulach",
    name: "Auto Eulachblick GmbH",
    slug: "auto-eulachblick",
    city: "Winterthur",
    verified: true,
    since: 2014,
    blurb: "Junge Occasionen & Vorführwagen, Schwerpunkt Diesel/Hybrid.",
    cars: 17,
    address: "Grüzefeldstrasse 8, 8400 Winterthur",
    phone: "052 232 18 60",
    rating: 4.8,
    deals: 142,
  },
  {
    id: "d-toss",
    name: "Rietwies Automobile AG",
    slug: "rietwies-automobile",
    city: "Winterthur-Töss",
    verified: true,
    since: 2009,
    blurb: "Occasionen aller Marken · Eintausch · MFK-Service im Haus.",
    cars: 24,
    address: "Zürcherstrasse 142, 8406 Winterthur",
    phone: "052 261 10 24",
    rating: 4.6,
    deals: 230,
  },
  {
    id: "d-wuelflingen",
    name: "Tössfeld Occasionen",
    slug: "toessfeld-occasionen",
    city: "Winterthur-Wülflingen",
    verified: true,
    since: 2006,
    blurb: "SUV & Premium-Occasionen · Garantie · Finanzierung.",
    cars: 31,
    address: "Wieshofstrasse 21, 8408 Winterthur",
    phone: "052 222 47 31",
    rating: 4.7,
    deals: 305,
  },
  {
    id: "d-seen",
    name: "Garage Breitwiesen",
    slug: "garage-breitwiesen",
    city: "Winterthur-Seen",
    verified: false,
    since: 2019,
    blurb: "Familienbetrieb · Kleinwagen & Kombis · faire Preise.",
    cars: 9,
    address: "Seenerstrasse 55, 8405 Winterthur",
    phone: "052 242 33 09",
    rating: 4.3,
    deals: 64,
  },
  {
    id: "d-mattenbach",
    name: "Mattenhof Cars",
    slug: "mattenhof-cars",
    city: "Winterthur-Mattenbach",
    verified: false,
    since: 2021,
    blurb: "Elektro & Hybrid spezialisiert · Probefahrt jederzeit.",
    cars: 6,
    address: "Hegifeldstrasse 30, 8404 Winterthur",
    phone: "052 213 09 66",
    rating: 4.2,
    deals: 38,
  },
  {
    id: "d-hegmatten",
    name: "Hegmatten Garage GmbH",
    slug: "hegmatten-garage",
    city: "Oberwinterthur",
    verified: true,
    since: 2011,
    blurb: "Markenunabhängig · Eintausch & Vermittlung für Wiederverkäufer.",
    cars: 19,
    address: "Frauenfelderstrasse 88, 8404 Winterthur",
    phone: "052 242 71 19",
    rating: 4.5,
    deals: 176,
  },
  {
    id: "d-steigmuehle",
    name: "Auto Steigmühle",
    slug: "auto-steigmuehle",
    city: "Winterthur-Veltheim",
    verified: false,
    since: 2017,
    blurb: "Kleinwagen & Jahreswagen · schneller Handwechsel.",
    cars: 12,
    address: "Wülflingerstrasse 210, 8408 Winterthur",
    phone: "052 222 84 17",
    rating: 4.1,
    deals: 88,
  },
  {
    id: "d-lindenrain",
    name: "Occasionscenter Lindenrain",
    slug: "occasionscenter-lindenrain",
    city: "Winterthur",
    verified: true,
    since: 2012,
    blurb: "Grosses Lager · Premium & Familienautos · Händlerkonditionen.",
    cars: 27,
    address: "Tösstalstrasse 17, 8400 Winterthur",
    phone: "052 233 55 12",
    rating: 4.6,
    deals: 264,
  },
  {
    id: "d-sonnenbueel",
    name: "Garage Sonnenbüel",
    slug: "garage-sonnenbueel",
    city: "Wiesendangen",
    verified: true,
    since: 2008,
    blurb: "Ländlicher Familienbetrieb · Kombis & Nutzfahrzeuge.",
    cars: 15,
    address: "Schützenstrasse 4, 8542 Wiesendangen",
    phone: "052 337 22 08",
    rating: 4.4,
    deals: 121,
  },
  {
    id: "d-eichliacker",
    name: "Fahrzeughaus Eichliacker",
    slug: "fahrzeughaus-eichliacker",
    city: "Elsau",
    verified: false,
    since: 2016,
    blurb: "Occasionen & Vermittlung · Ankauf zum Tagespreis.",
    cars: 10,
    address: "Winterthurerstrasse 63, 8352 Elsau",
    phone: "052 363 41 16",
    rating: 4.0,
    deals: 73,
  },
  {
    id: "d-gruenfeld",
    name: "AutoArena Grüenfeld",
    slug: "autoarena-gruenfeld",
    city: "Winterthur",
    verified: true,
    since: 2010,
    blurb: "Showroom mit grosser Auswahl · Leasing & Garantiepakete.",
    cars: 22,
    address: "Grüzefeldstrasse 41, 8400 Winterthur",
    phone: "052 242 60 10",
    rating: 4.5,
    deals: 198,
  },
  {
    id: "d-wartbueel",
    name: "Garage Wartbüel",
    slug: "garage-wartbueel",
    city: "Seuzach",
    verified: true,
    since: 2013,
    blurb: "Zuverlässige Occasionen · Service & MFK im Haus.",
    cars: 14,
    address: "Stationsstrasse 12, 8472 Seuzach",
    phone: "052 335 13 47",
    rating: 4.6,
    deals: 134,
  },
  {
    id: "d-rebhalde",
    name: "Pneu & Auto Rebhalde",
    slug: "pneu-auto-rebhalde",
    city: "Winterthur-Töss",
    verified: false,
    since: 2018,
    blurb: "Kleiner Betrieb · günstige Occasionen & Pneuservice.",
    cars: 7,
    address: "Zürcherstrasse 305, 8406 Winterthur",
    phone: "052 202 90 18",
    rating: 3.9,
    deals: 52,
  },
  {
    id: "d-hardwald",
    name: "Carcenter Hardwald",
    slug: "carcenter-hardwald",
    city: "Pfungen",
    verified: false,
    since: 2020,
    blurb: "Occasionen & Import · faire Preise, schnelle Abwicklung.",
    cars: 11,
    address: "Tössrietstrasse 9, 8422 Pfungen",
    phone: "052 315 70 20",
    rating: 4.2,
    deals: 61,
  },
];

export function dealerById(id: string): Dealer | undefined {
  return DEALERS.find((d) => d.id === id);
}

export function dealerBySlug(slug: string): Dealer | undefined {
  return DEALERS.find((d) => d.slug === slug);
}

/** The dealer the demo user "is" when logged in as Händler. */
export const ME_DEALER_ID = "d-eulach";
