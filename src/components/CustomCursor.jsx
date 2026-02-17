'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────
   Section IDs mapped to cursor theme names
   ───────────────────────────────────────────── */
const SECTION_IDS = ['home', 'about', 'tech-stack', 'portfolio', 'experience', 'contact'];

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const glowRef = useRef(null);
    const trailCanvasRef = useRef(null);
    const pos = useRef({ x: -100, y: -100 });
    const target = useRef({ x: -100, y: -100 });
    const currentSection = useRef('');
    const isVisible = useRef(false);
    const isHovering = useRef(false);
    const trailPoints = useRef([]);
    const rafId = useRef(null);
    const [section, setSection] = useState('');

    /* ─── Detect which section the cursor is over ─── */
    const detectSection = useCallback((x, y) => {
        for (const id of SECTION_IDS) {
            const el = document.getElementById(id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right) {
                if (currentSection.current !== id) {
                    currentSection.current = id;
                    setSection(id);
                }
                return;
            }
        }
        if (currentSection.current !== '') {
            currentSection.current = '';
            setSection('');
        }
    }, []);

    /* ─── Mouse handlers ─── */
    useEffect(() => {
        // Hide on touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const onMouseMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY };
            if (!isVisible.current) {
                isVisible.current = true;
                pos.current = { x: e.clientX, y: e.clientY };
            }
            detectSection(e.clientX, e.clientY);
        };

        const onMouseEnter = () => {
            isVisible.current = true;
            if (cursorRef.current) cursorRef.current.style.opacity = '1';
            if (glowRef.current) glowRef.current.style.opacity = '1';
        };

        const onMouseLeave = () => {
            isVisible.current = false;
            if (cursorRef.current) cursorRef.current.style.opacity = '0';
            if (glowRef.current) glowRef.current.style.opacity = '0';
        };

        const onMouseDown = () => {
            if (cursorRef.current) cursorRef.current.classList.add('cursor--click');
        };

        const onMouseUp = () => {
            if (cursorRef.current) cursorRef.current.classList.remove('cursor--click');
        };

        // Detect hover on interactive elements
        const onMouseOver = (e) => {
            const target = e.target.closest('a, button, [role="button"], input, textarea, select, .glass-card, .portfolio-card');
            if (target) {
                isHovering.current = true;
                cursorRef.current?.classList.add('cursor--hovering');
            }
        };

        const onMouseOut = (e) => {
            const target = e.target.closest('a, button, [role="button"], input, textarea, select, .glass-card, .portfolio-card');
            if (target) {
                isHovering.current = false;
                cursorRef.current?.classList.remove('cursor--hovering');
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        };
    }, [detectSection]);

    /* ─── Animation loop ─── */
    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const canvas = trailCanvasRef.current;
        let ctx;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx = canvas.getContext('2d');

            const onResize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };
            window.addEventListener('resize', onResize);
        }

        const animate = () => {
            // Smooth lerp
            const lerpFactor = 0.15;
            pos.current.x += (target.current.x - pos.current.x) * lerpFactor;
            pos.current.y += (target.current.y - pos.current.y) * lerpFactor;

            const x = pos.current.x;
            const y = pos.current.y;

            // Update cursor position
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            }
            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            }

            // Trail particles (Hero section only)
            if (currentSection.current === 'home' && ctx && isVisible.current) {
                trailPoints.current.push({ x, y, life: 1.0, size: 3 + Math.random() * 3 });
                if (trailPoints.current.length > 30) trailPoints.current.shift();
            }

            // Draw trail
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (let i = trailPoints.current.length - 1; i >= 0; i--) {
                    const p = trailPoints.current[i];
                    p.life -= 0.025;

                    if (p.life <= 0) {
                        trailPoints.current.splice(i, 1);
                        continue;
                    }

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 229, 255, ${p.life * 0.5})`;
                    ctx.fill();

                    // Glow
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * p.life * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 229, 255, ${p.life * 0.1})`;
                    ctx.fill();
                }
            }

            rafId.current = requestAnimationFrame(animate);
        };

        rafId.current = requestAnimationFrame(animate);

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    // Determine cursor class based on section
    const sectionClass = section ? `cursor--${section}` : '';


    return (
        <>
            {/* Trail canvas (for Hero particle trail) */}
            <canvas
                ref={trailCanvasRef}
                className="cursor-trail-canvas"
                aria-hidden="true"
            />

            {/* Outer glow ring */}
            <div
                ref={glowRef}
                className={`cursor-glow ${sectionClass}`}
                aria-hidden="true"
            />

            {/* Inner cursor dot */}
            <div
                ref={cursorRef}
                className={`cursor-dot ${sectionClass}`}
                aria-hidden="true"
            >
                {/* Inner ring for Experience section */}
                <div className="cursor-inner-ring" />
                {/* Pulse rings for Experience */}
                <div className="cursor-pulse-ring cursor-pulse-ring--1" />
                <div className="cursor-pulse-ring cursor-pulse-ring--2" />
            </div>
        </>
    );
}
