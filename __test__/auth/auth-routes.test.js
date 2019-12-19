const req = require('supertest')
const db = require('../../data/dbConfig')
const server = require('../../server')
const { mock_user_1, mock_user_2, mock_user_3 } = require('../mock_data')

beforeEach(async () => {
    await db('users').truncate()
})

describe('auth routes', () => {
    describe('/auth/register ==> can register a user', () => {
        it('will return 201 on a successful register', async () => {
            //try and register a user
            const res = await req(server).post('/api/register').send(mock_user_1)
            //expect the status to be { 201 created }
            expect(res.status).toBe(201)
        })
        it('will give confirm on succesful register of user', async () => {
            //try and register a user
            const res = await req(server).post('/api/register').send(mock_user_1)
            //expect the body of the response to be a confirm messege
            expect(res.body).toEqual({ messege: 'User Created Succesfully!' })
        })
    })
    describe('auth/login  ==> can login a user!', () => {
        it('will return 200 on a successful register', async () => {
            //try and login a user
            const res = await req(server).post('/api/login').send(mock_user_1)
            //expect the status to be { 201 created }
            expect(res.status).toBe(200)
        })
        it('will give a token on successful login', async ()=>{
            //try and login a user
            const res = await req(server).post('/api/login').send(mock_user_1)
            //a token is EXPECTED on the req.body
            const token = res.body
            //the token should be longer than 10 characters..
            expect(token.length).toBeGreaterThan(10)
        })
    })
})
