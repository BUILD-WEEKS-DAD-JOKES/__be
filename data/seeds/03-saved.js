
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('saved_joke').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('saved_joke').insert([
        {user_id:1, joke_id:1},
      ]);
    });
};
