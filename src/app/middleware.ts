import { Request, Response, NextFunction } from "express";

export const requestUrl = (req: Request, res: Response, next: NextFunction) => {
  console.log(`当前Url是: ${req.url} ~`);
  next();
};

export const defaultErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.message) {
    console.log(error.message);
  }

  let statusCode: number, message: string;

  switch (error.message) {
    case "USERNAME_IS_REQUIRED":
      statusCode = 400;
      message = "用户名不能空";
      break;
    case "PASSWORD_IS_REQUIRED":
      statusCode = 400;
      message = "密码不能空";
      break;
    case "USER_ALREADY_EXIST":
      statusCode = 409;
      message = "此用户已存在";
      break;
    case "USER_DOES_NOT_EXIST":
      statusCode = 400;
      message = "用户名不存在";
      break;
    case "UNAUTHORIZED":
      statusCode = 401;
      message = "请先登录";
      break;
    case "PASSWORD_DOES_NOT_MATCH":
      statusCode = 400;
      message = "密码错误";
      break;
    case "FILE_NOT_FOUND":
      statusCode = 404;
      message = "文件不存在";
      break;
    case "TAG_ALREADY_EXISTS":
      statusCode = 400;
      message = "标签已存在";
      break;
    case "BOOK_ALREADY_HAS_THIS_TAG":
      statusCode = 400;
      message = "内容已经有这个标签";
      break;
    case "FILE_TYPE_NOT_ACCEPT":
      statusCode = 400;
      message = "不能上传此类型文件";
      break;
    case "Tag_OF_BOOK_NOT_EXITS":
      statusCode = 404;
      message = "内容没有这个标签";
      break;
    case "NOT_FOUND":
      statusCode = 404;
      message = "没找到";
      break;
    case "USER_NOT_FOUND":
      statusCode = 404;
      message = "没找到此用户";
      break;
    case "PASSWORD_IS_THE_SAME":
      statusCode = 400;
      message = "要修改的密码不能与原密码相同";
      break;
    case "UNABLE_TO_REPLY_THIS_COMMENT":
      statusCode = 401;
      message = "这个评论不能被回复";
      break;
    case "USER_DOES_NOT_OWN_RESOURCE":
      statusCode = 403;
      message = "您不能处理此内容";
      break;
    default:
      statusCode = 500;
      message = "服务暂时出现问题~~";
      break;
  }
  res.status(statusCode).send({ message });
};
