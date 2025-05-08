const express = require('express');
const { verifyToken } = require('../config/firebase');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);

module.exports = router;