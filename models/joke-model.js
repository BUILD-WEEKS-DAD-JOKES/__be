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

function saveJoke(username, joke_id) {
    return db('saved_joke').insert({username, joke_id})
}

function getSaved(username) {
    return db('joke as j')
        .join('saved_joke as s', 's.id', 'j.id')
        .where({ username })
        .select('j.question', 'j.answer', 'j.joke_owner', 'j.thumb_ups', 'j.thumb_downs', 'j.hearts')
}

function remove(id) {
    return db('joke').where({ id }).del()
}
function update(id, changes) {
    return db('joke').update(changes).where({ id }).then(ids => {
        return findById(ids)
    })
}
