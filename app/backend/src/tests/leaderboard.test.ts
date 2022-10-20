import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/leaderboard', () => {
  describe('GET', () => {
    it(`ALL`, async () => {
      const response = await chai.request(app).get('/leaderboard');
      expect(response.status).to.equal(200);
      expect(response.body).to.an('array');
      expect(response.body).with.lengthOf(16)
    });
    it(`HOME`, async () => {
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.equal(200);
      expect(response.body).to.an('array');
      expect(response.body).with.lengthOf(16)
    });
    it(`AWAY`, async () => {
      const response = await chai.request(app).get('/leaderboard/away');
      expect(response.status).to.equal(200);
      expect(response.body).to.an('array');
      expect(response.body).with.lengthOf(16)
    });
  });
})
