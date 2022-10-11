import Teams from '../database/models/teams';

export default class ServiceTeams {
  constructor(private model: typeof Teams) {}

  async getAll() {
    const response = await this.model.findAll();
    if (!response) return { code: 400, message: 'ERRO!' };

    return { code: 200, response };
  }
}
