import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

interface IMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface Iupdate {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default class ServiceMatches {
  constructor(private model: typeof Matches) {}

  async getAll() {
    const response = await this.model.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
        },
        {
          model: Teams,
          as: 'teamAway',
        },
      ],
    });
    if (!response) return { code: 400, message: 'ERRO!' };

    return { code: 200, response };
  }

  async createMatch(body: IMatch) {
    const response = await this.model.create(body);
    if (body.homeTeam === body.awayTeam) {
      return { code: 401, message: 'It is not possible to create a match with two equal teams' };
    }
    const homeTeam = await Teams.findByPk(body.homeTeam);
    const awayTeam = await Teams.findByPk(body.awayTeam);

    if (!homeTeam || !awayTeam) {
      return { code: 404, message: 'There is no team with such id!' };
    }
    if (!response) return { code: 400, message: 'ERRO!' };

    return { code: 201, response };
  }

  async finish(id: string) {
    const numberId = Number(id);
    const response = await this.model.update({ inProgress: false }, { where: { id: numberId } });
    if (!response) return { code: 400, erro: 'ERRO!' };

    return { code: 200 };
  }

  async addGoals(body: Iupdate, id: string) {
    const { homeTeamGoals, awayTeamGoals } = body;
    const response = await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    if (!response) return { code: 400, message: 'ERRO!' };

    return { code: 200 };
  }
}
