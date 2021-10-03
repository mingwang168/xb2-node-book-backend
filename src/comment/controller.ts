import {Request,Response,NextFunction} from 'express';
import {createComment, deleteComment, getComments, isReplyComment, updateComment,deleteCommentByParentId,getCommentsTotalCount} from './service';

export const store=async(req:Request,res:Response,next:NextFunction) => {
const {content,bookId}=req.body;
const {id:userId}=req.user;
const comment={
    content,
    bookId,
    userId,
}
try {
    const data=await createComment(comment);
    res.status(201).send(data);
} catch (error) {
    next(error);
}
};
export const reply=async(req:Request,res:Response,next:NextFunction) => {
    const {commentId}=req.params;
    const parentId=parseInt(commentId,10);
    const {id:userId}=req.user;
    const {content,bookId}=req.body;
    const comment={
        content,
        bookId,
        userId,
        parentId,
    };
    console.log(commentId,parentId);
    try {
        const reply=await isReplyComment(parentId);
        if(reply) return next(new Error('UNABLE_TO_REPLY_THIS_COMMENT'));
    } catch (error) {
        return next(error);
    }
    try {
        const data=await createComment(comment);
        res.status(201).send(data);
    } catch (error) {
        next(error);
    }
}
export const update=async(req:Request,res:Response,next:NextFunction) => {
const {content}=req.body;
const {commentId}=req.params;
const comment={id:parseInt(commentId,10),content,}
try {
    const data=await updateComment(comment);
    res.send(data);
} catch (error) {
    next(error);
}
}
export const destroy=async(req:Request,res:Response,next:NextFunction) => {
const {commentId}=req.params;
try {
    const data=await deleteComment(parseInt(commentId,10));
    res.send(data);
} catch (error) {
    next(error);
}
};
export const delByParentId=async(req:Request,res:Response,next:NextFunction) => {
const {parentId}=req.params;
try {
    const data=await deleteCommentByParentId(parseInt(parentId,10));
    res.send(data);
} catch (error) {
    next(error);
}
};
export const index=async(req:Request,res:Response,next:NextFunction) => {
    try {
        const totalCount=await getCommentsTotalCount({filter:req.filter,pagination:req.pagination});
        res.header('X-Total-Count',totalCount);
    } catch (error) {
        next(error);
    }
try{
    const data=await getComments({filter:req.filter,pagination:req.pagination});
    res.send(data);
}catch(error){
    next(error);
}
}
