exports.up = async function (knex) {
  await knex.schema.createTable('pokemon', (table) => {
    table.increments();
    table.text('name').notNullable();
    table.text('password').notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('pokemon');
};
