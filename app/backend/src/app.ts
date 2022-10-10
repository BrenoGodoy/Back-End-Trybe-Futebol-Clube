import * as express from 'express';
import ControllerCreateUser from './controllers/createUser';
import ServiceCreateUser from './services/createUser';
import Users from './database/models/users';
import loginValidation from './middlewares/loginValidation';
import ControllerLoginValidate from './controllers/loginValidate';
import ServiceLoginValidate from './services/loginValidate';

const useController = new ControllerCreateUser(new ServiceCreateUser(Users));
const loginValidate = new ControllerLoginValidate(new ServiceLoginValidate(Users));

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.post('/login', loginValidation, (req, res) => {
      useController.login(req, res);
    });

    this.app.get('/login/validate', (req, res) => {
      loginValidate.validate(req, res);
    });
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
