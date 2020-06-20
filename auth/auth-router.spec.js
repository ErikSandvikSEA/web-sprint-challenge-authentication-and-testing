require('dotenv').config()

const supertest = require('supertest')
const db = require('../database/dbConfig')

const auth = require('../auth/auth-router')

const sampleUser = {
     username: 'user',
     password: 'pass'
}

const newUser = {
     username: 'new',
     password: 'newPass'
}

it('should use the testing environment for employeesRouter', () => {
     expect(process.env.DB_ENV).toBe('testing')
})

// describe('auth-router.js', () => {
//      afterEach(async () => {
//           await db('users').truncate()
//           await db('users').insert(sampleUser)
//      })

//      describe('register', () => {
//           it('should give us a 201 status', () => {
//                return supertest(auth)
//                     .post('/register')
//                     .send(newUser)
//                     .set("Accept", "application/json")
//                     .expect("content-Type", /json/)
//                     .then(res => {
//                          expect(res.status).toBe(201)
//                     })       
//           })
//      })


// })

describe('auth-router.js', () => {
     describe("Post register endpoint", function() {
          it("Should return status 201", function() {
            const expectedStatusCode = 201
            supertest(auth)
              .post("/register")
              .send(newUser)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/);
            expect(expectedStatusCode);
          })
        })

          it('should respond back with the object', () => {
               const expectedResponse = {
                    message: "Successfully Registered!",
                    newUser: {
                    id: 1,
                    username: "new",
                    password: "newPass"    
                    }
               }
               supertest(auth)
               .post('/register')
               .send(newUser)
               expect(expectedResponse)
          })
})