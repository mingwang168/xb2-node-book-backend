import {Request,Response,NextFunction} from 'express';
import path from 'path';
import multer from 'multer';
import Jimp from 'jimp';
import {fileFilter} from '../file/middleware';



const avatarUploadFilter=fileFilter(['image/png','image/jpg','image/jpeg'])
const avatarUpload = multer({
    dest: 'uploads/avatar',
    fileFilter:avatarUploadFilter
});

export const avatarInterceptor = avatarUpload.single('avatar');

export const avatarProcessor=async(req:Request,res:Response,next:NextFunction) => {
const {file}=req;
const filePath=path.join(file!.destination,'resized',file!.filename);
try {
    const image=await Jimp.read(file!.path);
    image.cover(256,256).quality(85).write(`${filePath}-large`);
    image.cover(128,128).quality(85).write(`${filePath}-medium`);
    image.cover(64,64).quality(85).write(`${filePath}-small`);
} catch (error) {
    next(error);
}
next();
}
