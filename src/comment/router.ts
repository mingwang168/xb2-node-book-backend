import express from 'express';
import * as commentController from './controller';
import { authGuard,accessControl } from '../auth/middleware';
import {filter} from './middleware';
import { COMMENTS_PER_PAGE } from '../app/config';
import { paginate } from '../book/middleware';

const router=express.Router()
router.post('/comments',authGuard,commentController.store);
router.post('/comments/:commentId/reply',authGuard,commentController.reply);
router.patch('/comments/:commentId',authGuard,accessControl({possession:true}),commentController.update);
router.delete('/comments/:commentId',authGuard,accessControl({possession:true}),commentController.destroy);
router.get('/comments',filter,paginate(COMMENTS_PER_PAGE),commentController.index);
router.delete('/comments/:parentId/parent',authGuard,commentController.delByParentId);
export default router;