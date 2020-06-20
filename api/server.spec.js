const supertest = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig')


const newUser = {
     username: 'nessssssssww',
     password: 'newPass'
}

const anotherUser = {
     username: 'asdfaaassasdfa',
     password: 'newPass'
}

it('should use testing environment', () => {
     expect(process.env.DB_ENV).toBe('testing')
})

describe('server.js', () => {
     describe(`Get '/'`, () => {
          it('should return status 200', () => {
               return supertest(server)
                    .get('/')
                    .then(res => {
                         expect(res.status).toBe(200)
                    })
          })
          it('should return JSON', () => {
               return supertest(server)
                    .get('/')
                    .then(res => {
                         expect(res.type).toMatch(/json/i)
                    })
          })
          it(`should return { api: "up" }`, () => {
               return supertest(server)
                    .get('/')
                    .then(res => {
                         expect(res.body.api).toBe('up')
                    })
          })
          it('should give us the entire object back on the res.body', () => {
               return supertest(server)
                     .get('/')
                     .then(res => {
                          expect(res.body).toEqual({ api: 'up' })
                     })
          })
     })
})

describe('auth-router', () => {
     afterEach(async () => {
          await db('users').truncate()   
     })
     describe('register', () => {
          it('should give us a 201 status', () => {
               return supertest(server)
                    .post('/api/auth/register')
                    .send(newUser)
                    .then(res => {
                         expect(res.status).toBe(201)
                    })
          })
          it('should save user', async () => {
               await supertest(server)
                    .post('/api/auth/register')
                    .send(anotherUser)
               
               let updatedUserList = await supertest(server)
                    .get('/api/users')
                    expect(updatedUserList.body.users).toHaveLength(1)
          })
     })

     describe('login', () => {
          it('should give a 201 message', async () => {
               await supertest(server)
                    .post('/api/auth/register')
                    .send(newUser)

               let login = await supertest(server)
                    .post('/api/auth/login')
                    .send(newUser)
                    expect(login.status).toBe(200)     

               let jokes = await supertest(server)
                    .get('/api/jokes')
                    expect(jokes.status).toBe(200)
          })
     })
})

describe('jokes', () => {
     it('should produce a list of jokes', () => {
          return supertest(server)
               .get('/api/jokes')
               .then(res => {
                    expect(res.status).toBe(200)
               })
})
     it('should give us the list lenght', () => {
          return supertest(server)
               .get('/api/jokes')
               .then(res => {
                    expect(res.body).toHaveLength(20)
               })
     })
})