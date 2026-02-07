import React, { useMemo } from 'react';
import { useProfile } from '../../context/ProfileContext';

const ProfileHeader = () => {
    const { user, itineraries } = useProfile();

    const stats = useMemo(() => {
        const cities = [...new Set(itineraries.map(i => i.city))];
        const costs = itineraries.map(i => i.costPreference);

        // Simple mode calculation
        const mode = costs.sort((a, b) =>
            costs.filter(v => v === a).length - costs.filter(v => v === b).length
        ).pop() || 'Balanced';

        return {
            totalTrips: itineraries.length,
            cities: cities.slice(0, 3).join(', ') + (cities.length > 3 ? '...' : ''),
            avgCost: mode
        };
    }, [itineraries]);

    const initials = user.name
        ? user.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
        : 'T';

    return (
        <div className="bg-surface border border-white/10 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-manara-cyan/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-manara-cyan/20 to-blue-600/20 border border-manara-cyan/30 flex items-center justify-center shrink-0">
                <span className="text-3xl font-display font-bold text-manara-cyan tracking-widest">
                    {initials}
                </span>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left z-10">
                <h1 className="text-4xl font-display font-bold text-white mb-2">
                    {user.name || 'Traveler'}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-400 mb-6">
                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/5">
                        {user.travelerType || 'General'}
                    </span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/5">
                        {user.costPreference || 'Balanced'} Budget
                    </span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span>Based in {user.startingCity || 'UAE'}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{stats.totalTrips}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Trips Saved</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{stats.cities || '-'}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Cities</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
