import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/matches';
import mock from './macthesMock';
import Teams from '../database/models/teams';
chai.use(chaiHttp);

const { expect } = chai;

interface IMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: Teams;
  teamAway: Teams;
}

// describe('/matches', () => {
//   describe('GET-ONE', () => {
//     before(() => {
//       sinon.stub(Matches, 'findOne').resolves(mock as IMatch[]);
//     });
//     after(() => {
//       sinon.restore();
//     });
//     it('', async () => {
//       const response = (await chai.request(app).get('/teams/5'));
//       chai.expect(response.status).to.equal(200);
//       chai.expect(response.body).to.deep.equal({id: 5, teamName: 'Cruzeiro'});
//     });
//   });
//   describe('GET-ALL', () => {
//     before(() => {
//       sinon.stub(Matches, 'findAll').resolves(mock as Matches[]);
//     });
//     after(() => {
//       sinon.restore();
//     });
//     it('', async () => {
//       const response = (await chai.request(app).get('/teams'));
//       chai.expect(response.status).to.equal(200);
//       chai.expect(response.body).to.deep.equal(mock);
//     });
//   })
// })
