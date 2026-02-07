import React from 'react';
import { motion } from 'framer-motion';
import UAEMapVisual from './UAEMapVisual';

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center bg-background overflow-hidden pt-20">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Content */}
                <div className="flex flex-col items-start z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-6"
                    >
                        Adaptive Tourism System for the UAE
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
                    >
                        When the city changes,<br />
                        your plan changes.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-gray-400 max-w-md mb-8 leading-relaxed"
                    >
                        MANARA quietly adapts tourism plans across the UAE—responding to heat, crowds, and events in real time.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-6 mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-manara-cyan to-blue-600 text-black font-bold rounded-full shadow-[0_0_20px_rgba(0,234,255,0.4)] hover:shadow-[0_0_40px_rgba(0,234,255,0.6)] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                            onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            View Live Demo
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full backdrop-blur-md hover:bg-white/10 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                            onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            How Manara Works
                        </motion.button>
                    </div>
                </div>

                {/* Right: Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative z-0 flex justify-center lg:justify-end"
                >
                    <UAEMapVisual />
                </motion.div>

            </div >
        </section >
    );
};

export default Hero;
