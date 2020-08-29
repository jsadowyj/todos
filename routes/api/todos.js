require('dotenv').config();
const express = require('express');
const { check, validationResult } = require('express-validator');

const Todo = require('../../models/Todo');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const router = express.Router();

// @route   GET /api/todos
// @desc    Get all user's todos by user id
// @access  Private
router.get('/api/todos', auth, async (req, res, next) => {
  try {
    // Find all todos where user is equal to current user
    const todos = await Todo.find({ user: req.user.id });

    // Return json of matching todos
    return res.json({ todos });
  } catch (err) {
    // Pass error onto express error handling function
    next(err);
  }
});

// @route   GET /api/todos/:id
// @desc    Get todo from todo id
// @access  Private
router.get(
  '/api/todos/:id',
  auth,
  checkObjectId('id'),
  async (req, res, next) => {
    try {
      // Destructure id property from request parameters
      const { id } = req.params;

      // Find one todo with id from paramter
      const todo = await Todo.findById(id);

      // if no todo is found then send a 404
      if (!todo)
        return res
          .status(404)
          .json({ errors: [{ msg: 'Not found', status: 404 }] });

      // if todos userId does not match the requests userId return 401
      // this is to make sure that a random person can't see your todos
      if (todo.user.toString() !== req.user.id.toString())
        return res
          .status(401)
          .json({ errors: [{ msg: 'Unauthorized', status: 401 }] });

      // return todo json
      return res.json(todo);
    } catch (err) {
      next(err);
    }
  }
);

// @route   POST /api/todos
// @desc    Add a new todo
// @access  Private
router.post(
  '/api/todos',
  auth,
  check('content').isString().isLength({ min: 1 }),
  async (req, res, next) => {
    // check for any express-validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      // Destructure content property from request body
      const { content } = req.body;

      // Create a new todo with content and user (from auth middleware)
      const todo = new Todo({ content, user: req.user.id });

      // Save todo into the database
      await todo.save();

      // Return todo with status 201
      return res.status(201).json(todo);
    } catch (err) {
      next(err);
    }
  }
);

// @route   PUT /api/todos/:id
// @desc    Update a todo
// @access  Private
router.put(
  '/api/todos/:id',
  auth,
  checkObjectId('id'),
  async (req, res, next) => {
    try {
      // Destructure id from request parameters
      const { id } = req.params;

      // Find the matching todo
      const todo = await Todo.findById(id);

      // if no todo is found then return a 404
      if (!todo)
        return res
          .status(404)
          .json({ errors: [{ msg: 'Not found', status: 404 }] });

      // if todos userId does not match the requests userId return 401
      if (todo.user.toString() !== req.user.id)
        return res
          .status(401)
          .json({ errors: [{ msg: 'Unauthorized', status: 401 }] });

      // Destructure content and completed properties
      const { content, completed } = req.body;

      // Handle the case of no content and no completed value specified
      if (!content && typeof completed === 'undefined')
        return res.status(400).json({
          errors: [
            {
              msg: 'Bad Request',
              status: 400,
            },
          ],
        });

      // if there is content specified modify it
      if (content) todo.content = content;

      // if there is a completed value specified modify it
      if (typeof completed !== 'undefined') todo.completed = completed;

      // Save updated todo into database
      await todo.save();

      // Return todo with status 200
      return res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }
);

// @route   DELETE /api/todos/:id
// @desc    Delete a todo by id
// @access  Private
router.delete(
  '/api/todos/:id',
  auth,
  checkObjectId('id'),
  async (req, res, next) => {
    // Destructure id from request parameters
    const { id } = req.params;

    try {
      // Try to find todo with a matching id
      const todo = await Todo.findById(id);

      // if no todo is found return 404
      if (!todo)
        return res
          .status(404)
          .json({ errors: [{ msg: 'Not found', status: 404 }] });

      // if users don't match return a 401
      if (todo.user.toString() !== req.user.id)
        return res
          .status(401)
          .json({ errors: [{ msg: 'Unauthorized', status: 401 }] });

      // Remove todo from the database
      await todo.remove();

      // Return a success message
      return res.json({ msg: 'Todo Removed', status: 200 });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
