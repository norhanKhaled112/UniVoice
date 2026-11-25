import React from 'react';
import logo from '../assets/image/logo.png'
import { Link } from "react-router-dom";

export default function Footer({ onGetStarted }) {
    const navLinks = [
        { name: "Home", to: "/" },
        { name: "Complaint", to: "/complaint" },
        { name: "About Us", to: "/about" },
        { name: "Profile", to: "/profile" },
    ]

    return (
        <div className="w-full mt-10">
            
            <section className="w-full bg-[var(--TextHeroSecondarySecond)] px-6 py-16 text-center text-white sm:py-20">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                        Ready to make a difference on campus?
                    </h2>
                    <p className="mt-3 text-sm text-purple-100 sm:text-base">
                        Join your fellow students on UniVoice today.
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#5118A8] shadow-md transition hover:bg-purple-50 active:scale-[0.98]"
                        >
                            <span>Get Started Now</span>
                            <i className="fa-solid fa-arrow-right text-xs" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full bg-[#FAF9FE] px-6 py-12 text-[#6B6785]">
                <div className="mx-auto max-w-6xl">
                    {/* Top Centered Navigation Links */}
                    <nav
                        aria-label="Footer navigation"
                        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium sm:text-sm"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.to}
                                className="transition hover:text-[#5118A8]"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Divider */}
                    <hr className="my-8 border-gray-200/80" />

                    {/* Bottom Brand & Copyright Row */}
                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-2.5">
                            <img className='h-16 md:h-28 w-auto object-contain scale-125 md:scale-150 origin-left' src={logo}/>
                            
                        </div>

                        {/* Copyright Info */}
                        <div className="text-xs text-[#6B6785] sm:text-right">
                            <p>Copyright © {new Date().getFullYear()} UniVoice Student Voice Platform</p>
                            <p className="mt-0.5 text-[11px] text-[#9490AB]">
                                Empowering Students, Improving Campus Life
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}