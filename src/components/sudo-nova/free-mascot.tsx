"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./landing.module.css";

// Velocity uses pixels/second, so the flight is independent of screen refresh rate.
export default function FreeMascot({ language }: { language: "pt" | "en" }) {
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const node = button.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let x = 0, y = 0, vx = 0, vy = 0, angle = 0, spin = 0;
    let pointer: number | null = null, px = 0, py = 0, sample = 0;
    let frame = 0, previous = 0, lastMove = 0;
    const bounds = () => ({
      width: Math.max(0, window.innerWidth - node.offsetWidth - 8),
      height: Math.max(0, window.innerHeight - node.offsetHeight - 8),
    });
    const paint = () => {
      node.style.transform = `translate3d(${x}px,${y}px,0) rotate(${angle}deg)`;
    };
    const clamp = () => {
      const b = bounds();
      if (x < 8 || x > b.width) { x = Math.max(8, Math.min(b.width, x)); vx *= -.55; }
      if (y < 8 || y > b.height) { y = Math.max(8, Math.min(b.height, y)); vy *= -.55; }
    };
    const reset = () => {
      const b = bounds();
      x = b.width - 12; y = b.height - 20; vx = 0; vy = 0; angle = 0; spin = 0;
      clamp(); paint();
    };
    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min((now - (previous || now)) / 1000, .032);
      previous = now;
      if (pointer === null && !reduced.matches) {
        vx *= Math.exp(-1.6 * dt); vy *= Math.exp(-1.6 * dt);
        spin *= Math.exp(-2 * dt);
        x += vx * dt; y += (vy + Math.sin(now / 1400) * 5) * dt;
        angle += spin * dt;
        clamp(); paint();
      }
      if (!document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const start = () => { previous = 0; if (!frame && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick); };
    const down = (e: PointerEvent) => {
      if (!e.isPrimary || e.button !== 0 || pointer !== null) return;
      pointer = e.pointerId; px = e.clientX; py = e.clientY; sample = e.timeStamp;
      vx = 0; vy = 0; spin = 0; lastMove = sample;
      node.setPointerCapture(pointer); node.dataset.dragging = "true";
    };
    const move = (e: PointerEvent) => {
      if (pointer !== e.pointerId) return;
      const dx = e.clientX - px, dy = e.clientY - py;
      const dt = Math.max(.008, (e.timeStamp - sample) / 1000);
      vx = Math.max(-1000, Math.min(1000, dx / dt));
      vy = Math.max(-1000, Math.min(1000, dy / dt));
      spin = Math.max(-180, Math.min(180, vx * .18));
      x += dx; y += dy;
      if (!reduced.matches) angle += dx * .15;
      px = e.clientX; py = e.clientY; sample = e.timeStamp; lastMove = sample;
      clamp(); paint();
    };
    const up = (e: PointerEvent) => {
      if (pointer !== e.pointerId) return;
      pointer = null; delete node.dataset.dragging;
      if (node.hasPointerCapture(e.pointerId)) node.releasePointerCapture(e.pointerId);
      if (e.type !== "pointerup" || e.timeStamp - lastMove > 100 || reduced.matches) { vx = 0; vy = 0; spin = 0; }
      start();
    };
    const key = (e: KeyboardEvent) => {
      const steps: Record<string, [number, number]> = { ArrowLeft: [-24, 0], ArrowRight: [24, 0], ArrowUp: [0, -24], ArrowDown: [0, 24] };
      if (e.key === "Home" || e.key === "Escape") { e.preventDefault(); reset(); return; }
      const step = steps[e.key];
      if (!step) return;
      e.preventDefault(); vx = 0; vy = 0; spin = 0;
      x += step[0]; y += step[1]; clamp(); paint();
    };
    const resize = () => { clamp(); paint(); };
    const visibility = () => {
      cancelAnimationFrame(frame); frame = 0; vx = 0; vy = 0; spin = 0;
      if (reduced.matches) { angle = 0; paint(); }
      start();
    };
    reset(); start();
    node.addEventListener("pointerdown", down);
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
    node.addEventListener("pointercancel", up);
    node.addEventListener("lostpointercapture", up);
    node.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", visibility);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointerdown", down); node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up); node.removeEventListener("pointercancel", up);
      node.removeEventListener("lostpointercapture", up); node.removeEventListener("keydown", key);
      window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", visibility);
    };
  }, []);
  const hint = language === "pt"
    ? "Arraste e solte o pinguim para voar. Use as setas para mover e Home para voltar ao canto."
    : "Drag and release the penguin to fly. Use arrow keys to move and Home to return to the corner.";
  return <button ref={button} type="button" className={styles.freeMascot} aria-label={hint} title={hint}>
    <Image src="/images/sudo-nova-mascot.png" alt="" width={1254} height={1254} sizes="78px" draggable={false}/>
  </button>;
}
