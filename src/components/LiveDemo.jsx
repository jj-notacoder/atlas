import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { Link } from 'react-router-dom';
import AuthTabs from './Auth/AuthTabs';

// --- MOCK DATA ---
const CITIES = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Fujairah', 'Ajman', 'Umm Al Quwain'];
const TRAVELERS = ['Family', 'Solo Explorer', 'Culture Seekers', 'Luxury / VIP'];
const COSTS = ['Budget', 'Balanced', 'Premium'];

// Enhanced Activity Pool (Simplified for context)
const ACTIVITY_POOL = {
    'Dubai': {
        'Morning': {
            'Outdoor': { name: 'Al Fahidi Walking Tour', desc: 'Wander through historic wind-tower laneways.', cost: 'Free', val: 0, tag: 'Culture', type: 'Outdoor' },
            'Indoor': { name: 'Coffee Museum & Bastakiya', desc: 'Explore the history of coffee in a cool heritage house.', cost: 'AED 30', val: 30, tag: 'Culture', type: 'Indoor' },
            'Premium': { name: 'Private Heritage Tour', desc: 'Exclusive guided tour with private transport.', cost: 'AED 350', val: 350, tag: 'VIP', type: 'Mixed' }
        },
        'Midday': {
            'Outdoor': { name: 'Zabeel Park', desc: 'Green spaces and Dubai Frame views.', cost: 'AED 5', val: 5, tag: 'Nature', type: 'Outdoor' },
            'Indoor': { name: 'Museum of the Future', desc: 'Journey to 2071 in an air-conditioned icon.', cost: 'AED 145', val: 145, tag: 'Future', type: 'Indoor' },
            'Premium': { name: 'Burj Khalifa (Top)', desc: 'Skip-the-line access to the world’s highest lounge.', cost: 'AED 500', val: 500, tag: 'VIP', type: 'Indoor' }
        },
        'Afternoon': {
            'Outdoor': { name: 'Dubai Creek Boat Ride', desc: 'Traditional Abra ride across the creek.', cost: 'AED 2', val: 2, tag: 'Views', type: 'Outdoor' },
            'Indoor': { name: 'Dubai Mall Aquarium', desc: 'Underwater tunnel and marine zoo experience.', cost: 'AED 120', val: 120, tag: 'Family', type: 'Indoor' },
            'Premium': { name: 'Personal Shopper Expr.', desc: 'VIP fashion concierge service.', cost: 'AED 800', val: 800, tag: 'VIP', type: 'Indoor' }
        },
        'Evening': {
            'Outdoor': { name: 'Desert Safari', desc: 'Dune bashing and BBQ under the stars.', cost: 'AED 150', val: 150, tag: 'Adventure', type: 'Outdoor' },
            'Indoor': { name: 'La Perle Show', desc: 'World-class aqua acrobatics theatre.', cost: 'AED 250', val: 250, tag: 'Show', type: 'Indoor' },
            'Premium': { name: 'Private Yacht Dinner', desc: 'Sunset cruise with gourmet dining.', cost: 'AED 1200', val: 1200, tag: 'VIP', type: 'Mixed' }
        }
    },
    'Abu Dhabi': {
        'Morning': {
            'Outdoor': { name: 'Kayaking at Mangroves', desc: 'Paddle through serene natural channels.', cost: 'AED 100', val: 100, tag: 'Nature', type: 'Outdoor' },
            'Indoor': { name: 'Qasr Al Watan', desc: 'Tour the majestic presidential palace.', cost: 'AED 65', val: 65, tag: 'Culture', type: 'Indoor' },
            'Premium': { name: 'Private Boat Tour', desc: 'Luxury charter around the islands.', cost: 'AED 400', val: 400, tag: 'VIP', type: 'Outdoor' }
        },
        'Midday': {
            'Outdoor': { name: 'Corniche Walk', desc: 'Seaside promenade with skyline views.', cost: 'Free', val: 0, tag: 'Views', type: 'Outdoor' },
            'Indoor': { name: 'Louvre Abu Dhabi', desc: 'World-class art under a floating dome.', cost: 'AED 63', val: 63, tag: 'Art', type: 'Indoor' },
            'Premium': { name: 'Emirates Palace Tea', desc: 'Gold cappuccino in royal surroundings.', cost: 'AED 350', val: 350, tag: 'VIP', type: 'Indoor' }
        },
        'Afternoon': {
            'Outdoor': { name: 'Heritage Village', desc: 'Reconstructed traditional oasis village.', cost: 'Free', val: 0, tag: 'Culture', type: 'Outdoor' },
            'Indoor': { name: 'Ferrari World', desc: 'Home to the world’s fastest rollercoaster.', cost: 'AED 310', val: 310, tag: 'Thrill', type: 'Indoor' },
            'Premium': { name: 'F1 Circuit Experience', desc: 'Drive a supercar on the Yas Marina track.', cost: 'AED 800', val: 800, tag: 'VIP', type: 'Outdoor' }
        },
        'Evening': {
            'Outdoor': { name: 'Sheikh Zayed Mosque', desc: 'Sunset views of the Grand Mosque.', cost: 'Free', val: 0, tag: 'Culture', type: 'Outdoor' },
            'Indoor': { name: 'Yas Mall Cinema Gold', desc: 'Luxury cinema experience with dining.', cost: 'AED 100', val: 100, tag: 'Relax', type: 'Indoor' },
            'Premium': { name: 'Private Dunes Dinner', desc: 'Exclusive desert dining set up.', cost: 'AED 900', val: 900, tag: 'VIP', type: 'Outdoor' }
        }
    },
    'Sharjah': {
        'Morning': { 'Outdoor': { name: 'Heart of Sharjah', val: 0, tag: 'History', type: 'Outdoor', desc: 'Heritage area walk' }, 'Indoor': { name: 'Sharjah Art Museum', val: 0, tag: 'Art', type: 'Indoor', desc: 'Art collection' }, 'Premium': { name: 'VIP Art Tour', val: 200, tag: 'VIP', type: 'Indoor', desc: 'Guided tour' } },
        'Midday': { 'Outdoor': { name: 'Al Majaz', val: 0, tag: 'Fun', type: 'Outdoor', desc: 'Park and fountain' }, 'Indoor': { name: 'Rain Room', val: 25, tag: 'Art', type: 'Indoor', desc: 'Walk in rain' }, 'Premium': { name: 'Private Lunch', val: 300, tag: 'VIP', type: 'Indoor', desc: 'Fine dining' } },
        'Afternoon': { 'Outdoor': { name: 'Al Noor Island', val: 35, tag: 'Nature', type: 'Outdoor', desc: 'Butterfly house' }, 'Indoor': { name: 'Archaeology Museum', val: 10, tag: 'History', type: 'Indoor', desc: 'Ancient artifacts' }, 'Premium': { name: 'Gold Souq VIP', val: 0, tag: 'VIP', type: 'Indoor', desc: 'Personal shopping' } },
        'Evening': { 'Outdoor': { name: 'Al Qasba', val: 0, tag: 'Views', type: 'Outdoor', desc: 'Canalside walk' }, 'Indoor': { name: 'Planetarium', val: 20, tag: 'Science', type: 'Indoor', desc: 'Star gazing' }, 'Premium': { name: 'Chedi Al Bait', val: 600, tag: 'Luxury', type: 'Mixed', desc: 'Heritage dinner' } }
    },
    'Ras Al Khaimah': {
        'Morning': { 'Outdoor': { name: 'Jebel Jais View', val: 0, tag: 'Nature', type: 'Outdoor', desc: 'Mountain views' }, 'Indoor': { name: 'National Museum', val: 20, tag: 'History', type: 'Indoor', desc: 'Fort tour' }, 'Premium': { name: 'Zipline VIP', val: 400, tag: 'Adventure', type: 'Outdoor', desc: 'Longest zipline' } },
        'Midday': { 'Outdoor': { name: 'Dhayah Fort', val: 0, tag: 'History', type: 'Outdoor', desc: 'Hilltop fort' }, 'Indoor': { name: 'Mall Shopping', val: 0, tag: 'Shop', type: 'Indoor', desc: 'Cool shopping' }, 'Premium': { name: 'Waldorf Lunch', val: 300, tag: 'VIP', type: 'Indoor', desc: 'Luxury dining' } },
        'Afternoon': { 'Outdoor': { name: 'Beach Walk', val: 0, tag: 'Nature', type: 'Outdoor', desc: 'Sea breeze' }, 'Indoor': { name: 'Pearl Museum', val: 15, tag: 'Culture', type: 'Indoor', desc: 'Pearl history' }, 'Premium': { name: 'Private Beach Cabana', val: 500, tag: 'VIP', type: 'Outdoor', desc: 'Exclusive relax' } },
        'Evening': { 'Outdoor': { name: 'Corniche BBQ', val: 50, tag: 'Fun', type: 'Outdoor', desc: 'Public BBQ' }, 'Indoor': { name: 'Cinema', val: 50, tag: 'Relax', type: 'Indoor', desc: 'Movie night' }, 'Premium': { name: 'Ritz Desert Dinner', val: 800, tag: 'VIP', type: 'Outdoor', desc: 'Dunes dining' } }
    }
};

