const req = require('supertest')
const db = require('../data/dbConfig')
const server = require('../server')
const Users = require('../models/auth-model')
const Jokes = require('../models/joke-model')

beforeEach(async () => {

    await db('user').truncate();
});
jest.setTimeout(1000 * 8);
//#region  -- AUTH ROUTES --
describe('/auth/register ==> can register a user', () => {

    it('will return 201 on a successful register', async () => {

        const mock_user = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        //try and register a user
        const res = await req(server).post('/auth/register').send(mock_user)
        //expect the status to be { 201 created }
        expect(res.status).toEqual(201)
    })
    it('will give confirm on succesful register of user', async () => {

        const mock_user = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        //try and register a user
        const res = await req(server).post('/auth/register').send(mock_user)
        //expect the body of the response to be a confirm messege
        expect(res.body).toEqual({ messege: 'User Created Succesfully!' })
    })

})
describe('auth/login  ==> can login a user!', () => {


    it('will return 200 on a successful login', async () => {

        const mock_user = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        //FIRST:: try and register a user
        let res = await req(server).post('/auth/register').send(mock_user)
        //expect the status to be { 201 created }
        expect(res.status).toEqual(201)
        //THEN:: try and login a user
        const mock_login = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        res = await req(server).post('/auth/login').send(mock_login)
        //expect the status to be { 200 created }
        expect(res.status).toEqual(200)
    })
    it('will give a token on successful login', async () => {

        const mock_user = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        //FIRST:: try and register a user
        let res = await req(server).post('/auth/register').send(mock_user)
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
//#endregion -- AUTH ROUTES --

//#region -- USER MODEL / AUTH MODEL -- 
// the users model should be able to:
/* 
*   insert(user)
**    a user can be created in the user db 
*   find(username)
**    all users can be found if a username is not specified
**    if a username is specified it will return the given user
*   update(id, changes)
**      the user found with the given _id_ will be updated with the _changes_
*   delete(id)
**      the user with the given _id_ will be removed from the database permenently
*/

describe('add()', () => {


    it('can add a user to te database', async () => {
        //add some users to the database...
        const mock_user_1 = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        const mock_user_2 = {
            username: 'Thor',
            password: 'GodOfThunder'
        }
        const mock_user_3 = {
            username: 'Rocket',
            password: 'M3chanic'
        }
        await Users.add(mock_user_1)
        await Users.add(mock_user_2)
        await Users.add(mock_user_3)

        //grab the users database...
        const users = await db('user')

        //expect the users to have a certian length.
        expect(users).toHaveLength(3)
    })
    it('after an add... user x\'s name is equal to', async () => {
        const mock_user_1 = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        const mock_user_2 = {
            username: 'Thor',
            password: 'GodOfThunder'
        }
        const mock_user_3 = {
            username: 'Rocket',
            password: 'M3chanic'
        }
        //add some users to the database...
        await Users.add(mock_user_1)
        await Users.add(mock_user_2)
        await Users.add(mock_user_3)

        //grab the users database...
        const users = await db('user')

        expect(users[1].username).toBe(mock_user_2.username)
    })
})

describe('find(username)', () => {


    it('can find all users in the database', async () => {
        const mock_user_1 = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        const mock_user_2 = {
            username: 'Thor',
            password: 'GodOfThunder'
        }
        const mock_user_3 = {
            username: 'Rocket',
            password: 'M3chanic'
        }
        await Users.add(mock_user_1)
        await Users.add(mock_user_2)
        await Users.add(mock_user_3)

        //grab the users database...
        const users = await Users.find()
        expect(users.length).toEqual(3)
    })

    it('if given a username... can return that single user..', async () => {
        const mock_user_1 = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        const mock_user_2 = {
            username: 'Thor',
            password: 'GodOfThunder'
        }
        const mock_user_3 = {
            username: 'Rocket',
            password: 'M3chanic'
        }
        await Users.add(mock_user_1)
        await Users.add(mock_user_2)
        await Users.add(mock_user_3)

        //grab the users database...
        const user = await Users.find()
        expect(user[0].username).toEqual(mock_user_1.username)
    })
})

describe('update(id, changes)', () => {


    it('can update a given user with given changes...', async () => {
        const mock_user_1 = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        const mock_user_2 = {
            username: 'Thor',
            password: 'GodOfThunder'
        }
        const mock_user_3 = {
            username: 'Rocket',
            password: 'M3chanic'
        }
        await Users.add(mock_user_1)
        await Users.add(mock_user_2)
        await Users.add(mock_user_3)

        //grab the users database...
        const mock_changes = {
            username: 'DandyDad209',
            password: 'Boss12345'
        }
        const mock_id = 3
        const update = await Users.update(mock_id, mock_changes)
        const users = await Users.find()

        expect(users[mock_id - 1].username).toEqual(mock_changes.username)

    })
})
describe('delete(id)', () => {

    it('can delete the user with the given id', async () => {
        const mock_user_1 = {
            username: 'IronMan',
            password: 'IAmIronMan'
        }
        const mock_user_2 = {
            username: 'Thor',
            password: 'GodOfThunder'
        }
        const mock_user_3 = {
            username: 'Rocket',
            password: 'M3chanic'
        }
        await Users.add(mock_user_1)
        await Users.add(mock_user_2)
        await Users.add(mock_user_3)

        const mock_id = 3

        const del = await Users.remove(mock_id)
        const users = await db('user')
        expect(users.length).toBe(2)
    })
})

//#endregion -- USER MODEL / AUTH MODEL --

//#region  -- JOKE MODEL --
describe('JOKES :: add()', () => {
    it('can add the given joke to the database', async () => {
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)

        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1
        }

        const add = await Jokes.add(mock_joke_1)
        const jokes = await db('joke')
        expect(jokes.length).toEqual(1)

    })
})
describe('JOKES :: remove()', () => {
    it('a user can delete a joke after they create it', async () => {
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)

        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1
        }

        await Jokes.add(mock_joke_1)
        let jokes = await db('joke')
        expect(jokes.length).toEqual(1)

        await Jokes.remove(jokes[0].id)
        jokes = await db('joke')

        expect(jokes.length).toEqual(0)


    })
})
describe('JOKES :: update()', () => {
    it('a user can update a joke after they create it', async () => {
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)

        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1
        }

        await Jokes.add(mock_joke_1)
        let jokes = await db('joke')
        expect(jokes.length).toEqual(1)

        const mock_joke_changes = {
            question: 'whats the name of someone who steals your lunch??',
            answer: 'Hungry!!',
            joke_owner: 1
        }
        await Jokes.update(jokes[0].id, mock_joke_changes)
        jokes = await db('joke')

        expect(jokes[0].question).toEqual(mock_joke_changes.question)
        expect(jokes[0].answer).toEqual(mock_joke_changes.answer)
    })
})
describe('JOKES :: find()', () => {
    it('a user can find all jokes after they create it', async () => {
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)

        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1
        }
        const mock_joke_2 = {
            question: 'whats the name of someone who steals your Dinenr?',
            answer: 'Starving',
            joke_owner: 1
        }
        const mock_joke_3 = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'a King',
            joke_owner: 1
        }
        await Jokes.add(mock_joke_1)
        await Jokes.add(mock_joke_2)
        await Jokes.add(mock_joke_3)
        let jokes = await db('joke')
        expect(jokes.length).toEqual(3)

        const actual_jokes = await Jokes.find()
        expect(actual_jokes.length).toBe(3)

    })
})
describe('JOKES :: findPublic()', () => {
    it('a user can find only public jokes after they create some', async () => {
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)

        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1,
            public: false
        }
        const mock_joke_2 = {
            question: 'whats the name of someone who steals your Dinenr?',
            answer: 'Starving',
            joke_owner: 1
        }
        const mock_joke_3 = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'a King',
            joke_owner: 1
        }
        await Jokes.add(mock_joke_1)
        await Jokes.add(mock_joke_2)
        await Jokes.add(mock_joke_3)
        let jokes = await db('joke')
        expect(jokes.length).toEqual(3)

        const actual_jokes = await Jokes.findPublic()
        expect(actual_jokes.length).toBe(2)

    })
})
//#endregion

