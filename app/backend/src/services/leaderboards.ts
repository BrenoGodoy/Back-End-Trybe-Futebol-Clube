import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import businessRulesApply from './leaderboardsHelpers';

export default class ServiceLeaderboards {
  constructor(private model: typeof Teams) {}

  async getHome() {
    const teams = await this.model.findAll({
      include: [
        { model: Matches,
          as: 'teamHomeMatches',
          where: {
            inProgress: 0,
          } },
      ],
    });

    const response = businessRulesApply(teams);

    if (!response) return { code: 404, message: 'ERRO!' };

    return { code: 200, response };
  }
}
