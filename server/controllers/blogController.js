const Blogs = require('../models/blog_model.js');
const User = require('../models/user_model.js');
const mongoose = require('mongoose');

const { getIdFromHeader } = require('../helper/getIdFromHeader.js');

const createBlog = async (req, res) => {
  const id = getIdFromHeader(req.headers['x-access-token']);
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Please fill in all the fields' });
  }

  try {
    const blog = await Blogs.create({ createdBy: id, title, content });

    await User.findOneAndUpdate({ _id: id }, { $push: { blogsRef: blog._id } });

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// single blog
const getBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blogs.find({ _id: blogId });
    res.status(200).json(blog.at(0));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBlogsByUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const blogs = await Blogs.find({ createdBy: userId });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const UserId = getIdFromHeader(req.headers['x-access-token']);
  const { id: BlogId } = req.params;
  console.log(BlogId);

  if (!mongoose.Types.ObjectId.isValid(BlogId)) {
    return res.status(404).json({ error: 'No such Blog' });
  }

  try {
    const blog = await Blogs.findOneAndDelete({
      _id: BlogId,
      createdBy: UserId,
    });
    if (!blog) {
      // this means that BlogId and UserId don't match for same blog
      return res.status(401).json({ error: 'Unauthorized Request!' });
    }
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBlog = async (req, res) => {
  const UserId = getIdFromHeader(req.headers['x-access-token']);
  const { id: BlogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(BlogId)) {
    return res.status(404).json({ error: 'No such Blog' });
  }

  const { title, content, likes, comment } = req.body;

  if (title !== undefined && content !== undefined) {
    try {
      const blog = await Blogs.findOneAndUpdate(
        { _id: BlogId, createdBy: UserId },
        { title, content },
        { new: true }
      );
      if (!blog) {
        // this means that BlogId and UserId don't match for same blog
        return res.status(401).json({ error: 'Unauthorized Request!' });
      }
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Only update likes if it is present in the request body
  if (likes !== undefined) {
    try {
      await Blogs.findOneAndUpdate(
        { _id: BlogId },
        {
          likes,
          $push: { likedBy: UserId },
        },
        { new: true }
      );
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Only update comments if it is present in the request body
  if (comment !== undefined) {
    try {
      const blog = await Blogs.findOneAndUpdate(
        { _id: BlogId },
        {
          $push: { comments: comment },
        },
        { new: true }
      );
      res.status(200).json(blog.comments.at(-1));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  createBlog,
  getBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  getBlogsByUser,
};
