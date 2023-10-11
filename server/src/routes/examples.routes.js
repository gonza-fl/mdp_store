// Lo dejo a modo documentacion de la primera clase

const router = require('express').Router();

router.get('/:message', (req, res) => {
  const { message } = req.params;
  res.status(200).send(message);
});
router.get('/otra', (req, res) => res.send('Chau'));

router.post('/', (req, res) => res.status(404).json({ message: 'NOT FOUND' }));
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      'status-msg': 'Bad request',
      status: '400',
      'error-msg': 'El email y la password son requeridas',
    });
  }
  if (email === 'test1@test1.com' && password === '123456 holamundo') {
    res.status(200).json({ messege: 'Ok' });
  } else {
    res.status(400).json({ messege: 'Usuario o contraseña inconrrectas' });
  }
});

module.exports = router;
