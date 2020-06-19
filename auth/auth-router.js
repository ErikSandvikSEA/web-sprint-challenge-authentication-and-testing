const router = require('express').Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../users/usersModel.js')

const { isValid } = require('../users/usersService.js')

const constants = require('../config/constants.js')

//REGISTRATION
router.post('/register', (req, res) => {
  const credentials = req.body
  if(isValid(credentials)){
    const rounds = process.env.BCRYPT_ROUNDS || 6

    //hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds)
    credentials.password = hash

    //save the user to the database
    Users.add(credentials)
      .then(user => {
        res.status(201).json({
          message: 'Successfully Registered!',
          newUser: user
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error occurred while registering',
          error: err
        })
      })
  } else {
    res.status(400).json({
      message: 'Invalid username/password'
    })
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
