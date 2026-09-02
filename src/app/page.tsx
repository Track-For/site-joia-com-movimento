import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Hero } from "@/components/Hero";
import { SignatureExperience } from "@/components/SignatureExperience";
import { ProductGrid } from "@/components/ProductGrid";
import { CinematicHome } from "@/components/CinematicHome";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const videoSrc = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Coleção Intervalo",
    itemListElement: featured.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `/product/${product.slug}`,
      name: product.name,
    })),
  };

  return (
    <div className="home-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <CinematicHome />
      <Hero videoSrc={videoSrc} />

      <section className="manifesto shell">
        <p className="manifesto-statement">
          <span className="manifesto-line"><span>Uma joia não precisa</span></span>
          <span className="manifesto-line"><span>ocupar muito espaço</span></span>
          <span className="manifesto-line"><span>para alterar tudo</span></span>
          <span className="manifesto-line"><span>ao redor.</span></span>
        </p>
        <div className="manifesto-index">
          <span><i />Forma</span>
          <span><i />Matéria</span>
          <span><i />Luz</span>
        </div>
      </section>

      <section className="category-composition shell" aria-labelledby="categories-title">
        <header className="composition-heading">
          <p className="micro-label">01 / Coleções</p>
          <h2 id="categories-title">Escolha pela forma.</h2>
          <p>Quatro gestos, uma mesma tensão entre metal, pedra e vazio.</p>
        </header>
        <div className="category-grid">
          <Link href="/category/aneis" className="category-tile category-rings">
            <div><span className="category-image-layer"><Image src="/images/signet-ring.png" alt="Anel Sinal em ouro branco" fill sizes="(max-width: 760px) 92vw, 58vw" /></span></div>
            <span>Anéis <ArrowRight size={18} /></span>
          </Link>
          <Link href="/category/brincos" className="category-tile category-earrings">
            <div><span className="category-image-layer"><Image src="/images/earrings-studio.png" alt="Par de brincos Lumen" fill sizes="(max-width: 760px) 92vw, 29vw" /></span></div>
            <span>Brincos <ArrowRight size={18} /></span>
          </Link>
          <Link href="/category/colares" className="category-tile category-necklaces">
            <div><span className="category-image-layer"><Image src="/images/necklace-studio.png" alt="Colar Eixo em ouro branco" fill sizes="(max-width: 760px) 92vw, 36vw" /></span></div>
            <span>Colares <ArrowRight size={18} /></span>
          </Link>
          <Link href="/category/pulseiras" className="category-tile category-bracelets">
            <div><span className="category-image-layer"><Image src="/images/cuff-bracelet.png" alt="Bracelete Arco em ouro branco" fill sizes="(max-width: 760px) 92vw, 48vw" /></span></div>
            <span>Pulseiras <ArrowRight size={18} /></span>
          </Link>
        </div>
      </section>

      <SignatureExperience />

      <section className="featured-products shell" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <p className="micro-label">02 / Seleção</p>
            <h2 id="featured-title">Peças em foco.</h2>
          </div>
          <p className="section-note">Objetos de luz para usar todos os dias.</p>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="material-story" aria-labelledby="material-title">
        <div className="material-image">
          <div className="material-image-layer"><Image src="/images/craftsmanship-macro.png" alt="Cravação de uma safira azul-clara em detalhe macro" fill sizes="(max-width: 840px) 100vw, 58vw" /></div>
          <p className="image-caption"><span>03</span> Cravação / Macro</p>
        </div>
        <div className="material-copy">
          <p className="micro-label">Matéria em aproximação</p>
          <h2 id="material-title">Precisão visível.</h2>
          <p>O valor está no encontro entre a pedra, o metal e a mão que encerra o espaço entre eles.</p>
          <div className="material-facts">
            <div><span>Metal</span><strong>Ouro branco 18k</strong></div>
            <div><span>Pedra</span><strong>Safira azul-clara</strong></div>
            <div><span>Superfície</span><strong>Polida e escovada</strong></div>
          </div>
          <Link href="/product/anel-vetor" className="text-link">Ver o detalhe</Link>
        </div>
      </section>

      <section className="editorial-section shell" aria-labelledby="editorial-title">
        <div className="editorial-copy">
          <p className="micro-label">A joia em escala</p>
          <h2 id="editorial-title">Presença sem excesso.</h2>
          <p>Proporção, comprimento e peso visual pensados para acompanhar o corpo.</p>
          <Link className="button button-outline" href="/product/brincos-lumen">Conhecer Lumen</Link>
        </div>
        <div className="editorial-image">
          <div className="editorial-image-layer"><Image src="/images/earring-on-model.png" alt="Brinco Lumen usado junto ao rosto" fill sizes="(max-width: 800px) 92vw, 52vw" /></div>
          <p className="image-caption"><span>04</span> Corpo / Escala</p>
        </div>
      </section>

      <section className="private-service shell" aria-labelledby="service-title">
        <div className="service-number">E</div>
        <div>
          <p className="micro-label">05 / Atendimento privado</p>
          <h2 id="service-title">A escolha também pode ser privada.</h2>
          <p>Agende uma conversa para tamanho, combinação de peças e opções de presente.</p>
          <a className="button button-dark" href="mailto:atelier@eira.example">Falar com o atelier</a>
        </div>
      </section>
    </div>
  );
}
