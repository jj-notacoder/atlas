import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Local Images - Places
import imgLouvre from '../assets/pictures/louvre.jpg';
import imgMosque from '../assets/pictures/grand mosque.webp';
import imgJebelJais from '../assets/pictures/jebel-jais.avif';
import imgMoF from '../assets/pictures/mof.jpg';
import imgSharjahArt from '../assets/pictures/Sharjah+Art+Foundation.webp';
import imgHatta from '../assets/pictures/Hatta-Dam-2-1.jpg';
import imgYas from '../assets/pictures/yas.jpg';
import imgAjman from '../assets/pictures/Ajman-Dhow-Yard.png';


// Import Local Images - Cuisine
import imgMachboos from '../assets/pictures/machboos.jpg';
import imgHarees from '../assets/pictures/harees.jpg';
import imgLuqaimat from '../assets/pictures/luqaimat.jpg';
import imgCamelCoffee from '../assets/pictures/camel coffee.jpg';
import imgGrilledFish from '../assets/pictures/grilled fish.jpg';
import imgBalaleet from '../assets/pictures/balaleet.jpg';
import imgKarak from '../assets/pictures/karak.jpg';
// No local image for Mix Grill found, using remote fallback for now

const places = [
    {
        id: 1,
        name: "Louvre Abu Dhabi",
        location: "Abu Dhabi · Saadiyat",
        tags: ["Indoor", "Cultural", "Art"],
        image: imgLouvre,
        description: "A global art institution designed for heat-adaptive exploration.",
        bestTime: "Morning",
        crowds: "Moderate",
        why: "High cultural value, indoor galleries ideal during peak heat.",
        context: "The 'Rain of Light' dome creates a microclimate, reducing temperature by up to 5°C.",
        duration: "3-4 Hours",
        cost: "Medium"
    },
    {
        id: 2,
        name: "Sheikh Zayed Grand Mosque",
        location: "Abu Dhabi",
        tags: ["Cultural", "Iconic", "Indoor/Outdoor"],
        image: imgMosque,
        description: "A masterpiece of modern Islamic architecture and peace.",
        bestTime: "Sunset",
        crowds: "High",
        why: "Sunset provides the most stunning lighting changes on the white marble.",
        context: "Features 82 domes, more than 1,000 columns, and 24-carat gold gilded chandeliers.",
        duration: "2 Hours",
        cost: "Free"
    },
    {
        id: 3,
        name: "Yas Island Leisure Hub",
        location: "Abu Dhabi · Yas",
        tags: ["Adventure", "Family", "Theme Parks"],
        image: imgYas,
        description: "Home to Ferrari World, Warner Bros, and Yas Waterworld.",
        bestTime: "All Day",
        crowds: "High",
        why: "The ultimate entertainment district with world-class indoor theme parks.",
        context: "Includes Ferrari World (fastest coaster), Warner Bros (fully indoor), and Yas Waterworld.",
        duration: "Full Day",
        cost: "High"
    },
    {
        id: 4,
        name: "Museum of the Future",
        location: "Dubai · Downtown",
        tags: ["Indoor", "Future", "Tech"],
        image: imgMoF,
        description: "A gateway to the world entirely imagined 50 years from now.",
        bestTime: "Afternoon",
        crowds: "Very High",
        why: "Perfect escape from the midday sun into a climate-controlled future.",
        context: "The calligraphy on the exterior quotes Sheikh Mohammed bin Rashid Al Maktoum.",
        duration: "2-3 Hours",
        cost: "High"
    },
    {
        id: 5,
        name: "Jebel Jais Adventure",
        location: "Ras Al Khaimah",
        tags: ["Outdoor", "Adventure", "Mountain"],
        image: imgJebelJais,
        description: "The world's longest zipline through the rugged Hajar peaks.",
        bestTime: "Early Morning",
        crowds: "High",
        why: "Cooler mountain air makes this feasible even when cities are hot.",
        context: "Temperatures at the summit are typically 10°C cooler than sea level.",
        duration: "2 Hours",
        cost: "High"
    },
    {
        id: 6,
        name: "Sharjah Art Foundation",
        location: "Sharjah",
        tags: ["Indoor/Outdoor", "Art", "Heritage"],
        image: imgSharjahArt,
        description: "Contemporary art spaces woven into heritage coral houses.",
        bestTime: "Afternoon",
        crowds: "Low",
        why: "A quiet, contemplative space blending AC galleries with shaded courtyards.",
        context: "Host of the Sharjah Biennial, a leading platform for contemporary art.",
        duration: "3 Hours",
        cost: "Variable"
    },
    {
        id: 7,
        name: "Hatta Dam",
        location: "Dubai · Hatta",
        tags: ["Outdoor", "Nature", "Kayaking"],
        image: imgHatta,
        description: "Turquoise waters surrounded by rugged mountains.",
        bestTime: "Winter Morning",
        crowds: "High (Weekends)",
        why: "Kayaking here is significantly cooler than the city due to altitude.",
        context: "Part of the Hajar Mountain range enclave of Dubai.",
        duration: "4 Hours",
        cost: "Low"
    },
    {
        id: 8,
        name: "Ajman Dhow Yard",
        location: "Ajman",
        tags: ["Outdoor", "Heritage", "Craft"],
        image: imgAjman,
        description: "The world's largest dhow-building center, still active today.",
        bestTime: "Morning",
        crowds: "Low",
        why: "Witness the ancient craft of boat building first-hand.",
        context: "Craftsmen use traditional tools to build massive wooden vessels for trade.",
        duration: "1 Hour",
        cost: "Free"
    },

];

