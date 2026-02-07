import React from 'react';
import { motion } from 'framer-motion';

const ItineraryCard = ({ itinerary, onDelete, onView }) => {
    // Helper for time ago
    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-surface border border-white/10 hover:border-manara-cyan/50 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-6 opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(itinerary._id || itinerary.id); }}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors bg-black/20 rounded-full backdrop-blur-sm"
                    title="Delete Itinerary"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-manara-cyan transition-colors">
                        {itinerary.title || `Day in ${itinerary.city}`}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
                        <span>{itinerary.city}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <span>{timeAgo(itinerary.createdAt)}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Cost</div>
                    <div className="text-sm font-bold text-white">~{itinerary.summaryMetrics?.cost || 0} AED</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Heat</div>
                    <div className={`text-sm font-bold ${itinerary.summaryMetrics?.heatExposure === 'Min' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {itinerary.summaryMetrics?.heatExposure === 'Min' ? '-30%' : (itinerary.summaryMetrics?.heatExposure || 'Normal')}
                    </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Queues</div>
                    <div className="text-sm font-bold text-blue-400">
                        {itinerary.summaryMetrics?.queueTime === 'Optimized' ? '-45%' : (itinerary.summaryMetrics?.queueTime || 'Normal')}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => onView(itinerary)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm font-bold text-white uppercase tracking-widest transition-all"
                >
                    View Details
                </button>
            </div>
        </motion.div>
    );
};

export default ItineraryCard;
