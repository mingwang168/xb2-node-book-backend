import express from 'express';
import { authGuard } from '../auth/middleware';
import * as likeController from './controller';

const router=express.Router();
router.post('/books/:bookId/like',authGuard,likeController.userLikeBookStore);
router.delete('/books/:bookId/like',authGuard,likeController.destroyUserLikeBook);
export default router;
