import * as express from 'express';
import ControllerCreateUser from './controllers/createUser';
import ServiceCreateUser from './services/createUser';
import Users from './database/models/users';
import loginValidation from './middlewares/loginValidation';
import ControllerLoginValidate from './controllers/loginValidate';
import ServiceLoginValidate from './services/loginValidate';
import ControllerTeams from './controllers/teams';
import ServiceTeams from './services/teams';
import Teams from './database/models/teams';
import ControllerMatches from './controllers/matches';
import ServiceMatches from './services/matches';
import Matches from './database/models/matches';

const router = express.Router();

const useController = new ControllerCreateUser(new ServiceCreateUser(Users));
const loginValidate = new ControllerLoginValidate(new ServiceLoginValidate(Users));
const teams = new ControllerTeams(new ServiceTeams(Teams));
const matches = new ControllerMatches(new ServiceMatches(Matches));

router.post('/login', loginValidation, (req, res) => {
  useController.login(req, res);
});

router.get('/login/validate', (req, res) => {
  loginValidate.validate(req, res);
});

router.get('/teams', (req, res) => {
  teams.getAll(req, res);
});

router.get('/teams/:id', (req, res) => {
  teams.getOne(req, res);
});

router.get('/matches', (req, res) => {
  matches.getAll(req, res);
});

router.post('/matches', (req, res) => {
  matches.createMatch(req, res);
});

router.patch('/matches/:id/finish', (req, res) => {
  matches.finish(req, res);
});

router.patch('/matches/:id', (req, res) => {
  matches.addGoals(req, res);
});

export default router;
