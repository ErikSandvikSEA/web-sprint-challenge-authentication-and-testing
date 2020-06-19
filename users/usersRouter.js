const router = require('express').Router()

const Users = require('./usersModel')
const restricted = require('../auth/authenticate-middleware')

router.get(
     '/', 
     // restricted, 
     (req, res) => {
     Users.findUsers()
          .then(users => {
               res.status(200).json({
                    users: users
               })
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({
                    message: 'Error occurred while fetching users',
                    error: err
               })
          })
})

module.exports = router