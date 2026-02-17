'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 1,
    stagger = 0,
    triggerOnce = true
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const getInitialVars = () => {
            switch (direction) {
                case 'up': return { y: 40, opacity: 0 };
                case 'down': return { y: -40, opacity: 0 };
                case 'left': return { x: 40, opacity: 0 };
                case 'right': return { x: -40, opacity: 0 };
                case 'scale': return { scale: 0.9, opacity: 0 };
                default: return { y: 40, opacity: 0 };
            }
        };

        const anim = gsap.from(el.children, {
            ...getInitialVars(),
            duration,
            delay,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: triggerOnce ? 'play none none none' : 'play reverse play reverse',
            }
        });

        return () => {
            if (anim.scrollTrigger) anim.scrollTrigger.kill();
            anim.kill();
        };
    }, [direction, delay, duration, stagger, triggerOnce]);

    return (
        <div ref={containerRef} style={{ width: '100%' }}>
            {children}
        </div>
    );
}
