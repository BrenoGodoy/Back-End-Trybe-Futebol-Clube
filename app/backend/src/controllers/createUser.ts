import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import ServiceCreateUser from '../services/createUser';

export default class ControllerCreateUser {
  constructor(private CreateUser: ServiceCreateUser) {}

  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const body: IUser = { email, password };
    const { code, message, data } = await this.CreateUser.create(body);

    if (message) return res.status(code).json({ message });
    return res.status(code).json({ message: data });
  }
}
