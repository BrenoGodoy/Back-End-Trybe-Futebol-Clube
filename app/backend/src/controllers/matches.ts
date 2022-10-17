import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import ServiceMatches from '../services/matches';

export default class ControllerMatches {
  constructor(private matches: ServiceMatches) {}

  async getAll(req: Request, res: Response) {
    const { code, response, message } = await this.matches.getAll();

    if (message) return res.status(code).json({ message });

    return res.status(code).json(response);
  }

  async createMatch(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res
        .status(401).json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!authorization) {
      return res.status(401).json({ message: 'Token não informado.' });
    }

    verify(authorization, 'vascodagama', (err) => {
      if (err) { return res.status(401).json({ message: 'Token must be a valid token' }); }
    });

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

    verify(authorization, 'vascodagama', (err) => {
      if (err) { return res.status(500).json({ message: 'Token inválido.' }); }
    });

    const numberId = Number(id);
    const { code, erro } = await this.matches.finish(numberId);

    if (erro) return res.status(code).json({ erro });

    return res.status(code).json({ message: 'finished' });
  }
}
