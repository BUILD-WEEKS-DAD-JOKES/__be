
exports.up = function (knex) {
    return knex.schema.createTable('joke', tbl => {
        tbl.increments()
        tbl.string('question', 128).notNullable()
        tbl.string('answer', 128).notNullable()
        tbl.boolean('public').defaultsTo(true)
        tbl.integer('joke_owner')
            .references('id')
            .inTable('user')
            .notNullable()
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.timestamp('created_at').defaultsTo(knex.fn.now())
        tbl.timestamp('updated_last').defaultsTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('joke')
};
