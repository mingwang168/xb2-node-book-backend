import {connection} from '../app/database/mysql';

export const createUserLikeBook=async (userId:number,bookId:number) => {
    const statement=`insert into user_like_book (userId,bookId) values (?,?)`;
    const [data]=await connection.promise().query(statement,[userId,bookId]);
    return data;
}

export const deleteUserLikeBook=async (userId:number,bookId:number) => {
    const statement=`delete from user_like_book where userId=? and bookId=?`;
    const [data] = await connection.promise().query(statement,[userId,bookId]);
    return data;
}