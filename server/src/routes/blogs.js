const express = require('express');
const router = express.Router();

const {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  getBlog,
  getBlogsByUser,
} = require('../controllers/blogController.js');

// GET all Blogs
router.get('/', getBlogs);

// GET a single Blog
router.get('/:blogId', getBlog);

// GET all Blogs by User
router.get('/user/:id', getBlogsByUser);

// POST a new Blog
router.post('/', createBlog);

// DELETE a Blog
router.delete('/:id', deleteBlog);

// UPDATE a Blog
router.patch('/:id', updateBlog);

module.exports = router;
