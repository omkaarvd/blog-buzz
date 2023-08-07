import { Router } from 'express';
import {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  getBlog,
  getBlogsByUser,
} from '../controllers/blogControllers';

const router = Router();

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

export default router;
