import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

const getHomeAndAway = async (model: typeof Teams) => {
  const teams = await model.findAll({
    include: [
      { model: Matches,
        as: 'teamHomeMatches',
        where: {
          inProgress: 0,
        } },
      { model: Matches,
        as: 'teamAwayMatches',
        where: {
          inProgress: 0,
        },
      },
    ],
  });

  return teams;
};

export default getHomeAndAway;
