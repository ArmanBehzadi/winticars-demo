import { CARS } from "@/fixtures/cars";
import { CreateOrder } from "./CreateOrder";

export function generateStaticParams() {
  return CARS.map((c) => ({ id: c.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CreateOrder carId={id} />;
}
