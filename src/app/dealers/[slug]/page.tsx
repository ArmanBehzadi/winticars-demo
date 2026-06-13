import { DEALERS } from "@/fixtures/dealers";
import { DealerProfile } from "./DealerProfile";

export function generateStaticParams() {
  return DEALERS.map((d) => ({ slug: d.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DealerProfile slug={slug} />;
}
