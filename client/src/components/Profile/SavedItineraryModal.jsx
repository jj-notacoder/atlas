import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SavedItineraryModal = ({ itinerary, onClose }) => {
    if (!itinerary) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-surface border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                {itinerary.title || `Day in ${itinerary.city}`}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {new Date(itinerary.createdAt).toLocaleDateString()} • {itinerary.city}
                            </p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto custom-scrollbar">
                        {/* Metrics Summary */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-white/5 rounded-xl p-4 text-center">
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Total Cost</div>
                                <div className="text-lg font-bold text-white">
                                    {itinerary.summaryMetrics?.cost || 0} AED
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 text-center">
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Items</div>
                                <div className="text-lg font-bold text-manara-cyan">
                                    {itinerary.items?.length || 0}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 text-center">
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Crowd Level</div>
                                <div className="text-lg font-bold text-blue-400">
                                    {itinerary.summaryMetrics?.queueTime === 'Optimized' ? 'Low' : 'Normal'}
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-6 relative ml-4 border-l-2 border-white/10 pl-8">
                            {itinerary.items && itinerary.items.map((slot, index) => (
                                <div key={index} className="relative">
                                    <div className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full border-2 ${slot.main.tag === 'Essentials' || slot.adjusted ? 'bg-manara-cyan border-manara-cyan' : 'bg-background border-gray-600'} flex items-center justify-center z-10`}>
                                        <div className={`w-2 h-2 rounded-full ${slot.main.tag === 'Essentials' || slot.adjusted ? 'bg-black' : 'bg-gray-400'}`}></div>
                                    </div>

                                    <div className="mb-1 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        {slot.time}
                                    </div>
                                    <div className={`p-4 rounded-xl border ${slot.main.tag === 'Essentials' ? 'bg-manara-cyan/10 border-manara-cyan/30' : 'bg-white/5 border-white/10'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-bold text-white">{slot.main.name}</h4>
                                            <span className="text-xs font-bold text-manara-cyan px-2 py-1 bg-manara-cyan/10 rounded">
                                                {slot.main.val} AED
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-3">{slot.main.desc}</p>

                                        {slot.adjusted && (
                                            <div className="flex items-center gap-2 text-xs text-manara-cyan font-bold">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                {slot.note || 'AI Optimized'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SavedItineraryModal;
