import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cities = [
    { id: 'abudhabi', name: 'Abu Dhabi', x: 200, y: 350, status: 'The Capital', color: '#FCD34D' }, // Gold
    { id: 'dubai', name: 'Dubai', x: 380, y: 200, status: 'Global Hub', color: '#00EAFF' }, // Cyan
    { id: 'sharjah', name: 'Sharjah', x: 410, y: 180, status: 'Cultural Soul', color: '#F472B6' }, // Pink
];

const UAEMapVisual = () => {
    const [activeCity, setActiveCity] = useState(null);

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1000px] group overflow-hidden rounded-3xl bg-[#020408]">

            {/* Starfield Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0B1021] via-[#020408] to-black">
                {/* Random Stars (Deterministic) */}
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-50 animate-pulse"
                        style={{
                            top: `${(i * 17) % 100}%`,
                            left: `${(i * 23) % 100}%`,
                            width: `${(i % 3) + 1}px`,
                            height: `${(i % 3) + 1}px`,
                            animationDuration: `${(i % 5) + 2}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* 3D Tilted Map Plane */}
            <motion.div
                initial={{ rotateX: 25, rotateY: -10, scale: 0.9 }}
                animate={{ rotateY: -15 }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="relative w-full h-full preserve-3d"
            >

                {/* Glowing Base Grid */}
                <div className="absolute inset-x-0 inset-y-10 bg-[linear-gradient(rgba(0,234,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,234,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] transform -skew-x-12 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>

                {/* Scanning Laser Beam (The "Woah" Factor) */}
                <div className="absolute top-0 bottom-0 left-[-50%] w-[10px] bg-gradient-to-r from-transparent via-manara-cyan to-transparent opacity-30 shadow-[0_0_50px_#00EAFF] blur-sm animate-[scan_6s_linear_infinite] skew-x-[-20deg] pointer-events-none"></div>

                <svg
                    viewBox="0 0 600 500"
                    className="w-full h-full drop-shadow-2xl overflow-visible"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' }}
                >
                    {/* Dark Silhouette Map */}
                    <motion.path
                        d="M100,400 L150,450 L300,450 L350,400 L450,420 L550,300 L500,100 L450,50 L400,80 L350,150 L250,250 L100,350 Z"
                        fill="#050810"
                        stroke="url(#mapGradient)"
                        strokeWidth="2"
                    />

                    <defs>
                        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00EAFF" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>

                    {/* Connecting Data Lines */}
                    <motion.path
                        d="M200,350 L380,200 L410,180"
                        fill="none"
                        stroke="#00EAFF"
                        strokeWidth="1"
                        strokeDasharray="5 5"
                        opacity="0.3"
                    >
                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                    </motion.path>

                    {/* Active Nodes - The "City Lights" */}
                    {cities.map((city) => (
                        <motion.g
                            key={city.id}
                            onHoverStart={() => setActiveCity(city.id)}
                            onHoverEnd={() => setActiveCity(null)}
                            className="cursor-pointer"
                        >
                            {/* Glow Bloom */}
                            <circle cx={city.x} cy={city.y} r="15" fill={city.color} fillOpacity="0.2" className="blur-md animate-pulse" />

                            {/* Core Light */}
                            <circle cx={city.x} cy={city.y} r="3" fill="#fff" className="shadow-[0_0_10px_white]" />

                            {/* Vertical Light Beacon (Sci-Fi Look) */}
                            <motion.line
                                x1={city.x} y1={city.y}
                                x2={city.x} y2={city.y - 60}
                                stroke="url(#beamGradient)"
                                strokeWidth="1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                            />

                            <defs>
                                <linearGradient id="beamGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor={city.color} stopOpacity="0.8" />
                                    <stop offset="100%" stopColor={city.color} stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Text Tag - Always visible for "Woah" density */}
                            <foreignObject x={city.x + 10} y={city.y - 70} width="100" height="40">
                                <motion.div
                                    className="px-2 py-0.5 border-l-2 border-white/20 bg-black/40 backdrop-blur-sm"
                                    initial={{ opacity: 0.6 }}
                                    whileHover={{ opacity: 1, scale: 1.1 }}
                                >
                                    <div className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">{city.name}</div>
                                </motion.div>
                            </foreignObject>

                            {/* Hit Area */}
                            <circle cx={city.x} cy={city.y} r="30" fill="transparent" />
                        </motion.g>
                    ))}
                </svg>
            </motion.div>

            {/* Hover Status Card */}
            <AnimatePresence>
                {activeCity && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-64 bg-black/80 border border-white/10 p-4 rounded-xl backdrop-blur-xl shadow-2xl z-20"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Feed</div>
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        </div>
                        <div className="text-xl font-bold text-white mb-1">{cities.find(c => c.id === activeCity).name}</div>
                        <div className="text-sm font-medium" style={{ color: cities.find(c => c.id === activeCity).color }}>
                            {cities.find(c => c.id === activeCity).status}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style jsx>{`
                @keyframes scan {
                    0% { left: -50%; }
                    100% { left: 150%; }
                }
            `}</style>
        </div>
    );
};

export default UAEMapVisual;
