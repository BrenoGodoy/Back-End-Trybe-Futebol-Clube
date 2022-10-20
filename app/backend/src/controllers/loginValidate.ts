import { Request, Response } from 'express';
import ServiceLoginValidate from '../services/loginValidate';

export default class ControllerLoginValidate {
  constructor(private loginValidate: ServiceLoginValidate) {}

  async validate(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token não informado.' });
    }

    const { code, message, role } = await this.loginValidate.validate(authorization);

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ role });
  }
}
