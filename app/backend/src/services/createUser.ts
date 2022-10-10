import Users from '../database/models/users';
import IUser from '../interfaces/IUser';
import generateToken from '../helpers/token';

export default class ServiceCreateUser {
  constructor(private usersModel: typeof Users) {}

  async login(body: IUser) {
    const response = await this.usersModel.findOne({ where: { email: body.email } });

    if (!response) return { code: 401, message: 'Incorrect email or password' };

    const token = generateToken(body.password, response.role);
    return { code: 200, token };
  }
}
