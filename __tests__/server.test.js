const supertest = require('supertest');
const { server } = require('../src/server.js');
const { db } = require('../src/models/index');

beforeAll(async () => {
  await db.sync();
});

describe('Comprehensive Server Test', () => {
  let token; // Store the bearer token for authenticated requests

  // Test signup and get the bearer token
  it('should signup a new user and return a bearer token', async () => {
    const response = await supertest(server)
      .post('/signup')
      .send({ username: 'admin', password: 'admin', role: 'admin' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  // Test signin and get a new bearer token
  it('should signin an existing user and return a new bearer token', async () => {
    const response = await supertest(server)
      .post('/signin')
      .auth('admin', 'admin');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  // Test the protected route with bearer token authentication
  it('should access the protected route with a valid bearer token', async () => {
    const response = await supertest(server)
      .get('/secret')
      .set('Authorization', `Bearer ${token}`);
    console.log('This is the token for this test: ', token);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the secret area');
  });

  // Test the route for getting all users with bearer token authentication and delete permission
  it('should get all users with bearer token authentication and delete permission', async () => {
    const response = await supertest(server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    console.log('This is the token for this test: ', token);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
  // Clean up or reset data if necessary
  afterAll(async () => {
    await db.drop();
  });

});


// 'use strict';

// const { server } = require('../src/server.js');
// const { db } = require('../src/models/index.js');
// const supertest = require('supertest');
// // const { test } = require('node:test');

// const request = supertest(server);

// beforeAll(async () => {
//   await db.sync();
// });

// afterAll(async () => {
//   await db.drop();
// });


// describe('Server testing', () => {

//   test('Allow users to sign up', async () => {
//     let response = await request.post('/signup').send({
//       username: 'admin',
//       password: 'password',
//       role: 'admin',
//     });

//     expect(response.status).toBe(201);
//     expect(response.body.user.username).toEqual('admin');
//   });

//   test('Allow users to signin', async () => {
//     let response = await request.post('/signin').auth('admin', 'password');

//     expect(response.status).toBe(200);
//     expect(response.body.user.username).toEqual('admin');
//   });

// });