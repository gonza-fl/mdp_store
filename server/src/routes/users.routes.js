const router = require('express').Router();
const User = require('../models/User');

router
  .get('/', async (req, res) => {
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
  })
  .post('/', async (req, res) => {
    try {
      const payload = req.body;
      // const user = new User(payload);
      // await user.save();

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
  });

module.exports = router;
