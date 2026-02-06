import React from 'react';
import { motion } from 'framer-motion';

const chunks = [
    { text: "Transparency First.", sub: "Every change explained." },
    { text: "Private by Design.", sub: "Your data stays yours." },
    { text: "Total Control.", sub: "Approve. Revert. Pause." }
];

const TrustControl = () => {
    return (
        <section className="py-24 bg-surface border-t border-white/5">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
                    >
                        Always in control.
                    </motion.h2>
                </div>

                {/* Big Chunks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
                    {chunks.map((chunk, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="flex flex-col items-center"
                        >
                            <h3 className="text-3xl font-bold text-white mb-3">{chunk.text}</h3>
                            <p className="text-xl text-gray-400 font-medium">
                                {chunk.sub}
                            </p>

                            {/* Geometric Accent */}
                            <div className="mt-6 w-12 h-1 bg-gradient-to-r from-atlas-cyan to-transparent rounded-full opacity-50"></div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrustControl;
