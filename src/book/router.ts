import express from 'express';
import * as bookController from './controller';
import {requestUrl} from '../app/middleware';
import {authGuard,accessControl} from '../auth/middleware';
import {sort,filter,paginate} from './middleware';
import { BOOKS_PER_PAGE } from '../app/config';
const router=express.Router();

//router.get('/',requestUrl,bookController.index);
router.get('/books',sort,filter,paginate(BOOKS_PER_PAGE),bookController.getAll);
router.get('/books/:bookId',bookController.show);
router.post('/books',authGuard,bookController.add);
router.patch('/books/:bookId',requestUrl,authGuard,accessControl({possession:true}),bookController.update);
router.delete('/books/:bookId',requestUrl,authGuard,accessControl({possession:true}),bookController.deleteABook);
router.post('/books/:bookId/tag',authGuard,accessControl({possession:true}),bookController.storeBookTag);
router.delete('/books/:bookId/tag',authGuard,accessControl({possession:true}),bookController.destroyBookTag);
export default router;