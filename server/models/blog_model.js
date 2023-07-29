const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: String,
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    comments: {
      type: [
        {
          comment: String,
          commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.models.blogs || mongoose.model('blogs', blogSchema);

module.exports = Blog;
