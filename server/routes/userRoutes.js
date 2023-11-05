import { Router } from 'express';
import {
  register,
  login,
  setAvatar,
  getAllUsers,
} from '../controllers/userController';

const router = Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/setavatar/:id').post(setAvatar);
router.route('/allusers/:id').get(getAllUsers);

export default router;
