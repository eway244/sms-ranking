const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/User');

describe('Auth Controller', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          phone: '12345678901',
          password: 'Password123',
          realName: 'Test User',
          class: 'Class A',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 400 if phone is invalid', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          phone: 'invalidphone',
          password: 'Password123',
        });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          phone: '12345678901',
          password: 'Password123',
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'Password123',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 401 if credentials are invalid', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'wronguser',
          password: 'wrongpassword',
        });
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    it('should send a verification code to the phone', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          phone: '12345678901',
          password: 'Password123',
        });

      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ phone: '12345678901' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Verification code sent');
    });

    it('should return 404 if phone is not registered', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ phone: 'nonexistentphone' });
      expect(res.statusCode).toEqual(404);
    });
  });
});