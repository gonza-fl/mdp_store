const router = require('express').Router();

router.post('/', (_, res) => res.send('auth'));

module.exports = router;
