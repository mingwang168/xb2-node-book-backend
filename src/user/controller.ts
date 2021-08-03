import * as userService from './service';
import {Request,Response,NextFunction} from 'express';
import _ from 'lodash';
export const store = async (req:Request,res:Response,next:NextFunction) => {
    const {name,password}=req.body;
    try{
        const data= await userService.createUser({name,password});
        res.status(201).send(data);
        }catch(err){
        next(err);
    }
}

export const show=async(req:Request,res:Response,next:NextFunction) => {
const {userId}=req.params;
try {
    const user=await userService.getUserById(parseInt(userId,10));
    if(!user){
       return next(new Error('USER_NOT_FOUND'));
    }
    res.send(user);
} catch (error) {
    next(error);
}
}

export const updateUser=async(req:Request,res:Response,next:NextFunction) => {
const {id:userId}=req.user;
const userData=_.pick(req.body.update,['name','password'])
try {
    const data=await userService.updateUser(userId!,userData);
    res.send(data)
} catch (error) {
    next(error);
}
}