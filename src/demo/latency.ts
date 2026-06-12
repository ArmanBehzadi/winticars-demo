/**
 * Fake network latency so faked actions (send message, place order) feel real
 * instead of instant. ~300 ms per the demo spec (H-011).
 */
export function fakeLatency(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
