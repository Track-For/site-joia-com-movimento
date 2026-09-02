import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/CatalogClient";
import { categoryLabels, getProductsByCategory } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = categoryLabels[slug as keyof typeof categoryLabels];
  return label ? { title: label, description: `${label} da coleção Intervalo por EIRA.` } : {};
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const label = categoryLabels[slug as keyof typeof categoryLabels];
  if (!label) notFound();
  const items = getProductsByCategory(slug);
  return (
    <>
      <header className="catalog-hero shell">
        <p className="micro-label">Joias por forma</p>
        <h1>{label}</h1>
        <p>Geometrias precisas e safiras pálidas para acompanhar o corpo com presença contida.</p>
      </header>
      <CatalogClient products={items} />
    </>
  );
}
