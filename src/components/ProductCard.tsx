"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, X } from "@phosphor-icons/react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useStore } from "./StoreProvider";
import { track } from "@/lib/analytics";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [quickView, setQuickView] = useState(false);
  const [size, setSize] = useState(product.sizes[0]);
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const saved = isWishlisted(product.id);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQuickView(false);
    };
    if (quickView) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quickView]);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link href={`/product/${product.slug}`} onClick={() => track("select_item", { item_id: product.id })} aria-label={`Ver ${product.name}`}>
          <Image className="product-image primary" src={product.images[0]} alt={product.name} fill priority={priority} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw" />
          <Image className="product-image secondary" src={product.images[1]} alt={`Detalhe de ${product.name}`} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw" />
        </Link>
        <button
          className={`wishlist-button ${saved ? "is-active" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remover ${product.name} dos favoritos` : `Adicionar ${product.name} aos favoritos`}
        >
          <Heart size={20} weight={saved ? "fill" : "regular"} />
        </button>
        <button className="quick-view-trigger" onClick={() => setQuickView(true)}>Vista rápida</button>
      </div>
      <div className="product-card-info">
        <div>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
          <span>{product.material}</span>
        </div>
        <strong>{formatPrice(product.price)}</strong>
      </div>

      {quickView && (
        <div className="quick-view-layer" role="dialog" aria-modal="true" aria-label={`Vista rápida de ${product.name}`}>
          <button className="quick-view-backdrop" onClick={() => setQuickView(false)} aria-label="Fechar vista rápida" />
          <div className="quick-view-panel">
            <button className="icon-button quick-view-close" onClick={() => setQuickView(false)} aria-label="Fechar"><X size={22} /></button>
            <div className="quick-view-image">
              <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 700px) 100vw, 58vw" />
            </div>
            <div className="quick-view-info">
              <p className="micro-label">Coleção Intervalo</p>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <strong>{formatPrice(product.price)}</strong>
              <div className="product-facts"><span>{product.material}</span><span>{product.stone}</span></div>
              <label htmlFor={`quick-size-${product.id}`}>Tamanho</label>
              <select id={`quick-size-${product.id}`} value={size} onChange={(event) => setSize(event.target.value)}>
                {product.sizes.map((value) => <option value={value} key={value}>{value}</option>)}
              </select>
              <button className="button button-dark" onClick={() => addToCart(product.id, size)}>Adicionar à sacola</button>
              <Link className="text-link" href={`/product/${product.slug}`}>Ver todos os detalhes</Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
