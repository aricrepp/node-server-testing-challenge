const db = require('../data/config');

function find() {
  return db('pokemon');
}

function findById(id) {
  return db('pokemon').where({ id }).first();
}

async function create(data) {
  const [id] = await db('pokemon').insert(data);
  return findById(id);
}

async function update(id, data) {
  await db('pokemon').where({ id }).update(data);
  return findById(id);
}

function remove(id) {
  return db('pokemon').where({ id }).del();
}

module.exports = {
  find,
  findById,
  create,
  update,
  remove,
};
