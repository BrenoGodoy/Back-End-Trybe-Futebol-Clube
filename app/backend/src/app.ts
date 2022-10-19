import * as express from 'express';
import LoginRoute from './routers/loginRouters';
import TeamsRoute from './routers/teamsRouters';
import MatchesRoute from './routers/matchesRouters';
import LeaderboardsRoute from './routers/leaderboardsRouters';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use('/login', LoginRoute);
    this.app.use('/teams', TeamsRoute);
    this.app.use('/matches', MatchesRoute);
    this.app.use('/leaderboards', LeaderboardsRoute);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
