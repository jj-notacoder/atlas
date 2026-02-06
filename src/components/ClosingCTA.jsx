import React from 'react';
import { motion } from 'framer-motion';

const ClosingCTA = () => {
    return (
        <section className="py-32 bg-background relative overflow-hidden flex items-center justify-center border-t border-white/5">

            {/* Subtle Animated Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-atlas-cyan/5 via-background to-background pointer-events-none"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight"
                >
                    Tourism that adapts to the UAE.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                >
                    Experience what a responsive, heat-aware, city-scale tourism system feels like.
                </motion.p>


            </div>
        </section>
    );
};

export default ClosingCTA;
