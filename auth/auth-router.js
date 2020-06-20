
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
  const credentials = req.body
  if(isValid(credentials)) {
    Users.findByUsername(credentials.username)
      .then(([user]) => {
        //compare the password the hash stored in the database
        console.log('user', user)
        if(user && bcryptjs.compareSync(credentials.password, user.password)){
          const token = createToken(user)
          res.status(200).json({
            token: token,
            message: `Welcome, ${user.username}!`,
          })
        } else {
          res.status(401).json({
            message: 'Invalid login credentials'
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err,
          message: 'Error occurred during login'
        })
      })
  } else {
    res.status(400).json({
      message: 'Provide valide username and password'
    })
  }
});

//Create Token middleware
function createToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  }
  const secret = constants.jwtSecret
  const options ={
    expiresIn: '1d'
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
