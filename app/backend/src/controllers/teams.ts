import { Request, Response } from 'express';
import ServiceTeams from '../services/teams';

export default class ControllerTeams {
  constructor(private serviceTeams: ServiceTeams) {}

  async getAll(req: Request, res: Response) {
    const { code, response, message } = await this.serviceTeams.getAll();

    if (message) return res.status(code).json({ message });

    return res.status(code).json(response);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const { code, response, message } = await this.serviceTeams.getOne(id);

    if (message) return res.status(code).json({ message });

    return res.status(code).json(response);
  }
}
