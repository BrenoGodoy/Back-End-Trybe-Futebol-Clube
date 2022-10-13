import { Request, Response } from 'express';
import ServiceMatches from '../services/matches';

export default class ControllerMatches {
  constructor(private matches: ServiceMatches) {}

  async getAll(req: Request, res: Response) {
    const { code, response, message } = await this.matches.getAll();

    if (message) return res.status(code).json({ message });

    return res.status(code).json(response);
  }
}
