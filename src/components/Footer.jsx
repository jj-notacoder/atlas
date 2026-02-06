import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-background border-t border-white/5 py-24 text-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">

                    {/* Column 1: Identity */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-4xl font-display font-bold text-white mb-4 tracking-tighter">MANARA</h3>
                        <p className="text-gray-500 font-medium uppercase tracking-widest text-xs mb-4">
                            Adaptive Tourism & Logistics Autonomy System
                        </p>
                        <p className="text-gray-400 italic font-serif text-lg opacity-80">
                            "When the city changes, your plan changes."
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="flex flex-col items-start md:items-center space-y-4">
                        {['Vision', 'System', 'Live Demo', 'Privacy & Governance'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-gray-500 hover:text-manara-cyan transition-colors duration-300 font-medium tracking-wide"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Column 3: Context */}
                    <div className="flex flex-col items-start md:items-end text-left md:text-right">
                        <p className="text-gray-500 leading-relaxed max-w-xs mb-2">
                            A concept system for adaptive, human-centered tourism across the United Arab Emirates.
                        </p>
                        <p className="text-gray-600 text-xs mt-2">
                            Designed for scale, resilience, and real-world conditions.
                        </p>
                        <div className="mt-8 text-gray-700 text-xs">
                            &copy; 2026 MANARA System.
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
