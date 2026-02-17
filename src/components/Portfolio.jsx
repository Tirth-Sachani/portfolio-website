'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiExternalLink, HiCode } from 'react-icons/hi';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web App',
    desc: 'A full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
    tags: ['Next.js', 'Firebase', 'Stripe'],
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #0a1628, #0d2847)',
  },
  {
    title: 'AI Dashboard',
    category: 'Data Viz',
    desc: 'Interactive analytics dashboard with AI-driven insights, real-time charts, and predictive modeling.',
    tags: ['React', 'Python', 'TensorFlow'],
    color: '#7b2ff7',
    gradient: 'linear-gradient(135deg, #1a0a2e, #2d1050)',
  },
  {
    title: '3D Product Configurator',
    category: '3D/WebGL',
    desc: 'Web-based 3D product configurator with real-time rendering, material customization, and AR preview.',
    tags: ['Three.js', 'WebGL', 'React'],
    color: '#ff2daa',
    gradient: 'linear-gradient(135deg, #2e0a1e, #501030)',
  },
  {
    title: 'Social Media App',
    category: 'Mobile',
    desc: 'Cross-platform social app with real-time messaging, story features, and content recommendation engine.',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    color: '#00ff88',
    gradient: 'linear-gradient(135deg, #0a2e1a, #104030)',
  },
  {
    title: 'Portfolio CMS',
    category: 'Web App',
    desc: 'Headless CMS for creative professionals with drag-and-drop builder and SEO optimization tools.',
    tags: ['Next.js', 'GraphQL', 'PostgreSQL'],
    color: '#ffaa00',
    gradient: 'linear-gradient(135deg, #2e1a0a, #503010)',
  },
  {
    title: 'Task Management Suite',
    category: 'SaaS',
    desc: 'Enterprise task management with team collaboration, time tracking, and performance analytics.',
    tags: ['React', 'Firebase', 'Redux'],
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #0a1628, #0d2847)',
  },
];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const bgTextRef = useRef(null);
  const atmospheresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const pinTarget = pinRef.current;
      const track = trackRef.current;
      const bgText = bgTextRef.current;
      if (!section || !pinTarget || !track) return;

      const cards = track.querySelectorAll('.project-card');
      const atmos = atmospheresRef.current.querySelectorAll('.portfolio__atmos');

      // Setup initial states
      gsap.set(cards, { opacity: 0, x: 100, y: 50, rotateY: 25, scale: 0.8 });
      gsap.set(atmos, { opacity: 0 });
      if (atmos[0]) gsap.set(atmos[0], { opacity: 0.6 });

      // Main scroll-locked pinning timeline
      const totalScroll = cards.length * 1000;
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalScroll}`,
          pin: pinTarget, // Pin the inner wrapper
          scrub: 1.2,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // Synchronized animations for cards, background text, and atmosphere
      cards.forEach((card, i) => {
        // Entrance & Staging
        mainTl.to(card, {
          opacity: 1,
          x: 0,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        }, i * 1.5);

        // Atmosphere color shift
        if (i > 0 && atmos[i] && atmos[i - 1]) {
          mainTl.to(atmos[i - 1], { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, i * 1.5);
          mainTl.to(atmos[i], { opacity: 0.6, duration: 0.8, ease: 'power2.inOut' }, i * 1.5);
        }

        // Horizontal Track Movement
        if (i < cards.length - 1) {
          mainTl.to(track, {
            x: `-${(i + 1) * (100 / cards.length)}%`,
            duration: 1.5,
            ease: 'expo.inOut',
          }, i * 1.5 + 0.8);
        }
      });

      // Atmospheric Pulse
      atmos.forEach(a => {
        gsap.to(a, {
          scale: 1.2,
          opacity: '+=0.1',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      // Parallax for background "GALLERY" text
      gsap.to(bgText, {
        x: '-20%',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onCardMove = (e, card) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;

    const glass = e.currentTarget.querySelector('.project-card__glass');
    const preview = e.currentTarget.querySelector('.project-card__preview');
    const content = e.currentTarget.querySelector('.project-card__body');

    gsap.to(glass, { rotateX, rotateY, duration: 0.5, ease: 'power2.out' });
    gsap.to(preview, { x: rotateY * 1.5, y: -rotateX * 1.5, duration: 0.5, ease: 'power2.out' });
    gsap.to(content, { z: 40, duration: 0.5, ease: 'power2.out' });
  };

  const onCardLeave = (e) => {
    const glass = e.currentTarget.querySelector('.project-card__glass');
    const preview = e.currentTarget.querySelector('.project-card__preview');
    const content = e.currentTarget.querySelector('.project-card__body');

    gsap.to([glass, preview, content], {
      rotateX: 0, rotateY: 0, x: 0, y: 0, z: 0,
      duration: 0.8, ease: 'elastic.out(1, 0.5)'
    });
  };

  return (
    <section className="section portfolio-section" id="portfolio" ref={sectionRef}>
      <div className="portfolio-pin-wrapper" ref={pinRef} style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-grid" />

        {/* Dynamic Atmospheric Glows */}
        <div className="portfolio__atmos-wrap" ref={atmospheresRef}>
          {projects.map((p, i) => (
            <div
              key={i}
              className="portfolio__atmos"
              style={{ background: `radial-gradient(circle at 50% 50%, ${p.color}40, transparent 70%)` }}
            />
          ))}
        </div>

        {/* Large Background Text */}
        <div className="portfolio__bg-text" ref={bgTextRef}>
          PROJECTS GALLERIA
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="portfolio__header-wrap">
            <div className="portfolio__header">
              <span className="section-label">Selected Works</span>
              <h2 className="section-title">Digital Experiences</h2>
              <div className="portfolio__header-line" />
            </div>
          </div>

          <div className="portfolio__viewport">
            <div className="portfolio__track" ref={trackRef} style={{ width: `${projects.length * 100}%` }}>
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="project-card"
                  style={{ width: `${100 / projects.length}%` }}
                  onMouseMove={(e) => onCardMove(e, project)}
                  onMouseLeave={onCardLeave}
                >
                  <div className="project-card__glass-wrap">
                    <div className="project-card__glass">
                      <div className="project-card__preview" style={{ background: project.gradient }}>
                        <div className="project-card__noise" />
                        <div className="project-card__glow" style={{ background: `${project.color}30` }} />
                        <div className="project-card__overlay">
                          <a href="#" className="project-card__btn"><HiExternalLink /> Visit Project</a>
                          <a href="#" className="project-card__btn project-card__btn--outline"><HiCode /> Docs</a>
                        </div>
                        <span className="project-card__category" style={{ background: `${project.color}30`, color: '#fff' }}>{project.category}</span>
                        <span className="project-card__number">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="project-card__body" style={{ transformStyle: 'preserve-3d' }}>
                        <h3 className="project-card__title" style={{ transform: 'translateZ(20px)' }}>{project.title}</h3>
                        <p className="project-card__desc" style={{ transform: 'translateZ(10px)' }}>{project.desc}</p>
                        <div className="project-card__tags" style={{ transform: 'translateZ(15px)' }}>
                          {project.tags.map(tag => (
                            <span key={tag} className="project-card__tag" style={{ borderColor: `${project.color}40` }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="project-card__edge" style={{ background: `linear-gradient(to right, ${project.color}40, transparent)` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .portfolio-section {
          min-height: 100vh;
          width: 100%;
          position: relative;
          background: #02010a;
          padding: 0;
          overflow: visible;
        }
        .portfolio__atmos-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .portfolio__atmos {
          position: absolute;
          inset: -100px;
          filter: blur(120px);
          opacity: 0;
        }
        .portfolio__bg-text {
          position: absolute;
          top: 55%;
          left: 10%;
          font-size: 15vw;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.02);
          white-space: nowrap;
          pointer-events: none;
          z-index: 2;
          line-height: 0.8;
          text-transform: uppercase;
        }
        .portfolio__header-wrap {
          margin-bottom: 20px;
        }
        .portfolio__header {
          text-align: center;
          position: relative;
        }
        .portfolio__header-line {
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--neon-blue), transparent);
          margin: 15px auto 0;
        }
        .portfolio__viewport {
          width: 100%;
          perspective: 2000px;
        }
        .portfolio__track {
          display: flex;
          will-change: transform;
        }
        .project-card {
          padding: 0 60px;
          flex-shrink: 0;
          perspective: 1500px;
        }
        .project-card__glass-wrap {
            transform-style: preserve-3d;
            padding: 2px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 40%, rgba(255, 255, 255, 0.05));
            border-radius: 32px;
        }
        .project-card__glass {
          background: rgba(15, 12, 41, 0.6);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-radius: 30px;
          overflow: hidden;
          position: relative;
          transform-style: preserve-3d;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
        }
        .project-card__preview {
          position: relative;
          height: 220px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }
        .project-card__noise {
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.08;
            pointer-events: none;
        }
        .project-card__glow {
            position: absolute;
            width: 200px;
            height: 200px;
            top: -50px;
            right: -50px;
            filter: blur(60px);
            border-radius: 50%;
            pointer-events: none;
        }
        .project-card__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          opacity: 0;
          transition: 0.4s ease;
          transform: translateZ(50px);
        }
        .project-card__glass:hover .project-card__overlay { opacity: 1; }
        .project-card__category {
          position: absolute;
          top: 25px;
          left: 25px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 8px 16px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          transform: translateZ(30px);
        }
        .project__card__number {
          position: absolute;
          bottom: 10px;
          right: 20px;
          font-size: 8rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          line-height: 1;
        }
        .project-card__body { 
            padding: 30px; 
            background: rgba(255, 255, 255, 0.02);
        }
        .project-card__title { font-size: 1.8rem; margin-bottom: 15px; font-weight: 800; }
        .project-card__desc { 
            font-size: 1rem; 
            color: var(--text-secondary); 
            line-height: 1.8; 
            margin-bottom: 30px; 
            max-width: 90%;
        }
        .project-card__btn {
          padding: 14px 28px;
          font-weight: 700;
          color: #000;
          background: #fff;
          border-radius: 50px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s;
        }
        .project-card__btn--outline {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .project-card__btn:hover { transform: scale(1.05) translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.4); }
        .project-card__tags { display: flex; flex-wrap: wrap; gap: 10px; }
        .project-card__tag {
          padding: 6px 16px;
          font-size: 0.8rem;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50px;
          border: 1px solid;
        }
        .project-card__edge {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 4px;
        }

        @media (max-width: 1024px) {
          .project-card { padding: 0 20px; }
          .project-card__title { font-size: 1.5rem; }
          .project__card__number { font-size: 6rem; }
        }
        @media (max-width: 768px) {
          .portfolio-section { background: #000; }
          .portfolio__bg-text { font-size: 20vw; top: 70%; }
          .project-card { padding: 0 10px; }
          .project-card__preview { height: 240px; }
          .project-card__body { padding: 30px; }
        }
      `}</style>
    </section>
  );
}
