import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

interface IMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
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
    if (!response) return { code: 400, message: 'ERRO!' };

    return { code: 201, response };
  }

  async finish(id: number) {
    const response = await this.model.update({ inProgress: false }, { where: { id } });
    if (!response) return { code: 400, message: 'ERRO!' };

    return { code: 200 };
  }
}
