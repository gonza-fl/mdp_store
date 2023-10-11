const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authentication = async (req, res) => {
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

module.exports = {
  authentication,
};
