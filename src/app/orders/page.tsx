"use client";

/**
 * SCENE 5 · ORDERS INBOX (the other side). The transporter/garage sees THEIR
 * incoming jobs with statuses and can accept an open request; the dealer sees
 * the orders they placed. Perspective switches on the logged-in role (H-011).
 * NO payment/commission — the price shown is the provider's quote only.
 */

import { useState } from "react";
import { NavShell } from "@/components/NavShell";
import { DemoNote } from "@/components/DemoNote";
import { Badge, Button, PageTitle, chf } from "@/components/ui";
import { useDemo } from "@/demo/store";
import { fakeLatency } from "@/demo/latency";
import { dealerById, ME_DEALER_ID } from "@/fixtures/dealers";
import {
  SERVICE_LABELS,
} from "@/fixtures/providers";
import { STATUS_LABELS, STATUS_COLORS, type Order } from "@/fixtures/orders";

export default function OrdersPage() {
  const { role, orders } = useDemo();
  const me = dealerById(ME_DEALER_ID);

  // Perspective: supply-side sees incoming jobs in their trade; dealer sees own.
  let title: string;
  let list: Order[];
  let supplySide = false;
  if (role === "transporter") {
    title = "Eingehende Transportaufträge";
    list = orders.filter((o) => o.kind === "transport");
    supplySide = true;
  } else if (role === "garage") {
    title = "Eingehende Service-Aufträge";
    list = orders.filter((o) => o.kind === "paint" || o.kind === "mechanic");
    supplySide = true;
  } else {
    title = "Meine Aufträge";
    list = orders.filter((o) => o.requesterName === me?.name);
  }

  return (
    <NavShell>
      <PageTitle>{title}</PageTitle>

      {list.length === 0 ? (
        <DemoNote>
          {supplySide
            ? "Noch keine Aufträge. Sobald ein Händler etwas anfragt, erscheint es hier."
            : "Sie haben noch keine Aufträge ausgelöst. Tipp: auf der Börse ein verkauftes Fahrzeug → „Transport organisieren“."}
        </DemoNote>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((o) => (
            <OrderRow key={o.id} order={o} supplySide={supplySide} />
          ))}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <DemoNote>
          Status werden in der echten App automatisch aktualisiert (angefragt →
          bestätigt → unterwegs → erledigt).
        </DemoNote>
      </div>
    </NavShell>
  );
}

function OrderRow({ order, supplySide }: { order: Order; supplySide: boolean }) {
  const { setOrderStatus } = useDemo();
  const [busy, setBusy] = useState(false);

  async function accept() {
    setBusy(true);
    await fakeLatency(600);
    setOrderStatus(order.id, "bestätigt");
    setBusy(false);
  }

  return (
    <div style={{ background: "#fff", border: "1.5px solid var(--line)", borderRadius: "var(--radius)", padding: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <Badge tone="neutral">{SERVICE_LABELS[order.kind]}</Badge>
        <span style={{ flex: 1 }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: ".4px",
            color: "#fff",
            background: STATUS_COLORS[order.status],
            borderRadius: "var(--radius)",
            padding: "2px 7px",
          }}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, textTransform: "uppercase" }}>
        {order.carLabel}
      </div>

      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, lineHeight: 1.5 }}>
        {supplySide ? <>Von: {order.requesterName}</> : <>An: {order.providerName}</>}
        <br />
        {order.route && <>{order.route} · </>}
        {order.whenText}
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--red)" }}>
          {chf(order.priceChf)}
        </span>
        <span style={{ fontSize: 10, color: "var(--muted)", marginLeft: 6 }}>· {order.createdText}</span>
        <span style={{ flex: 1 }} />
        {supplySide && order.status === "angefragt" && (
          <Button
            onClick={accept}
            disabled={busy}
            style={{ minHeight: 32, fontSize: 11, padding: "0 12px", display: "flex", alignItems: "center", gap: 6 }}
          >
            {busy ? <><span className="spinner" /> …</> : "Annehmen"}
          </Button>
        )}
      </div>
    </div>
  );
}
