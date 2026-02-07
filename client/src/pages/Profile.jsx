import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ItineraryCard from '../components/Profile/ItineraryCard';
import Preferences from '../components/Profile/Preferences';
import AuthTabs from '../components/Auth/AuthTabs';
import SavedItineraryModal from '../components/Profile/SavedItineraryModal';
import { useProfile } from '../context/ProfileContext';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
    const { user, itineraries, deleteItinerary, loading, addedItems, removeItem } = useProfile();
    const [activeTab, setActiveTab] = useState('itineraries');
    const [selectedItinerary, setSelectedItinerary] = useState(null);

    useEffect(() => {
        if (user && !user.name) setActiveTab('settings');
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-manara-cyan border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white selection:bg-manara-cyan selection:text-black font-sans">
            <Navbar />

            <main className="container mx-auto px-6 py-32">
                {!user ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                                Start Your <span className="text-manara-cyan">Journey</span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Sign in to optimize your UAE experience, save custom itineraries, and get real-time adaptations.
                            </p>
                        </div>
                        <AuthTabs />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ProfileHeader />

                        {/* Tabs */}
                        <div className="flex border-b border-white/10 mb-12 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('itineraries')}
                                className={`px-8 py-4 font-bold uppercase tracking-widest text-sm relative transition-colors whitespace-nowrap ${activeTab === 'itineraries' ? 'text-manara-cyan' : 'text-gray-500 hover:text-white'}`}
                            >
                                Saved Itineraries
                                {activeTab === 'itineraries' && (
                                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-manara-cyan" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('saved')}
                                className={`px-8 py-4 font-bold uppercase tracking-widest text-sm relative transition-colors whitespace-nowrap ${activeTab === 'saved' ? 'text-manara-cyan' : 'text-gray-500 hover:text-white'}`}
                            >
                                Saved Places
                                {activeTab === 'saved' && (
                                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-manara-cyan" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`px-8 py-4 font-bold uppercase tracking-widest text-sm relative transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'text-manara-cyan' : 'text-gray-500 hover:text-white'}`}
                            >
                                Preferences
                                {activeTab === 'settings' && (
                                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-manara-cyan" />
                                )}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="min-h-[400px]">
                            {activeTab === 'itineraries' && (
                                <div className="space-y-6">
                                    {itineraries.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">No itineraries saved yet</h3>
                                            <p className="text-gray-500 max-w-md mx-auto mb-8">
                                                Visit the Live Demo to generate a personalized day plan, then save it here to keep track of your trips.
                                            </p>
                                            <a href="/#demo" className="inline-block px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-bold text-manara-cyan border border-manara-cyan/30 transition-all">
                                                Go to Live Demo
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {itineraries.map(itinerary => (
                                                <ItineraryCard
                                                    key={itinerary._id || itinerary.id}
                                                    itinerary={itinerary}
                                                    onDelete={deleteItinerary}
                                                    onView={setSelectedItinerary}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'saved' && (
                                <div className="space-y-6">
                                    {(!addedItems || addedItems.length === 0) ? (
                                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                            <h3 className="text-xl font-bold text-white mb-2">No saved items yet</h3>
                                            <p className="text-gray-500 mb-6">Explore Essentials to save places and cuisine.</p>
                                            <a href="/#essentials" className="text-manara-cyan font-bold hover:underline">Explore Essentials</a>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {addedItems.map((item, index) => (
                                                <div key={`${item.id}-${index}`} className="bg-surface border border-white/10 rounded-2xl overflow-hidden group">
                                                    <div className="h-48 relative overflow-hidden">
                                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        <div className="absolute top-4 right-4">
                                                            <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider">
                                                                {item.type === 'place' ? 'Place' : 'Cuisine'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-6">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                className="text-gray-500 hover:text-red-400 transition-colors"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                            </button>
                                                        </div>
                                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                                                        <div className="flex gap-2">
                                                            <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">{item.bestTime || item.window}</span>
                                                            <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">{item.cost}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <Preferences />
                            )}
                        </div>
                    </motion.div>
                )}
            </main>

            <SavedItineraryModal
                itinerary={selectedItinerary}
                onClose={() => setSelectedItinerary(null)}
            />
        </div>
    );
};

export default Profile;
