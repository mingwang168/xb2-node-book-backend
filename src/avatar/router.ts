import express from 'express'
import { authGuard } from '../auth/middleware';
import * as avatarController from './controller';
import {avatarInterceptor,avatarProcessor} from './middleware'
const router=express.Router();

router.post('/avatar',authGuard,avatarInterceptor,avatarProcessor,avatarController.store);
router.get('/user/:userId/avatar',avatarController.getAvatar);
export default router;