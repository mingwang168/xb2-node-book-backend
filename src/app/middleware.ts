import {Request,Response,NextFunction} from 'express';

export const requestUrl = (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    console.log(`当前Url是: ${req.url} ~`);
    next();
}

export const defaultErrorHandler=(
    error:any,
    req:Request,
    res:Response,
    next:NextFunction
) => {
    if(error.message){
        console.log(error.message);
    }

    let statusCode:number,message:string;

    switch (error.message){
        default:
            statusCode=500;
            message='服务暂时出现问题~~';
            break;
    }
    res.status(statusCode).send({message});
}