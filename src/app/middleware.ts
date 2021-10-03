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
      message = "Username cannot be empty.";
      break;
    case "PASSWORD_IS_REQUIRED":
      statusCode = 400;
      message = "Password cannot be empty.";
      break;
    case "USER_ALREADY_EXIST":
      statusCode = 409;
      message = "User already exist.";
      break;
    case "USER_DOES_NOT_EXIST":
      statusCode = 400;
      message = "User does not exist.";
      break;
    case "UNAUTHORIZED":
      statusCode = 401;
      message = "Login please.";
      break;
    case "PASSWORD_DOES_NOT_MATCH":
      statusCode = 400;
      message = "Wrong password.";
      break;
    case "FILE_NOT_FOUND":
      statusCode = 404;
      message = "File does not exist.";
      break;
    case "TAG_ALREADY_EXISTS":
      statusCode = 400;
      message = "Tag already exists";
      break;
    case "BOOK_ALREADY_HAS_THIS_TAG":
      statusCode = 400;
      message = "Book already has this tag.";
      break;
    case "FILE_TYPE_NOT_ACCEPT":
      statusCode = 400;
      message = "File type not accept.";
      break;
    case "Tag_OF_BOOK_NOT_EXITS":
      statusCode = 404;
      message = "Tag of this book not exist.";
      break;
    case "File_OF_BOOK_NOT_EXITS":
      statusCode = 404;
      message = "Book does not have this book cover.";
      break;
    case "NOT_FOUND":
      statusCode = 404;
      message = "Not found.";
      break;
    case "USER_NOT_FOUND":
      statusCode = 404;
      message = "User not found.";
      break;
    case "PASSWORD_IS_THE_SAME":
      statusCode = 400;
      message = "Passwords are same.";
      break;
    case "UNABLE_TO_REPLY_THIS_COMMENT":
      statusCode = 401;
      message = "This comment cannot be replied.";
      break;
    case "USER_DOES_NOT_OWN_RESOURCE":
      statusCode = 403;
      message = "You do not own this resource.";
      break;
    default:
      statusCode = 500;
      message = "Server Out of service~~";
      break;
  }
  res.status(statusCode).send({ message });
};
