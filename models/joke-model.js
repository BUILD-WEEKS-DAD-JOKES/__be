const db = require('../data/dbConfig')

module.exports = {
    find,
    findPublic,
    add,
    remove,
    update
}
function find() {
    return db('joke')
}
function findPublic() {
    return db('joke').where({ public: true })
}

function add(joke) {
    return db('joke').insert(joke)
}

function remove(id) {
    return db('joke').where({ id }).del()
}
function update(id, changes) {
    return db('joke').update(changes).where({ id })
}
