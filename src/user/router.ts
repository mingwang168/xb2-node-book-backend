import express from 'express';
import { authGuard } from '../auth/middleware';
import * as userController from './controller';
import {validateUserData,hashPassword, validateUpdateUserData} from './middleware';

const router=express.Router();

router.post('/users',validateUserData,hashPassword,userController.store);
router.get('/users/:userId',userController.show);
router.patch('/users',authGuard,validateUpdateUserData,userController.updateUser);
export default router;