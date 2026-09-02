"use client";

import { FormEvent, useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import type { Product } from "@/lib/products";
import { ProductGrid } from "./ProductGrid";
import { track } from "@/lib/analytics";

export function SearchExperience({ products, initialQuery = "" }: { products: Product[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialQuery);
  const results = useMemo(() => {
    const normalized = submitted.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return products;
    return products.filter((product) => [product.name, product.category, product.collection, product.material, product.stone]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(normalized));
  }, [products, submitted]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(query);
    track("search", { search_term: query });
  }

  return (
    <div className="search-experience shell">
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="global-search">Buscar por peça, material ou coleção</label>
        <div>
          <input id="global-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Exemplo: safira" />
          <button type="submit" aria-label="Buscar"><MagnifyingGlass size={24} /></button>
        </div>
      </form>
      <p className="search-count">{results.length} {results.length === 1 ? "resultado" : "resultados"}</p>
      {results.length > 0 ? <ProductGrid products={results} priority /> : (
        <div className="empty-search"><h2>Nenhuma peça encontrada.</h2><p>Tente outro nome, categoria, material ou pedra.</p></div>
      )}
    </div>
  );
}
