import express from 'express';
import * as userController from './controller';
import {authGuard, validateUserLogin} from './middleware';

const router=express.Router();
 router.post('/login',validateUserLogin,userController.login);
 router.post('/auth/validate',authGuard,userController.validate);

 export default router;