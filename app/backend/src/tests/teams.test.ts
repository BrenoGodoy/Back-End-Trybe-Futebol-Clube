import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/teams';

chai.use(chaiHttp);

const { expect } = chai;

const mock = [
	{
		id: 1,
		teamName: "Avaí/Kindermann"
	},
	{
		id: 2,
		teamName: "Bahia"
	},
	{
		id: 3,
		teamName: "Botafogo"
	},
	{
		id: 4,
		teamName: "Corinthians"
	},
	{
		id: 5,
		teamName: "Cruzeiro"
	},
	{
		id: 6,
		teamName: "Ferroviária"
	},
	{
		id: 7,
		teamName: "Flamengo"
	},
	{
		id: 8,
		teamName: "Grêmio"
	},
	{
		id: 9,
		teamName: "Internacional"
	},
	{
		id: 10,
		teamName: "Minas Brasília"
	},
	{
		id: 11,
		teamName: "Napoli-SC"
	},
	{
		id: 12,
		teamName: "Palmeiras"
	},
	{
		id: 13,
		teamName: "Real Brasília"
	},
	{
		id: 14,
		teamName: "Santos"
	},
	{
		id: 15,
		teamName: "São José-SP"
	},
	{
		id: 16,
		teamName: "São Paulo"
	}
]

describe('/teams', () => {
  describe('GET-ONE', () => {
    before(() => {
      sinon.stub(Teams, 'findOne').resolves({id: 5, teamName: 'Cruzeiro'} as Teams);
    });
    after(() => {
      sinon.restore();
    });
    it('', async () => {
      const response = (await chai.request(app).get('/teams/5'));
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal({id: 5, teamName: 'Cruzeiro'});
    });
  });
  describe('GET-ALL', () => {
    before(() => {
      sinon.stub(Teams, 'findAll').resolves(mock as Teams[]);
    });
    after(() => {
      sinon.restore();
    });
    it('', async () => {
      const response = (await chai.request(app).get('/teams'));
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(mock);
    });
  })
})
