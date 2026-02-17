'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        year: '2024 – Present',
        title: 'Senior Full-Stack Developer',
        company: 'TechVentures Inc.',
        desc: 'Leading frontend architecture and building scalable web applications with React, Next.js, and cloud services. Mentoring junior developers.',
        tags: ['React', 'Next.js', 'AWS', 'Team Lead'],
        color: '#00e5ff',
    },
    {
        year: '2023 – 2024',
        title: 'Frontend Developer',
        company: 'InnovateCo',
        desc: 'Built interactive dashboards, 3D product configurators, and performance-critical web applications using modern JavaScript frameworks.',
        tags: ['Three.js', 'TypeScript', 'GSAP'],
        color: '#a855f7',
    },
    {
        year: '2022 – 2023',
        title: 'Web Developer',
        company: 'DesignHub Agency',
        desc: 'Developed responsive websites and e-commerce platforms. Implemented CI/CD pipelines and improved page load performance by 40%.',
        tags: ['Firebase', 'Node.js', 'MongoDB'],
        color: '#ec4899',
    },
    {
        year: '2021 – 2022',
        title: 'Junior Developer',
        company: 'ScaleUp Studios',
        desc: 'Started professional journey building landing pages, integrating APIs, and learning modern development workflows.',
        tags: ['HTML/CSS', 'JavaScript', 'Git'],
        color: '#00ff88',
    },
];

export default function Experience() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;

            // Header
            gsap.fromTo(section.querySelector('.exp__header'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 50%',
                        scrub: 1,
                    },
                }
            );

            // Timeline line draws itself
            gsap.fromTo(section.querySelector('.exp__line-fill'),
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section.querySelector('.exp__timeline'),
                        start: 'top 60%',
                        end: 'bottom 40%',
                        scrub: 1,
                    },
                }
            );

            // Timeline items reveal step-by-step
            const items = section.querySelectorAll('.exp__item');
            items.forEach((item, i) => {
                const isLeft = i % 2 === 0;

                // Node dot scales in
                gsap.fromTo(item.querySelector('.exp__node'),
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1, opacity: 1,
                        duration: 0.6,
                        ease: 'back.out(2)',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 70%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                // Content card wipes in from clip-path
                gsap.fromTo(item.querySelector('.exp__card'),
                    {
                        clipPath: isLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
                        opacity: 0,
                        x: isLeft ? -40 : 40,
                    },
                    {
                        clipPath: 'inset(0 0% 0 0%)',
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 65%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                // Year label
                gsap.fromTo(item.querySelector('.exp__year'),
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.6,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 65%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="section" id="experience" ref={sectionRef}>
            <div className="bg-grid" />
            <div className="container">
                <div className="exp__header">
                    <span className="section-label">Experience</span>
                    <h2 className="section-title">My Journey</h2>
                    <p className="section-subtitle">
                        A timeline of growth, learning, and impactful projects.
                    </p>
                </div>

                <div className="exp__timeline">
                    <div className="exp__line">
                        <div className="exp__line-fill" />
                    </div>

                    {experiences.map((exp, i) => (
                        <div key={i} className={`exp__item ${i % 2 === 0 ? 'exp__item--left' : 'exp__item--right'}`}>
                            <div className="exp__node" style={{
                                background: exp.color,
                                boxShadow: `0 0 20px ${exp.color}60`,
                            }} />

                            <div className="exp__year-side">
                                <span className="exp__year">{exp.year}</span>
                            </div>

                            <div className="exp__card glass-card">
                                <div className="exp__card-accent" style={{ background: exp.color }} />
                                <h3 className="exp__card-title">{exp.title}</h3>
                                <span className="exp__card-company" style={{ color: exp.color }}>{exp.company}</span>
                                <p className="exp__card-desc">{exp.desc}</p>
                                <div className="exp__card-tags">
                                    {exp.tags.map(tag => (
                                        <span key={tag} className="exp__card-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .exp__header {
          text-align: center;
          margin-bottom: 64px;
          opacity: 0;
        }
        .exp__timeline {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 20px 0;
        }
        .exp__line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255, 255, 255, 0.06);
          transform: translateX(-50%);
        }
        .exp__line-fill {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, var(--neon-blue), var(--neon-purple), var(--neon-pink));
          transform-origin: top;
          transform: scaleY(0);
          border-radius: 2px;
        }
        .exp__item {
          position: relative;
          display: flex;
          align-items: flex-start;
          margin-bottom: 60px;
          padding: 0 20px;
        }
        .exp__item--left {
          flex-direction: row-reverse;
        }
        .exp__item--right {
          flex-direction: row;
        }
        .exp__node {
          position: absolute;
          left: 50%;
          top: 24px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          transform: translateX(-50%) scale(0);
          z-index: 2;
          border: 3px solid var(--bg-primary);
        }
        .exp__year-side {
          flex: 1;
          display: flex;
          padding: 24px 30px;
        }
        .exp__item--left .exp__year-side {
          justify-content: flex-start;
        }
        .exp__item--right .exp__year-side {
          justify-content: flex-end;
        }
        .exp__year {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 1px;
          opacity: 0;
        }
        .exp__card {
          flex: 1;
          padding: 28px;
          position: relative;
          overflow: hidden;
        }
        .exp__card-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          border-radius: 3px;
        }
        .exp__item--right .exp__card-accent {
          left: auto;
          right: 0;
        }
        .exp__card-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .exp__card-company {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }
        .exp__card-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .exp__card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .exp__card-tag {
          padding: 3px 10px;
          font-size: 0.68rem;
          font-weight: 500;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        @media (max-width: 768px) {
          .exp__line {
            left: 20px;
          }
          .exp__item {
            flex-direction: column !important;
            padding-left: 50px;
          }
          .exp__node {
            left: 20px;
          }
          .exp__year-side {
            padding: 0 0 8px;
            justify-content: flex-start !important;
          }
          .exp__card {
            width: 100%;
          }
          .exp__card-accent {
            left: 0 !important;
            right: auto !important;
          }
        }
      `}</style>
        </section>
    );
}
