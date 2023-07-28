const User = require('../models/user_model.js');
const Blogs = require('../models/blog_model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { getIdFromHeader } = require('../helper/getIdFromHeader.js');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '15d',
    }
  );
};

// get user by id
const getUserNameById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json(user.name);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get user
const getUser = async (req, res) => {
  const userId = getIdFromHeader(req.headers['x-access-token']);
  try {
    const user = await User.findOne({ _id: userId }).select('-password');
    if (!user) throw new Error('User not found');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    if (!name) throw new Error('Name is required');
    if (!validator.isLength(name, { min: 3, max: 20 })) {
      throw new Error('Name must be between 3 and 20 characters');
    }
    await User.findOneAndUpdate({ _id: id }, { name });
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error('All fields must be filled out');

    const user = await User.findOne({ email });
    if (!user) throw Error('Invalid credentials');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new Error('Invalid credentials');
    const token = generateToken(user);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signup_user = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw Error('All fields must be filled out');
    }

    if (!validator.isEmail(email)) {
      throw Error('Invalid Email Address');
    }

    if (!validator.isStrongPassword(password)) {
      throw Error('Password is not strong enough');
    }

    if (!validator.isLength(name, { min: 3, max: 20 })) {
      throw Error('Name must be between 3 and 20 characters');
    }

    const emailExists = await User.findOne({ email });
    const nameExists = await User.findOne({ name });
    if (emailExists) throw Error('Email already in use');
    if (nameExists) throw Error('Name already in use');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hash });

    const token = generateToken(user);

    res
      .status(200)
      .json({ id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const delete_user = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndDelete({ _id: id }).select('-password');
    if (!user) throw new Error('User not found');

    await Blogs.deleteMany({ createdBy: id });

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login_user,
  signup_user,
  getUserNameById,
  getUser,
  updateUser,
  delete_user,
};
