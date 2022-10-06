import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import ServiceCreateUser from '../services/createUser';

export default class ControllerCreateUser {
  constructor(private CreateUser: ServiceCreateUser) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const body: IUser = { email, password };
    const { code, message, token } = await this.CreateUser.login(body);

    if (message) res.status(code).json({ message });

    res.status(code).json({ token });
  }
}
