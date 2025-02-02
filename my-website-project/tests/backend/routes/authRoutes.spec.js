const request = require('supertest');
const app = require('../../../src/app'); // 引入应用实例
const User = require('../../../src/models/User'); // 引入用户模型

describe('Auth Routes', () => {
  beforeAll(async () => {
    // 清空用户数据
    await User.deleteMany({});
  });

  afterAll(async () => {
    // 关闭数据库连接
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', () => {
    it('应成功注册用户', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          phone: '12345678901',
          password: 'Password123',
          realName: 'Test User',
          class: 'Class A'
        });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', '用户注册成功');
    });

    it('应返回错误，手机号格式不正确', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          phone: '12345',
          password: 'Password123'
        });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', '手机号格式不正确');
    });
  });

  describe('POST /api/auth/login', () => {
    it('应成功登录用户', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          phone: '12345678901',
          password: 'Password123'
        });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          phone: '12345678901',
          password: 'Password123'
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('应返回错误，密码错误', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          phone: '12345678901',
          password: 'WrongPassword'
        });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', '密码错误');
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    it('应成功发送验证码', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          phone: '12345678901',
          password: 'Password123'
        });

      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({
          phone: '12345678901'
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', '验证码已发送');
    });
  });
});