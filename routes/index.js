const express = require('express');
const router = express.Router();
const { createShortener, getShortcode, getStats } = require('../controllers/index')

router.post('/shorten', createShortener);
router.get('/:shortcode', getShortcode);
router.get('/:shortcode/stats', getStats);

module.exports = router;
