'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, strength = 0.5, range = 100 }) {
    const triggerRef = useRef(null);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        const xTo = gsap.quickTo(trigger, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
        const yTo = gsap.quickTo(trigger, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = trigger.getBoundingClientRect();
            const center = { x: left + width / 2, y: top + height / 2 };

            const distance = { x: clientX - center.x, y: clientY - center.y };
            const totalDistance = Math.hypot(distance.x, distance.y);

            if (totalDistance < range) {
                xTo(distance.x * strength);
                yTo(distance.y * strength);
            } else {
                xTo(0);
                yTo(0);
            }
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        trigger.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            trigger.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength, range]);

    return (
        <div ref={triggerRef} style={{ display: 'inline-block' }}>
            {children}
        </div>
    );
}
