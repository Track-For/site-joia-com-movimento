"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Handbag, Heart, List, MagnifyingGlass, X } from "@phosphor-icons/react";
import { useStore } from "./StoreProvider";

const links = [
  ["Novidades", "/collection/intervalo"],
  ["Anéis", "/category/aneis"],
  ["Brincos", "/category/brincos"],
  ["Colares", "/category/colares"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, cartCount, wishlistCount } = useStore();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner shell">
          <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><List size={23} /></button>
          <nav className="header-nav" aria-label="Principal">
            {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
          <Link className="wordmark" href="/" aria-label="EIRA, página inicial">EIRA</Link>
          <div className="header-actions">
            <Link className="icon-button" href="/search" aria-label="Buscar"><MagnifyingGlass size={19} /></Link>
            <Link className="icon-button desktop-only" href="/search?wishlist=1" aria-label={`Lista de desejos com ${wishlistCount} itens`}>
              <Heart size={19} /><span className="action-count">{wishlistCount}</span>
            </Link>
            <button className="icon-button" onClick={openCart} aria-label={`Abrir sacola com ${cartCount} itens`}>
              <Handbag size={19} /><span className="action-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="mobile-menu-top">
          <span>EIRA</span>
          <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X size={24} /></button>
        </div>
        <nav aria-label="Menu móvel">
          {links.map(([label, href]) => (
            <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          <Link href="/category/pulseiras" onClick={() => setMenuOpen(false)}>Pulseiras</Link>
          <Link href="/search" onClick={() => setMenuOpen(false)}>Buscar</Link>
        </nav>
        <p>Objetos precisos para existir perto da pele.</p>
      </div>
    </>
  );
}
