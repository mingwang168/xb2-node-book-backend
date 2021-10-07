import {connection} from '../app/database/mysql';
import { BookModel } from './model';
import { sqlFragment } from './provider';

export interface GetBooksOptionsFilter {
    name:string;
    sql?:string;
    param?:string;
}

export interface GetBooksOptionsPagination {
    limit:number;
    offset:number;
}

interface GetBooksOptions {
 sort?:string;
 filter?:GetBooksOptionsFilter;
 pagination:GetBooksOptionsPagination;
}

export const getBooks= async(options:GetBooksOptions) => {
    const {sort,filter,pagination:{limit,offset}}=options;
    let params: Array<any>=[limit,offset];
    if(filter!.param){
      params=[filter?.param, ...params]
    }
    const statement = `select book.id,book.title,book.author, ${sqlFragment.user},${sqlFragment.totalComments},${sqlFragment.file},${sqlFragment.tags},${sqlFragment.userLikeBook} from book ${sqlFragment.leftJoinUser} ${sqlFragment.leftJoinOneFile} ${sqlFragment.leftJoinTag} ${filter?.name=='userLiked'?sqlFragment.innerJoinUserLikedBook:''}
    where ${filter!.sql}
    group by book.id order by ${sort}
    limit ?
    offset ?`;
    const [data]=await connection.promise().query(statement,params);
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
export const deleteBookTag=async (bookId:number,tagId:number) => {
    const statement=`delete from book_tag where bookId=? and tagId=?`;
    const [data]=await connection.promise().query(statement,[bookId,tagId]);
    return data as any;
}
export const deleteBookFile=async (bookId:number) => {
    const statement=`delete from file where bookId=?`;
    const [data]=await connection.promise().query(statement,bookId);
    return data as any;
}
export const getBooksTotalCount=async (options:GetBooksOptions) => {
    const {filter}=options;
    let params=[filter?.param];
    const statement=`select count(distinct book.id) as total from book ${sqlFragment.leftJoinUser} ${sqlFragment.leftJoinOneFile} ${sqlFragment.leftJoinTag} ${filter?.name=='userLiked'?sqlFragment.innerJoinUserLikedBook:''}
     where ${filter!.sql}`;
    const [data]=await connection.promise().query(statement,params);
    const result=data as any;
    if(result[0]!==undefined){
        return result[0].total;
      }else{
        return 0;
      }
}
export const getBookById=async (bookId:number) => {
    const statement=`select book.id,book.title,book.author,${sqlFragment.user},${sqlFragment.totalComments},${sqlFragment.file},${sqlFragment.tags},${sqlFragment.userLikeBook} from book ${sqlFragment.leftJoinUser} ${sqlFragment.leftJoinOneFile} ${sqlFragment.leftJoinTag} where book.id=?`;
    const [data]=await connection.promise().query(statement,bookId);
    const result=data as any;
    if(!result[0].id){throw new Error('NOT_FOUND')}
    return result[0]; 
}