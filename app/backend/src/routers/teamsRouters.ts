import * as express from 'express';
import ControllerTeams from '../controllers/teams';
import ServiceTeams from '../services/teams';
import Teams from '../database/models/teams';

const router = express.Router();

const teams = new ControllerTeams(new ServiceTeams(Teams));

router.get('/', (req, res) => {
  teams.getAll(req, res);
});

router.get('/:id', (req, res) => {
  teams.getOne(req, res);
});

export default router;
