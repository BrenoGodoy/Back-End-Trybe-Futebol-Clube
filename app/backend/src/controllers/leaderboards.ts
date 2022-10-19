import { Request, Response } from 'express';
import ServiceLeaderboards from '../services/leaderboards';

export default class ControllerLeaderboards {
  constructor(private leaderboards: ServiceLeaderboards) {}

  async getHome(req: Request, res: Response) {
    const { code, response, message } = await this.leaderboards.getHome();

    if (message) return res.status(code).json({ message });

    return res.status(code).json(response);
  }
}
