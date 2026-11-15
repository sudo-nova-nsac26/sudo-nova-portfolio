"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./landing.module.css";

// A damped spring returns the companion to its responsive home position.
export default function FreeMascot({ language }: { language: "pt" | "en" }) {
    const button = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const node = button.current;
        if (!node) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        let x = 0, y = 0, vx = 0, vy = 0, angle = 0;
        let pointer: number | null = null, px = 0, py = 0;
        let frame = 0, previous = 0, lastCheck = 0;
        const site = node.parentElement;
        const header = site?.querySelector("header");
        const protectedElements = Array.from(site?.querySelectorAll<HTMLElement>("h1,h2,h3,p,a,input,textarea,button") ?? []).filter(el => el !== node && !header?.contains(el));
        let minY = 100;
        const measureHeader = () => { minY = Math.max(12, (header?.getBoundingClientRect().bottom ?? 88) + 20); };
        const home = () => { const b = bounds(); return { x: b.width - 12, y: Math.max(minY, b.height - 28) }; };
        const protectContent = () => {
            const r = node.getBoundingClientRect();
            const overlap = protectedElements.some(el => {
                const a = el.getBoundingClientRect();
                return a.width > 0 && a.height > 0 && a.left < r.right && a.right > r.left && a.top < r.bottom && a.bottom > r.top;
            });
            node.dataset.overlap = String(overlap);
        };
        const bounds = () => ({
            width: Math.max(0, window.innerWidth - node.offsetWidth - 8),
            height: Math.max(0, window.innerHeight - node.offsetHeight - 20),
        });
        const paint = () => {
            node.style.transform = `translate3d(${x}px,${y}px,0) rotate(${angle}deg)`;
        };
        const clamp = () => {
            const b = bounds();
            if (x < 8 || x > b.width) { x = Math.max(8, Math.min(b.width, x)); vx *= -.55; }
            if (y < minY || y > b.height) { y = Math.max(Math.min(minY, b.height), Math.min(b.height, y)); vy = 0; }
        };
        const reset = () => {
            measureHeader(); const origin = home();
            x = origin.x; y = origin.y; vx = 0; vy = 0; angle = 0;
            clamp(); paint();
        };
        const tick = (now: number) => {
            frame = 0;
            const dt = Math.min((now - (previous || now)) / 1000, .032);
            previous = now;
            if (pointer === null && !reduced.matches) {
                const origin = home();
                const targetY = origin.y + Math.sin(now / 1100) * 5;
                // Critically damped translation: return without an endless orbit.
                vx += ((origin.x - x) * 38 - vx * 13) * dt;
                vy += ((targetY - y) * 38 - vy * 13) * dt;
                x += vx * dt; y += vy * dt;
                const targetAngle = Math.sin(now / 1500) * 4;
                angle += (targetAngle - angle) * (1 - Math.exp(-6 * dt));
                clamp(); paint();
            }
            if (now - lastCheck > 120) { protectContent(); lastCheck = now; }
            if (!document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
        };
        const start = () => { previous = 0; if (!frame && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick); };
        const down = (e: PointerEvent) => {
            if (!e.isPrimary || e.button !== 0 || pointer !== null) return;
            measureHeader();
            pointer = e.pointerId; px = e.clientX; py = e.clientY;
            vx = 0; vy = 0;
            node.setPointerCapture(pointer); node.dataset.dragging = "true";
        };
        const move = (e: PointerEvent) => {
            if (pointer !== e.pointerId) return;
            const dx = e.clientX - px, dy = e.clientY - py;
            x += dx; y += dy;
            if (!reduced.matches) angle = Math.max(-18, Math.min(18, angle + dx * .15));
            px = e.clientX; py = e.clientY;
            clamp(); paint();
        };
        const up = (e: PointerEvent) => {
            if (pointer !== e.pointerId) return;
            pointer = null; delete node.dataset.dragging;
            if (node.hasPointerCapture(e.pointerId)) node.releasePointerCapture(e.pointerId);
            vx = 0; vy = 0;
            if (reduced.matches) reset();
            protectContent(); start();
        };
        const key = (e: KeyboardEvent) => {
            const steps: Record<string, [number, number]> = { ArrowLeft: [-24, 0], ArrowRight: [24, 0], ArrowUp: [0, -24], ArrowDown: [0, 24] };
            if (e.key === "Home" || e.key === "Escape") { e.preventDefault(); reset(); return; }
            const step = steps[e.key];
            if (!step) return;
            e.preventDefault(); vx = 0; vy = 0;
            x += step[0]; y += step[1]; clamp(); paint();
        };
        const resize = () => { measureHeader(); clamp(); paint(); protectContent(); };
        const observer = new ResizeObserver(resize);
        if (header) observer.observe(header);
        const visibility = () => {
            cancelAnimationFrame(frame); frame = 0; vx = 0; vy = 0;
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
        window.addEventListener("scroll", resize, { passive: true });
        document.addEventListener("visibilitychange", visibility);
        reduced.addEventListener("change", visibility);
        return () => {
            cancelAnimationFrame(frame);
            node.removeEventListener("pointerdown", down); node.removeEventListener("pointermove", move);
            node.removeEventListener("pointerup", up); node.removeEventListener("pointercancel", up);
            node.removeEventListener("lostpointercapture", up); node.removeEventListener("keydown", key);
            observer.disconnect();
            window.removeEventListener("scroll", resize);
            window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", visibility);
            reduced.removeEventListener("change", visibility);
        };
    }, []);
    const hint = language === "pt"
        ? "Arraste o pinguim; ao soltar, ele retorna ao canto. Use as setas para mover e Home para voltar ao canto."
        : "Drag the penguin; release to return it to the corner. Use arrow keys to move and Home to return to the corner.";
    return <button ref={button} type="button" className={styles.freeMascot} aria-label={hint} title={hint}>
        <Image src="/images/sudo-nova-mascot.png" alt="" width={1254} height={1254} sizes="78px" draggable={false} />
    </button>;
}

