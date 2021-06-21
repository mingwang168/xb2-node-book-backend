import express from 'express';
import * as bookController from './controller';
import {requestUrl} from '../app/middleware';

const router=express.Router();

router.get('/',requestUrl,bookController.index);
router.get('/books',requestUrl,bookController.getAll);
router.post('/books',requestUrl,bookController.add);
router.patch('/books/:bookId',requestUrl,bookController.update);
router.delete('/books/:bookId',requestUrl,bookController.deleteABook);
export default router;