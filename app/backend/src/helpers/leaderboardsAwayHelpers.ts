interface IAwayMatches {
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
  teamAwayMatches?: IAwayMatches[];
}

const calculatePointsGamesAndEfficiency = (team: ITeams) => {
  const { teamAwayMatches } = team;

  if (!teamAwayMatches) return { totalPoints: 0, totalGames: 0 };

  const totalGames = teamAwayMatches.length;

  const points = teamAwayMatches.map((e) => {
    if (e.awayTeamGoals > e.homeTeamGoals) {
      return 3;
    }
    if (e.awayTeamGoals === e.homeTeamGoals) {
      return 1;
    }
    return 0;
  });
  let totalPoints = 0;
  for (let i = 0; i < points.length; i += 1) {
    totalPoints += points[i];
  }
  const efficiency = (totalPoints / (totalGames * 3)) * 100;

  return { totalPoints, totalGames, efficiency: efficiency.toFixed(2) };
};

const calculateWinsLossesAndDraws = (team: ITeams) => {
  const { teamAwayMatches } = team;

  if (!teamAwayMatches) return { wins: 0, losses: 0, draws: 0 };

  const matches = teamAwayMatches.map((e) => {
    if (e.awayTeamGoals > e.homeTeamGoals) {
      return 'win';
    }
    if (e.awayTeamGoals === e.homeTeamGoals) {
      return 'draw';
    }
    return 'loss';
  });

  const wins = matches.filter((e) => e === 'win').length;
  const losses = matches.filter((e) => e === 'loss').length;
  const draws = matches.filter((e) => e === 'draw').length;

  return { wins, losses, draws };
};

const calculateGoals = (team: ITeams) => {
  const { teamAwayMatches } = team;

  if (!teamAwayMatches) return { goalsFavor: 0, goalsOwn: 0 };

  const goals = teamAwayMatches.map((e) => {
    const { homeTeamGoals, awayTeamGoals } = e;
    const goalsFavor = awayTeamGoals;
    const goalsOwn = homeTeamGoals;
    return { goalsFavor, goalsOwn };
  });

  let favor = 0;
  let own = 0;

  for (let i = 0; i < teamAwayMatches.length; i += 1) {
    favor += goals[i].goalsFavor;
    own += goals[i].goalsOwn;
  }
  const goalsBalance = favor - own;

  return { goalsFavor: favor, goalsOwn: own, goalsBalance };
};

const businessRulesApply = (teams: ITeams[]) => {
  const response = teams.map((team) => {
    const { teamName } = team;
    const { totalPoints, totalGames, efficiency } = calculatePointsGamesAndEfficiency(team);
    const { wins, losses, draws } = calculateWinsLossesAndDraws(team);
    const { goalsFavor, goalsOwn, goalsBalance } = calculateGoals(team);

    return { name: teamName,
      totalPoints,
      totalGames,
      totalVictories: wins,
      totalDraws: draws,
      totalLosses: losses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  });

  return response;
};

export default businessRulesApply;
