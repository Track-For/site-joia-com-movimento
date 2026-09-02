"use client";

import { useEffect, useMemo, useState } from "react";
import { Funnel, X } from "@phosphor-icons/react";
import type { Product } from "@/lib/products";
import { ProductGrid } from "./ProductGrid";

type SortOption = "featured" | "low" | "high";

export function CatalogClient({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("featured");
  const [material, setMaterial] = useState("todos");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };
    if (filtersOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filtersOpen]);

  const visible = useMemo(() => {
    const filtered = material === "todos" ? products : products.filter((product) => product.material === material);
    return [...filtered].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return Number(b.featured) - Number(a.featured);
    });
  }, [products, material, sort]);

  const filters = (
    <div className="catalog-filters">
      <label htmlFor="material">Material</label>
      <select id="material" value={material} onChange={(event) => setMaterial(event.target.value)}>
        <option value="todos">Todos</option>
        {[...new Set(products.map((product) => product.material))].map((value) => <option key={value}>{value}</option>)}
      </select>
      <button className="text-button" onClick={() => setMaterial("todos")}>Limpar filtros</button>
    </div>
  );

  return (
    <section className="catalog-section shell" aria-label="Produtos">
      <div className="catalog-toolbar">
        <span>{visible.length} peças</span>
        <button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}><Funnel size={17} /> Filtrar</button>
        <label htmlFor="sort">Ordenar</label>
        <select id="sort" value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
          <option value="featured">Destaques</option>
          <option value="low">Menor preço</option>
          <option value="high">Maior preço</option>
        </select>
      </div>
      <div className="catalog-layout">
        <aside className="catalog-sidebar">{filters}</aside>
        <ProductGrid products={visible} priority />
      </div>
      <div className={`filter-drawer ${filtersOpen ? "is-open" : ""}`} aria-hidden={!filtersOpen} inert={!filtersOpen}>
        <button className="drawer-backdrop" onClick={() => setFiltersOpen(false)} aria-label="Fechar filtros" />
        <aside>
          <div className="drawer-header"><h2>Filtros</h2><button className="icon-button" onClick={() => setFiltersOpen(false)} aria-label="Fechar"><X size={21} /></button></div>
          {filters}
          <button className="button button-dark" onClick={() => setFiltersOpen(false)}>Ver peças</button>
        </aside>
      </div>
    </section>
  );
}
