
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          id: 1,
          username: 'DadBOT101',
          password: 'Password350'
        },
        {
          id: 2,
          username: 'DadBOT203',
          password: 'Password370'
        },
        {
          id: 3,
          username: 'DadBOT204',
          password: 'Password360'
        },
      ]);
    });
};
