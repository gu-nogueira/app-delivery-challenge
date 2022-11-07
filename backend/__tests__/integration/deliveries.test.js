import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

function generateToken() {
  return request(app)
    .post('/sessions')
    .send({
      email: 'admin@desafio.com.br',
      password: '123456',
    })
    .then((response) => response.body.token);
}

describe('Deliveries', () => {
  /*
   *  Clears all tables
   */
  beforeEach(async () => {
    await truncate();
  });

  it('shoud be able to authenticate with valid credentials', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'admin@desafio.com.br',
      password: '123456',
    });

    expect(response.status).toBe(200);
  });

  it('should be able to create a delivery', async () => {
    const delivery = await factory.attrs('Deliveries');
    const token = await generateToken();
    const response = await request(app)
      .post('/deliveries')
      .set('Authorization', `Bearer ${token}`)
      .send(delivery);
    expect(response.body).toHaveProperty('id');
  });
});
