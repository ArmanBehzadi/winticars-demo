"use client";

/**
 * Client-only demo store. Holds the throwaway session state that makes the
 * façade feel alive between taps: which actor "logged in", which listings the
 * user has contacted, and which service orders they created during the demo.
 *
 * Persisted to localStorage so the app survives the iOS "Add to Home Screen"
 * standalone relaunch. The hidden reset (triple-tap the logo) wipes it back to
 * the initial fixture state for the next interview.
 *
 * THIS IS FAKE. No network, no auth, no backend.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  SEED_ORDERS,
  type Order,
  type OrderStatus,
  type OrderMessage,
} from "@/fixtures/orders";

// Supply-side roles are split in v2: garage = MFK/Mechanik, painter = Lackierung.
export type Role = "dealer" | "transporter" | "garage" | "painter";

export const ROLE_LABELS: Record<Role, string> = {
  dealer: "Händler",
  transporter: "Transporteur",
  garage: "Garage / MFK",
  painter: "Lackierer",
};

/** Board layout density — persisted so it survives navigation + relaunch. */
export type BoardView = "compact" | "comfortable";

type DemoState = {
  role: Role | null;
  contacted: string[]; // listing ids the user has messaged
  orders: Order[]; // seed orders + any created during the demo
  boardView: BoardView; // compact (dense list) ⇄ comfortable (Großansicht)
};

// Bumped from v1: the state shape changed (boardView + order messages), so old
// persisted state must not hydrate into the new app.
const STORAGE_KEY = "winticars-demo-v2";

function initialState(): DemoState {
  return { role: null, contacted: [], orders: [...SEED_ORDERS], boardView: "compact" };
}

type DemoContextValue = DemoState & {
  hydrated: boolean;
  login: (role: Role) => void;
  logout: () => void;
  markContacted: (listingId: string) => void;
  addOrder: (order: Order) => void;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  addMessage: (orderId: string, message: OrderMessage) => void;
  setBoardView: (view: BoardView) => void;
  reset: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state once on mount (client only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState(), ...JSON.parse(raw) });
    } catch {
      /* ignore corrupt state — fall back to initial */
    }
    setHydrated(true);
  }, []);

  // Persist on every change after hydration.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full / disabled — demo still works in-memory */
    }
  }, [state, hydrated]);

  const login = useCallback((role: Role) => {
    setState((s) => ({ ...s, role }));
  }, []);

  const logout = useCallback(() => {
    setState((s) => ({ ...s, role: null }));
  }, []);

  const markContacted = useCallback((listingId: string) => {
    setState((s) =>
      s.contacted.includes(listingId)
        ? s
        : { ...s, contacted: [...s.contacted, listingId] },
    );
  }, []);

  const addOrder = useCallback((order: Order) => {
    setState((s) => ({ ...s, orders: [order, ...s.orders] }));
  }, []);

  const setOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }));
  }, []);

  const addMessage = useCallback((orderId: string, message: OrderMessage) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) =>
        o.id === orderId ? { ...o, messages: [...(o.messages ?? []), message] } : o,
      ),
    }));
  }, []);

  const setBoardView = useCallback((view: BoardView) => {
    setState((s) => ({ ...s, boardView: view }));
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setState(initialState());
  }, []);

  return (
    <DemoContext.Provider
      value={{ ...state, hydrated, login, logout, markContacted, addOrder, setOrderStatus, addMessage, setBoardView, reset }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside <DemoProvider>");
  return ctx;
}
