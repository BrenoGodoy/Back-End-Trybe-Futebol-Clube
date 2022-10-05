import Users from '../database/models/users';
import IUser from '../interfaces/IUser';
import generateToken from '../helpers/token';

export default class ServiceCreateUser {
  constructor(private usersModel: typeof Users) {}

  async create(body: IUser) {
    const response = await this.usersModel.create(body);
    const token = generateToken(body.password);

    if (!response) return { code: 400, message: 'erro' };

    return { code: 200, token };
  }
}
