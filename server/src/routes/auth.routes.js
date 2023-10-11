const router = require('express').Router();
const { authentication } = require('../controllers/auth.controllers');

router.post('/', authentication);

module.exports = router;
