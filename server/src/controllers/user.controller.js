const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    let user = await User.findOne({ firebaseUid: req.user.uid }).populate('scans');
    if (!user) {
      user = new User({ firebaseUid: req.user.uid, badges: [] });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Add badge if user has 5+ scans (example gamification)
    if (user.scans.length >= 5 && !user.badges.includes('Trusted Scanner')) {
      user.badges.push('Trusted Scanner');
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

module.exports = { getUserProfile, updateUserProfile };