import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import users from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

const user = {
  email: 'teste@gmail.com',
  password: '1234567',
}

describe('/login', () => {
  before(() => {
    sinon.stub(users, 'findOne').resolves({id: 1, ...user} as users);
  });
  after(() => {
    sinon.restore();
  });
  it('POST', async () => {
    const response = await (await chai.request(app).post('/login').send(user));

    chai.expect(response.status).to.equal(200);
  });
});
