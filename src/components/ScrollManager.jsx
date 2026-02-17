'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollManager({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.5,
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Detect low-end device
        const isLowEnd =
            navigator.hardwareConcurrency <= 4 ||
            /Android|iPhone|iPad/.test(navigator.userAgent);

        if (isLowEnd) {
            document.documentElement.classList.add('reduce-motion');
        }

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach((st) => st.kill());
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return <div id="smooth-wrapper">{children}</div>;
}
