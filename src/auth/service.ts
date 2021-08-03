import jwt from 'jsonwebtoken';
import { connection } from '../app/database/mysql';
import {PRIVATE_KEY} from '../app/config';

interface SignTokenOption {
    payload?:any;
}

export const signToken=(option:SignTokenOption) => {
    const {payload}=option;
    const token=jwt.sign(payload,PRIVATE_KEY!,{algorithm:'RS256'});
    return token;
}
interface PossessOption {
    resourceId:number;
    resourceType:string;
    userId?:number;
}
export const possess= async (option:PossessOption) => {
    const {resourceId,resourceType,userId}=option;
    const statement=`select count(${resourceType}.id) as count from ${resourceType} where ${resourceType}.id= ? and userId= ?`;
    const [data]=await connection.promise().query(statement,[resourceId,userId]);
    const result= data as any;
    return result[0].count ? true : false;
}