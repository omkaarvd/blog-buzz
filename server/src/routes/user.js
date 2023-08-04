const express = require('express');
const router = express.Router();
const {
  login_user,
  signup_user,
  getUserById,
  getUser,
  updateUser,
  delete_user,
  getUserProfileImage,
} = require('../controllers/userControllers.js');

// login post route
router.post('/login', login_user);

// signup post route
router.post('/signup', signup_user);

// GET a user by ID
router.get('/:id', getUserById);

// UPDATE a user
router.patch('/:id', updateUser);

// GET a user
router.get('/', getUser);

// delete a user and all its blogs
router.delete('/:id', delete_user);

router.post('/image', getUserProfileImage);

module.exports = router;
