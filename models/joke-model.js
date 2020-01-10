const db = require('../data/dbConfig')

module.exports = {
    find,
    findPublic,
    add,
    remove,
    update,
    saveJoke,
    getSaved
}
function find() {
    return db('joke')
}
function findById(id) {
    return db('joke').where({ id }).first()
}
function findPublic() {
    return db('joke').where({ public: true })
}

function add(joke) {
    return db('joke').insert(joke)
}
function findSavedById(id) {
    return db('saved_joke').where({ id }).first()
}
function saveJoke(username, joke_id) {
    return db('saved_joke')
        .insert({ username, joke_id })
        .then(() => {
            return findSavedById(joke_id)
        }).then((joke) => {
            return findById(joke.id)
        })
}

function getSaved(username) {
    return db('saved_joke as s').where({ username })
        .join('joke as j', 'j.id', 's.joke_id')
        .select('j.id as joke_id', 'j.question', 'j.thumb_ups', 'j.thumb_downs', 'j.joke_owner', 'j.hearts')
}

function remove(id) {
    return db('joke').where({ id }).del()
}
function update(id, changes) {
    return db('joke').update(changes).where({ id })
}