const cuisine = [
    {
        id: 101,
        name: "Traditional Mix Grill",
        category: "Regional Classic",
        description: "Charcoal-grilled lamb chops, kebabs, and shish tawook.",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
        tip: "Best enjoyed with fresh hot bread and garlic sauce.",
        window: "Lunch / Dinner",
        cost: "Medium",
        bestPlaces: [
            { name: "Al Fanar Restaurant", note: "Classic Emirati/Khaleeji grills in a heritage setting." },
            { name: "Al Mallah (Satwa)", note: "Legendary late-night grill spot. No frills, serious flavor." },
            { name: "Reem Al Bawadi", note: "Consistently strong Levant-style mixed grills, family-friendly." }
        ]
    },
    {
        id: 102,
        name: "Emirati Machboos",
        category: "Emirati",
        description: "Slow-cooked spiced chicken or lamb with fragrant rice.",
        image: imgMachboos,
        tip: "Authentic versions use dried lemons (loomi) for tanginess.",
        window: "Lunch",
        cost: "Medium",
        bestPlaces: [
            { name: "Al Khayma Heritage", note: "One of the most authentic Emirati kitchens still operating." },
            { name: "Arabian Tea House", note: "Reliable, cultural, and tourist-friendly." },
            { name: "Meylas", note: "Modern Emirati home-style cooking, highly respected." }
        ]
    },
    {
        id: 103,
        name: "Harees",
        category: "Heritage",
        description: "Wheat and meat slow-cooked until it becomes a porridge consistency.",
        image: imgHarees,
        tip: "A staple of Ramadan, rich and hearty.",
        window: "Dinner",
        cost: "Medium",
        bestPlaces: [
            { name: "Logma", note: "Clean, modern Emirati comfort food. Very accessible." },
            { name: "Al Fanar Restaurant", note: "Traditional preparation, especially during Ramadan." },
            { name: "Ramadan Tents", note: "Seasonal, but often the best version." }
        ]
    },
    {
        id: 104,
        name: "Luqaimat",
        category: "Dessert",
        description: "Crispy sweet dumplings drizzled with date syrup (dibbs).",
        image: imgLuqaimat,
        tip: "Crunchy outside, soft inside. Best with Arabic coffee.",
        window: "Evening",
        cost: "Low",
        bestPlaces: [
            { name: "Al Fanar Restaurant", note: "Reliable classic." },
            { name: "Arabian Tea House", note: "Light, well-balanced, not overly sweet." },
            { name: "Global Village", note: "Surprisingly good traditional stalls (Seasonal)." }
        ]
    },
    {
        id: 105,
        name: "Camel Milk Coffee",
        category: "Modern Fusion",
        description: "A rich, slightly salty alternative to dairy milk latte.",
        image: imgCamelCoffee,
        tip: "Lower in fat and rich in vitamins.",
        window: "Morning",
        cost: "Medium",
        bestPlaces: [
            { name: "Camelicious Café", note: "The authority on camel milk products." },
            { name: "Specialty Cafés", note: "Ask for camel milk latte or flat white." },
            { name: "Heritage Festivals", note: "Often served traditionally." }
        ]
    },
    {
        id: 106,
        name: "Grilled Fish (Masgouf style)",
        category: "Seafood",
        description: "Fresh catch marinated in spicy paste and deep fried/grilled.",
        image: imgGrilledFish,
        tip: "Go for the catch of the day.",
        window: "Dinner",
        cost: "Low/Medium",
        bestPlaces: [
            { name: "Bu Qtair", note: "Legendary seafood spot. Minimal menu, maximum quality." },
            { name: "Dampa Seafood Grill", note: "Casual but consistently good." },
            { name: "Fish Market (IC)", note: "Choose-your-fish, Gulf-style preparation." }
        ]
    },
    {
        id: 107,
        name: "Balaleet",
        category: "Breakfast",
        description: "Sweet vermicelli noodles topped with a savory saffron omelet.",
        image: imgBalaleet,
        tip: "The ultimate sweet & savory breakfast combo.",
        window: "Breakfast",
        cost: "Medium",
        bestPlaces: [
            { name: "Logma", note: "Probably the most consistent balaleet in the UAE." },
            { name: "Arabian Tea House", note: "Traditional breakfast-style preparation." },
            { name: "Local Cafés", note: "Especially in Sharjah & Dubai old areas." }
        ]
    },
    {
        id: 108,
        name: "Karak Chai",
        category: "Street",
        description: "Strong black tea simmered with milk, cardamom, and saffron.",
        image: imgKarak,
        tip: "The fuel of the nation.",
        window: "Anytime",
        cost: "Very Low",
        bestPlaces: [
            { name: "Ravi Restaurant", note: "Famous, strong, unapologetic karak." },
            { name: "FiLLi Café", note: "The mainstream standard. Consistent everywhere." },
            { name: "Karak House", note: "Often the best, especially late night." }
        ]
    }
];

