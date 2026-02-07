import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useProfile();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
        : null;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass-nav' : 'py-8 bg-transparent'}`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-manara-cyan to-blue-600 group-hover:shadow-[0_0_20px_rgba(0,234,255,0.5)] transition-shadow duration-300"></div>
                        <span className="text-2xl font-display font-bold tracking-tighter text-white">MANARA</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {['About', 'Vision', 'How Manara Works', 'Explore UAE', 'Essential Visit Places'].map((item) => (
                            <a
                                key={item}
                                href={item === 'Explore UAE' ? '/#explore' : (item === 'Essential Visit Places' ? '/#essentials' : (item === 'How Manara Works' ? '/#how-it-works' : `/#${item.toLowerCase().replace(' ', '-')}`))}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-manara-cyan transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* CTAs & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <a
                            href="/#demo"
                            className="hidden md:block px-5 py-2 rounded-full text-sm font-bold text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                        >
                            Live Demo
                        </a>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/5 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-manara-cyan/20 to-blue-600/20 border border-manara-cyan/30 flex items-center justify-center">
                                    {initials ? (
                                        <span className="text-xs font-bold text-manara-cyan">{initials}</span>
                                    ) : (
                                        <svg className="w-4 h-4 text-manara-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm font-bold text-white hidden sm:block">Profile</span>
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-64 bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2"
                                    >
                                        {user?.name ? (
                                            <>
                                                <div className="px-4 py-3 border-b border-white/5">
                                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Signed in as</div>
                                                    <div className="text-white font-bold truncate">{user.name}</div>
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    target="_blank"
                                                    className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    My Itineraries
                                                </Link>
                                                <Link
                                                    to="/profile"
                                                    target="_blank"
                                                    className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    Preferences
                                                </Link>
                                                <div className="border-t border-white/5 my-1"></div>
                                                <button
                                                    onClick={logout}
                                                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                                                >
                                                    Sign Out
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="px-4 py-3">
                                                    <div className="text-sm text-gray-400 mb-3">
                                                        Sign in to save your itineraries and preferences.
                                                    </div>
                                                    <Link
                                                        to="/profile"
                                                        target="_blank"
                                                        className="block w-full text-center px-4 py-2 bg-manara-cyan text-black font-bold rounded-lg text-sm hover:bg-manara-cyan/90 transition-colors"
                                                    >
                                                        Sign In / Set Up
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors ml-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0F1621] border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {['About', 'Vision', 'How Manara Works', 'Explore UAE', 'Essential Visit Places'].map((item) => (
                                <a
                                    key={item}
                                    href={item === 'Explore UAE' ? '/#explore' : (item === 'Essential Visit Places' ? '/#essentials' : (item === 'How Manara Works' ? '/#how-it-works' : `/#${item.toLowerCase().replace(' ', '-')}`))}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-sm font-bold text-gray-300 hover:text-manara-cyan uppercase tracking-widest py-2"
                                >
                                    {item}
                                </a>
                            ))}
                            <a
                                href="/#demo"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block w-full text-center px-4 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                            >
                                Live Demo
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
