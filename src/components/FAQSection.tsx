"use client";

import React, { useState } from "react";

const faqs = [
  {
    q: "Do I need an appointment, or do you take walk-ins?",
    a: "Walk-ins are always welcome, but booking ahead guarantees your preferred barber and skips the wait. Weekend slots fill up fast, so we recommend reserving 2–3 days in advance."
  },
  {
    q: "What services does Zayn's actually cover?",
    a: "Precision haircuts, beard sculpting, hot towel shaves, fades, hair color, and grooming packages for special occasions. Every service starts with a consultation so the cut matches your face shape, not just a trend."
  },
  {
    q: "How long does a typical visit take?",
    a: "A standard cut runs 30–40 minutes. Add a beard trim or hot towel shave and plan for 60–75 minutes. Color and full grooming packages can take up to two hours — we'll always confirm timing when you book."
  },
  {
    q: "Can I request a specific barber?",
    a: "Absolutely. Every barber at Zayn's has their own specialty, from sharp fades to classic gentleman cuts. Pick your barber when booking online, or ask at the counter and we'll match you with the right hands."
  },
  {
    q: "What's your cancellation policy?",
    a: "Plans change — just give us at least 3 hours' notice and there's no charge. Late cancellations or no-shows may carry a small fee, since that slot could've gone to someone else."
  },
  {
    q: "Do you sell the products you use in-store?",
    a: "Yes — every pomade, oil, and beard balm on our shelf, your barber uses on you first. Ask after your cut and we'll point you to whatever suits your hair type."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root{
          --black: #0A0A0A;
          --black-soft: #141210;
          --card: #1B1814;
          --card-border: #2C2620;
          --gold: #C9952D;
          --gold-light: #E8C468;
          --gold-dim: #8A6A24;
          --cream: #F5F0E6;
          --cream-dim: #B8AFA0;
        }

        .faq-section{
          position: relative;
          background: var(--black);
          padding: 120px 24px 140px;
          overflow: hidden;
        }

        /* ambient glow */
        .faq-section::before{
          content:"";
          position:absolute;
          top:-200px; left:50%;
          transform: translateX(-50%);
          width:900px; height:600px;
          background: radial-gradient(ellipse at center, rgba(201,149,45,0.14) 0%, rgba(201,149,45,0) 70%);
          pointer-events:none;
        }

        /* faint texture lines */
        .faq-section::after{
          content:"";
          position:absolute;
          inset:0;
          background-image: repeating-linear-gradient(
            115deg,
            transparent,
            transparent 64px,
            rgba(201,149,45,0.025) 64px,
            rgba(201,149,45,0.025) 65px
          );
          pointer-events:none;
        }

        .faq-wrap{
          max-width: 920px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ---------- Header ---------- */
        .faq-eyebrow{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:14px;
          margin-bottom: 22px;
          opacity:0;
          animation: riseIn 0.7s ease forwards;
        }

        .faq-eyebrow .line{
          width: 36px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-dim));
        }
        .faq-eyebrow .line.right{
          background: linear-gradient(90deg, var(--gold-dim), transparent);
        }
        .faq-eyebrow span{
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
        }

        .faq-title{
          font-family: var(--font-bebas-neue), 'Bebas Neue', sans-serif;
          text-align:center;
          font-size: clamp(42px, 7vw, 78px);
          letter-spacing: 2px;
          line-height: 0.95;
          color: var(--cream);
          margin-bottom: 16px;
          opacity:0;
          animation: riseIn 0.7s ease 0.08s forwards;
        }
        .faq-title .accent{
          color: var(--gold);
          position: relative;
          display:inline-block;
        }

        .faq-sub{
          text-align:center;
          max-width: 480px;
          margin: 0 auto 64px;
          color: var(--cream-dim);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.7;
          opacity:0;
          animation: riseIn 0.7s ease 0.16s forwards;
        }

        @keyframes riseIn{
          from{opacity:0; transform: translateY(14px);}
          to{opacity:1; transform: translateY(0);}
        }

        /* ---------- Accordion ---------- */
        .faq-list{
          display:flex;
          flex-direction:column;
          border-top: 1px solid var(--card-border);
        }

        .faq-item{
          border-bottom: 1px solid var(--card-border);
          position: relative;
          transition: background 0.4s ease;
        }

        .faq-item:hover{
          background: linear-gradient(90deg, rgba(201,149,45,0.04), transparent 60%);
        }

        .faq-q{
          width:100%;
          background:none;
          border:none;
          cursor:pointer;
          display:flex;
          align-items:center;
          gap: 24px;
          padding: 30px 8px;
          text-align:left;
          font-family: var(--font-poppins), 'Poppins', sans-serif;
          color: var(--cream);
          -webkit-tap-highlight-color: transparent;
        }

        .faq-q:focus-visible{
          outline: 2px solid var(--gold);
          outline-offset: 4px;
          border-radius: 6px;
        }

        .faq-num{
          font-family: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: var(--gold-dim);
          min-width: 34px;
          transition: color 0.35s ease;
          padding-top: 2px;
        }
        .faq-item.open .faq-num{ color: var(--gold); }

        .faq-q-text{
          flex:1;
          font-family: var(--font-space-grotesk), 'Space Grotesk', sans-serif;
          font-size: clamp(17px, 2.1vw, 22px);
          font-weight: 600;
          letter-spacing: -0.3px;
          color: var(--cream);
          transition: color 0.35s ease;
          line-height:1.35;
        }
        .faq-item.open .faq-q-text{ color: var(--gold-light); }

        /* signature snip / razor toggle */
        .faq-toggle{
          width: 34px;
          height: 34px;
          min-width: 34px;
          border-radius: 50%;
          border: 1px solid var(--gold-dim);
          position: relative;
          transition: border-color 0.4s ease, background 0.4s ease, transform 0.45s cubic-bezier(.5,1.6,.4,1);
        }
        .faq-item.open .faq-toggle{
          border-color: var(--gold);
          background: var(--gold);
          transform: rotate(225deg);
        }
        .faq-toggle::before,
        .faq-toggle::after{
          content:"";
          position:absolute;
          top:50%; left:50%;
          background: var(--gold-light);
          transition: background 0.35s ease;
        }
        .faq-toggle::before{
          width: 12px; height: 1.5px;
          transform: translate(-50%,-50%);
        }
        .faq-toggle::after{
          width: 1.5px; height: 12px;
          transform: translate(-50%,-50%);
        }
        .faq-item.open .faq-toggle::before,
        .faq-item.open .faq-toggle::after{
          background: var(--black);
        }

        .faq-a-wrap{
          display:grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s cubic-bezier(.4,0,.2,1);
        }
        .faq-item.open .faq-a-wrap{
          grid-template-rows: 1fr;
        }
        .faq-a-inner{
          overflow:hidden;
        }
        .faq-a{
          padding: 0 8px 32px 66px;
          max-width: 600px;
          color: var(--cream-dim);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.85;
        }

        /* dashed "snip" line that draws in when opened — the section's signature detail */
        .snip-line{
          position:absolute;
          left: 50px;
          top: 0;
          height: 100%;
          width: 1px;
          overflow: hidden;
        }
        .snip-line::before{
          content:"";
          position:absolute;
          top:0; left:0;
          width:100%;
          height:0%;
          background: repeating-linear-gradient(180deg, var(--gold) 0 4px, transparent 4px 9px);
          transition: height 0.5s ease 0.05s;
        }
        .faq-item.open .snip-line::before{
          height: 100%;
        }

        /* ---------- Bottom CTA strip ---------- */
        .faq-bottom{
          margin-top: 64px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 24px;
          flex-wrap: wrap;
          padding: 28px 32px;
          border: 1px solid var(--card-border);
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(201,149,45,0.06), transparent);
        }
        .faq-bottom-text{
          font-size: 15px;
          color: var(--cream-dim);
          font-weight: 300;
        }
        .faq-bottom-text strong{
          color: var(--cream);
          font-weight: 600;
        }
        .faq-cta{
          display:inline-flex;
          align-items:center;
          gap: 10px;
          background: var(--gold);
          color: var(--black);
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.3px;
          padding: 14px 26px;
          border-radius: 999px;
          text-decoration:none;
          white-space:nowrap;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          box-shadow: 0 8px 24px rgba(201,149,45,0.18);
        }
        .faq-cta:hover{
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(201,149,45,0.3);
        }
        .faq-cta svg{ width:16px; height:16px; }

        /* ---------- Tablet ---------- */
        @media (max-width: 860px){
          .faq-section{ padding: 100px 20px 110px; }
          .faq-wrap{ max-width: 100%; }
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 640px){
          .faq-section{ padding: 72px 16px 80px; }
          .faq-section::before{ width: 100%; height: 420px; top: -140px; }
          .faq-eyebrow{ gap: 10px; margin-bottom: 16px; }
          .faq-eyebrow .line{ width: 22px; }
          .faq-eyebrow span{ font-size: 10px; letter-spacing: 3px; }
          .faq-title{ letter-spacing: 1px; margin-bottom: 12px; }
          .faq-sub{ font-size: 14px; margin-bottom: 40px; padding: 0 6px; }
          .faq-q{ gap: 12px; padding: 20px 0; }
          .faq-num{ min-width: 22px; font-size: 12px; }
          .faq-q-text{ font-size: 16px; letter-spacing: -0.2px; }
          .faq-toggle{ width:26px; height:26px; min-width:26px; }
          .faq-toggle::before{ width:9px; }
          .faq-toggle::after{ height:9px; }
          .faq-a{ padding: 0 0 24px 34px; font-size: 13.5px; line-height: 1.75; }
          .snip-line{ left: 28px; }
          .faq-bottom{
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 20px;
            margin-top: 48px;
            border-radius: 14px;
          }
          .faq-bottom-text{ font-size: 13.5px; }
          .faq-cta{ width:100%; justify-content:center; padding: 13px 22px; }
        }

        /* ---------- Small phones ---------- */
        @media (max-width: 380px){
          .faq-section{ padding: 60px 14px 64px; }
          .faq-q{ gap: 10px; padding: 18px 0; }
          .faq-num{ min-width: 18px; font-size: 11px; }
          .faq-q-text{ font-size: 15px; }
          .faq-a{ padding-left: 28px; font-size: 13px; }
          .snip-line{ left: 23px; }
          .faq-toggle{ width:24px; height:24px; min-width:24px; }
        }

        @media (prefers-reduced-motion: reduce){
          *{ animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}} />

      <section className="faq-section" id="faq">
        {/* Seamless top fade from Social Proof */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none z-[1]" style={{ height: "clamp(80px, 10vw, 150px)", background: "linear-gradient(to bottom, #0A0908 0%, transparent 100%)" }} />
        
        <div className="faq-wrap">
          <div className="faq-eyebrow">
            <span className="line"></span>
            <span>Good to Know</span>
            <span className="line right"></span>
          </div>

          <h2 className="faq-title">
            Frequently Asked <span className="accent">Questions</span>
          </h2>
          <p className="faq-sub">
            Everything you need to know before you sit in the chair at Zayn&apos;s — The Hair Heaven.
          </p>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <div className="snip-line"></div>
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="faq-num">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-toggle"></span>
                  </button>
                  <div className="faq-a-wrap">
                    <div className="faq-a-inner">
                      <p className="faq-a">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="faq-bottom">
            <p className="faq-bottom-text">
              Still have a question? <strong>Our team replies within the hour.</strong>
            </p>
            <a href="#book" className="faq-cta">
              Ask Us Directly
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
