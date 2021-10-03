import {Request,Response,NextFunction} from 'express';
import {UserModel} from './model';
import _ from 'lodash';
import {getUserById, getUserByName} from './service';
import bcrypt from 'bcrypt';

export const validateUserData=async (req:Request,res:Response,next:NextFunction)=>{
console.log('验证用户数据');
const {name,password}=req.body;
if(!name) return next(new Error('USERNAME_IS_REQUIRED'));
if(!password) return next(new Error('PASSWORD_IS_REQUIRED'));

const data=await getUserByName(name);
if(data) return next(new Error('USER_ALREADY_EXIST'));
next();
};
export const hashPassword= async (req:Request,res:Response,next:NextFunction) => {
    const {password}=req.body;
    req.body.password=await bcrypt.hash(password,10);
    next();
}
export const validateUpdateUserData=async(req:Request,res:Response,next:NextFunction) => {
const {validate,update}=req.body;
const {id:userId}=req.user;

try {
    if(!_.has(validate,'password')){return next(new Error('PASSWORD_IS_REQUIRED'))};
const user=await getUserById(userId!,{password:true});
const match=await bcrypt.compare(validate.password,user.password);
if(!match){return next(new Error('PASSWORD_DOES_NOT_MATCH'))};

if(update.name){
    const user=await getUserByName(update.name);
    if(user){return next(new Error('USER_ALREADY_EXIST'))}
}
if(update.password){
    const match=await bcrypt.compare(update.password,user.password);
    if(match){return next(new Error('PASSWORD_IS_THE_SAME'))}
    req.body.update.password=await bcrypt.hash(update.password,10);
}
} catch (error) {
    return next(error);
}
next();
}