import express from 'express';
import bookRouter from '../book/router';
import { defaultErrorHandler } from './middleware';
const app=express();

app.use(express.json());
app.use(bookRouter);
app.use(defaultErrorHandler);

export default app;