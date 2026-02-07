const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to user
    title: String,
    city: String,
    travelerType: String,
    costPreference: String,
    timeline: Array, // Full JSON of the day plan
    metrics: Object, // { cost, heat, crowds }
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
