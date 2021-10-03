import {Request,Response,NextFunction} from 'express';
import {getBooks,addBook,updateBook, deleteBook,deleteBookTag,getBooksTotalCount, getBookById,deleteBookFile} from './service';
import _ from 'lodash';
import {createTag,getTagByName,createBookTag,bookHasTag} from '../tag/service'
import { TagModel } from '../tag/model';

export const index=(req:Request,res:Response,next:NextFunction) => {
    res.send("hehehe~");
}
export const getAll=async(req:Request,res:Response,next:NextFunction) => {
    try {
        const totalCount=await getBooksTotalCount({sort:req.sort,filter:req.filter,pagination:req.pagination});
        res.header('X-Total-Count',totalCount);
    } catch (error) {
        next(error);
    }
    try{
        const books=await getBooks({sort:req.sort,filter:req.filter,pagination:req.pagination});
        res.send(books);
    }catch(err){
        next(err);
    }
}
export const add=async (req:Request,res:Response,next:NextFunction) => {
    const {title,author}=req.body;
    const {id:userId}=req.user;
    try{
        const book=await addBook({title,author,userId});
        res.status(201).send(book);
    }catch(err){
        next(err);
    }
}
export const update=async (req:Request,res:Response,next:NextFunction) => {
    const aBook=_.pick(req.body,['title','author'])
    const id=req.params.bookId;

    try{
        const book=await updateBook(parseInt(id,10),aBook);
        res.send(book);
    }catch(err){
        next(err);
    }

}

export const deleteABook=async (req:Request,res:Response,next:NextFunction) => {
    const id=req.params.bookId;
    try{
        const book= await deleteBook(parseInt(id,10));
        res.send(book);
    }catch(err){
        next(err);
    }
}

export const storeBookTag=async(req:Request,res:Response,next:NextFunction) => {
    const {bookId}=req.params;
    const {name}=req.body;
    let tag:TagModel;
    try {
        tag=await getTagByName(name);
    } catch (error) {
        return next(error);
    }
    if(tag){
        try {
            const bookTag=await bookHasTag(parseInt(bookId,10),tag.id!);
            if(bookTag) throw new Error('BOOK_ALREADY_HAS_THIS_TAG');
        } catch (error) {
            return next(error);
        }
    };
    if(!tag){
        try {
            const data=await createTag({name});
            tag = { id: data.insertId };
        } catch (error) {
            return next(error);
        }
    }
    try {
        await createBookTag(parseInt(bookId,10),tag.id!)
        res.sendStatus(201);
    } catch (error) {
        return next(error);
    }
    };

    export const destroyBookTag=async(req:Request,res:Response,next:NextFunction) => {
    const {bookId}=req.params;
    const {tagId}=req.body;
    try {
        const data=await deleteBookTag(parseInt(bookId,10),tagId);
        if(data.affectedRows==0) {return next(new Error('Tag_OF_BOOK_NOT_EXITS'));}
        res.send(data);
    } catch (error) {
        next(error);
    }
    }

    export const destroyBookFile=async(req:Request,res:Response,next:NextFunction) => {
        const {bookId}=req.params;
        try {
            const data=await deleteBookFile(parseInt(bookId,10));
            if(data.affectedRows==0) {return next(new Error('File_OF_BOOK_NOT_EXITS'));}
            res.send(data);
        } catch (error) {
            next(error);
        }
        }

    export const show=async(req:Request,res:Response,next:NextFunction) => {
    const {bookId}=req.params;
    try {
        const data= await getBookById(parseInt(bookId,10));
        res.send(data);
    } catch (error) {
        next(error);
    }
    }