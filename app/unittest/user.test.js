const request = require("supertest")
const app = require('../../server')

//Initial testing
describe('Initial Test', () => {
    it('should test that 1 + 1 === 2', () => {
      expect(1+1).toBe(2)
    })
  })

//User api testing
describe('User API', () => {
    it('should show all users', async () => {
        const res = await request(app).get("/v1/api/user/list")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('users')
    }),
    it('should show a user', async () => {
        const res = await request(app).get('/v1/api/user/6/get')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
    }),
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/v1/api/user/create')
            .send({
                name: 'Tom',
                email: 'tom1@tom.com',
                password: 'Passw0rd$',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user')
    })
})


