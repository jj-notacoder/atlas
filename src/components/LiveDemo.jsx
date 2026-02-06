import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const CITIES = ['Abu Dhabi', 'Dubai', 'Sharjah'];
const TRAVELERS = ['Family', 'Solo Explorer', 'Culture Seekers', 'Luxury / VIP'];
const COSTS = ['Budget', 'Balanced', 'Premium'];

// Enhanced Activity Pool
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
        'Morning': {
            'Outdoor': { name: 'Heart of Sharjah Walk', desc: 'Restored heritage area and souqs.', cost: 'Free', val: 0, tag: 'History', type: 'Outdoor' },
            'Indoor': { name: 'Sharjah Art Museum', desc: 'Leading collection of Arab art.', cost: 'Free', val: 0, tag: 'Art', type: 'Indoor' },
            'Premium': { name: 'Private History Guide', desc: 'Expert-led tour of Islamic heritage.', cost: 'AED 200', val: 200, tag: 'VIP', type: 'Mixed' }
        },
        'Midday': {
            'Outdoor': { name: 'Al Montazah Parks', desc: 'Amusement and water park fun.', cost: 'AED 50', val: 50, tag: 'Fun', type: 'Outdoor' },
            'Indoor': { name: 'Rain Room', desc: 'Walk through rain without getting wet.', cost: 'AED 25', val: 25, tag: 'Art', type: 'Indoor' },
            'Premium': { name: 'Sharjah Classic Cars', desc: 'Private tour of vintage collection.', cost: 'AED 50', val: 50, tag: 'Cars', type: 'Indoor' }
        },
        'Afternoon': {
            'Outdoor': { name: 'Al Noor Island', desc: 'Gardens and butterfly house.', cost: 'AED 35', val: 35, tag: 'Nature', type: 'Outdoor' },
            'Indoor': { name: 'Sharjah Archaeology', desc: 'Ancient history of the region.', cost: 'AED 10', val: 10, tag: 'History', type: 'Indoor' },
            'Premium': { name: 'House of Wisdom VIP', desc: 'Private lounge access in futuristic library.', cost: 'AED 100', val: 100, tag: 'Culture', type: 'Indoor' }
        },
        'Evening': {
            'Outdoor': { name: 'Al Majaz Waterfront', desc: 'Fountain shows and dining.', cost: 'Free', val: 0, tag: 'Views', type: 'Outdoor' },
            'Indoor': { name: 'Desert Park Centre', desc: 'Natural history and wildlife centre.', cost: 'AED 15', val: 15, tag: 'Nature', type: 'Indoor' },
            'Premium': { name: 'Chedi Al Bait Dinner', desc: 'Fine dining in a heritage resort.', cost: 'AED 600', val: 600, tag: 'Luxury', type: 'Indoor' }
        }
    }
};

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
                className={`w-full bg-surface border ${isOpen ? 'border-atlas-cyan' : 'border-white/10'} rounded-xl py-3 px-4 text-white text-sm font-medium cursor-pointer flex justify-between items-center transition-all hover:bg-white/5`}
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
                        className="absolute top-full left-0 right-0 mt-2 bg-[#0F1621] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-1"
                    >
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => { onChange(option); setIsOpen(false); }}
                                className={`px-4 py-2.5 cursor-pointer text-sm transition-colors ${value === option ? 'text-atlas-cyan bg-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
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
const SunIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);
const CloudIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 011-7.874V7a5 5 0 019.89-1.22A5 5 0 0015 13h3a3 3 0 013 3v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z" />
    </svg>
);
const CrowdIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const HeatIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const QueueIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- MAIN COMPONENT ---
const LiveDemo = () => {
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

    // Chat & Logic State
    const [chatHistory, setChatHistory] = useState([
        { type: 'bot', text: 'Hello! I am ATLAS. I have optimized your itinerary based on real-time data. Tell me if you need changes.' }
    ]);
    const [userMessage, setUserMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // 1. Auto-Simulate Live Data on City Change
    useEffect(() => {
        // Mocking "Live" API call
        const baseHeat = city === 'Dubai' ? 42 : city === 'Abu Dhabi' ? 38 : 35;
        const baseCrowd = city === 'Dubai' ? 85 : city === 'Abu Dhabi' ? 60 : 40;

        // Add random fluctuation
        const liveHeat = Math.min(100, Math.max(0, baseHeat + Math.floor(Math.random() * 10 - 5)));
        const liveCrowd = Math.min(100, Math.max(0, baseCrowd + Math.floor(Math.random() * 20 - 10)));

        setHeat(liveHeat);
        setCrowds(liveCrowd);
    }, [city]);

    const generateItinerary = useCallback(() => {
        const pool = ACTIVITY_POOL[city];
        let dailyCost = 0;
        let dayPlan = [];

        ['Morning', 'Midday', 'Afternoon', 'Evening'].forEach(time => {
            let selection = pool[time]['Indoor'];
            let backup = pool[time]['Outdoor'];

            // Cost Logic
            if (costPref === 'Budget') {
                selection = Object.values(pool[time]).reduce((prev, curr) => prev.val < curr.val ? prev : curr);
                backup = Object.values(pool[time]).find(i => i.name !== selection.name) || selection;
            } else if (costPref === 'Premium') {
                selection = pool[time]['Premium'];
                backup = pool[time]['Indoor'];
            } else {
                selection = time === 'Morning' || time === 'Evening' ? pool[time]['Outdoor'] : pool[time]['Indoor'];
                backup = pool[time]['Indoor'];
            }

            // Heat/Crowd Adjustments (Heuristic)
            let adjusted = false;
            let note = '';

            if (heat > 40 && ['Outdoor', 'Nature', 'Views'].includes(selection.tag)) {
                const indoorAlt = pool[time]['Indoor'];
                if (indoorAlt.name !== selection.name) {
                    backup = selection;
                    selection = indoorAlt;
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
            dayPlan.push({ time, main: selection, backup: backup, adjusted, note });
        });

        setItinerary(dayPlan);
        setMetrics({
            cost: dailyCost,
            heatExposure: heat > 40 ? 'Min' : 'Normal',
            queueTime: crowds > 80 ? 'Optimized' : 'Std'
        });
    }, [city, costPref, heat, crowds]);

    // 2. Logic Engine (Run when inputs/sensors change)
    useEffect(() => {
        generateItinerary();
    }, [city, traveler, costPref, heat, crowds, generateItinerary]);

    // 3. Swap Logic (Immutable)
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

        setChatHistory(prev => [...prev, { type: 'bot', text: `I've updated the schedule based on your preference.` }]);
    };

    // 4. AI Chat Bot Logic (Advanced NLP + Smart Logic)
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userMessage.trim()) return;

        // User Msg
        const input = userMessage;
        setChatHistory(prev => [...prev, { type: 'user', text: input }]);
        setUserMessage('');
        setIsTyping(true);

        setTimeout(() => {
            const lowerInput = input.toLowerCase();
            let response = "I've noted that preference.";
            let actionTaken = false;

            // --- ADVANCED PARSER ---

            // A. SHUFFLE / SWAP ORDER
            if (lowerInput.includes('shuffle') || lowerInput.includes('change order') || lowerInput.includes('swap') || lowerInput.includes('move')) {
                if (itinerary.length >= 3) { // Need enough items
                    setItinerary(prev => {
                        const newPlan = prev.map(item => ({ ...item }));
                        // Try to find indices mentioned? Or just random specific shuffle as requested "second and 3rd"
                        let idx1 = 1; // Default to mid-day
                        let idx2 = 2; // Default to afternoon

                        // Smart parsing
                        if (lowerInput.includes('morning')) idx1 = 0;
                        if (lowerInput.includes('evening') || lowerInput.includes('night')) idx2 = 3;

                        // Swap the MAIN activities of these slots, but keep Time labels fixed
                        const tempMain = newPlan[idx1].main;
                        newPlan[idx1].main = newPlan[idx2].main;
                        newPlan[idx2].main = tempMain;

                        newPlan[idx1].adjusted = true;
                        newPlan[idx2].adjusted = true;
                        newPlan[idx1].note = 'Reordered';
                        newPlan[idx2].note = 'Reordered';

                        return newPlan;
                    });
                    response = "I've reordered your itinerary as requested.";
                    actionTaken = true;
                }
            }

            // B. ADD / VISIT SPECIFIC (Create New)
            else if (lowerInput.includes('add') || lowerInput.includes('visit') || lowerInput.includes('go to')) {
                // Extract Activity Name (simple heuristic: text after "visit" or "add")
                const match = lowerInput.match(/(?:visit|add|go to) (.+)/);
                if (match && match[1]) {
                    const rawName = match[1].replace(/\b(to|the|a|an)\b/g, '').trim();
                    // Capitalize
                    const activityName = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

                    // Smart Estimation Helper
                    const estimate = (name) => {
                        let cost = 'AED 100';
                        let val = 100;
                        let type = 'Indoor';
                        let tag = 'General';

                        if (name.match(/park|walk|beach|garden/i)) { cost = 'Free'; val = 0; type = 'Outdoor'; tag = 'Nature'; }
                        if (name.match(/mall|shop|store/i)) { cost = 'Variable'; val = 200; type = 'Indoor'; tag = 'Shopping'; }
                        if (name.match(/museum|art|gallery/i)) { cost = 'AED 50'; val = 50; type = 'Indoor'; tag = 'Culture'; }
                        if (name.match(/burj|view|sky/i)) { cost = 'AED 400'; val = 400; type = 'Indoor'; tag = 'VIP'; }

                        return { cost, val, type, tag };
                    };

                    const meta = estimate(rawName);

                    // Feasibility Check
                    if (meta.type === 'Outdoor' && heat > 40) {
                        response = `I can't add "${activityName}" right now. It's ${heat}°C outside, which is unsafe.`;
                        actionTaken = true;
                    } else {
                        // Inject into a suitable slot (e.g. Afternoon or last slot)
                        setItinerary(prev => {
                            const newPlan = prev.map(item => ({ ...item }));
                            // Find 'Empty' or 'Standard' slot to replace? Or just overwrite Afternoon?
                            // Let's overwrite index 2 (Afternoon) by default for "add"
                            const targetIdx = 2;

                            const newActivity = {
                                name: activityName,
                                desc: `User added: "${activityName}". ATLAS verified availability.`,
                                cost: meta.cost,
                                val: meta.val,
                                tag: meta.tag,
                                type: meta.type
                            };

                            newPlan[targetIdx].backup = newPlan[targetIdx].main; // Save old
                            newPlan[targetIdx].main = newActivity;
                            newPlan[targetIdx].adjusted = true;
                            newPlan[targetIdx].note = 'Added';

                            return newPlan;
                        });
                        response = `I've added "${activityName}" to your schedule.`;
                        actionTaken = true;
                    }
                }
            }

            // C. STANDARD INTENT (Time / Type)
            if (!actionTaken) {
                // 1. Extract Time
                let targetTime = null;
                if (lowerInput.match(/\b(morning|9am|10am|11am)\b/)) targetTime = 'Morning';
                else if (lowerInput.match(/\b(midday|noon|12pm|1pm|2pm|3pm)\b/)) targetTime = 'Midday';
                else if (lowerInput.match(/\b(afternoon|4pm|5pm|6pm)\b/)) targetTime = 'Afternoon';
                else if (lowerInput.match(/\b(evening|night|dinner|7pm|8pm|9pm|10pm)\b/)) targetTime = 'Evening';

                // 2. Extract Intent / Activity
                let customActivityName = null;

                if (lowerInput.includes('boat') || lowerInput.includes('yacht') || lowerInput.includes('cruise')) {
                    customActivityName = "Private Boat Cruise";
                    if (city === 'Dubai' && targetTime === 'Evening') customActivityName = "Marina Moonlight Cruise";
                    if (city === 'Abu Dhabi' && targetTime === 'Morning') customActivityName = "Mangrove Kayak Tour";
                }
                else if (lowerInput.includes('shop') || lowerInput.includes('mall')) {
                    customActivityName = "Luxury Mall Visit";
                }
                else if (lowerInput.includes('ski') || lowerInput.includes('snow')) {
                    customActivityName = "Ski Dubai Slope Pass";
                }
                else if (lowerInput.includes('museum') || lowerInput.includes('art') || lowerInput.includes('history')) {
                    customActivityName = "Cultural Museum Tour";
                }

                if (customActivityName) {
                    setItinerary(prev => {
                        const newPlan = prev.map(item => ({ ...item }));
                        const timeSlot = targetTime || 'Afternoon';
                        const slotIdx = newPlan.findIndex(s => s.time === timeSlot);

                        if (slotIdx !== -1) {
                            const dynActivity = {
                                name: customActivityName,
                                desc: `Custom request: "${input}".`,
                                cost: 'Custom',
                                val: 200,
                                tag: 'Custom',
                                type: lowerInput.includes('indoor') ? 'Indoor' : 'Outdoor'
                            };

                            newPlan[slotIdx].backup = newPlan[slotIdx].main;
                            newPlan[slotIdx].main = dynActivity;
                            newPlan[slotIdx].adjusted = true;
                            newPlan[slotIdx].note = 'AI Request';

                            response = `I've arranged "${customActivityName}" for your ${timeSlot}.`;
                            return newPlan;
                        }
                        return prev;
                    });
                    actionTaken = true;
                }
            }

            // D. FALLBACK
            if (!actionTaken) {
                if (lowerInput.includes('vip') || lowerInput.includes('luxury')) {
                    setCostPref('Premium');
                    response = "Switching entire itinerary to Premium mode.";
                } else if (lowerInput.includes('cheap') || lowerInput.includes('budget')) {
                    setCostPref('Budget');
                    response = "Optimizing entire itinerary for budget.";
                } else {
                    response = "I can help with that. Try saying 'Add Burj Khalifa' or 'Shuffle the order'.";
                }
            }

            setChatHistory(prev => [...prev, { type: 'bot', text: response }]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <section id="demo" className="py-24 bg-background border-t border-white/5 relative">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        See ATLAS <span className="text-atlas-gold">adapt a day</span> in real time.
                    </h2>
                    <p className="text-gray-500">Live data drives the plan. Chat with ATLAS to fine-tune.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left: Control Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 bg-surface border border-white/10 rounded-2xl p-6 sticky top-24"
                    >
                        {/* Live Data Card */}
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
                                <CustomDropdown label="Starting City" options={CITIES} value={city} onChange={setCity} />
                                <CustomDropdown label="Traveler Type" options={TRAVELERS} value={traveler} onChange={setTraveler} />
                                <PillSelector label="Cost Preference" options={COSTS} value={costPref} onChange={setCostPref} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Adaptive Planner */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 flex flex-col gap-6"
                    >

                        {/* 1. Summary Strip */}
                        <div className="bg-surface/50 border border-white/10 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm">
                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Est. Day Cost</div>
                                <div className="text-2xl font-display font-medium text-white">~ AED {metrics.cost} <span className="text-sm text-gray-500 font-sans font-normal">/ person</span></div>
                            </div>
                            <div className="h-10 w-px bg-white/10 hidden md:block"></div>

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

                            <div className="h-10 w-px bg-white/10 hidden md:block"></div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg">
                                    <QueueIcon className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Queue Strategy</div>
                                    <div className="text-xl font-bold text-blue-400">{metrics.queueTime}</div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Timeline */}
                        <div className="space-y-4">
                            {itinerary.map((slot, i) => (
                                <motion.div
                                    key={`${city}-${i}-${slot.main.name}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative bg-surface border ${slot.adjusted ? 'border-atlas-gold/40' : 'border-white/5'} hover:border-white/20 transition-colors p-6 rounded-2xl group`}
                                >

                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

                                        {/* Time Column */}
                                        <div className="flex-none w-24">
                                            <div className="text-sm font-bold text-atlas-cyan uppercase tracking-widest mb-1">{slot.time}</div>
                                            <div className="text-xs text-gray-600 font-mono">
                                                {slot.time === 'Morning' ? '09:00 - 12:00' :
                                                    slot.time === 'Midday' ? '12:00 - 15:00' :
                                                        slot.time === 'Afternoon' ? '15:00 - 18:00' : '18:00 +'}
                                            </div>
                                        </div>

                                        {/* Main Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-xl font-bold text-white">{slot.main.name}</h4>
                                                {slot.adjusted && (
                                                    <span className="bg-atlas-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
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
                                                {slot.adjusted && <span className="text-xs font-medium text-atlas-gold">{slot.note}</span>}
                                            </div>
                                        </div>

                                        {/* Backup Option */}
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
                                                    <svg className="w-4 h-4 text-atlas-cyan opacity-0 group-hover/backup:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                    </svg>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed group-hover/backup:text-gray-400">
                                                    {slot.backup.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* 3. AI Chat Interface */}
                        <div className="bg-surface border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-atlas-cyan to-blue-500 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-white">ATLAS Assistant</h4>
                            </div>

                            {/* Messages */}
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {chatHistory.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-atlas-gold text-black rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'}`}>
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

                            {/* Input */}
                            <form onSubmit={handleSendMessage} className="relative">
                                <input
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    placeholder="Type a request (e.g., 'Shuffle order' or 'Add Burj Khalifa')..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-atlas-cyan transition-colors"
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
        </section>
    );
};

export default LiveDemo;
