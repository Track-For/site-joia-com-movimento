"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "@phosphor-icons/react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [zoomed, setZoomed] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = zoomed ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(null);
    };
    if (zoomed) window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomed]);

  return (
    <>
      <div className="product-gallery" aria-label={`Galeria de ${name}`}>
        {images.map((src, index) => (
          <button className="gallery-image" key={`${src}-${index}`} onClick={() => setZoomed(src)} aria-label={`Ampliar imagem ${index + 1} de ${name}`}>
            <Image src={src} alt={`${name}, vista ${index + 1}`} fill priority={index === 0} sizes="(max-width: 800px) 92vw, 58vw" />
          </button>
        ))}
      </div>
      {zoomed && (
        <div className="zoom-layer" role="dialog" aria-modal="true" aria-label={`Imagem ampliada de ${name}`}>
          <button className="icon-button zoom-close" onClick={() => setZoomed(null)} aria-label="Fechar imagem ampliada"><X size={24} /></button>
          <div className="zoom-image"><Image src={zoomed} alt={`${name} ampliado`} fill sizes="100vw" /></div>
        </div>
      )}
    </>
  );
}
