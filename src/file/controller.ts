import path from "path";
import fs from 'fs';
import {Request,Response,NextFunction} from 'express';
import _ from 'lodash';
import { createFile, findFileById } from './service';

export const store=async(req:Request,res:Response,next:NextFunction) => {
const {id:userId}=req.user;
const {book}=req.query;
const bookId=parseInt(book as string,10);
const fileInfo=_.pick(req.file,[
    'originalname',
    'mimetype',
    'filename',
    'size',
]);
try {
    const data=await createFile({...fileInfo,userId,bookId,...req.fileMetaData});
    res.status(200).send(data);
} catch (error) {
    next(error);
}
}
export const serve=async(req:Request,res:Response,next:NextFunction) => {
const {fileId}=req.params;
try{
const file=await findFileById(parseInt(fileId,10));
const {size}=req.query;
let filename=file.filename;
let root='uploads';
let resized='resized';
if(size){
    const imagesizes=['large','medium','thumbnail'];
    if(!imagesizes.some(item=>item==size)){
        throw new Error('FILE_NOT_FOUND');
    }
    console.log(root,resized,`${filename}-${size}`);
    const fileExit=fs.existsSync(path.join(root,resized,`${filename}-${size}`));
    if(fileExit){
        filename=`${filename}-${size}`;
        root=path.join(root,resized);

    }
}

res.sendFile(filename,{
    root,
    headers:{
        'Content-Type':file.mimetype,
    }
})
}catch(err){
next(err)
}
};
export const metadata=async(req:Request,res:Response,next:NextFunction) => {
 const {fileId}=req.params;
 try {
     const file= await findFileById(parseInt(fileId,10));
     const data=_.pick(file,['id','size','width','height','metadata']);
    res.send(data);
 } catch (error) {
     next(error);
 }
}