//#region  -- JOKE ROUTES
describe('POST :: /api/jokes', () => {
    it('will return 201 on a good request', async () => {
        //first we have to create a user in the database that can then add a joke... 
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)
        //now we have to login before we can create a joke.. only 
        const mock_login = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the request to login.. 
        res = await req(server).post('/auth/login').send(mock_login)
        //check that it was a good request...
        expect(res.status).toBe(200)
        //store the token that the mock gave us
        const token = res.body.token
        //make sure token is long..
        expect(token.length).toBeGreaterThan(12)

        // now that we're authorized we can send that joke we want to add...
        //here it is
        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1
        }
        //send the request to add the joke to the database with the authorization we need...
        res = await req(server).post(`/api/jokes/${mock_joke_1.joke_owner}`).set({ Authorization: token }).send(mock_joke_1)
        //now that we added it to the database we expect that we get a 201 created response
        expect(res.status).toEqual(201)
    })
    it('will give a Confirm messege on Creating a Joke', async () => {
        //first we have to create a user in the database that can then add a joke... 
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)
        //now we have to login before we can create a joke.. only 
        const mock_login = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the request to login.. 
        res = await req(server).post('/auth/login').send(mock_login)
        //check that it was a good request...
        expect(res.status).toBe(200)
        //store the token that the mock gave us
        const token = res.body.token
        //make sure token is long..
        expect(token.length).toBeGreaterThan(12)

        // now that we're authorized we can send that joke we want to add...
        //here it is
        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1
        }
        //send the request to add the joke to the database with the authorization we need...
        res = await req(server).post(`/api/jokes/${mock_joke_1.joke_owner}`).set({ Authorization: token }).send(mock_joke_1)

        //now that we added it to the database we expect that we get a 201 created response
        expect(res.body).toEqual({ messege: 'Joke has been Created Successfully!' })
    })
})

