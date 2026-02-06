import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Local Images
import imgAbuDhabi from '../assets/pictures/yas.jpg';
import imgDubai from '../assets/pictures/mof.jpg';
import imgSharjah from '../assets/pictures/Sharjah-Cover.webp';
import imgAjman from '../assets/pictures/Ajman-Dhow-Yard.png';
import imgUAQ from '../assets/pictures/UAQ-UAE-FB-Page.jpg';
import imgRAK from '../assets/pictures/ras-al-khaimah.jpg';
import imgFujairah from '../assets/pictures/Travel-to-Fujairah.jpg';

const emirates = [
    {
        id: 'abudhabi',
        name: 'Abu Dhabi',
        x: 180,
        y: 480,
        labelYOffset: 35,
        adaptation: 'Midday heat → indoor priority',
        attractions: ['Sheikh Zayed Mosque', 'Louvre Abu Dhabi'],
        image: imgAbuDhabi
    },
    {
        id: 'dubai',
        name: 'Dubai',
        x: 480,
        y: 320,
        labelYOffset: -25, // Move label ABOVE to avoid clutter
        adaptation: 'Weekend crowds → earlier entry',
        attractions: ['Burj Khalifa', 'Museum of the Future'],
        image: imgDubai
    },
    {
        id: 'sharjah',
        name: 'Sharjah',
        x: 540,
        y: 290,
        labelYOffset: 35, // Below
        adaptation: 'Cultural events → extended hours',
        attractions: ['Rain Room', 'Al Noor Island'],
        image: imgSharjah
    },
    {
        id: 'ajman',
        name: 'Ajman',
        x: 580,
        y: 260,
        labelYOffset: -25, // Above
        adaptation: 'Traffic flow → route optimization',
        attractions: ['Ajman Museum', 'Al Zorah Reserve'],
        image: imgAjman
    },
    {
        id: 'uaq',
        name: 'UAQ',
        x: 620,
        y: 230,
        labelYOffset: 35, // Below
        adaptation: 'Coastal humidity → outdoor scheduling',
        attractions: ['Dreamland Aqua Park', 'UAQ Fort'],
        image: imgUAQ
    },
    {
        id: 'rak',
        name: 'Ras Al Khaimah',
        x: 680,
        y: 140,
        labelYOffset: -25, // Above
        adaptation: 'Mountain visibility → hiking alerts',
        attractions: ['Jebel Jais', 'Dhayah Fort'],
        image: imgRAK
    },
    {
        id: 'fujairah',
        name: 'Fujairah',
        x: 700,
        y: 340,
        labelYOffset: 35,
        adaptation: 'Marine forecast → diving optimization',
        attractions: ['Snoopy Island', 'Al Bidya Mosque'],
        image: imgFujairah
    },
];

