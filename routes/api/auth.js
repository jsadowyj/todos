require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

const router = express.Router();

// @route   POST /api/register
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
    // Validate input with express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // Destructure name email and password from request body
    const { name, email, password } = req.body;

    try {
      // Check to see if there is a user with that email
      const userMatch = await User.findOne({ email });

      // if the user already exists return a 400
      if (userMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });

      // Hash password with 10 rounds
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new User
      const user = new User({ name, email, password: hashedPassword });

      // Save user into the database
      await user.save();

      // Create a new JWT token with userId stored in the payload
      const token = jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET,
        { expiresIn: '5 days' }
      );

      // Return 201 along with the JWT token
      res.status(201).json({ token });
    } catch (err) {
      throw err;
    }
  }
);

// @route   POST /api/login
// @desc    Login user and send token
// @access  Public
router.post(
  '/api/login',
  [
    check('email', 'Please enter a valid email.').isEmail(),
    check('password', 'Please enter a password.').exists(),
  ],
  async (req, res) => {
    // Validate inputs with express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // Destructure email and password from request body
    const { email, password } = req.body;

    try {
      // Find a user with matching email
      const user = await User.findOne({ email });

      // if there is no match return a 400
      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });

      // compare hashed password and plain-text password
      const isMatch = await bcrypt.compare(password, user.password);

      // if the passwords don't match a return a 400
      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });

      // Create a new JWT with the userId as the payload
      const token = jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET,
        {
          expiresIn: '5 days',
        }
      );

      // Respond with the token
      res.status(201).json({ token });
    } catch (err) {
      throw err;
    }
  }
);

// @route   GET /api/user
// @desc    Respond with user data minus the password (of course)
// @access  Private
router.get('/api/user', auth, async (req, res) => {
  try {
    // Find a user that matches with request's userId
    const user = await User.findById(req.user.id).select('-password');
    // if there is no user respond with a 404
    if (!user)
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    // Respond with user data
    res.json(user);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
