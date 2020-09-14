exports.seed = async function (knex) {
  await knex('pokemon').truncate();
  await knex('pokemon').insert([
    { name: 'pikachu', password: 'abc123' },
    { name: 'squirtle', password: 'abc123' },
    { name: 'bulbasaur', password: 'abc123' },
    { name: 'charmander', password: 'abc123' },
  ]);
};
