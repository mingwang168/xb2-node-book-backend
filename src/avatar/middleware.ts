import {Request,Response,NextFunction} from 'express';
import path from 'path';
import multer from 'multer';
import Jimp from 'jimp';
const sharp = require('sharp');

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
   await sharp(`${file!.destination}/${file!.filename}`)
  .resize(256, 256)
  .toFile(`${filePath}-large`, function(err:any) {
    if(err){console.log(err)}
  });
   await sharp(`${file!.destination}/${file!.filename}`)
  .resize(128, 128)
  .toFile(`${filePath}-medium`, function(err:any) {
    if(err){console.log(err)}
  });
   await sharp(`${file!.destination}/${file!.filename}`)
  .resize(64, 64)
  .toFile(`${filePath}-small`, function(err:any) {
    if(err){console.log(err)}
  });

/*     const image=await Jimp.read(file!.path);
    image.cover(256,256).quality(85).write(`${filePath}-large`);
    image.cover(128,128).quality(85).write(`${filePath}-medium`);
    image.cover(64,64).quality(85).write(`${filePath}-small`); */
} catch (error) {
    next(error);
}
next();
}
