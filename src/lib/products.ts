export type ProductCategory = "aneis" | "brincos" | "colares" | "pulseiras";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  story: string;
  category: ProductCategory;
  collection: string;
  price: number;
  material: string;
  stone: string;
  images: string[];
  sizes: string[];
  stock: number;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "eira-vetor",
    slug: "anel-vetor",
    name: "Anel Vetor",
    shortName: "Vetor",
    description: "Uma linha de luz mantida em tensão por uma estrutura aberta de ouro branco.",
    story: "A pedra alongada define o eixo. O metal existe apenas para sustentar sua direção e deixar a luz atravessar a peça.",
    category: "aneis",
    collection: "intervalo",
    price: 12800,
    material: "Ouro branco 18k",
    stone: "Safira azul-clara",
    images: ["/images/hero-ring.png", "/images/craftsmanship-macro.png", "/images/signet-ring.png"],
    sizes: ["12", "14", "16", "18", "20"],
    stock: 4,
    featured: true,
  },
  {
    id: "eira-lumen",
    slug: "brincos-lumen",
    name: "Brincos Lumen",
    shortName: "Lumen",
    description: "Dois planos verticais terminam em safiras lapidadas como gotas frias.",
    story: "Comprimento e movimento foram equilibrados para que a peça acompanhe o rosto sem perder sua geometria.",
    category: "brincos",
    collection: "intervalo",
    price: 9600,
    material: "Ouro branco 18k",
    stone: "Par de safiras azul-claras",
    images: ["/images/earrings-studio.png", "/images/earring-on-model.png", "/images/craftsmanship-macro.png"],
    sizes: ["Único"],
    stock: 6,
    featured: true,
  },
  {
    id: "eira-eixo",
    slug: "colar-eixo",
    name: "Colar Eixo",
    shortName: "Eixo",
    description: "Um colar rígido que conduz o olhar até uma única safira vertical.",
    story: "Cada segmento acompanha a curva do colo. O fecho desaparece para preservar a leitura contínua do metal.",
    category: "colares",
    collection: "intervalo",
    price: 15800,
    material: "Ouro branco 18k",
    stone: "Safira azul-clara",
    images: ["/images/necklace-studio.png", "/images/craftsmanship-macro.png", "/images/hero-ring.png"],
    sizes: ["38 cm", "42 cm"],
    stock: 3,
    featured: true,
  },
  {
    id: "eira-arco",
    slug: "bracelete-arco",
    name: "Bracelete Arco",
    shortName: "Arco",
    description: "Um volume contínuo interrompido por um ponto azul quase secreto.",
    story: "A superfície alterna escovado e polido para mudar de presença conforme o pulso encontra a luz.",
    category: "pulseiras",
    collection: "intervalo",
    price: 11800,
    material: "Ouro branco 18k",
    stone: "Safira azul-clara",
    images: ["/images/cuff-bracelet.png", "/images/craftsmanship-macro.png", "/images/necklace-studio.png"],
    sizes: ["P", "M", "G"],
    stock: 5,
    featured: true,
  },
  {
    id: "eira-sinal",
    slug: "anel-sinal",
    name: "Anel Sinal",
    shortName: "Sinal",
    description: "A forma de sinete reduzida a um plano preciso e uma pedra rente ao metal.",
    story: "Uma peça diária com peso visual contido. A safira aparece apenas quando a luz encontra o centro.",
    category: "aneis",
    collection: "intervalo",
    price: 6800,
    material: "Ouro branco 18k",
    stone: "Safira azul-clara",
    images: ["/images/signet-ring.png", "/images/hero-ring.png", "/images/craftsmanship-macro.png"],
    sizes: ["14", "16", "18", "20", "22"],
    stock: 8,
    featured: false,
  },
  {
    id: "eira-orbita",
    slug: "brincos-orbita",
    name: "Brincos Órbita",
    shortName: "Órbita",
    description: "Safiras em suspensão visual, ligadas ao corpo por uma haste quase gráfica.",
    story: "A construção cria distância entre o metal e a pedra. O espaço vazio passa a fazer parte da joia.",
    category: "brincos",
    collection: "intervalo",
    price: 7800,
    material: "Ouro branco 18k",
    stone: "Par de safiras azul-claras",
    images: ["/images/earring-on-model.png", "/images/earrings-studio.png", "/images/craftsmanship-macro.png"],
    sizes: ["Único"],
    stock: 7,
    featured: false,
  },
];

export const categoryLabels: Record<ProductCategory, string> = {
  aneis: "Anéis",
  brincos: "Brincos",
  colares: "Colares",
  pulseiras: "Pulseiras",
};

export function getProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category === category);
}

export function getProductsByCollection(collection: string) {
  return products.filter((product) => product.collection === collection);
}

export function getRelatedProducts(product: Product) {
  return products.filter((item) => item.id !== product.id).slice(0, 3);
}

export function searchProducts(query: string) {
  const normalized = query.trim().toLocaleLowerCase("pt-BR");
  if (!normalized) return products;
  return products.filter((product) =>
    [product.name, product.category, product.collection, product.material, product.stone]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(normalized),
  );
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
