const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        
        const isBlacklisted = await blackListTokenModel.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted. Unauthorized' });
        }

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'User not found. Unauthorized' });
        }

        
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid token. Unauthorized' });
    }
};

// Middleware for captain authentication
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await blackListTokenModel.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted. Unauthorized' });
        }

        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the captain associated with the decoded ID
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: 'Captain not found. Unauthorized' });
        }

        // Attach the captain data to the request object
        req.captain = captain;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid token. Unauthorized' });
    }
};
