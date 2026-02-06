import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass-nav' : 'py-8 bg-transparent'}`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-manara-cyan to-blue-600 group-hover:shadow-[0_0_20px_rgba(0,234,255,0.5)] transition-shadow duration-300"></div>
                    <span className="text-2xl font-display font-bold tracking-tighter text-white">MANARA</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['About', 'Vision', 'How Manara Works', 'Explore UAE', 'Essential Visit Places'].map((item) => (
                        <a
                            key={item}
                            href={item === 'Explore UAE' ? '#explore' : (item === 'Essential Visit Places' ? '#essentials' : (item === 'How Manara Works' ? '#how-it-works' : `#${item.toLowerCase().replace(' ', '-')}`))}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-manara-cyan transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-4">
                    <a
                        href="#demo"
                        className="hidden md:block px-5 py-2 rounded-full text-sm font-bold text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                    >
                        Live Demo
                    </a>

                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
