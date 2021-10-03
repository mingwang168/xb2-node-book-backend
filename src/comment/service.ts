import { sqlFragment } from "./provider";
import { connection } from "../app/database/mysql";
import { CommentModel } from "./model";
import { GetBooksOptionsFilter, GetBooksOptionsPagination } from "../book/service";

export const createComment = async (comment: CommentModel) => {
  const statement = `insert into comment set ?`;
  const [data] = await connection.promise().query(statement, comment);
  return data;
};
export const isReplyComment = async (commentId: number) => {
  const statement = `select parentId from comment where id =?`;
  const [data] = await connection.promise().query(statement, commentId);
  const result = data as any;
  return result[0].parentId ? true : false;
};
export const updateComment = async (comment: CommentModel) => {
  const { id, content } = comment;
  const statement = `update comment set content=? where id=?`;
  const [data] = await connection.promise().query(statement, [content, id]);
  return data;
};
export const deleteComment = async (commentId: number) => {
  const statement = `delete from comment where id=?`;
  const [data] = await connection.promise().query(statement, commentId);
  return data;
};
export const deleteCommentByParentId = async (parentId: number) => {
  const statement = `delete from comment where parentId=?`;
  const [data] = await connection.promise().query(statement, parentId);
  return data;
};
interface GetCommentsOptions {
  filter?: GetBooksOptionsFilter;
  pagination:GetBooksOptionsPagination;
}
export const getCommentsTotalCount = async (options:GetCommentsOptions) => {
  const {filter}=options;
  let params=[filter?.param];
  const statement=`select count(distinct comment.id) as total ${filter?.name=='userReplied' ? `,${sqlFragment.repliedComment}`:''} ${filter?.name!=='userReplied' ? `,${sqlFragment.totalReplies}`:''} from comment ${sqlFragment.leftJoinUser} ${sqlFragment.leftJoinBook} where ${filter?.sql} `;
  const [data]=await connection.promise().query(statement,params);
  const result=data as any;
  return result[0].total;
}
export const getComments = async (options: GetCommentsOptions) => {
    const {filter,pagination:{limit,offset},}=options;
  let params: Array<any> = [limit,offset];
  if(filter?.param){
      params=[filter.param,...params];
  }
  const statement = `select comment.id,comment.content,comment.parentId,${sqlFragment.user},${sqlFragment.book} ${filter?.name=='userReplied' ? `,${sqlFragment.repliedComment}`:''} ${filter?.name!=='userReplied' ? `,${sqlFragment.totalReplies}`:''} from comment ${sqlFragment.leftJoinUser} ${sqlFragment.leftJoinBook} where ${filter?.sql} group by comment.id order by comment.id desc LIMIT ? OFFSET ?`;
  const [data] = await connection.promise().query(statement,params);
  return data;
};
