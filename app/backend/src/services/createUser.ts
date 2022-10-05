import Users from '../database/models/users';
import IUser from '../interfaces/IUser';
import generateToken from '../helpers/token';

export default class ServiceCreateUser {
  constructor(private usersModel: typeof Users) {}

  async login(body: IUser) {
    const response = await this.usersModel.findOne({ where: { email: body.email } });

    if (!response) return { code: 400, message: 'usuário inexistente!' };

    const token = generateToken(body.password);
    return { code: 200, token };
  }
}
