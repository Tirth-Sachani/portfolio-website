'use client';

import { FaGithub, FaLinkedinIn, FaTwitter, FaDribbble, FaWhatsapp, FaHeart } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker, HiArrowUp } from 'react-icons/hi';

const socialLinks = [
  { icon: <FaGithub />, href: '#', label: 'GitHub' },
  { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn' },
  { icon: <FaTwitter />, href: '#', label: 'Twitter' },
  { icon: <FaDribbble />, href: '#', label: 'Dribbble' },
  { icon: <FaWhatsapp />, href: '#', label: 'WhatsApp' },
];

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Full-Stack Development',
  'Frontend Architecture',
  'API & Backend Systems',
  'UI/UX Implementation',
  'Performance Optimization',
  'Cloud & DevOps',
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* ── Decorative Top Border ── */}
      <div className="footer__border" />

      <div className="container">
        {/* ── CTA Banner ── */}
        <div className="footer__cta">
          <div className="footer__cta-content">
            <h3 className="footer__cta-title">Have a project in mind?</h3>
            <p className="footer__cta-desc">Let's collaborate and build something amazing together.</p>
          </div>
          <a
            href="#contact"
            className="btn-primary footer__cta-btn"
            onClick={e => { e.preventDefault(); handleNav('#contact'); }}
          >
            Start a Project →
          </a>
        </div>

        {/* ── Main Grid ── */}
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">⬡</span>
              <span className="footer__logo-text">Portfolio</span>
            </div>
            <p className="footer__desc">
              Full-Stack Developer & Creative Technologist crafting
              scalable, performant, and visually stunning web applications
              with cutting-edge technologies.
            </p>
            <div className="footer__socials">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} className="footer__social" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__list">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="footer__link"
                    onClick={e => { e.preventDefault(); handleNav(l.href); }}
                  >
                    <span className="footer__link-arrow">→</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__list">
              {services.map(s => (
                <li key={s}>
                  <span className="footer__service">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Info</h4>
            <div className="footer__contact-list">
              <a href="mailto:tirthsachnai6105@gmail.com" className="footer__contact-item">
                <HiMail className="footer__contact-icon" />
                <div>
                  <span className="footer__contact-label">Email</span>
                  <span className="footer__contact-value">tirthsachnai6105@gmail.com</span>
                </div>
              </a>
              <a href="tel:+919825870578" className="footer__contact-item">
                <HiPhone className="footer__contact-icon" />
                <div>
                  <span className="footer__contact-label">Phone</span>
                  <span className="footer__contact-value">+91 98258 70578</span>
                </div>
              </a>
              <div className="footer__contact-item">
                <HiLocationMarker className="footer__contact-icon" />
                <div>
                  <span className="footer__contact-label">Location</span>
                  <span className="footer__contact-value">India (GMT +5:30)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer__bottom">
          <div className="footer__bottom-left" suppressHydrationWarning>
            <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          </div>
          <div className="footer__bottom-center">
            <p>Designed & Built with <FaHeart style={{ color: '#ec4899', verticalAlign: 'middle', fontSize: '0.75rem', margin: '0 3px' }} /> by <span className="footer__author">Tirth</span></p>
          </div>
          <div className="footer__bottom-right">
            <button className="footer__back-top" onClick={scrollToTop} aria-label="Back to top" suppressHydrationWarning>
              <HiArrowUp />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
          background: linear-gradient(180deg, var(--bg-primary) 0%, #020010 100%);
          overflow: hidden;
          padding: 0 0 30px;
        }

        /* ── Top Gradient Border ── */
        .footer__border {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.3) 30%, rgba(168, 85, 247, 0.3) 70%, transparent 100%);
          margin-bottom: 0;
        }

        /* ── CTA Banner ── */
        .footer__cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 48px 56px;
          margin: 60px 0 64px;
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.04) 0%, rgba(168, 85, 247, 0.04) 100%);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }
        .footer__cta::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.08), transparent 70%);
          pointer-events: none;
        }
        .footer__cta::after {
          content: '';
          position: absolute;
          bottom: -100px;
          left: -50px;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.06), transparent 70%);
          pointer-events: none;
        }
        .footer__cta-content {
          position: relative;
          z-index: 1;
        }
        .footer__cta-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 6px;
        }
        .footer__cta-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .footer__cta-btn {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          padding: 14px 36px;
          font-size: 0.95rem;
        }

        /* ── Grid ── */
        .footer__grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
          gap: 48px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          margin-bottom: 28px;
        }

        /* ── Brand ── */
        .footer__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.35rem;
          margin-bottom: 16px;
        }
        .footer__logo-icon {
          font-size: 1.6rem;
          color: var(--neon-blue);
          text-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
        }
        .footer__logo-text {
          color: var(--text-primary);
        }
        .footer__desc {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.75;
          margin-bottom: 24px;
          max-width: 320px;
        }
        .footer__socials {
          display: flex;
          gap: 10px;
        }
        .footer__social {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 8, 32, 0.4);
          color: var(--text-secondary);
          font-size: 1.05rem;
          transition: all 0.3s ease;
        }
        .footer__social:hover {
          color: var(--neon-blue);
          border-color: rgba(0, 229, 255, 0.3);
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.15);
          transform: translateY(-3px);
        }

        /* ── Columns ── */
        .footer__col-title {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-primary);
          margin: 0 0 24px;
          position: relative;
          padding-bottom: 12px;
        }
        .footer__col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 24px;
          height: 2px;
          background: var(--neon-blue);
          box-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
          border-radius: 2px;
        }
        .footer__list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer__link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.88rem;
          transition: all 0.3s ease;
        }
        .footer__link-arrow {
          font-size: 0.7rem;
          color: transparent;
          transition: all 0.3s ease;
          transform: translateX(-4px);
        }
        .footer__link:hover {
          color: var(--neon-blue);
          padding-left: 2px;
        }
        .footer__link:hover .footer__link-arrow {
          color: var(--neon-blue);
          transform: translateX(0);
        }
        .footer__service {
          font-size: 0.88rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer__service::before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(0, 229, 255, 0.4);
          flex-shrink: 0;
        }

        /* ── Contact Column ── */
        .footer__contact-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer__contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: inherit;
          transition: all 0.3s ease;
        }
        a.footer__contact-item:hover {
          transform: translateX(4px);
        }
        a.footer__contact-item:hover .footer__contact-value {
          color: var(--neon-blue);
        }
        .footer__contact-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(0, 229, 255, 0.06);
          border: 1px solid rgba(0, 229, 255, 0.08);
          color: var(--neon-blue);
          font-size: 1rem;
          flex-shrink: 0;
        }
        .footer__contact-label {
          display: block;
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1px;
        }
        .footer__contact-value {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: color 0.3s ease;
        }

        /* ── Bottom Bar ── */
        .footer__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-muted);
          font-size: 0.78rem;
        }
        .footer__bottom p {
          margin: 0;
        }
        .footer__author {
          color: var(--neon-blue);
          font-weight: 600;
        }
        .footer__back-top {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 50px;
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .footer__back-top:hover {
          color: var(--neon-blue);
          border-color: rgba(0, 229, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 229, 255, 0.1);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .footer__cta {
            padding: 36px 32px;
          }
        }
        @media (max-width: 768px) {
          .footer__cta {
            flex-direction: column;
            text-align: center;
            gap: 24px;
            padding: 32px 24px;
          }
          .footer__grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .footer__bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
