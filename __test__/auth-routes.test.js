const req = require('supertest')
const db = require('../data/dbConfig')
const server = require('../server')
const { mock_user_1, mock_user_2, mock_user_3 } = require('./mock_data')


beforeEach(async () => {
    await db('user').truncate();
});

describe('auth routes', () => {
    
    describe('/auth/register ==> can register a user', () => {
        it('will return 201 on a successful register', async () => {
            //try and register a user
            const res = await req(server).post('/auth/register').send(mock_user_1)
            //expect the status to be { 201 created }
            expect(res.status).toBe(201)
        })
        it('will give confirm on succesful register of user', async () => {
            //try and register a user
            const res = await req(server).post('/auth/register').send(mock_user_1)
            //expect the body of the response to be a confirm messege
            expect(res.body).toEqual({ messege: 'User Created Succesfully!' })
        })
      
    })
    describe('auth/login  ==> can login a user!', () => {
        it('will return 200 on a successful login', async () => {
             //FIRST:: try and register a user
             let res = await req(server).post('/auth/register').send(mock_user_1)
             //expect the status to be { 201 created }
             expect(res.status).toBe(201)
            //THEN:: try and login a user
            const mock_login = {
                username: 'IronMan',
                password: 'IAmIronMan'
            }
            res = await req(server).post('/auth/login').send(mock_login)
            //expect the status to be { 200 created }
            expect(res.status).toBe(200)
        })
        it('will give a token on successful login', async ()=>{
             //FIRST:: try and register a user
             let res = await req(server).post('/auth/register').send(mock_user_1)
             //expect the status to be { 201 created }
             expect(res.status).toBe(201)
            //THEN:: try and login a user
            const mock_login = {
                username: 'IronMan',
                password: 'IAmIronMan'
            }
            res = await req(server).post('/auth/login').send(mock_login)
            //a token is EXPECTED on the req.body
            const token = res.body.token
            //the token should be longer than 10 characters..
            expect(token.length).toBeGreaterThan(10)
        })
      
    })
})


// beforeEach(async () => {
//     await db('user').truncate();
// });

jest.setTimeout(1000 * 7)