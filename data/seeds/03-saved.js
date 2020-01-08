
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('saved_joke').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('saved_joke').insert([
        {username:'DadBOT101', joke_id:1},
        {username:'DadBOT203', joke_id:3},
        {username:'DadBOT101', joke_id:5},
        {username:'DadBOT204', joke_id:3},
        {username:'DadBOT203', joke_id:2},
        {username:'DadBOT101', joke_id:1},
        {username:'DadBOT203', joke_id:4},
        {username:'DadBOT204', joke_id:6},
        {username:'DadBOT203', joke_id:9},
      ]);
    });
};
