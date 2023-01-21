const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app)

describe('/', () => {
    test('Should start the HTTP Server', async () => {
      const response = await request.get('/');

      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Hello world');
    });
});