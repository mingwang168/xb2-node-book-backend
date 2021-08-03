import * as userService from '../user/service';
import {Request,Response,NextFunction} from 'express';
import bcrypt from 'bcrypt';
import jwt, { GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import {PUBLIC_KEY} from '../app/config';
import { TokenPayload } from './interface';
import { possess } from './service';

export const validateUserLogin=async (req:Request,res:Response,next:NextFunction) => {
    console.log('验证用户登录数据');
    const {name,password}=req.body;
    if(!name) return next(new Error('USERNAME_IS_REQUIRED'));
    if(!password) return next(new Error('PASSWORD_IS_REQUIRED'));
    const user= await userService.getUserByName(name,{password:true});
    if(!user) return next(new Error('USER_DOES_NOT_EXIST'));
    const matched=await bcrypt.compare(password,user.password);
    if(!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'));
    req.body.user=user;
    next();
};
export const authGuard=(req:Request,res:Response,next:NextFunction) => {
    console.log('验证用户身份');
    try {
        const authorization=req.header('Authorization');
        if(!authorization) throw new Error();
        const token=authorization.replace('Bearer ','');
        if(!token) throw new Error();
        const decoded=jwt.verify(token,PUBLIC_KEY as Secret,{algorithms:['RS256']});
        req.user=decoded as TokenPayload;
        next();
    } catch (error) {
        next(new Error('UNAUTHORIZED'));
    }
}
interface AccessControlOptions {
    possession?:boolean;
}
export const accessControl=(options:AccessControlOptions) => {
    return async (req:Request,res:Response,next:NextFunction) => {
        console.log('访问控制');
        const {possession}=options;
        const {id:userId}=req.user;
        if(userId==1) return next();
        const resourceIdParam=Object.keys(req.params)[0];
        const resourceType=resourceIdParam.replace('Id','');
        const resourceId=parseInt(req.params[resourceIdParam],10);
        if(possession){
            try {
                const ownResource=await possess({resourceId,resourceType,userId});
                if(!ownResource) return next(new Error('USER_DOES_NOT_OWN_RESOURCE'));
            } catch (error) {
                return next(error);
            }
        }
        next();
    }
}