const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require('../controllers/user.controllers');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
