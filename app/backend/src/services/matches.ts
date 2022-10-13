import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

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
}
