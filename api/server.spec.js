const supertest = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig')


it('should use the testing environment', () => {
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