const UAECoverage = () => {
    const [activeEmirate, setActiveEmirate] = useState(null);

    return (
        <section id="explore" className="relative min-h-screen w-full bg-surface border-t border-white/5 flex flex-col justify-center overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,234,255,0.03),transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 text-center relative z-10 pt-12 md:pt-0">

                {/* Header */}
                <div className="mb-8 md:mb-12 pointer-events-none">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
                    >
                        Designed for the <span className="text-atlas-cyan">entire UAE.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-xl max-w-2xl mx-auto"
                    >
                        Explore how ATLAS adapts to the rhythm of each emirate.
                    </motion.p>
                </div>

                {/* Map Container - Full View */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full aspect-[4/3] md:aspect-[2/1] max-h-[70vh] flex items-center justify-center"
                >
                    <svg
                        viewBox="0 0 900 650"
                        className="w-full h-full drop-shadow-2xl"
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                    >
                        {/* Abstract UAE Polyline Base */}
                        <path
                            d="M50,450 L180,550 L400,550 L500,480 L650,500 L850,380 L780,50 L650,20 L550,50 L480,200 L350,300 L50,450 Z"
                            fill="#05070A"
                            stroke="#1f2937"
                            strokeWidth="2"
                            className="transition-colors duration-500 hover:stroke-atlas-cyan/30"
                        />

                        {/* Connections */}
                        <g opacity="0.1">
                            {emirates.map((e, i) => (
                                emirates.slice(i + 1).map(target => (
                                    <line key={`${e.id}-${target.id}`} x1={e.x} y1={e.y} x2={target.x} y2={target.y} stroke="#fff" strokeWidth="0.5" strokeDasharray="4 4" />
                                ))
                            ))}
                        </g>

                        {/* Nodes */}
                        {emirates.map((emirate) => (
                            <motion.g
                                key={emirate.id}
                                onHoverStart={() => setActiveEmirate(emirate.id)}
                                onHoverEnd={() => setActiveEmirate(null)}
                                className="cursor-pointer group"
                            >
                                {/* Pulse effect on hover */}
                                <circle cx={emirate.x} cy={emirate.y} r="8" className="fill-gray-800 stroke-gray-600 stroke-2 group-hover:fill-atlas-cyan group-hover:stroke-atlas-cyan transition-colors duration-300" />
                                <motion.circle
                                    cx={emirate.x}
                                    cy={emirate.y}
                                    r="8"
                                    stroke="#00EAFF"
                                    initial={{ scale: 1, opacity: 0 }}
                                    animate={activeEmirate === emirate.id ? { scale: 2.5, opacity: 0 } : { scale: 1, opacity: 0 }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />

                                {/* Hit area - Large */}
                                <circle cx={emirate.x} cy={emirate.y} r="40" fill="transparent" />

                                {/* Label - Closer and Alternated */}
                                <text
                                    x={emirate.x}
                                    y={emirate.y + emirate.labelYOffset}
                                    textAnchor="middle"
                                    className="fill-gray-400 text-xs uppercase font-bold tracking-widest pointer-events-none group-hover:fill-white transition-colors select-none"
                                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                                >
                                    {emirate.name}
                                </text>
                            </motion.g>
                        ))}
                    </svg>

                    {/* Info Card Overlay */}
                    <AnimatePresence>
                        {activeEmirate && (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-20 glass-panel p-0 rounded-2xl border border-white/10 text-left min-w-[320px] pointer-events-none shadow-2xl backdrop-blur-xl bg-black/80 overflow-hidden"
                                style={{
                                    top: emirates.find(e => e.id === activeEmirate).y - 280,
                                    left: emirates.find(e => e.id === activeEmirate).x - 160
                                }}
                            >
                                {/* Image Header */}
                                <div className="h-32 w-full relative bg-gray-900">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                                    <img
                                        src={emirates.find(e => e.id === activeEmirate).image}
                                        alt={emirates.find(e => e.id === activeEmirate).name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none'; // Hide if broken (shouldn't happen now)
                                            e.target.parentElement.classList.add('bg-atlas-dark');
                                        }}
                                    />
                                    <div className="absolute bottom-3 left-4 z-20">
                                        <h3 className="text-xl font-bold text-white shadow-black drop-shadow-md">
                                            {emirates.find(e => e.id === activeEmirate).name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">
                                        Recommended
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {emirates.find(e => e.id === activeEmirate).attractions.map(attr => (
                                            <span key={attr} className="text-xs text-gray-300 bg-white/10 border border-white/5 px-2 py-1 rounded">
                                                {attr}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-atlas-cyan/5 border border-atlas-cyan/10">
                                        <span className="w-1.5 h-1.5 rounded-full bg-atlas-cyan mt-1.5 animate-pulse shrink-0" />
                                        <div>
                                            <div className="text-[10px] text-atlas-cyan font-bold uppercase mb-0.5">Adaptation Active</div>
                                            <div className="text-sm text-gray-200 leading-snug">
                                                {emirates.find(e => e.id === activeEmirate).adaptation}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default UAECoverage;
