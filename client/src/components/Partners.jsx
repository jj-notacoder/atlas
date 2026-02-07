import React from 'react';
import { motion } from 'framer-motion';

const Partners = () => {
    // Placeholder logos - in a real app these would be SVGs/Images
    const partners = ["Gov.ae", "Visit Dubai", "Etihad", "Emaar", "Masdar"];

    return (
        <section id="partners" className="py-24 bg-background border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-12">Trusted by Industry Leaders</p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
                    {partners.map((partner, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ opacity: 1, scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl font-display font-bold text-gray-400 cursor-default hover:text-white transition-colors"
                        >
                            {partner}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
