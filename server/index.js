require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Database Connection
const dbUri = process.env.MONGODB_URI;
console.log('Attempting DB Connection. URI detected:', dbUri ? 'YES' : 'NO');
if (!dbUri) console.warn('WARNING: MONGODB_URI is missing! Defaulting to localhost (will fail on Render).');

mongoose.connect(dbUri || 'mongodb://127.0.0.1:27017/manara')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
const authRoute = require('./routes/auth');
const itineraryRoute = require('./routes/itinerary');

app.use('/api/user', authRoute);
app.use('/api/itineraries', itineraryRoute);

app.get('/', (req, res) => {
    const states = { 0: 'Disconnected', 1: 'Connected', 2: 'Connecting', 3: 'Disconnecting' };
    const status = states[mongoose.connection.readyState] || 'Unknown';
    res.send(`MANARA API is running... <br>DB Status: <b>${status}</b>`);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
