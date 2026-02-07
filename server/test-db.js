require('dotenv').config();
const mongoose = require('mongoose');

// Use the same connection logic as server/index.js
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/manara';
console.log(`Connecting to: ${uri}`);

mongoose.connect(uri)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });
