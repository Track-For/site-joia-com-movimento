import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, priority = false }: { products: Product[]; priority?: boolean }) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard product={product} priority={priority && index < 2} key={product.id} />
      ))}
    </div>
  );
}
