import React from "react";
import logo from "../../assets/images/logo.png";

const Footer = () => (
    <>
        <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-gray-200 border-t border-gray-800 shadow-inner">
            <div className="container mx-auto px-5 py-12 flex flex-col md:flex-row md:items-start gap-10 md:gap-0">
                {/* Logo & Social */}
                <div className="flex flex-col items-center md:items-start md:w-1/4">
                    <figure className="relative w-[90px] h-[90px] rounded-full p-[3px] overflow-visible group">
                        {/* Glowing aura */}
                        <div className="absolute inset-0 rounded-full blur opacity-50 bg-[conic-gradient(#06b6d4,#6366f1,#8b5cf6,#06b6d4)] animate-border-revolve transition-all duration-500 group-hover:blur-2xl group-hover:opacity-80"></div>

                        {/* Revolving border */}
                        <div className="absolute inset-0 rounded-full p-[3px] overflow-hidden">
                            <div className="w-full h-full rounded-full bg-[conic-gradient(#06b6d4,#6366f1,#8b5cf6,#06b6d4)] animate-border-revolve transition-all duration-500 group-hover:scale-105"></div>
                        </div>

                        {/* Inner logo */}
                        <div className="relative w-full h-full rounded-full bg-gray-900 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                            <img
                                src="/logo-10.png"
                                className="w-[80px] h-[80px] object-cover rounded-full shadow-lg"
                                alt="logo"
                            />
                        </div>
                    </figure>

                    <div className="mt-6 flex gap-4">
                        <a className="text-indigo-400 hover:text-indigo-300 transition" href="#">
                            <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a className="text-indigo-400 hover:text-indigo-300 transition" href="#">
                            <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a className="text-indigo-400 hover:text-indigo-300 transition" href="#">
                            <svg fill="none" stroke="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a className="text-indigo-400 hover:text-indigo-300 transition" href="#">
                            <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    </div>
                </div>
                {/* Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                    <div>
                        <h2 className="mb-3 text-sm font-bold tracking-widest text-indigo-300 uppercase">
                            About
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">Company</a>
                            </li>
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">Careers</a>
                            </li>
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">Blog</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-sm font-bold tracking-widest text-indigo-300 uppercase">
                            Support
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">Contact Support</a>
                            </li>
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">Help Resources</a>
                            </li>
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">Release Updates</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-sm font-bold tracking-widest text-indigo-300 uppercase">
                            Platform
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">Terms &amp; Privacy</a>
                            </li>
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">Pricing</a>
                            </li>
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">FAQ</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-3 text-sm font-bold tracking-widest text-indigo-300 uppercase">
                            Contact
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">Send a Message</a>
                            </li>
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">Request a Quote</a>
                            </li>
                            <li>
                                <a className="hover:text-indigo-400 transition cursor-pointer">1860-200-9898</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-5 pb-6 pt-4 border-t border-gray-800 text-center">
                <p className="text-md text-gray-400">
                    © {new Date().getFullYear()} All rights reserved - SSG
                </p>
            </div>
        </footer>
        <style>
            {

                `
            @keyframes border-revolve {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
            }

            .animate-border-revolve {
            animation: border-revolve 6s linear infinite;
            }

            `
            }
        </style>
    </>
);

export default Footer;
