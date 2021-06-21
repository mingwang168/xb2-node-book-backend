import {Request,Response,NextFunction} from 'express';
import {getBooks,addBook,updateBook, deleteBook} from './service';
import _ from 'lodash';

export const index=(req:Request,res:Response,next:NextFunction) => {
    res.send("hehehe~");
}
export const getAll=async(req:Request,res:Response,next:NextFunction) => {
    try{
        const books=await getBooks();
        res.send(books);
    }catch(err){
        next(err);
    }
}
export const add=async (req:Request,res:Response,next:NextFunction) => {
    const aBook=req.body;
    try{
        const book=await addBook(aBook);
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