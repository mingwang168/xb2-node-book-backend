export const sqlFragment = {
  leftJoinUser: `
    left join user on user.id=comment.userId left join avatar on avatar.userId=user.id
    `,
  user: `
    json_object('id',user.id,'name',user.name,'avatar',if(count(avatar.id),1,null)) as user
    `,
  leftJoinBook: `
    left join book on book.id=comment.bookId
    `,
  book: `
    json_object('id',book.id,'title',book.title,'author',book.author) as book
    `,
  repliedComment:`
  (
    select json_object('id',repliedComment.id,'content',repliedComment.content) from comment repliedComment where comment.parentId=repliedComment.id
  ) as repliedComment
  `,
  totalReplies:`
  (
   select count(reply.id) from comment reply where reply.parentId=comment.id
  ) as totalReplies
  `,
};
