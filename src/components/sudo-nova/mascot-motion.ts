"use client";
import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Point = { x: number; y: number; size: number };
// Pure geometry: both endpoints remain exact, regardless of screen size.
export function flightPosition(progress: number, source: Point, target: Point) {
  const p = Math.max(0, Math.min(1, progress));
  const ease = p * p * (3 - 2 * p);
  const arc = Math.min(110, Math.abs(source.x - target.x) * .18);
  const size = source.size + (target.size - source.size) * ease;
  return {
    x: source.x + (target.x - source.x) * ease,
    y: Math.max(size / 2 + 4, source.y + (target.y - source.y) * ease - Math.sin(Math.PI * p) * arc),
    size,
    rotation: -Math.sin(Math.PI * p) * 17,
  };
}

type MotionRefs = {
  root: RefObject<HTMLDivElement | null>;
  stage: RefObject<HTMLDivElement | null>;
  dock: RefObject<HTMLSpanElement | null>;
  flyer: RefObject<HTMLDivElement | null>;
  original: RefObject<HTMLDivElement | null>;
  base: RefObject<HTMLDivElement | null>;
  corner: RefObject<HTMLDivElement | null>;
};

export function useMascotMotion(refs: MotionRefs) {
  const { root, stage, dock, flyer, original, base, corner } = refs;
  useEffect(() => {
    if (!root.current || !stage.current || !dock.current || !flyer.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add({ moving: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, mediaContext => {
        if (mediaContext.conditions?.reduced) {
          gsap.set(flyer.current, { autoAlpha: 0 });
          gsap.set(dock.current, { opacity: 1 });
          gsap.set(original.current, { opacity: 1 });
          gsap.set(base.current, { opacity: 0 });
          return;
        }
        gsap.set(dock.current, { opacity: 0 });
        const state = { progress: 0 };
        let source = { x: 0, y: 0, size: 0 };
        let target = { x: 0, y: 0, size: 0 };
        const measure = () => {
          const rect = stage.current!.getBoundingClientRect();
          const destination = dock.current!.getBoundingClientRect();
          // Match the location of the penguin inside the complete logo.
          source = { x: rect.left + rect.width * .475, y: rect.top + window.scrollY + rect.height * .39, size: rect.width * .60 };
          target = { x: destination.left + destination.width / 2, y: destination.top + destination.height / 2, size: destination.width };
        };
        const paint = () => {
          const p = state.progress;
          const pos = flightPosition(p, { ...source, y: source.y - window.scrollY }, target);
          gsap.set(flyer.current, { x: pos.x - pos.size / 2, y: pos.y - pos.size / 2, width: pos.size, height: pos.size, rotation: pos.rotation, autoAlpha: Math.min(1, p / .10) });
          gsap.set(original.current, { opacity: 1 - Math.min(1, p / .12) });
          gsap.set(base.current, { opacity: Math.min(1, p / .12) });
        };
        measure();
        const hero = root.current!.querySelector<HTMLElement>("#inicio")!;
        const animation = gsap.to(state, { progress: 1, ease: "none", onUpdate: paint,
          scrollTrigger: {
            trigger: hero,
            start: () => Math.max(12, hero.offsetTop - (root.current!.querySelector("header")?.clientHeight ?? 86) + 28),
            end: () => `+=${Math.min(440, Math.max(230, hero.offsetHeight * .7))}`,
            scrub: .45,
            invalidateOnRefresh: true,
            onRefreshInit: measure,
            onRefresh: paint,
          },
        });
        paint();
        // The second companion stays within the edge, with movement driven only by scrolling.
        const orbit = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: .9, invalidateOnRefresh: true } });
        orbit.to(corner.current, { y: () => -window.innerHeight * .17, x: -8, rotation: -7, duration: 1, ease: "sine.inOut" })
          .to(corner.current, { y: () => -window.innerHeight * .35, x: -3, rotation: 6, duration: 1, ease: "sine.inOut" })
          .to(corner.current, { y: () => -window.innerHeight * .12, x: -12, rotation: -5, duration: 1, ease: "sine.inOut" })
          .to(corner.current, { y: () => -window.innerHeight * .29, x: -2, rotation: 7, duration: 1, ease: "sine.inOut" })
          .to(corner.current, { y: 0, x: 0, rotation: 0, duration: 1, ease: "sine.inOut" });
        const images = Array.from(stage.current!.querySelectorAll("img"));
        const refresh = () => ScrollTrigger.refresh();
        images.forEach(img => { if (!img.complete) img.addEventListener("load", refresh); });
        return () => { images.forEach(img => img.removeEventListener("load", refresh)); animation.kill(); orbit.kill(); };
      });
    }, root);
    return () => { media.revert(); context.revert(); };
  }, [root, stage, dock, flyer, original, base, corner]);
}
