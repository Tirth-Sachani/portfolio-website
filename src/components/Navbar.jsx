'use client';

import { useState, useEffect, useRef } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { gsap } from 'gsap';
import Magnetic from './Magnetic';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Projects', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    // Entrance Animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      // Hide on scroll down, show on scroll up
      if (y > lastScroll && y > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScroll(y);

      // Determine active section
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScroll]);

  const handleClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}>
        <div className="navbar__inner">
          <Magnetic strength={0.2}>
            <a href="#home" className="navbar__logo" onClick={() => handleClick('#home')}>
              <span className="navbar__logo-icon">⬡</span>
              <span className="navbar__logo-text">Portfolio</span>
            </a>
          </Magnetic>

          <ul className="navbar__links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                  onClick={e => { e.preventDefault(); handleClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Magnetic strength={0.3}>
            <a
              href="#contact"
              className="btn-primary navbar__cta"
              onClick={e => { e.preventDefault(); handleClick('#contact'); }}
            >
              Let's Talk
            </a>
          </Magnetic>

          <button
            className="navbar__toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
          <ul className="navbar__mobile-links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__mobile-link ${activeSection === link.href.replace('#', '') ? 'navbar__mobile-link--active' : ''}`}
                  onClick={e => { e.preventDefault(); handleClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                onClick={e => { e.preventDefault(); handleClick('#contact'); }}
              >
                Let's Talk
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Section Dots Navigation */}
      <div className="section-dots" suppressHydrationWarning>
        {navLinks.map(link => (
          <button
            key={link.href}
            className={`section-dot ${activeSection === link.href.replace('#', '') ? 'section-dot--active' : ''}`}
            data-label={link.label}
            onClick={() => handleClick(link.href)}
            aria-label={`Go to ${link.label}`}
            suppressHydrationWarning
          />
        ))}
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .navbar--scrolled {
          background: rgba(5, 5, 16, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding: 10px 0;
        }
        .navbar--hidden {
          transform: translateY(-100%);
        }
        .navbar__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--text-primary);
          cursor: pointer;
        }
        .navbar__logo-icon {
          font-size: 1.6rem;
          color: var(--neon-blue);
          text-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
        }
        .navbar__links {
          display: flex;
          list-style: none;
          gap: 4px;
        }
        .navbar__link {
          padding: 8px 14px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: 8px;
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .navbar__link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
        }
        .navbar__link--active {
          color: var(--neon-blue);
          background: rgba(0, 229, 255, 0.08);
        }
        .navbar__cta {
          padding: 10px 24px;
          font-size: 0.85rem;
        }
        .navbar__toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 1.6rem;
          cursor: pointer;
          padding: 4px;
        }
        .navbar__mobile {
          display: none;
        }

        @media (max-width: 900px) {
          .navbar__links, .navbar__cta {
            display: none;
          }
          .navbar__toggle {
            display: block;
          }
          .navbar__mobile {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(5, 5, 16, 0.97);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            z-index: 999;
            opacity: 0;
            pointer-events: none;
            transition: var(--transition-smooth);
            padding-top: 80px;
          }
          .navbar__mobile--open {
            opacity: 1;
            pointer-events: all;
          }
          .navbar__mobile-links {
            list-style: none;
            padding: 0 24px;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .navbar__mobile-link {
            display: block;
            padding: 16px 20px;
            font-family: var(--font-heading);
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-secondary);
            border-radius: var(--radius-md);
            transition: var(--transition-fast);
          }
          .navbar__mobile-link:hover,
          .navbar__mobile-link--active {
            color: var(--neon-blue);
            background: rgba(0, 229, 255, 0.06);
          }
        }
      `}</style>
    </>
  );
}
