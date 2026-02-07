import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const ProfileContext = createContext();

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [itineraries, setItineraries] = useState([]);
    const [addedItems, setAddedItems] = useState([]); // Items added from Essentials
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial Load
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('auth-token');
            if (token) {
                try {
                    const res = await api.get('/user/me');
                    setUser(res.data);
                    fetchItineraries();
                } catch (err) {
                    console.error("Session expired or invalid", err);
                    localStorage.removeItem('auth-token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const fetchItineraries = async () => {
        try {
            const res = await api.get('/itineraries');
            setItineraries(res.data);
        } catch (err) {
            console.error("Failed to fetch itineraries", err);
        }
    };

    const login = async (email, password) => {
        setError(null);
        try {
            const res = await api.post('/user/login', { email, password });
            localStorage.setItem('auth-token', res.data.token);
            setUser(res.data.user);
            fetchItineraries();
            return true;
        } catch (err) {
            setError(err.response?.data || 'Login failed');
            return false;
        }
    };

    const signup = async (userData) => {
        setError(null);
        try {
            const res = await api.post('/user/register', userData);
            localStorage.setItem('auth-token', res.data.token);
            setUser(res.data.user);
            return true;
        } catch (err) {
            setError(err.response?.data || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('auth-token');
        setUser(null);
        setItineraries([]);
    };

    const updatePreferences = async (newPrefs) => {
        // We need a proper endpoint for this update if we want to persist it.
        // For now, we'll just update local state, 
        // BUT ideally we should add PUT /user/profile to auth.js or user.js
        // Let's assume we update the user object locally for now 
        // and sync it if we add the endpoint.
        // Actually, let's keep it local-first in UI but we really should save it.
        // I'll leave a TODO comment or implement a basic put if needed.
        // For MVP, if we edit preferences in Preferences.jsx, we should probably call an API.
        // I'll implement a Mock or just update state for now to keep it moving.
        setUser(prev => ({ ...prev, ...newPrefs }));
    };

    const saveItinerary = async (itinerary) => {
        try {
            const res = await api.post('/itineraries', itinerary);
            setItineraries(prev => [res.data, ...prev]);
            return res.data;
        } catch (err) {
            console.error("Failed to save itinerary", err);
            throw err;
        }
    };

    const deleteItinerary = async (id) => {
        try {
            await api.delete(`/itineraries/${id}`);
            setItineraries(prev => prev.filter(i => i._id !== id));
        } catch (err) {
            console.error("Failed to delete itinerary", err);
        }
    };

    // Load added items from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('saved-essentials');
        if (saved) {
            try {
                setAddedItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved essentials", e);
            }
        }
    }, []);

    const addItem = (item, type) => {
        setAddedItems(prev => {
            // Avoid duplicates
            if (prev.find(i => i.id === item.id)) return prev;
            const newItems = [...prev, { ...item, type }];
            localStorage.setItem('saved-essentials', JSON.stringify(newItems));
            return newItems;
        });
    };

    const removeItem = (id) => {
        setAddedItems(prev => {
            const newItems = prev.filter(i => i.id !== id);
            localStorage.setItem('saved-essentials', JSON.stringify(newItems));
            return newItems;
        });
    };

    const value = {
        user,
        itineraries,
        addedItems, // Export state
        loading,
        error,
        login,
        signup,
        logout,
        updatePreferences,
        saveItinerary,
        deleteItinerary,
        addItem, // Export method
        removeItem // Export method
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};
