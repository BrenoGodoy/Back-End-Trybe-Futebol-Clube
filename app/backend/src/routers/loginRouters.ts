import * as express from 'express';
import ControllerCreateUser from '../controllers/createUser';
import ServiceCreateUser from '../services/createUser';
import Users from '../database/models/users';
import loginValidation from '../middlewares/loginValidation';
import ControllerLoginValidate from '../controllers/loginValidate';
import ServiceLoginValidate from '../services/loginValidate';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

const useController = new ControllerCreateUser(new ServiceCreateUser(Users));
const loginValidate = new ControllerLoginValidate(new ServiceLoginValidate(Users));

router.post('/', loginValidation, (req, res) => {
  useController.login(req, res);
});

router.get('/validate', verifyToken, (req, res) => {
  loginValidate.validate(req, res);
});

export default router;
