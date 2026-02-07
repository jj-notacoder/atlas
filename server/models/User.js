const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true }, // Auth identifier
    password: { type: String, required: true }, // Hashed password
    startingCity: { type: String, default: 'Dubai' },
    travelerType: { type: String, default: 'Explorer' },
    costPreference: { type: String, default: 'Balanced' },
    foodChoices: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