describe('GET :: /api/jokes', () => {
    it('will return 200 on a good request to get PUBLIC jokes', async () => {
        //first we have to create a user in the database that can then add a joke... 
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)

        // now that we're authorized we can send that joke we want to add...
        //here it is
        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1,
            public: false
        }
        const mock_joke_2 = {
            question: 'whats the name of someone who steals your Dinenr?',
            answer: 'Starving',
            joke_owner: 1
        }
        const mock_joke_3 = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'a King',
            joke_owner: 1
        }
        await Jokes.add(mock_joke_1)
        await Jokes.add(mock_joke_2)
        await Jokes.add(mock_joke_3)
        //send the request to add the joke to the database with the authorization we need...
        res = await req(server).get('/api/jokes')
        //now that we added it to the database we expect that we get a 201 created response
        expect(res.status).toEqual(200)
    })
    it('will give only The PUBLIC tagged jokes', async () => {
        //first we have to create a user in the database that can then add a joke... 
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)

        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1,
            public: false
        }
        const mock_joke_2 = {
            question: 'whats the name of someone who steals your Dinenr?',
            answer: 'Starving',
            joke_owner: 1
        }
        const mock_joke_3 = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'a King',
            joke_owner: 1
        }
        await Jokes.add(mock_joke_1)
        await Jokes.add(mock_joke_2)
        await Jokes.add(mock_joke_3)
        //send the request to add the joke to the database with the authorization we need...
        res = await req(server).get('/api/jokes')
        //now that we added it to the database we expect that we get a 201 created response
        expect(res.body.length).toEqual(2)
    })
})

