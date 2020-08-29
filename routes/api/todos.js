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
    const todos = await Todo.find({ user: req.user.id });

    return res.json({ todos });
  } catch (err) {
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
      const { id } = req.params;

      const todo = await Todo.findById(id);

      if (!todo)
        return res
          .status(404)
          .json({ errors: [{ msg: 'Not found', status: 404 }] });

      if (todo.user.toString() !== req.user.id.toString())
        return res
          .status(401)
          .json({ errors: [{ msg: 'Unauthorized', status: 401 }] });

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
  check('content').isString(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { content } = req.body;

      const todo = new Todo({ content, user: req.user.id });

      await todo.save();

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
  check('content', 'Please input a valid content field.').isString(),
  checkObjectId('id'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { id } = req.params;

      const todo = await Todo.findById(id);

      if (!todo)
        return res
          .status(404)
          .json({ errors: [{ msg: 'Not found', status: 404 }] });

      if (todo.user.toString() !== req.user.id)
        return res
          .status(401)
          .json({ errors: [{ msg: 'Unauthorized', status: 401 }] });

      const { content } = req.body;

      todo.content = content;

      await todo.save();

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
    const { id } = req.params;

    try {
      const todo = await Todo.findById(id);

      if (!todo)
        return res
          .status(404)
          .json({ errors: [{ msg: 'Not found', status: 404 }] });

      if (todo.user.toString() !== req.user.id)
        return res
          .status(401)
          .json({ errors: [{ msg: 'Unauthorized', status: 401 }] });

      await todo.remove();

      return res.json({ msg: 'Todo Removed', status: 200 });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
