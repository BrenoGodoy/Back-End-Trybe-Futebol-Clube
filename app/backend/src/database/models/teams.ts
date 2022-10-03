import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Matches extends Model {
  id: number;
  teamName: string;
}

Matches.init({
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

export default Matches;
