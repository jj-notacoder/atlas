const router = require('express').Router();
const Itinerary = require('../models/Itinerary');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verify = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

// GET ALL ITINERARIES FOR USER
router.get('/', verify, async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(itineraries);
    } catch (err) {
        res.status(400).send(err);
    }
});

// CREATE ITINERARY
router.post('/', verify, async (req, res) => {
    const itinerary = new Itinerary({
        userId: req.user._id,
        title: req.body.title,
        city: req.body.city,
        travelerType: req.body.travelerType,
        costPreference: req.body.costPreference,
        timeline: req.body.timeline,
        metrics: req.body.metrics
    });

    try {
        const savedItinerary = await itinerary.save();
        res.send(savedItinerary);
    } catch (err) {
        res.status(400).send(err);
    }
});

// DELETE ITINERARY
router.delete('/:id', verify, async (req, res) => {
    try {
        const removedItinerary = await Itinerary.deleteOne({ _id: req.params.id, userId: req.user._id });
        res.json(removedItinerary);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
