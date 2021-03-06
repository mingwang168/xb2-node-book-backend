import express from 'express';
import { authGuard } from '../auth/middleware';
import * as fileController from './controller';
import { fileInterceptor ,fileProcessor} from './middleware';

const router=express.Router();

router.post('/files',authGuard,fileInterceptor,fileProcessor,fileController.store)
router.get('/files/:fileId/serve',fileController.serve);
router.get('/files/:fileId/metadata',fileController.metadata);


export default router;