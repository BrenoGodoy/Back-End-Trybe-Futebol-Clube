import Users from '../database/models/users';
import IUser from '../interfaces/IUser';

export default class ServiceCreateUser {
  constructor(private usersModel: typeof Users) {}

  async create(body: IUser) {
    const response = await this.usersModel.create(body);

    if (!response) return { code: 400, message: 'erro' };

    return { code: 200 };
  }
}
