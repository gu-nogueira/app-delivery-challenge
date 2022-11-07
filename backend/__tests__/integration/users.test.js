import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('Users', () => {
  /*
   *  Clears all tables
   */
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('Users', {
      password: '123456',
    });
    const compareHash = await bcrypt.compare('123456', user.password_hash);
    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('Deliveries');

    const response = await request(app).post('/deliveries').send(user);

    expect(response.body).toHaveProperty('id');
  });
});
