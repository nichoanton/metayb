const express = require('express');
const { assembleBike, getLogs, getAssemblyLogsGrouped  } = require('../controllers/bikeController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/assemble', protect, assembleBike);
router.get('/logs', protect, getLogs);
router.get('/assembly-logs', protect, getAssemblyLogsGrouped);

module.exports = router;
