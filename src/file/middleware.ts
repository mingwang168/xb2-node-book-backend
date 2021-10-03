import { Request, Response, NextFunction } from "express";
import multer,{FileFilterCallback} from "multer";
import Jimp from "jimp";
import { imageResizer } from "./service";

const sharp = require('sharp');

export const fileFilter =(fileTypes:Array<string>) => {
  return (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
    )=>{
      const allowed=fileTypes.some(item=>item===file.mimetype);
      if(allowed){callback(null,true)}else{
        callback(new Error('FILE_TYPE_NOT_ACCEPT'))
      };
    }
};
const fileUploadFilter=fileFilter(['image/png','image/jpg','image/jpeg']);

const fileUpload = multer({
  dest: 'uploads/',
  fileFilter:fileUploadFilter
});
export const fileInterceptor = fileUpload.single("file");

export const fileProcessor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { path } = req.file!;
  let image: any;
  try {
    image = await sharp(path);
  } catch (error) {
    next(error);
  }
  image.metadata().then(function(metadata:any) {

req.fileMetaData={
  width:metadata.width,
  height:metadata.height,
  metadata:JSON.stringify(metadata)
}
imageResizer(metadata,req.file!);
next();
  })
};
