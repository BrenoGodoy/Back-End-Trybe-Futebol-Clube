import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IUser from '../interfaces/IUser';
import ServiceCreateUser from '../services/createUser';

dotenv.config();

// const secret = process.env.JWT_SECRET;

export default class ControllerCreateUser {
  constructor(private CreateUser: ServiceCreateUser) {}

  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const body: IUser = { email, password };
    const { code, message } = await this.CreateUser.create(body);

    if (message) res.status(code).json({ message });
    const token = jwt.sign(body.password, 'vascodagama');

    res.status(code).json({ token });
  }
}
