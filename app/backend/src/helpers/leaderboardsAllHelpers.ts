interface IMatches {
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
  teamHomeMatches?: IMatches[];
  teamAwayMatches?: IMatches[];
}

const homePointsGamesAndEfficiency = (team: ITeams) => {
  const { teamHomeMatches } = team;

  if (!teamHomeMatches) return { totalPoints: 0, totalGames: 0 };

  const totalGames = teamHomeMatches.length;

  const points = teamHomeMatches.map((e) => {
    if (e.homeTeamGoals > e.awayTeamGoals) {
      return 3;
    }
    if (e.homeTeamGoals === e.awayTeamGoals) {
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

const awayPointsGamesAndEfficiency = (team: ITeams) => {
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

const allPointsGamesAndEfficiency = (team: ITeams) => {
  const home = homePointsGamesAndEfficiency(team);
  const away = awayPointsGamesAndEfficiency(team);

  const totalPoints = home.totalPoints + away.totalPoints;
  const totalGames = home.totalGames + away.totalGames;
  const efficiency = (totalPoints / (totalGames * 3)) * 100;

  return { totalPoints, totalGames, efficiency: efficiency.toFixed(2) };
};

const homeWinsLossesAndDraws = (team: ITeams) => {
  const { teamHomeMatches } = team;

  if (!teamHomeMatches) return { wins: 0, losses: 0, draws: 0 };

  const matches = teamHomeMatches.map((e) => {
    if (e.homeTeamGoals > e.awayTeamGoals) {
      return 'win';
    }
    if (e.homeTeamGoals === e.awayTeamGoals) {
      return 'draw';
    }
    return 'loss';
  });

  const wins = matches.filter((e) => e === 'win').length;
  const losses = matches.filter((e) => e === 'loss').length;
  const draws = matches.filter((e) => e === 'draw').length;

  return { wins, losses, draws };
};

const awayWinsLossesAndDraws = (team: ITeams) => {
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

const allWinsLossesAndDraws = (team: ITeams) => {
  const home = homeWinsLossesAndDraws(team);
  const away = awayWinsLossesAndDraws(team);

  const wins = home.wins + away.wins;
  const losses = home.losses + away.losses;
  const draws = home.draws + away.draws;

  return { wins, losses, draws };
};

const homeGoals = (team: ITeams) => {
  const { teamHomeMatches } = team;

  if (!teamHomeMatches) return { goalsFavor: 0, goalsOwn: 0 };

  const goals = teamHomeMatches.map((e) => {
    const { homeTeamGoals, awayTeamGoals } = e;
    const goalsFavor = homeTeamGoals;
    const goalsOwn = awayTeamGoals;
    return { goalsFavor, goalsOwn };
  });

  let favor = 0;
  let own = 0;

  for (let i = 0; i < teamHomeMatches.length; i += 1) {
    favor += goals[i].goalsFavor;
    own += goals[i].goalsOwn;
  }

  return { goalsFavor: favor, goalsOwn: own };
};

const awayGoals = (team: ITeams) => {
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

  return { goalsFavor: favor, goalsOwn: own };
};

const allGoals = (team: ITeams) => {
  const home = homeGoals(team);
  const away = awayGoals(team);

  const goalsFavor = home.goalsFavor + away.goalsFavor;
  const goalsOwn = home.goalsOwn + away.goalsOwn;
  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
};

const businessRulesApply = (teams: ITeams[]) => {
  const response = teams.map((team) => {
    const { teamName } = team;
    const { totalPoints, totalGames, efficiency } = allPointsGamesAndEfficiency(team);
    const { wins, losses, draws } = allWinsLossesAndDraws(team);
    const { goalsFavor, goalsOwn, goalsBalance } = allGoals(team);

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
