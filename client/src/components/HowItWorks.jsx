import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        id: 1,
        title: "Sense the City",
        description: "MANARA continuously monitors heat, crowds, and major events across every emirate.",
        tags: ["Heat", "Crowds", "Events"],
        example: "⚠ Alert: 42°C in Downtown Dubai"
    },
    {
        id: 2,
        title: "Understand the Traveler",
        description: "Your preferences—family needs, indoor-first, or luxury—shape the engine's logic.",
        tags: ["Family", "Culture", "Comfort"],
        example: "✓ Preference: Indoor activities preferred"
    },
    {
        id: 3,
        title: "Adapt the Day",
        description: "When conditions shift, ATLAS quietly triggers a re-route and explains why.",
        tags: ["Reroute", "Notify", "Approve"],
        example: "➜ Moved outdoor activity to evening."
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
                    >
                        A simple system, <span className="text-gray-500">working in the background.</span>
                    </motion.h2>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">

                    {/* Animated Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-white/5 -z-10">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            className="h-full w-full bg-gradient-to-r from-transparent via-manara-cyan/50 to-transparent origin-left"
                        />
                    </div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative group"
                        >
                            {/* Step Number/Icon */}
                            <div className="w-32 h-32 mx-auto mb-10 rounded-full bg-surface border border-white/10 flex items-center justify-center relative z-10 text-4xl font-display font-bold text-gray-600 group-hover:text-manara-cyan group-hover:border-manara-cyan/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_40px_rgba(0,234,255,0.2)] bg-gradient-to-b from-white/5 to-transparent">
                                {step.id}
                            </div>

                            {/* Card Content */}
                            <div className="text-center p-8 rounded-3xl border border-transparent group-hover:border-white/10 group-hover:bg-white/[0.03] transition-all duration-500 min-h-[320px] flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                    <p className="text-lg text-gray-400 leading-relaxed mb-8">
                                        {step.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                                        {step.tags.map(tag => (
                                            <span key={tag} className="text-xs uppercase tracking-widest font-semibold py-1.5 px-3 rounded-lg bg-white/5 text-gray-400 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Hover Reveal Example - Fixed Positioning to prevent overlap */}
                                <div className="h-12 flex items-center justify-center">
                                    <div className="inline-block px-5 py-2.5 rounded-xl bg-manara-cyan/10 border border-manara-cyan/20 text-manara-cyan text-sm font-bold opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                        {step.example}
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center mt-20 md:mt-32">
                    <a
                        href="#demo"
                        className="inline-flex items-center gap-3 text-manara-cyan font-bold uppercase tracking-[0.2em] text-sm hover:text-white transition-colors duration-300 group hover:bg-manara-cyan/10 px-8 py-4 rounded-full border border-transparent hover:border-manara-cyan/30"
                    >
                        <span>Experience it Live</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
