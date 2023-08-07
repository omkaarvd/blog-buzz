import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  blogsRef: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
