const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();
const sessionConfig = {
    name: "monster",
    secret: "know nothing",
    cookie: {
      maxAge: 1000 * 60 * 30,
      secure: false, //true in production to send only over https
      httpOnly: true, // true means no access from JS
    },
    resave: false,
    saveUninitialized: true, //GDPR laws require to check with client
  }

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req, res) => {
    res.json({serverStatus: "🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️"});
})

module.exports = server;
