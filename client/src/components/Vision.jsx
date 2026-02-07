import React from 'react';
import { motion } from 'framer-motion';

const features = [
    {
        title: "ADAPT",
        sub: "Live Optimization",
        description: "Traffic. Weather. Crowds.",
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "PREDICT",
        sub: "Future Intelligence",
        description: "Demand before it happens.",
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        title: "INTEGRATE",
        sub: "Unified Ecosystem",
        description: "Everything connected.",
        icon: (
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    }
];

const Vision = () => {
    return (
        <section id="vision" className="relative py-48 bg-surface overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-manara-cyan/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header - Huge & Clean */}
                <div className="text-center mb-32">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-6 tracking-tighter"
                    >
                        THE VISION
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl text-manara-cyan font-medium tracking-[0.2em] uppercase"
                    >
                        Orchestrating the City
                    </motion.p>
                </div>

                {/* Glass Panels - Minimal Text */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group relative p-10 py-16 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-manara-cyan/40 hover:bg-white/[0.05] transition-all duration-500"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-manara-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="mb-8 text-gray-500 group-hover:text-manara-cyan transition-colors duration-300">
                                {feature.icon}
                            </div>

                            <h3 className="text-4xl font-bold text-white mb-2">{feature.title}</h3>
                            <h4 className="text-xl text-manara-cyan font-medium mb-8">{feature.sub}</h4>

                            <p className="text-lg text-gray-400 font-medium border-l-2 border-white/10 pl-4 group-hover:border-manara-cyan/50 transition-colors">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Vision;