// Handle missing cities
['Fujairah', 'Ajman', 'Umm Al Quwain'].forEach(c => ACTIVITY_POOL[c] = ACTIVITY_POOL['Ras Al Khaimah']);


// --- COMPONENTS ---

const CustomDropdown = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 block">{label}</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-surface border ${isOpen ? 'border-manara-cyan' : 'border-white/10'} rounded-xl py-3 px-4 text-white text-sm font-medium cursor-pointer flex justify-between items-center transition-all hover:bg-white/5`}
            >
                <span>{value}</span>
                <svg className={`h-4 w-4 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#0F1621] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-1 max-h-60 overflow-y-auto custom-scrollbar"
                    >
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => { onChange(option); setIsOpen(false); }}
                                className={`px-4 py-2.5 cursor-pointer text-sm transition-colors ${value === option ? 'text-manara-cyan bg-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                {option}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const PillSelector = ({ label, options, value, onChange }) => {
    return (
        <div>
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 block">{label}</label>
            <div className="flex bg-surface border border-white/10 rounded-xl p-1">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onChange(option)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${value === option ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- ICONS ---
const SunIcon = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>);
const CloudIcon = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 011-7.874V7a5 5 0 019.89-1.22A5 5 0 0015 13h3a3 3 0 013 3v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z" /></svg>);
const CrowdIcon = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
const HeatIcon = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>);

// --- MAIN COMPONENT ---
const LiveDemo = () => {
    // Context
    const { user, saveItinerary, login, addedItems } = useProfile();

    // Inputs
    const [city, setCity] = useState('Abu Dhabi');
    const [traveler, setTraveler] = useState('Family');
    const [costPref, setCostPref] = useState('Balanced');

    // Live Sensor Data (Auto-simulated)
    const [heat, setHeat] = useState(30);
    const [crowds, setCrowds] = useState(40);

    // State
    const [itinerary, setItinerary] = useState([]);
    const [metrics, setMetrics] = useState({ cost: 0, heatExposure: 'Low', queueTime: 'Low' });

    // UI State for Save Modal
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveTitle, setSaveTitle] = useState('');
    const [showToast, setShowToast] = useState(false);

    // UI State for Sign Up Modal (if no profile)
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authName, setAuthName] = useState('');
    const [authCity, setAuthCity] = useState('Abu Dhabi');

    // Pre-fill from profile preferences logic
    useEffect(() => {
        if (user?.startingCity && !city) setCity(user.startingCity);
        if (user?.travelerType) setTraveler(user.travelerType);
        if (user?.costPreference) setCostPref(user.costPreference);
    }, [user]);

    // Chat & Logic State
    const [chatHistory, setChatHistory] = useState([
        { type: 'bot', text: 'Hello! I am MANARA. I have optimized your itinerary based on real-time data. Tell me if you need changes.' }
    ]);
    const [userMessage, setUserMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // 1. Auto-Simulate Live Data on City Change
    useEffect(() => {
        const baseHeat = city === 'Dubai' ? 42 : city === 'Abu Dhabi' ? 38 : 35;
        const baseCrowd = city === 'Dubai' ? 85 : city === 'Abu Dhabi' ? 60 : 40;
        const liveHeat = Math.min(100, Math.max(0, baseHeat + Math.floor(Math.random() * 10 - 5)));
        const liveCrowd = Math.min(100, Math.max(0, baseCrowd + Math.floor(Math.random() * 20 - 10)));
        setHeat(liveHeat);
        setCrowds(liveCrowd);
    }, [city]);

    // Close auth modal and open save modal when user logs in
    useEffect(() => {
        if (user && showAuthModal) {
            setShowAuthModal(false);
            setSaveTitle(`Day in ${city} for ${traveler}`);
            setShowSaveModal(true);
        }
    }, [user, showAuthModal, city, traveler]);

    const generateItinerary = useCallback(() => {
        const cityPool = ACTIVITY_POOL[city] || ACTIVITY_POOL['Abu Dhabi'];
        let dailyCost = 0;
        let dayPlan = [];

        ['Morning', 'Midday', 'Afternoon', 'Evening'].forEach(time => {
            const timeSlot = cityPool[time] || cityPool['Morning']; // safe fallback
            let selection = timeSlot['Indoor'];
            let backup = timeSlot['Outdoor'];

            // Cost Logic
            if (costPref === 'Budget') {
                selection = Object.values(timeSlot).reduce((prev, curr) => prev.val < curr.val ? prev : curr);
                backup = Object.values(timeSlot).find(i => i.name !== selection.name) || selection;
            } else if (costPref === 'Premium') {
                selection = timeSlot['Premium'];
                backup = timeSlot['Indoor'];
            } else {
                selection = time === 'Morning' || time === 'Evening' ? timeSlot['Outdoor'] : timeSlot['Indoor'];
                backup = timeSlot['Indoor'];
            }

            // Heat/Crowd Adjustments
            let adjusted = false;
            let note = '';
            if (heat > 40 && ['Outdoor', 'Nature', 'Views'].includes(selection.tag)) {
                if (timeSlot['Indoor'].name !== selection.name) {
                    backup = selection;
                    selection = timeSlot['Indoor'];
                    adjusted = true;
                    note = 'Heat Adjusted';
                }
            }
            if (crowds > 80 && !adjusted && selection.val > 0) {
                selection = { ...selection, name: selection.name + ' (Fast Track)', val: selection.val + 50 };
                adjusted = true;
                note = 'Crowd Skip';
            }

            dailyCost += selection.val;
            dayPlan.push({ time, main: selection, backup, adjusted, note });
        });

        // --- AI Adjustment for Essentials Items ---
        if (addedItems && addedItems.length > 0) {
            addedItems.forEach(item => {
                // Heuristic for Slot
                let targetTime = 'Midday';
                const t = (item.bestTime || item.window || '').toLowerCase();

                if (t.includes('morning') || t.includes('breakfast')) targetTime = 'Morning';
                else if (t.includes('afternoon') || t.includes('lunch')) targetTime = 'Midday'; // Lunch is usually midday
                else if (t.includes('sunset') || t.includes('evening') || t.includes('dinner')) targetTime = 'Evening';
                else if (t.includes('all day')) targetTime = 'Afternoon';

                const slotIndex = dayPlan.findIndex(s => s.time === targetTime);
                if (slotIndex !== -1) {
                    // Update Cost Metric (Approx)
                    const oldVal = dayPlan[slotIndex].main.val || 0;
                    const newVal = item.cost === 'Free' ? 0 : (item.cost === 'High' ? 300 : 100);
                    dailyCost = dailyCost - oldVal + newVal;

                    dayPlan[slotIndex] = {
                        ...dayPlan[slotIndex],
                        main: {
                            name: item.name,
                            desc: item.description, // Shorten desc if needed
                            cost: item.cost,
                            val: newVal,
                            tag: 'Essentials',
                            type: item.type === 'cuisine' ? 'Food' : 'Place'
                        },
                        adjusted: true,
                        note: 'Your Selection'
                    };
                }
            });
        }

        setItinerary(dayPlan);
        setMetrics({
            cost: dailyCost,
            heatExposure: heat > 40 ? 'Min' : 'Normal',
            queueTime: crowds > 80 ? 'Optimized' : 'Std'
        });
    }, [city, costPref, heat, crowds]);

    useEffect(() => {
        generateItinerary();
    }, [city, traveler, costPref, heat, crowds, generateItinerary]);

    const handleSwap = (index) => {
        setItinerary(prev => {
            const newPlan = prev.map(item => ({ ...item }));
            const slot = newPlan[index];
            const oldMain = slot.main;
            slot.main = slot.backup;
            slot.backup = oldMain;
            slot.adjusted = true;
            slot.note = 'User Override';
            return newPlan;
        });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userMessage.trim()) return;
        const input = userMessage;
        setChatHistory(prev => [...prev, { type: 'user', text: input }]);
        setUserMessage('');
        setIsTyping(true);
        setTimeout(() => {
            setChatHistory(prev => [...prev, { type: 'bot', text: `I've noted that preference for ${city}.` }]);
            setIsTyping(false);
        }, 800);
    };

    const handleSaveClick = () => {
        if (!user) {
            setShowAuthModal(true);
        } else {
            setSaveTitle(`Day in ${city} for ${traveler}`);
            setShowSaveModal(true);
        }
    };

    const handleConfirmSave = () => {
        const itineraryData = {
            title: saveTitle,
            city,
            travelerType: traveler,
            costPreference: costPref,
            conditions: { heat, crowds },
            summaryMetrics: metrics,
            timeline: itinerary
        };
        saveItinerary(itineraryData);
        setShowSaveModal(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Legacy handleAuthSubmit removed in favor of AuthTabs in modal

    return (
        <section id="demo" className="py-24 bg-background border-t border-white/5 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        See MANARA <span className="text-manara-gold">adapt a day</span> in real time.
                    </h2>
                    <p className="text-gray-500">Live data drives the plan. Chat with MANARA to fine-tune.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 bg-surface border border-white/10 rounded-2xl p-6 sticky top-24"
                    >
                        <div className="bg-gradient-to-br from-black/60 to-black/20 rounded-xl p-5 border border-white/10 mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-20">
                                <div className="flex gap-2">
                                    <div className="w-16 h-1 bg-white rotate-45"></div>
                                    <div className="w-16 h-1 bg-white rotate-45"></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Connect: {city}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                                    {heat > 35 ? <SunIcon className="w-8 h-8 text-orange-400 mb-2 animate-spin-slow" /> : <CloudIcon className="w-8 h-8 text-blue-400 mb-2 animate-bounce-slow" />}
                                    <span className={`text-2xl font-bold ${heat > 35 ? 'text-orange-400' : 'text-blue-400'}`}>{heat}°C</span>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">Heat Index</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
                                    <CrowdIcon className={`w-8 h-8 mb-2 ${crowds > 60 ? 'text-red-400' : 'text-green-400'}`} />
                                    <span className={`text-2xl font-bold ${crowds > 60 ? 'text-red-400' : 'text-green-400'}`}>{crowds}%</span>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">Crowd Density</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Preferences</h3>
                        </div>

                        <div className="space-y-8">
                            <div className="grid grid-cols-1 gap-6">
                                <CustomDropdown label="Touring City" options={CITIES} value={city} onChange={setCity} />
                                <CustomDropdown label="Traveler Type" options={TRAVELERS} value={traveler} onChange={setTraveler} />
                                <PillSelector label="Cost Preference" options={COSTS} value={costPref} onChange={setCostPref} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 flex flex-col gap-6"
                    >
                        <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm">
                            <div className="flex flex-wrap items-center gap-6 md:gap-12">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Est. Day Cost</div>
                                    <div className="text-2xl font-display font-medium text-white">~ AED {metrics.cost} <span className="text-sm text-gray-500 font-sans font-normal">/ person</span></div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded-lg">
                                        <HeatIcon className={`w-6 h-6 ${metrics.heatExposure === 'Min' ? 'text-green-400' : 'text-yellow-400'}`} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Heat Exposure</div>
                                        <div className={`text-xl font-bold ${metrics.heatExposure === 'Min' ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {metrics.heatExposure === 'Min' ? '↓ Minimized' : 'Normal'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveClick}
                                className="px-6 py-3 bg-manara-cyan text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,234,255,0.2)] hover:shadow-[0_0_30px_rgba(0,234,255,0.4)] transition-all uppercase tracking-widest text-xs flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Save Itinerary
                            </button>
                        </div>

                        <div className="space-y-4">
                            {itinerary.map((slot, i) => (
                                <motion.div
                                    key={`${city}-${i}-${slot.main.name}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative bg-surface border ${slot.adjusted ? 'border-manara-gold/40' : 'border-white/5'} hover:border-white/20 transition-colors p-6 rounded-2xl group`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="flex-none w-24">
                                            <div className="text-sm font-bold text-manara-cyan uppercase tracking-widest mb-1">{slot.time}</div>
                                            <div className="text-xs text-gray-600 font-mono">
                                                {slot.time === 'Morning' ? '09:00 - 12:00' :
                                                    slot.time === 'Midday' ? '12:00 - 15:00' :
                                                        slot.time === 'Afternoon' ? '15:00 - 18:00' : '18:00 +'}
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-xl font-bold text-white">{slot.main.name}</h4>
                                                {slot.adjusted && (
                                                    <span className="bg-manara-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                                                        ADAPTED
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-400 mb-4 leading-relaxed max-w-lg">
                                                {slot.main.desc}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-white/5 rounded border border-white/5">{slot.main.tag}</span>
                                                <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-white/5 rounded border border-white/5">{slot.main.cost}</span>
                                                {slot.adjusted && <span className="text-xs font-medium text-manara-gold">{slot.note}</span>}
                                            </div>
                                        </div>

                                        <div className="md:w-1/3 pt-6 md:pt-0 md:border-l border-white/5 md:pl-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Alternative</span>
                                                <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded">Click to Swap</span>
                                            </div>

                                            <div
                                                onClick={() => handleSwap(i)}
                                                className="group/backup cursor-pointer p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <h5 className="text-sm font-bold text-gray-300 group-hover/backup:text-white transition-colors">{slot.backup.name}</h5>
                                                    <svg className="w-4 h-4 text-manara-cyan opacity-0 group-hover/backup:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-surface border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-manara-cyan to-blue-500 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-white">MANARA Assistant</h4>
                            </div>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {chatHistory.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-manara-gold text-black rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleSendMessage} className="relative">
                                <input
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    placeholder="Type a request (e.g., 'Shuffle order' or 'Add Burj Khalifa')..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-manara-cyan transition-colors"
                                />
                                <button type="submit" className="absolute right-2 top-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Save Itinerary Modal */}
            <AnimatePresence>
                {showSaveModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#0F1621] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
                        >
                            <button onClick={() => setShowSaveModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                            <h3 className="text-2xl font-bold text-white mb-2">Save Itinerary</h3>
                            <p className="text-gray-400 text-sm mb-6">Give your trip a name to find it easily later.</p>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">Trip Title</label>
                                    <input type="text" value={saveTitle} onChange={(e) => setSaveTitle(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan" />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button onClick={() => setShowSaveModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">Cancel</button>
                                    <button onClick={handleConfirmSave} className="flex-1 py-3 rounded-xl bg-manara-cyan text-black font-bold hover:bg-manara-cyan/90 transition-colors">Save Plan</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Auth Modal - Now using AuthTabs */}
            <AnimatePresence>
                {showAuthModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            // Increased max-width for AuthTabs
                            className="bg-transparent max-w-lg w-full relative"
                        >
                            <button
                                onClick={() => setShowAuthModal(false)}
                                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-black/50 rounded-full p-1"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            <AuthTabs />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 right-8 z-[70] bg-surface border border-manara-cyan/50 text-white px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div>
                            <div className="font-bold text-sm">Itinerary Saved</div>
                            <div className="text-xs text-gray-400">View it in your <Link to="/profile" target="_blank" className="text-manara-cyan hover:underline">Profile</Link></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LiveDemo;
