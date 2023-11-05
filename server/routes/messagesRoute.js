import { Router } from 'express';
import { addMessage, getAllMessage } from '../controllers/messageController';

const router = Router();
router.route('/addmsg').post(addMessage);
router.route('/getmsg').post(getAllMessage);

export default router;
