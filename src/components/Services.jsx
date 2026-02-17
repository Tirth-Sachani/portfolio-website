'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiCode, HiCube, HiColorSwatch, HiLightningBolt, HiCloud, HiDeviceMobile } from 'react-icons/hi';

const services = [
  {
    icon: <HiCode />,
    title: 'Web Development',
    desc: 'Building responsive, performant web applications using React, Next.js, and modern JavaScript frameworks with clean, maintainable code.',
    tags: ['React', 'Next.js', 'JavaScript'],
  },
  {
    icon: <HiDeviceMobile />,
    title: 'Mobile App Development',
    desc: 'Creating cross-platform mobile applications with React Native that deliver native-like performance and seamless user experiences.',
    tags: ['React Native', 'iOS', 'Android'],
  },
  {
    icon: <HiColorSwatch />,
    title: 'UI/UX Design',
    desc: 'Designing intuitive, accessible, and visually compelling interfaces that enhance user engagement and drive business results.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    icon: <HiCube />,
    title: '3D & WebGL',
    desc: 'Creating immersive 3D experiences and interactive visualizations using Three.js and WebGL for next-level web engagement.',
    tags: ['Three.js', 'WebGL', 'GLSL'],
  },
  {
    icon: <HiCloud />,
    title: 'Cloud & Backend',
    desc: 'Architecting scalable cloud solutions with Firebase, AWS, and Node.js. Designing robust APIs and microservices.',
    tags: ['Firebase', 'Node.js', 'APIs'],
  },
  {
    icon: <HiLightningBolt />,
    title: 'Performance Optimization',
    desc: 'Optimizing web applications for speed, SEO, and Core Web Vitals to ensure top-tier user experience and search rankings.',
    tags: ['SEO', 'Core Web Vitals', 'Lighthouse'],
  },
];

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section" id="services" ref={ref}>
      <div className="bg-radial" style={{ top: '10%', right: '-300px', background: 'var(--neon-purple)', width: 500, height: 500 }} />
      <div className="container">
        <div className="section-header">
          <span className="section-label">Services</span>
          <h2 className="section-title">What I Offer</h2>
          <p className="section-subtitle">
            End-to-end digital solutions from concept to deployment, built with precision and passion.
          </p>
        </div>

        <div className="services-grid">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              className="service-card glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="service-card__icon-wrap">
                <div className="service-card__icon">{svc.icon}</div>
                <div className="service-card__icon-glow" />
              </div>
              <h3 className="service-card__title">{svc.title}</h3>
              <p className="service-card__desc">{svc.desc}</p>
              <div className="service-card__tags">
                {svc.tags.map(tag => (
                  <span key={tag} className="service-card__tag">{tag}</span>
                ))}
              </div>
              <div className="service-card__border" />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .service-card {
          position: relative;
          padding: 36px 28px;
          overflow: hidden;
        }
        .service-card__icon-wrap {
          position: relative;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .service-card__icon {
          font-size: 1.6rem;
          color: var(--neon-blue);
          position: relative;
          z-index: 1;
        }
        .service-card__icon-glow {
          position: absolute;
          inset: -8px;
          background: rgba(0, 229, 255, 0.1);
          border-radius: 16px;
          border: 1px solid rgba(0, 229, 255, 0.1);
          transition: var(--transition-smooth);
        }
        .service-card:hover .service-card__icon-glow {
          background: rgba(0, 229, 255, 0.15);
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.15);
          border-color: rgba(0, 229, 255, 0.2);
        }
        .service-card__title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .service-card__desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .service-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .service-card__tag {
          padding: 4px 12px;
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--neon-blue);
          background: rgba(0, 229, 255, 0.06);
          border: 1px solid rgba(0, 229, 255, 0.1);
          border-radius: 50px;
        }
        .service-card__border {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--gradient-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .service-card:hover .service-card__border {
          transform: scaleX(1);
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .service-card {
            padding: 28px 20px;
          }
        }
      `}</style>
    </section>
  );
}
