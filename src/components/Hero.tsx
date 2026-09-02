"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STABILITY_PERCENT = (0.4 / 15) * 100;

const chapters = [
  { key: "intervalo", start: 0, end: 17, word: "EIRA", modifier: "hero-chapter-word--brand" },
  { key: "forma", start: 17, end: 37, word: "Silhueta." },
  { key: "materia", start: 37, end: 57, word: "Peso." },
  { key: "luz", start: 57, end: 79, word: "Reflexo." },
  { key: "tensao", start: 79, end: 100, word: "Luz, sob tensão." },
];

export function Hero({ videoSrc }: { videoSrc?: string }) {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!root.current || !pin.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const videoEl = video.current;

    if (reduceMotion) {
      if (videoEl) {
        videoEl.autoplay = true;
        videoEl.loop = true;
        videoEl.play().catch(() => {});
      }
      gsap.set(".hero-chapter", { autoAlpha: 0 });
      gsap.set('.hero-chapter[data-chapter="tensao"]', { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".hero-chapter", { autoAlpha: 0 });
      gsap.set('.hero-chapter[data-chapter="intervalo"]', { autoAlpha: 1 });
      gsap.fromTo(".hero-media-inner", { scale: 1.05 }, { scale: 1, duration: 1.4, ease: "power3.out" });

      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=500%",
          pin: pin.current,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      if (videoEl) {
        const scrub = { time: 0 };
        timeline.to(
          scrub,
          {
            time: 15,
            ease: "none",
            duration: 100,
            onUpdate: () => {
              if (!videoEl.seeking) videoEl.currentTime = scrub.time;
            },
          },
          0,
        );
      }

      timeline.to(".hero-scroll-cue", { autoAlpha: 0, duration: 4 }, 3);

      chapters.forEach((chapter, index) => {
        const selector = `.hero-chapter[data-chapter="${chapter.key}"]`;
        const isFirst = index === 0;
        const isLast = index === chapters.length - 1;

        if (!isFirst) {
          timeline.fromTo(
            selector,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: STABILITY_PERCENT, ease: "power1.out" },
            chapter.start,
          );
        }

        if (!isLast) {
          timeline.to(
            selector,
            { autoAlpha: 0, duration: STABILITY_PERCENT, ease: "power1.out" },
            chapter.end - STABILITY_PERCENT,
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        EIRA Atelier — Coleção Intervalo. Luz, sob tensão.
      </h1>
      <div className={`hero-viewport ${!videoSrc || videoReady ? "is-content-ready" : ""}`} ref={pin}>
        <div className="hero-media">
          <div className="hero-media-inner">
            {videoSrc ? (
              <video
                ref={video}
                className="hero-video"
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={() => setVideoReady(true)}
                onLoadedData={() => setVideoReady(true)}
                onCanPlay={() => setVideoReady(true)}
                aria-label="Filme da coleção Intervalo"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : (
              <Image
                src="/images/hero-ring.png"
                alt="Anel Vetor em ouro branco com safira azul-clara sobre vidro fumê"
                fill
                priority
                sizes="100vw"
              />
            )}
          </div>
        </div>
        <div className="hero-scrim" />
        <div className="hero-vignette" aria-hidden="true" />

        <span className="hero-brand">EIRA ATELIER</span>

        <div className="hero-copy shell">
          {chapters.map((chapter) => (
            <div className="hero-chapter" data-chapter={chapter.key} key={chapter.key} aria-hidden={chapter.key !== "tensao"}>
              <span className={`hero-chapter-word${chapter.modifier ? ` ${chapter.modifier}` : ""}`}>{chapter.word}</span>
              {chapter.key === "tensao" && (
                <>
                  <p>Joias arquitetônicas em ouro branco e safiras pálidas, desenhadas para existir perto da pele.</p>
                  <Link className="button button-light" href="/collection/intervalo">
                    Conhecer Coleção
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="hero-frame-meta shell" aria-hidden="true">
          <span>Intervalo / 01</span>
          <span>São Paulo · BR</span>
        </div>
        <div className="hero-scroll-cue" aria-hidden="true">
          <span>Deslize para explorar</span>
          <i />
        </div>
      </div>
    </section>
  );
}
