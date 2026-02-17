'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechVentures',
    avatar: '👩‍💼',
    quote: 'Exceptional work! The attention to detail and technical expertise exceeded our expectations. The 3D animations and overall performance were outstanding.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Product Lead, InnovateCo',
    avatar: '👨‍💻',
    quote: 'A true professional who understands both design and development. Delivered a pixel-perfect implementation ahead of schedule with excellent code quality.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder, DesignHub',
    avatar: '👩‍🎨',
    quote: 'The portfolio website was exactly what we envisioned. The smooth animations and responsive design made it a joy to use across all devices.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'CTO, ScaleUp Inc',
    avatar: '👨‍🔬',
    quote: 'Outstanding technical skills and great communication throughout the project. The Firebase integration and real-time features were flawlessly implemented.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Creative Director, ArtStudio',
    avatar: '👩‍🏫',
    quote: 'Transformed our vision into a stunning digital experience. The WebGL effects and micro-animations added the premium feel we were looking for.',
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, next]);

  return (
    <section className="section" id="testimonials" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-subtitle">
            Hear from the people I've had the pleasure of working with.
          </p>
        </div>

        <motion.div
          className="testimonials-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="testimonials-slider">
            <div
              className="testimonials-track"
              style={{
                transform: `translateX(-${current * 100}%)`,
                transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-slide">
                  <div className="testimonial-card glass-card"
                    onMouseEnter={() => setAutoPlay(false)}
                    onMouseLeave={() => setAutoPlay(true)}
                  >
                    <div className="testimonial-card__stars">
                      {Array.from({ length: t.rating }, (_, j) => (
                        <HiStar key={j} className="testimonial-card__star" />
                      ))}
                    </div>
                    <blockquote className="testimonial-card__quote">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="testimonial-card__author">
                      <div className="testimonial-card__avatar">{t.avatar}</div>
                      <div>
                        <div className="testimonial-card__name">{t.name}</div>
                        <div className="testimonial-card__role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonials-controls">
            <button
              className="testimonials-arrow"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <HiChevronLeft />
            </button>

            <div className="testimonials-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials-dot ${current === i ? 'testimonials-dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="testimonials-arrow"
              onClick={next}
              aria-label="Next testimonial"
            >
              <HiChevronRight />
            </button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .testimonials-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }
        .testimonials-slider {
          overflow: hidden;
          border-radius: var(--radius-lg);
        }
        .testimonials-track {
          display: flex;
        }
        .testimonial-slide {
          min-width: 100%;
          padding: 0 4px;
        }
        .testimonial-card {
          padding: 48px 40px;
          text-align: center;
        }
        .testimonial-card__stars {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 24px;
        }
        .testimonial-card__star {
          font-size: 1.2rem;
          color: #FFD700;
          filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.4));
        }
        .testimonial-card__quote {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: 32px;
          border: none;
        }
        .testimonial-card__author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .testimonial-card__avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(0, 229, 255, 0.1);
          border: 2px solid rgba(0, 229, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
        .testimonial-card__name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 2px;
        }
        .testimonial-card__role {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .testimonials-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 32px;
        }
        .testimonials-arrow {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          font-size: 1.3rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .testimonials-arrow:hover {
          color: var(--neon-blue);
          border-color: rgba(0, 229, 255, 0.3);
          background: rgba(0, 229, 255, 0.06);
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.1);
        }
        .testimonials-dots {
          display: flex;
          gap: 10px;
        }
        .testimonials-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.12);
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 0;
        }
        .testimonials-dot--active {
          background: var(--neon-blue);
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
          transform: scale(1.2);
        }

        @media (max-width: 640px) {
          .testimonial-card {
            padding: 32px 20px;
          }
          .testimonial-card__quote {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}
