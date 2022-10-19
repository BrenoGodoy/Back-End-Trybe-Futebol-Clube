import * as express from 'express';
import ControllerMatches from '../controllers/matches';
import ServiceMatches from '../services/matches';
import Matches from '../database/models/matches';

const router = express.Router();

const matches = new ControllerMatches(new ServiceMatches(Matches));

router.get('/', (req, res) => {
  matches.getAll(req, res);
});

router.post('/', (req, res) => {
  matches.createMatch(req, res);
});

router.patch('/:id', (req, res) => {
  matches.addGoals(req, res);
});

router.patch('/:id/finish', (req, res) => {
  matches.finish(req, res);
});

export default router;
