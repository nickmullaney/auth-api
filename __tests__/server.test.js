const request = require('supertest');
const app = require('../src/server'); // Assuming your server file is named 'server.js'

describe('Comprehensive Server Test', () => {
  let token; // Store the bearer token for authenticated requests

  // Test signup and get the bearer token
  it('should signup a new user and return a bearer token', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ username: 'testuser', password: 'testpassword', role: 'user' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  // Test signin and get a new bearer token
  it('should signin an existing user and return a new bearer token', async () => {
    const response = await request(app)
      .post('/signin')
      .auth('testuser', 'testpassword');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  // Test the protected route with bearer token authentication
  it('should access the protected route with a valid bearer token', async () => {
    const response = await request(app)
      .get('/secret')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the secret area');
  });

  // Test the route for getting all users with bearer token authentication and delete permission
  it('should get all users with bearer token authentication and delete permission', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  // Test other routes for different models
  // ...

  // Clean up or reset data if necessary
  afterAll(() => {
    // Perform cleanup tasks or reset data
    // ...
  });
});
