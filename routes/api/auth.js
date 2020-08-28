require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

const router = express.Router();

// @desc    Register User and send token
// @access  Public
router.post(
  '/api/register',
  [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Please enter a valid email.').isEmail(),
    check(
      'password',
      'Please make sure your password is at least 6 characters long.'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      const userMatch = await User.findOne({ email });

      if (userMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ name, email, password: hashedPassword });

      await user.save();

      const token = jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET,
        { expiresIn: '5 days' }
      );

      res.status(201).json({ token });
    } catch (err) {
      throw err;
    }
  }
);

// @desc    Authenticate (login) user and send token
// @access  Public
router.post(
  '/api/login',
  [
    check('email', 'Please enter a valid email.').isEmail(),
    check('password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });

      const token = jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET,
        {
          expiresIn: '5 days',
        }
      );

      res.status(201).json({ token });
    } catch (err) {
      throw err;
    }
  }
);

// @desc    Respond with user data minus the password (of course)
// @access  Private
router.get('/api/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user)
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    res.json(user);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
