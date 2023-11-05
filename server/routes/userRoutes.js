import { Router } from 'express';
import { register, login, setAvatar } from '../controllers/userController';

const router = Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/setavatar/:id').post(setAvatar);

export default router;
