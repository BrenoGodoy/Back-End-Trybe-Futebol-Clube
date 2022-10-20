import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import generateToken from '../helpers/token'
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login/validate', () => {
  describe('GET-ROLE', () => {
    it('', async () => {
      const data = {
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
      }
      const token = generateToken(data.password, data.role);
      const response = await chai.request(app).get('/login/validate').set('Authorization', token);
      expect(response.status).to.be.eq(200);
      expect(response.body).to.deep.equal({ role: 'user' });
    });
  });
})
