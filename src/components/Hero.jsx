'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { HiArrowRight, HiChatAlt2 } from 'react-icons/hi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const statsRef = useRef(null);
  const particlesRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleSectionMouseMove = useCallback((e) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    // Normalize to -1 to 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create particles
      const particleContainer = particlesRef.current;
      if (particleContainer) {
        particleContainer.innerHTML = ''; // Clear existing
        for (let i = 0; i < 50; i++) {
          const p = document.createElement('div');
          p.className = 'hero__particle';
          p.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
            animation-delay: ${Math.random() * 5}s;
            animation-duration: ${3 + Math.random() * 4}s;
          `;
          particleContainer.appendChild(p);
        }
      }

      // Entry timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Badge scales in
      tl.fromTo(badgeRef.current,
        { opacity: 0, scale: 0.6, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8 }
      );

      // Title characters split & assemble
      const titleEl = titleRef.current;
      if (titleEl) {
        const words = titleEl.querySelectorAll('.hero__word');
        tl.fromTo(words,
          { opacity: 0, y: 60, rotateX: -90, transformOrigin: 'bottom' },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.12 },
          '-=0.4'
        );
      }

      // Subtitle fades in
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 },
        '-=0.5'
      );

      // Actions slide in
      tl.fromTo(actionsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
        '-=0.4'
      );

      // Stats count up
      tl.fromTo(statsRef.current?.querySelectorAll('.hero__stat') || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.3'
      );

      // Particles emerge
      tl.fromTo('.hero__particle',
        { opacity: 0, scale: 0 },
        { opacity: 0.6, scale: 1, duration: 1.5, stagger: { each: 0.03, from: 'random' } },
        '-=1'
      );

      // On scroll-away: fade to depth
      gsap.to(sectionRef.current?.querySelector('.hero__left'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 0,
        scale: 0.85,
        filter: 'blur(15px)',
        y: -80,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero section" id="home" ref={sectionRef} onMouseMove={handleSectionMouseMove}>
      <div className="hero__bg">
        <div className="bg-grid" />
        <div className="bg-radial" style={{ top: '-200px', left: '-100px', background: 'var(--neon-blue)' }} />
        <div className="bg-radial" style={{ top: '-100px', right: '-200px', background: 'var(--neon-purple)' }} />
        <div className="hero__particles" ref={particlesRef} />
      </div>

      <div className="hero__container">
        {/* ── LEFT COLUMN: Text Content ── */}
        <div className="hero__left">
          <div className="hero__badge" ref={badgeRef}>
            <span className="hero__badge-dot" />
            Available for projects
          </div>

          <h1 className="hero__title" ref={titleRef}>
            <span className="hero__word">Crafting </span>
            <span className="hero__word hero__title-accent">Digital</span>
            <br />
            <span className="hero__word">Experiences That</span>
            <br />
            <span className="hero__word hero__title-gradient">Stand Out</span>
          </h1>

          <p className="hero__subtitle" ref={subtitleRef}>
            Full-Stack Developer specializing in building scalable, performant, and visually stunning web applications using cutting-edge technologies.
          </p>

          <div className="hero__actions" ref={actionsRef}>
            <a
              href="#portfolio"
              className="btn-primary"
              onClick={e => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              View My Work <HiArrowRight />
            </a>
            <a
              href="#contact"
              className="btn-outline"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Let's Work Together <HiChatAlt2 />
            </a>
          </div>

          <div className="hero__stats" ref={statsRef}>
            <div className="hero__stat">
              <span className="hero__stat-number">50+</span>
              <span className="hero__stat-label">Projects<br />Completed</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">3+</span>
              <span className="hero__stat-label">Years of<br />Experience</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">30+</span>
              <span className="hero__stat-label">Happy<br />Clients</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: 3D Visual ── */}
        <div className="hero__right">
          <HeroScene mousePos={mousePos} />
        </div>

        {/* ── FAR RIGHT: Vertical Info ── */}
        <div className="hero__right-bar">
          <div className="hero__right-line" />
          <div className="hero__right-content">
            <span className="hero__right-text">BASED IN INDIA</span>
            <div className="hero__right-dot" />
            <span className="hero__right-text">FULL-STACK DEV</span>
          </div>
          <div className="hero__right-line" />
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-dot" />
        </div>
        <span className="hero__scroll-text">Scroll Down</span>
      </div>

      <style jsx>{`
        /* ─── Hero Section ─── */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hero__particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .hero__particle {
          position: absolute;
          border-radius: 50%;
          background: var(--neon-blue);
          opacity: 0;
          box-shadow: 0 0 6px var(--neon-blue);
          animation: particle-float 4s ease-in-out infinite alternate;
        }

        @keyframes particle-float {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-30px) translateX(15px); }
        }

        /* ─── Two-Column Container ─── */
        .hero__container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 5% 0 10%;
          display: grid;
          grid-template-columns: 1fr 1fr 60px;
          align-items: center;
          gap: 20px;
        }

        /* ─── Left Column ─── */
        .hero__left {
          max-width: 650px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(0, 212, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.12);
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--neon-blue);
          width: fit-content;
          opacity: 0;
        }

        .hero__badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00ff88;
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.6);
          animation: pulse-glow 2s infinite;
        }

        .hero__title {
          font-size: clamp(2.8rem, 5.5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          margin: 0;
          letter-spacing: -1.5px;
          text-shadow: 0 2px 30px rgba(5, 5, 16, 0.9);
          perspective: 600px;
        }

        .hero__word {
          display: inline-block;
          opacity: 0;
        }

        .hero__title-accent {
          color: #00e5ff;
          text-shadow: 0 0 40px rgba(0, 229, 255, 0.5), 0 0 80px rgba(0, 229, 255, 0.2);
        }

        .hero__title-gradient {
          background: linear-gradient(135deg, #00e5ff 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(0, 229, 255, 0.3));
        }

        .hero__subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
          max-width: 540px;
          opacity: 0;
        }

        .hero__actions {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        .hero__stats {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .hero__stat {
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
        }

        .hero__stat-number {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: var(--neon-blue);
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        }

        .hero__stat-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .hero__stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.08);
        }

        /* ─── Right Column: 3D Scene ─── */
        .hero__right {
          width: 100%;
          height: 650px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero__right-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          height: 100%;
          z-index: 3;
        }

        .hero__right-line {
          width: 1px;
          flex: 1;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent);
        }

        .hero__right-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          transform: rotate(90deg);
          white-space: nowrap;
        }

        .hero__right-text {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .hero__right-dot {
          width: 4px;
          height: 4px;
          background: var(--neon-blue);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--neon-blue);
        }

        /* ─── Scroll Indicator ─── */
        .hero__scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 2;
          animation: float 3s ease-in-out infinite;
        }

        .hero__scroll-mouse {
          width: 24px;
          height: 38px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }

        .hero__scroll-dot {
          width: 3px;
          height: 8px;
          background: var(--neon-blue);
          border-radius: 4px;
          box-shadow: 0 0 6px rgba(0, 212, 255, 0.6);
          animation: pulse-glow 2s infinite;
        }

        .hero__scroll-text {
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        /* ─── Tablet ─── */
        @media (max-width: 1024px) {
          .hero__container {
            padding: 0 max(30px, 6vw);
            gap: 20px;
          }
          .hero__right {
            height: 450px;
          }
          .hero__title {
            font-size: clamp(2rem, 4.5vw, 3.2rem);
          }
          .hero__stats {
            gap: 20px;
          }
          .hero__stat-number {
            font-size: 1.6rem;
          }
        }

        /* ─── Mobile ─── */
        @media (max-width: 768px) {
          .hero {
            padding: 100px 0 60px;
          }
          .hero__container {
            grid-template-columns: 1fr;
            padding: 0 24px;
            gap: 0;
          }
          .hero__left {
            order: 1;
          }
          .hero__right {
            order: 2;
            height: 300px;
            opacity: 0.35;
            position: absolute;
            inset: 0;
            z-index: -1;
          }
          .hero__stats {
            flex-wrap: wrap;
            gap: 16px;
          }
          .hero__stat-divider {
            display: none;
          }
          .hero__scroll-indicator {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
