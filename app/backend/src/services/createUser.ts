import bcrypt = require('bcryptjs');
import Users from '../database/models/users';
import IUser from '../interfaces/IUser';

export default class ServiceCreateUser {
  constructor(private usersModel: typeof Users) {}

  async create(body: IUser) {
    const token = bcrypt.hashSync(body.password, 10);

    await this.usersModel.create(body);

    if (token === 'oi') return { code: 400, message: 'erro' };

    return { code: 200, data: token };
  }
}
