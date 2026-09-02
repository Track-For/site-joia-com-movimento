"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "@phosphor-icons/react";
import { formatPrice, getProductById } from "@/lib/products";
import { track } from "@/lib/analytics";

type CartItem = { productId: string; size: string; quantity: number };

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  cartCount: number;
  wishlistCount: number;
  addToCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore precisa estar dentro de StoreProvider");
  return value;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        setCart(JSON.parse(localStorage.getItem("eira-cart") ?? "[]"));
        setWishlist(JSON.parse(localStorage.getItem("eira-wishlist") ?? "[]"));
      } catch {
        setCart([]);
        setWishlist([]);
      }
      loaded.current = true;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (loaded.current) localStorage.setItem("eira-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (loaded.current) localStorage.setItem("eira-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    if (cartOpen) window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cartOpen]);

  const addToCart = useCallback((productId: string, size: string) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId && item.size === size);
      if (existing) {
        return current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { productId, size, quantity: 1 }];
    });
    track("add_to_cart", { item_id: productId, size });
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, delta: number) => {
    setCart((current) => current
      .map((item) => item.productId === productId && item.size === size
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item)
      .filter((item) => item.quantity > 0));
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((current) => current.filter((item) => !(item.productId === productId && item.size === size)));
    track("remove_from_cart", { item_id: productId, size });
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) => {
      if (current.includes(productId)) return current.filter((id) => id !== productId);
      track("add_to_wishlist", { item_id: productId });
      return [...current, productId];
    });
  }, []);

  const value = useMemo<StoreContextValue>(() => ({
    cart,
    wishlist,
    cartOpen,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    wishlistCount: wishlist.length,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    isWishlisted: (productId) => wishlist.includes(productId),
    openCart: () => {
      track("view_cart");
      setCartOpen(true);
    },
    closeCart: () => setCartOpen(false),
  }), [cart, wishlist, cartOpen, addToCart, updateQuantity, removeFromCart, toggleWishlist]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      <CartDrawer />
    </StoreContext.Provider>
  );
}

function CartDrawer() {
  const { cart, cartOpen, closeCart, updateQuantity, removeFromCart } = useStore();
  const subtotal = cart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <div className={`drawer-layer ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen} inert={!cartOpen}>
      <button className="drawer-backdrop" onClick={closeCart} aria-label="Fechar sacola" tabIndex={cartOpen ? 0 : -1} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="drawer-header">
          <div>
            <p className="micro-label">Seleção atual</p>
            <h2 id="cart-title">Sua sacola</h2>
          </div>
          <button className="icon-button" onClick={closeCart} aria-label="Fechar sacola"><X size={20} /></button>
        </header>

        <div className="drawer-content">
          {cart.length === 0 ? (
            <div className="empty-state">
              <p>Nenhuma peça selecionada.</p>
              <Link href="/collection/intervalo" onClick={closeCart}>Conhecer a coleção</Link>
            </div>
          ) : cart.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return (
              <article className="cart-item" key={`${item.productId}-${item.size}`}>
                <Image src={product.images[0]} alt={product.name} width={128} height={160} sizes="96px" />
                <div className="cart-item-info">
                  <Link href={`/product/${product.slug}`} onClick={closeCart}>{product.name}</Link>
                  <span>{product.material}</span>
                  <span>Tamanho {item.size}</span>
                  <strong>{formatPrice(product.price)}</strong>
                  <div className="quantity-row">
                    <button onClick={() => updateQuantity(item.productId, item.size, -1)} aria-label={`Diminuir quantidade de ${product.name}`}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.size, 1)} aria-label={`Aumentar quantidade de ${product.name}`}><Plus size={14} /></button>
                    <button className="remove-button" onClick={() => removeFromCart(item.productId, item.size)}>Remover</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {cart.length > 0 && (
          <footer className="drawer-footer">
            <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <p>Frete, seguro e prazo calculados no atendimento final.</p>
            <button className="button button-dark" onClick={() => track("begin_checkout")}>Solicitar atendimento</button>
          </footer>
        )}
      </aside>
    </div>
  );
}
