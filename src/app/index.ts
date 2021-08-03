import express from 'express';
import bookRouter from '../book/router';
import userRouter from '../user/router';
import authRouter from '../auth/router';
import fileRouter from '../file/router';
import tagRouter from '../tag/router';
import commentRouter from '../comment/router';
import avatarRouter from '../avatar/router';
import likeRouter from '../like/router';
import appRouter from './app.router';
import { defaultErrorHandler } from './middleware';

const app=express();

app.use(express.json());
app.use(bookRouter,userRouter,authRouter,fileRouter,tagRouter,commentRouter,avatarRouter,likeRouter,appRouter);
app.use(defaultErrorHandler);

export default app;