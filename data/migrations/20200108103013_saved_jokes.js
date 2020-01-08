
exports.up = function (knex) {
    return knex.schema.createTable('saved_joke', tbl => {
        tbl.increments()
        tbl.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.integer('joke_id')
            .notNullable()
            .references('id')
            .inTable('joke')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('saved_joke')
};
