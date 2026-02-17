'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiCode, HiCube, HiColorSwatch, HiLightningBolt, HiCloud, HiDeviceMobile } from 'react-icons/hi';

gsap.registerPlugin(ScrollTrigger);

const aboutItems = [
    {
        icon: <HiCode />,
        title: 'Web Development',
        desc: 'Building responsive, performant web applications using React, Next.js, and modern JavaScript frameworks.',
        tags: ['React', 'Next.js', 'JavaScript'],
        depth: 0,
    },
    {
        icon: <HiDeviceMobile />,
        title: 'Mobile Development',
        desc: 'Cross-platform mobile applications with React Native delivering native-like performance.',
        tags: ['React Native', 'iOS', 'Android'],
        depth: 1,
    },
    {
        icon: <HiColorSwatch />,
        title: 'UI/UX Design',
        desc: 'Intuitive, accessible, and visually compelling interfaces that drive engagement.',
        tags: ['Figma', 'Prototyping', 'Design Systems'],
        depth: 2,
    },
    {
        icon: <HiCube />,
        title: '3D & WebGL',
        desc: 'Immersive 3D experiences and interactive visualizations using Three.js and WebGL.',
        tags: ['Three.js', 'WebGL', 'GLSL'],
        depth: 0,
    },
    {
        icon: <HiCloud />,
        title: 'Cloud & Backend',
        desc: 'Scalable cloud solutions with Firebase, AWS, and Node.js with robust APIs.',
        tags: ['Firebase', 'Node.js', 'APIs'],
        depth: 1,
    },
    {
        icon: <HiLightningBolt />,
        title: 'Performance',
        desc: 'Optimizing for speed, SEO, and Core Web Vitals for top-tier experience.',
        tags: ['SEO', 'Core Web Vitals', 'Lighthouse'],
        depth: 2,
    },
];

export default function About() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context((self) => {
            const section = sectionRef.current;
            if (!section) return;
            const q = gsap.utils.selector(section);

            // Header and Desc timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    end: 'top 20%',
                    scrub: 1,
                }
            });

            const header = q('.about__header');
            const desc = q('.about__desc');

            if (header) {
                tl.fromTo(header,
                    { y: 40, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
                );
            }

            if (desc) {
                tl.fromTo(desc,
                    { y: 20, opacity: 0, scale: 0.98 },
                    { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
                    "-=0.8"
                );
            }

            // Cards with a more dramatic entrance and settle
            const cards = q('.about__card');
            cards.forEach((card, i) => {
                const depth = aboutItems[i]?.depth || 0;

                // Entrance animation
                gsap.fromTo(card,
                    {
                        y: 80 + (i * 20),
                        opacity: 0,
                        rotateX: -15,
                        scale: 0.9,
                        filter: 'blur(8px)',
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 95%',
                            end: 'top 80%',
                            scrub: 1,
                        },
                    }
                );

                // Subtle parallax after settling
                gsap.to(card, {
                    y: -(10 + depth * 10),
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                });
            });

            // Blob animations
            const blobs = q('.about__blob');
            blobs.forEach((blob, i) => {
                gsap.fromTo(blob,
                    { opacity: 0, scale: 0.5 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: (i % 2 === 0 ? -60 : 60),
                        x: (i % 2 === 0 ? 30 : -30),
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 2,
                        }
                    }
                );
            });

            ScrollTrigger.refresh();

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="section about-section" id="about" ref={sectionRef}>
            <div className="about__bg-gradients">
                <div className="about__gradient-1" />
                <div className="about__gradient-2" />
                <div className="about__noise" />
            </div>

            <div className="about__streaks">
                <div className="about__streak about__streak--1" />
                <div className="about__streak about__streak--2" />
            </div>

            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                <div className="about__top">
                    <div className="about__header">
                        <span className="section-label" style={{ display: 'block', marginBottom: '12px' }}>About Me</span>
                        <h2 className="section-title">What I Do Best</h2>
                    </div>
                    <p className="about__desc">
                        End-to-end digital solutions from concept to deployment, built with precision and passion. I specialize in crafting experiences that are both visually stunning and technically robust.
                    </p>
                </div>

                <div className="about__grid">
                    {aboutItems.map((item, i) => (
                        <div
                            key={item.title}
                            className="about__card glass-card"
                            style={{ perspective: '1200px' }}
                        >
                            <div className="about__card-icon-wrap">
                                <div className="about__card-icon">{item.icon}</div>
                                <div className="about__card-icon-glow" />
                            </div>
                            <h3 className="about__card-title">{item.title}</h3>
                            <p className="about__card-desc">{item.desc}</p>
                            <div className="about__card-tags">
                                {item.tags.map(tag => (
                                    <span key={tag} className="about__card-tag">{tag}</span>
                                ))}
                            </div>
                            <div className="about__card-border" />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .about__top {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
          margin-bottom: 80px;
          max-width: 800px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
        .about__header {
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          will-change: transform, opacity;
        }
        :global(.reduce-motion) .about__header {
            opacity: 1;
        }
        .about__header .section-title {
          text-align: center;
          margin-bottom: 0;
          text-align: center;
          margin-bottom: 60px;
          width: 100%;
        }
        /* ... rest of existing card and component styles ... */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          width: 100%;
        }
        .about__card {
          padding: 40px 30px;
          background: rgba(10, 8, 32, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          text-align: left;
          transition: 0.4s;
        }
        .about__card:hover {
          background: rgba(10, 8, 32, 0.6);
          border-color: rgba(0, 229, 255, 0.2);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          transform: translateY(-8px);
        }
        .about__card-icon {
          font-size: 2.2rem;
          color: #00e5ff;
          margin-bottom: 25px;
        }
        .about__card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #fff;
        }
        .about__card-desc {
          font-size: 0.95rem;
          border-radius: 50px;
          transition: all 0.3s ease;
        }
        .about__card-tag:hover {
            background: rgba(0, 229, 255, 0.15);
            border-color: var(--neon-blue);
        }
        .about__card-border {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient-accent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .about__card:hover .about__card-border {
          transform: scaleX(1);
        }

        /* Decorative blobs */
        .about__blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            z-index: 0;
            pointer-events: none;
        }
        .about__blob--1 {
            width: 300px;
            height: 300px;
            background: rgba(0, 229, 255, 0.1);
            top: 20%;
            left: -100px;
        }
        .about__blob--2 {
            width: 400px;
            height: 400px;
            background: rgba(188, 71, 254, 0.1);
            bottom: 10%;
            right: -150px;
        }
        .about__blob--3 {
            width: 200px;
            height: 200px;
            background: rgba(0, 229, 255, 0.05);
            top: 50%;
            left: 40%;
        }

        @media (max-width: 1024px) {
          .about__top {
            max-width: 90%;
            margin-bottom: 60px;
          }
          .about__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .about__card {
              padding: 32px 24px;
          }
        }
        @media (max-width: 768px) {
          .about__grid {
            grid-template-columns: 1fr;
            max-width: 450px;
          }
          .about__desc {
              font-size: 1rem;
          }
          .about__top {
              margin-bottom: 48px;
          }
        }
      `}</style>
        </section>
    );
}
