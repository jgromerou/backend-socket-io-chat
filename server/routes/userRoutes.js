import { Router } from 'express';
import { register } from '../controllers/userController';

const router = Router();
router.route('/register').post(register);

export default router;
