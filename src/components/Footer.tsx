"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import BookingFormModal from "./BookingFormModal";

const poppins = Poppins({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export default function Footer() {
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterMsg("You're on the list — welcome!");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .site-footer {
          --black:#0b0a09;
          --black-2:#161412;
          --black-3:#201d19;
          --mustard:#e2a93a;
          --mustard-light:#f4cd63;
          --mustard-deep:#a8771e;
          --cream:#f6f1e4;
          --muted:#a39c8e;
          --border:rgba(246,241,228,0.09);
        }

        .site-footer{
          position:relative;
          background:var(--black);
          color:var(--cream);
          overflow:hidden;
          border-top:1px solid var(--border);
        }
        .site-footer::before{
          content:"";
          position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg, transparent, var(--mustard) 25%, var(--mustard-light) 50%, var(--mustard) 75%, transparent);
          opacity:0.7;
        }

        /* ===================== CTA SECTION ===================== */
        .cta-section{
          position:relative;
          padding:6.5rem 6vw 5rem;
          overflow:hidden;
        }

        .ghost-text{
          position:absolute;
          right:-2%;
          bottom:-8%;
          font-size:clamp(6rem, 18vw, 15rem);
          font-weight:900;
          line-height:1;
          color:transparent;
          -webkit-text-stroke:1.5px var(--mustard);
          opacity:0.07;
          white-space:nowrap;
          pointer-events:none;
          user-select:none;
          z-index:0;
          letter-spacing:-0.02em;
        }

        .cta-inner{
          position:relative;
          z-index:1;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:4rem;
          max-width:1280px;
          margin:0 auto;
        }

        .cta-text{max-width:620px;}

        .eyebrow{
          display:inline-flex;
          align-items:center;
          gap:0.6rem;
          font-size:0.78rem;
          font-weight:600;
          letter-spacing:0.25em;
          text-transform:uppercase;
          color:var(--mustard);
          margin-bottom:1.4rem;
        }
        .eyebrow::before{
          content:"";
          width:28px; height:1px;
          background:var(--mustard);
        }

        .cta-heading{
          font-size:clamp(2.4rem, 5.2vw, 4.2rem);
          font-weight:800;
          line-height:1.05;
          letter-spacing:-0.02em;
          color:var(--cream);
          margin-bottom:1.5rem;
        }
        .cta-heading .accent{
          color:var(--mustard);
          font-style:italic;
          font-weight:700;
        }

        .cta-sub{
          font-size:1.02rem;
          font-weight:300;
          color:var(--muted);
          line-height:1.7;
          max-width:480px;
          margin-bottom:2.4rem;
        }

        .stats-row{
          display:flex;
          gap:2.4rem;
          margin-bottom:2.6rem;
          flex-wrap:wrap;
        }
        .stat{display:flex; flex-direction:column;}
        .stat-num{
          font-size:1.6rem;
          font-weight:700;
          color:var(--mustard-light);
          line-height:1.1;
        }
        .stat-label{
          font-size:0.74rem;
          color:var(--muted);
          text-transform:uppercase;
          letter-spacing:0.1em;
          margin-top:0.3rem;
        }

        .cta-btn{
          display:inline-flex;
          align-items:center;
          gap:0.7rem;
          background:var(--mustard);
          color:var(--black);
          font-weight:600;
          font-size:0.95rem;
          letter-spacing:0.02em;
          padding:1rem 1.9rem;
          border-radius:999px;
          transition:background 0.35s ease, color 0.35s ease, transform 0.25s ease, box-shadow 0.35s ease;
          box-shadow:0 0 0 1px var(--mustard) inset;
        }
        .cta-btn svg{
          transition:transform 0.35s ease;
        }
        .cta-btn:hover{
          background:transparent;
          color:var(--mustard-light);
          transform:translateY(-2px);
          box-shadow:0 8px 24px -8px rgba(226,169,58,0.35), 0 0 0 1px var(--mustard) inset;
        }
        .cta-btn:hover svg{transform:translateX(4px);}

        /* ===================== BADGE (signature element) ===================== */
        .badge-wrap{
          position:relative;
          flex-shrink:0;
          width:200px; height:200px;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .badge-glow{
          position:absolute;
          width:140%; height:140%;
          background:radial-gradient(circle, rgba(226,169,58,0.18), transparent 70%);
          z-index:0;
        }
        .badge-ring{
          position:relative;
          width:100%; height:100%;
          z-index:1;
          animation:spin 22s linear infinite;
        }
        .badge-ring text{
          fill:var(--mustard-light);
          font-size:11.5px;
          font-weight:600;
          letter-spacing:1.5px;
          text-transform:uppercase;
        }
        .badge-center{
          position:absolute;
          top:50%; left:50%;
          transform:translate(-50%,-50%);
          width:108px; height:108px;
          border-radius:50%;
          background:var(--black-2);
          border:1px solid var(--border);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:2;
        }
        .badge-center svg{width:38px; height:38px; stroke:var(--mustard);}

        @keyframes spin{ to{ transform:rotate(360deg); } }

        /* ===================== MARQUEE STRIP ===================== */
        .marquee-outer{
          position:relative;
          background:var(--mustard);
          transform:rotate(-1.4deg) scale(1.03);
          margin:1.5rem 0 0.5rem;
          overflow:hidden;
          white-space:nowrap;
          box-shadow:0 6px 0 rgba(0,0,0,0.18);
        }
        .marquee-track{
          display:inline-flex;
          align-items:center;
          animation:marquee 26s linear infinite;
        }
        .marquee-track span{
          display:inline-flex;
          align-items:center;
          font-size:clamp(1.1rem, 2.4vw, 1.6rem);
          font-weight:800;
          text-transform:uppercase;
          letter-spacing:0.04em;
          color:var(--black);
          padding:0.9rem 1.4rem;
          white-space:nowrap;
        }
        .marquee-track span .dot{
          color:var(--black);
          opacity:0.45;
          margin-left:1.4rem;
          font-weight:400;
        }
        @keyframes marquee{
          from{ transform:translateX(0); }
          to{ transform:translateX(-50%); }
        }

        /* ===================== COMB DIVIDER ===================== */
        .comb-divider{
          height:14px;
          background-image:repeating-linear-gradient(to right, var(--mustard) 0 2px, transparent 2px 16px);
          opacity:0.55;
          margin:0.5rem 0 0;
        }

        /* ===================== FOOTER MAIN ===================== */
        .footer-main{
          padding:4.5rem 6vw 3rem;
          max-width:1280px;
          margin:0 auto;
        }

        .footer-grid{
          display:grid;
          grid-template-columns:1.3fr 1fr 1fr 1.1fr;
          gap:3rem;
        }

        .footer-logo{
          font-size:1.6rem;
          font-weight:800;
          letter-spacing:0.01em;
          color:var(--cream);
          margin-bottom:0.3rem;
        }
        .footer-logo span{
          display:block;
          font-size:0.72rem;
          font-weight:500;
          letter-spacing:0.35em;
          color:var(--mustard);
          margin-top:0.4rem;
        }

        .brand-tagline{
          font-size:0.92rem;
          font-weight:300;
          color:var(--muted);
          line-height:1.7;
          margin:1.3rem 0 1.8rem;
          max-width:280px;
        }

        .newsletter{
          display:flex;
          border:1px solid var(--border);
          border-radius:999px;
          padding:0.3rem 0.3rem 0.3rem 1.1rem;
          max-width:300px;
          margin-bottom:1.8rem;
          transition:border-color 0.3s ease;
        }
        .newsletter:hover, .newsletter:focus-within{border-color:var(--mustard);}
        .newsletter input{
          flex:1;
          background:none;
          border:none;
          color:var(--cream);
          font-size:0.85rem;
          outline:none;
        }
        .newsletter input::placeholder{color:var(--muted);}
        .newsletter button{
          width:36px; height:36px;
          border-radius:50%;
          background:var(--mustard);
          color:var(--black);
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          transition:background 0.3s ease, transform 0.3s ease;
        }
        .newsletter button:hover{background:var(--mustard-light); transform:scale(1.06);}
        .newsletter-note{
          font-size:0.78rem;
          color:var(--mustard-light);
          margin-top:-1.2rem;
          margin-bottom:1.8rem;
          min-height:1em;
        }

        .social-row{display:flex; gap:0.7rem;}
        .social-row a{
          width:40px; height:40px;
          border-radius:50%;
          border:1px solid var(--border);
          display:flex;
          align-items:center;
          justify-content:center;
          transition:background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }
        .social-row a svg{width:17px; height:17px; stroke:var(--cream); transition:stroke 0.3s ease;}
        .social-row a:hover{background:var(--mustard); border-color:var(--mustard); transform:translateY(-3px);}
        .social-row a:hover svg{stroke:var(--black);}

        .footer-col h4{
          font-size:0.78rem;
          font-weight:600;
          text-transform:uppercase;
          letter-spacing:0.22em;
          color:var(--mustard);
          margin-bottom:1.6rem;
        }
        .footer-col ul li{margin-bottom:0.95rem;}
        .footer-col ul li a{
          font-size:0.92rem;
          font-weight:300;
          color:var(--muted);
          position:relative;
          transition:color 0.3s ease;
        }
        .footer-col ul li a::after{
          content:"";
          position:absolute; left:0; bottom:-3px;
          width:0; height:1px;
          background:var(--mustard);
          transition:width 0.3s ease;
        }
        .footer-col ul li a:hover{color:var(--cream);}
        .footer-col ul li a:hover::after{width:100%;}

        address, .hours{
          font-size:0.92rem;
          font-weight:300;
          color:var(--muted);
          line-height:1.8;
          font-style:normal;
        }
        .hours{margin-top:1.4rem; padding-top:1.4rem; border-top:1px solid var(--border);}
        .hours strong{color:var(--cream); font-weight:500;}

        /* ===================== BOTTOM BAR ===================== */
        .footer-bottom{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:1.5rem;
          padding:1.8rem 6vw 2.2rem;
          max-width:1280px;
          margin:0 auto;
          border-top:1px solid var(--border);
        }
        .copyright{font-size:0.8rem; color:var(--muted);}
        .legal-links{display:flex; gap:1.6rem;}
        .legal-links a{font-size:0.8rem; color:var(--muted); transition:color 0.3s ease;}
        .legal-links a:hover{color:var(--mustard);}

        .back-to-top{
          width:46px; height:46px;
          border-radius:50%;
          border:1px solid var(--border);
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          transition:background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }
        .back-to-top svg{width:18px; height:18px; stroke:var(--cream); transition:stroke 0.3s ease;}
        .back-to-top:hover{background:var(--mustard); border-color:var(--mustard); transform:translateY(-3px);}
        .back-to-top:hover svg{stroke:var(--black);}

        /* ===================== REDUCED MOTION ===================== */
        @media (prefers-reduced-motion: reduce){
          .badge-ring, .marquee-track{animation:none;}
        }

        /* ===================== RESPONSIVE ===================== */
        @media (max-width:1024px){
          .cta-inner{flex-direction:column; align-items:flex-start; gap:3rem;}
          .badge-wrap{align-self:center;}
          .footer-grid{grid-template-columns:1fr 1fr; row-gap:3rem;}
        }

        @media (max-width:768px){
          .cta-section{padding:4.5rem 7vw 4rem;}
          .ghost-text{display:none;}
          .cta-inner{align-items:center; text-align:center;}
          .cta-text{max-width:100%;}
          .cta-sub{margin-left:auto; margin-right:auto;}
          .stats-row{justify-content:center;}
          .eyebrow{margin-left:auto; margin-right:auto;}
          .footer-main{padding:3.5rem 7vw 2.5rem;}
          .footer-grid{grid-template-columns:1fr; gap:2.6rem;}
          .brand-tagline, .newsletter{margin-left:0; margin-right:0;}
          .footer-bottom{flex-direction:column; text-align:center; padding:2rem 7vw;}
        }

        @media (max-width:480px){
          .cta-heading{font-size:clamp(2rem, 9vw, 2.6rem);}
          .badge-wrap{width:150px; height:150px;}
          .badge-center{width:84px; height:84px;}
          .badge-center svg{width:30px; height:30px;}
          .badge-ring text{font-size:13px;}
          .stats-row{gap:1.6rem;}
          .marquee-track span{font-size:1rem; padding:0.7rem 1rem;}
          .cta-btn{width:100%; justify-content:center;}
          .social-row{justify-content:center;}
        }
      `}} />

      <footer id="visit" className={`site-footer ${poppins.className}`}>
        {/* Seamless top fade from FAQ */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none z-0" style={{ height: "clamp(80px, 10vw, 150px)", background: "linear-gradient(to bottom, #0A0A0A 0%, transparent 100%)" }} />
        
        {/* CTA */}
        <section className="cta-section">
          <div className="ghost-text" aria-hidden="true">ZAYN&apos;S</div>
          <div className="cta-inner">
            <div className="cta-text">
              <span className="eyebrow">Book Your Chair</span>
              <h2 className="cta-heading">
                Let&apos;s Create<br />
                <span className="accent">Something Bold.</span>
              </h2>
              <p className="cta-sub">
                From precision cuts to vibrant color — walk in ordinary, walk out unforgettable.
              </p>

              <div className="stats-row">
                <div className="stat">
                  <span className="stat-num">4.9★</span>
                  <span className="stat-label">Client Rating</span>
                </div>
                <div className="stat">
                  <span className="stat-num">8K+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
                <div className="stat">
                  <span className="stat-num">5+</span>
                  <span className="stat-label">Years Crafting Style</span>
                </div>
              </div>

              <button onClick={() => setIsBookingOpen(true)} className="cta-btn">
                Book Appointment
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Signature rotating badge */}
            <div className="badge-wrap">
              <div className="badge-glow"></div>
              <svg className="badge-ring" viewBox="0 0 200 200">
                <defs>
                  <path
                    id="circlePath"
                    d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                  />
                </defs>
                <text>
                  <textPath href="#circlePath">
                    ZAYN&apos;S SALON ✦ PREMIUM CUTS ✦ SIGNATURE COLOR ✦ EST. STYLE ✦
                  </textPath>
                </text>
              </svg>
              <div className="badge-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <line x1="20" y1="4" x2="8.12" y2="15.88" />
                  <line x1="14.47" y1="14.48" x2="20" y2="20" />
                  <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="marquee-outer">
          <div className="marquee-track" aria-hidden="true">
            <span>
              Precision Cuts <span className="dot">●</span> Bold Color <span className="dot">●</span> Signature Style <span className="dot">●</span> Total Transformation <span className="dot">●</span>
            </span>
            <span>
              Precision Cuts <span className="dot">●</span> Bold Color <span className="dot">●</span> Signature Style <span className="dot">●</span> Total Transformation <span className="dot">●</span>
            </span>
          </div>
        </div>

        <div className="comb-divider"></div>

        {/* Footer main */}
        <div className="footer-main">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <div className="footer-logo">
                <Image
                  src="/images/main-logo-transparent.png"
                  alt="Zayn's Hair Salon"
                  width={200}
                  height={136}
                  className="w-24 md:w-32 h-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <p className="brand-tagline">
                Modern grooming, timeless style — crafted in the heart of Lahore.
              </p>

              <form className="newsletter" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" aria-label="Subscribe">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
              <p className="newsletter-note">{newsletterMsg}</p>

              <div className="social-row">
                <a href="https://www.instagram.com/zayns_thehairheaven1?igsh=MWw3NjkzODhiNXo1Mw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@zayns013?_r=1&_t=ZS-97N5aXc0gEx" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Book Now</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Haircut &amp; Styling</a></li>
                <li><a href="#">Hair Coloring</a></li>
                <li><a href="#">Beard Grooming</a></li>
                <li><a href="#">Bridal Makeover</a></li>
                <li><a href="#">Spa &amp; Treatment</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Visit Us</h4>
              <address>
                37A sector C chambeli block<br />
                1st floor<br /><br />
                +92 321 4894075<br />
                hello@zayns.com
              </address>
              <p className="hours">
                <strong>Everyday:</strong> 11:00 AM – 11:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="copyright">© 2026 Zayn&apos;s Salon. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {isBookingOpen && (
          <BookingFormModal onClose={() => setIsBookingOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
