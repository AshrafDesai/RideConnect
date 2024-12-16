const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller');
const { query} = require('express-validator')
const { getCoordinates } = require('../controllers/map.controller');

router.get('/get-coordinates', 
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser, getCoordinates );


module.exports = router;