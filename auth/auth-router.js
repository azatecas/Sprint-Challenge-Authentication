const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = require('express').Router();

const { jwtSecret } = require("../config/secret.js");
const Users = require('./auth-model.js');

const generateToken = (user) => {
  const payload = {
    username: user.username,
    }
  const options = {
    expiresIn: "30m"
  }
  return jwt.sign(payload, jwtSecret, options)
}


router.post('/register', (req, res) => {
  // implement registration
  const body = req.body;
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(body.password, ROUNDS);

    body.password = hash;

    Users
    .add(body)
    .then(user => {
        console.log('userINFO', body);
        res.status(201).json({user: user, hello: body.username});
    })
    .catch(err => res.status(500).json({errorMessage: err.message}))
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            welcome: user.username,
            token
          });
        } else {
          res.status(401).json({ message: "invalid credentials!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error finding user", error: err });
      });
});

module.exports = router;
