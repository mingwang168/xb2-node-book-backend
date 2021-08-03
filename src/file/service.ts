import path from "path";
import Jimp from "jimp";
import { connection } from "../app/database/mysql";
import { FileModel } from "./model";

export const createFile = async (file: FileModel) => {
  const statement = `insert into file set ?`;
  const [data] = await connection.promise().query(statement, file);
  return data;
};
export const findFileById = async (fileId: number) => {
  const statement = `select * from file where id=?`;
  const [data] = await connection.promise().query(statement, fileId);
  const result = data as any;
  return result[0];
};
export const imageResizer = async (image: any, file: Express.Multer.File) => {
  const { imageSize } = image["_exif"];
  const filePath = path.join(file.destination, "resized", file.filename);
  if (imageSize.width > 1280) {
    image.resize(1280, Jimp.AUTO).quality(85).write(`${filePath}-large`);
  }
  if (imageSize.width > 640) {
    image.resize(640, Jimp.AUTO).quality(85).write(`${filePath}-medium`);
  }
  if (imageSize.width > 320) {
    image.resize(320, Jimp.AUTO).quality(85).write(`${filePath}-thumbnail`);
  }
};
