import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';

const TRAVELERS = ['Family', 'Solo Explorer', 'Culture Seekers', 'Luxury / VIP'];
const COSTS = ['Budget', 'Balanced', 'Premium'];
const CITIES = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Fujairah', 'Ajman', 'Umm Al Quwain'];

const Preferences = () => {
    const { user, updatePreferences } = useProfile();
    const [formData, setFormData] = useState({
        ...user
    });
    const [showToast, setShowToast] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        updatePreferences(formData);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto pb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-2">My Profile</h2>
            <p className="text-gray-400 mb-8">Customize your experience across MANARA.</p>

            <div className="space-y-8">
                {/* Identity */}
                <div className="bg-surface border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-manara-gold rounded-full"></span>
                        Personal Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">Starting City</label>
                            <select
                                value={formData.startingCity}
                                onChange={(e) => handleChange('startingCity', e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan appearance-none"
                            >
                                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Travel Style */}
                <div className="bg-surface border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-manara-cyan rounded-full"></span>
                        Travel Style
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <label className="text-xs uppercase font-bold text-gray-500 mb-3 block">Traveler Type</label>
                            <div className="flex flex-wrap gap-2">
                                {TRAVELERS.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => handleChange('travelerType', type)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${formData.travelerType === type
                                            ? 'bg-manara-cyan/20 border-manara-cyan text-manara-cyan'
                                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs uppercase font-bold text-gray-500 mb-3 block">Cost Preference</label>
                            <div className="flex bg-black/40 rounded-xl p-1 border border-white/10">
                                {COSTS.map(cost => (
                                    <button
                                        key={cost}
                                        onClick={() => handleChange('costPreference', cost)}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.costPreference === cost
                                            ? 'bg-white/10 text-white shadow-sm'
                                            : 'text-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        {cost}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>



                {/* Save Button */}
                <div className="flex justify-end pt-4 sticky bottom-6 z-10">
                    <button
                        onClick={handleSave}
                        className="px-8 py-4 bg-manara-cyan text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,234,255,0.3)] hover:shadow-[0_0_30px_rgba(0,234,255,0.5)] transition-all uppercase tracking-widest text-sm flex items-center gap-2"
                    >
                        Save Profile
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Toast */}
            {showToast && (
                <div className="fixed bottom-8 right-8 bg-surface border border-manara-cyan text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up z-50">
                    <div className="w-6 h-6 rounded-full bg-manara-cyan flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="font-medium">Profile updated successfully!</span>
                </div>
            )}
        </div>
    );
};

export default Preferences;
