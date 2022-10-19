import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matches from './matches';

class Teams extends Model {
  id: number;
  teamName: string;
}

Teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING(50),
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });
Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHomeMatches' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAwayMatches' });

export default Teams;
