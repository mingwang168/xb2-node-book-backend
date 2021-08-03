import {connection} from '../app/database/mysql';
import { AvatarModel } from './model';

export const createAvatar=async (avatar:AvatarModel) => {
    const statement=`insert into avatar set ?`;
    const [data]=await connection.promise().query(statement,avatar);
    return data;
}
export const findAvatarByUserId =async (userId:number) => {
    const statement=`select * from avatar where userId=? order by avatar.id desc limit 1`;
    const [data]=await connection.promise().query(statement,userId);
    const result= data as any;
    return result[0];
}