'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker, FaFigma, FaPython
} from 'react-icons/fa';
import {
  SiNextdotjs, SiFirebase, SiThreedotjs, SiTypescript, SiMongodb,
  SiTailwindcss, SiRedux, SiGraphql, SiWebgl
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const techItems = [
  { icon: <FaReact />, name: 'React.js', color: '#61DAFB', category: 'Frontend' },
  { icon: <SiNextdotjs />, name: 'Next.js', color: '#ffffff', category: 'Frontend' },
  { icon: <SiFirebase />, name: 'Firebase', color: '#FFCA28', category: 'Backend' },
  { icon: <FaHtml5 />, name: 'HTML5', color: '#E34F26', category: 'Frontend' },
  { icon: <FaCss3Alt />, name: 'CSS3', color: '#1572B6', category: 'Frontend' },
  { icon: <FaJs />, name: 'JavaScript', color: '#F7DF1E', category: 'Frontend' },
  { icon: <SiThreedotjs />, name: 'Three.js', color: '#ffffff', category: 'Creative' },
  { icon: <SiWebgl />, name: 'WebGL', color: '#990000', category: 'Creative' },
  { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6', category: 'Frontend' },
  { icon: <FaNodeJs />, name: 'Node.js', color: '#339933', category: 'Backend' },
  { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248', category: 'Backend' },
  { icon: <SiTailwindcss />, name: 'Tailwind', color: '#06B6D4', category: 'Frontend' },
  { icon: <SiRedux />, name: 'Redux', color: '#764ABC', category: 'Frontend' },
  { icon: <SiGraphql />, name: 'GraphQL', color: '#E10098', category: 'Backend' },
  { icon: <FaGitAlt />, name: 'Git', color: '#F05032', category: 'Tools' },
  { icon: <FaDocker />, name: 'Docker', color: '#2496ED', category: 'Tools' },
  { icon: <FaPython />, name: 'Python', color: '#3776AB', category: 'Backend' },
  { icon: <FaFigma />, name: 'Figma', color: '#F24E1E', category: 'Creative' },
];

function TechCard({ item, index }) {
  /* Each card gets a staggered animation-delay for the bounce */
  const delay = (index % techItems.length) * 0.15;

  return (
    <div
      className="ticker-card"
      style={{ '--accent': item.color, '--bounce-delay': `${delay}s` }}
    >
      <div className="ticker-card__glow" />
      <div className="ticker-card__icon" style={{ color: item.color }}>
        {item.icon}
      </div>
      <span className="ticker-card__name">{item.name}</span>
      <span className="ticker-card__cat">{item.category}</span>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tech-ticker__header', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#tech-stack',
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate items for seamless loop
  const duplicated = [...techItems, ...techItems];

  return (
    <section className="section tech-ticker-section" id="tech-stack" ref={sectionRef} data-section="tech-stack">
      {/* Atmospheric Glows */}
      <div className="tech-ticker__glow-orb tech-ticker__glow-orb--cyan" />
      <div className="tech-ticker__glow-orb tech-ticker__glow-orb--violet" />

      {/* Centered Header */}
      <div className="tech-ticker__header">
        <span className="section-label">Mastery</span>
        <h2 className="tech-ticker__title">Tech Nexus</h2>
      </div>

      {/* Infinite Ticker Row */}
      <div className="tech-ticker__viewport">
        <div className="tech-ticker__track">
          {duplicated.map((item, i) => (
            <TechCard key={`${item.name}-${i}`} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Edge Gradient Fades */}
      <div className="tech-ticker__fade tech-ticker__fade--left" />
      <div className="tech-ticker__fade tech-ticker__fade--right" />

      <style jsx global>{`
        .tech-ticker-section {
          position: relative;
          background: #0B1026;
          overflow: hidden;
          padding: 100px 0 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* ── Atmospheric Glows ── */
        .tech-ticker__glow-orb {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.08;
          pointer-events: none;
          z-index: 1;
        }
        .tech-ticker__glow-orb--cyan { background: #00e5ff; top: 10%; right: -150px; }
        .tech-ticker__glow-orb--violet { background: #a855f7; bottom: 10%; left: -150px; }

        /* ── Centered Header ── */
        .tech-ticker__header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
          z-index: 10;
          width: 100%;
        }
        .tech-ticker__title {
          font-size: 3.5rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -2px;
          margin: 10px 0 0;
          background: linear-gradient(to right, #fff, rgba(255,255,255,0.4));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ── Viewport & Track ── */
        .tech-ticker__viewport {
          position: relative;
          z-index: 10;
          overflow: hidden;
          width: 100%;
          padding: 40px 0;
        }
        .tech-ticker__track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: ticker-scroll 40s linear infinite;
        }

        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Edge Fades ── */
        .tech-ticker__fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 20;
          pointer-events: none;
        }
        .tech-ticker__fade--left {
          left: 0;
          background: linear-gradient(to right, #0B1026, transparent);
        }
        .tech-ticker__fade--right {
          right: 0;
          background: linear-gradient(to left, #0B1026, transparent);
        }

        /* ── Cards with Bounce ── */
        .ticker-card {
          flex-shrink: 0;
          width: 130px;
          padding: 22px 14px 18px;
          text-align: center;
          border-radius: 20px;
          background: rgba(15, 12, 41, 0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          cursor: pointer;
          overflow: hidden;
          /* Bounce animation — staggered per card */
          animation: card-bounce 2.2s ease-in-out infinite;
          animation-delay: var(--bounce-delay, 0s);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        @keyframes card-bounce {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-18px); }
          60% { transform: translateY(-14px); }
          80% { transform: translateY(2px); }
        }

        /* Hover */
        .ticker-card:hover {
          border-color: var(--accent, rgba(0, 229, 255, 0.35));
          box-shadow: 0 0 30px rgba(0, 229, 255, 0.12), 0 8px 32px rgba(0, 0, 0, 0.4);
          animation-play-state: paused;
        }

        /* Card glow on hover */
        .ticker-card__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, var(--accent) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          filter: blur(25px);
          pointer-events: none;
          z-index: 0;
        }
        .ticker-card:hover .ticker-card__glow { opacity: 0.12; }

        /* Icon */
        .ticker-card__icon {
          font-size: 2rem;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.08));
          transition: filter 0.4s ease, transform 0.4s ease;
        }
        .ticker-card:hover .ticker-card__icon {
          filter: drop-shadow(0 0 14px currentColor);
          transform: scale(1.1);
        }

        /* Text */
        .ticker-card__name {
          display: block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          z-index: 1;
          margin-bottom: 3px;
        }
        .ticker-card__cat {
          display: block;
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          z-index: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .tech-ticker__title { font-size: 2.8rem; }
          .tech-ticker-section { padding: 80px 0 90px; }
          .tech-ticker__track { gap: 14px; animation-duration: 55s; }
          .ticker-card {
            width: 110px;
            padding: 18px 10px 14px;
            border-radius: 16px;
            animation-duration: 3.5s;
          }
          @keyframes card-bounce {
            0%, 100% { transform: translateY(0); }
            40% { transform: translateY(-12px); }
            60% { transform: translateY(-9px); }
            80% { transform: translateY(1px); }
          }
          .ticker-card__icon { font-size: 1.6rem; }
          .ticker-card__name { font-size: 0.7rem; }
          .tech-ticker__fade { width: 60px; }
        }
        @media (max-width: 600px) {
          .tech-ticker__title { font-size: 2.2rem; }
          .tech-ticker-section { padding: 60px 0 70px; }
          .tech-ticker__track { gap: 10px; animation-duration: 70s; }
          .ticker-card {
            width: 95px;
            padding: 14px 8px 12px;
            border-radius: 14px;
            animation-duration: 4.5s;
          }
          @keyframes card-bounce {
            0%, 100% { transform: translateY(0); }
            40% { transform: translateY(-8px); }
            60% { transform: translateY(-6px); }
            80% { transform: translateY(1px); }
          }
          .ticker-card__icon { font-size: 1.4rem; margin-bottom: 6px; }
          .ticker-card__name { font-size: 0.65rem; }
          .ticker-card__cat { font-size: 0.55rem; }
          .tech-ticker__fade { width: 40px; }
        }
      `}</style>
    </section>
  );
}
