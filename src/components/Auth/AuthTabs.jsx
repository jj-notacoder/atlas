import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';

const CITIES = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ras Al Khaimah', 'Fujairah', 'Ajman', 'Umm Al Quwain'];

const AuthTabs = () => {
    const { login, signup, error } = useProfile();
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        startingCity: 'Dubai'
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (mode === 'login') {
            await login(formData.email, formData.password);
        } else {
            await signup(formData);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto bg-surface border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex mb-8 border-b border-white/10">
                <button
                    onClick={() => setMode('login')}
                    className={`flex-1 pb-4 text-sm font-bold uppercase tracking-widest transition-colors ${mode === 'login' ? 'text-manara-cyan border-b-2 border-manara-cyan' : 'text-gray-500 hover:text-white'}`}
                >
                    Sign In
                </button>
                <button
                    onClick={() => setMode('register')}
                    className={`flex-1 pb-4 text-sm font-bold uppercase tracking-widest transition-colors ${mode === 'register' ? 'text-manara-cyan border-b-2 border-manara-cyan' : 'text-gray-500 hover:text-white'}`}
                >
                    Create Account
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {mode === 'register' && (
                    <div>
                        <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan"
                            placeholder="Your Name"
                        />
                    </div>
                )}

                <div>
                    <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">Password</label>
                    <input
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan"
                        placeholder="••••••••"
                    />
                </div>

                {mode === 'register' && (
                    <div>
                        <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">Starting City</label>
                        <select
                            name="startingCity"
                            value={formData.startingCity}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-manara-cyan appearance-none"
                        >
                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl">
                        {typeof error === 'string' ? error : 'Authentication failed. Please check your details.'}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-manara-cyan text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,234,255,0.3)] hover:shadow-[0_0_30px_rgba(0,234,255,0.5)] transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Profile')}
                </button>
            </form>
        </div>
    );
};

export default AuthTabs;
