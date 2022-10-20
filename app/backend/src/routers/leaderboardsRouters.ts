import * as express from 'express';
import Teams from '../database/models/teams';
import ControllerLeaderboards from '../controllers/leaderboards';
import ServiceLeaderboards from '../services/leaderboards';

const router = express.Router();

const leaderboards = new ControllerLeaderboards(new ServiceLeaderboards(Teams));

router.get('/', (req, res) => {
  leaderboards.getAll(req, res);
});

router.get('/home', (req, res) => {
  leaderboards.getHome(req, res);
});

router.get('/away', (req, res) => {
  leaderboards.getAway(req, res);
});

export default router;
