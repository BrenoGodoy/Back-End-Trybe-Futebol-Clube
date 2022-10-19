import { Request, Response } from 'express';
import ServiceMatches from '../services/matches';

export default class ControllerMatches {
  constructor(private matches: ServiceMatches) {}

  async getAll(req: Request, res: Response) {
    const { code, response, message } = await this.matches.getAll();

    if (message) return res.status(code).json({ message });

    return res.status(code).json(response);
  }

  async createMatch(req: Request, res: Response) {
    const { code, response, message } = await this.matches.createMatch(req.body);

    if (message) return res.status(code).json({ message });

    return res.status(code).json(response);
  }

  async finish(req: Request, res: Response) {
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token não informado.' });
    }

    const { code, erro } = await this.matches.finish(id);

    if (erro) return res.status(code).json({ erro });

    return res.status(code).json({ message: 'finished' });
  }

  async addGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { code, message } = await this.matches.addGoals(req.body, id);

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ response: 'CONCLUÍDO!' });
  }
}
