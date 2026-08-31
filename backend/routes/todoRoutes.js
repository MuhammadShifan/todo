const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const verifyToken = require('../middleware/auth');

// Get All Todos for Authenticated User
router.get('/', verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Create a New Todo
router.post('/', verifyToken, async (req, res) => {
  try {
    const newTodo = new Todo({ userId: req.user.userId, text: req.body.text });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Delete a Todo
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Todo Deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;