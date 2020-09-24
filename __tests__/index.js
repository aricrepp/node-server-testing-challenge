const supertest = require('supertest');
const server = require('../server');
const { application } = require('express');
const db = require('../data/config');

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  //close the db conneciton so the test process doesnt hang or give a warning
  await db.destroy();
});

describe('pokemon integration tests', () => {
  it('GET /pokemon', async () => {
    const res = await supertest(server).get('/pokemon');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
    console.log(res.body);
    expect(res.body).toHaveLength(4);
    expect(res.body[0].name).toBe('pikachu');
  });

  it('GET /pokemon/id', async () => {
    const res = await supertest(server).get('/pokemon/2');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.name).toBe('squirtle');
  });

  it('GET /pokemon/id - not found', async () => {
    const res = await supertest(server).get('/pokemon/50');
    expect(res.statusCode).toBe(404);
  });

  it('POST /pokemon', async () => {
    const res = await supertest(server)
      .post('/pokemon')
      .send({ name: 'pidgey', password: 'abc123' });
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe('application/json');
    expect(res.body.name).toBe('pidgey');
  });
});
