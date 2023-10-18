const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getUsers = async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        'user_name',
        'first_name',
        'last_name',
        'email',
        'createdAt',
        'updatedAt',
      ],
    });
    return res.status(200).json({
      message: 'Find users successfully',
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const payload = req.body;
    // const user = new User(payload);
    // await user.save();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(payload.password, salt);
    payload.password = hash;

    const [user, created] = await User.findOrCreate({
      where: { email: payload.email },
      defaults: payload,
    });
    if (!created) {
      return res.status(400).json({
        message: 'User email already exists',
        userEmail: payload.email,
      });
    }
    return res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      attributes: ['id', 'user_name', 'password'],
      where: {
        email,
      },
    });
    let isCorrect;
    if (user) isCorrect = bcrypt.compareSync(password, user.password);
    if (!user || !isCorrect) {
      return res.status(401).json({
        message: 'Unauthorized, incorect email or password',
        user: [],
      });
    }
    const token = jwt.sign(
      {
        user_id: user.id,
        user_name: user.user_name,
      },
      'Meeska Mooska Mickey Mouse!',
      { expiresIn: 60 * 15 }
    );
    return res.status(200).json({
      message: 'Success login',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user)
      return res.status(200).json({
        message: 'User found',
        user,
      });
    return res.status(404).json({
      message: 'User not found',
      user: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const user = await User.update(payload, { where: { id } });
    if (user)
      return res.status(200).json({
        message: 'User updated',
        user,
      });
    return res.status(404).json({
      message: 'User not found',
      user: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      user.destroy();
      return res.status(200).json({
        message: 'User Deleted',
        user: [1],
      });
    }
    return res.status(404).json({
      message: 'User not found',
      user: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
  loginUser,
};
