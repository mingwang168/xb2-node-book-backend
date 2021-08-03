import {Request,Response,NextFunction} from 'express';
import {createTag,getTagByName} from './service'


export const store=async(req:Request,res:Response,next:NextFunction) => {
const {name}=req.body;
try {
    const tag=await getTagByName(name);
    if(tag) throw new Error('TAG_ALREADY_EXISTS');
    const data=await createTag({name});
    res.sendStatus(201).send(data);
} catch (error) {
    next(error);
}
}
