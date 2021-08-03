import express from 'express';
import {authGuard} from '../auth/middleware';
import * as tagController from './controller';
const router=express.Router();

router.post('/tags',authGuard,tagController.store);
export default router;