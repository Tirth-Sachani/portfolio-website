'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HiMail, HiLocationMarker, HiPhone, HiClock, HiLightningBolt, HiChat, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn, FaTwitter, FaDribbble, FaWhatsapp } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: <FaGithub />, href: '#', label: 'GitHub' },
  { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn' },
  { icon: <FaTwitter />, href: '#', label: 'Twitter' },
  { icon: <FaDribbble />, href: '#', label: 'Dribbble' },
  { icon: <FaWhatsapp />, href: '#', label: 'WhatsApp' },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery Call',
    desc: 'We discuss your project goals, timeline, and technical requirements.',
    color: '#00e5ff',
  },
  {
    number: '02',
    title: 'Proposal & Planning',
    desc: 'I deliver a detailed roadmap with milestones and transparent pricing.',
    color: '#a855f7',
  },
  {
    number: '03',
    title: 'Development',
    desc: 'Building your solution with regular progress updates and feedback loops.',
    color: '#00ff88',
  },
  {
    number: '04',
    title: 'Launch & Support',
    desc: 'Smooth deployment followed by ongoing maintenance and support.',
    color: '#ec4899',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    try {
      await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        budget: formData.budget,
        message: formData.message,
        createdAt: serverTimestamp(),
        read: false,
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', budget: '', message: '' });
      showToast('success', 'Message sent successfully! I\'ll get back to you soon.');
    } catch (err) {
      console.error('Error sending message:', err);
      setStatus('error');
      showToast('error', 'Failed to send message. Please try again or email me directly.');
    }
    setTimeout(() => setStatus('idle'), 3000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      // Header reveal
      gsap.fromTo(section.querySelector('.contact__header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Process steps
      const steps = section.querySelectorAll('.contact__step');
      gsap.fromTo(steps,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.contact__process'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Form elements
      const formElements = section.querySelectorAll('.contact__field, .contact__textarea');
      gsap.fromTo(formElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section.querySelector('.contact__form'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Send button
      gsap.fromTo(section.querySelector('.contact__submit'),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.contact__submit'),
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Info sidebar
      const infoItems = section.querySelectorAll('.contact__info-card');
      gsap.fromTo(infoItems,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.contact__info'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Socials
      const socials = section.querySelectorAll('.contact__social');
      gsap.fromTo(socials,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1, scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: section.querySelector('.contact__socials'),
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      return () => clearTimeout(refreshTimer);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section contact-section" id="contact" ref={sectionRef}>
      <div className="bg-grid" />
      <div className="bg-radial" style={{ bottom: '-200px', left: '30%', background: 'var(--neon-blue)', width: 600, height: 400, zIndex: 0 }} />
      <div className="bg-radial" style={{ top: '-150px', right: '-100px', background: 'var(--neon-purple)', width: 500, height: 350, zIndex: 0 }} />

      {/* Toast Notification */}
      {toast && (
        <div className={`contact__toast contact__toast--${toast.type}`}>
          {toast.type === 'success' ? <HiCheckCircle /> : <HiExclamationCircle />}
          <span>{toast.message}</span>
          <button className="contact__toast-close" onClick={() => setToast(null)}>×</button>
        </div>
      )}

      <div className="container">
        {/* ── Header ── */}
        <div className="contact__header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Build Something <span className="contact__title-accent">Extraordinary</span></h2>
          <p className="section-subtitle">
            Whether you need a stunning website, a complex web application, or a creative digital experience — I'm here to turn your vision into reality. Let's start a conversation.
          </p>
          <div className="contact__availability">
            <span className="contact__avail-dot" />
            <span>Currently available for freelance & full-time opportunities</span>
          </div>
        </div>

        {/* ── Process Steps ── */}
        <div className="contact__process">
          {processSteps.map((step, i) => (
            <div className="contact__step" key={i}>
              <span className="contact__step-number" style={{ color: step.color }}>{step.number}</span>
              <div>
                <h4 className="contact__step-title">{step.title}</h4>
                <p className="contact__step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Form + Info Grid ── */}
        <div className="contact__grid">
          {/* Left: Form */}
          <div className="contact__form-wrap">
            <h3 className="contact__form-heading">Send Me a Message</h3>
            <p className="contact__form-sub">Fill out the form below and I'll get back to you within 24 hours.</p>
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__row">
                <div className="contact__field-wrap">
                  <input type="text" name="name" className="contact__field" placeholder="Your Name" required value={formData.name} onChange={handleChange} suppressHydrationWarning />
                  <div className="contact__field-glow" />
                </div>
                <div className="contact__field-wrap">
                  <input type="email" name="email" className="contact__field" placeholder="Your Email" required value={formData.email} onChange={handleChange} suppressHydrationWarning />
                  <div className="contact__field-glow" />
                </div>
              </div>
              <div className="contact__row">
                <div className="contact__field-wrap">
                  <input type="text" name="subject" className="contact__field" placeholder="Subject" value={formData.subject} onChange={handleChange} suppressHydrationWarning />
                  <div className="contact__field-glow" />
                </div>
                <div className="contact__field-wrap">
                  <select name="budget" className="contact__field contact__select" value={formData.budget} onChange={handleChange} suppressHydrationWarning>
                    <option value="" disabled>Project Budget</option>
                    <option value="<5k">Less than $5,000</option>
                    <option value="5k-10k">$5,000 – $10,000</option>
                    <option value="10k-25k">$10,000 – $25,000</option>
                    <option value="25k+">$25,000+</option>
                  </select>
                  <div className="contact__field-glow" />
                </div>
              </div>
              <div className="contact__field-wrap">
                <textarea name="message" className="contact__textarea" placeholder="Tell me about your project — goals, timeline, any specific requirements..." rows={5} required value={formData.message} onChange={handleChange} suppressHydrationWarning />
                <div className="contact__field-glow" />
              </div>
              <button type="submit" className={`btn-primary contact__submit ${status === 'sending' ? 'contact__submit--sending' : ''}`} disabled={status === 'sending'} suppressHydrationWarning>
                {status === 'sending' ? (
                  <>
                    <span className="contact__spinner" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <HiCheckCircle style={{ fontSize: '1.1rem' }} />
                    Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="contact__submit-arrow">→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Info + Socials */}
          <div className="contact__info">
            <div className="contact__info-card glass-card">
              <div className="contact__info-icon"><HiMail /></div>
              <div>
                <span className="contact__info-label">Email</span>
                <a href="mailto:hello@example.com" className="contact__info-value">hello@example.com</a>
              </div>
            </div>
            <div className="contact__info-card glass-card">
              <div className="contact__info-icon"><HiPhone /></div>
              <div>
                <span className="contact__info-label">Phone</span>
                <span className="contact__info-value">+91 12345 67890</span>
              </div>
            </div>
            <div className="contact__info-card glass-card">
              <div className="contact__info-icon"><HiLocationMarker /></div>
              <div>
                <span className="contact__info-label">Location</span>
                <span className="contact__info-value">India (GMT +5:30)</span>
              </div>
            </div>
            <div className="contact__info-card glass-card">
              <div className="contact__info-icon" style={{ background: 'rgba(168, 85, 247, 0.08)', borderColor: 'rgba(168, 85, 247, 0.12)', color: '#a855f7' }}><HiClock /></div>
              <div>
                <span className="contact__info-label">Working Hours</span>
                <span className="contact__info-value">Mon – Sat, 10:00 AM – 7:00 PM</span>
              </div>
            </div>
            <div className="contact__info-card glass-card">
              <div className="contact__info-icon" style={{ background: 'rgba(0, 255, 136, 0.08)', borderColor: 'rgba(0, 255, 136, 0.12)', color: '#00ff88' }}><HiLightningBolt /></div>
              <div>
                <span className="contact__info-label">Response Time</span>
                <span className="contact__info-value">Typically within 2–4 hours</span>
              </div>
            </div>
            <div className="contact__info-card glass-card">
              <div className="contact__info-icon" style={{ background: 'rgba(236, 72, 153, 0.08)', borderColor: 'rgba(236, 72, 153, 0.12)', color: '#ec4899' }}><HiChat /></div>
              <div>
                <span className="contact__info-label">Prefer Chat?</span>
                <span className="contact__info-value">DM me on any platform below</span>
              </div>
            </div>

            <div className="contact__socials">
              <span className="contact__socials-label">Connect With Me</span>
              <div className="contact__socials-row">
                {socialLinks.map((s, i) => (
                  <a key={i} href={s.href} className="contact__social" aria-label={s.label} suppressHydrationWarning>
                    {s.icon}
                    <span className="contact__social-tooltip">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          padding: 120px 0 40px;
        }

        /* ── Header ── */
        .contact__header {
          text-align: center;
          margin-bottom: 64px;
        }
        .contact__title-accent {
          background: linear-gradient(135deg, #00e5ff, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact__availability {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          padding: 10px 24px;
          background: rgba(0, 255, 136, 0.04);
          border: 1px solid rgba(0, 255, 136, 0.12);
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
        }
        .contact__avail-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00ff88;
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.6);
          animation: pulse-glow 2s infinite;
        }

        /* ── Process Steps ── */
        .contact__process {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }
        .contact__step {
          padding: 28px 24px;
          background: rgba(10, 8, 32, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          transition: all 0.4s ease;
        }
        .contact__step:hover {
          border-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        .contact__step-number {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 12px;
          display: block;
          opacity: 0.3;
        }
        .contact__step:hover .contact__step-number {
          opacity: 1;
        }
        .contact__step-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 12px 0 6px;
        }
        .contact__step-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        /* ── Form + Info Grid ── */
        .contact__grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 60px;
          align-items: start;
        }

        /* ── Form ── */
        .contact__form-wrap {
          padding: 40px;
          background: rgba(10, 8, 32, 0.4);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 24px;
        }
        .contact__form-heading {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 8px;
        }
        .contact__form-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0 0 28px;
        }
        .contact__form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .contact__field-wrap {
          position: relative;
        }
        .contact__field,
        .contact__textarea,
        .contact__select {
          width: 100%;
          padding: 16px 20px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-primary);
          background: rgba(5, 3, 20, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          outline: none;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          resize: vertical;
        }
        .contact__select {
          appearance: none;
          cursor: pointer;
        }
        .contact__field:focus,
        .contact__textarea:focus,
        .contact__select:focus {
          border-color: rgba(0, 229, 255, 0.3);
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.08), 0 0 40px rgba(0, 229, 255, 0.04);
        }
        .contact__field::placeholder,
        .contact__textarea::placeholder {
          color: var(--text-muted);
        }
        .contact__field-glow {
          position: absolute;
          inset: -1px;
          border-radius: 14px;
          opacity: 0;
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(168, 85, 247, 0.1));
          pointer-events: none;
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        .contact__field:focus ~ .contact__field-glow,
        .contact__textarea:focus ~ .contact__field-glow,
        .contact__select:focus ~ .contact__field-glow {
          opacity: 1;
        }
        .contact__submit {
          align-self: flex-start;
          margin-top: 6px;
        }
        .contact__submit-arrow {
          display: inline-block;
          margin-left: 8px;
          transition: transform 0.3s ease;
        }
        .contact__submit:hover .contact__submit-arrow {
          transform: translateX(6px);
        }

        /* ── Info Sidebar ── */
        .contact__info {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .contact__info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .contact__info-card:hover {
          transform: translateX(4px);
          border-color: rgba(0, 229, 255, 0.15);
        }
        .contact__info-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.12);
          color: var(--neon-blue);
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .contact__info-label {
          display: block;
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2px;
        }
        .contact__info-value {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        a.contact__info-value:hover {
          color: var(--neon-blue);
        }

        /* ── Socials ── */
        .contact__socials {
          margin-top: 16px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }
        .contact__socials-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 14px;
        }
        .contact__socials-row {
          display: flex;
          gap: 10px;
        }
        .contact__social {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(10, 8, 32, 0.4);
          color: var(--text-secondary);
          font-size: 1.1rem;
          transition: all 0.3s ease;
          position: relative;
        }
        .contact__social:hover {
          color: var(--neon-blue);
          border-color: rgba(0, 229, 255, 0.3);
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.15);
          transform: translateY(-4px);
        }
        .contact__social-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) scale(0.8);
          padding: 4px 10px;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          font-size: 0.68rem;
          font-weight: 500;
          color: #fff;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: all 0.2s ease;
        }
        .contact__social:hover .contact__social-tooltip {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }

        /* ── Spinner ── */
        .contact__spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          display: inline-block;
          margin-right: 8px;
        }
        .contact__submit--sending {
          opacity: 0.8;
          pointer-events: none;
        }

        /* ── Toast ── */
        .contact__toast {
          position: fixed;
          bottom: 32px;
          right: 32px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          border-radius: 14px;
          font-size: 0.88rem;
          font-weight: 500;
          color: #fff;
          z-index: 9999;
          backdrop-filter: blur(16px);
          animation: toast-in 0.4s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        .contact__toast--success {
          background: rgba(0, 180, 100, 0.2);
          border: 1px solid rgba(0, 255, 136, 0.2);
        }
        .contact__toast--success > :first-child {
          color: #00ff88;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .contact__toast--error {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .contact__toast--error > :first-child {
          color: #ef4444;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .contact__toast-close {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0 0 0 8px;
          transition: color 0.2s ease;
        }
        .contact__toast-close:hover {
          color: #fff;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes toast-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .contact__process {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .contact__process {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .contact__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .contact__row {
            grid-template-columns: 1fr;
          }
          .contact__form-wrap {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
