import {connection} from '../app/database/mysql';
import { TagModel } from './model';

export const createTag=async (tag:TagModel) => {
    const statement=`insert into tag set ?`;
    const [data]=await connection.promise().query(statement,tag);
    return data as any;
}

export const getTagByName=async (tagName:string) => {
    const statement=`select id,name from tag where name= ?`;
    const [data]=await connection.promise().query(statement,tagName);
    const result=data as any;
    return result[0];
}
export const createBookTag=async (bookId:number,tagId:number) => {
 const statement=`insert into book_tag (bookId,tagId) values (?,?)`;
 const [data]=await connection.promise().query(statement,[bookId,tagId]);
 return data;   
}
export const bookHasTag=async (bookId:number,tagId:number) => {
    const statement=`select * from book_tag where bookId=? and tagId=?`;
    const [data]=await connection.promise().query(statement,[bookId,tagId]);
    const result=data as any;
    return result[0]?true:false;   
   }
   