
exports.up = function (knex) {
    return knex.schema.createTable('joke', tbl => {
        tbl.increments()
        tbl.string('question', 128).notNullable()
        tbl.string('answer', 128).notNullable()
        tbl.boolean('public').defaultsTo(true)
        tbl.string('joke_owner')
            .references('username')
            .inTable('user')
            .notNullable()
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.integer('thumb_ups').notNullable()    
        tbl.integer('thumb_downs').notNullable()    
        tbl.integer('hearts').notNullable()    
        tbl.timestamp('created_at').defaultsTo(knex.fn.now())
        tbl.timestamp('updated_last').defaultsTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('joke')
};
