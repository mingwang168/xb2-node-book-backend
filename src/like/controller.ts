import {Request,Response,NextFunction} from 'express';
import {createUserLikeBook, deleteUserLikeBook} from './service';

export const userLikeBookStore=async(req:Request,res:Response,next:NextFunction) => {
const {bookId}=req.params;
const {id:userId}=req.user;
try {
    const data=await createUserLikeBook(userId!,parseInt(bookId,10));
    res.status(201).send(data);
} catch (error) {
    next(error);
}
}

export const destroyUserLikeBook=async(req:Request,res:Response,next:NextFunction) => {
    const {bookId}=req.params;
    const {id:userId}=req.user;
    try {
        const data=await deleteUserLikeBook(userId!,parseInt(bookId,10));
        res.send(data);
    } catch (error) {
        next(error);
    }
}