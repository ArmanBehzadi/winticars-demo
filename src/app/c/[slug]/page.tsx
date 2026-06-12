import { CARS } from "@/fixtures/cars";
import { dealerById } from "@/fixtures/dealers";
import { PublicListing } from "./PublicListing";

// Public share slug = "<dealer-slug>--<car-id>" (double-dash separator).
export function generateStaticParams() {
  return CARS.map((c) => {
    const slug = `${dealerById(c.dealerId)?.slug ?? "dealer"}--${c.id}`;
    return { slug };
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const carId = slug.split("--")[1] ?? "";
  return <PublicListing carId={carId} />;
}
