import { SEED_ORDERS } from "@/fixtures/orders";
import { CARS } from "@/fixtures/cars";
import { OrderDetail } from "./OrderDetail";

// Created-order ids are deterministic (`o-<carId>-<kind>`), so we can pre-render
// every order that can ever exist — seed orders + all create-order combinations.
const KINDS = ["transport", "paint", "mechanic"] as const;

export function generateStaticParams() {
  const ids = new Set<string>();
  SEED_ORDERS.forEach((o) => ids.add(o.id));
  CARS.forEach((c) => KINDS.forEach((k) => ids.add(`o-${c.id}-${k}`)));
  return [...ids].map((id) => ({ id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderDetail orderId={id} />;
}
