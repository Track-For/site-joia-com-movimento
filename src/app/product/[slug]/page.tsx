import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductDetailActions } from "@/components/ProductDetailActions";
import { ProductGrid } from "@/components/ProductGrid";
import { formatPrice, getProductBySlug, getProducts, getRelatedProducts } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { images: [{ url: product.images[0], alt: product.name }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    material: product.material,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "/" },
      { "@type": "ListItem", position: 2, name: "Coleção Intervalo", item: "/collection/intervalo" },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="product-page shell">
        <nav className="breadcrumbs" aria-label="Navegação estrutural">
          <Link href="/">Início</Link><span>/</span><Link href="/collection/intervalo">Intervalo</Link><span>/</span><span>{product.name}</span>
        </nav>
        <div className="product-layout">
          <ProductGallery images={product.images} name={product.name} />
          <aside className="product-info">
            <p className="micro-label">Coleção Intervalo</p>
            <h1>{product.name}</h1>
            <strong className="product-price">{formatPrice(product.price)}</strong>
            <p className="installments">ou 10 parcelas de {formatPrice(product.price / 10)}</p>
            <p className="product-description">{product.description}</p>
            <div className="product-facts">
              <span>{product.material}</span>
              <span>{product.stone}</span>
            </div>
            <ProductDetailActions product={product} />
            <details><summary>Entrega e seguro</summary><p>Condições demonstrativas. Prazo, cobertura e transportadora serão definidos na operação real.</p></details>
            <details><summary>Garantia e certificado</summary><p>Itens previstos para a versão comercial, sujeitos à política final da marca.</p></details>
            <details><summary>Cuidados</summary><p>Evite impacto, químicos e atrito com outras peças. A limpeza profissional preserva o acabamento.</p></details>
          </aside>
        </div>
      </div>

      <section className="product-story-section">
        <div className="shell product-story-grid">
          <h2>A peça começa no vazio.</h2>
          <p>{product.story}</p>
          <blockquote>O metal segura a forma. A pedra segura a luz.</blockquote>
        </div>
      </section>

      <section className="related-products shell" aria-labelledby="related-title">
        <div className="section-heading"><h2 id="related-title">Complete o conjunto.</h2></div>
        <ProductGrid products={related} />
      </section>
    </>
  );
}
