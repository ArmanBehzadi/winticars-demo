/**
 * ───────────────────────────────────────────────────────────────────────────
 *  DEMO FIXTURE · DEALERS
 * ───────────────────────────────────────────────────────────────────────────
 *  Fake, plausible-fictional Winterthur-area car dealers. Edit freely between
 *  interviews — add a dealer, flip `verified`, change a city. Names use real
 *  Winterthur DISTRICT names (Töss, Seen, Wülflingen…) but are NOT real
 *  businesses. Do not use a competitor's real name.
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
};

export const DEALERS: Dealer[] = [
  {
    id: "d-toss",
    name: "Auto Töss AG",
    slug: "auto-toess",
    city: "Winterthur-Töss",
    verified: true,
    since: 2009,
    blurb: "Occasionen aller Marken · Eintausch · MFK-Service im Haus.",
    cars: 24,
  },
  {
    id: "d-eulach",
    name: "Garage Eulachpark",
    slug: "garage-eulachpark",
    city: "Winterthur",
    verified: true,
    since: 2014,
    blurb: "Junge Occasionen & Vorführwagen, Schwerpunkt Diesel/Hybrid.",
    cars: 17,
  },
  {
    id: "d-seen",
    name: "Stadtgarage Seen",
    slug: "stadtgarage-seen",
    city: "Winterthur-Seen",
    verified: false,
    since: 2019,
    blurb: "Familienbetrieb · Kleinwagen & Kombis · faire Preise.",
    cars: 9,
  },
  {
    id: "d-wuelflingen",
    name: "Autocenter Wülflingen",
    slug: "autocenter-wuelflingen",
    city: "Winterthur-Wülflingen",
    verified: true,
    since: 2006,
    blurb: "SUV & Premium-Occasionen · Garantie · Finanzierung.",
    cars: 31,
  },
  {
    id: "d-mattenbach",
    name: "Garage Mattenbach",
    slug: "garage-mattenbach",
    city: "Winterthur-Mattenbach",
    verified: false,
    since: 2021,
    blurb: "Elektro & Hybrid spezialisiert · Probefahrt jederzeit.",
    cars: 6,
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
