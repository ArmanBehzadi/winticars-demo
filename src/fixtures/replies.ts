/**
 * ───────────────────────────────────────────────────────────────────────────
 *  DEMO FIXTURE · CANNED REPLIES
 * ───────────────────────────────────────────────────────────────────────────
 *  The faked reply that "arrives" ~300 ms after the dealer sends an inquiry
 *  (Scene 2). Edit the wording to match what feels real to interviewees.
 * ───────────────────────────────────────────────────────────────────────────
 */

/** Reply text for a contacted listing, signed by the selling dealer. */
export function cannedReply(dealerName: string): string {
  const options = [
    `Grüezi! Ja, das Fahrzeug ist noch verfügbar. Wir können es Ihnen heute reservieren — passt eine Besichtigung morgen Vormittag?`,
    `Hallo, danke für Ihr Interesse. Preis ist Händler-zu-Händler verhandelbar. Soll ich Ihnen die Service-Unterlagen schicken?`,
    `Guten Tag, das Auto steht bereit. Abholung jederzeit möglich — wir organisieren auf Wunsch auch gleich den Transport.`,
  ];
  // Stable pick based on dealer name so the same listing always replies the same.
  let h = 0;
  for (let i = 0; i < dealerName.length; i++) h = (h * 31 + dealerName.charCodeAt(i)) >>> 0;
  return options[h % options.length];
}

/** Short pre-filled message the dealer "sends". */
export const DEFAULT_INQUIRY =
  "Grüezi, ist dieses Fahrzeug noch verfügbar? Bin Händler aus Winterthur, hätte Interesse.";
