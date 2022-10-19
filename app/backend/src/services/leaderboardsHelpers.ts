// import Teams from '../database/models/teams';

interface IHomeMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

interface ITeams {
  id: number;
  teamName: string;
  teamHomeMatches?: IHomeMatches[];
}

const calculatePoints = (team: ITeams) => {
  const { teamHomeMatches } = team;

  if (!teamHomeMatches) return 0;

  const points = teamHomeMatches.map((e) => {
    if (e.homeTeamGoals > e.awayTeamGoals) {
      return 3;
    }
    if (e.homeTeamGoals === e.awayTeamGoals) {
      return 1;
    }
    return 0;
  });
  return points;
};

const numberOfGames = (teams: ITeams) => {
  const games = teams.teamHomeMatches?.length;
  return games;
};

const businessRulesApply = (teams: ITeams[]) => {
  const response = teams.map((team) => {
    const { teamName } = team;
    const totalPoints = calculatePoints(team);
    const totalGames = numberOfGames(team);

    return {
      name: teamName,
      totalPoints,
      totalGames,
    };
  });

  return response;
};

export default businessRulesApply;
