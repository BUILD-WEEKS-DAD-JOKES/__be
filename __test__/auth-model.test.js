const db = require('../data/dbConfig.js')
const Users = require('../models/auth-model')
const {mock_user_1, mock_user_2, mock_user_3} = require('./mock_data')
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
beforeEach(async () => {
    await db('user').truncate();
});

describe('users model()', () => {
    describe('add()', () => {
        it('can add a user to te database', async () => {
            //add some users to the database...
            await Users.add(mock_user_1)
            await Users.add(mock_user_2)
            await Users.add(mock_user_3)

            //grab the users database...
            const users = await db('user')

            //expect the users to have a certian length.
            expect(users).toHaveLength(3)
        })
        it('after an add... user x\'s name is equal to', async () => {
            //add some users to the database...
            await Users.add(mock_user_1)
            await Users.add(mock_user_2)
            await Users.add(mock_user_3)

            //grab the users database...
            const users = await db('user')

            expect(users[1].username).toBe(mock_user_2.username)
        })
    })

    describe('find(username)',  () => {
        it('can find all users in the database', async()=>{
            await Users.add(mock_user_1)
            await Users.add(mock_user_2)
            await Users.add(mock_user_3)

            //grab the users database...
            const users =  await Users.find()
            expect(users.length).toEqual(3) 
        })
        it('if given a username... can return that single user..', async()=>{
            await Users.add(mock_user_1)
            await Users.add(mock_user_2)
            await Users.add(mock_user_3)

            //grab the users database...
            const user =  await Users.find(mock_user_1.username)
            expect(user.username).toEqual(mock_user_1.username) 
        })
    })

    describe('update(id, changes)',  () => {
        it('can update a given user with given changes...', async()=>{
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
            const updated_user = await Users.findById(mock_id)
            expect(updated_user.username).toEqual(mock_changes.username)
            
        })
    })
    describe('delete(id)', () => {
        it('can delete the user with the given id', async()=>{
            await Users.add(mock_user_1)
            await Users.add(mock_user_2)
            await Users.add(mock_user_3)

            const mock_id = 3

            const del = await Users.remove(mock_id)
            const users = await db('user')
            expect(users.length).toBe(2)
        })
    })
})


