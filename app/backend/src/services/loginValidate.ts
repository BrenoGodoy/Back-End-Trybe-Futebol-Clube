import { decode } from 'jsonwebtoken';
import Users from '../database/models/users';

export default class ServiceLoginValidate {
  constructor(private usersModel: typeof Users) {}

  async validate(token: string) {
    const data = decode(token);
    const { role } = JSON.parse(JSON.stringify(data));
    const response = await this.usersModel.findOne();

    if (!response) return { code: 401, message: 'Incorrect email or password' };

    return { code: 200, role };
  }
}
