"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  ["Metal", "O ouro branco define uma estrutura aberta, firme e mínima."],
  ["Forma", "O eixo alongado orienta a peça e cria espaço para a luz."],
  ["Pedra", "A safira pálida transforma reflexo em profundidade."],
  ["Acabamento", "Polido e escovado se alternam a cada movimento."],
];

export function SignatureExperience() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !panel.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(min-width: 900px)", () => {
        const rows = gsap.utils.toArray<HTMLElement>(".signature-stage");
        gsap.set(rows, { opacity: 0.28 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=240%",
            pin: panel.current,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .fromTo(".signature-object img", { scale: 1.04, yPercent: -2 }, { scale: 1.24, yPercent: 3, duration: 4, ease: "none" }, 0)
          .fromTo(".signature-orbit", { rotate: -18, scale: 1.08 }, { rotate: 92, scale: 0.86, duration: 4, ease: "none" }, 0)
          .fromTo(".signature-visual-meta", { yPercent: 30 }, { yPercent: -40, duration: 4, ease: "none" }, 0);
        rows.forEach((row, index) => {
          timeline
            .to(rows, { opacity: 0.22, duration: 0.25 }, index)
            .to(row, { opacity: 1, duration: 0.25 }, index)
            .to(".signature-object", { rotate: (index - 1.5) * 1.8, scale: 1 + index * 0.018, duration: 0.65, ease: "none" }, index);
        });
      });
    }, root);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="signature" ref={root} aria-labelledby="signature-title">
      <div className="signature-panel" ref={panel}>
        <div className="signature-object">
          <Image src="/images/hero-ring.png" alt="Detalhe ampliado do Anel Vetor" fill sizes="(max-width: 899px) 100vw, 56vw" />
          <div className="signature-orbit" aria-hidden="true"><span /></div>
          <div className="signature-visual-meta" aria-hidden="true">
            <span>Vetor / 18k</span>
            <span>Safira 0.62 ct</span>
          </div>
        </div>
        <div className="signature-copy">
          <p className="micro-label">Anatomia de uma peça</p>
          <h2 id="signature-title">Matéria encontra direção.</h2>
          <div className="signature-stages">
            {stages.map(([title, copy]) => (
              <div className="signature-stage" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
          <Link href="/product/anel-vetor" className="text-link">Descobrir o Anel Vetor</Link>
        </div>
      </div>
    </section>
  );
}
