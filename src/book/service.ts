import {connection} from '../app/database/mysql';
import { BookModel } from './model';

export const getBooks= async() => {
    const statement=`select * from book`;
    const [data]=await connection.promise().query(statement);
    return data;
};
export const addBook=async (book:BookModel) => {
const statement=`insert into book set ?`;
const [data]= await connection.promise().query(statement,book);
return data;
}
export const updateBook=async (bookId:number,book:BookModel) => {
    const statement =`update book set ? where id= ?`;
    const [data]= await connection.promise().query(statement,[book,bookId]);
    return data;
}
export const deleteBook=async (bookId:number) => {
    const statement=`delete from book where id= ?`;
    const [data]=await connection.promise().query(statement,bookId);
    return data;
}