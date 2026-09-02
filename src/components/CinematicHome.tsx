"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CinematicHome() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home-page");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const progressBar = root.querySelector<HTMLElement>(".cinematic-progress-bar");
      if (progressBar) {
        const setProgress = gsap.quickSetter(progressBar, "scaleX");
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => setProgress(self.progress),
        });
      }

      gsap.fromTo(
        ".manifesto-line > span",
        { yPercent: 112, rotate: 2.5 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.15,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".manifesto",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".manifesto-index span",
        { autoAlpha: 0, x: 24 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto-index", start: "top 88%" },
        },
      );

      gsap.fromTo(
        ".composition-heading > *",
        { autoAlpha: 0, y: 46 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".composition-heading", start: "top 82%" },
        },
      );

      root.querySelectorAll<HTMLElement>(".category-tile").forEach((tile, index) => {
        gsap.fromTo(
          tile,
          { autoAlpha: 0, y: index % 2 === 0 ? 80 : 125 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: tile, start: "top 88%" },
          },
        );
      });

      gsap.fromTo(
        ".featured-products .section-heading > *",
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".featured-products", start: "top 80%" },
        },
      );

      const productCards = gsap.utils.toArray<HTMLElement>(".featured-products .product-card");
      gsap.set(productCards, { autoAlpha: 0, y: 72 });
      ScrollTrigger.batch(productCards, {
        start: "top 88%",
        once: true,
        onEnter: (elements) =>
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.11,
            ease: "power3.out",
            overwrite: true,
          }),
      });

      gsap.fromTo(
        ".material-copy > *",
        { autoAlpha: 0, y: 54 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: ".material-story", start: "top 58%" },
        },
      );

      gsap.fromTo(
        ".editorial-copy > *",
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".editorial-section", start: "top 72%" },
        },
      );

      gsap.fromTo(
        ".private-service > div:last-child > *",
        { autoAlpha: 0, y: 45 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".private-service", start: "top 74%" },
        },
      );

      media.add("(min-width: 900px)", () => {
        root.querySelectorAll<HTMLElement>(".category-image-layer").forEach((layer) => {
          gsap.fromTo(
            layer,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: layer.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.9,
              },
            },
          );
        });

        gsap.fromTo(
          ".material-image-layer",
          { yPercent: -7, scale: 1.08 },
          {
            yPercent: 7,
            scale: 1.2,
            ease: "none",
            scrollTrigger: { trigger: ".material-story", start: "top bottom", end: "bottom top", scrub: 1.1 },
          },
        );

        gsap.fromTo(
          ".editorial-image-layer",
          { yPercent: -8, scale: 1.07 },
          {
            yPercent: 8,
            scale: 1.14,
            ease: "none",
            scrollTrigger: { trigger: ".editorial-section", start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );

        gsap.fromTo(
          ".service-number",
          { xPercent: -22, rotate: -4 },
          {
            xPercent: 9,
            rotate: 0,
            ease: "none",
            scrollTrigger: { trigger: ".private-service", start: "top bottom", end: "bottom top", scrub: 1.2 },
          },
        );
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <div className="cinematic-progress" aria-hidden="true">
      <span className="cinematic-progress-bar" />
    </div>
  );
}
