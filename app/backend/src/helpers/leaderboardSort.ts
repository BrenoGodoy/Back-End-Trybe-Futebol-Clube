interface IArray {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number | undefined;
  efficiency: string | undefined;
}

const tiebreaker = (array: IArray[]) => {
  array.sort((a, b) => {
    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    return 0;
  });
  array.sort((a, b) => {
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    return 0;
  });
  array.sort((a, b) => {
    if (a.goalsBalance === undefined) return 0;
    if (b.goalsBalance === undefined) return 0;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    return 0;
  });

  return array;
};

const arraySort = (array: IArray[]) => {
  const sortedArray = tiebreaker(array);
  sortedArray.sort((a, b) => {
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    return 0;
  });
  sortedArray.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    return 0;
  });

  return sortedArray;
};

export default arraySort;
