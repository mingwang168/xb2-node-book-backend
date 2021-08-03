export const sqlFragment={
    user:`
    JSON_OBJECT('id',user.id,'name',user.name) as user
    `,
    leftJoinUser:`
    left join user on book.userId=user.id
    `,
    totalComments:`
    (select count(COMMENT.id) from comment where comment.bookId=book.id) as totalComments
    `,
    leftJoinOneFile:`
    left join lateral (
        select * from file where file.bookId=book.id order by file.id desc limit 1
    ) as file on book.id=file.bookId
    `,
    file:`
    CAST(
      if(
        count(file.id),
        group_concat(
            distinct JSON_OBJECT(
                'id',file.id,
                'width',file.width,
                'height',file.height
            )
        ),
        null
      ) as JSON
    ) as file
    `,
    leftJoinTag:`
    left join book_tag on book_tag.bookId=book.id left join tag on book_tag.tagId=tag.id
    `,
    tags:`
    cast(
        if(
            count(tag.id),
            concat('[',
                group_concat(
                    distinct json_object(
                        'id',tag.id,
                        'name',tag.name
                    )
                )
            ,']'),
            null
        ) as JSON
    ) as tags
    `,
    userLikeBook:`
    (
        select count(user_like_book.userId) from user_like_book where user_like_book.bookId = book.id
    ) as totalLiks
    `,
    innerJoinUserLikedBook:`
    inner join user_like_book on user_like_book.bookId=book.id
    `,
}