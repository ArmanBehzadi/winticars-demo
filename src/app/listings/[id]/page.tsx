import { CARS } from "@/fixtures/cars";
import { ListingDetail } from "./ListingDetail";

// Pre-render one static page per car (no server at runtime).
export function generateStaticParams() {
  return CARS.map((c) => ({ id: c.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ListingDetail id={id} />;
}
