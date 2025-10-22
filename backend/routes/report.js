const express = require('express');
const router = express.Router();
const { getDailyRevenue, getCategoryAveragePrice } = require('../controllers/report');
const { authenticate, isAdmin } = require('../config/authMiddleware');
router.get('/daily-revenue', authenticate, isAdmin, getDailyRevenue);
router.get('/category-average', authenticate, isAdmin, getCategoryAveragePrice);
module.exports = router;