const Card = ({ item, onClick, type }) => (
    <motion.div
        layoutId={`card-${item.id}`}
        onClick={() => onClick(item)}
        whileHover={{ y: -5 }}
        className="group relative h-[400px] w-full bg-gray-900 rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-atlas-cyan/50 transition-colors duration-300"
    >
        <div className="absolute inset-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            {type === 'place' && (
                <div className="text-xs font-bold text-atlas-cyan uppercase tracking-widest mb-2">{item.location}</div>
            )}
            {type === 'cuisine' && (
                <div className="text-xs font-bold text-atlas-cyan uppercase tracking-widest mb-2">{item.category}</div>
            )}

            <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
            <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                {item.description}
            </p>

            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                {type === 'place' ? item.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/10 px-2 py-1 rounded text-white backdrop-blur-sm">{tag}</span>
                )) : (
                    <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white backdrop-blur-sm">{item.tip}</span>
                )}
            </div>
        </div>
    </motion.div>
);

const Modal = ({ item, onClose, type }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        <motion.div
            layoutId={`card-${item.id}`}
            className="relative w-full max-w-4xl bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        >
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-full relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                        <button onClick={onClose} className="p-2 bg-black/50 rounded-full text-white hover:bg-atlas-cyan/50 transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center max-h-[80vh] overflow-y-auto">
                    <div className="text-atlas-cyan font-bold uppercase tracking-widest text-sm mb-2">
                        {type === 'place' ? item.location : item.category}
                    </div>
                    <h2 className="text-4xl font-display font-bold text-white mb-6">{item.name}</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        {item.description}
                    </p>

                    {/* Cuisine: Best Places List */}
                    {type === 'cuisine' && item.bestPlaces && (
                        <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                            <h4 className="text-white font-bold text-sm uppercase mb-4 tracking-widest text-atlas-cyan">Best Places to Try</h4>
                            <ul className="space-y-4">
                                {item.bestPlaces.map((place, index) => (
                                    <li key={index} className="flex flex-col">
                                        <span className="text-white font-bold text-base">{place.name}</span>
                                        <span className="text-gray-400 text-sm">{place.note}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Place: Context */}
                    {type === 'place' && (
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-1 h-12 bg-white/10 rounded-full"></div>
                                <div>
                                    <h4 className="text-white font-bold text-sm uppercase">Curator's Note</h4>
                                    <p className="text-gray-400 text-sm mt-1">{item.context}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-8 border-t border-white/5 pt-6">
                        {type === 'place' ? (
                            <>
                                <div><span className="block text-gray-600 uppercase text-[10px]">Best Time</span>{item.bestTime}</div>
                                <div><span className="block text-gray-600 uppercase text-[10px]">Duration</span>{item.duration}</div>
                                <div><span className="block text-gray-600 uppercase text-[10px]">Crowds</span>{item.crowds}</div>
                                <div><span className="block text-gray-600 uppercase text-[10px]">Cost</span>{item.cost}</div>
                            </>
                        ) : (
                            <>
                                <div><span className="block text-gray-600 uppercase text-[10px]">Cuisine Type</span><span className="text-white">{item.category}</span></div>
                                <div><span className="block text-gray-600 uppercase text-[10px]">Window</span>{item.window}</div>
                                <div><span className="block text-gray-600 uppercase text-[10px]">Cost</span>{item.cost}</div>
                            </>
                        )}
                    </div>

                    <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-atlas-cyan transition-colors flex items-center justify-center gap-2">
                        {type === 'place' ? 'Add to Itinerary' : 'Save to Food List'}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
);

const Essentials = () => {
    const [activeTab, setActiveTab] = useState('places');
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <section id="essentials" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="mb-16 md:flex justify-between items-end">
                    <div>
                        <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
                            The Essentials
                        </h2>
                        <p className="text-xl text-gray-400 max-w-xl">
                            Flagship experiences and cuisine worth your time—adapted to where you are and how you travel.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mt-8 md:mt-0 bg-white/5 p-1 rounded-full border border-white/10">
                        <button
                            onClick={() => setActiveTab('places')}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all ${activeTab === 'places' ? 'bg-atlas-cyan text-black shadow-[0_0_20px_rgba(0,234,255,0.2)]' : 'text-gray-400 hover:text-white'}`}
                        >
                            Places
                        </button>
                        <button
                            onClick={() => setActiveTab('cuisine')}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all ${activeTab === 'cuisine' ? 'bg-atlas-cyan text-black shadow-[0_0_20px_rgba(0,234,255,0.2)]' : 'text-gray-400 hover:text-white'}`}
                        >
                            Cuisine
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <AnimatePresence mode="popLayout">
                        {activeTab === 'places' ? (
                            places.map(place => (
                                <Card key={place.id} item={place} type="place" onClick={setSelectedItem} />
                            ))
                        ) : (
                            cuisine.map(dish => (
                                <Card key={dish.id} item={dish} type="cuisine" onClick={setSelectedItem} />
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* View More Link */}


            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <Modal
                        item={selectedItem}
                        type={activeTab === 'places' ? 'place' : 'cuisine'}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>

        </section>
    );
};

export default Essentials;
