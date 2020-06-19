const db = require('../database/dbConfig')

module.exports = {
     findUsers,
     add,
     findById
}

function findUsers() {
     return db('users')
          .select('id', 'username', 'password')
          .orderBy('id')
}


async function add(user){
     try {
          const [id] = await db('users').insert(user, 'id')
          return findById(id)
     } catch (error){
          throw error
     }
}

function findById(id) {
     return db('users').where({ id }).first()
}