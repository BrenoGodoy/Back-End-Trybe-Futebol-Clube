import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import businessRulesApply from '../helpers/leaderboardsHomeHelpers';
import businessRulesApply2 from '../helpers/leaderboardsAwayHelpers';
import businessRulesApply3 from '../helpers/leaderboardsAllHelpers';
import arraySort from '../helpers/leaderboardSort';
import getHomeAndAway from '../helpers/leaderboardsGetAll';

export default class ServiceLeaderboards {
  constructor(private model: typeof Teams) {}

  async getAll() {
    const teams = await getHomeAndAway(this.model);
    const responseNoSorted = businessRulesApply3(teams);
    const response = arraySort(responseNoSorted);
    if (!response) return { code: 404, message: 'ERRO!' };

    return { code: 200, response };
  }

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

    const responseNoSorted = businessRulesApply(teams);
    const response = arraySort(responseNoSorted);
    if (!response) return { code: 404, message: 'ERRO!' };

    return { code: 200, response };
  }

  async getAway() {
    const teams = await this.model.findAll({
      include: [
        { model: Matches,
          as: 'teamAwayMatches',
          where: {
            inProgress: 0,
          } },
      ],
    });

    const responseNoSorted = businessRulesApply2(teams);
    const response = arraySort(responseNoSorted);
    if (!response) return { code: 404, message: 'ERRO!' };

    return { code: 200, response };
  }
}