describe('GET :: /api/jokes/all', () => {
    it('will return 200 on a good request to get ALL jokes', async () => {
        //first we have to create a user in the database that can then add a joke... 
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)
        //now we have to login before we can create a joke.. only 
        const mock_login = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the request to login.. 
        res = await req(server).post('/auth/login').send(mock_login)
        //check that it was a good request...
        expect(res.status).toBe(200)
        //store the token that the mock gave us
        const token = res.body.token
        //make sure token is long..
        expect(token.length).toBeGreaterThan(12)

        // now that we're authorized we can send that joke we want to add...
        //here it is
        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1,
            public: false
        }
        const mock_joke_2 = {
            question: 'whats the name of someone who steals your Dinenr?',
            answer: 'Starving',
            joke_owner: 1
        }
        const mock_joke_3 = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'a King',
            joke_owner: 1
        }
        await Jokes.add(mock_joke_1)
        await Jokes.add(mock_joke_2)
        await Jokes.add(mock_joke_3)
        //send the request to add the joke to the database with the authorization we need...
        res = await req(server).get('/api/jokes/all').set({ Authorization: token })
        //now that we added it to the database we expect that we get a 201 created response
        expect(res.status).toEqual(200)
    })
    it('will give ALL jokes', async () => {
        //first we have to create a user in the database that can then add a joke... 
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)
        //now we have to login before we can create a joke.. only 
        const mock_login = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the request to login.. 
        res = await req(server).post('/auth/login').send(mock_login)
        //check that it was a good request...
        expect(res.status).toBe(200)
        //store the token that the mock gave us
        const token = res.body.token
        //make sure token is long..
        expect(token.length).toBeGreaterThan(12)

        // now that we're authorized we can send that joke we want to add...
        //here it is
        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1,
            public: false
        }
        const mock_joke_2 = {
            question: 'whats the name of someone who steals your Dinenr?',
            answer: 'Starving',
            joke_owner: 1
        }
        const mock_joke_3 = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'a King',
            joke_owner: 1
        }
        await Jokes.add(mock_joke_1)
        await Jokes.add(mock_joke_2)
        await Jokes.add(mock_joke_3)
        //send the request to add the joke to the database with the authorization we need...
        res = await req(server).get('/api/jokes/all').set({ Authorization: token })
        //now that we added it to the database we expect that we get a 201 created response
        expect(res.body.length).toEqual(3)
    })
})

describe('PUT :: /api/jokes/:id', () => {
    it('will return 200 on a good update to joke/:id', async () => {
        //first we have to create a user in the database that can then add a joke... 
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)
        //now we have to login before we can create a joke.. only 
        const mock_login = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the request to login.. 
        res = await req(server).post('/auth/login').send(mock_login)
        //check that it was a good request...
        expect(res.status).toBe(200)
        //store the token that the mock gave us
        const token = res.body.token
        //make sure token is long..
        expect(token.length).toBeGreaterThan(12)

        // now that we're authorized we can send that joke we want to add...
        //here it is
        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1,
            public: false
        }
        const mock_joke_2 = {
            question: 'whats the name of someone who steals your Dinenr?',
            answer: 'Starving',
            joke_owner: 1
        }
        const mock_joke_3 = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'a King',
            joke_owner: 1
        }
        await Jokes.add(mock_joke_1)
        await Jokes.add(mock_joke_2)
        await Jokes.add(mock_joke_3)

        const mock_changes = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'achKing',
            joke_owner: 1,
            public: false
        }
        const jokes = await Jokes.find()

        //send the request to add the joke to the database with the authorization we need...
        res = await req(server).put(`/api/jokes/${jokes[2].id}`).set({ Authorization: token }).send(mock_changes)
        //now that we added it to the database we expect that we get a 201 created response
        expect(res.status).toEqual(200)



    })
    it('will give confirm messege on Update of a joke', async () => {
        //first we have to create a user in the database that can then add a joke... 
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)
        //now we have to login before we can create a joke.. only 
        const mock_login = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the request to login.. 
        res = await req(server).post('/auth/login').send(mock_login)
        //check that it was a good request...
        expect(res.status).toBe(200)
        //store the token that the mock gave us
        const token = res.body.token
        //make sure token is long..
        expect(token.length).toBeGreaterThan(12)

        // now that we're authorized we can send that joke we want to add...
        //here it is
        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1,
            public: false
        }
        const mock_joke_2 = {
            question: 'whats the name of someone who steals your Dinenr?',
            answer: 'Starving',
            joke_owner: 1
        }
        const mock_joke_3 = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'a King',
            joke_owner: 1
        }
        await Jokes.add(mock_joke_1)
        await Jokes.add(mock_joke_2)
        await Jokes.add(mock_joke_3)

        const mock_changes = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'achKing',
            joke_owner: 1,
            public: false
        }

        const jokes = await Jokes.find()
        //send the request to add the joke to the database with the authorization we need...
        res = await req(server).put(`/api/jokes/${jokes[2].id}`).set({ Authorization: token }).send(mock_changes)
        //now that we updated it in the database we expect that we get a confirm Messege response
        expect(res.body).toEqual({ messege: 'Joke has been updated Successfully!' })
    })
})

