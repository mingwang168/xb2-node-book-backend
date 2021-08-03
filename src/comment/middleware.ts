import {Request,Response,NextFunction} from 'express';

export const filter=async(req:Request,res:Response,next:NextFunction) => {
    const {book,user,action}=req.query;
req.filter={name:'default',sql:'comment.parentId is null'};
if(book && !user && !action){
    req.filter={name:'postComments',sql:'comment.parentId is null and comment.bookId= ?',param:book as string}
}
if(user && !book && action=='replied'){
    req.filter={name:'userReplied',sql:'comment.parentId is not null and comment.userId =?',param:user as string}
}
next();
}
