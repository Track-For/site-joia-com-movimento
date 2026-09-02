"use client";

import { useState } from "react";
import { Heart } from "@phosphor-icons/react";
import type { Product } from "@/lib/products";
import { useStore } from "./StoreProvider";

export function ProductDetailActions({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const saved = isWishlisted(product.id);

  return (
    <div className="product-actions">
      <fieldset>
        <legend>Tamanho</legend>
        <div className="size-options">
          {product.sizes.map((value) => (
            <button className={size === value ? "is-selected" : ""} key={value} onClick={() => setSize(value)} aria-pressed={size === value}>{value}</button>
          ))}
        </div>
      </fieldset>
      <button className="button button-dark" onClick={() => addToCart(product.id, size)}>Adicionar à sacola</button>
      <button className="wishlist-detail" onClick={() => toggleWishlist(product.id)} aria-pressed={saved}>
        <Heart size={19} weight={saved ? "fill" : "regular"} />
        {saved ? "Salvo na lista" : "Salvar na lista de desejos"}
      </button>
      <p className="availability">Disponível para atendimento. Prazo e estoque são demonstrativos neste MVP.</p>
    </div>
  );
}
