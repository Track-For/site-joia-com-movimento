import type { Metadata } from "next";
import { SearchExperience } from "@/components/SearchExperience";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = { title: "Buscar" };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  return (
    <>
      <header className="search-hero shell">
        <p className="micro-label">Catálogo EIRA</p>
        <h1>Encontre sua peça.</h1>
      </header>
      <SearchExperience products={getProducts()} initialQuery={q} />
    </>
  );
}
