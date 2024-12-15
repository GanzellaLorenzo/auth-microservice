const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('deve registrar um novo usuário', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@test.com',
        password: '123456'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.token).toBeDefined();
    });

    it('deve retornar erro para email duplicado', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@test.com',
        password: '123456'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData);

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('deve retornar erro para dados inválidos', async () => {
      const userData = {
        name: 'J',
        email: 'email-invalido',
        password: '123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      const user = new User({
        name: 'João Silva',
        email: 'joao@test.com',
        password: '123456'
      });
      await user.save();
    });

    it('deve fazer login com credenciais válidas', async () => {
      const loginData = {
        email: 'joao@test.com',
        password: '123456'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(loginData.email);
      expect(response.body.data.token).toBeDefined();
    });

    it('deve retornar erro para credenciais inválidas', async () => {
      const loginData = {
        email: 'joao@test.com',
        password: 'senha-errada'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/auth/profile', () => {
    let token;
    let user;

    beforeEach(async () => {
      user = new User({
        name: 'João Silva',
        email: 'joao@test.com',
        password: '123456'
      });
      await user.save();

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'joao@test.com',
          password: '123456'
        });

      token = loginResponse.body.data.token;
    });

    it('deve retornar perfil do usuário autenticado', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(user.email);
    });

    it('deve retornar erro sem token', async () => {
      const response = await request(app)
        .get('/api/auth/profile');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
