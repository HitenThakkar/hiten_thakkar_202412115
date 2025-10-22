const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { createOrder } = require('../controllers/order');

router.post('/checkout', authenticate, createOrder);

module.exports = router;