describe('DELETE :: /api/jokes/:id', () => {
    it('will return 200 on a good Delete to joke/:id', async () => {
        //first we have to create a user in the database that can then add a joke... 
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)
        //now we have to login before we can create a joke.. only 
        const mock_login = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the request to login.. 
        res = await req(server).post('/auth/login').send(mock_login)
        //check that it was a good request...
        expect(res.status).toBe(200)
        //store the token that the mock gave us
        const token = res.body.token
        //make sure token is long..
        expect(token.length).toBeGreaterThan(12)

        // now that we're authorized we can send that joke we want to add...
        //here it is
        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1,
            public: false
        }
        const mock_joke_2 = {
            question: 'whats the name of someone who steals your Dinenr?',
            answer: 'Starving',
            joke_owner: 1
        }
        const mock_joke_3 = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'a King',
            joke_owner: 1
        }
        await Jokes.add(mock_joke_1)
        await Jokes.add(mock_joke_2)
        await Jokes.add(mock_joke_3)

        const mock_changes = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'achKing',
            joke_owner: 1,
            public: false
        }
        const jokes = await Jokes.find()

        //send the request to add the joke to the database with the authorization we need...
        res = await req(server).delete(`/api/jokes/${jokes[2].id}`).set({ Authorization: token }).send(mock_changes)
        //now that we added it to the database we expect that we get a 201 created response
        expect(res.status).toEqual(200)



    })
    it('will give confirm messege on Delete of a joke', async () => {
        //first we have to create a user in the database that can then add a joke... 
        const mock_user = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the reqest to register mock_user
        let res = await req(server).post('/auth/register').send(mock_user)
        //make sure its a good request
        expect(res.status).toEqual(201)
        //now we have to login before we can create a joke.. only 
        const mock_login = {
            username: 'DankDaddy01',
            password: 'Som3Dad24!'
        }
        //send the request to login.. 
        res = await req(server).post('/auth/login').send(mock_login)
        //check that it was a good request...
        expect(res.status).toBe(200)
        //store the token that the mock gave us
        const token = res.body.token
        //make sure token is long..
        expect(token.length).toBeGreaterThan(12)

        // now that we're authorized we can send that joke we want to add...
        //here it is
        const mock_joke_1 = {
            question: 'whats the name of someone who steals your lunch?',
            answer: 'hungry',
            joke_owner: 1,
            public: false
        }
        const mock_joke_2 = {
            question: 'whats the name of someone who steals your Dinenr?',
            answer: 'Starving',
            joke_owner: 1
        }
        const mock_joke_3 = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'a King',
            joke_owner: 1
        }
        await Jokes.add(mock_joke_1)
        await Jokes.add(mock_joke_2)
        await Jokes.add(mock_joke_3)

        const mock_changes = {
            question: 'whats the name of someone who steals your breakfast?',
            answer: 'achKing',
            joke_owner: 1,
            public: false
        }

        const jokes = await Jokes.find()
        //send the request to add the joke to the database with the authorization we need...
        res = await req(server).delete(`/api/jokes/${jokes[2].id}`).set({ Authorization: token }).send(mock_changes)
        //now that we updated it in the database we expect that we get a confirm Messege response
        expect(res.body).toEqual({ messege: 'Joke has been Deleted Successfully!' })
    })
})
//#endregion