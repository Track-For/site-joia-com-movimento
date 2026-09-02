import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/CatalogClient";
import { getProductsByCollection } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = {
  title: "Coleção Intervalo",
  description: "Intervalo explora o espaço entre metal, pedra e pele.",
};

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  if (slug !== "intervalo") notFound();
  const items = getProductsByCollection(slug);
  return (
    <>
      <header className="collection-hero">
        <Image src="/images/necklace-studio.png" alt="Colar Eixo sobre tecido grafite" fill priority sizes="100vw" />
        <div className="collection-hero-scrim" />
        <div className="shell">
          <p className="micro-label">Coleção</p>
          <h1>Intervalo</h1>
          <p>O espaço entre metal e pedra passa a fazer parte da joia.</p>
        </div>
      </header>
      <section className="collection-intro shell">
        <p>Planos retos encontram curvas do corpo. A luz revela o que a forma escolheu preservar.</p>
      </section>
      <CatalogClient products={items} />
    </>
  );
}
