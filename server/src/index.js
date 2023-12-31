require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const sequelize = require('./configs/db');
const authRouter = require('./routes/auth.routes');
const examplesRouter = require('./routes/examples.routes');
const usersRouter = require('./routes/users.routes');
const server = express();
const PORT = process.env.PORT;

server.use(express.json());
server.use(morgan('dev'));

server.use('/auth', authRouter);
server.use('/examples', examplesRouter);
server.use('/users', usersRouter);

sequelize
  .sync({ force: false, alter: false })
  .then(() => {
    console.log('Database connected');
    server.listen(PORT, () => console.log('Server on port', PORT));
  })
  .catch((err) => {
    console.log(err);
  });
