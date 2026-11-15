"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./landing.module.css";

// Scroll defines the anchor; pointer velocity adds a temporary zero-gravity-style flight.
export default function FreeMascot({ language }: { language: "pt" | "en" }) {
    const button = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const node = button.current;
        if (!node) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        let x = 0, y = 0, vx = 0, vy = 0, angle = 0, angularVelocity = 0;
        let sampleTime = 0, lastMoveTime = 0, releasedAt = -Infinity;
        let pointer: number | null = null, px = 0, py = 0;
        let frame = 0, previous = 0, lastCheck = 0;
        const site = node.parentElement;
        const header = site?.querySelector("header");
        const protectedElements = Array.from(site?.querySelectorAll<HTMLElement>("h1,h2,h3,p,a,input,textarea,button") ?? []).filter(el => el !== node && !header?.contains(el));
        let minY = 100;
        const measureHeader = () => { minY = Math.max(12, (header?.getBoundingClientRect().bottom ?? 88) + 20); };
        const home = () => {
            const b = bounds();
            const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const progress = reduced.matches ? 0 : Math.max(0, Math.min(1, window.scrollY / range));
            // The anchor rises along the side as the visitor scrolls down.
            const travel = Math.min(window.innerHeight * .42, Math.max(0, b.height - minY - 48));
            return {
                x: b.width - 12 - Math.sin(progress * Math.PI) * 8,
                y: Math.max(minY, b.height - 28 - progress * travel)
            };
        };
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
            if (y < minY || y > b.height) { y = Math.max(Math.min(minY, b.height), Math.min(b.height, y)); vy *= -.25; }
        };
        const reset = () => {
            measureHeader(); const origin = home();
            x = origin.x; y = origin.y; vx = 0; vy = 0; angle = 0; angularVelocity = 0; releasedAt = -Infinity;
            clamp(); paint();
        };
        const tick = (now: number) => {
            frame = 0;
            const dt = Math.min((now - (previous || now)) / 1000, .032);
            previous = now;
            if (pointer === null && !reduced.matches) {
                const origin = home();
                const targetY = origin.y + Math.sin(now / 1100) * 5;
                // Preserve the throw briefly, then gradually attract back to the scroll anchor.
                const age = (now - releasedAt) / 1000;
                const attraction = Math.max(0, Math.min(1, (age - .22) / .65));
                const stiffness = 26 * attraction;
                const damping = 1.1 + 8.5 * attraction;
                vx += ((origin.x - x) * stiffness - vx * damping) * dt;
                vy += ((targetY - y) * stiffness - vy * damping) * dt;
                x += vx * dt; y += vy * dt;
                const targetAngle = Math.sin(now / 1500) * 4;
                angularVelocity += ((targetAngle - angle) * 16 * attraction - angularVelocity * (1.4 + 5 * attraction)) * dt;
                angle += angularVelocity * dt;
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
            vx = 0; vy = 0; angularVelocity = 0; releasedAt = -Infinity;
            sampleTime = e.timeStamp; lastMoveTime = sampleTime;
            node.setPointerCapture(pointer); node.dataset.dragging = "true";
        };
        const move = (e: PointerEvent) => {
            if (pointer !== e.pointerId) return;
            const dx = e.clientX - px, dy = e.clientY - py;
            const elapsed = Math.max(.008, Math.min(.1, (e.timeStamp - sampleTime) / 1000));
            const blend = 1 - Math.exp(-22 * elapsed);
            const limit = (value: number, maximum: number) => Math.max(-maximum, Math.min(maximum, value));
            vx += (limit(dx / elapsed, 1000) - vx) * blend;
            vy += (limit(dy / elapsed, 1000) - vy) * blend;
            x += dx; y += dy;
            if (!reduced.matches) {
                const tilt = limit(vx * .045, 28);
                const previousAngle = angle;
                angle += (tilt - angle) * (1 - Math.exp(-12 * elapsed));
                angularVelocity = limit((angle - previousAngle) / elapsed, 160);
            }
            sampleTime = e.timeStamp;
            if (dx || dy) lastMoveTime = sampleTime;
            px = e.clientX; py = e.clientY;
            clamp(); paint();
        };
        const up = (e: PointerEvent) => {
            if (pointer !== e.pointerId) return;
            pointer = null; delete node.dataset.dragging;
            if (node.hasPointerCapture(e.pointerId)) node.releasePointerCapture(e.pointerId);
            const thrown = e.type === "pointerup" && e.timeStamp - lastMoveTime < 100 && !reduced.matches;
            releasedAt = thrown ? performance.now() : -Infinity;
            if (!thrown) { vx = 0; vy = 0; angularVelocity = 0; }
            if (reduced.matches) reset();
            protectContent(); start();
        };
        const key = (e: KeyboardEvent) => {
            const steps: Record<string, [number, number]> = { ArrowLeft: [-24, 0], ArrowRight: [24, 0], ArrowUp: [0, -24], ArrowDown: [0, 24] };
            if (e.key === "Home" || e.key === "Escape") { e.preventDefault(); reset(); return; }
            const step = steps[e.key];
            if (!step) return;
            e.preventDefault(); vx = 0; vy = 0; angularVelocity = 0; releasedAt = -Infinity;
            x += step[0]; y += step[1]; clamp(); paint();
        };
        const resize = () => { measureHeader(); clamp(); paint(); protectContent(); };
        const observer = new ResizeObserver(resize);
        if (header) observer.observe(header);
        const visibility = () => {
            cancelAnimationFrame(frame); frame = 0; vx = 0; vy = 0; angularVelocity = 0; releasedAt = -Infinity;
            if (reduced.matches) reset();
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
        ? "O pinguim acompanha a rolagem. Arraste e solte para impulsioná-lo; ele retorna à lateral. Use as setas para mover e Home para retornar."
        : "The penguin follows scrolling. Drag and release to launch it; it returns to the side. Use arrow keys to move and Home to return.";
    return <button ref={button} type="button" className={styles.freeMascot} aria-label={hint} title={hint}>
        <Image src="/images/sudo-nova-mascot.png" alt="" width={1254} height={1254} sizes="78px" draggable={false} />
    </button>;
}


