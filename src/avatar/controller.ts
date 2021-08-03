import {Request,Response,NextFunction} from 'express';
import _ from 'lodash';
import Jimp from 'jimp';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {createAvatar,findAvatarByUserId} from './service';

export const store=async(req:Request,res:Response,next:NextFunction) => {
const {id:userId}=req.user;
const fileInfo= _.pick(req.file,['mimetype','filename','size']);
const avatar={...fileInfo,userId};
try {
    const data=await createAvatar(avatar);
    res.status(201).send(data);
} catch (error) {
    next(error);
}
}

export const getAvatar=async(req:Request,res:Response,next:NextFunction) => {
const {userId}=req.params;
try {
    const avatar= await findAvatarByUserId(parseInt(userId,10));
    if(!avatar){throw new Error('FILE_NOT_FOUND')}
    const {size}=req.query;
    let filename=avatar.filename;
    let root=path.join('uploads','avatar');
    let resized='resized';
    if(size){
        const imageSizes=['large','medium','small'];
        if(!imageSizes.some(type=>type===size)){
            throw new Error('FILE_NOT_FOUND');
        }
        const fileExist=fs.existsSync(path.join(root,resized,`${filename}-${size}`));
        if(!fileExist){throw new Error('FILE_NOT_FOUND')}else{
            filename=`${filename}-${size}`;
            root=path.join(root,resized);
        }
    }
    res.sendFile(filename,{
        root,
        headers:{'Content-Type':avatar.mimetype}
    })
} catch (error) {
    next();
}
}