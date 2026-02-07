const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, startingCity } = req.body;

        // Check if user exists
        const emailExist = await User.findOne({ email });
        if (emailExist) return res.status(400).send('Email already exists');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            startingCity: startingCity || 'Dubai'
        });

        const savedUser = await user.save();

        // Create Token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secretKey');
        res.header('auth-token', token).send({ token, user: { name: savedUser.name, email: savedUser.email, startingCity: savedUser.startingCity } });

    } catch (err) {
        res.status(400).send(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Email is not found');

        // Check password
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Invalid password');

        // Create Token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secretKey');
        res.header('auth-token', token).send({
            token,
            user: {
                name: user.name,
                email: user.email,
                startingCity: user.startingCity,
                travelerType: user.travelerType,
                costPreference: user.costPreference,
                foodChoices: user.foodChoices
            }
        });

    } catch (err) {
        res.status(400).send(err);
    }
});

// GET CURRENT USER
router.get('/me', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
        const user = await User.findById(verified._id);
        res.json({
            name: user.name,
            email: user.email,
            startingCity: user.startingCity,
            travelerType: user.travelerType,
            costPreference: user.costPreference,
            foodChoices: user.foodChoices
        });
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
});

module.exports = router;

