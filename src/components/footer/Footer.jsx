import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <footer className="w-full bg-gradient-to-br from-sky-800 via-blue-900 to-sky-950 text-white border-t border-sky-900 shadow-inner font-sans animate-fade-in">
      <div className="container mx-auto px-5 py-12 flex flex-col md:flex-row md:items-start gap-10 md:gap-0">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start md:w-1/4">
          <figure className="relative w-[90px] h-[90px] rounded-full p-[3px] overflow-visible group mb-2">
            <div className="absolute inset-0 rounded-full blur opacity-50 bg-[conic-gradient(#38bdf8,#3b82f6,#0ea5e9,#38bdf8)] animate-border-revolve transition-all duration-500 group-hover:blur-2xl group-hover:opacity-80"></div>
            <div className="absolute inset-0 rounded-full p-[3px] overflow-hidden">
              <div className="w-full h-full rounded-full bg-[conic-gradient(#38bdf8,#3b82f6,#0ea5e9,#38bdf8)] animate-border-revolve transition-all duration-500 group-hover:scale-105"></div>
            </div>
            <div className="relative w-full h-full rounded-full bg-sky-900 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <img
                src="/logo-10.png"
                className="w-[80px] h-[80px] object-cover rounded-full shadow-lg"
                alt="logo"
              />
            </div>
          </figure>
          <div className="mt-2 text-left w-full">
            <h1 className="text-xl font-bold text-sky-300 font-mono tracking-tight mb-1 animate-fade-in">
              SSG Platform
            </h1>
            <p className="text-sm text-sky-200 font-light leading-relaxed mb-2 animate-fade-in">
              Modern solutions for your workflow. Seamless integration, robust support, and a vibrant community.
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <a
              className="text-sky-300 hover:text-sky-200 transition transform hover:scale-110 hover:drop-shadow-glow"
              href="#"
              aria-label="Facebook"
            >
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              className="text-sky-300 hover:text-sky-200 transition transform hover:scale-110 hover:drop-shadow-glow"
              href="#"
              aria-label="Twitter"
            >
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              className="text-sky-300 hover:text-sky-200 transition transform hover:scale-110 hover:drop-shadow-glow"
              href="#"
              aria-label="Instagram"
            >
              <svg fill="none" stroke="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              className="text-sky-300 hover:text-sky-200 transition transform hover:scale-110 hover:drop-shadow-glow"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.25h-3v-4.5c0-1.07-.93-2-2-2s-2 .93-2 2v4.5h-3v-9h3v1.25c.41-.59 1.36-1.25 2.5-1.25 1.93 0 3.5 1.57 3.5 3.5v5.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
          <div>
            <h2 className="mb-3 text-sm font-bold tracking-widest text-sky-300 uppercase font-mono animate-fade-in">
              Quick links
            </h2>
            <ul className="space-y-2">
              <li><a className="footer-link">About us</a></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><a className="footer-link">Products</a></li>
              <li><a className="footer-link">Featured Products</a></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold tracking-widest text-sky-300 uppercase font-mono animate-fade-in">
              Support
            </h2>
            <ul className="space-y-2">
              <li><a className="footer-link">Contact Support</a></li>
              <li><a className="footer-link">Help Resources</a></li>
              <li><a className="footer-link">Release Updates</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold tracking-widest text-sky-300 uppercase font-mono animate-fade-in">
              Platform
            </h2>
            <ul className="space-y-2">
              <li><a className="footer-link">Terms &amp; Privacy</a></li>
              <li><a className="footer-link">Pricing</a></li>
              <li><a className="footer-link">FAQ</a></li>
              <li><a className="footer-link">Order Status</a></li>
              <li><a className="footer-link">Return & Refund Policy</a></li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>

      <div className="container mx-auto px-5 pb-6 pt-4 border-t border-sky-900 text-center">
        <p className="text-md text-sky-200 font-light tracking-wide font-mono animate-fade-in">
          © {new Date().getFullYear()} All rights reserved - SSG
        </p>
      </div>
    </footer>

    <style>
      {`
      @keyframes border-revolve {
        0% { transform: rotate(0deg);}
                100% { transform: rotate(360deg);}
      }
      .animate-border-revolve {
        animation: border-revolve 6s linear infinite;
      }

      @keyframes fade-in {
        from { opacity: 0; transform: translateY(30px);}
        to { opacity: 1; transform: translateY(0);}
      }
      .animate-fade-in {
        animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
      }

      .footer-link {
        @apply hover:text-sky-300 transition cursor-pointer relative font-medium tracking-wide font-sans;
      }
      .footer-link::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg,#0ea5e9,#3b82f6);
        transition: width 0.3s;
      }
      .footer-link:hover::after, .footer-link:focus::after {
        width: 100%;
      }
      .hover\\:drop-shadow-glow:hover {
        filter: drop-shadow(0 0 8px #3b82f6);
      }
      `}
    </style>
  </>
);

export default Footer;
