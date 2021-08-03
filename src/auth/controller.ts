import {Request,Response,NextFunction} from 'express';
import { signToken } from './service';


export const login=async (req:Request,res:Response,next:NextFunction) => {
    const {user:{id,name}}=req.body;

    const payload={id,name};
    try {
        const token=signToken({payload});
        res.send({id,name,token})
    } catch (error) {
        next(error);
    }
};
export const validate=async(req:Request,res:Response,next:NextFunction) => {
    console.log(req.user);
    res.sendStatus(200);
}