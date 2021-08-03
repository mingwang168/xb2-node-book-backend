import { Request, Response, NextFunction } from 'express';


export const sort = async (req: Request, res: Response, next: NextFunction) => {
  const { sort } = req.query;
  let sqlSort: string;
  switch (sort) {
    case 'earliest':
      sqlSort = 'book.id ASC';
      break;
    case 'latest':
      sqlSort = 'book.id DESC';
      break;
    case 'most_comments':
      sqlSort = 'totalComments DESC ,book.id DESC';
      break;
    default:
      sqlSort = 'book.id DESC';
      break;
  }
  req.sort=sqlSort;
  next();
};

export const filter = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
  const {tag,user,action}=req.query;
  req.filter={
      name:'default',
      sql:'book.id IS NOT NULL',
  };
  if(tag && !user && !action){
      req.filter={
          name:'tagName',
          sql:'tag.name = ?',
          param:tag as string,
      }
  }
  if(user && action=='published' && !tag){
      req.filter={
          name:'userPublished',
          sql:'user.id = ?',
          param:user as string,
      }
  }
  if(user && action=='liked' && !tag){
    req.filter={
        name:'userLiked',
        sql:'user_like_book.userId=?',
        param:user as string,
    }
}
  next();
  };

  export const paginate=(itemsPerPage:number)=>{
    return async(req:Request,res:Response,next:NextFunction) => {
      const {page=1}=req.query;
      const limit=itemsPerPage||30;
      const offset=((page as number)-1)*limit;
      req.pagination={limit,offset};
      next();
      }
  }