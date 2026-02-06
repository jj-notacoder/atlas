import React from 'react';
import { motion } from 'framer-motion';

const ProblemSolution = () => {
    return (
        <section id="about" className="relative py-32 bg-background overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6">

                {/* 1. Section Title - MASSIVE (Matching Vision) */}
                <div className="mb-24 text-center">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-6 tracking-tighter"
                    >
                        THE REALITY
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl text-atlas-cyan font-medium tracking-[0.2em] uppercase"
                    >
                        Static plans fail.
                    </motion.p>
                </div>

                {/* 2. Interactive Scanner Animation */}
                <div className="relative w-full max-w-5xl mx-auto h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">

                    {/* LAYER 1: The Old Way (Bottom Layer, but visible initally) 
                        Actually, let's stack them. 
                        Top Layer = Static (Masked)
                        Bottom Layer = Live (Revealed)
                    */}

                    {/* The "Live System" (Underneath - Always Color) */}
                    <div className="absolute inset-0 bg-black">
                        {/* Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,234,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,234,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <div className="text-center">
                                <div className="inline-block px-4 py-2 bg-atlas-cyan/20 rounded-full border border-atlas-cyan/50 text-atlas-cyan font-bold uppercase tracking-widest mb-6 shadow-[0_0_30px_rgba(0,234,255,0.4)]">
                                    Live Adaptation
                                </div>
                                <h3 className="text-5xl md:text-7xl font-bold text-white mb-4">
                                    System Active
                                </h3>
                                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                    Analyzing heat, traffic, and queues in real-time. <br />
                                    <span className="text-atlas-cyan">Rerouting instantly.</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* The "Static Way" (Top Layer - gets masked away) */}
                    <motion.div
                        className="absolute inset-0 bg-gray-900 z-10"
                        animate={{
                            clipPath: [
                                "inset(0% 0% 0% 0%)",     // Fully visible (Start)
                                "inset(0% 0% 100% 0%)",   // Hidden (Wiped down)
                                "inset(0% 0% 100% 0%)",   // Stay hidden
                                "inset(0% 0% 0% 0%)"      // Reset (Snap back? or smooth?) - Let's wipe down then fade back in
                            ]
                        }}
                        transition={{
                            duration: 8,
                            times: [0, 0.4, 0.8, 1],
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Desaturate & Noise */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-30"></div>
                        <div className="absolute inset-0 bg-black/60"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <div className="text-center opacity-50">
                                <div className="inline-block px-4 py-2 bg-red-500/10 rounded-full border border-red-500/30 text-red-500 font-bold uppercase tracking-widest mb-6">
                                    PDF Itinerary
                                </div>
                                <h3 className="text-5xl md:text-7xl font-bold text-gray-500 mb-4 blur-[1px]">
                                    Static Plan
                                </h3>
                                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                                    Last updated: 3 months ago. <br />
                                    <span className="text-red-900/50">Connection lost.</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Scanner Bar (The visible line) */}
                    <motion.div
                        className="absolute left-0 right-0 h-[4px] bg-atlas-cyan z-20 shadow-[0_0_50px_rgba(0,234,255,0.8)]"
                        animate={{ top: ["0%", "100%", "100%", "0%"] }} // Match the clipPath
                        transition={{
                            duration: 8,
                            times: [0, 0.4, 0.8, 1], // Same timing
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                        }}
                    />

                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
